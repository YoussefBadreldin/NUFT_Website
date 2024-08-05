<template>
    <div>
        <HeaderComponent />

        <!-- Slider -->
        <div class="slider">
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
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
                            <h2>Your Comprehensive Guide to Universities in Egypt.</h2>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../../images/slider/slider-2.jpg" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h2>Explore Your Options with Our Universities Guide</h2>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../../images/slider/slider-3.jpg" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h2>Start Your Journey with Our Universities Guide</h2>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>

        <!-- About Us -->
        <div class="About-Us">
            <div class="inner-lay">
                <div class="container">
                    <div class="row session-title">
                        <h2>About US</h2>
                        <p>
                            A voluntary team of students from various Egyptian universities, aiming to assist those
                            interested in applying to Egyptian universities.
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
            <div class="container">
                <div class="session-title row">
                    <h2>Our Team</h2>
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

        <!-- Latest News -->
        <div class="Latest-News">
            <div class="container">
                <div class="session-title row">
                    <h2>Latest News</h2>
                </div>
                <div class="row-news row">
                    <!-- News content will be dynamically inserted here -->
                </div>
            </div>
        </div>

        <SmartAssistant />
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
                { number: '4+', description: 'Years of Experience' },
                { number: '80+', description: 'Team Members' },
                { number: '7+', description: 'Guidebooks' },
                { number: '115k+', description: 'Guidebooks Visits' }
            ],
            teamMembers: [
                { name: 'Mahmoud Adel', position: 'Team Leader', image: '/images/Board/MahmoudAdel.jpg' },
                { name: 'Ahmed Alaa', position: 'Head of Undergraduate Committee', image: '/images/Board/AhmedAlaa.jpg' },
                { name: 'Ahmed Hamdy', position: 'Head of Postgraduate Committee', image: '/images/Board/AhmedHamdy.jpg' },
                { name: 'Mayada Kandil', position: 'Head of Media & Marketing Committee', image: '/images/Board/MayadaKandil.jpg' },
                { name: 'Youssef Badreldin', position: 'Head of Information Technology Committee', image: '/images/Board/YoussefBadreldin.jpg' },
                { name: 'Hanin Sabbah', position: 'Head of Public Relations Committee', image: '/images/Board/HaninSabbah.jpg' },
                { name: 'Ahmed Eid', position: 'Head of Customer Service Committee', image: '/images/Board/AhmedEid.jpg' }
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