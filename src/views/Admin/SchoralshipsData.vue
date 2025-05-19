<template>
  <div class="scholarships-container" dir="rtl">
    <div class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        رجوع
      </button>
      <h1>إدارة المنح الدراسية</h1>
      <p class="subtitle">إضافة وتعديل المنح الدراسية</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'manage' }"
        @click="activeTab = 'manage'"
      >
        <i class="fas fa-graduation-cap"></i>
        متابعة وتعديل المنح
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'add' }"
        @click="activeTab = 'add'"
      >
        <i class="fas fa-plus"></i>
        إضافة منحة جديدة
      </button>
    </div>

    <!-- Scholarships List Section -->
    <div v-if="activeTab === 'manage'" class="scholarships-list-section">
      <div class="section-header">
        <h2>المنح الحالية</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن منحة..."
            @input="filterScholarships"
          >
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>جاري التحميل...</p>
      </div>

      <div v-else-if="filteredScholarships.length === 0" class="no-results">
        <i class="fas fa-graduation-cap"></i>
        <p>لا توجد منح</p>
      </div>

      <div v-else class="scholarships-grid">
        <div v-for="scholarship in filteredScholarships" :key="scholarship.id" class="scholarship-card">
          <div class="scholarship-image">
            <img 
              :src="scholarship.scholarship_photo" 
              :alt="scholarship.scholarship_title"
              @error="handleImageError"
            >
          </div>
          <div class="scholarship-content">
            <h3>{{ scholarship.scholarship_title }}</h3>
            <div class="scholarship-type">
              <i class="fas fa-tag"></i>
              <span>{{ scholarship.scholarship_type }}</span>
            </div>
            <div class="scholarship-due-date">
              <i class="fas fa-calendar-alt"></i>
              <span>تاريخ التقديم: {{ scholarship.due_date }}</span>
            </div>
            <p class="scholarship-details">{{ scholarship.scholarship_details }}</p>
            <div class="scholarship-actions">
              <button class="action-btn edit" @click="editScholarship(scholarship)">
                <i class="fas fa-edit"></i>
                تعديل
              </button>
              <button class="action-btn delete" @click="confirmDelete(scholarship.id)">
                <i class="fas fa-trash"></i>
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Scholarship Form -->
    <div v-if="activeTab === 'add' || isEditing" class="form-section">
      <div class="form-card">
        <h2 class="section-title">{{ isEditing ? 'تعديل المنحة' : 'إضافة منحة جديدة' }}</h2>
        <form @submit.prevent="isEditing ? updateScholarship() : addScholarship()">
          <div class="form-grid">
            <div class="form-group">
              <label for="scholarship_title">عنوان المنحة</label>
              <input type="text" v-model="scholarship_title" id="scholarship_title" required>
            </div>

            <div class="form-group">
              <label for="scholarship_photo">رابط الشعار</label>
              <div class="input-with-hint">
                <input type="text" v-model="scholarship_photo" id="scholarship_photo">
                <span class="hint">/images/Logos/Scholarships/.png</span>
              </div>
            </div>

            <div class="form-group">
              <label for="scholarship_type">نوع المنحة</label>
              <input type="text" v-model="scholarship_type" id="scholarship_type" placeholder="مثال: منحة كاملة" required>
            </div>

            <div class="form-group">
              <label for="due_date">تاريخ التقديم</label>
              <input type="text" v-model="due_date" id="due_date" placeholder="باللغة العربية" required>
            </div>

            <div class="form-group">
              <label for="scholarship_link">رابط المنحة</label>
              <div class="input-with-hint">
                <input type="text" v-model="scholarship_link" id="scholarship_link" required>
                <span class="hint">https://</span>
              </div>
            </div>
          </div>

          <div class="form-group full-width">
            <label for="scholarship_details">تفاصيل المنحة</label>
            <textarea id="scholarship_details" v-model="scholarship_details" rows="6"></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn">
              <i :class="isEditing ? 'fas fa-save' : 'fas fa-plus'"></i>
              {{ isEditing ? 'حفظ التعديلات' : 'إضافة المنحة' }}
            </button>
            <button v-if="isEditing" type="button" class="cancel-btn" @click="cancelEdit">
              <i class="fas fa-times"></i>
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ScholarshipsAdmin',
  data() {
    return {
      scholarship_title: '',
      scholarship_details: '',
      scholarship_photo: '',
      scholarship_type: '',
      due_date: '',
      scholarship_link: '',
      scholarshipsData: [],
      loading: true,
      searchQuery: '',
      filteredScholarships: [],
      isEditing: false,
      editingId: null,
      activeTab: 'manage'
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchScholarships() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/Schoralships/all');
        this.scholarshipsData = response.data;
        this.filteredScholarships = response.data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        this.loading = false;
      }
    },
    filterScholarships() {
      if (!this.searchQuery) {
        this.filteredScholarships = this.scholarshipsData;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredScholarships = this.scholarshipsData.filter(scholarship => 
        scholarship.scholarship_title.toLowerCase().includes(query) ||
        scholarship.scholarship_details.toLowerCase().includes(query) ||
        scholarship.scholarship_type.toLowerCase().includes(query)
      );
    },
    handleImageError(event) {
      event.target.src = '/images/default-scholarship.png';
    },
    async addScholarship() {
      const formData = {
        scholarship_title: this.scholarship_title,
        scholarship_details: this.scholarship_details,
        scholarship_photo: this.scholarship_photo,
        scholarship_type: this.scholarship_type,
        due_date: this.due_date,
        scholarship_link: this.scholarship_link
      };
      try {
        await axios.post('https://nuft-website-backend.vercel.app/Schoralships/add', formData);
        alert('تم إضافة المنحة بنجاح');
        this.resetForm();
        this.fetchScholarships();
        this.activeTab = 'manage';
      } catch (error) {
        console.error('Error adding scholarship:', error);
        alert('حدث خطأ أثناء إضافة المنحة');
      }
    },
    editScholarship(scholarship) {
      this.isEditing = true;
      this.editingId = scholarship.id;
      this.scholarship_title = scholarship.scholarship_title;
      this.scholarship_details = scholarship.scholarship_details;
      this.scholarship_photo = scholarship.scholarship_photo;
      this.scholarship_type = scholarship.scholarship_type;
      this.due_date = scholarship.due_date;
      this.scholarship_link = scholarship.scholarship_link;
      this.activeTab = 'add';
    },
    async updateScholarship() {
      const formData = {
        scholarship_title: this.scholarship_title,
        scholarship_details: this.scholarship_details,
        scholarship_photo: this.scholarship_photo,
        scholarship_type: this.scholarship_type,
        due_date: this.due_date,
        scholarship_link: this.scholarship_link
      };
      try {
        await axios.put(`https://nuft-website-backend.vercel.app/Schoralships/update/${this.editingId}`, formData);
        alert('تم تحديث المنحة بنجاح');
        this.cancelEdit();
        this.fetchScholarships();
        this.activeTab = 'manage';
      } catch (error) {
        console.error('Error updating scholarship:', error);
        alert('حدث خطأ أثناء تحديث المنحة');
      }
    },
    async deleteScholarship(id) {
      try {
        await axios.delete(`https://nuft-website-backend.vercel.app/Schoralships/delete/${id}`);
        alert('تم حذف المنحة بنجاح');
        this.fetchScholarships();
      } catch (error) {
        console.error('Error deleting scholarship:', error);
        alert('حدث خطأ أثناء حذف المنحة');
      }
    },
    confirmDelete(id) {
      if (confirm('هل أنت متأكد من حذف هذه المنحة؟')) {
        this.deleteScholarship(id);
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.editingId = null;
      this.resetForm();
      this.activeTab = 'manage';
    },
    resetForm() {
      this.scholarship_title = '';
      this.scholarship_details = '';
      this.scholarship_photo = '';
      this.scholarship_type = '';
      this.due_date = '';
      this.scholarship_link = '';
    }
  },
  created() {
    this.fetchScholarships();
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

.scholarships-container {
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

.nav-tab i {
  font-size: 1.1rem;
}

.scholarships-list-section {
  max-width: 1200px;
  margin: 0 auto 2rem;
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

.scholarships-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scholarship-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.scholarship-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.scholarship-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
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

.scholarship-content {
  padding: 1.5rem;
}

.scholarship-content h3 {
  color: #001d3d;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.scholarship-type,
.scholarship-due-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.scholarship-type i,
.scholarship-due-date i {
  color: #4158d0;
}

.scholarship-details {
  color: #495057;
  margin: 1rem 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scholarship-actions {
  display: flex;
  gap: 0.5rem;
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

.form-section {
  max-width: 1200px;
  margin: 0 auto;
}

.form-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-title {
  color: #001d3d;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #495057;
  font-weight: 500;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
textarea:focus {
  outline: none;
  border-color: #4158d0;
  box-shadow: 0 0 0 3px rgba(65, 88, 208, 0.1);
}

.input-with-hint {
  position: relative;
}

.hint {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
  font-size: 0.875rem;
  pointer-events: none;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn,
.cancel-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.submit-btn {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.cancel-btn {
  background: #e9ecef;
  color: #495057;
}

.submit-btn:hover,
.cancel-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  .scholarships-container {
    padding: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar input {
    width: 100%;
  }

  .form-card {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .scholarships-grid {
    grid-template-columns: 1fr;
  }
}
</style>
