<template>
    <div>
        <!-- Include the Head component -->
        <HeaderComponent />

        <!-- Include the Header component -->

        <div class="page-nav row">
            <h2>حالة تقديمات المرحلة الجامعية</h2>
        </div>

        <div class="Card-Box" dir="rtl">
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


        <!-- Include the Footer component -->
        <FooterComponent />

        <!-- Include the Scripts component -->
        <ScriptsComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name: 'AdmissionStatusUGRAD',
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
        return {
            cards: [
                {
                    link: '/status/UGRAD/National',
                    imgSrc: '/images/Universites/Status/NationalStatus.png',
                    altText: 'National Universities',
                    title: 'حالة تقديمات الجامعات الاهلية',
                }/*,
                {
                    link: 'status/UGRAD/public',
                    imgSrc: '/images/Universites/Status/PublicStatus.png',
                    altText: 'Public Universities',
                    title: 'الجامعات الحكومية',
                },
                {
                    link: 'status/UGRAD/Private',
                    imgSrc: '/images/Universites/Status/PrivateStatus.png',
                    altText: 'Private Universities',
                    title: 'الجامعات الخاصة',
                },
                {
                    link: 'status/UGRAD/International'',
                    imgSrc: '/images/Universites/Status/InternationalStatus.png',
                    altText: 'International Universities',
                    title: 'الجامعات الدولية',
                },
                {
                    link: 'status/UGRAD/Special',
                    imgSrc: '/images/Universites/Status/SpecialStatus.png',
                    altText: 'Special Nature Universities',
                    title: 'الجامعات ذات طبيعة خاصة',
                },
                {
                    link: 'status/UGRAD/Tech',
                    imgSrc: '/images/Universites/Status/TechUniStatus.png',
                    altText: 'Technological Universities',
                    title: 'الجامعات التكنولوجية',
                },
                {
                    link: 'status/UGRAD/HigherInst,
                    imgSrc: '/images/Universites/Status/AllInstitutionsStatus.png',
                    altText: 'Higher Institutes, Academies & Technological Colleges',
                    title: 'المعاهد العليا والاكاديميات والكليات التكنولوجية',
                },*/
            ],
        };
    },
};
</script>

<style scoped>
/* Add your scoped CSS styles here */
</style>