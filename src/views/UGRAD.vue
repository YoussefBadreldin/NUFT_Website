<template>
    <div>

        <HeaderComponent />

        <!-- Page Title -->
        <div class="page-nav row">
            <h2>Undergraduate Guidebooks</h2>
            <ul>
                <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
                <li><router-link to="/UniversitiesGuide"><i class="fas fa-chevron-right"></i> Universities
                        Guidebooks</router-link></li>
                <li><router-link to="/UniversitiesGuide/UGRAD"><i class="fas fa-chevron-right"></i> Undergraduate
                        Guidebooks</router-link></li>
            </ul>
        </div>

        <!-- Cards Box -->
        <div class="Card-Box">
            <div class="container">
                <br>
                <div class="row Box-ro">
                    <div class="col-md-4">
                        <router-link to="/UniversitiesGuide/UGRAD/national">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/NationalGuide.png" alt="National Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>National Universities</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/UniversitiesGuide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/PublicGuide.png" alt="Public Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Public Universities</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/UniversitiesGuide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/PrivateGuide.png" alt="Private Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Private Universities</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/UniversitiesGuide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/InternationalGuide.png"
                                    alt="International Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>International Universities</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/UniversitiesGuide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/SpecialGuide.png" alt="Special Nature Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Special Nature Universities</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/UniversitiesGuide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/TechUniGuide.png" alt="Technological Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Technological Universities</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/UniversitiesGuide/UGRAD/soon">
                            <div class="Box-card">
                                <img src="/images/Universites/Guide/InstitutionsGuide.png"
                                    alt="Higher Institutes, Academies & Technological Colleges">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Higher Institutes, Academies & Technological Colleges</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <SmartAssistant />
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../public/global/headerComponent.vue';
import SmartAssistant from '../../public/global/smartAssistant.vue';
import FooterComponent from '../../public/global/footerComponent.vue';

export default {
    name:"UgardView",
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>