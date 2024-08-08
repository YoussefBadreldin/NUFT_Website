<template>
    <div>
        <!-- Page Title -->
        <HeaderComponent />
        <div class="page-nav row">
            <h2>دليل الجامعات</h2>
        </div>

        <!-- Cards Box -->
        <div class="Card-Box">
            <div class="container" dir="rtl">
                <br>
                <div class="row Box-ro">
                    <div class="col-md-4">
                        <router-link to="/Guide/UGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/UGRADGuide.png" alt="National Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>دليل المرحلة الجامعية</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <!--<div class="col-md-4">
                        <router-link to="/Guide/PGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/PGRADGuide.png" alt="Public Universities">
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
        <Scripts />
    </div>
</template>

<script>
import HeaderComponent from '../../public/global/headerComponent.vue';
import FooterComponent from '../../public/global/footerComponent.vue';

export default {
    name:"UniversitiesGuide",
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