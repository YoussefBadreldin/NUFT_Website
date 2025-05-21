<template>
    <div class="news-container" dir="rtl">
      <div class="header">
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-right"></i>
          رجوع
        </button>
        <h1>إدارة المقالات</h1>
        <p class="subtitle">إضافة وتعديل المقالات</p>
      </div>
  
      <!-- Navigation Tabs -->
      <div class="nav-tabs">
        <button 
          class="nav-tab" 
          :class="{ active: activeTab === 'manage' }"
          @click="activeTab = 'manage'"
        >
          <i class="fas fa-newspaper"></i>
          المقالات الحالية
        </button>
        <button 
          class="nav-tab" 
          :class="{ active: activeTab === 'add' }"
          @click="activeTab = 'add'"
        >
          <i class="fas fa-plus"></i>
          إضافة مقال جديد
        </button>
        <button 
          class="nav-tab" 
          :class="{ active: activeTab === 'edit' }"
          @click="switchToEdit"
        >
          <i class="fas fa-edit"></i>
          تعديل مقال
        </button>
        <button 
          class="nav-tab" 
          :class="{ active: activeTab === 'delete' }"
          @click="switchToDelete"
        >
          <i class="fas fa-trash"></i>
          حذف مقال
        </button>
      </div>
  
      <!-- Articles List Section -->
      <div v-if="activeTab === 'manage'" class="news-list-section">
        <div class="section-header">
          <h2>المقالات الحالية</h2>
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="ابحث عن مقال..."
              @input="filterArticles"
            >
          </div>
        </div>
  
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>جاري التحميل...</p>
        </div>
  
        <div v-else-if="filteredArticles.length === 0" class="no-results">
          <i class="fas fa-newspaper"></i>
          <p>لا توجد مقالات</p>
        </div>
  
        <div v-else class="news-grid">
          <div v-for="article in filteredArticles" :key="article._id" class="news-card">
            <div class="news-image" v-if="article.imageUrl">
              <img 
                :src="article.imageUrl" 
                :alt="article.title"
                @error="handleImageError"
              >
            </div>
            <div class="news-content">
              <h3>{{ article.title }}</h3>
              <div class="article-meta">
                <span class="author">
                  <i class="fas fa-user"></i>
                  {{ article.author }}
                </span>
                <span class="category" :class="article.category">
                  {{ getCategoryText(article.category) }}
                </span>
                <span class="status" :class="article.status">
                  {{ getStatusText(article.status) }}
                </span>
              </div>
              <p class="news-details">{{ article.content }}</p>
              <div class="tags" v-if="article.tags && article.tags.length">
                <span v-for="tag in article.tags" :key="tag" class="tag">
                  #{{ tag }}
                </span>
              </div>
              <div class="news-actions">
                <button class="action-btn edit" @click="editArticle(article)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="action-btn delete" @click="confirmDelete(article._id)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Edit Article Tab -->
      <div v-if="activeTab === 'edit'" class="news-list-section">
        <div class="section-header">
          <h2>تعديل مقال</h2>
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="ابحث عن مقال..."
              @input="filterArticles"
            >
          </div>
        </div>
  
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>جاري التحميل...</p>
        </div>
  
        <div v-else-if="!selectedArticleForEdit" class="news-grid">
          <div v-for="article in filteredArticles" :key="article._id" class="news-card">
            <div class="news-image" v-if="article.imageUrl">
              <img 
                :src="article.imageUrl" 
                :alt="article.title"
                @error="handleImageError"
              >
            </div>
            <div class="news-content">
              <h3 @click="selectArticleForEdit(article)" class="news-title-toggle">{{ article.title }}</h3>
              <div class="article-meta">
                <span class="author">
                  <i class="fas fa-user"></i>
                  {{ article.author }}
                </span>
                <span class="category" :class="article.category">
                  {{ getCategoryText(article.category) }}
                </span>
                <span class="status" :class="article.status">
                  {{ getStatusText(article.status) }}
                </span>
              </div>
              <p class="news-details">{{ article.content }}</p>
              <div class="tags" v-if="article.tags && article.tags.length">
                <span v-for="tag in article.tags" :key="tag" class="tag">
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <div v-else class="form-section">
          <div class="form-card">
            <div class="form-header">
              <h3>تعديل مقال: {{ selectedArticleForEdit.title }}</h3>
              <button class="back-btn" @click="selectedArticleForEdit = null">
                <i class="fas fa-arrow-right"></i>
                رجوع
              </button>
            </div>
            <form @submit.prevent="updateArticleFromEditTab()">
              <div class="form-grid">
                <div class="form-group">
                  <label for="edit_title">عنوان المقال</label>
                  <input type="text" v-model="selectedArticleForEdit.title" id="edit_title" required>
                </div>
  
                <div class="form-group">
                  <label for="edit_author">اسم الكاتب</label>
                  <input type="text" v-model="selectedArticleForEdit.author" id="edit_author" required>
                </div>
  
                <div class="form-group">
                  <label for="edit_category">التصنيف</label>
                  <select v-model="selectedArticleForEdit.category" id="edit_category" required>
                    <option value="news">أخبار</option>
                    <option value="academic">أكاديمي</option>
                    <option value="research">بحث</option>
                    <option value="events">فعاليات</option>
                    <option value="general">عام</option>
                  </select>
                </div>
  
                <div class="form-group">
                  <label for="edit_status">الحالة</label>
                  <select v-model="selectedArticleForEdit.status" id="edit_status" required>
                    <option value="draft">مسودة</option>
                    <option value="published">منشور</option>
                    <option value="archived">مؤرشف</option>
                  </select>
                </div>
  
                <div class="form-group">
                  <label for="edit_imageUrl">رابط الصورة</label>
                  <input type="text" v-model="selectedArticleForEdit.imageUrl" id="edit_imageUrl">
                </div>
  
                <div class="form-group">
                  <label for="edit_tags">الوسوم (مفصولة بفواصل)</label>
                  <input type="text" v-model="selectedArticleForEdit.tagsInput" id="edit_tags" placeholder="مثال: تعليم, جامعات, منح">
                </div>
              </div>
  
              <div class="form-group full-width">
                <label for="edit_content">محتوى المقال</label>
                <textarea id="edit_content" v-model="selectedArticleForEdit.content" rows="6" required></textarea>
              </div>
  
              <div class="form-actions">
                <button type="submit" class="submit-btn">
                  <i class="fas fa-save"></i>
                  حفظ التعديلات
                </button>
                <button type="button" class="cancel-btn" @click="selectedArticleForEdit = null">
                  <i class="fas fa-times"></i>
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Delete Article Tab -->
      <div v-if="activeTab === 'delete'" class="news-list-section">
        <div class="section-header">
          <h2>حذف مقال</h2>
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="ابحث عن مقال..."
              @input="filterArticles"
            >
          </div>
        </div>
  
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>جاري التحميل...</p>
        </div>
  
        <div v-else-if="!selectedArticleForDelete" class="news-grid">
          <div v-for="article in filteredArticles" :key="article._id" class="news-card">
            <div class="news-image" v-if="article.imageUrl">
              <img 
                :src="article.imageUrl" 
                :alt="article.title"
                @error="handleImageError"
              >
            </div>
            <div class="news-content">
              <h3 @click="selectArticleForDelete(article)" class="news-title-toggle">{{ article.title }}</h3>
              <div class="article-meta">
                <span class="author">
                  <i class="fas fa-user"></i>
                  {{ article.author }}
                </span>
                <span class="category" :class="article.category">
                  {{ getCategoryText(article.category) }}
                </span>
                <span class="status" :class="article.status">
                  {{ getStatusText(article.status) }}
                </span>
              </div>
              <p class="news-details">{{ article.content }}</p>
              <div class="tags" v-if="article.tags && article.tags.length">
                <span v-for="tag in article.tags" :key="tag" class="tag">
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
  
        <div v-else class="delete-confirmation">
          <div class="confirmation-content">
            <div class="article-info-delete">
              <div class="article-image-delete" v-if="selectedArticleForDelete.imageUrl">
                <img :src="selectedArticleForDelete.imageUrl" :alt="selectedArticleForDelete.title">
              </div>
              <div class="article-details-delete">
                <h3>{{ selectedArticleForDelete.title }}</h3>
                <p>{{ selectedArticleForDelete.content }}</p>
                <div class="article-meta">
                  <span class="author">
                    <i class="fas fa-user"></i>
                    {{ selectedArticleForDelete.author }}
                  </span>
                  <span class="category" :class="selectedArticleForDelete.category">
                    {{ getCategoryText(selectedArticleForDelete.category) }}
                  </span>
                  <span class="status" :class="selectedArticleForDelete.status">
                    {{ getStatusText(selectedArticleForDelete.status) }}
                  </span>
                </div>
              </div>
            </div>
            <i class="fas fa-exclamation-triangle"></i>
            <h3>هل أنت متأكد من حذف هذا المقال؟</h3>
            <p>سيتم حذف المقال بشكل نهائي</p>
            <div class="confirmation-actions">
              <button class="cancel-btn" @click="selectedArticleForDelete = null">
                <i class="fas fa-times"></i>
                إلغاء
              </button>
              <button class="confirm-delete-btn" @click="confirmDeleteAction">
                <i class="fas fa-trash"></i>
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Add/Edit Article Form -->
      <div v-if="activeTab === 'add' || isEditing" class="form-section">
        <div class="form-card">
          <h2 class="section-title">{{ isEditing ? 'تعديل المقال' : 'إضافة مقال جديد' }}</h2>
          <form @submit.prevent="isEditing ? updateArticle() : addArticle()">
            <div class="form-grid">
              <div class="form-group">
                <label for="title">عنوان المقال</label>
                <input type="text" v-model="title" id="title" required>
              </div>
  
              <div class="form-group">
                <label for="author">اسم الكاتب</label>
                <input type="text" v-model="author" id="author" required>
              </div>
  
              <div class="form-group">
                <label for="category">التصنيف</label>
                <select v-model="category" id="category" required>
                  <option value="news">أخبار</option>
                  <option value="academic">أكاديمي</option>
                  <option value="research">بحث</option>
                  <option value="events">فعاليات</option>
                  <option value="general">عام</option>
                </select>
              </div>
  
              <div class="form-group">
                <label for="status">الحالة</label>
                <select v-model="status" id="status" required>
                  <option value="draft">مسودة</option>
                  <option value="published">منشور</option>
                  <option value="archived">مؤرشف</option>
                </select>
              </div>
  
              <div class="form-group">
                <label for="imageUrl">رابط الصورة</label>
                <input type="text" v-model="imageUrl" id="imageUrl">
              </div>
  
              <div class="form-group">
                <label for="tags">الوسوم (مفصولة بفواصل)</label>
                <input type="text" v-model="tagsInput" id="tags" placeholder="مثال: تعليم, جامعات, منح">
              </div>
            </div>
  
            <div class="form-group full-width">
              <label for="content">محتوى المقال</label>
              <textarea id="content" v-model="content" rows="6" required></textarea>
            </div>
  
            <div class="form-actions">
              <button type="submit" class="submit-btn">
                <i :class="isEditing ? 'fas fa-save' : 'fas fa-plus'"></i>
                {{ isEditing ? 'حفظ التعديلات' : 'إضافة المقال' }}
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
    name: 'ArticleManagement',
    data() {
      return {
        title: '',
        content: '',
        author: '',
        category: 'general',
        imageUrl: '',
        tagsInput: '',
        status: 'draft',
        articles: [],
        loading: true,
        searchQuery: '',
        filteredArticles: [],
        isEditing: false,
        editingId: null,
        activeTab: 'manage',
        selectedArticleForEdit: null,
        selectedArticleForDelete: null
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      getCategoryText(category) {
        const categories = {
          news: 'أخبار',
          academic: 'أكاديمي',
          research: 'بحث',
          events: 'فعاليات',
          general: 'عام'
        };
        return categories[category] || category;
      },
      getStatusText(status) {
        const statuses = {
          draft: 'مسودة',
          published: 'منشور',
          archived: 'مؤرشف'
        };
        return statuses[status] || status;
      },
      async fetchArticles() {
        try {
          const response = await axios.get('https://nuft-website-backend.vercel.app/articles');
          this.articles = response.data;
          this.filteredArticles = response.data;
          this.loading = false;
        } catch (error) {
          console.error('Error fetching articles:', error);
          this.loading = false;
        }
      },
      filterArticles() {
        if (!this.searchQuery) {
          this.filteredArticles = this.articles;
          return;
        }
        const query = this.searchQuery.toLowerCase();
        this.filteredArticles = this.articles.filter(article => 
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query) ||
          (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      },
      handleImageError(event) {
        event.target.src = '/images/default-article.png';
      },
      async addArticle() {
        const formData = {
          title: this.title,
          content: this.content,
          author: this.author,
          category: this.category,
          imageUrl: this.imageUrl,
          tags: this.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag),
          status: this.status
        };
        try {
          await axios.post('https://nuft-website-backend.vercel.app/articles/add', formData);
          this.showNotification('تم إضافة المقال بنجاح');
          this.resetForm();
          this.fetchArticles();
          this.activeTab = 'manage';
        } catch (error) {
          console.error('Error adding article:', error);
          this.showNotification('حدث خطأ أثناء إضافة المقال');
        }
      },
      editArticle(article) {
        this.isEditing = true;
        this.editingId = article._id;
        this.title = article.title;
        this.content = article.content;
        this.author = article.author;
        this.category = article.category;
        this.imageUrl = article.imageUrl || '';
        this.tagsInput = article.tags ? article.tags.join(', ') : '';
        this.status = article.status;
        this.activeTab = 'add';
      },
      async updateArticle() {
        const formData = {
          title: this.title,
          content: this.content,
          author: this.author,
          category: this.category,
          imageUrl: this.imageUrl,
          tags: this.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag),
          status: this.status
        };
        try {
          await axios.put(`https://nuft-website-backend.vercel.app/articles/${this.editingId}`, formData);
          this.showNotification('تم تحديث المقال بنجاح');
          this.cancelEdit();
          this.fetchArticles();
          this.activeTab = 'manage';
        } catch (error) {
          console.error('Error updating article:', error);
          this.showNotification('حدث خطأ أثناء تحديث المقال');
        }
      },
      async deleteArticle(id) {
        try {
          await axios.delete(`https://nuft-website-backend.vercel.app/articles/${id}`);
          this.showNotification('تم حذف المقال بنجاح');
          this.fetchArticles();
        } catch (error) {
          console.error('Error deleting article:', error);
          this.showNotification('حدث خطأ أثناء حذف المقال');
        }
      },
      confirmDelete(id) {
        if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
          this.deleteArticle(id);
        }
      },
      cancelEdit() {
        this.isEditing = false;
        this.editingId = null;
        this.resetForm();
        this.activeTab = 'manage';
      },
      resetForm() {
        this.title = '';
        this.content = '';
        this.author = '';
        this.category = 'general';
        this.imageUrl = '';
        this.tagsInput = '';
        this.status = 'draft';
      },
      showNotification(message) {
        // You can implement a toast notification system here
        alert(message);
      },
      switchToEdit() {
        this.activeTab = 'edit';
        this.selectedArticleForEdit = null;
        this.fetchArticles();
      },
      switchToDelete() {
        this.activeTab = 'delete';
        this.selectedArticleForDelete = null;
        this.fetchArticles();
      },
      selectArticleForEdit(article) {
        this.selectedArticleForEdit = { 
          ...article,
          tagsInput: article.tags ? article.tags.join(', ') : ''
        };
      },
      selectArticleForDelete(article) {
        this.selectedArticleForDelete = { ...article };
      },
      async updateArticleFromEditTab() {
        if (!this.selectedArticleForEdit) return;
        const formData = {
          title: this.selectedArticleForEdit.title,
          content: this.selectedArticleForEdit.content,
          author: this.selectedArticleForEdit.author,
          category: this.selectedArticleForEdit.category,
          imageUrl: this.selectedArticleForEdit.imageUrl,
          tags: this.selectedArticleForEdit.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag),
          status: this.selectedArticleForEdit.status
        };
        try {
          await axios.put(`https://nuft-website-backend.vercel.app/articles/${this.selectedArticleForEdit._id}`, formData);
          this.showNotification('تم تحديث المقال بنجاح');
          this.selectedArticleForEdit = null;
          this.fetchArticles();
        } catch (error) {
          console.error('Error updating article:', error);
          this.showNotification('حدث خطأ أثناء تحديث المقال');
        }
      },
      async confirmDeleteAction() {
        if (!this.selectedArticleForDelete) return;
        try {
          await axios.delete(`https://nuft-website-backend.vercel.app/articles/${this.selectedArticleForDelete._id}`);
          this.showNotification('تم حذف المقال بنجاح');
          this.selectedArticleForDelete = null;
          this.fetchArticles();
        } catch (error) {
          console.error('Error deleting article:', error);
          this.showNotification('حدث خطأ أثناء حذف المقال');
        }
      }
    },
    created() {
      this.fetchArticles();
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
  
  .article-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  
  .author,
  .category,
  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
  }
  
  .author {
    background: #e3f2fd;
    color: #1976d2;
  }
  
  .category {
    background: #f3e5f5;
    color: #7b1fa2;
  }
  
  .status {
    background: #e8f5e9;
    color: #2e7d32;
  }
  
  .status.draft {
    background: #fff3e0;
    color: #f57c00;
  }
  
  .status.archived {
    background: #f5f5f5;
    color: #616161;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  
  .tag {
    background: #e3f2fd;
    color: #1976d2;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
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
  textarea,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  input[type="text"]:focus,
  input[type="number"]:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #4158d0;
    box-shadow: 0 0 0 3px rgba(65, 88, 208, 0.1);
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
  
  .news-title-toggle {
    cursor: pointer;
    transition: color 0.2s;
    padding: 0.5rem;
    border-radius: 6px;
  }
  
  .news-title-toggle:hover {
    color: #4158d0;
    background: #e3f2fd;
  }
  
  .delete-confirmation {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }
  
  .confirmation-content {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
  }
  
  .confirmation-content i {
    font-size: 3rem;
    color: #dc3545;
    margin-bottom: 1rem;
  }
  
  .confirmation-content h3 {
    color: #001d3d;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .confirmation-content p {
    color: #6c757d;
    margin-bottom: 2rem;
  }
  
  .confirmation-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  
  .cancel-btn,
  .confirm-delete-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .cancel-btn {
    background: #e9ecef;
    color: #495057;
  }
  
  .cancel-btn:hover {
    background: #dee2e6;
    transform: translateY(-2px);
  }
  
  .confirm-delete-btn {
    background: #dc3545;
    color: white;
  }
  
  .confirm-delete-btn:hover {
    background: #c82333;
    transform: translateY(-2px);
  }
  
  .article-info-delete {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 10px;
  }
  
  .article-image-delete {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #e9ecef;
    flex-shrink: 0;
  }
  
  .article-image-delete img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .article-details-delete {
    flex: 1;
  }
  
  .article-details-delete h3 {
    color: #001d3d;
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
  }
  
  .article-details-delete p {
    color: #6c757d;
    margin: 0 0 1rem 0;
    font-size: 1rem;
  }
  
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e9ecef;
  }
  
  .form-header h3 {
    color: #001d3d;
    font-size: 1.5rem;
    margin: 0;
  }
  
  .back-btn {
    padding: 0.5rem 1rem;
    background: #e3f2fd;
    color: #1976d2;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }
  
  .back-btn:hover {
    background: #bbdefb;
    transform: translateX(-2px);
  }
  </style>
  