<template>
    <div>
        <header-component />
        <div class="page-nav row">
            <h2>منح المرحلة الجامعية</h2>
            <ul>
            </ul>
        </div>

        <div class="our-Services">
            <div class="container" dir="rtl">
                <div class="session-title row">
                    <!-- Session title goes here -->
                </div>
            </div>

            <div class="our-blog bb3 pc2">
    <div class="container">
        <div class="row-news row">
            <div class="col-md-10 vbf mx-auto">
                <div class="news-card row">
                    <div class="col-2">
                    </div>
                    <div class="col-7 setv">
                       
                        <p>
                            
                        </p>
                        <p>
                            <ul>
                               
                            </ul>
                        </p>
                    </div>
                    <div class="col-3 img-cv">
                       
                    </div>
                </div>

                            <!-- Repeat for other scholarships cards -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer-component />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name:"ScholarshipsUGRAD",
    components: {
        HeaderComponent,
        FooterComponent,
    },
}
</script>
<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>