<template>
    <div>
        <!-- Include the Head component -->
        <HeaderComponent />

        <div class="page-nav row">
            <h2>حالة التقديمات</h2>
        </div>

        <div class="Card-Box" dir="rtl">
            <div class="container">
                <br />
                <div class="row Box-ro">
                    <div class="col-md-4">
                        <router-link to="/status/UGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/UGRADStatus.png" alt="National Universities" />
                                <div class="Box-det" style="text-align: center;">
                                    <h6>حالة تقديمات المرحلة الجامعية</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <!--<div class="col-md-4">
                        <router-link to="/status/PGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/PGRADStatus.png" alt="Public Universities" />
                                <div class="Box-det" style="text-align: center;">
                                    <h6>مرحلة الدراسات العليا</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>-->
                </div>
            </div>
        </div>

        <FooterComponent />
        <smartAssistantComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
    name:"AdmissionStatus",
    components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
    },
};
</script>

<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>