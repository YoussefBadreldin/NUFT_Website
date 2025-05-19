<template>
  <div class="admission-admin-container" dir="rtl">
    <div class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        رجوع
      </button>
      <h1>إدارة حالة التقديمات</h1>
      <p class="subtitle">إدارة وتعديل حالة التقديمات للجامعات</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="nav-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="nav-tab" 
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <i class="fas fa-university"></i>
        {{ tab.name }}
      </button>
    </div>

    <!-- Universities List Section -->
    <div class="universities-list-section">
      <div class="section-header">
        <h2>الجامعات</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن جامعة..."
            @input="filterUniversities"
          >
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>جاري التحميل...</p>
      </div>

      <div v-else-if="filteredUniversities.length === 0" class="no-results">
        <i class="fas fa-university"></i>
        <p>لا توجد جامعات</p>
      </div>

      <div v-else class="universities-grid">
        <div v-for="(pair, index) in pairedUniversities" :key="index" class="university-card">
          <div class="university-header">
            <h3>{{ pair[0].university_Arabic_Name }}</h3>
            <button class="toggle-btn" @click="toggleSection(index)">
              <i class="fas" :class="isSectionOpen(index) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              {{ isSectionOpen(index) ? 'إغلاق' : 'فتح' }}
            </button>
          </div>

          <div class="status-sections" v-show="isSectionOpen(index)">
            <!-- Transfer Status -->
            <div class="status-section">
              <h4>التحويل</h4>
              <div class="status-inputs">
                <div class="status-input">
                  <label>الحالة الحالية</label>
                  <div class="current-value">{{ pair[0].transfer_status }}</div>
                </div>
                <div class="status-input">
                  <label>آخر موعد الحالي</label>
                  <div class="current-value">{{ pair[1].transfer_deadline }}</div>
                </div>
                <div class="status-input">
                  <label>الحالة الجديدة</label>
                  <select v-model="pair[1].transfer_status">
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>
                <div class="status-input">
                  <label>آخر موعد الجديد</label>
                  <input type="date" v-model="pair[1].transfer_deadline">
                </div>
              </div>
            </div>

            <!-- Thanawya Status -->
            <div class="status-section">
              <h4>الثانوية العامة وستيم والنيل</h4>
              <div class="year-status">
                <div class="status-inputs">
                  <div class="status-input">
                    <label>{{ firstYear }} - الحالة الحالية</label>
                    <div class="current-value">{{ pair[0].thanwyaa_firstYear_status }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ firstYear }} - آخر موعد الحالي</label>
                    <div class="current-value">{{ pair[1].thanwyaa_firstYear_deadline }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ firstYear }} - الحالة الجديدة</label>
                    <select v-model="pair[1].thanwyaa_firstYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>{{ firstYear }} - آخر موعد الجديد</label>
                    <input type="date" v-model="pair[1].thanwyaa_firstYear_deadline">
                  </div>
                </div>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>{{ secondYear }} - الحالة الحالية</label>
                    <div class="current-value">{{ pair[0].thanwyaa_secondYear_status }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ secondYear }} - آخر موعد الحالي</label>
                    <div class="current-value">{{ pair[1].thanwyaa_secondYear_deadline }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ secondYear }} - الحالة الجديدة</label>
                    <select v-model="pair[1].thanwyaa_secondYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>{{ secondYear }} - آخر موعد الجديد</label>
                    <input type="date" v-model="pair[1].thanwyaa_secondYear_deadline">
                  </div>
                </div>
              </div>
            </div>

            <!-- Azhar Status -->
            <div class="status-section">
              <h4>الثانوية الأزهرية</h4>
              <div class="year-status">
                <div class="status-inputs">
                  <div class="status-input">
                    <label>{{ firstYear }} - الحالة الحالية</label>
                    <div class="current-value">{{ pair[0].azhar_firstYear_status }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ firstYear }} - آخر موعد الحالي</label>
                    <div class="current-value">{{ pair[1].azhar_firstYear_deadline }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ firstYear }} - الحالة الجديدة</label>
                    <select v-model="pair[1].azhar_firstYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>{{ firstYear }} - آخر موعد الجديد</label>
                    <input type="date" v-model="pair[1].azhar_firstYear_deadline">
                  </div>
                </div>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>{{ secondYear }} - الحالة الحالية</label>
                    <div class="current-value">{{ pair[0].azhar_secondYear_status }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ secondYear }} - آخر موعد الحالي</label>
                    <div class="current-value">{{ pair[1].azhar_secondYear_deadline }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ secondYear }} - الحالة الجديدة</label>
                    <select v-model="pair[1].azhar_secondYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>{{ secondYear }} - آخر موعد الجديد</label>
                    <input type="date" v-model="pair[1].azhar_secondYear_deadline">
                  </div>
                </div>
              </div>
            </div>

            <!-- Arab/English Status -->
            <div class="status-section">
              <h4>الشهادات العربية والإجنبية</h4>
              <div class="year-status">
                <div class="status-inputs">
                  <div class="status-input">
                    <label>{{ firstYear }} - الحالة الحالية</label>
                    <div class="current-value">{{ pair[0].Arabenglish_firstYear_status }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ firstYear }} - آخر موعد الحالي</label>
                    <div class="current-value">{{ pair[1].Arabenglish_firstYear_deadline }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ firstYear }} - الحالة الجديدة</label>
                    <select v-model="pair[1].Arabenglish_firstYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>{{ firstYear }} - آخر موعد الجديد</label>
                    <input type="date" v-model="pair[1].Arabenglish_firstYear_deadline">
                  </div>
                </div>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>{{ secondYear }} - الحالة الحالية</label>
                    <div class="current-value">{{ pair[0].Arabenglish_secondYear_status }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ secondYear }} - آخر موعد الحالي</label>
                    <div class="current-value">{{ pair[1].Arabenglish_secondYear_deadline }}</div>
                  </div>
                  <div class="status-input">
                    <label>{{ secondYear }} - الحالة الجديدة</label>
                    <select v-model="pair[1].Arabenglish_secondYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>{{ secondYear }} - آخر موعد الجديد</label>
                    <input type="date" v-model="pair[1].Arabenglish_secondYear_deadline">
                  </div>
                </div>
              </div>
            </div>

            <!-- Wafdeen Status -->
            <div class="status-section">
              <h4>الوافدين</h4>
              <div class="status-inputs">
                <div class="status-input">
                  <label>الحالة الحالية</label>
                  <div class="current-value">{{ pair[0].wafdeen_status }}</div>
                </div>
                <div class="status-input">
                  <label>آخر موعد الحالي</label>
                  <div class="current-value">{{ pair[1].wafdeen_deadline }}</div>
                </div>
                <div class="status-input">
                  <label>الحالة الجديدة</label>
                  <select v-model="pair[1].wafdeen_status">
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>
                <div class="status-input">
                  <label>آخر موعد الجديد</label>
                  <input type="date" v-model="pair[1].wafdeen_deadline">
                </div>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button class="save-btn" @click="saveUniversity(pair[1])">
              <i class="fas fa-save"></i>
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdmissionStatusAdmin',
  data() {
    return {
      activeTab: 'national',
      firstYear: '',
      secondYear: '',
      universities: [],
      loading: true,
      searchQuery: '',
      filteredUniversities: [],
      openSections: new Set(),
      tabs: [
        { id: 'national', name: 'الجامعات الأهلية' },
        { id: 'private', name: 'الجامعات الخاصة' },
        { id: 'special', name: 'الجامعات ذات طبيعة خاصة' },
        { id: 'international', name: 'الجامعات الأجنبية' }
      ]
    };
  },
  computed: {
    pairedUniversities() {
      const pairs = [];
      for (let i = 0; i < this.filteredUniversities.length; i += 2) {
        if (i + 1 < this.filteredUniversities.length) {
          pairs.push([this.filteredUniversities[i], this.filteredUniversities[i + 1]]);
        }
      }
      return pairs;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchData() {
      this.loading = true;
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/nationaladmission/get',
        private: 'https://nuft-website-backend.vercel.app/privateadmission/get',
        special: 'https://nuft-website-backend.vercel.app/specialadmission/get',
        international: 'https://nuft-website-backend.vercel.app/internationaladmission/get'
      };

      try {
        const response = await axios.get(endpoints[this.activeTab]);
        this.universities = response.data;
        this.filteredUniversities = this.universities;
        await this.fetchYears();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchYears() {
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/nationallinks/get_nationallinks',
        private: 'https://nuft-website-backend.vercel.app/privatelinks/get_privatelinks',
        special: 'https://nuft-website-backend.vercel.app/speciallinks/get_speciallinks',
        international: 'https://nuft-website-backend.vercel.app/internationallinks/get_internationallinks'
      };

      try {
        const response = await axios.get(endpoints[this.activeTab]);
        this.firstYear = response.data[0].first_year;
        this.secondYear = response.data[0].second_year;
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    },

    filterUniversities() {
      if (!this.searchQuery) {
        this.filteredUniversities = this.universities;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredUniversities = this.universities.filter(university => 
        university.university_Arabic_Name.toLowerCase().includes(query)
      );
    },

    async saveUniversity(university) {
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/nationaladmission/update',
        private: 'https://nuft-website-backend.vercel.app/privateadmission/update',
        special: 'https://nuft-website-backend.vercel.app/specialadmission/update',
        international: 'https://nuft-website-backend.vercel.app/internationaladmission/update'
      };

      try {
        await axios.put(`${endpoints[this.activeTab]}/${university.id}`, university);
        alert('تم حفظ التغييرات بنجاح');
      } catch (error) {
        console.error('Error saving university:', error);
        alert('حدث خطأ أثناء حفظ التغييرات');
      }
    },

    toggleSection(index) {
      if (this.openSections.has(index)) {
        this.openSections.delete(index);
      } else {
        this.openSections.add(index);
      }
    },

    isSectionOpen(index) {
      return this.openSections.has(index);
    }
  },
  watch: {
    activeTab() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.admission-admin-container {
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

.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.nav-tab {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  background: white;
  color: #495057;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.nav-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-tab.active {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.universities-list-section {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  color: #001d3d;
  font-size: 1.5rem;
  font-weight: 700;
}

.search-bar input {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  width: 300px;
  font-size: 1rem;
}

.universities-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.university-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.university-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.university-header h3 {
  color: #001d3d;
  font-size: 1.3rem;
  margin: 0;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  background: #e3f2fd;
  color: #1976d2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: #bbdefb;
}

.toggle-btn i {
  transition: transform 0.3s ease;
}

.status-sections {
  transition: all 0.3s ease;
  overflow: hidden;
}

.status-section {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.status-section h4 {
  color: #001d3d;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.status-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.status-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-input label {
  color: #495057;
  font-size: 0.9rem;
}

.status-input select,
.status-input input {
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.9rem;
}

.year-status {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.save-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.current-value {
  padding: 0.5rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #495057;
  margin-bottom: 0.5rem;
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

@media (max-width: 768px) {
  .admission-admin-container {
    padding: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar input {
    width: 100%;
  }

  .nav-tabs {
    flex-wrap: wrap;
  }

  .nav-tab {
    width: 100%;
  }

  .status-inputs {
    grid-template-columns: 1fr;
  }
}
</style> 