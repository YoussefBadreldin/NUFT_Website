<template>
  <div class="reviews-container" dir="rtl">
    <div class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        رجوع
      </button>
      <h1>إدارة آراء المستخدمين</h1>
      <p class="subtitle">مراجعة وإدارة آراء وتقييمات المستخدمين</p>
    </div>

    <div class="controls">
      <div class="search-bar">
        <div class="search-input">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن رأي..."
            @input="filterReviews"
          >
        </div>
      </div>

      <div class="sort-options">
        <select v-model="sortBy" @change="sortReviews">
          <option value="newest">الأحدث</option>
          <option value="oldest">الأقدم</option>
          <option value="rating">التقييم</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>جاري التحميل...</p>
    </div>

    <div v-else-if="filteredReviews.length === 0" class="no-results">
      <i class="fas fa-comments"></i>
      <p>لا توجد آراء</p>
    </div>

    <div v-else class="reviews-grid">
      <div v-for="review in filteredReviews" :key="review._id" class="review-card">
        <div class="review-header">
          <div class="user-info">
            <div class="user-avatar">
              <i class="fas fa-user"></i>
            </div>
            <div class="user-details">
              <h3>{{ review.author }}</h3>
              <span class="review-date">{{ formatDate(review.createdAt) }}</span>
            </div>
          </div>
          <div class="rating">
            <div class="stars">
              <i v-for="n in 5" :key="n" 
                 class="fas fa-star" 
                 :class="{ 'active': n <= review.rating }">
              </i>
            </div>
            <span class="rating-value">{{ review.rating }}/5</span>
          </div>
        </div>

        <div class="review-content">
          <h4 class="review-title">{{ review.title }}</h4>
          <p class="review-text">{{ review.content }}</p>
          <div class="review-meta">
            <div class="meta-info">
              <span class="department">
                <i class="fas fa-building"></i>
                {{ review.department }}
              </span>
              <span class="program">
                <i class="fas fa-graduation-cap"></i>
                {{ review.program }}
              </span>
            </div>
            <span class="status" :class="getStatusClass(review.status)">
              {{ getStatusText(review.status) }}
            </span>
          </div>
        </div>

        <div class="review-actions">
          <button class="action-btn approve" 
                  @click="updateStatus(review._id, 'approved')"
                  v-if="review.status === 'pending'">
            <i class="fas fa-check"></i>
            موافقة
          </button>
          <button class="action-btn reject" 
                  @click="updateStatus(review._id, 'rejected')"
                  v-if="review.status === 'pending'">
            <i class="fas fa-times"></i>
            رفض
          </button>
          <button class="action-btn delete" @click="confirmDelete(review._id)">
            <i class="fas fa-trash"></i>
            حذف
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content delete-confirmation">
        <div class="modal-header">
          <h3>تأكيد الحذف</h3>
          <button class="close-btn" @click="closeDeleteModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>هل أنت متأكد من حذف هذا الرأي؟</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeDeleteModal">إلغاء</button>
          <button class="delete-btn" @click="deleteReview">حذف</button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast" :class="toastType">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReviewsData',
  data() {
    return {
      reviews: [],
      filteredReviews: [],
      loading: true,
      searchQuery: '',
      sortBy: 'newest',
      showDeleteModal: false,
      reviewToDelete: null,
      showToast: false,
      toastMessage: '',
      toastType: 'success'
    };
  },
  methods: {
    goBack() {
      this.$router.push('/admin');
    },
    getStatusClass(status) {
      switch (status) {
        case 'pending':
          return 'pending';
        case 'approved':
          return 'approved';
        case 'rejected':
          return 'rejected';
        default:
          return '';
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'pending':
          return 'قيد المراجعة';
        case 'approved':
          return 'تمت الموافقة';
        case 'rejected':
          return 'مرفوض';
        default:
          return status;
      }
    },
    async fetchReviews() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/reviews');
        this.reviews = response.data;
        this.filteredReviews = response.data;
        this.sortReviews();
      } catch (error) {
        this.showNotification('حدث خطأ أثناء تحميل الآراء', 'error');
        console.error('Error fetching reviews:', error);
      } finally {
        this.loading = false;
      }
    },
    filterReviews() {
      if (!this.searchQuery) {
        this.filteredReviews = this.reviews;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredReviews = this.reviews.filter(review => 
        review.author.toLowerCase().includes(query) ||
        review.title.toLowerCase().includes(query) ||
        review.content.toLowerCase().includes(query) ||
        review.department.toLowerCase().includes(query) ||
        review.program.toLowerCase().includes(query)
      );
    },
    sortReviews() {
      switch (this.sortBy) {
        case 'newest':
          this.filteredReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          this.filteredReviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'rating':
          this.filteredReviews.sort((a, b) => b.rating - a.rating);
          break;
      }
    },
    formatDate(date) {
      if (!date) return 'غير متوفر';
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(date).toLocaleDateString('ar-EG', options);
    },
    async updateStatus(reviewId, status) {
      try {
        await axios.put(`https://nuft-website-backend.vercel.app/reviews/${reviewId}`, {
          status: status
        });
        const review = this.reviews.find(r => r._id === reviewId);
        if (review) {
          review.status = status;
          review.updatedAt = new Date();
        }
        this.showNotification('تم تحديث حالة الرأي بنجاح', 'success');
      } catch (error) {
        this.showNotification('حدث خطأ أثناء تحديث حالة الرأي', 'error');
      }
    },
    confirmDelete(id) {
      this.reviewToDelete = id;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.reviewToDelete = null;
    },
    async deleteReview() {
      try {
        await axios.delete(`https://nuft-website-backend.vercel.app/reviews/${this.reviewToDelete}`);
        this.reviews = this.reviews.filter(r => r._id !== this.reviewToDelete);
        this.filterReviews();
        this.showNotification('تم حذف الرأي بنجاح', 'success');
      } catch (error) {
        this.showNotification('حدث خطأ أثناء حذف الرأي', 'error');
      } finally {
        this.closeDeleteModal();
      }
    },
    showNotification(message, type = 'success') {
      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  },
  mounted() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const name = localStorage.getItem('name');
    
    if (!isAdmin || !name) {
      this.$router.push('/user');
    } else {
      this.fetchReviews();
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

.reviews-container {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
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

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.search-bar {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}

.search-input i {
  color: #6c757d;
  margin-left: 0.5rem;
}

.search-input input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  color: #001d3d;
  background: transparent;
}

.search-input input::placeholder {
  color: #adb5bd;
}

.sort-options {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.sort-options select {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: white;
  color: #001d3d;
  font-size: 0.9rem;
  cursor: pointer;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.review-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #001d3d, #4158d0);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar i {
  color: white;
  font-size: 1.2rem;
}

.user-details h3 {
  color: #001d3d;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.review-date {
  color: #6c757d;
  font-size: 0.85rem;
  display: block;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.stars i {
  color: #e9ecef;
  font-size: 1rem;
}

.stars i.active {
  color: #ffc107;
}

.rating-value {
  color: #6c757d;
  font-size: 0.9rem;
}

.review-content {
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}

.review-text {
  color: #212529;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.review-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.status.pending {
  background: #fff3e0;
  color: #ffa000;
}

.status.approved {
  background: #e8f5e9;
  color: #2e7d32;
}

.status.rejected {
  background: #fde7e7;
  color: #d32f2f;
}

.review-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
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

.action-btn.approve {
  background: #e8f5e9;
  color: #2e7d32;
}

.action-btn.reject {
  background: #fde7e7;
  color: #d32f2f;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  color: #001d3d;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 1.2rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.modal-footer button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #e9ecef;
  color: #495057;
}

.delete-btn {
  background: #d32f2f;
  color: white;
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 2rem;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  z-index: 1001;
  animation: slideUp 0.3s ease;
}

.toast.success {
  background: #2e7d32;
}

.toast.error {
  background: #d32f2f;
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .reviews-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 1.8rem;
  }

  .controls {
    flex-direction: column;
  }

  .search-bar,
  .sort-options {
    width: 100%;
    max-width: 100%;
  }

  .reviews-grid {
    grid-template-columns: 1fr;
  }

  .review-card {
    padding: 1rem;
  }

  .review-header {
    flex-direction: column;
    gap: 1rem;
  }

  .rating {
    align-items: flex-start;
  }
}

.review-title {
  color: #001d3d;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.meta-info {
  display: flex;
  gap: 1rem;
}

.department,
.program {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.department i,
.program i {
  color: #4158d0;
}
</style> 