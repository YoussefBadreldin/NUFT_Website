<template>
  <div class="parent" dir="rtl">
    <div class="admin-header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        لوحة التحكم الرئيسية
      </button>
      <h1>إدارة طلبات الانضمام</h1>
      <p class="welcome-text">هنا يمكنك مراجعة وإدارة طلبات الانضمام لفريق NUFT.</p>
    </div>

    <div class="admin-content">
      <!-- Placeholder for Join Us admin content -->
      <div class="placeholder-card">
        <h3>قائمة طلبات الانضمام</h3>
        <p>سيتم إضافة جدول أو قائمة هنا لعرض طلبات الانضمام مع خيارات للموافقة أو الرفض.</p>
        <!-- Future: Add table or list for join requests -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinUsAdmin',
  mounted() {
    // Optional: Check if user is admin and has necessary permissions
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const name = localStorage.getItem('name');
    
    if (!isAdmin || !name) {
      this.$router.push('/user'); // Redirect to user page or login if not admin
    }
  },
  methods: {
    goBack() {
      this.$router.push('/admin'); // Navigate back to the main admin panel
    },
    // Future: Add methods for managing join requests (e.g., fetch, approve, reject)
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
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-text {
  color: #6c757d;
  font-size: 1.1rem;
}

.admin-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
}

.placeholder-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-align: center;
}

.placeholder-card h3 {
    color: #001d3d;
    margin-bottom: 1rem;
}

.placeholder-card p {
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

  .admin-content {
    padding: 0.5rem;
  }

  .placeholder-card {
    padding: 1.5rem;
  }

  .placeholder-card h3 {
    font-size: 1.2rem;
  }

  .placeholder-card p {
    font-size: 0.9rem;
  }
}
</style> 