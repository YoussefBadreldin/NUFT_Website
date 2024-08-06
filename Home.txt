<template>
    <div>
        <HeaderComponent />

        <!-- Slider -->
        <div class="slider">
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="../../images/slider/slider-1.jpg" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h2>دليلك الشامل للجامعات في مصر</h2>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../../images/slider/slider-2.jpg" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h2>استكشف خياراتك مع دليلنا للجامعات</h2>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../../images/slider/slider-3.jpg" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h2>ابدأ رحلتك مع دليلنا للجامعات</h2>
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
                        <p>
                            فريق تطوعي من طلاب مختلف الجامعات المصرية، يهدف إلى مساعدة المهتمين بالتقديم للجامعات المصرية
                        </p>
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

        <!-- Our Team -->
        <div class="Our-Team">
            <div class="container" dir="rtl">
                <div class="session-title row">
                    <h2>فريقنا</h2>
                </div>
                <div class="Member-row row">
                    <div v-for="(member, index) in teamMembers" :key="index" class="col-md-4">
                        <div class="Member-card">
                            <img :src="member.image" :alt="member.name" />
                            <h6>{{ member.name }}</h6>
                            <p>{{ member.position }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Our Partners -->
        <div class="Our-Partners">
            <div class="container">
                <div class="session-title row">
                    <h2>شركاء النجاح</h2>
                </div>
                <div class="row-partners row">
                    <!-- Partner content with links -->
                    <div class="col-md-4">
                        <a href="http://www.pill-network.com" target="_blank" class="partner-link">
                            <div class="partner-item">
                                <img src="/images/Partners/PillNetwork.png" alt="Partner 1" class="img-fluid">
                            </div>
                        </a>
                    </div>
                    <!-- Add more partners with links as needed -->
                </div>
            </div>
        </div>

        <FooterComponent />
    </div>
</template>

<script>
import $ from 'jquery';
import HeaderComponent from '../../public/global/headerComponent.vue';
import FooterComponent from '../../public/global/footerComponent.vue';

export default {
    name: 'MainComponent',
    components: {
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            stats: [
                { number: '115k+', description: 'زيارات للدليل' },
                { number: '7+', description: 'دليل مختلف' },
                { number: '80+', description: 'عضو في الفريق' },
                { number: '4+', description: 'سنين من الخبرة'}
            ],
            teamMembers: [
                { name: 'محمود عادل', position: 'قائد الفريق', image: '/images/Board/MahmoudAdel.jpg' },
                { name: 'أحمد عيد', position: 'رئيس لجنة خدمة العملاء', image: '/images/Board/AhmedEid.jpg' },
                { name: 'حنين صباح', position: 'رئيس لجنة العلاقات العامة', image: '/images/Board/HaninSabbah.jpg' }, 
                { name: 'يوسف بدر الدين', position: 'رئيس لجنة تكنولوجيا المعلومات', image: '/images/Board/YoussefBadreldin.jpg' },
                { name: 'ميادة قنديل', position: 'رئيس لجنة الإعلام والتسويق', image: '/images/Board/MayadaKandil.jpg' },
                { name: 'أحمد حمدي', position: 'رئيس لجنة الدراسات العليا', image: '/images/Board/AhmedHamdy.jpg' },
                { name: 'أحمد علاء', position: 'رئيس لجنة المرحلة الجامعية', image: '/images/Board/AhmedAlaa.jpg' }
            ]
        };
    },
    mounted() {
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
</style>
