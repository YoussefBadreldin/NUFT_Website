<template>
  <div class="universities-container">
    <Header />
    <div class="content" dir="rtl">
      <h1 class="title">دليل الجامعات المصرية</h1>
      
      <!-- Type Tabs -->
      <div class="type-tabs">
        <button 
          v-for="type in universityTypes" 
          :key="type.value"
          :class="['type-tab', { active: selectedType === type.value }]"
          @click="selectedType = type.value"
        >
          {{ type.label }}
        </button>
      </div>

      <!-- Search Bar -->
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="ابحث عن جامعة..." 
          class="search-input"
        >
        <i class="fas fa-search search-icon"></i>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>جاري تحميل الجامعات...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button @click="fetchAllUniversities" class="retry-button">إعادة المحاولة</button>
      </div>

      <!-- Content -->
      <div v-else class="universities-grid">
        <!-- Private Universities -->
        <div v-if="filteredPrivateUniversities.length" class="university-section">
          <h2 class="section-title">الجامعات الخاصة</h2>
          <div class="universities-list">
            <div v-for="uni in filteredPrivateUniversities" :key="uni.id" class="university-card" @click="navigateToUniversity('private', uni.id)">
              <img :src="uni.logo" :alt="uni.name" class="university-logo" @error="handleImageError">
              <h3 class="university-name">{{ uni.name }}</h3>
            </div>
          </div>
        </div>

        <!-- National Universities -->
        <div v-if="filteredNationalUniversities.length" class="university-section">
          <h2 class="section-title">الجامعات الأهلية</h2>
          <div class="universities-list">
            <div v-for="uni in filteredNationalUniversities" :key="uni.id" class="university-card" @click="navigateToUniversity('national', uni.id)">
              <img :src="uni.logo" :alt="uni.name" class="university-logo" @error="handleImageError">
              <h3 class="university-name">{{ uni.name }}</h3>
            </div>
          </div>
        </div>

        <!-- Special Universities -->
        <div v-if="filteredSpecialUniversities.length" class="university-section">
          <h2 class="section-title">الجامعات ذات طبيعة خاصة</h2>
          <div class="universities-list">
            <div v-for="uni in filteredSpecialUniversities" :key="uni.id" class="university-card" @click="navigateToUniversity('special', uni.id)">
              <img :src="uni.logo" :alt="uni.name" class="university-logo" @error="handleImageError">
              <h3 class="university-name">{{ uni.name }}</h3>
            </div>
          </div>
        </div>

        <!-- International Universities -->
        <div v-if="filteredInternationalUniversities.length" class="university-section">
          <h2 class="section-title">الجامعات الدولية</h2>
          <div class="universities-list">
            <div v-for="uni in filteredInternationalUniversities" :key="uni.id" class="university-card" @click="navigateToUniversity('international', uni.id)">
              <img :src="uni.logo" :alt="uni.name" class="university-logo" @error="handleImageError">
              <h3 class="university-name">{{ uni.name }}</h3>
            </div>
          </div>
        </div>

        <!-- No Results Message -->
        <div v-if="!hasFilteredResults" class="no-results">
          <p>لا توجد جامعات تطابق البحث</p>
        </div>
      </div>
    </div>
    <smartAssistantComponent />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Header from '../../../public/global/headerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
  name: 'Universities',
  components: {
    Header,
    smartAssistantComponent
  },
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const error = ref(null);
    const privateUniversities = ref([]);
    const nationalUniversities = ref([]);
    const specialUniversities = ref([]);
    const internationalUniversities = ref([]);
    const searchQuery = ref('');
    const selectedType = ref('all');

    const universityTypes = [
      { label: 'الكل', value: 'all' },
      { label: 'الجامعات الخاصة', value: 'private' },
      { label: 'الجامعات الأهلية', value: 'national' },
      { label: 'الجامعات ذات طبيعة خاصة', value: 'special' },
      { label: 'الجامعات الدولية', value: 'international' }
    ];

    const filterUniversities = (universities) => {
      return universities.filter(uni => 
        uni.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    };

    const filteredPrivateUniversities = computed(() => {
      if (selectedType.value !== 'all' && selectedType.value !== 'private') return [];
      return filterUniversities(privateUniversities.value);
    });

    const filteredNationalUniversities = computed(() => {
      if (selectedType.value !== 'all' && selectedType.value !== 'national') return [];
      return filterUniversities(nationalUniversities.value);
    });

    const filteredSpecialUniversities = computed(() => {
      if (selectedType.value !== 'all' && selectedType.value !== 'special') return [];
      return filterUniversities(specialUniversities.value);
    });

    const filteredInternationalUniversities = computed(() => {
      if (selectedType.value !== 'all' && selectedType.value !== 'international') return [];
      return filterUniversities(internationalUniversities.value);
    });

    const hasFilteredResults = computed(() => {
      return filteredPrivateUniversities.value.length > 0 ||
             filteredNationalUniversities.value.length > 0 ||
             filteredSpecialUniversities.value.length > 0 ||
             filteredInternationalUniversities.value.length > 0;
    });

    const fetchAllUniversities = async () => {
      loading.value = true;
      error.value = null;

      try {
        // Try to fetch from API
        const [privateResponse, nationalResponse, specialResponse, internationalResponse] = await Promise.allSettled([
          axios.get('https://nuft-website-backend.vercel.app/private/links'),
          axios.get('https://nuft-website-backend.vercel.app/national/links'),
          axios.get('https://nuft-website-backend.vercel.app/special/links'),
          axios.get('https://nuft-website-backend.vercel.app/international/links')
        ]);

        // Process private universities
        if (privateResponse.status === 'fulfilled' && privateResponse.value.data && Array.isArray(privateResponse.value.data)) {
          privateUniversities.value = privateResponse.value.data.map(uni => ({
            id: uni.university || uni.university_code,
            name: uni.university_Arabic_Name,
            logo: uni.university_Logo || '/images/default-university.png',
            type: 'private'
          }));
        } else {
          throw new Error('Failed to fetch private universities');
        }

        // Process national universities
        if (nationalResponse.status === 'fulfilled' && nationalResponse.value.data && Array.isArray(nationalResponse.value.data)) {
          nationalUniversities.value = nationalResponse.value.data.map(uni => ({
            id: uni.university || uni.university_code,
            name: uni.university_Arabic_Name,
            logo: uni.university_Logo || '/images/default-university.png',
            type: 'national'
          }));
        } else {
          throw new Error('Failed to fetch national universities');
        }

        // Process special universities
        if (specialResponse.status === 'fulfilled' && specialResponse.value.data && Array.isArray(specialResponse.value.data)) {
          specialUniversities.value = specialResponse.value.data.map(uni => ({
            id: uni.university || uni.university_code,
            name: uni.university_Arabic_Name,
            logo: uni.university_Logo || '/images/default-university.png',
            type: 'special'
          }));
        } else {
          throw new Error('Failed to fetch special universities');
        }

        // Process international universities
        if (internationalResponse.status === 'fulfilled' && internationalResponse.value.data && Array.isArray(internationalResponse.value.data)) {
          internationalUniversities.value = internationalResponse.value.data.map(uni => ({
            id: uni.university || uni.university_code,
            name: uni.university_Arabic_Name,
            logo: uni.university_Logo || '/images/default-university.png',
            type: 'international'
          }));
        } else {
          throw new Error('Failed to fetch international universities');
        }

        // Check if any universities were loaded
        if (!privateUniversities.value.length && 
            !nationalUniversities.value.length && 
            !specialUniversities.value.length && 
            !internationalUniversities.value.length) {
          error.value = 'No universities found. Please try again later.';
        }

      } catch (err) {
        console.error('Error fetching universities:', err);
        error.value = 'Failed to load universities. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    const navigateToUniversity = (type, id) => {
      console.log('Navigating to university:', { type, id });
      
      // Find the university data from the appropriate array
      let universityData;
      switch (type) {
        case 'private':
          universityData = privateUniversities.value.find(uni => uni.id === id);
          break;
        case 'national':
          universityData = nationalUniversities.value.find(uni => uni.id === id);
          break;
        case 'special':
          universityData = specialUniversities.value.find(uni => uni.id === id);
          break;
        case 'international':
          universityData = internationalUniversities.value.find(uni => uni.id === id);
          break;
      }

      console.log('Found university data:', universityData);

      if (universityData && universityData.id) {
        // Store the university data in localStorage before navigation
        localStorage.setItem('currentUniversityData', JSON.stringify(universityData));
        // Use the university code from the API response
        router.push(`/Guide/${type}/${universityData.id}`);
      } else {
        console.error('University data or ID not found:', { type, id, universityData });
      }
    };

    const handleImageError = (event) => {
      event.target.src = '/images/default-university.png';
    };

    onMounted(() => {
      fetchAllUniversities();
    });

    return {
      loading,
      error,
      privateUniversities,
      nationalUniversities,
      specialUniversities,
      internationalUniversities,
      fetchAllUniversities,
      navigateToUniversity,
      handleImageError,
      searchQuery,
      selectedType,
      universityTypes,
      filteredPrivateUniversities,
      filteredNationalUniversities,
      filteredSpecialUniversities,
      filteredInternationalUniversities,
      hasFilteredResults
    };
  }
};
</script>

