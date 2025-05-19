<template>
  <div class="account-page">
    <HeaderComponent />
    
    <div class="account-container">
      <div class="account-header">
        <h1>حسابي</h1>
        <p class="welcome-text">مرحباً {{ userName }}</p>
      </div>

      <div class="account-content">
        <div class="info-section">
          <h2>المعلومات الشخصية</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>الاسم الأول</label>
              <p>{{ firstName }}</p>
            </div>
            <div class="info-item">
              <label>الاسم الأخير</label>
              <p>{{ lastName }}</p>
            </div>
            <div class="info-item">
              <label>البريد الإلكتروني</label>
              <p>{{ email }}</p>
            </div>
            <div class="info-item">
              <label>رقم الهاتف</label>
              <p>{{ phoneNumber }}</p>
            </div>
            <div class="info-item">
              <label>الجنسية</label>
              <p>{{ nationality }}</p>
            </div>
          </div>
        </div>

        <div class="academic-section">
          <h2>المعلومات الأكاديمية</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>المجموع</label>
              <p>{{ grade }}</p>
            </div>
            <div class="info-item">
              <label>الشعبة</label>
              <p>{{ division }}</p>
            </div>
            <div class="info-item">
              <label>نوع الشهادة</label>
              <p>{{ certificateType }}</p>
            </div>
          </div>
        </div>

        <div class="interests-section">
          <h2>الكليات محل الاهتمام</h2>
          <div class="interests-grid">
            <div v-for="(college, index) in collegesOfInterest" :key="index" class="interest-item">
              {{ college }}
            </div>
          </div>
        </div>
      </div>

      <div class="logout-container">
        <button class="logout-btn" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          تسجيل الخروج
        </button>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import axios from 'axios';

export default {
  name: 'AccountPage',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      nationality: '',
      grade: '',
      division: '',
      certificateType: '',
      collegesOfInterest: []
    };
  },
  mounted() {
    // Check if user is logged in
    const name = localStorage.getItem('name');
    if (!name) {
      this.$router.push('/Login');
      return;
    }

    this.userName = name;
    // Fetch user data
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get(`https://nuft-website-backend.vercel.app/auth/user/${this.userName}`);
        const userData = response.data;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.email = userData.email;
        this.phoneNumber = userData.phoneNumber;
        this.nationality = userData.nationality;
        this.grade = userData.grade;
        this.division = userData.division;
        this.certificateType = userData.certificateType;
        this.collegesOfInterest = userData.collegesOfInterest;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
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

.account-page {
  min-height: 100vh;
  background: #f8f9fa;
  font-family: 'Tajawal', sans-serif;
}

.account-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.account-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.account-header h1 {
  color: #001d3d;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-text {
  color: #6c757d;
  font-size: 1.1rem;
}

.account-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.info-section,
.academic-section,
.interests-section {
  margin-bottom: 2rem;
}

.info-section h2,
.academic-section h2,
.interests-section h2 {
  color: #001d3d;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.info-item label {
  display: block;
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.info-item p {
  color: #001d3d;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.interest-item {
  background: #f8f9fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #001d3d;
  font-size: 1rem;
  text-align: center;
}

.logout-container {
  margin-top: 2rem;
  text-align: center;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
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
  .account-container {
    margin: 1rem auto;
  }

  .account-header h1 {
    font-size: 2rem;
  }

  .account-content {
    padding: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .interests-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .logout-btn {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style> 