<template>
    <div>
    <HeaderComponent />
    <div class="page-nav row">
        <h2>الجامعات الاهلية الدولية</h2>
    </div>
    
    <div class="Card-Box" dir="rtl">
        <div class="container">
        <div class="session-title row"></div>
        <div class="row Box-ro">
            <div class="col-md-4" v-for="university in universities" :key="university.id">
            <router-link :to="university.link">
                <div class="Box-card">
                <img :src="university.imgSrc" :alt="university.name">
                <div class="Box-det" style="text-align: center;">
                    <h6>{{ university.name }}</h6>
                </div>
                </div>
            </router-link>
            </div>
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
    name:'interNational',
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
    return {
        searchQuery: '',
        universities: [
        {
            id: 1,
            name: 'جامعة الملك سلمان الدولية',
            imgSrc: '/images/Logos/Universites/National/KSIU.png',
            link: '/UniversitiesGuide/UGRAD/National/International/KSIU'
        },
        {
            id: 2,
            name: 'جامعة العلمين الدولية',
            imgSrc: '/images/Logos/Universites/National/AIU.png',
            link: '/UniversitiesGuide/UGRAD/National/International/AIU'
        },
        {
            id: 3,
            name: 'جامعة الجلالة',
            imgSrc: '/images/Logos/Universites/National/GU.png',
            link: '/UniversitiesGuide/UGRAD/National/International/GU'
        },
        {
            id: 4,
            name: 'جامعة المنصورة الجديدة',
            imgSrc: '/images/Logos/Universites/National/NMU.png',
            link: '/UniversitiesGuide/UGRAD/National/International/NMU'
        }
        ]
    };
    },
    methods: {
    search() {
        console.log('Search query:', this.searchQuery);
        // Implement search functionality here
    }
    }
};
</script>
