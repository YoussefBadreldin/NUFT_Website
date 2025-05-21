<template>
  <div class="admission-admin-container" dir="rtl">
    <div class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        رجوع
      </button>
      <h1>إدارة حالة التقديمات</h1>
      <p class="subtitle">إدارة وتعديل وحذف حالة التقديمات للجامعات</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'add' }"
        @click="activeTab = 'add'"
      >
        <i class="fas fa-plus"></i>
        اضافة حالة جامعة جديدة
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'manage' }"
        @click="activeTab = 'manage'"
      >
        <i class="fas fa-university"></i>
        حالة الجامعات الحالية
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'edit' }"
        @click="switchToEdit"
      >
        <i class="fas fa-edit"></i>
        تعديل حالة جامعة حالية
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'delete' }"
        @click="switchToDelete"
      >
        <i class="fas fa-trash"></i>
        حذف حالة جامعة حالية
      </button>
    </div>

    <!-- Category Tabs -->
    <div v-if="activeTab !== 'add'" class="type-tabs">
      <button 
        v-for="type in universityTypes" 
        :key="type.value"
        :class="['type-tab', { active: selectedType === type.value }]"
        @click="selectedType = type.value"
      >
        {{ type.label }}
      </button>
    </div>

    <!-- Add New Status Section -->
    <div v-if="activeTab === 'add'" class="section-container">
      <div class="section-header">
        <h2>إضافة حالة جامعة جديدة</h2>
      </div>
      <div class="form-section">
        <div class="form-card">
          <form @submit.prevent="addUniversityStatus()">
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-university"></i>
                بيانات حالة الجامعة
              </h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="university_type">
                    <i class="fas fa-tag"></i>
                    نوع الجامعة
                  </label>
                  <select v-model="addFormData.type" id="university_type" required>
                    <option value="national">أهلية</option>
                    <option value="private">خاصة</option>
                    <option value="special">ذات طبيعة خاصة</option>
                    <option value="international">دولية</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="university_name">
                    <i class="fas fa-graduation-cap"></i>
                    اسم الجامعة
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.university_Arabic_Name" 
                    id="university_name" 
                    required
                    placeholder="أدخل اسم الجامعة"
                  >
                </div>

                <!-- Transfer Status -->
                <div class="form-group">
                  <label for="transfer_status">
                    <i class="fas fa-exchange-alt"></i>
                    حالة التحويل
                  </label>
                  <select v-model="addFormData.transfer_status" id="transfer_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="transfer_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للتحويل
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.transfer_deadline" 
                    id="transfer_deadline"
                    required
                  >
                </div>

                <!-- Thanawya Status -->
                <div class="form-group">
                  <label for="thanwyaa_status">
                    <i class="fas fa-book"></i>
                    حالة الثانوية العامة
                  </label>
                  <select v-model="addFormData.thanwyaa_firstYear_status" id="thanwyaa_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="thanwyaa_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية العامة
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.thanwyaa_firstYear_deadline" 
                    id="thanwyaa_deadline"
                    required
                  >
                </div>

                <!-- Azhar Status -->
                <div class="form-group">
                  <label for="azhar_status">
                    <i class="fas fa-mosque"></i>
                    حالة الثانوية الأزهرية
                  </label>
                  <select v-model="addFormData.azhar_firstYear_status" id="azhar_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="azhar_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية الأزهرية
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.azhar_firstYear_deadline" 
                    id="azhar_deadline"
                    required
                  >
                </div>

                <!-- Arab/English Status -->
                <div class="form-group">
                  <label for="arab_english_status">
                    <i class="fas fa-language"></i>
                    حالة الشهادات العربية والإجنبية
                  </label>
                  <select v-model="addFormData.Arabenglish_firstYear_status" id="arab_english_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="arab_english_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للشهادات العربية والإجنبية
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.Arabenglish_firstYear_deadline" 
                    id="arab_english_deadline"
                    required
                  >
                </div>

                <!-- Wafdeen Status -->
                <div class="form-group">
                  <label for="wafdeen_status">
                    <i class="fas fa-user-plus"></i>
                    حالة الوافدين
                  </label>
                  <select v-model="addFormData.wafdeen_status" id="wafdeen_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="wafdeen_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للوافدين
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.wafdeen_deadline" 
                    id="wafdeen_deadline"
                    required
                  >
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn">
                <i class="fas fa-save"></i>
                حفظ الحالة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Manage Current Status Section -->
    <div v-if="activeTab === 'manage'" class="section-container">
      <div class="section-header">
        <h2>حالة الجامعات الحالية</h2>
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
        <div v-for="university in filteredUniversities" :key="university.id" class="university-card">
          <div class="university-header">
            <h3>{{ university.university_Arabic_Name }}</h3>
          </div>

          <div class="status-sections">
            <!-- Transfer Status -->
            <div class="status-section">
              <h4>التحويل</h4>
              <div class="status-info">
                <p>الحالة: {{ university.transfer_status }}</p>
                <p>آخر موعد: {{ university.transfer_deadline }}</p>
              </div>
            </div>

            <!-- Thanawya Status -->
            <div class="status-section">
              <h4>الثانوية العامة</h4>
              <div class="status-info">
                <p>الحالة: {{ university.thanwyaa_firstYear_status }}</p>
                <p>آخر موعد: {{ university.thanwyaa_firstYear_deadline }}</p>
              </div>
            </div>

            <!-- Azhar Status -->
            <div class="status-section">
              <h4>الثانوية الأزهرية</h4>
              <div class="status-info">
                <p>الحالة: {{ university.azhar_firstYear_status }}</p>
                <p>آخر موعد: {{ university.azhar_firstYear_deadline }}</p>
              </div>
            </div>

            <!-- Arab/English Status -->
            <div class="status-section">
              <h4>الشهادات العربية والإجنبية</h4>
              <div class="status-info">
                <p>الحالة: {{ university.Arabenglish_firstYear_status }}</p>
                <p>آخر موعد: {{ university.Arabenglish_firstYear_deadline }}</p>
              </div>
            </div>

            <!-- Wafdeen Status -->
            <div class="status-section">
              <h4>الوافدين</h4>
              <div class="status-info">
                <p>الحالة: {{ university.wafdeen_status }}</p>
                <p>آخر موعد: {{ university.wafdeen_deadline }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Status Section -->
    <div v-if="activeTab === 'edit'" class="section-container">
      <div class="section-header">
        <h2>تعديل حالة جامعة حالية</h2>
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
        <div v-for="university in filteredUniversities" :key="university.id" class="university-card">
          <div class="university-header">
            <h3>{{ university.university_Arabic_Name }}</h3>
          </div>

          <div class="status-sections">
            <!-- Transfer Status -->
            <div class="status-section">
              <h4>التحويل</h4>
              <div class="status-inputs">
                <div class="status-input">
                  <label>الحالة</label>
                  <select v-model="university.transfer_status">
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>
                <div class="status-input">
                  <label>آخر موعد</label>
                  <input type="date" v-model="university.transfer_deadline">
                </div>
              </div>
            </div>

            <!-- Thanawya Status -->
            <div class="status-section">
              <h4>الثانوية العامة</h4>
              <div class="status-inputs">
                <div class="status-input">
                  <label>الحالة</label>
                  <select v-model="university.thanwyaa_firstYear_status">
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>
                <div class="status-input">
                  <label>آخر موعد</label>
                  <input type="date" v-model="university.thanwyaa_firstYear_deadline">
                </div>
              </div>
            </div>

            <!-- Azhar Status -->
            <div class="status-section">
              <h4>الثانوية الأزهرية</h4>
              <div class="status-inputs">
                <div class="status-input">
                  <label>الحالة</label>
                  <select v-model="university.azhar_firstYear_status">
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>
                <div class="status-input">
                  <label>آخر موعد</label>
                  <input type="date" v-model="university.azhar_firstYear_deadline">
                </div>
              </div>
            </div>

            <!-- Arab/English Status -->
            <div class="status-section">
              <h4>الشهادات العربية والإجنبية</h4>
              <div class="status-inputs">
                <div class="status-input">
                  <label>الحالة</label>
                  <select v-model="university.Arabenglish_firstYear_status">
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>
                <div class="status-input">
                  <label>آخر موعد</label>
                  <input type="date" v-model="university.Arabenglish_firstYear_deadline">
                </div>
              </div>
            </div>

            <!-- Wafdeen Status -->
            <div class="status-section">
              <h4>الوافدين</h4>
              <div class="status-inputs">
                <div class="status-input">
                  <label>الحالة</label>
                  <select v-model="university.wafdeen_status">
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>
                <div class="status-input">
                  <label>آخر موعد</label>
                  <input type="date" v-model="university.wafdeen_deadline">
                </div>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button class="save-btn" @click="saveUniversity(university)">
              <i class="fas fa-save"></i>
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Status Section -->
    <div v-if="activeTab === 'delete'" class="section-container">
      <div class="section-header">
        <h2>حذف حالة جامعة حالية</h2>
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
        <div v-for="university in filteredUniversities" :key="university.id" class="university-card">
          <div class="university-header">
            <h3>{{ university.university_Arabic_Name }}</h3>
          </div>

          <div class="status-sections">
            <div class="status-section">
              <h4>معلومات الحالة</h4>
              <div class="status-info">
                <p>نوع الجامعة: {{ getUniversityTypeLabel(university.type) }}</p>
                <p>آخر تحديث: {{ university.updatedAt }}</p>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button class="delete-btn" @click="confirmDelete(university)">
              <i class="fas fa-trash"></i>
              حذف الحالة
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
      activeTab: 'manage',
      selectedType: 'private',
      universities: [],
      loading: true,
      searchQuery: '',
      filteredUniversities: [],
      openSections: new Set(),
      universityTypes: [
      { label: 'الجامعات الخاصة', value: 'private' },
        { label: 'الجامعات الأهلية', value: 'national' },
        { label: 'الجامعات الدولية', value: 'international' },
        { label: 'الجامعات ذات طبيعة خاصة', value: 'special' }
      ],
      addFormData: {
        type: 'national',
        university_Arabic_Name: '',
        transfer_status: 'متاح',
        transfer_deadline: '',
        thanwyaa_firstYear_status: 'متاح',
        thanwyaa_firstYear_deadline: '',
        azhar_firstYear_status: 'متاح',
        azhar_firstYear_deadline: '',
        Arabenglish_firstYear_status: 'متاح',
        Arabenglish_firstYear_deadline: '',
        wafdeen_status: 'متاح',
        wafdeen_deadline: ''
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchData() {
      this.loading = true;
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission',
        private: 'https://nuft-website-backend.vercel.app/private/admission',
        special: 'https://nuft-website-backend.vercel.app/special/admission',
        international: 'https://nuft-website-backend.vercel.app/international/admission'
      };

      try {
        const response = await axios.get(endpoints[this.selectedType]);
        this.universities = response.data;
        this.filteredUniversities = this.universities;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
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
        national: 'https://nuft-website-backend.vercel.app/national/admission/:id',
        private: 'https://nuft-website-backend.vercel.app/private/admission/:id',
        special: 'https://nuft-website-backend.vercel.app/special/admission/:id',
        international: 'https://nuft-website-backend.vercel.app/international/admission/:id'
      };

      try {
        await axios.put(`${endpoints[this.selectedType]}/${university.id}`, university);
        alert('تم حفظ التغييرات بنجاح');
      } catch (error) {
        console.error('Error saving university:', error);
        alert('حدث خطأ أثناء حفظ التغييرات');
      }
    },

    async addUniversityStatus() {
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission',
        private: 'https://nuft-website-backend.vercel.app/private/admission',
        special: 'https://nuft-website-backend.vercel.app/special/admission',
        international: 'https://nuft-website-backend.vercel.app/international/admission'
      };

      try {
        await axios.post(endpoints[this.addFormData.type], this.addFormData);
        alert('تم إضافة حالة الجامعة بنجاح');
        this.resetAddForm();
        this.fetchData();
      } catch (error) {
        console.error('Error adding university status:', error);
        alert('حدث خطأ أثناء إضافة حالة الجامعة');
      }
    },

    async deleteUniversity(university) {
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission/:id',
        private: 'https://nuft-website-backend.vercel.app/private/admission/:id',
        special: 'https://nuft-website-backend.vercel.app/special/admission/:id',
        international: 'https://nuft-website-backend.vercel.app/international/admission/:id'
      };

      try {
        await axios.delete(`${endpoints[this.selectedType]}/${university.id}`);
        alert('تم حذف حالة الجامعة بنجاح');
        this.fetchData();
      } catch (error) {
        console.error('Error deleting university status:', error);
        alert('حدث خطأ أثناء حذف حالة الجامعة');
      }
    },

    resetAddForm() {
      this.addFormData = {
        type: 'national',
        university_Arabic_Name: '',
        transfer_status: 'متاح',
        transfer_deadline: '',
        thanwyaa_firstYear_status: 'متاح',
        thanwyaa_firstYear_deadline: '',
        azhar_firstYear_status: 'متاح',
        azhar_firstYear_deadline: '',
        Arabenglish_firstYear_status: 'متاح',
        Arabenglish_firstYear_deadline: '',
        wafdeen_status: 'متاح',
        wafdeen_deadline: ''
      };
    },

    switchToEdit() {
      this.activeTab = 'edit';
      this.fetchData();
    },

    switchToDelete() {
      this.activeTab = 'delete';
      this.fetchData();
    },

    getUniversityTypeLabel(type) {
      const universityType = this.universityTypes.find(t => t.value === type);
      return universityType ? universityType.label : 'غير معروف';
    },

    confirmDelete(university) {
      if (confirm(`هل أنت متأكد من حذف حالة الجامعة ${university.university_Arabic_Name}؟`)) {
        this.deleteUniversity(university);
      }
    }
  },
  watch: {
    selectedType() {
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
  flex-wrap: wrap;
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
  min-width: 200px;
  justify-content: center;
}

.nav-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #f8f9fa;
}

.nav-tab.active {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.type-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.type-tab {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  color: #495057;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-width: 150px;
  text-align: center;
}

.type-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #f8f9fa;
}

.type-tab.active {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.section-container {
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

.form-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-category {
  margin-bottom: 2rem;
}

.category-title {
  color: #001d3d;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #495057;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.9rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.submit-btn {
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

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.universities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.status-sections {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.status-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-info p {
  color: #495057;
  font-size: 0.9rem;
  margin: 0;
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

.card-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.save-btn,
.delete-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.save-btn {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.save-btn:hover,
.delete-btn:hover {
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
    flex-direction: column;
    width: 100%;
  }

  .nav-tab {
    width: 100%;
  }

  .type-tabs {
    flex-direction: column;
    width: 100%;
  }

  .type-tab {
    width: 100%;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .status-inputs {
    grid-template-columns: 1fr;
  }

  .card-actions {
    flex-direction: column;
  }

  .save-btn,
  .delete-btn {
    width: 100%;
  }
}
</style> 