<template>
    <div>
    <HeaderComponent />
    <div class="page-nav row">
        <h2>الجامعات الاهلية </h2>
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
import HeaderComponent from '../../../../../public/global/headerComponent.vue';
import FooterComponent from '../../../../../public/global/footerComponent.vue';

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
            name: 'الجامعة الفرنسية بمصر  ',
            imgSrc: '/images/Logos/Universites/National/UFE.png',
            link: '/guide/UGRAD/National/UFE'
        },
        {
            id: 2,
            name: 'جامعة النيل الاهلية',
            imgSrc: '/images/Logos/Universites/National/NU.png',
            link: '/guide/UGRAD/National/NU'
        },
        {
            id: 3,
            name: 'الجامعة المصرية للتعليم الالكتروني',
            imgSrc: '/images/Logos/Universites/National/EELU.png',
            link: '/guide/UGRAD/National/EELU'
        },
        {
            id: 4,
            name: 'جامعة مصر للمعلوماتية',
            imgSrc: '/images/Logos/Universites/National/EUI.png',
            link: '/guide/UGRAD/National/EUI'
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
<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>