<template>
    <div>    
    <HeaderComponent />
 
    <div class="page-nav row">
        <h2>دليل الجامعات ذات طبيعة خاصة</h2>

    </div>

    <div class="Card-Box" dir="rtl">
        <div class="container" style="text-align: center;">
        <h3>ما هي الجامعات ذات طبيعة خاصة؟</h3>
        هي جامعات . وعددهم 9 جامعات
        <br><br>
        <h3><br>أنواع الجامعات ذات طبيعة خلصة</h3>
        <div class="row Box-ro">
            <div class="col-md-4">
            <router-link to="/Guide/UGRAD/special/InternationalAgreements">
                <div class="Box-card">
                <img src="/images/Categories/InternationalAgreements.png" alt=" special Universities">
                <div class="Box-det" style="text-align: center;">
                    <h6>جامعات باتفاقات دولية</h6>
                </div>
                </div>
            </router-link>
            </div>
            <div class="col-md-4">
            <router-link to="/Guide/UGRAD/special/FrameworkAgreements">
                <div class="Box-card">
                <img src="/images/Categories/FrameworkAgreements.png" alt=" special Universities">
                <div class="Box-det" style="text-align: center;">
                    <h6>جامعات باتفاقات اطارية</h6>
                </div>
                </div>
            </router-link>
            </div>
            <div class="col-md-4">
            <router-link to="/guide/UGRAD/special/SpecialLaw">
                <div class="Box-card">
                <img src="/images/Categories/SpecialLaw.png" alt=" special Universities">
                <div class="Box-det" style="text-align: center;">
                    <h6>جامعات بقوانين خاصة</h6>
                </div>
                </div>
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
