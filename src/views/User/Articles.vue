<template>
    <div>
        <HeaderComponent />

        <!-- Main content wrapper with RTL -->
        <div class="rtl-content">
            <!-- Articles Section -->
            <div class="Articles-Section">
                <div class="container">
                    <div class="row session-title">
                        <h2>المقالات</h2>
                        <p>مقالات ومواضيع تهم طلاب الجامعات</p>
                    </div>

                    <!-- Loading State -->
                    <div v-if="loading" class="loading-state">
                        <div class="spinner"></div>
                        <p>جاري تحميل المقالات...</p>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error" class="error-state">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>{{ error }}</p>
                        <button @click="fetchArticles" class="retry-btn">
                            <i class="fas fa-redo"></i>
                            إعادة المحاولة
                        </button>
                    </div>

                    <!-- No Articles State -->
                    <div v-else-if="articles.length === 0" class="no-articles">
                        <i class="fas fa-newspaper"></i>
                        <p>لا توجد مقالات متاحة حالياً</p>
                    </div>

                    <!-- Articles Grid -->
                    <div v-else class="row">
                        <div class="col-md-4" v-for="article in publishedArticles" :key="article._id">
                            <div class="article-card">
                                <div class="article-image" v-if="article.imageUrl">
                                    <img :src="article.imageUrl" :alt="article.title" class="img-fluid">
                                </div>
                                <div class="article-content">
                                    <div class="article-meta">
                                        <span class="category" :class="article.category">
                                            {{ getCategoryText(article.category) }}
                                        </span>
                                        <span class="author">
                                            <i class="fas fa-user"></i>
                                            {{ article.author }}
                                        </span>
                                    </div>
                                    <h4>{{ article.title }}</h4>
                                    <p>{{ getExcerpt(article.content) }}</p>
                                    <div class="article-footer">
                                        <div class="tags" v-if="article.tags && article.tags.length">
                                            <span v-for="tag in article.tags.slice(0, 3)" :key="tag" class="tag">
                                                #{{ tag }}
                                            </span>
                                        </div>
                                        <router-link :to="`/articles/${article._id}`" class="btn btn-primary">
                                            اقرأ المزيد
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <FooterComponent />
        <smartAssistantComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';
import axios from 'axios';

export default {
    name: 'ArticlesComponent',
    components: {
        HeaderComponent,
        FooterComponent,
        smartAssistantComponent
    },
    data() {
        return {
            articles: [],
            loading: true,
            error: null
        };
    },
    computed: {
        publishedArticles() {
            return this.articles.filter(article => article.status === 'published');
        }
    },
    methods: {
        async fetchArticles() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get('https://nuft-website-backend.vercel.app/articles');
                this.articles = response.data;
            } catch (error) {
                console.error('Error fetching articles:', error);
                this.error = 'حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى.';
            } finally {
                this.loading = false;
            }
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
        getExcerpt(content) {
            if (!content) return '';
            return content.length > 150 ? content.substring(0, 150) + '...' : content;
        }
    },
    created() {
        this.fetchArticles();
    }
};
</script>

<style scoped>
/* RTL Content Wrapper */
.rtl-content {
    direction: rtl;
    text-align: right;
}

/* Articles Section Styles */
.Articles-Section {
    padding: 80px 0;
    background-color: white;
    position: relative;
}

.Articles-Section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #007bff, #00bcd4);
}

.Articles-Section .session-title {
    text-align: center;
    margin-bottom: 60px;
}

.Articles-Section .session-title h2 {
    margin-bottom: 15px;
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    position: relative;
    display: inline-block;
}

.Articles-Section .session-title h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #007bff;
    border-radius: 2px;
}

.Articles-Section .session-title p {
    color: #666;
    font-size: 1.2rem;
    margin-top: 20px;
}

.article-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    height: 100%;
}

.article-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.article-image {
    position: relative;
    overflow: hidden;
    height: 200px;
}

.article-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
    transform: scale(1.05);
}

.article-content {
    padding: 25px;
    text-align: right;
}

.article-content h4 {
    margin-bottom: 15px;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    line-height: 1.4;
}

.article-content p {
    color: #666;
    margin-bottom: 20px;
    line-height: 1.8;
}

.article-content .btn-primary {
    background: linear-gradient(135deg, #007bff, #00bcd4);
    border: none;
    padding: 10px 25px;
    border-radius: 25px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.article-content .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,123,255,0.3);
}

@media (max-width: 768px) {
    .Articles-Section {
        padding: 60px 0;
    }

    .Articles-Section .session-title h2 {
        font-size: 2rem;
    }

    .Articles-Section .session-title p {
        font-size: 1.1rem;
    }

    .article-card {
        margin-bottom: 20px;
    }

    .article-image {
        height: 180px;
    }
}

.loading-state,
.error-state,
.no-articles {
    text-align: center;
    padding: 3rem;
    color: #666;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.error-state i,
.no-articles i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #dc3545;
}

.retry-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    margin-top: 1rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.retry-btn:hover {
    background: #0056b3;
    transform: translateY(-2px);
}

.article-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.category {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    background: #f3e5f5;
    color: #7b1fa2;
}

.category.news {
    background: #e3f2fd;
    color: #1976d2;
}

.category.academic {
    background: #e8f5e9;
    color: #2e7d32;
}

.category.research {
    background: #fff3e0;
    color: #f57c00;
}

.category.events {
    background: #fce4ec;
    color: #c2185b;
}

.author {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.9rem;
}

.article-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}

.tags {
    display: flex;
    gap: 0.5rem;
}

.tag {
    background: #e3f2fd;
    color: #1976d2;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .article-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .article-footer {
        flex-direction: column;
        gap: 1rem;
    }

    .tags {
        flex-wrap: wrap;
    }
}
</style> 