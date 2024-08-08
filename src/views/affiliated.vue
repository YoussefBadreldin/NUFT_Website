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
            name: 'جامعة بني سويف الاهلية',
            imgSrc: '/images/Logos/Universites/National/BSNU.png',
            link: '/guide/UGRAD/National/BSNU'
       },
        {
            id: 5,
            name: 'جامعة جنوب الوادي الاهلية',
            imgSrc: '/images/Logos/Universites/National/SVNU.png',
            link: '/guide/UGRAD/National/SVNU'
        },
        {
            id: 6,
            name: 'جامعة الزقازيق الاهلية',
            imgSrc: '/images/Logos/Universites/National/ZNU.png',
            link: '/guide/UGRAD/National/ZNU'
        },
        {
            id: 7,
            name: 'جامعة المنيا الاهلية',
            imgSrc: '/images/Logos/Universites/National/MiniaNU.png',
            link: '/guide/UGRAD/National/MiniaNU'
        },
                {
            id: 8,
            name: 'جامعة المنوفية الاهلية',
            imgSrc: '/images/Logos/Universites/National/MenofiaNU.png',
            link: '/guide/UGRAD/National/MenofiaNU'
        },
                {
            id: 9,
            name: 'جامعة شرق بورسعيد الاهلية',
            imgSrc: '/images/Logos/Universites/National/EPNU.png',
            link: '/guide/UGRAD/National/EPNU'
        },
                {
            id: 10,
            name: 'جامعة اسكندرية الاهلية',
            imgSrc: '/images/Logos/Universites/National/AlexNU.png',
            link: '/guide/UGRAD/National/AlexNU'
        },
                {
            id: 11,
            name: 'جامعة اسيوط الاهلية',
            imgSrc: '/images/Logos/Universites/National/AssuitNU.png',
            link: '/guide/UGRAD/National/AssuitNU'
        },
                {
            id: 12,
            name: 'جامعة الاسماعلية الجديدة الاهلية',
            imgSrc: '/images/Logos/Universites/National/NINU.png',
            link: '/guide/UGRAD/National/NINU'
        }
        ]
    };
    },
    methods: {
    search() {
      console.log('Search query:', this.searchQuery);
      // Implement search functionality here
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>