<style scoped>
.universities-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Cairo', sans-serif;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  text-align: center;
  color: #1a237e;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
}

.type-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.type-tab {
  padding: 0.75rem 1.5rem;
  border: 2px solid #1a237e;
  border-radius: 8px;
  background: white;
  color: #1a237e;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-tab:hover {
  background: #e8eaf6;
}

.type-tab.active {
  background: #1a237e;
  color: white;
}

.search-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: #1a237e;
  box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 1.2rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #1a237e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-container p {
  color: #1a237e;
  font-size: 1.2rem;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  color: #d32f2f;
  padding: 2rem;
  font-size: 1.1rem;
}

.retry-button {
  background-color: #1a237e;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-family: 'Cairo', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: #283593;
}

.university-section {
  margin-bottom: 3rem;
}

.section-title {
  color: #1a237e;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 2px solid #1a237e;
  padding-bottom: 0.5rem;
  font-weight: 700;
}

.universities-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.university-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.university-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.university-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.university-name {
  color: #1a237e;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .universities-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .university-logo {
    width: 100px;
    height: 100px;
  }

  .type-tabs {
    gap: 0.5rem;
  }

  .type-tab {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .search-input {
    font-size: 1rem;
    padding: 0.75rem 2.5rem 0.75rem 0.75rem;
  }
}
</style> 