<template>
    <div>
        <HeaderComponent />

        <!-- Slider -->
        <div class="slider">
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="/images/slider/slider-1.jpg" class="d-block w-100" alt="Slider Image 1">
                        <div class="carousel-caption d-none d-md-block">
                         
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- About Us -->
        <div class="About-Us">
            <div class="inner-lay">
                <div class="container">
                    <div class="row session-title">
                        <h2>من نحن؟</h2>
                        <p>فريق من طلاب وخريجي الجامعات المصرية المختلفة، يهدف إلى مساعدة المهتمين بالتقديم للجامعات المصرية</p>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 numb" v-for="(stat, index) in stats" :key="index">
                            <h3>{{ stat.number }}</h3>
                            <span>{{ stat.description }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Feedback Section -->
        <div class="Feedback-Section">
            <div class="container">
                <div class="row session-title">
                    <h2>آراء المستخدمين</h2>
                    <p>ما يقوله عنا طلاب الجامعات</p>
                </div>
                <div class="row">
                    <div class="col-md-4" v-for="(feedback, index) in feedbacks" :key="index">
                        <div class="feedback-card">
                            <div class="user-info">
                                <img :src="feedback.userImage" :alt="feedback.userName" class="user-image">
                                <div class="user-details">
                                    <h5>{{ feedback.userName }}</h5>
                                    <p>{{ feedback.userTitle }}</p>
                                </div>
                            </div>
                            <div class="feedback-content">
                                <p>{{ feedback.comment }}</p>
                                <div class="rating">
                                    <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= feedback.rating }">★</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Articles Section -->
        <div class="Articles-Section">
            <div class="container">
                <div class="row session-title">
                    <h2>أحدث المقالات</h2>
                    <p>مقالات ومواضيع تهم طلاب الجامعات</p>
                </div>
                <div class="row">
                    <div class="col-md-4" v-for="(article, index) in articles" :key="index">
                        <div class="article-card">
                            <img :src="article.image" :alt="article.title" class="img-fluid">
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

        <!-- FAQ Section -->
        <div class="FAQ-Section">
            <div class="container">
                <div class="row session-title">
                    <h2>الأسئلة الشائعة</h2>
                    <p>إجابات على الأسئلة الأكثر شيوعاً</p>
                </div>
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <div class="accordion" id="faqAccordion">
                            <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" :class="{ 'collapsed': !faq.isOpen }" type="button" 
                                            data-bs-toggle="collapse" :data-bs-target="'#faq' + index">
                                        {{ faq.question }}
                                    </button>
                                </h2>
                                <div :id="'faq' + index" class="accordion-collapse collapse" :class="{ 'show': faq.isOpen }"
                                     data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        {{ faq.answer }}
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
import $ from 'jquery';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';


