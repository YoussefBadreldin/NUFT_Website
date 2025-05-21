<template>
  <div class="parent" dir="rtl">
    <div class="admin-header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        لوحة التحكم الرئيسية
      </button>
      <h1>إدارة طلبات الانضمام</h1>
      <p class="welcome-text"> مراجعة وإدارة طلبات الانضمام لفريق NUFT.</p>
    </div>

    <div class="controls">
      <div class="search-bar">
        <div class="search-input">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن طلب..."
            @input="filterRequests"
          >
        </div>
      </div>

      <div class="sort-options">
        <select v-model="sortBy" @change="sortRequests">
          <option value="newest">الأحدث</option>
          <option value="oldest">الأقدم</option>
          <option value="status">الحالة</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>جاري التحميل...</p>
    </div>

    <div v-else-if="filteredRequests.length === 0" class="no-results">
      <i class="fas fa-file-alt"></i>
      <p>لا توجد طلبات انضمام</p>
    </div>

    <div v-else class="requests-grid">
      <div v-for="request in filteredRequests" :key="request._id" class="request-card" :class="getStatusClass(request.status)">
        <div class="request-header">
          <div class="applicant-info">
            <div class="applicant-avatar">
              <i class="fas fa-user"></i>
            </div>
            <div class="applicant-details">
              <h3>{{ request.firstName }} {{ request.lastName }}</h3>
              <span class="position">{{ request.position }}</span>
              <span class="department">{{ request.department }}</span>
            </div>
          </div>
          <div class="request-status" :class="getStatusClass(request.status)">
            {{ getStatusText(request.status) }}
          </div>
        </div>

        <div class="request-content">
          <div class="contact-info">
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <span class="label">ايميل:</span>
              <span class="value">{{ request.email }}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-phone"></i>
              <span class="label">موبايل:</span>
              <span class="value">{{ request.phone }}</span>
            </div>
          </div>

          <div class="qualifications">
            <div class="info-item">
              <i class="fas fa-graduation-cap"></i>
              <span class="label">المؤهل:</span>
              <span class="value">{{ request.education }}</span>
            </div>
            <div class="info-item">
              <i class="fas fa-briefcase"></i>
              <span class="label">الخبرة:</span>
              <span class="value">{{ request.experience }} سنوات</span>
            </div>
          </div>

          <div class="documents">
            <a :href="request.resumeUrl" target="_blank" class="document-link">
              <i class="fas fa-file-pdf"></i>
              السيرة الذاتية
            </a>
            <a v-if="request.coverLetter" :href="request.coverLetter" target="_blank" class="document-link">
              <i class="fas fa-file-alt"></i>
              خطاب التغطية
            </a>
          </div>

          <div class="request-date">
            <i class="fas fa-clock"></i>
            <span>تاريخ التقديم: {{ formatDate(request.createdAt) }}</span>
          </div>
        </div>

        <div class="request-actions">
          <select v-model="request.status" @change="updateStatus(request)" class="status-select">
            <option value="pending">قيد الانتظار</option>
            <option value="reviewing">قيد المراجعة</option>
            <option value="shortlisted">قائمة مختصرة</option>
            <option value="rejected">مرفوض</option>
            <option value="hired">تم التعيين</option>
          </select>
          <button class="action-btn delete" @click="confirmDelete(request._id)">
            <i class="fas fa-trash"></i>
            حذف
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
          <p>هل أنت متأكد من حذف هذا الطلب؟</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeDeleteModal">إلغاء</button>
          <button class="delete-btn" @click="deleteRequest">حذف</button>
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
  name: 'JoinUsAdmin',
  data() {
    return {
      requests: [],
      filteredRequests: [],
      loading: true,
      searchQuery: '',
      sortBy: 'newest',
      showDeleteModal: false,
      requestToDelete: null,
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    };
  },
  methods: {
    goBack() {
      this.$router.push('/admin');
    },
    getStatusClass(status) {
      switch (status) {
        case 'pending':
          return 'pending';
        case 'reviewing':
          return 'reviewing';
        case 'shortlisted':
          return 'shortlisted';
        case 'rejected':
          return 'rejected';
        case 'hired':
          return 'hired';
        default:
          return '';
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'pending':
          return 'قيد الانتظار';
        case 'reviewing':
          return 'قيد المراجعة';
        case 'shortlisted':
          return 'قائمة مختصرة';
        case 'rejected':
          return 'مرفوض';
        case 'hired':
          return 'تم التعيين';
        default:
          return status;
      }
    },
    async fetchRequests() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/join-us');
        this.requests = response.data;
        this.filteredRequests = response.data;
        this.sortRequests();
      } catch (error) {
        this.showNotification('حدث خطأ أثناء تحميل الطلبات', 'error');
        console.error('Error fetching requests:', error);
      } finally {
        this.loading = false;
      }
    },
    filterRequests() {
      if (!this.searchQuery) {
        this.filteredRequests = this.requests;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredRequests = this.requests.filter(request => 
        request.firstName.toLowerCase().includes(query) ||
        request.lastName.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        request.position.toLowerCase().includes(query)
      );
    },
    sortRequests() {
      const statusOrder = {
        'pending': 0,
        'reviewing': 1,
        'shortlisted': 2,
        'rejected': 3,
        'hired': 4
      };

      switch (this.sortBy) {
        case 'newest':
          this.filteredRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          this.filteredRequests.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'status':
          this.filteredRequests.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
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
    async updateStatus(request) {
      try {
        await axios.put(`https://nuft-website-backend.vercel.app/join-us/${request._id}`, {
          status: request.status
        });
        this.showNotification('تم تحديث حالة الطلب بنجاح', 'success');
      } catch (error) {
        this.showNotification('حدث خطأ أثناء تحديث حالة الطلب', 'error');
        // Revert the status change on error
        this.fetchRequests();
      }
    },
    confirmDelete(id) {
      this.requestToDelete = id;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.requestToDelete = null;
    },
    async deleteRequest() {
      try {
        await axios.delete(`https://nuft-website-backend.vercel.app/join-us/${this.requestToDelete}`);
        this.requests = this.requests.filter(r => r._id !== this.requestToDelete);
        this.filterRequests();
        this.showNotification('تم حذف الطلب بنجاح', 'success');
      } catch (error) {
        this.showNotification('حدث خطأ أثناء حذف الطلب', 'error');
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
  mounted() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const name = localStorage.getItem('name');
    
    if (!isAdmin || !name) {
      this.$router.push('/user');
    } else {
      this.fetchRequests();
    }
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

.parent {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
}

.admin-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
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

.admin-header h1 {
  color: #001d3d;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-text {
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

.requests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.request-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-right: 4px solid transparent;
}

.request-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.request-card.pending {
  border-right-color: #1976d2;
}

.request-card.reviewing {
  border-right-color: #ffa000;
}

.request-card.shortlisted {
  border-right-color: #7b1fa2;
}

.request-card.rejected {
  border-right-color: #d32f2f;
}

.request-card.hired {
  border-right-color: #2e7d32;
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.applicant-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.applicant-avatar {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #001d3d, #4158d0);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.applicant-avatar i {
  color: white;
  font-size: 1.2rem;
}

.applicant-details h3 {
  color: #001d3d;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.position {
  color: #1976d2;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.25rem;
}

.department {
  color: #6c757d;
  font-size: 0.85rem;
  display: block;
}

.request-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background: #e9ecef;
  color: #6c757d;
}

.request-status.pending {
  background: #e3f2fd;
  color: #1976d2;
}

.request-status.reviewing {
  background: #fff3e0;
  color: #ffa000;
}

.request-status.shortlisted {
  background: #f3e5f5;
  color: #7b1fa2;
}

.request-status.rejected {
  background: #fde7e7;
  color: #d32f2f;
}

.request-status.hired {
  background: #e8f5e9;
  color: #2e7d32;
}

.request-content {
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.contact-info,
.qualifications {
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

.documents {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.document-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1976d2;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.document-link:hover {
  color: #1565c0;
}

.request-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.request-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.status-select {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: white;
  color: #001d3d;
  font-size: 0.9rem;
  cursor: pointer;
}

.action-btn {
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

.action-btn.delete {
  background: #fde7e7;
  color: #d32f2f;
}

.action-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
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

.no-results {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.no-results i {
  font-size: 3rem;
  margin-bottom: 1rem;
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
  .parent {
    padding: 1rem;
  }

  .admin-header h1 {
    font-size: 1.8rem;
  }

  .controls {
    flex-direction: column;
  }

  .search-bar,
  .sort-options {
    width: 100%;
    max-width: 100%;
  }

  .requests-grid {
    grid-template-columns: 1fr;
  }

  .request-card {
    padding: 1rem;
  }

  .request-header {
    flex-direction: column;
    gap: 1rem;
  }

  .request-status {
    align-self: flex-start;
  }
}
</style> 