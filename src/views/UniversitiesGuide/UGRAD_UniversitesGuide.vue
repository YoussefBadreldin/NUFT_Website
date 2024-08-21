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
                    <div class="col-md-4">
                        <router-link to="/Guide/UGRAD/Private">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/PrivateGuide.png" alt="Private Universities">
                                <div class="Box-det" style="text-align: center;">
                                <h6>دليل الجامعات الخاصة</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                                        <div class="col-md-4">
                        <router-link to="/Guide/UGRAD/Special">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/SpecialGuide.png" alt="Private Universities">
                                <div class="Box-det" style="text-align: center;">
                                <h6>دليل الجامعات ذات طبيعة خاصة</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                  <div class="col-md-4">
                        <router-link to="/Guide/UGRAD/International">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/InternationalGuide.png"
                                    alt="International Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>دليل افرع الجامعات الاجنبية</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <footer-component />
    <smartAssistantComponent />
  </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
    name:"UgardView",
    components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
    }
};
</script>

<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>