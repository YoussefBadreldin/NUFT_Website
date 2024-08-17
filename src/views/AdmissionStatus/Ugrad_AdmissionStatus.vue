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
                },
                {
                    link: '/Status/UGRAD/Private,
                    imgSrc: '/images/Universites/Status/PrivateStatus.png',
                    altText: 'Private Universities',
                    title: 'حالة تقديمات الجامعات الخاصةا',
                },
                {
                    link: '', // Provide a valid link or remove if not needed
                    imgSrc: '/images/Universites/Status/SpecialStatus.png',
                    altText: 'Special Nature Universities',
                    title: 'حالة تقديمات الجامعات ذات طبيعة خاصة (قريبا)',
                },
                {
                    link: '', // Provide a valid link or remove if not needed
                    imgSrc: '/images/Universites/Status/InternationalStatus.png',
                    altText: 'International Universities',
                    title: 'حالة تقديمات افرع الجامعات الاجنبية (قريبا)',
                }
            ],
        };
    },
};
</script>

<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>