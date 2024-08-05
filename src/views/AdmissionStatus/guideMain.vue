<template>
    <div>
        <!-- Include the Head component -->
        <HeaderComponent />

        <!-- ################# Page Title #######################--->
        <div class="page-nav row">
            <h2>Universities Admissions Status</h2>
            <ul>
                <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
                <li><router-link to="/AdmissionStatus"><i class="fas fa-chevron-right"></i> Universities Admissions
                        Status</router-link></li>
            </ul>
        </div>

        <!-- ################# Cards Box #######################--->
        <div class="Card-Box">
            <div class="container">
                <br />
                <div class="row Box-ro">
                    <div class="col-md-4">
                        <router-link to="/AdmissionStatus/UGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/UGRADStatus.png" alt="National Universities" />
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Undergraduate</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/AdmissionStatus/PGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/PGRADStatus.png" alt="Public Universities" />
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Postgraduate</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Include the SmartAssistant component -->
        <SmartAssistant />

        <!-- Include the Footer component -->
        <FooterComponent />

        <!-- Include the Scripts component -->
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import SmartAssistant from '../../../public/global/smartAssistant.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name:"AdmissionStatus",
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent,
    },
};
</script>

<style scoped>
/* Add your scoped CSS styles here */
</style>