export default {
    name: 'MainComponent',
    components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
    },
    data() {
        return {
            stats: [
                { number: '150k+', description: 'زيارة' },
                { number: '8+', description: 'خدمة مختلفة' },
                { number: '80+', description: 'عضو في الفريق' },
                { number: '5+', description: 'سنين من الخبرة' }
            ],
            faqs: [
                {
                    question: 'ما هي خدمات NUFT؟',
                    answer: 'NUFT يقدم مجموعة متكاملة من الخدمات تشمل: دليل التقديم للجامعات، استشارات تعليمية، ورش عمل، منح دراسية، وخدمات الترجمة والتوثيق.',
                    isOpen: false
                },
                {
                    question: 'كيف يمكنني الانضمام لفريق NUFT؟',
                    answer: 'يمكنك التقديم للانضمام لفريق NUFT من خلال صفحة "انضم إلينا" على موقعنا. نحن نبحث دائماً عن متطوعين متحمسين لمساعدة الطلاب.',
                    isOpen: false
                },
                {
                    question: 'هل خدمات NUFT مجانية؟',
                    answer: 'نعم، جميع خدماتنا الأساسية مجانية للطلاب. نحن منظمة غير ربحية تهدف إلى مساعدة الطلاب في رحلتهم التعليمية.',
                    isOpen: false
                },
                {
                    question: 'كيف يمكنني التواصل مع فريق NUFT؟',
                    answer: 'يمكنك التواصل معنا من خلال: البريد الإلكتروني، صفحات التواصل الاجتماعي، أو من خلال نموذج الاتصال على موقعنا.',
                    isOpen: false
                },
                {
                    question: 'هل تقدمون استشارات شخصية؟',
                    answer: 'نعم، نوفر استشارات شخصية وجماعية في مختلف المجالات التعليمية. يمكنك حجز موعد من خلال صفحة الاستشارات على موقعنا.',
                    isOpen: false
                }
            ],
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
            ],
            feedbacks: [
                {
                    userName: 'أحمد محمد',
                    userTitle: 'طالب هندسة',
                    userImage: '/images/feedback/user1.jpg',
                    comment: 'NUFT ساعدني كثيراً في التقديم للجامعة. الاستشارات كانت مفيدة جداً',
                    rating: 5
                },
                {
                    userName: 'سارة أحمد',
                    userTitle: 'طالبة طب',
                    userImage: '/images/feedback/user2.jpg',
                    comment: 'فريق العمل متعاون جداً والخدمات ممتازة. ساعدوني في الحصول على منحة دراسية',
                    rating: 5
                },
                {
                    userName: 'محمد علي',
                    userTitle: 'طالب تجارة',
                    userImage: '/images/feedback/user3.jpg',
                    comment: 'الورش التدريبية كانت مفيدة جداً. شكراً لـ NUFT على كل المساعدة',
                    rating: 4
                }
            ],
            teamMembers: [
                { name: 'محمود عادل', position: 'رئيس الفريق', image: '/images/Board/MahmoudAdel.jpg' },
                { name: 'كارينا ايمن', position: 'مدير لجنة التسويق', image: '/images/Board/KarinaAyman.jpg' },
                { name: 'يوسف بدر الدين', position: 'مدير لجنة تكنولوجيا المعلومات', image: '/images/Board/YoussefBadreldin.jpg' },
                { name: 'أحمد علاء', position: 'مدير لجنة التسجيلات', image: '/images/Board/AhmedAlaa.jpg' },
                { name: 'ميادة قنديل', position: 'مدير لجنة الإعلام', image: '/images/Board/MayadaKandil.jpg' },
                { name: 'أحمد عيد', position: 'مدير لجنة خدمة العملاء', image: '/images/Board/AhmedEid.jpg' },
                { name: 'زياد ابو الفتوح', position: 'مدير لجنة العلاقات العامة', image: '/images/Board/ZiadApoelfotouh.jpg' },
                { name: 'حنين صباح', position: 'مدير لجنة المرحلة الجامعية', image: '/images/Board/HaninSabbah.jpg' },
                { name: 'أحمد حمدي', position: 'مدير المشروعات ومدير لجنة الدراسات العليا', image: '/images/Board/AhmedHamdy.jpg' }  
            ]
        };
    },
    mounted() {
        // Implement any logic you need when the component is mounted
    },
    methods: {
        loadNews() {
            $.get('/News', (data) => {
                const newsHtml = $(data);
                const newsCards = newsHtml.find('.our-blog .news-card');
                newsCards.sort((a, b) => {
                    const dateA = new Date(
                        a.querySelector('.date-box small').innerText,
                        this.getMonth(a.querySelector('.date-box p').innerText),
                        a.querySelector('.date-box span').innerText
                    );
                    const dateB = new Date(
                        b.querySelector('.date-box small').innerText,
                        this.getMonth(b.querySelector('.date-box p').innerText),
                        b.querySelector('.date-box span').innerText
                    );

                    return dateB - dateA;
                });

                $('.Latest-News .row-news').html(newsCards.slice(0, 5));
            });
        },
        getMonth(monthName) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months.indexOf(monthName);
        }
    }
};
</script>

<style scoped>
/* Slider Styles */
.slider {
    padding-top: 0;
}

/* About Us Styles */
.About-Us .inner-lay {
    padding: 20px;
}

.About-Us .session-title {
    text-align: center;
}

.About-Us .numb {
    text-align: center;
    margin-bottom: 20px;
}

