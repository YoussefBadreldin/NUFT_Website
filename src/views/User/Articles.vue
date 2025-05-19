<template>
    <div>
        <HeaderComponent />

        <!-- Main content wrapper with RTL -->
        <div class="rtl-content">
            <!-- Articles Section -->
            <div class="Articles-Section">
                <div class="container">
                    <div class="row session-title">
                        <h2> المقالات</h2>
                        <p>مقالات ومواضيع تهم طلاب الجامعات</p>
                    </div>
                    <div class="row">
                        <div class="col-md-4" v-for="(article, index) in articles" :key="index">
                            <div class="article-card">
                                <div class="article-image">
                                    <img :src="article.image" :alt="article.title" class="img-fluid">
                                </div>
                                <div class="article-content">
                                    <h4>{{ article.title }}</h4>
                                    <p>{{ article.excerpt }}</p>
                                    <router-link :to="article.link" class="btn btn-primary">اقرأ المزيد</router-link>
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

export default {
    name: 'ArticlesComponent',
    components: {
        HeaderComponent,
        FooterComponent,
        smartAssistantComponent
    },
    data() {
        return {
            articles: [
                {
                    title: 'دليلك الشامل للتقديم للجامعات المصرية',
                    excerpt: 'كل ما تحتاج معرفته عن التقديم للجامعات المصرية في خطوات بسيطة',
                    image: '/images/articles/article1.jpg',
                    link: '/articles/1'
                },
                {
                    title: 'كيف تختار الكلية المناسبة؟',
                    excerpt: 'نصائح وإرشادات لاختيار الكلية المناسبة لميولك وقدراتك',
                    image: '/images/articles/article2.jpg',
                    link: '/articles/2'
                },
                {
                    title: 'المنح الدراسية في مصر',
                    excerpt: 'دليل شامل عن المنح الدراسية المتاحة في الجامعات المصرية',
                    image: '/images/articles/article3.jpg',
                    link: '/articles/3'
                }
            ]
        };
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
</style> 