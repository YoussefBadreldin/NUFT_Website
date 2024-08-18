<template>
  <div>
    <HeaderComponent />

<div class="page-nav row">
        <h2>دليل افرع الجامعات الاجنبية</h2>

    </div>

    <div class="Card-Box" dir="rtl">
      <div class="container" style="text-align: center;">
        <h3>ما هي الجامعات الدولية المصرية؟</h3>
        <p>هي جامعات . وعددهم 9 جامعات</p>
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
    name: 'جامعة ايست لندن',
    imgSrc: '/images/Logos/Universites/International/UEL.png',
    link: '/Guide/UGRAD/International/UEL'
},
{
    id: 2,
    name: 'جامعة جزيرة الأمير إدوارد',
    imgSrc: '/images/Logos/Universites/International/UPEI.png',
    link: '/Guide/UGRAD/International/UPEI'
},
{
    id: 3,
    name: 'جامعة كازان الفيدرالية الروسية',
    imgSrc: '/images/Logos/Universites/International/KPFU.png',
    link: '/Guide/UGRAD/International/KPFU'
},
{
    id: 4,
    name: 'جامعة كوفنتري البريطانية',
    imgSrc: '/images/Logos/Universites/International/COVENTRY.png',
    link: '/Guide/UGRAD/International/Coventry'
},
{
    id: 5,
    name: 'جامعة نوفا ليشبونا البرتغالية',
    imgSrc: '/images/Logos/Universites/International/NOVA.png',
    link: '/Guide/UGRAD/International/NOVA'
},
{
    id: 6,
    name: 'جامعة سان بطرسبرج الروسية',
    imgSrc: '/images/Logos/Universites/International/SPBU.png',
    link: '/Guide/UGRAD/International/SPBU'
},
{
    id: 7,
    name: 'جامعة هيرتفوردشاير البريطانية',
    imgSrc: '/images/Logos/Universites/International/UH.png',
    link: '/Guide/UGRAD/International/UH'
},
{
    id: 8,
    name: 'جامعة وسط لانكشاير',
    imgSrc: '/images/Logos/Universites/International/UCLan.png',
    link: '/Guide/UGRAD/International/UCLAN'
},
{
    id: 9,
    name: 'جامعة رايرسون (جامعة تورنتو متروبوليتان)',
    imgSrc: '/images/Logos/Universites/International/TMU.png',
    link: '/Guide/UGRAD/International/TMU'
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