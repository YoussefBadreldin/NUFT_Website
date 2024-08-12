<template>
  <div>
    <HeaderComponent />

<div class="page-nav row">
        <h2>دليل الجامعات الدولية</h2>

    </div>

    <div class="Card-Box" dir="rtl">
      <div class="container" style="text-align: center;">
        <h3>ما هي الجامعات الدولية المصرية؟</h3>
        <p>هي جامعات . وعددهم 0 جامعة</p>
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

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '../../../../public/global/headerComponent.vue';
import FooterComponent from '../../../../public/global/footerComponent.vue';

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
                    name: 'جامعة جزيرة الأمير إدوارد',
                    imgSrc: '/images/Logos/Universites/international/O6U.png',
                    link: '/guide/UGRAD/international/O6U'
                },
                {
                    id: 2,
                    name: 'جامعة رايرسون',
                    imgSrc: '/images/Logos/Universites/international/MSA.png',
                    link: '/guide/UGRAD/international/MSA'
                },
                {
                    id: 3,
                    name: 'جامعة كوفنتري البريطانية',
                    imgSrc: '/images/Logos/Universites/international/MUST.png',
                    link: '/guide/UGRAD/international/MUST'
                },
                {
                    id: 4,
                    ame: 'جامعة نوفا البرتغالية',
                    imgSrc: '/images/Logos/Universites/international/MIU.png',
                    link: '/guide/UGRAD/international/MIU'
                },
                {
                    id: 5,
                    ame: 'جامعة هيرتفوردشاير البريطانية',
                    imgSrc: '/images/Logos/Universites/international/MIU.png',
                    link: '/guide/UGRAD/international/MIU'
                },
                {
                    id: 6,
                    ame: 'جامعة ايست لندن',
                    imgSrc: '/images/Logos/Universites/international/MIU.png',
                    link: '/guide/UGRAD/international/MIU'
                },
                {
                    id: 7,
                    ame: 'جامعة وسط لانكشاير',
                    imgSrc: '/images/Logos/Universites/international/MIU.png',
                    link: '/guide/UGRAD/international/MIU'
                },
                {
                    id: 8,
                    ame: 'جامعة كازان الروسية',
                    imgSrc: '/images/Logos/Universites/international/MIU.png',
                    link: '/guide/UGRAD/international/MIU'
                },
                {
                    id: 9,
                    ame: 'جامعة سان بطرسبرج الروسية',
                    imgSrc: '/images/Logos/Universites/international/MIU.png',
                    link: '/guide/UGRAD/international/MIU'
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