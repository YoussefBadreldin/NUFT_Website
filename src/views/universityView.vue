<template>
    <div>
        <!-- Page Title -->
        <HeaderComponent />
        <div class="page-nav row">
            <h2>Universities Guidebooks</h2>
            <ul>
                <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
                <li><i class="fas fa-chevron-right"></i> <router-link to="/GuideMain">Universities
                        Guidebooks</router-link></li>
            </ul>
        </div>

        <!-- Cards Box -->
        <div class="Card-Box">
            <div class="container">
                <br>
                <div class="row Box-ro">
                    <div class="col-md-4">
                        <router-link to="/universitiesGuide/UGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/UGRADGuide.png" alt="National Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Undergraduate</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/UniversitiesGuide/PGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/PGRADGuide.png" alt="Public Universities">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Postgraduate</h6>
                                </div>
                            </div>
                        </router-link>
                    </div>
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
/* Add your styles here */
</style>