<template>
    <div>
        <HeaderComponent />

        <!-- Main content wrapper with RTL -->
        <div class="rtl-content">
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
            <div class="About-Us" ref="aboutSection">
                <div class="inner-lay">
                    <div class="container">
                        <div class="row session-title">
                            <h2>من نحن؟</h2>
                            <p>فريق من طلاب وخريجي الجامعات المصرية المختلفة، يهدف إلى مساعدة المهتمين بالتقديم للجامعات المصرية</p>
                        </div>
                        <div class="row">
                            <div class="col-sm-3 numb" v-for="(stat, index) in stats" :key="index">
                                <h3>{{ animatedStats[index] }}</h3>
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
                        <p>ما يقوله عنا الطلاب وأولياء الامور</p>
                    </div>

                    <!-- Loading State -->
                    <div v-if="loading" class="loading-state">
                        <div class="spinner"></div>
                        <p>جاري تحميل آراء المستخدمين...</p>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error" class="error-state">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>{{ error }}</p>
                        <button @click="fetchReviews" class="retry-btn">
                            <i class="fas fa-redo"></i>
                            إعادة المحاولة
                        </button>
                    </div>

                    <!-- No Reviews State -->
                    <div v-else-if="approvedReviews.length === 0" class="no-reviews">
                        <i class="fas fa-comments"></i>
                        <p>لا توجد آراء متاحة حالياً</p>
                    </div>

                    <!-- Reviews Display -->
                    <template v-else>
                        <!-- Desktop View -->
                        <div class="row d-none d-md-flex">
                            <div class="col-md-4" v-for="review in approvedReviews.slice(0, 3)" :key="review._id">
                                <div class="feedback-card">
                                    <div class="user-info">
                                        <div class="user-details">
                                            <h5>{{ review.author }}</h5>
                                            <p>{{ review.department }} - {{ review.program }}</p>
                                        </div>
                                    </div>
                                    <div class="feedback-content">
                                        <h6 class="review-title">{{ review.title }}</h6>
                                        <p>{{ review.content }}</p>
                                        <div class="rating">
                                            <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= review.rating }">★</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Mobile View -->
                        <div class="d-md-none">
                            <div id="feedbackCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="10000">
                                <div class="carousel-inner">
                                    <div v-for="(review, index) in approvedReviews.slice(0, 3)" :key="review._id" 
                                         class="carousel-item" :class="{ 'active': index === 0 }">
                                        <div class="feedback-card">
                                            <div class="user-info">
                                                <div class="user-details">
                                                    <h5>{{ review.author }}</h5>
                                                    <p>{{ review.department }} - {{ review.program }}</p>
                                                </div>
                                            </div>
                                            <div class="feedback-content">
                                                <h6 class="review-title">{{ review.title }}</h6>
                                                <p>{{ review.content }}</p>
                                                <div class="rating">
                                                    <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= review.rating }">★</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-indicators">
                                    <button v-for="(review, index) in approvedReviews.slice(0, 3)" :key="review._id"
                                            type="button" 
                                            data-bs-target="#feedbackCarousel" 
                                            :data-bs-slide-to="index"
                                            :class="{ 'active': index === 0 }"
                                            :aria-label="'Slide ' + (index + 1)">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- FAQ Section -->
            <div class="FAQ-Section">
                <div class="container">
                    <div class="row session-title">
                        <h2>الأسئلة الشائعة</h2>
                        <p>إجابات على الأسئلة الأكثر شيوعاً</p>
                    </div>
                    <div class="row faq-content">
                        <div class="col-12">
                            <div class="accordion" id="faqAccordion">
                                <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button" :class="{ 'collapsed': !faq.isOpen }" type="button" 
                                                data-bs-toggle="collapse" :data-bs-target="'#faq' + index">
                                            <span class="question-number">{{ index + 1 }}</span>
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
    name: 'MainComponent',
    components: {
        HeaderComponent,
        FooterComponent,
        smartAssistantComponent
    },
    data() {
        return {
            stats: [
                { number: '150k+', description: 'مستخدم' },
                { number: '10+', description: 'خدمة مختلفة' },
                { number: '80+', description: 'عضو في الفريق' },
                { number: '5+', description: 'سنين من الخبرة' }
            ],
            animatedStats: ['0', '0', '0', '0'],
            animationStarted: false,
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
                }
            ],
            reviews: [],
            loading: false,
            error: null
        };
    },
    computed: {
        approvedReviews() {
            return this.reviews.filter(review => review.status === 'approved');
        }
    },
    methods: {
        async fetchReviews() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get('https://nuft-website-backend.vercel.app/reviews');
                this.reviews = response.data;
            } catch (error) {
                console.error('Error fetching reviews:', error);
                this.error = 'حدث خطأ أثناء تحميل آراء المستخدمين. يرجى المحاولة مرة أخرى.';
            } finally {
                this.loading = false;
            }
        },
        startCountingAnimation() {
            this.stats.forEach((stat, index) => {
                const targetNumber = parseInt(stat.number);
                const duration = 2000; // 2 seconds
                const steps = 60; // 60 steps for smooth animation
                const stepDuration = duration / steps;
                let currentStep = 0;

                const animate = () => {
                    if (currentStep < steps) {
                        const progress = currentStep / steps;
                        const currentNumber = Math.floor(targetNumber * progress);
                        this.animatedStats[index] = currentNumber + (stat.number.includes('+') ? '+' : '');
                        currentStep++;
                        setTimeout(animate, stepDuration);
                    } else {
                        this.animatedStats[index] = stat.number;
                    }
                };

                animate();
            });
        }
    },
    mounted() {
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animationStarted) {
                    this.startCountingAnimation();
                    this.animationStarted = true;
                }
            });
        }, { threshold: 0.5 });

        // Start observing the About Us section
        if (this.$refs.aboutSection) {
            observer.observe(this.$refs.aboutSection);
        }

        // Fetch reviews when component is mounted
        this.fetchReviews();
    }
};
</script>

