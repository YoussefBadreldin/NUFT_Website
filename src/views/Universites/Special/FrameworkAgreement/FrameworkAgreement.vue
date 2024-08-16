<template>
  <div>
    <HeaderComponent />
    <div class="page-nav row">
      <h2>الجامعات المنشئه باتفاقات اطارية</h2>
    </div>
    </div>

    <div class="Card-Box" dir="rtl">
      <div class="container" style="text-align: center;">
        <h3>ما هي الجامعات المنشئه باتفاقات اطارية؟</h3>
        <p>هي جامعات . وعددهم 6 جامعات</p>
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
    name: 'الاكادمية البحرية للعلوم والتكنولوجيا والنقل البحري',
    imgSrc: '/images/Logos/Universites/Special/AASTMT.png',
    link: '/Guide/UGRAD/Special/AASTMT'
},
{
    id: 2,
    name: 'الجامعة العربية المفتوحة',
    imgSrc: '/images/Logos/Universites/Special/AOU.png',
    link: '/Guide/UGRAD/Special/AOU'
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