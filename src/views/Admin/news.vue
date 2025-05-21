<template>
  <div class="news-container" dir="rtl">
    <div class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        رجوع
      </button>
      <h1>إدارة الأخبار</h1>
      <p class="subtitle">إضافة وتعديل الأخبار</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'manage' }"
        @click="activeTab = 'manage'"
      >
        <i class="fas fa-newspaper"></i>
          الأخبار الحالية
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'add' }"
        @click="activeTab = 'add'"
      >
        <i class="fas fa-plus"></i>
        إضافة خبر جديد
      </button>
    </div>

    <!-- News List Section -->
    <div v-if="activeTab === 'manage'" class="news-list-section">
      <div class="section-header">
        <h2>الأخبار الحالية</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن خبر..."
            @input="filterNews"
          >
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>جاري التحميل...</p>
      </div>

      <div v-else-if="filteredNews.length === 0" class="no-results">
        <i class="fas fa-newspaper"></i>
        <p>لا توجد أخبار</p>
      </div>

      <div v-else class="news-grid">
        <div v-for="news in filteredNews" :key="news._id" class="news-card">
          <div class="news-image">
            <img 
              :src="news.news_photo" 
              :alt="news.news_title"
              @error="handleImageError"
            >
          </div>
          <div class="news-content">
            <h3>{{ news.news_title }}</h3>
            <div class="news-date">
              <span>{{ news.news_day }}</span>
              <span>{{ news.news_month }}</span>
              <span>{{ news.news_year }}</span>
            </div>
            <p class="news-details">{{ news.news_details }}</p>
            <div class="news-actions">
              <button class="action-btn edit" @click="editNews(news)">
                <i class="fas fa-edit"></i>
                تعديل
              </button>
              <button class="action-btn delete" @click="confirmDelete(news._id)">
                <i class="fas fa-trash"></i>
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit News Form -->
    <div v-if="activeTab === 'add' || isEditing" class="form-section">
      <div class="form-card">
        <h2 class="section-title">{{ isEditing ? 'تعديل الخبر' : 'إضافة خبر جديد' }}</h2>
        <form @submit.prevent="isEditing ? updateNews() : addNews()">
          <div class="form-grid">
          <div class="form-group">
              <label for="news_title">عنوان الخبر</label>
            <input type="text" v-model="news_title" id="news_title" required>
          </div>

          <div class="form-group">
              <label for="news_photo">رابط الصورة</label>
              <div class="input-with-hint">
            <input type="text" v-model="news_photo" id="news_photo">
                <span class="hint">/images/Logos/NEWS/.png</span>
              </div>
          </div>

          <div class="form-group">
              <label for="news_day">اليوم</label>
            <input type="number" v-model="news_day" id="news_day" min="1" max="31" required>
          </div>

          <div class="form-group">
              <label for="news_month">الشهر</label>
              <input type="text" v-model="news_month" id="news_month" placeholder="باللغة العربية" required>
          </div>

          <div class="form-group">
              <label for="news_year">السنة</label>
            <input type="number" v-model="news_year" id="news_year" min="1900" max="2099" required>
          </div>

          <div class="form-group">
              <label for="news_link">رابط الخبر</label>
              <div class="input-with-hint">
            <input type="text" v-model="news_link" id="news_link" required>
                <span class="hint">/Guide/UGRAD/ أو https://</span>
              </div>
            </div>
          </div>

          <div class="form-group full-width">
            <label for="news_details">تفاصيل الخبر</label>
            <textarea id="news_details" v-model="news_details" rows="6"></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn">
              <i :class="isEditing ? 'fas fa-save' : 'fas fa-plus'"></i>
              {{ isEditing ? 'حفظ التعديلات' : 'إضافة الخبر' }}
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
  name: 'NewsAdmin',
  data() {
    return {
      news_title: '',
      news_photo: '',
      news_day: '',
      news_month: '',
      news_year: '',
      news_link: '',
      news_details: '',
      newsData: [],
      loading: true,
      searchQuery: '',
      filteredNews: [],
      isEditing: false,
      editingId: null,
      activeTab: 'manage' // Default to manage tab
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchNews() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/news/getNews');
        this.newsData = response.data;
        this.filteredNews = response.data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching news:', error);
        this.loading = false;
      }
    },
    filterNews() {
      if (!this.searchQuery) {
        this.filteredNews = this.newsData;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredNews = this.newsData.filter(news => 
        news.news_title.toLowerCase().includes(query) ||
        news.news_details.toLowerCase().includes(query)
      );
    },
    handleImageError(event) {
      event.target.src = '/images/default-news.png';
    },
    async addNews() {
      const formData = {
        news_title: this.news_title,
        news_photo: this.news_photo,
        news_day: this.news_day,
        news_month: this.news_month,
        news_year: this.news_year,
        news_details: this.news_details,
        news_link: this.news_link
      };
      try {
        await axios.post('https://nuft-website-backend.vercel.app/news/addNews', formData);
        alert('تم إضافة الخبر بنجاح');
        this.resetForm();
        this.fetchNews();
        this.activeTab = 'manage'; // Switch to manage tab after adding
      } catch (error) {
        console.error('Error adding news:', error);
        alert('حدث خطأ أثناء إضافة الخبر');
      }
    },
    editNews(news) {
      this.isEditing = true;
      this.editingId = news._id;
      this.news_title = news.news_title;
      this.news_photo = news.news_photo;
      this.news_day = news.news_day;
      this.news_month = news.news_month;
      this.news_year = news.news_year;
      this.news_link = news.news_link;
      this.news_details = news.news_details;
      this.activeTab = 'add'; // Switch to add tab for editing
    },
    async updateNews() {
      const formData = {
        news_title: this.news_title,
        news_photo: this.news_photo,
        news_day: this.news_day,
        news_month: this.news_month,
        news_year: this.news_year,
        news_details: this.news_details,
        news_link: this.news_link
      };
      try {
        await axios.put(`https://nuft-website-backend.vercel.app/news/updateNews/${this.editingId}`, formData);
        alert('تم تحديث الخبر بنجاح');
        this.cancelEdit();
        this.fetchNews();
        this.activeTab = 'manage'; // Switch back to manage tab
      } catch (error) {
        console.error('Error updating news:', error);
        alert('حدث خطأ أثناء تحديث الخبر');
      }
    },
    async deleteNews(id) {
      try {
        await axios.delete(`https://nuft-website-backend.vercel.app/news/deleteNews/${id}`);
        alert('تم حذف الخبر بنجاح');
        this.fetchNews();
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('حدث خطأ أثناء حذف الخبر');
      }
    },
    confirmDelete(id) {
      if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
        this.deleteNews(id);
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.editingId = null;
      this.resetForm();
      this.activeTab = 'manage'; // Switch back to manage tab
    },
    resetForm() {
          this.news_title = '';
          this.news_photo = '';
          this.news_day = '';
          this.news_month = '';
          this.news_year = '';
          this.news_link = '';
          this.news_details = '';
    }
  },
  created() {
    this.fetchNews();
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

.news-container {
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

.news-list-section {
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.news-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.news-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-content {
  padding: 1.5rem;
}

.news-content h3 {
  color: #001d3d;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.news-date {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.news-details {
  color: #495057;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-actions {
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
input[type="number"], 
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
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
  .news-container {
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

  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