<style scoped>
/* RTL Content Wrapper */
.rtl-content {
    direction: rtl;
    text-align: right;
}

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

.About-Us .numb h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 10px;
    transition: all 0.3s ease;
}

.About-Us .numb span {
    color: #ffffff;
    font-size: 1.1rem;
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
    padding: 80px 0;
    background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
    position: relative;
}

.Feedback-Section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #007bff, #00bcd4);
}

.Feedback-Section .session-title {
    text-align: center;
    margin-bottom: 60px;
}

.Feedback-Section .session-title h2 {
    margin-bottom: 15px;
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    position: relative;
    display: inline-block;
}

.Feedback-Section .session-title h2::after {
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

.Feedback-Section .session-title p {
    color: #666;
    font-size: 1.2rem;
    margin-top: 20px;
}

.feedback-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    height: 100%;
}

.feedback-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    flex-direction: row-reverse;
}

.user-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
    margin-left: 0;
    object-fit: cover;
    border: 3px solid #f0f4f8;
    transition: all 0.3s ease;
}

.feedback-card:hover .user-image {
    border-color: #007bff;
}

.user-details h5 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #2c3e50;
}

.user-details p {
    margin: 5px 0 0;
    color: #666;
    font-size: 0.9rem;
}

.feedback-content p {
    margin-bottom: 15px;
    line-height: 1.8;
    color: #666;
}

.rating {
    color: #ddd;
    font-size: 1.2rem;
}

.rating .star.filled {
    color: #ffc107;
}

/* FAQ Section Styles */
.FAQ-Section {
    padding: 80px 0;
    background: linear-gradient(135deg, #e2e6ea 0%, #d1d5db 100%);
    position: relative;
}

.FAQ-Section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00bcd4, #007bff);
}

.FAQ-Section .session-title {
    text-align: center;
    margin-bottom: 60px;
}

.FAQ-Section .session-title h2 {
    margin-bottom: 15px;
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    position: relative;
    display: inline-block;
}

