<template>
  <div class="messages-container" dir="rtl">
    <div class="header">
      <h1>الرسائل</h1>
      <p class="subtitle">إدارة رسائل المستخدمين</p>
    </div>

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

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>جاري التحميل...</p>
    </div>

    <div v-else-if="filteredMessages.length === 0" class="no-results">
      <i class="fas fa-inbox"></i>
      <p>لا توجد رسائل</p>
    </div>

    <div v-else class="messages-grid">
      <div v-for="contact in filteredMessages" :key="contact._id" class="message-card">
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
          <div class="message-status" :class="{ 'unread': !contact.read }">
            {{ contact.read ? 'مقروءة' : 'جديدة' }}
          </div>
        </div>

        <div class="message-content">
          <div class="contact-info">
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <span>{{ contact.email }}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-phone"></i>
              <span>{{ contact.phone }}</span>
            </div>
          </div>
          <div class="message-text">
            <p>{{ contact.message }}</p>
          </div>
        </div>

        <div class="message-actions">
          <button class="action-btn reply" @click="replyToMessage(contact)">
            <i class="fas fa-reply"></i>
            رد
          </button>
          <button class="action-btn delete" @click="deleteMessage(contact._id)">
            <i class="fas fa-trash"></i>
            حذف
          </button>
        </div>
      </div>
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
      filteredMessages: []
    };
  },
  methods: {
    fetchContacts() {
      axios.get('https://nuft-website-backend.vercel.app/contact/get')
        .then(response => {
          this.contacts = response.data;
          this.filteredMessages = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error("There was an error fetching the contacts:", error);
          this.loading = false;
        });
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
    formatDate(date) {
      if (!date) return 'غير متوفر';
      return new Date(date).toLocaleDateString('ar-EG');
    },
    replyToMessage(contact) {
      // Implement reply functionality
      console.log('Reply to:', contact.email);
    },
    deleteMessage(id) {
      // Implement delete functionality
      console.log('Delete message:', id);
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

.search-bar {
  max-width: 600px;
  margin: 0 auto 2rem;
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
}

.message-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
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
}

.message-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background: #e9ecef;
  color: #6c757d;
}

.message-status.unread {
  background: #e3f2fd;
  color: #1976d2;
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

.message-text {
  color: #212529;
  line-height: 1.6;
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
}
</style>


