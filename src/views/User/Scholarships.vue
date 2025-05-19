<template>
  <div>
    <header-component />

    <!-- Page Title -->
    <div class="page-header" dir="rtl">
      <h2>المنح  </h2>
    </div>

    <!-- Cards Box -->
    <div class="scholarships-container" dir="rtl">
      <div class="container">
        <div class="scholarships-grid">
          <!-- Scholarship cards go here -->
          <div class="scholarship-card" v-for="scholarship in sortedScholarships" :key="scholarship.id">
            <div class="scholarship-image">
              <img 
                :src="scholarship.scholarship_photo" 
                :alt="scholarship.scholarship_title" 
                v-if="scholarship.scholarship_photo"
                @error="handleImageError" 
              />
              <img 
                v-else 
                src="/images/default-scholarship.png" 
                alt="صورة المنحة" 
                class="default-image"
              />
            </div>
            <div class="scholarship-type">
              <span>{{ scholarship.scholarship_type }}</span>
            </div>
            <div class="scholarship-content">
              <h4><a :href="scholarship.scholarship_link" target="_blank">{{ scholarship.scholarship_title }}</a></h4>
              <p class="scholarship-details">{{ scholarship.scholarship_details }}</p>
              <p class="due-date"><strong>آخر موعد للتقديم:</strong> {{ scholarship.due_date }}</p>
              <a :href="scholarship.scholarship_link" class="details-button" target="_blank">تفاصيل</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
    <smartAssistantComponent />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
  name: 'ScholarshipPage',
  components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
  },
  data() {
    return {
      scholarshipData: []
    };
  },
  computed: {
    sortedScholarships() {
      return this.scholarshipData.slice().sort((a, b) => a.id - b.id).reverse();
    }
  },
  methods: {
    async getScholarships() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/Schoralships/all');
        this.scholarshipData = response.data.map(scholarship => ({
          id: scholarship.id,
          scholarship_title: scholarship.scholarship_title,
          scholarship_photo: scholarship.scholarship_photo,
          scholarship_details: scholarship.scholarship_details,
          scholarship_link: scholarship.scholarship_link,
          scholarship_type: scholarship.scholarship_type,
          due_date: scholarship.due_date
        }));
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    },
    handleImageError(event) {
      event.target.src = '/images/default-scholarship.png';
    }
  },
  created() {
    this.getScholarships();
  }
};
</script>

<style scoped>
.page-header {
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h2 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
  color: #1a237e;
}

.scholarships-container {
  padding: 2rem 0;
  background-color: #f5f5f5;
  min-height: calc(100vh - 300px);
  font-family: 'Cairo', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.scholarships-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.scholarship-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.scholarship-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.scholarship-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  order: 1;
}

.scholarship-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.scholarship-card:hover .scholarship-image img {
  transform: scale(1.05);
}

.default-image {
  opacity: 0.7;
}

.scholarship-type {
  background-color: #1a237e;
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  order: 2;
}

.scholarship-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  order: 3;
}

.scholarship-content h4 {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
}

.scholarship-content h4 a {
  color: #1a237e;
  text-decoration: none;
  transition: color 0.3s ease;
}

.scholarship-content h4 a:hover {
  color: #283593;
}

.scholarship-details {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
  flex-grow: 1;
  text-align: right;
}

.due-date {
  color: #d32f2f;
  margin: 1rem 0;
  font-size: 0.95rem;
  text-align: right;
}

.details-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #1a237e;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.3s ease;
  margin-top: auto;
  font-family: 'Cairo', sans-serif;
}

.details-button:hover {
  background-color: #283593;
}

@media (max-width: 768px) {
  .page-header h2 {
    font-size: 2rem;
  }

  .scholarships-grid {
    grid-template-columns: 1fr;
  }

  .scholarship-card {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
