<template>
  <div>
    <HeaderComponent />
    <div class="page-nav row">
      <h2>الجامعات ذات طبيعة خاصة<br>(المنشأة باتفاقات دولية)</h2>
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
    </div>

        <footer-component />
    <smartAssistantComponent />
  </div>
</template>

<script>
import HeaderComponent from '../../../../../public/global/headerComponent.vue';
import FooterComponent from '../../../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../../../public/global/smartAssistantComponent.vue';

export default {
  name: 'interSpecial',
  components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
  },
  data() {
    return {
      searchQuery: '',
      universities: [
        {
          id: 1,
          name: 'جامعة اسلسكا',
          imgSrc: '/images/Logos/Universites/Special/EslscaU.png',
          link: '/Guide/UGRAD/Special/EslscaU',
        },
        {
          id: 2,
          name: 'الجامعة الأمريكية بالقاهرة',
          imgSrc: '/images/Logos/Universites/Special/AUC.png',
          link: '/Guide/UGRAD/Special/AUC',
        },
        {
          id: 3,
          name: 'الجامعة المصرية اليابانية',
          imgSrc: '/images/Logos/Universites/Special/EJUST.png',
          link: '/Guide/UGRAD/Special/EJUST',
        },
        {
          id: 4,
          name: 'الجامعة الألمانية الدولية',
          imgSrc: '/images/Logos/Universites/Special/GIU.png',
          link: '/Guide/UGRAD/Special/GIU',
        },
        {
          id: 5,
          name: 'جامعة سنجور (دراسات عليا فقط)',
          imgSrc: '/images/Logos/Universites/Special/SenghorU.png',
          link: '',
        },
        {
          id: 6,
          name: 'جامعة برلين (اغلقت 2022)',
          imgSrc: '/images/Logos/Universites/Special/TUB.png',
          link: '',
        }
      ],
    };
  },
  methods: {
    search() {
      console.log('Search query:', this.searchQuery);
      // Implement search functionality here
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.page-nav {
  width: 100.97%; /* Adjust as needed */
}
</style>
