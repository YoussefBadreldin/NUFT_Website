<template>
    <div class="article-management" dir="rtl">
        <div class="admin-header">
            <button class="back-button" @click="goBack">
                <i class="fas fa-arrow-right"></i>
                الصفحة الرئيسية
            </button>
            <h1>ادارة المقالات</h1>
            <p class="welcome-text">إدارة المقالات والمحتوى</p>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="content-card">
                        <div class="page-header">
                            <button class="btn btn-primary" @click="showAddArticleModal">
                                <i class="fas fa-plus"></i> إضافة مقال جديد
                            </button>
                        </div>

                        <!-- Articles Table -->
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>الصورة</th>
                                        <th>العنوان</th>
                                        <th>الوصف</th>
                                        <th>تاريخ النشر</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(article, index) in articles" :key="article.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                            <img :src="article.image" :alt="article.title" class="article-thumbnail">
                                        </td>
                                        <td>{{ article.title }}</td>
                                        <td>{{ article.excerpt }}</td>
                                        <td>{{ formatDate(article.publishDate) }}</td>
                                        <td>
                                            <button class="btn btn-sm btn-info" @click="editArticle(article)">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-sm btn-danger" @click="deleteArticle(article.id)">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add/Edit Article Modal -->
        <div class="modal fade" id="articleModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEditing ? 'تعديل المقال' : 'إضافة مقال جديد' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveArticle">
                            <div class="mb-3">
                                <label class="form-label">عنوان المقال</label>
                                <input type="text" class="form-control" v-model="currentArticle.title" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">الوصف المختصر</label>
                                <textarea class="form-control" v-model="currentArticle.excerpt" rows="3" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">صورة المقال</label>
                                <input type="file" class="form-control" @change="handleImageUpload" accept="image/*">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">محتوى المقال</label>
                                <textarea class="form-control" v-model="currentArticle.content" rows="6" required></textarea>
                            </div>
                            <div class="text-end">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                                <button type="submit" class="btn btn-primary">حفظ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
    name: 'ArticleManagement',
    data() {
        return {
            articles: [],
            currentArticle: {
                title: '',
                excerpt: '',
                content: '',
                image: '',
                publishDate: new Date()
            },
            isEditing: false,
            modal: null
        };
    },
    mounted() {
        this.loadArticles();
        this.modal = new Modal(document.getElementById('articleModal'));
    },
    methods: {
        goBack() {
            this.$router.push('/admin');
        },
        async loadArticles() {
            try {
                // TODO: Replace with actual API call
                this.articles = [
                    {
                        id: 1,
                        title: 'دليلك الشامل للتقديم للجامعات المصرية',
                        excerpt: 'كل ما تحتاج معرفته عن التقديم للجامعات المصرية في خطوات بسيطة',
                        content: 'محتوى المقال...',
                        image: '/images/articles/article1.jpg',
                        publishDate: new Date()
                    },
                    // Add more sample articles
                ];
            } catch (error) {
                console.error('Error loading articles:', error);
            }
        },
        showAddArticleModal() {
            this.isEditing = false;
            this.currentArticle = {
                title: '',
                excerpt: '',
                content: '',
                image: '',
                publishDate: new Date()
            };
            this.modal.show();
        },
        editArticle(article) {
            this.isEditing = true;
            this.currentArticle = { ...article };
            this.modal.show();
        },
        async saveArticle() {
            try {
                if (this.isEditing) {
                    // TODO: Implement update article API call
                    const index = this.articles.findIndex(a => a.id === this.currentArticle.id);
                    if (index !== -1) {
                        this.articles[index] = { ...this.currentArticle };
                    }
                } else {
                    // TODO: Implement create article API call
                    this.articles.push({
                        ...this.currentArticle,
                        id: this.articles.length + 1
                    });
                }
                this.modal.hide();
            } catch (error) {
                console.error('Error saving article:', error);
            }
        },
        async deleteArticle(id) {
            if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
                try {
                    // TODO: Implement delete article API call
                    this.articles = this.articles.filter(article => article.id !== id);
                } catch (error) {
                    console.error('Error deleting article:', error);
                }
            }
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // TODO: Implement image upload to server
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.currentArticle.image = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('ar-EG');
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

.article-management {
    min-height: 100vh;
    background: #f8f9fa;
    padding: 2rem;
}

.admin-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem 0;
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
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.welcome-text {
    color: #6c757d;
    font-size: 1.1rem;
}

.content-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.page-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
}

.table {
    margin-bottom: 0;
}

.table thead th {
    background: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    color: #001d3d;
    font-weight: 600;
    padding: 1rem;
}

.table tbody td {
    padding: 1rem;
    vertical-align: middle;
    color: #2c3e50;
}

.article-thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #f0f4f8;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary {
    background: linear-gradient(135deg, #001d3d, #4158d0);
    border: none;
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-info {
    background: linear-gradient(135deg, #17a2b8, #20c997);
    border: none;
    color: white;
}

.btn-danger {
    background: linear-gradient(135deg, #dc3545, #fd7e14);
    border: none;
    color: white;
}

.btn-sm {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
}

.modal-content {
    border-radius: 1rem;
    border: none;
}

.modal-header {
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    padding: 1.5rem;
}

.modal-title {
    color: #001d3d;
    font-weight: 600;
}

.modal-body {
    padding: 1.5rem;
}

.form-label {
    color: #2c3e50;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.form-control {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: #4158d0;
    box-shadow: 0 0 0 0.2rem rgba(65, 88, 208, 0.25);
}

@media (max-width: 768px) {
    .article-management {
        padding: 1rem;
    }

    .admin-header {
        margin-bottom: 2rem;
        padding: 1rem 0;
    }

    .admin-header h1 {
        font-size: 2rem;
    }

    .content-card {
        padding: 1rem;
    }

    .table-responsive {
        margin: 0 -1rem;
    }

    .btn {
        padding: 0.4rem 1rem;
    }
}

@media (max-width: 480px) {
    .admin-header h1 {
        font-size: 1.8rem;
    }

    .content-card {
        padding: 0.75rem;
    }

    .table thead th,
    .table tbody td {
        padding: 0.75rem;
    }
}
</style> 