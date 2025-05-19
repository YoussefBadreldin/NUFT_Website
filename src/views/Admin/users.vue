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

    <div class="users-grid">
      <div v-for="user in filteredUsers" :key="user.id" class="user-card">
        <div class="user-header">
          <div class="user-avatar">
            <i class="fas fa-user"></i>
          </div>
          <div class="user-info">
            <h3>{{ user.email }}</h3>
            <span class="user-type">{{ user.userType || 'مستخدم عادي' }}</span>
          </div>
        </div>
        <div class="user-details">
          <div class="detail-item">
            <i class="fas fa-key"></i>
            <span>{{ user.password }}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>{{ formatDate(user.createdAt) }}</span>
          </div>
        </div>
        <div class="user-actions">
          <button class="action-btn edit">
            <i class="fas fa-edit"></i>
            تعديل
          </button>
          <button class="action-btn delete">
            <i class="fas fa-trash"></i>
            حذف
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredUsers.length === 0" class="no-results">
      <i class="fas fa-search"></i>
      <p>لا يوجد مستخدمين</p>
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
      filteredUsers: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getAllusers() {
      axios.get('https://nuft-website-backend.vercel.app/auth/getallusers')
        .then(response => {
          this.allUsers = response.data;
          this.filteredUsers = response.data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
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
    formatDate(date) {
      if (!date) return 'غير متوفر';
      return new Date(date).toLocaleDateString('ar-EG');
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

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
}

.user-type {
  color: #6c757d;
  font-size: 0.9rem;
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
}

.detail-item i {
  color: #4158d0;
  width: 20px;
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

@media (max-width: 768px) {
  .users-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .users-grid {
    grid-template-columns: 1fr;
  }

  .user-card {
    padding: 1rem;
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
</style>
  