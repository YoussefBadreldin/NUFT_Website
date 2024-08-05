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
            <!-- Partner content will be dynamically inserted here -->
            <!-- Example of partner item -->
            <div class="col-md-4">
                <div class="partner-item">
                    <img src="/images/Logo2.png" alt="Partner 1" class="img-fluid">
                </div>
            </div>
            <div class="col-md-4">
                <div class="partner-item">
                    <img src="/images/Logo2.png" alt="Partner 2" class="img-fluid">
                </div>
            </div>
            <div class="col-md-4">
                <div class="partner-item">
                    <img src="/images/Logo2.png" alt="Partner 3" class="img-fluid">
                </div>
            </div>
            <!-- Add more partners as needed -->
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
/* Add your styles here */
.slider{
    padding-top: 0;
}
</style>