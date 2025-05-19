<template>
    <div class="smart-assistant-page">
        <HeaderComponent />

        <!-- Welcome Section -->
        <div class="welcome-section" dir="rtl">
            <div class="container">
                <div class="welcome-content">
                    <div class="assistant-illustration">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="welcome-text">
                        <h1 class="welcome-title">أهلاً بك!</h1>
                        <p class="assistant-intro"><strong>أنا مساعدك الشخصي الذكي</strong></p>
                        <p class="assistant-question">كيف يمكنني مساعدتك؟</p>
                    </div>

                </div>

                <!-- Options Grid -->
                <div class="options-grid">
                    <router-link to="/smartAssistant/faculties" class="option-card">
                        <div class="card-content">
                            <i class="fas fa-university"></i>
                            <h3>الجامعات التي تحتوي على كلية معينة</h3>
                            <p>اكتشف الجامعات التي تقدم التخصص الذي تريده</p>
                        </div>
                    </router-link>

                    <router-link to="/smartAssistant/score" class="option-card">
                        <div class="card-content">
                            <i class="fas fa-calculator"></i>
                            <h3>معرفة الكليات التي تناسب مجموعي</h3>
                            <p>اعرف الكليات المتاحة بناءً على مجموعك</p>
                        </div>
                    </router-link>

                    <router-link to="/smartAssistant/search" class="option-card">
                        <div class="card-content">
                            <i class="fas fa-search"></i>
                            <h3>البحث عن جامعة معينة</h3>
                            <p>ابحث عن معلومات تفصيلية عن الجامعة التي تهمك</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue'; 

export default {
    name: 'MainComponent',
    components: {
        HeaderComponent,
        FooterComponent
    },
    mounted() {
        window.scrollTo(0, 0);
    }
};
</script>

<style scoped>
.smart-assistant-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.welcome-section {
    padding: 60px 20px;
}

.welcome-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
    background: linear-gradient(135deg, #2B32B2, #1488CC);
    padding: 40px;
    border-radius: 20px;
    color: white;
    box-shadow: 0 10px 30px rgba(43, 50, 178, 0.2);
}

.welcome-text {
    flex: 1;
    padding-right: 40px;
}

.welcome-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: 700;
}

.assistant-intro {
    font-size: 1.5rem;
    margin-bottom: 15px;
    opacity: 0.9;
}

.assistant-question {
    font-size: 1.2rem;
    opacity: 0.8;
}

.assistant-illustration {
    font-size: 5rem;
    opacity: 0.9;
    animation: float 3s ease-in-out infinite;
}

.options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.option-card {
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.option-card:hover {
    transform: translateY(-5px);
}

.card-content {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.option-card:hover .card-content {
    box-shadow: 0 8px 25px rgba(43, 50, 178, 0.15);
    background: linear-gradient(135deg, #6B48FF, #1CB5E0);
    color: white;
}

.card-content i {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #2B32B2;
    transition: all 0.3s ease;
}

.option-card:hover .card-content i {
    color: white;
    transform: scale(1.1);
}

.card-content h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    font-weight: 600;
}

.card-content p {
    font-size: 0.9rem;
    opacity: 0.8;
    margin: 0;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0px);
    }
}

/* Responsive Styles */
@media (max-width: 768px) {
    .welcome-content {
        flex-direction: column;
        text-align: center;
        padding: 30px;
    }

    .welcome-text {
        padding-right: 0;
        margin-bottom: 30px;
    }

    .welcome-title {
        font-size: 2rem;
    }

    .assistant-intro {
        font-size: 1.2rem;
    }

    .assistant-question {
        font-size: 1rem;
    }

    .assistant-illustration {
        font-size: 4rem;
    }

    .options-grid {
        grid-template-columns: 1fr;
    }
}
</style>
