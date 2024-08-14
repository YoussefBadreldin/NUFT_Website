<template>
    <div>
        <header-component />

        <div class="page-nav row">
            <h2>المنح</h2>
        </div>

        <div class="Card-Box" dir="rtl">
            <div class="container">
                <br>
                <div class="row Box-ro">
                    <div class="col-md-4">
                        <a href="/Scholarships/UGRAD">
                            <div class="Box-card">
                                <img src="/images/scholarships/UGRAD.png" alt="">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>منح المرحلة الجامعية</h6>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!--<div class="col-md-4">
                        <a href="/Scholarships/PGRAD">
                            <div class="Box-card">
                                <img src="/images/scholarships/PGRAD.png" alt="">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>مرحلة الدراسات العليا</h6>
                                </div>
                            </div>
                        </a>
                    </div>-->
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
    name:"ScholarShips",
    components: {
        HeaderComponent,
        FooterComponent,
    }
}
</script>
<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>