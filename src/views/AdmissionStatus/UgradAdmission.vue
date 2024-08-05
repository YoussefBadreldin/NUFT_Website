<template>
    <div>
        <!-- Include the Head component -->
        <HeaderComponent />

        <!-- Include the Header component -->

        <!-- ################# Page Title #######################--->
        <div class="page-nav row">
            <h2>Undergraduate Admissions Status</h2>
            <ul>
                <li>
                    <router-link to="/"><i class="fas fa-home"></i> Home</router-link>
                </li>
                <li>
                    <router-link to="/AdmissionStatus"><i class="fas fa-chevron-right"></i> Universities Admissions
                        Status</router-link>
                </li>
                <li>
                    <i class="fas fa-chevron-right"></i>
                    <router-link to="/AdmissionStatus/UGRAD">Undergraduate</router-link>
                </li>
            </ul>
        </div>

        <!-- ################# Cards Box #######################--->
        <div class="Card-Box">
            <div class="container">
                <br />
                <div class="row Box-ro">
                    <div class="col-md-4" v-for="(card, index) in cards" :key="index">
                        <router-link :to="card.link">
                            <div class="Box-card">
                                <img :src="card.imgSrc" :alt="card.altText" />
                                <div class="Box-det" style="text-align: center;">
                                    <h6>{{ card.title }}</h6>
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
        <ScriptsComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import SmartAssistant from '../../../public/global/smartAssistant.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name: 'AdmissionStatusUGRAD',
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent,
    },
    data() {
        return {
            cards: [
                {
                    link: '/AdmissionStatus/UGRAD/National',
                    imgSrc: '/images/Universites/Status/NationalStatus.png',
                    altText: 'National Universities',
                    title: 'National Universities',
                },
                {
                    link: '/UniversitiesGuide/PGRAD',
                    imgSrc: '/images/Universites/Status/PublicStatus.png',
                    altText: 'Public Universities',
                    title: 'Public Universities',
                },
                {
                    link: '/UniversitiesGuide/PGRAD',
                    imgSrc: '/images/Universites/Status/PrivateStatus.png',
                    altText: 'Private Universities',
                    title: 'Private Universities',
                },
                {
                    link: '/UniversitiesGuide/PGRAD',
                    imgSrc: '/images/Universites/Status/InternationalStatus.png',
                    altText: 'International Universities',
                    title: 'International Universities',
                },
                {
                    link: '/UniversitiesGuide/PGRAD',
                    imgSrc: '/images/Universites/Status/SpecialStatus.png',
                    altText: 'Special Nature Universities',
                    title: 'Special Nature Universities',
                },
                {
                    link: '/UniversitiesGuide/PGRAD',
                    imgSrc: '/images/Universites/Status/TechUniStatus.png',
                    altText: 'Technological Universities',
                    title: 'Technological Universities',
                },
                {
                    link: '/UniversitiesGuide/PGRAD',
                    imgSrc: '/images/Universites/Status/AllInstitutionsStatus.png',
                    altText: 'Higher Institutes, Academies & Technological Colleges',
                    title: 'Higher Institutes, Academies & Technological Colleges',
                },
            ],
        };
    },
};
</script>

<style scoped>
/* Add your scoped CSS styles here */
</style>