.FAQ-Section .session-title h2::after {
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

.FAQ-Section .session-title p {
    color: #666;
    font-size: 1.2rem;
    margin-top: 20px;
}

.FAQ-Section .container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.FAQ-Section .faq-content {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.FAQ-Section .accordion {
    width: 100%;
    border: none;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    border-radius: 12px;
    overflow: hidden;
}

.FAQ-Section .accordion-item {
    border: none;
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    transition: all 0.3s ease;
}

.FAQ-Section .accordion-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.FAQ-Section .accordion-button {
    padding: 20px 25px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    background: white;
    border: none;
    position: relative;
    display: flex;
    align-items: center;
    gap: 15px;
}

.FAQ-Section .accordion-button:not(.collapsed) {
    background: linear-gradient(135deg, #007bff, #00bcd4);
    color: white;
}

.FAQ-Section .accordion-button:focus {
    box-shadow: none;
    border-color: transparent;
}

.FAQ-Section .accordion-button::after {
    margin-right: auto;
    margin-left: 0;
    transition: all 0.3s ease;
}

.FAQ-Section .accordion-button:not(.collapsed)::after {
    transform: rotate(-180deg);
    filter: brightness(0) invert(1);
}

.question-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: #f0f4f8;
    border-radius: 50%;
    font-size: 0.9rem;
    font-weight: 600;
    color: #007bff;
    margin-left: 10px;
}

.accordion-button:not(.collapsed) .question-number {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

.FAQ-Section .accordion-body {
    padding: 20px 25px;
    line-height: 1.8;
    color: #666;
    text-align: right;
    background: white;
    border-top: 1px solid rgba(0,0,0,0.05);
}

@media (max-width: 768px) {
    .FAQ-Section {
        padding: 60px 0;
    }

    .FAQ-Section .session-title h2 {
        font-size: 2rem;
    }

    .FAQ-Section .session-title p {
        font-size: 1.1rem;
    }

    .FAQ-Section .faq-content {
        padding: 0 15px;
    }

    .FAQ-Section .accordion-button {
        padding: 15px 20px;
        font-size: 1rem;
    }

    .FAQ-Section .accordion-body {
        padding: 15px 20px;
    }
}

/* Update existing styles */
.Feedback-Section {
    background-color: #f8f9fa;
}

.FAQ-Section {
    background-color: #f8f9fa;
}

@media (max-width: 768px) {
    .article-card, .feedback-card {
        margin-bottom: 20px;
    }
    
    .user-info {
        flex-direction: column-reverse;
        text-align: center;
    }
    
    .user-image {
        margin: 0 0 10px 0;
    }
}

/* Remove these styles since we're not using the arrows anymore */
.Feedback-Section .carousel-control-prev,
.Feedback-Section .carousel-control-next {
    display: none;
}

.Feedback-Section .carousel-indicators {
    margin-bottom: 0;
    position: relative;
    margin-top: 20px;
}

.Feedback-Section .carousel-indicators button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 4px;
    background-color: #ccc;
}

.Feedback-Section .carousel-indicators button.active {
    background-color: #007bff;
}

.Feedback-Section .carousel {
    margin: 0 -15px;
}

.Feedback-Section .carousel-inner {
    padding: 15px;
}

.Feedback-Section .carousel-control-prev,
.Feedback-Section .carousel-control-next {
    display: none;
}

.Feedback-Section .carousel-indicators {
    margin-bottom: 0;
    position: relative;
    margin-top: 20px;
}

.Feedback-Section .carousel-indicators button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 4px;
    background-color: #ccc;
}

.Feedback-Section .carousel-indicators button.active {
    background-color: #007bff;
}

@media (max-width: 768px) {
    .Feedback-Section .carousel-item {
        padding: 0 15px;
    }
    
    .Feedback-Section .feedback-card {
        margin: 0;
    }

    .Feedback-Section .user-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 15px;
        margin-left: 0;
        object-fit: cover;
        border: 3px solid #f0f4f8;
    }

    .Feedback-Section .user-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        flex-direction: row-reverse;
    }
}

/* Add new styles for reviews */
.review-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 10px;
}

.loading-state,
.error-state,
.no-reviews {
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
.no-reviews i {
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
</style>
