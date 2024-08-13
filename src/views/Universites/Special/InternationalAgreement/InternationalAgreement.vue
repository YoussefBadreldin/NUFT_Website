<template>
  <div>
    <HeaderComponent />
    <div class="page-nav row">
      <h2>الجامعات المنشئه باتفاقات دولية</h2>
    </div>
    </div>

    <div class="Card-Box" dir="rtl">
      <div class="container" style="text-align: center;">
        <h3>ما هي الجامعات المنشئه باتفاقات دولية؟</h3>
        <p>هي جامعات . وعددهم 2 جامعة</p>
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
  name: 'interSpecial',
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
          name: 'الجامعة الامريكية بالقاهرة',
          imgSrc: '/images/Logos/Universites/Special/AUC.png',
          link: '/Guide/UGRAD/Special/AUC'
        },
        {
          id: 2,
          name: 'الجامعة المصرية اليبانية',
          imgSrc: '/images/Logos/Universites/Special/EJUST.png',
          link: '/Guide/UGRAD/Special/EJUST'
        },
        {
          id: 3,
          name: 'الجامعة الالمانية الدولية',
          imgSrc: '/images/Logos/Universites/Special/GIU.png',
          link: '/Guide/UGRAD/Special/GIU'
        },
        {
          id: 4,
          name: 'جامعة اسلسكا',
          imgSrc: '/images/Logos/Universites/Special/EslscaU.png',
          link: '/Guide/UGRAD/Special/EslscaU'
        },
        {
          id: 5,
          name: 'جامعة بيرلين',
          imgSrc: '/images/Logos/Universites/Special/TUB.png',
          link: '/Guide/UGRAD/Special/TUB'
        },
        {
          id: 6,
          name: 'جامعة سنجور',
          imgSrc: '/images/Logos/Universites/Special/SenghorU.png',
          link: '/Guide/UGRAD/Special/Senghor'
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