<template>
  <div class="users-container" dir="rtl">
    <div class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        رجوع
      </button>
      <h1>إدارة المستخدمين</h1>
      <p class="subtitle">عرض وإدارة حسابات المستخدمين</p>
    </div>

    <div class="controls">
      <div class="search-bar">
        <div class="search-input">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن مستخدم..."
            @input="filterUsers"
          >
        </div>
      </div>

      <div class="sort-options">
        <select v-model="sortBy" @change="sortUsers">
          <option value="newest">الأحدث</option>
          <option value="oldest">الأقدم</option>
          <option value="type">نوع المستخدم</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>جاري التحميل...</p>
    </div>

    <div v-else-if="filteredUsers.length === 0" class="no-results">
      <i class="fas fa-users"></i>
      <p>لا يوجد مستخدمين</p>
    </div>

    <div v-else class="users-grid">
      <div v-for="user in filteredUsers" :key="user.id" class="user-card">
        <div class="user-header">
          <div class="user-avatar">
            <i class="fas fa-user"></i>
          </div>
          <div class="user-info">
            <h3>{{ user.name || 'بدون اسم' }}</h3>
            <span class="user-id">رقم المستخدم: {{ user.id }}</span>
            <span class="user-type" :class="getUserTypeClass(user.userType)">
              {{ getUserTypeText(user.userType) }}
            </span>
          </div>
        </div>
        <div class="user-details">
          <div class="detail-item">
            <i class="fas fa-envelope"></i>
            <span class="label">ايميل:</span>
            <span class="value email-value">{{ user.email }}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-key"></i>
            <span class="label">كلمة المرور:</span>
            <span class="value">{{ user.password }}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span class="label">تاريخ التسجيل:</span>
            <span class="value">{{ formatDate(user.createdAt) }}</span>
          </div>
        </div>
        <div class="user-actions">
          <button class="action-btn edit" @click="editUser(user)">
            <i class="fas fa-edit"></i>
            تعديل
          </button>
          <button class="action-btn delete" @click="confirmDelete(user.id)">
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
          <p>هل أنت متأكد من حذف هذا المستخدم؟</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeDeleteModal">إلغاء</button>
          <button class="delete-btn" @click="deleteUser">حذف</button>
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
  name: 'getUsers',
  data() {
    return {
      allUsers: [],
      searchQuery: '',
      filteredUsers: [],
      loading: true,
      sortBy: 'newest',
      showDeleteModal: false,
      userToDelete: null,
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getUserTypeClass(type) {
      switch (type) {
        case 'admin':
          return 'admin';
        case 'moderator':
          return 'moderator';
        default:
          return 'user';
      }
    },
    getUserTypeText(type) {
      switch (type) {
        case 'admin':
          return 'مدير';
        case 'moderator':
          return 'مشرف';
        default:
          return 'مستخدم عادي';
      }
    },
    async getAllusers() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/auth/get');
        this.allUsers = response.data;
        this.filteredUsers = response.data;
        this.sortUsers();
      } catch (error) {
        this.showNotification('حدث خطأ أثناء تحميل المستخدمين', 'error');
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
    },
    filterUsers() {
      if (!this.searchQuery) {
        this.filteredUsers = this.allUsers;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.allUsers.filter(user => 
        user.email.toLowerCase().includes(query)
      );
    },
    sortUsers() {
      switch (this.sortBy) {
        case 'newest':
          this.filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          this.filteredUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'type':
          this.filteredUsers.sort((a, b) => {
            const typeOrder = { admin: 0, moderator: 1, user: 2 };
            return typeOrder[a.userType] - typeOrder[b.userType];
          });
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
    editUser(user) {
      // Implement edit functionality
      console.log('Edit user:', user);
    },
    confirmDelete(id) {
      this.userToDelete = id;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.userToDelete = null;
    },
    async deleteUser() {
      try {
        await axios.delete(`https://nuft-website-backend.vercel.app/auth/${this.userToDelete}`);
        this.allUsers = this.allUsers.filter(u => u.id !== this.userToDelete);
        this.filterUsers();
        this.showNotification('تم حذف المستخدم بنجاح', 'success');
      } catch (error) {
        this.showNotification('حدث خطأ أثناء حذف المستخدم', 'error');
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
    this.getAllusers();
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

.users-container {
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

.users-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1rem 0;
}

.user-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #001d3d, #4158d0);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar i {
  color: white;
  font-size: 1.5rem;
}

.user-info h3 {
  color: #001d3d;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-id {
  color: #6c757d;
  font-size: 0.85rem;
  display: block;
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-type {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background: #e9ecef;
  color: #6c757d;
  display: inline-block;
}

.user-type.admin {
  background: #e3f2fd;
  color: #1976d2;
}

.user-type.moderator {
  background: #e8f5e9;
  color: #2e7d32;
}

.user-type.user {
  background: #f5f5f5;
  color: #616161;
}

.user-details {
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #495057;
  overflow: hidden;
}

.detail-item i {
  color: #4158d0;
  width: 20px;
  flex-shrink: 0;
}

.detail-item .label {
  color: #6c757d;
  font-weight: 500;
  min-width: 100px;
  flex-shrink: 0;
}

.detail-item .value {
  color: #212529;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-item .email-value {
  margin-right: 0.5rem;
}

.user-actions {
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

.action-btn.edit {
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

@media (max-width: 1200px) {
  .users-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .users-container {
    padding: 1rem;
  }

  .header h1 {
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

  .users-grid {
    grid-template-columns: 1fr;
  }

  .user-card {
    padding: 1rem;
  }
}
</style>
  