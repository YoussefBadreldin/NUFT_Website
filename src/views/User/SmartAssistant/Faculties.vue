<template>
  <div>
    <HeaderComponent />

    <div class="faculties-section" dir="rtl">
        <div class="score-container">
            <div class="welcome-content">
                <div class="assistant-illustration">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="welcome-text">
                    <h1 class="welcome-title">أهلا بيك!</h1>
                    <p class="assistant-intro"><strong>أنا مساعدك الشخصي الذكي</strong></p>
                    <p class="search-instruction">أنا هنا لمساعدتك لاكتشاف الجامعات التي تقدم التخصص الذي تريده <br> يرجى إختيار الكلية لنبدء</p>
                </div>
            </div>

            <div class="faculties-container">
                <div class="faculties-grid">
                    <router-link 
                        v-for="university in universities" 
                        :key="university.id"
                        :to="university.link"
                        class="faculty-card"
                    >
                        <img :src="university.imgSrc" :alt="university.name">
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '../../../../public/global/headerComponent.vue';
import FooterComponent from '../../../../public/global/footerComponent.vue';

export default {
    name:'interNational',
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
        return {
            universities: [
                {
                    id: 1,
                    name: 'كلية الطب البشري',
                    imgSrc: '/images/Logos/Faculties/MED.png',
                    link: '/SmartAssistant/Faculties/MED'
                },
                {
                    id: 2,
                    name: 'كلية طب الأسنان',
                    imgSrc: '/images/Logos/Faculties/DENT.png',
                    link: '/SmartAssistant/Faculties/DENT'
                },
                {
                    id: 3,
                    name: 'كلية العلاج الطبيعي',
                    imgSrc: '/images/Logos/Faculties/PT.png',
                    link: '/SmartAssistant/Faculties/PT'
                },
                {
                    id: 4,
                    name: 'كلية الصيدلة',
                    imgSrc: '/images/Logos/Faculties/PHARM.png',
                    link: '/SmartAssistant/Faculties/PHARM'
                },
                {
                    id: 5,
                    name: 'كلية الطب البيطري',
                    imgSrc: '/images/Logos/Faculties/VET.png',
                    link: '/SmartAssistant/Faculties/VET'
                },
                {
                    id: 6,
                    name: 'كلية التمريض',
                    imgSrc: '/images/Logos/Faculties/NURS.png',
                    link: '/SmartAssistant/Faculties/NURS'
                },
                {
                    id: 7,
                    name: 'كلية تكنولوجيا العلوم الصحية',
                    imgSrc: '/images/Logos/Faculties/HS.png',
                    link: '/SmartAssistant/Faculties/HS'
                },
                {
                    id: 8,
                    name: 'كلية العلوم الأساسية',
                    imgSrc: '/images/Logos/Faculties/SCI.png',
                    link: '/SmartAssistant/Faculties/SCI'
                },
                {
                    id: 9,
                    name: 'كلية التكنولوجيا الحيوية',
                    imgSrc: '/images/Logos/Faculties/BIOTECH.png',
                    link: '/SmartAssistant/Faculties/BIOTECH'
                },
                {
                    id: 10,
                    name: 'كلية الهندسة',
                    imgSrc: '/images/Logos/Faculties/ENG.png',
                    link: '/SmartAssistant/Faculties/ENG'
                },
                {
                    id: 11,
                    name: 'كلية علوم الحاسب',
                    imgSrc: '/images/Logos/Faculties/CS.png',
                    link: '/SmartAssistant/Faculties/CS'
                },
                {
                    id: 12,
                    name: 'الكليات البولي تيكنيك',
                    imgSrc: '/images/Logos/Faculties/POLY.png',
                    link: '/SmartAssistant/Faculties/POLY'
                },
                {
                    id: 13,
                    name: 'كلية الفنون',
                    imgSrc: '/images/Logos/Faculties/ART.png',
                    link: '/SmartAssistant/Faculties/ART'
                },
                {
                    id: 14,
                    name: 'كلية الإعلام',
                    imgSrc: '/images/Logos/Faculties/MEDIA.png',
                    link: '/SmartAssistant/Faculties/MEDIA'
                },
                {
                    id: 15,
                    name: 'كلية الآثار',
                    imgSrc: '/images/Logos/Faculties/ARCH.png',
                    link: '/SmartAssistant/Faculties/ARCH'
                },
                {
                    id: 16,
                    name: 'كلية الحقوق',
                    imgSrc: '/images/Logos/Faculties/LAW.png',
                    link: '/SmartAssistant/Faculties/LAW'
                },
                {
                    id: 17,
                    name: 'كلية السياحة',
                    imgSrc: '/images/Logos/Faculties/TOUR.png',
                    link: '/SmartAssistant/Faculties/TOUR'
                },
                {
                    id: 18,
                    name: 'كلية الاقتصاد والإدارة',
                    imgSrc: '/images/Logos/Faculties/ECON.png',
                    link: '/SmartAssistant/Faculties/ECON'
                },
                {
                    id: 19,
                    name: 'كلية العلوم السينمائية',
                    imgSrc: '/images/Logos/Faculties/CINE.png',
                    link: '/SmartAssistant/Faculties/CINE'
                },
                {
                    id: 20,
                    name: 'كلية التربية',
                    imgSrc: '/images/Logos/Faculties/EDU.png',
                    link: '/SmartAssistant/Faculties/EDU'
                },
                {
                    id: 21,
                    name: 'كلية اللغات والترجمة',
                    imgSrc: '/images/Logos/Faculties/LANG.png',
                    link: '/SmartAssistant/Faculties/LANG'
                },
                {
                    id: 22,
                    name: 'كلية العلوم الاجتماعية',
                    imgSrc: '/images/Logos/Faculties/SOCSCI.png',
                    link: '/SmartAssistant/Faculties/SOCSCI'
                }
            ]
        };
    },
    mounted() {
        window.scrollTo(0, 0);
    }
};
</script>

<style scoped>
.faculties-section {
    min-height: calc(100vh - 200px);
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 40px 20px;
}

.score-container {
    max-width: 1200px;
    margin: 0 auto;
}

.welcome-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
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

.search-instruction {
    font-size: 1.2rem;
    opacity: 0.8;
}

.assistant-illustration {
    font-size: 5rem;
    opacity: 0.9;
    animation: float 3s ease-in-out infinite;
}

.faculties-container {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.faculties-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 1rem;
}

.faculty-card {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    display: block;
    background: white;
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.faculty-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(107, 72, 255, 0.2);
}

.faculty-card img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
    border-radius: 8px;
}

.faculty-card:hover img {
    transform: scale(1.05);
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

    .search-instruction {
        font-size: 1rem;
    }

    .assistant-illustration {
        font-size: 4rem;
    }

    .faculties-container {
        padding: 20px;
    }

    .faculties-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
}

@media (max-width: 480px) {
    .faculties-grid {
        grid-template-columns: 1fr;
    }
}
</style>