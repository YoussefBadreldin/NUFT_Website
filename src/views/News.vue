<template>
    <div>
        <header-component />

        <!-- Page Title -->
        <div class="page-nav row">
            <h2>الاخبار</h2>
        </div>

        <!-- Empty Space -->
        <div class="our-Services">
            <div class="container">
                <div class="session-title row">
                    <!-- Session title goes here -->
                </div>
            </div>

            <!-- Cards Box -->
            <div class="our-blog bb3 pc2">
                <div class="container">
                    <div class="row-news row">
                        <div class="col-md-10 vbf mx-auto">
                            <!-- News cards go here -->
                            <div class="news-card row" v-for="(news, index) in sortedNews" :key="index">
                                <div>
                                    <div class="date-box" style="margin-top: 6vh;">
                                        <p style="width: 100%">{{ news.text }}</p>
                                    </div>
                                </div>
                                <!-- <div class="col-7 setv">
                                    <h4><router-link :to="`/News/${news.id}`">{{ news.title }}</router-link></h4>
                                </div>
                                <div class="col-3 img-cv">
                                    <img :src="news.image" :alt="`${news.title} Logo`">
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer-component />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from "../../public/global/headerComponent.vue";
import FooterComponent from "../../public/global/footerComponent.vue";

export default {
    name: 'NewsPage',
    components: {
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            newsData: [
                {
                },
                
            ]
        };
    },
    computed: {
        sortedNews() {
            // Sort newsData array based on date in descending order
            return this.newsData.slice().sort((a, b) => {
                const dateA = new Date(a.year, this.getMonth(a.month), a.day);
                const dateB = new Date(b.year, this.getMonth(b.month), b.day);
                return dateB - dateA;
            });
        }
    },
    methods: {
        getMonth(monthName) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months.indexOf(monthName);
        },
        getNews(){
            axios.get('https://nuft-website-backend.vercel.app/news/getNews').then(response=>{
                this.newsData = response.data;
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    created(){
        this.getNews();
    }
};
</script>

<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>