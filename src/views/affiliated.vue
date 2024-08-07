<template>
    <div>
    <HeaderComponent />
    <div class="page-nav row">
        <h2>الجامعات الاهلية المنبثقة</h2>
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
            name: 'جامعة المنصورة الاهلية  ',
            imgSrc: '/images/Logos/Universites/National/MansNU.png',
            link: '/guide/UGRAD/National/MansNU'
        },
        {
            id: 2,
            name: 'جامعة حلوان الاهلية',
            imgSrc: '/images/Logos/Universites/National/HNU.png',
            link: '/guide/UGRAD/National/HNU'
        },
        {
            id: 3,
            name: 'جامعة بنها الاهلية',
            imgSrc: '/images/Logos/Universites/National/BNU.png',
            link: '/guide/UGRAD/National/BNU'
        },
        {
            id: 4,
            name: 'جامعة بني سوسف الاهلية',
            imgSrc: '/images/Logos/Universites/National/BSNU.png',
            link: '/guide/UGRAD/National/BSNU'
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