/* Our Team Styles */
.Our-Team .session-title {
    text-align: center;
}

.Our-Team .Member-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Centers the cards horizontally */
}

.Our-Team .Member-card {
    border: 1px solid #ddd; /* Border for the card */
    border-radius: 8px; /* Rounded corners for the card */
    padding: 20px; /* Padding inside the card */
    margin: 10px; /* Spacing between cards */
    text-align: center;
}

.Our-Team .Member-card img {
    border-radius: 50%; /* Makes the image circular */
    max-width: 100px; /* Adjust as needed */
    height: auto;
}

.Our-Team .Member-card h6,
.Our-Team .Member-card p {
    margin-top: 10px;
    font-weight: bold; /* Make text bold */
}

/* Our Partners Styles */
.Our-Partners .session-title {
    text-align: center;
}

.Our-Partners .row-partners {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Centers the partner items horizontally */
}

.Our-Partners .partner-item {
    margin: 10px; /* Spacing between partner items */
    text-align: center;
}

.Our-Partners .partner-item img {
    margin-top: -50px;
    margin-bottom: -30px;
    max-width: 50%; /* Ensures the image fits well */
    height: auto;
}

/* Link styling */
.partner-link {
    display: flex;
    justify-content: center; /* Center the link horizontally */
    text-decoration: none; /* Remove underline from links */
}

/* Responsive Styles */
@media (max-width: 768px) {
    .Our-Partners .partner-item {
        width: 100%; /* Full width for smaller screens */
    }
}

@media (max-width: 576px) {
    .Our-Partners .partner-item img {
        margin-top: -50px;
        margin-bottom: -30px;
        max-width: 50%; /* Ensures the image fits well */
    }
}
@media (max-width: 768px) {
    .carousel-item img {
        height: 40vh; /* Set height as a percentage of the viewport height */
        object-fit: cover; /* Ensure image covers the area without distortion */
    }
    }

/* Feedback Section Styles */
.Feedback-Section {
    padding: 50px 0;
    background-color: #f8f9fa;
}

.feedback-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.feedback-card:hover {
    transform: translateY(-5px);
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.user-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 15px;
    object-fit: cover;
}

.user-details h5 {
    margin: 0;
    font-size: 1.1rem;
}

.user-details p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
}

.feedback-content p {
    margin-bottom: 10px;
    line-height: 1.6;
}

.rating {
    color: #ddd;
}

.rating .star.filled {
    color: #ffc107;
}

/* Articles Section Styles */
.Articles-Section {
    padding: 50px 0;
    background-color: white;
}

.article-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 30px;
    transition: transform 0.3s ease;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.article-card:hover {
    transform: translateY(-5px);
}

.article-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.article-content {
    padding: 20px;
}

.article-content h4 {
    margin-bottom: 10px;
    font-size: 1.2rem;
}

.article-content p {
    color: #666;
    margin-bottom: 15px;
    line-height: 1.6;
}

/* FAQ Section Styles */
.FAQ-Section {
    padding: 50px 0;
    background-color: #f8f9fa;
}

.accordion-button:not(.collapsed) {
    background-color: #007bff;
    color: white;
}

.accordion-button:focus {
    box-shadow: none;
    border-color: rgba(0,0,0,.125);
}

.accordion-body {
    line-height: 1.6;
    color: #666;
}

@media (max-width: 768px) {
    .article-card, .feedback-card {
        margin-bottom: 20px;
    }
    
    .user-info {
        flex-direction: column;
        text-align: center;
    }
    
    .user-image {
        margin: 0 0 10px 0;
    }

    .accordion {
        margin: 0 15px;
    }
}

/* Update existing styles */
.Feedback-Section {
    background-color: #f8f9fa;
}

.Articles-Section {
    background-color: white;
}

.FAQ-Section {
    background-color: #f8f9fa;
}

@media (max-width: 768px) {
    .article-card, .feedback-card {
        margin-bottom: 20px;
    }
    
    .user-info {
        flex-direction: column;
        text-align: center;
    }
    
    .user-image {
        margin: 0 0 10px 0;
    }
}
</style>
