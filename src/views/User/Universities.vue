<template>
  <div class="universities-container">
    <Header />
    <div class="content" dir="rtl">
      <h1 class="title">دليل الجامعات المصرية</h1>
      
      <!-- Type Selector Tabs -->
      <div class="status-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
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
        <div v-if="activeTab === 'private' && privateUniversities.length" class="university-section">
          <div class="universities-list">
            <div v-for="uni in privateUniversities" :key="uni.id" class="university-card" @click="navigateToUniversity('private', uni.id)">
              <img :src="uni.logo" :alt="uni.name" class="university-logo" @error="handleImageError">
              <h3 class="university-name">{{ uni.name }}</h3>
            </div>
          </div>
        </div>

        <!-- National Universities -->
        <div v-if="activeTab === 'national' && nationalUniversities.length" class="university-section">
          <div class="universities-list">
            <div v-for="uni in nationalUniversities" :key="uni.id" class="university-card" @click="navigateToUniversity('national', uni.id)">
              <img :src="uni.logo" :alt="uni.name" class="university-logo" @error="handleImageError">
              <h3 class="university-name">{{ uni.name }}</h3>
            </div>
          </div>
        </div>

        <!-- Special Universities -->
        <div v-if="activeTab === 'special' && specialUniversities.length" class="university-section">
          <div class="universities-list">
            <div v-for="uni in specialUniversities" :key="uni.id" class="university-card" @click="navigateToUniversity('special', uni.id)">
              <img :src="uni.logo" :alt="uni.name" class="university-logo" @error="handleImageError">
              <h3 class="university-name">{{ uni.name }}</h3>
            </div>
          </div>
        </div>

        <!-- International Universities -->
        <div v-if="activeTab === 'international' && internationalUniversities.length" class="university-section">
          <div class="universities-list">
            <div v-for="uni in internationalUniversities" :key="uni.id" class="university-card" @click="navigateToUniversity('international', uni.id)">
              <img :src="uni.logo" :alt="uni.name" class="university-logo" @error="handleImageError">
              <h3 class="university-name">{{ uni.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <smartAssistantComponent />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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
    const activeTab = ref('private');
    const privateUniversities = ref([]);
    const nationalUniversities = ref([]);
    const specialUniversities = ref([]);
    const internationalUniversities = ref([]);

    const tabs = [
      { id: 'private', name: 'الجامعات الخاصة' },
      { id: 'national', name: 'الجامعات الأهلية' },
      { id: 'special', name: 'الجامعات ذات طبيعة خاصة' },
      { id: 'international', name: 'الجامعات الدولية' }
    ];

    const fetchAllUniversities = async () => {
      loading.value = true;
      error.value = null;

      // Hardcoded university data as fallback
      const hardcodedUniversities = {
        private: [
          // Original private universities
          { id: 'AHUC', name: 'جامعة الحياة بالقاهرة', logo: '/images/Logos/Universites/Private/AHUC.png' },
          { id: 'ACU', name: 'جامعة الأهرام الكندية', logo: '/images/Logos/Universites/Private/ACU.png' },
          { id: 'ASU', name: 'جامعة السلام', logo: '/images/Logos/Universites/Private/ASU.png' },
          { id: 'GUC', name: 'الجامعة الألمانية بالقاهرة', logo: '/images/Logos/Universites/Private/GUC.png' },
          { id: 'BADYA', name: 'جامعة باديا', logo: '/images/Logos/Universites/Private/BADYA.png' },
          { id: 'BUC', name: 'جامعة بدر بالقاهرة', logo: '/images/Logos/Universites/Private/BUC.png' },
          { id: 'BUA', name: 'جامعة بدر بأسيوط', logo: '/images/Logos/Universites/Private/BUA.png' },
          { id: 'BUE', name: 'الجامعة البريطانية في مصر', logo: '/images/Logos/Universites/Private/BUE.png' },
          { id: 'CUC', name: 'جامعة المدينة بالقاهرة', logo: '/images/Logos/Universites/Private/CUC.png' },
          { id: 'DU', name: 'جامعة الدلتا للعلوم والتكنولوجيا', logo: '/images/Logos/Universites/Private/DU.png' },
          { id: 'ERU', name: 'الجامعة المصرية الروسية', logo: '/images/Logos/Universites/Private/ERU.png' },
          { id: 'ECU', name: 'الجامعة المصرية الصينية', logo: '/images/Logos/Universites/Private/ECU.png' },
          { id: 'FUE', name: 'جامعة المستقبل', logo: '/images/Logos/Universites/Private/FUE.png' },
          { id: 'NGU', name: 'جامعة الجيزة الجديدة', logo: '/images/Logos/Universites/Private/NGU.png' },
          { id: 'HU', name: 'جامعة هيليوبليس', logo: '/images/Logos/Universites/Private/HU.png' },
          { id: 'HUE', name: 'جامعة حورس', logo: '/images/Logos/Universites/Private/HUE.png' },
          { id: 'IU', name: 'جامعة الابتكار', logo: '/images/Logos/Universites/Private/IU.png' },
          { id: 'DerayaU', name: 'جامعة دراية', logo: '/images/Logos/Universites/Private/DerayaU.png' },
          { id: 'LUM', name: 'جامعة اللوتس', logo: '/images/Logos/Universites/Private/LOTUS.png' },
          { id: 'MSA', name: 'جامعة أكتوبر للعلوم الحديثة والآداب', logo: '/images/Logos/Universites/Private/MSA.png' },
          { id: 'MUC', name: 'جامعة مايو بالقاهرة', logo: '/images/Logos/Universites/Private/MUC.png' },
          { id: 'MUE', name: 'جامعة ميريت', logo: '/images/Logos/Universites/Private/MUE.png' },
          { id: 'MIU', name: 'جامعة مصر الدولية', logo: '/images/Logos/Universites/Private/MIU.png' },
          { id: 'MUST', name: 'جامعة مصر للعلوم والتكنولوجيا', logo: '/images/Logos/Universites/Private/MUST.png' },
          { id: 'MTI', name: 'الجامعة الحديثة للتكنولوجيا والمعلومات', logo: '/images/Logos/Universites/Private/MTI.png' },
          { id: 'NUB', name: 'جامعة النهضة ببني سويف', logo: '/images/Logos/Universites/Private/NUB.png' },
          { id: 'NVU', name: 'جامعة وادي النيل', logo: '/images/Logos/Universites/Private/NVU.png' },
          { id: 'O6U', name: 'جامعة 6 اكتوبر', logo: '/images/Logos/Universites/Private/O6U.png' },
          { id: 'PUA', name: 'جامعة فاروس بالإسكندرية', logo: '/images/Logos/Universites/Private/PUA.png' },
          { id: 'RU', name: 'جامعة رشيد', logo: '/images/Logos/Universites/Private/RU.png' },
          { id: 'RST', name: 'جامعة الريادة للعلوم والتكنولوجيا', logo: '/images/Logos/Universites/Private/RST.png' },
          { id: 'SUT', name: 'جامعة السويدي للتكنولوجيا', logo: '/images/Logos/Universites/Private/SUT.png' },
          { id: 'SGU', name: 'جامعة الصالحية الجديدة', logo: '/images/Logos/Universites/Private/SGU.png' },
          { id: 'SU', name: 'جامعة سيناء', logo: '/images/Logos/Universites/Private/SU.png' },
          { id: 'SphinxU', name: 'جامعة سفنكس', logo: '/images/Logos/Universites/Private/SphinxU.png' },
          { id: 'SEU', name: 'جامعة ساكسوني مصر للعلوم التطبيقية والتكنولوجيا', logo: '/images/Logos/Universites/Private/SEU.png' }
        ],
        national: [
          // National universities
          { id: 'AlexNU', name: 'جامعة الاسكندرية الاهلية', logo: '/images/Logos/Universites/National/AlexNU.png' },
          { id: 'AssuitNU', name: 'جامعة اسيوط الاهلية', logo: '/images/Logos/Universites/National/AssuitNU.png' },
          { id: 'BNU', name: 'جامعة بنها الاهلية', logo: '/images/Logos/Universites/National/BNU.png' },
          { id: 'BSNU', name: 'جامعة بني سويف الاهلية', logo: '/images/Logos/Universites/National/BSNU.png' },
          { id: 'HNU', name: 'جامعة حلوان الاهلية', logo: '/images/Logos/Universites/National/HNU.png' },
          { id: 'SVNU', name: 'جامعة جنوب الوادي الاهلية', logo: '/images/Logos/Universites/National/SVNU.png' },
          { id: 'NINU', name: 'جامعة الإسماعيلية الجديدة الاهلية', logo: '/images/Logos/Universites/National/NINU.png' },
          { id: 'MiniaNU', name: 'جامعة المنيا الاهلية', logo: '/images/Logos/Universites/National/MiniaNU.png' },
          { id: 'MansNU', name: 'جامعة المنصورة الاهلية', logo: '/images/Logos/Universites/National/MansNU.png' },
          { id: 'MenofiaNU', name: 'جامعة المنوفية الاهلية', logo: '/images/Logos/Universites/National/MenofiaNU.png' },
          { id: 'EPNU', name: 'جامعة شرق بورسعيد الاهلية', logo: '/images/Logos/Universites/National/EPNU.png' },
          { id: 'ZNU', name: 'جامعة الزقازيق الاهلية', logo: '/images/Logos/Universites/National/ZNU.png' },
          // National International universities
          { id: 'GU', name: 'جامعة الجلالة', logo: '/images/Logos/Universites/National/GU.png' },
          { id: 'AIU', name: 'جامعة العلمين الدولية', logo: '/images/Logos/Universites/National/AIU.png' },
          { id: 'KSIU', name: 'جامعة الملك سلمان الدولية', logo: '/images/Logos/Universites/National/KSIU.png' },
          { id: 'NMU', name: 'جامعة المنصورة الجديدة', logo: '/images/Logos/Universites/National/NMU.png' },
          // Other National universities
          { id: 'UFE', name: 'الجامعة الفرنسية بمصر', logo: '/images/Logos/Universites/National/UFE.png' },
          { id: 'EELU', name: 'الجامعة المصرية للتعليم الالكتروني', logo: '/images/Logos/Universites/National/EELU.png' },
          { id: 'EUI', name: 'جامعة مصر للمعلوماتية', logo: '/images/Logos/Universites/National/EUI.png' },
          { id: 'NU', name: 'جامعة النيل الاهلية', logo: '/images/Logos/Universites/National/NU.png' }
        ],
        special: [
          // Framework Agreement universities
          { id: 'AASTMT', name: 'الأكاديمية البحرية للعلوم والتكنولوجيا والنقل البحري', logo: '/images/Logos/Universites/Special/AASTMT.png' },
          { id: 'AOU', name: 'الجامعة العربية المفتوحة', logo: '/images/Logos/Universites/Special/AOU.png' },
          // International Agreement universities
          { id: 'EslscaU', name: 'جامعة اسلسكا', logo: '/images/Logos/Universites/Special/EslscaU.png' },
          { id: 'AUC', name: 'الجامعة الأمريكية بالقاهرة', logo: '/images/Logos/Universites/Special/AUC.png' },
          { id: 'EJUST', name: 'الجامعة المصرية اليابانية', logo: '/images/Logos/Universites/Special/EJUST.png' },
          { id: 'GIU', name: 'الجامعة الألمانية الدولية', logo: '/images/Logos/Universites/Special/GIU.png' },
          // Special Law universities
          { id: 'UST', name: 'جامعة العلوم والتكنولوجيا بمدينة زويل', logo: '/images/Logos/Universites/Special/UST.png' }
        ],
        international: [
          // International branch universities
          { id: 'UEL', name: 'جامعة ايست لندن', logo: '/images/Logos/Universites/International/UEL.png' },
          { id: 'UPEI', name: 'جامعة جزيرة الأمير إدوارد', logo: '/images/Logos/Universites/International/UPEI.png' },
          { id: 'KPFU', name: 'جامعة كازان الفيدرالية الروسية', logo: '/images/Logos/Universites/International/KPFU.png' },
          { id: 'Coventry', name: 'جامعة كوفنتري البريطانية', logo: '/images/Logos/Universites/International/COVENTRY.png' },
          { id: 'NOVA', name: 'جامعة نوفا ليشبونا البرتغالية', logo: '/images/Logos/Universites/International/NOVA.png' },
          { id: 'SPBU', name: 'جامعة سان بطرسبرج الروسية', logo: '/images/Logos/Universites/International/SPBU.png' },
          { id: 'UH', name: 'جامعة هيرتفوردشاير البريطانية', logo: '/images/Logos/Universites/International/UH.png' },
          { id: 'UCLAN', name: 'جامعة وسط لانكشاير', logo: '/images/Logos/Universites/International/UCLan.png' },
          { id: 'UOL', name: 'جامعة لندن', logo: '/images/Logos/Universites/International/UOL.png' }
        ]
      };

      try {
        // Try to fetch from API first
        const [privateResponse, nationalResponse, specialResponse, internationalResponse] = await Promise.allSettled([
          axios.get('https://nuft-website-backend.vercel.app/privatefaculty/getprivate'),
          axios.get('https://nuft-website-backend.vercel.app/nationalfaculty/getnational'),
          axios.get('https://nuft-website-backend.vercel.app/specialfaculty/getspecial'),
          axios.get('https://nuft-website-backend.vercel.app/internationalfaculty/getinternational')
        ]);

        // Process private universities
        if (privateResponse.status === 'fulfilled' && privateResponse.value.data && Array.isArray(privateResponse.value.data)) {
          privateUniversities.value = privateResponse.value.data.map(uni => ({
            id: uni.university_code,
            name: uni.university_Arabic_Name,
            logo: uni.university_Logo || '/images/default-university.png',
            type: 'private',
            bio: uni.Uni_Bio,
            location: uni.location,
            website: uni.website,
            phone: uni.phone,
            email: uni.email,
            facebook: uni.facebook,
            instagram: uni.instagram,
            youtube: uni.youtube,
            linkedin: uni.linkedin,
            firstYear: uni.first_year,
            secondYear: uni.second_year,
            international_programs: uni.international_programs,
            dorms_link: uni.dorms_link,
            transportation_link: uni.transportation_link,
            scholarship_link: uni.scholarship_link,
            Egyptian_Admission_link: uni.Egyptian_Admission_link,
            Egyptian_Admission_link2: uni.Egyptian_Admission_link2,
            Egyptian_Transfer_link: uni.Egyptian_Transfer_link,
            Wafdeen_Admission_link: uni.Wafdeen_Admission_link
          }));
        } else {
          privateUniversities.value = hardcodedUniversities.private;
        }

        // Process national universities
        if (nationalResponse.status === 'fulfilled' && nationalResponse.value.data && Array.isArray(nationalResponse.value.data)) {
          nationalUniversities.value = nationalResponse.value.data.map(uni => ({
            id: uni.university_code,
            name: uni.university_Arabic_Name,
            logo: uni.university_Logo || '/images/default-university.png',
            type: 'national',
            bio: uni.Uni_Bio,
            location: uni.location,
            website: uni.website,
            phone: uni.phone,
            email: uni.email,
            facebook: uni.facebook,
            instagram: uni.instagram,
            youtube: uni.youtube,
            linkedin: uni.linkedin,
            firstYear: uni.first_year,
            secondYear: uni.second_year,
            international_programs: uni.international_programs,
            dorms_link: uni.dorms_link,
            transportation_link: uni.transportation_link,
            scholarship_link: uni.scholarship_link,
            Egyptian_Admission_link: uni.Egyptian_Admission_link,
            Egyptian_Admission_link2: uni.Egyptian_Admission_link2,
            Egyptian_Transfer_link: uni.Egyptian_Transfer_link,
            Wafdeen_Admission_link: uni.Wafdeen_Admission_link
          }));
        } else {
          nationalUniversities.value = hardcodedUniversities.national;
        }

        // Process special universities
        if (specialResponse.status === 'fulfilled' && specialResponse.value.data && Array.isArray(specialResponse.value.data)) {
          specialUniversities.value = specialResponse.value.data.map(uni => ({
            id: uni.university_code,
            name: uni.university_Arabic_Name,
            logo: uni.university_Logo || '/images/default-university.png',
            type: 'special',
            bio: uni.Uni_Bio,
            location: uni.location,
            website: uni.website,
            phone: uni.phone,
            email: uni.email,
            facebook: uni.facebook,
            instagram: uni.instagram,
            youtube: uni.youtube,
            linkedin: uni.linkedin,
            firstYear: uni.first_year,
            secondYear: uni.second_year,
            international_programs: uni.international_programs,
            dorms_link: uni.dorms_link,
            transportation_link: uni.transportation_link,
            scholarship_link: uni.scholarship_link,
            Egyptian_Admission_link: uni.Egyptian_Admission_link,
            Egyptian_Admission_link2: uni.Egyptian_Admission_link2,
            Egyptian_Transfer_link: uni.Egyptian_Transfer_link,
            Wafdeen_Admission_link: uni.Wafdeen_Admission_link
          }));
        } else {
          specialUniversities.value = hardcodedUniversities.special;
        }

        // Process international universities
        if (internationalResponse.status === 'fulfilled' && internationalResponse.value.data && Array.isArray(internationalResponse.value.data)) {
          internationalUniversities.value = internationalResponse.value.data.map(uni => ({
            id: uni.university_code,
            name: uni.university_Arabic_Name,
            logo: uni.university_Logo || '/images/default-university.png',
            type: 'international',
            bio: uni.Uni_Bio,
            location: uni.location,
            website: uni.website,
            phone: uni.phone,
            email: uni.email,
            facebook: uni.facebook,
            instagram: uni.instagram,
            youtube: uni.youtube,
            linkedin: uni.linkedin,
            firstYear: uni.first_year,
            secondYear: uni.second_year,
            international_programs: uni.international_programs,
            dorms_link: uni.dorms_link,
            transportation_link: uni.transportation_link,
            scholarship_link: uni.scholarship_link,
            Egyptian_Admission_link: uni.Egyptian_Admission_link,
            Egyptian_Admission_link2: uni.Egyptian_Admission_link2,
            Egyptian_Transfer_link: uni.Egyptian_Transfer_link,
            Wafdeen_Admission_link: uni.Wafdeen_Admission_link
          }));
        } else {
          internationalUniversities.value = hardcodedUniversities.international;
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
        // Use hardcoded data as fallback
        privateUniversities.value = hardcodedUniversities.private;
        nationalUniversities.value = hardcodedUniversities.national;
        specialUniversities.value = hardcodedUniversities.special;
        internationalUniversities.value = hardcodedUniversities.international;
      } finally {
        loading.value = false;
      }
    };

    const navigateToUniversity = (type, id) => {
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

      if (universityData) {
        // Store the university data in localStorage before navigation
        localStorage.setItem('currentUniversityData', JSON.stringify(universityData));
        router.push(`/Guide/${id}`);
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
      activeTab,
      tabs,
      privateUniversities,
      nationalUniversities,
      specialUniversities,
      internationalUniversities,
      fetchAllUniversities,
      navigateToUniversity,
      handleImageError
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

.status-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #1a237e;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
}

.tab-button:hover {
  background-color: #e9ecef;
}

.tab-button.active {
  background-color: #1a237e;
  color: white;
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

  .status-tabs {
    flex-wrap: wrap;
  }

  .tab-button {
    width: 100%;
  }
}
</style> 