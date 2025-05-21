<template>
  <div class="messages-container" dir="rtl">
    <div class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        رجوع
      </button>
      <h1>الرسائل</h1>
      <p class="subtitle">إدارة رسائل المستخدمين</p>
    </div>

    <div class="controls">
      <div class="search-bar">
        <div class="search-input">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن رسالة..."
            @input="filterMessages"
          >
        </div>
      </div>

      <div class="sort-options">
        <select v-model="sortBy" @change="sortMessages">
          <option value="newest">الأحدث</option>
          <option value="oldest">الأقدم</option>
          <option value="unread">غير مقروءة</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>جاري التحميل...</p>
    </div>

    <div v-else-if="filteredMessages.length === 0" class="no-results">
      <i class="fas fa-inbox"></i>
      <p>لا توجد رسائل</p>
    </div>

    <div v-else class="messages-grid">
      <div v-for="contact in filteredMessages" :key="contact._id" class="message-card" :class="getStatusClass(contact.status)">
        <div class="message-header">
          <div class="sender-info">
            <div class="sender-avatar">
              <i class="fas fa-user"></i>
            </div>
            <div class="sender-details">
              <h3>{{ contact.name }}</h3>
              <span class="message-date">{{ formatDate(contact.createdAt) }}</span>
            </div>
          </div>
          <div class="message-status" :class="getStatusClass(contact.status)">
            {{ getStatusText(contact.status) }}
          </div>
        </div>

        <div class="message-content" @click="markAsRead(contact)">
          <div class="contact-info">
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <span class="label">ايميل:</span>
              <span class="value">{{ contact.email }}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-phone"></i>
              <span class="label">موبايل:</span>
              <span class="value">{{ contact.phone }}</span>
            </div>
          </div>
          <div class="message-text">
            <span class="label">الرسالة:</span>
            <p>{{ contact.message.replace(/\\n/g, '\n') }}</p>
          </div>
        </div>

        <div class="message-actions">
          <button class="action-btn reply" @click="openReplyModal(contact)">
            <i class="fas fa-reply"></i>
            رد
          </button>
          <button class="action-btn delete" @click="confirmDelete(contact._id)">
            <i class="fas fa-trash"></i>
            حذف
          </button>
        </div>
      </div>
    </div>

    <!-- Reply Modal -->
    <div v-if="showReplyModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>رد على الرسالة</h3>
          <button class="close-btn" @click="closeReplyModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>الرد:</label>
            <textarea v-model="replyMessage" rows="4" placeholder="اكتب ردك هنا..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeReplyModal">إلغاء</button>
          <button class="send-btn" @click="sendReply" :disabled="!replyMessage.trim()">
            إرسال
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content delete-confirmation">
        <div class="modal-header">
          <h3>تأكيد الحذف</h3>
          <button class="close-btn" @click="closeDeleteModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>هل أنت متأكد من حذف هذه الرسالة؟</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeDeleteModal">إلغاء</button>
          <button class="delete-btn" @click="deleteMessage">حذف</button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast" :class="toastType">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactList',
  data() {
    return {
      contacts: [],
      loading: true,
      searchQuery: '',
      filteredMessages: [],
      sortBy: 'newest',
      showReplyModal: false,
      showDeleteModal: false,
      selectedContact: null,
      messageToDelete: null,
      replyMessage: '',
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getStatusClass(status) {
      switch (status) {
        case 'pending':
          return 'pending';
        case 'read':
          return 'read';
        case 'replied':
          return 'replied';
        default:
          return '';
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'pending':
          return 'جديدة';
        case 'read':
          return 'مقروءة';
        case 'replied':
          return 'تم الرد';
        default:
          return status;
      }
    },
    async fetchContacts() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/contact');
        this.contacts = response.data;
        this.filteredMessages = response.data;
        this.sortMessages();
      } catch (error) {
        this.showNotification('حدث خطأ أثناء تحميل الرسائل', 'error');
        console.error("Error fetching contacts:", error);
      } finally {
        this.loading = false;
      }
    },
    filterMessages() {
      if (!this.searchQuery) {
        this.filteredMessages = this.contacts;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredMessages = this.contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.message.toLowerCase().includes(query)
      );
    },
    sortMessages() {
      switch (this.sortBy) {
        case 'newest':
          this.filteredMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          this.filteredMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'unread':
          this.filteredMessages.sort((a, b) => (a.status === b.status) ? 0 : a.status === 'read' ? 1 : -1);
          break;
      }
    },
    formatDate(date) {
      if (!date) return 'غير متوفر';
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(date).toLocaleDateString('ar-EG', options);
    },
    async markAsRead(contact) {
      if (contact.status === 'pending') {
        try {
          await axios.put(`https://nuft-website-backend.vercel.app/contact/${contact._id}`, {
            status: 'read'
          });
          contact.status = 'read';
          this.showNotification('تم تحديث حالة الرسالة', 'success');
        } catch (error) {
          this.showNotification('حدث خطأ أثناء تحديث حالة الرسالة', 'error');
        }
      }
    },
    openReplyModal(contact) {
      this.selectedContact = contact;
      this.showReplyModal = true;
    },
    closeReplyModal() {
      this.showReplyModal = false;
      this.selectedContact = null;
      this.replyMessage = '';
    },
    async sendReply() {
      if (!this.replyMessage.trim()) return;
      
      try {
        await axios.put(`https://nuft-website-backend.vercel.app/contact/${this.selectedContact._id}`, {
          status: 'replied'
        });
        
        await axios.post('https://nuft-website-backend.vercel.app/send-reply', {
          to: this.selectedContact.email,
          message: this.replyMessage
        });
        
        this.selectedContact.status = 'replied';
        this.showNotification('تم إرسال الرد بنجاح', 'success');
        this.closeReplyModal();
      } catch (error) {
        this.showNotification('حدث خطأ أثناء إرسال الرد', 'error');
      }
    },
    confirmDelete(id) {
      this.messageToDelete = id;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.messageToDelete = null;
    },
    async deleteMessage() {
      try {
        await axios.delete(`https://nuft-website-backend.vercel.app/contact/${this.messageToDelete}`);
        this.contacts = this.contacts.filter(c => c._id !== this.messageToDelete);
        this.filterMessages();
        this.showNotification('تم حذف الرسالة بنجاح', 'success');
      } catch (error) {
        this.showNotification('حدث خطأ أثناء حذف الرسالة', 'error');
      } finally {
        this.closeDeleteModal();
      }
    },
    showNotification(message, type = 'success') {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  },
  created() {
    this.fetchContacts();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Tajawal', sans-serif;
}

