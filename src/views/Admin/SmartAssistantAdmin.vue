<template>
  <div class="parent" dir="rtl">
    <div class="admin-header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
         رجوع 
      </button>
      <h1>إدارة المساعد الذكي</h1>
      <p class="welcome-text">إدارة الكليات وقوالبها ومعايير التنسيق</p>
    </div>

    <!-- Tabs Navigation -->
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Faculties Management -->
    <div v-if="activeTab === 'faculties'" class="tab-content">
      <div class="section-header">
        <h2>إدارة الكليات</h2>
        <button class="add-button" @click="showAddFacultyModal = true">
          <i class="fas fa-plus"></i>
          إضافة كلية جديدة
        </button>
      </div>

      <div class="faculties-grid">
        <div v-for="faculty in faculties" :key="faculty.id" class="faculty-card">
          <img :src="faculty.imgSrc" :alt="faculty.name">
          <div class="faculty-info">
            <h3>{{ faculty.name }}</h3>
            <div class="actions">
              <button @click="editFaculty(faculty)" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteFaculty(faculty.id)" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Faculty Template Management -->
    <div v-if="activeTab === 'templates'" class="tab-content">
      <div class="section-header">
        <h2>إدارة قوالب الكليات</h2>
        <select v-model="selectedFaculty" class="faculty-select">
          <option value="">اختر الكلية</option>
          <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
            {{ faculty.name }}
          </option>
        </select>
      </div>

      <div v-if="selectedFaculty" class="template-editor">
        <div class="form-group">
          <label>الوصف</label>
          <textarea v-model="templateData.description" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label>متطلبات القبول</label>
          <div class="requirements-grid">
            <div class="requirement-category">
              <h4>الثانوية العامة</h4>
              <input type="number" v-model="templateData.requirements.general" placeholder="الحد الأدنى">
            </div>
            <div class="requirement-category">
              <h4>الثانوية الأزهرية</h4>
              <input type="number" v-model="templateData.requirements.azhar" placeholder="الحد الأدنى">
            </div>
            <div class="requirement-category">
              <h4>الشهادات العربية والأجنبية</h4>
              <input type="number" v-model="templateData.requirements.arabicForeign" placeholder="الحد الأدنى">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>الرسوم الدراسية</label>
          <div class="fees-grid">
            <div class="fee-category">
              <h4>المصريين</h4>
              <input type="text" v-model="templateData.fees.egyptian" placeholder="الرسوم">
            </div>
            <div class="fee-category">
              <h4>الوافدين</h4>
              <input type="text" v-model="templateData.fees.foreign" placeholder="الرسوم">
            </div>
          </div>
        </div>

        <button class="save-button" @click="saveTemplate">
          <i class="fas fa-save"></i>
          حفظ التغييرات
        </button>
      </div>
    </div>

    <!-- Score Matching Management -->
    <div v-if="activeTab === 'scores'" class="tab-content">
      <div class="section-header">
        <h2>إدارة معايير التنسيق</h2>
        <div class="year-selector">
          <label>السنة الدراسية:</label>
          <select v-model="selectedYear">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>

      <div class="scores-editor">
        <div v-for="(faculty, index) in scoreData" :key="index" class="score-item">
          <h3>{{ faculty.name }}</h3>
          <div class="score-inputs">
            <div class="input-group">
              <label>الجامعات الخاصة والأهلية</label>
              <input type="number" v-model="faculty.scores.private" placeholder="الحد الأدنى">
            </div>
            <div class="input-group">
              <label>جامعة سيناء (فرع القنطرة)</label>
              <input type="number" v-model="faculty.scores.sinaiQantara" placeholder="الحد الأدنى">
            </div>
            <div class="input-group">
              <label>جامعة سيناء (فرع العريش)</label>
              <input type="number" v-model="faculty.scores.sinaiArish" placeholder="الحد الأدنى">
            </div>
          </div>
        </div>

        <button class="save-button" @click="saveScores">
          <i class="fas fa-save"></i>
          حفظ التغييرات
        </button>
      </div>
    </div>

    <!-- Add Faculty Modal -->
    <div v-if="showAddFacultyModal" class="modal">
      <div class="modal-content">
        <h2>إضافة كلية جديدة</h2>
        <div class="form-group">
          <label>اسم الكلية</label>
          <input type="text" v-model="newFaculty.name" placeholder="أدخل اسم الكلية">
        </div>
        <div class="form-group">
          <label>الرمز المختصر</label>
          <input type="text" v-model="newFaculty.shortCode" placeholder="مثال: MED">
        </div>
        <div class="form-group">
          <label>شعار الكلية</label>
          <input type="file" @change="handleImageUpload" accept="image/*">
        </div>
        <div class="modal-actions">
          <button @click="addFaculty" class="save-button">إضافة</button>
          <button @click="showAddFacultyModal = false" class="cancel-button">إلغاء</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SmartAssistantAdmin',
  data() {
    return {
      activeTab: 'faculties',
      tabs: [
        { id: 'faculties', name: 'إدارة الكليات' },
        { id: 'templates', name: 'قوالب الكليات' },
        { id: 'scores', name: 'معايير التنسيق' }
      ],
      faculties: [],
      selectedFaculty: '',
      templateData: {
        description: '',
        requirements: {
          general: '',
          azhar: '',
          arabicForeign: ''
        },
        fees: {
          egyptian: '',
          foreign: ''
        }
      },
      selectedYear: '2024',
      scoreData: [],
      showAddFacultyModal: false,
      newFaculty: {
        name: '',
        shortCode: '',
        image: null
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push('/admin');
    },
    async fetchFaculties() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/faculties');
        this.faculties = response.data;
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    },
    async fetchTemplate(facultyId) {
      try {
        const response = await axios.get(`https://nuft-website-backend.vercel.app/faculty-template/${facultyId}`);
        this.templateData = response.data;
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    },
    async fetchScores() {
      try {
        const response = await axios.get(`https://nuft-website-backend.vercel.app/score-matching/${this.selectedYear}`);
        this.scoreData = response.data;
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    },
    async saveTemplate() {
      try {
        await axios.put(`https://nuft-website-backend.vercel.app/faculty-template/${this.selectedFaculty}`, this.templateData);
        alert('تم حفظ التغييرات بنجاح');
      } catch (error) {
        console.error('Error saving template:', error);
        alert('حدث خطأ أثناء حفظ التغييرات');
      }
    },
    async saveScores() {
      try {
        await axios.put(`https://nuft-website-backend.vercel.app/score-matching/${this.selectedYear}`, this.scoreData);
        alert('تم حفظ التغييرات بنجاح');
      } catch (error) {
        console.error('Error saving scores:', error);
        alert('حدث خطأ أثناء حفظ التغييرات');
      }
    },
    async addFaculty() {
      try {
        const formData = new FormData();
        formData.append('name', this.newFaculty.name);
        formData.append('shortCode', this.newFaculty.shortCode);
        formData.append('image', this.newFaculty.image);

        await axios.post('https://nuft-website-backend.vercel.app/faculties', formData);
        this.showAddFacultyModal = false;
        this.fetchFaculties();
        alert('تم إضافة الكلية بنجاح');
      } catch (error) {
        console.error('Error adding faculty:', error);
        alert('حدث خطأ أثناء إضافة الكلية');
      }
    },
    handleImageUpload(event) {
      this.newFaculty.image = event.target.files[0];
    },
    editFaculty(faculty) {
      this.selectedFaculty = faculty.id;
      this.activeTab = 'templates';
      this.fetchTemplate(faculty.id);
    },
    async deleteFaculty(facultyId) {
      if (confirm('هل أنت متأكد من حذف هذه الكلية؟')) {
        try {
          await axios.delete(`https://nuft-website-backend.vercel.app/faculties/${facultyId}`);
          this.fetchFaculties();
          alert('تم حذف الكلية بنجاح');
        } catch (error) {
          console.error('Error deleting faculty:', error);
          alert('حدث خطأ أثناء حذف الكلية');
        }
      }
    }
  },
  watch: {
    selectedFaculty(newVal) {
      if (newVal) {
        this.fetchTemplate(newVal);
      }
    },
    selectedYear() {
      this.fetchScores();
    }
  },
  mounted() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const name = localStorage.getItem('name');
    
    if (!isAdmin || !name) {
      this.$router.push('/user');
    } else {
      this.fetchFaculties();
      this.fetchScores();
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
}

.admin-header {
  text-align: center;
  margin-bottom: 2rem;
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
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-text {
  color: #6c757d;
  font-size: 1.1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 1rem;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: #6c757d;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tab-button.active {
  background-color: #2B32B2;
  color: white;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background-color: #2B32B2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.faculties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.faculty-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.faculty-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.faculty-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.faculty-info {
  padding: 1rem;
}

.faculty-info h3 {
  margin: 0;
  margin-bottom: 1rem;
  color: #001d3d;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn {
  background-color: #28a745;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.edit-btn:hover, .delete-btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.template-editor, .scores-editor {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #001d3d;
}

.form-group input, .form-group textarea, .form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  outline: none;
  border-color: #2B32B2;
  box-shadow: 0 0 0 3px rgba(43, 50, 178, 0.1);
}

.requirements-grid, .fees-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.requirement-category, .fee-category {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.save-button {
  padding: 0.75rem 1.5rem;
  background-color: #2B32B2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-button {
  padding: 0.75rem 1.5rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

.faculty-select {
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  min-width: 200px;
  font-size: 1rem;
  color: #001d3d;
}

.score-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.score-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: 600;
  color: #001d3d;
}

.year-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.year-selector select {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  color: #001d3d;
}

@media (max-width: 768px) {
  .parent {
    padding: 1rem;
  }

  .admin-header h1 {
    font-size: 1.8rem;
  }

  .tabs {
    flex-direction: column;
    gap: 0.5rem;
  }

  .tab-button {
    width: 100%;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
  }

  .add-button {
    width: 100%;
    justify-content: center;
  }

  .faculties-grid {
    grid-template-columns: 1fr;
  }

  .template-editor, .scores-editor {
    padding: 1rem;
  }

  .requirements-grid, .fees-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: 1rem;
    padding: 1rem;
  }
}
</style> 