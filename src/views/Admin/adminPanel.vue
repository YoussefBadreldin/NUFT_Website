<template>
  <div class="parent" dir="rtl">
    <div class="admin-header">
      <h1>لوحة تحكم NUFT</h1>
      <p class="welcome-text">مرحباً بك في لوحة التحكم</p>
    </div>

    <div class="admin-options">
      <div class="options-grid">
        <a href="/admin/universities-data" class="option-card">
          <div class="icon-wrapper">
            <i class="fas fa-university"></i>
          </div>
          <div class="content">
            <span class="title">داتا الجامعات</span>
            <span class="description">إدارة بيانات الجامعات</span>
          </div>
        </a>
        <a href="/admin/admission-status" class="option-card">
          <div class="icon-wrapper">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="content">
            <span class="title">حالة الجامعات</span>
            <span class="description">إدارة حالة الجامعات</span>
          </div>
        </a>
        <a href="/admin/scholarships" class="option-card">
          <div class="icon-wrapper">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="content">
            <span class="title">المنح</span>
            <span class="description">إدارة المنح الدراسية</span>
          </div>
        </a>
        <a href="/admin/news" class="option-card">
          <div class="icon-wrapper">
            <i class="fas fa-newspaper"></i>
          </div>
          <div class="content">
            <span class="title">الاخبار</span>
            <span class="description">إدارة الأخبار والمقالات</span>
          </div>
        </a>
        <a href="/admin/messages" class="option-card">
          <div class="icon-wrapper">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="content">
            <span class="title">الرسائل</span>
            <span class="description">إدارة الرسائل والطلبات</span>
          </div>
        </a>
        <a href="/admin/users" class="option-card">
          <div class="icon-wrapper">
            <i class="fas fa-users"></i>
          </div>
          <div class="content">
            <span class="title">الحسابات</span>
            <span class="description">إدارة حسابات المستخدمين</span>
          </div>
        </a>
        <a href="/admin/smart-assistant" class="option-card">
          <div class="icon-wrapper">
            <i class="fas fa-robot"></i>
          </div>
          <div class="content">
            <span class="title">المساعد الشخصي الذكي</span>
            <span class="description">إدارة المساعد الذكي</span>
          </div>
        </a>
      </div>
    </div>

    <div class="logout-container">
      <button class="logout-btn" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
        تسجيل الخروج
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  mounted() {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const name = localStorage.getItem('name');
    
    if (!isAdmin || !name) {
      this.$router.push('/user');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('name');
      localStorage.removeItem('isAdmin');
      this.$router.push('/Login');
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
  direction: rtl;
}

.admin-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.admin-header h1 {
  color: #001d3d;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-text {
  color: #6c757d;
  font-size: 1.1rem;
}

.admin-options {
  max-width: 1200px;
  margin: 0 auto;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.option-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  text-decoration: none;
  color: #001d3d;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  border-color: #4158d0;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #001d3d, #4158d0);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.option-card:hover .icon-wrapper {
  transform: scale(1.1);
}

.icon-wrapper i {
  font-size: 1.8rem;
  color: white;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.content .title {
  font-size: 1.2rem;
  font-weight: 700;
}

.content .description {
  font-size: 0.9rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .parent {
    padding: 1rem;
  }

  .admin-header {
    margin-bottom: 2rem;
    padding: 1rem 0;
  }

  .admin-header h1 {
    font-size: 2rem;
  }

  .options-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 0.5rem;
  }

  .option-card {
    padding: 1rem;
  }

  .icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .icon-wrapper i {
    font-size: 1.5rem;
  }

  .content .title {
    font-size: 1.1rem;
  }

  .content .description {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .parent {
    padding: 0.5rem;
  }

  .admin-header h1 {
    font-size: 1.8rem;
  }

  .options-grid {
    grid-template-columns: 1fr;
  }

  .option-card {
    padding: 1rem;
  }
}

.logout-container {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logout-btn:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.logout-btn i {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .logout-container {
    bottom: 1rem;
  }
  
  .logout-btn {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
