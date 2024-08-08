<template>
    <div>
    <HeaderComponent />
    <div class="page-nav row">
        <h2>الجامعات الخاصة </h2>
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
            name: ' جامعة 6 اكتوبر',
            imgSrc: '/images/Logos/Universites/Private/O6U.png',
            link: '/guide/UGRAD/private/O6U'
        },
        {
            id: 2,
            name: 'جامعة أكتوبر للعلوم الحديثة والآداب',
            imgSrc: '/images/Logos/Universites/Private/MSA.png',
            link: '/guide/UGRAD/private/MSA'
        },
        {
            id: 3,
            name: 'جامعة مصر للعلوم والتكنولوجيا',
            imgSrc: '/images/Logos/Universites/Private/MUST.png',
            link: '/guide/UGRAD/private/MUST'
        },
        {
            id: 4,
            name: 'جامعة مصر الدولية',
            imgSrc: '/images/Logos/Universites/Private/MIU.png',
            link: '/guide/UGRAD/private/MIU'
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