.messages-container {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.header h1 {
  color: #001d3d;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6c757d;
  font-size: 1.1rem;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.search-bar {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}

.search-input i {
  color: #6c757d;
  margin-left: 0.5rem;
}

.search-input input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  color: #001d3d;
  background: transparent;
}

.search-input input::placeholder {
  color: #adb5bd;
}

.sort-options {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.sort-options select {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: white;
  color: #001d3d;
  font-size: 0.9rem;
  cursor: pointer;
}

.loading-state {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4158d0;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.messages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.message-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-right: 4px solid transparent;
}

.message-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.message-card.pending {
  border-right-color: #1976d2;
}

.message-card.read {
  border-right-color: #2e7d32;
}

.message-card.replied {
  border-right-color: #7b1fa2;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sender-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sender-avatar {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #001d3d, #4158d0);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sender-avatar i {
  color: white;
  font-size: 1.2rem;
}

.sender-details h3 {
  color: #001d3d;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.message-date {
  color: #6c757d;
  font-size: 0.9rem;
  display: block;
  margin-top: 0.25rem;
}

.message-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background: #e9ecef;
  color: #6c757d;
}

.message-status.pending {
  background: #e3f2fd;
  color: #1976d2;
}

.message-status.read {
  background: #e8f5e9;
  color: #2e7d32;
}

.message-status.replied {
  background: #f3e5f5;
  color: #7b1fa2;
}

.message-content {
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.contact-info {
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #495057;
}

.info-item i {
  color: #4158d0;
  width: 20px;
}

.info-item .label {
  color: #6c757d;
  font-weight: 500;
  min-width: 60px;
}

.info-item .value {
  color: #212529;
}

.message-text {
  color: #212529;
  line-height: 1.6;
  margin-top: 1rem;
}

.message-text .label {
  color: #6c757d;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
}

.message-text p {
  color: #212529;
  line-height: 1.6;
  white-space: pre-line;
  margin: 0;
}

.message-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.action-btn.reply {
  background: #e3f2fd;
  color: #1976d2;
}

.action-btn.delete {
  background: #fde7e7;
  color: #d32f2f;
}

.action-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.no-results i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.back-button {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: #e3f2fd;
  color: #1976d2;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #bbdefb;
  transform: translateX(-2px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  color: #001d3d;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #001d3d;
}

.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.modal-footer button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #e9ecef;
  color: #495057;
}

.send-btn {
  background: #1976d2;
  color: white;
}

.send-btn:disabled {
  background: #bbdefb;
  cursor: not-allowed;
}

.delete-btn {
  background: #d32f2f;
  color: white;
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 2rem;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  z-index: 1001;
  animation: slideUp 0.3s ease;
}

.toast.success {
  background: #2e7d32;
}

.toast.error {
  background: #d32f2f;
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .messages-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .messages-grid {
    grid-template-columns: 1fr;
  }

  .message-card {
    padding: 1rem;
  }

  .controls {
    flex-direction: column;
  }
  
  .search-bar,
  .sort-options {
    width: 100%;
    max-width: 100%;
  }
}
</style>


