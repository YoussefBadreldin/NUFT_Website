<template>
    <div>

        <HeaderComponent />

        <!-- Page Title -->
        <div class="page-nav row">
            <h2>دليل المرحة الجامعية</h2>
        </div>

        <!-- Cards Box -->
        <div class="Card-Box">
            <div class="container" dir="rtl">
                <br>
                <div class="row Box-ro">
                    <div class="col-md-4">
                        <router-link to="/Guide/UGRAD/national">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/NationalGuide.png" alt="National Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>دليل الجامعات الاهلية</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <!--<div class="col-md-4">
                        <router-link to="/Guide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/PublicGuide.png" alt="Public Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>الجامعات الحكومية</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/Guide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/PrivateGuide.png" alt="Private Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>الجامعات الخاصة</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/Guide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/InternationalGuide.png"
                                    alt="International Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>الجامعات الدولية</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/Guide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/SpecialGuide.png" alt="Special Nature Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>الجامعات ذات طبيعة خاصة</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/Guide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/TechUniGuide.png" alt="Technological Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>الجامعات التكنولوجية</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/Guide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/InstitutionsGuide.png"
                                    alt="Higher Institutes, Academies & Technological Colleges">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>المعاهد العليا والاكادميات والكليات التكنولوجية</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>-->
                </div>
            </div>
        </div>

        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../public/global/headerComponent.vue';
import FooterComponent from '../../public/global/footerComponent.vue';

export default {
    name:"UgardView",
    components: {
        HeaderComponent,
        FooterComponent
    }
};
</script>

<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>