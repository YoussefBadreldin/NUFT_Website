<template>
  <div>
    <HeaderComponent />

<div class="page-nav row">
        <h2>الجامعات التي تحتوي علي كليات معينة</h2>

    </div>

    <div class="Card-Box" dir="rtl">

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
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

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
            name: 'كلية الطب البشري',
            imgSrc: '/images/Logos/Faculties/MED.png',
            link: '/SmartAssistant/Faculties/MED'
        },
        {
    id: 2,
    name: 'كلية طب الأسنان',
    imgSrc: '/images/Logos/Faculties/DENT.png',
    link: '/SmartAssistant/Faculties/DENT'
},
{
    id: 3,
    name: 'كلية العلاج الطبيعي',
    imgSrc: '/images/Logos/Faculties/PT.png',
    link: '/SmartAssistant/Faculties/PT'
},
{
    id: 4,
    name: 'كلية الصيدلة',
    imgSrc: '/images/Logos/Faculties/PHARM.png',
    link: '/SmartAssistant/Faculties/PHARM'
},
{
    id: 5,
    name: 'كلية الهندسة',
    imgSrc: '/images/Logos/Faculties/ENG.png',
    link: '/SmartAssistant/Faculties/ENG'
},
{
    id: 6,
    name: 'كلية الطب البيطري',
    imgSrc: '/images/Logos/Faculties/VET.png',
    link: '/SmartAssistant/Faculties/VET'
},
{
    id: 7,
    name: 'كلية علوم الحاسب',
    imgSrc: '/images/Logos/Faculties/CS.png',
    link: '/SmartAssistant/Faculties/CS'
},
{
    id: 8,
    name: 'كلية التمريض',
    imgSrc: '/images/Logos/Faculties/NURS.png',
    link: '/SmartAssistant/Faculties/NURS'
},
{
    id: 9,
    name: 'كلية تكنولوجيا العلوم الصحية',
    imgSrc: '/images/Logos/Faculties/HS.png',
    link: '/SmartAssistant/Faculties/HS'
},
{
    id: 10,
    name: 'كلية الفنون',
    imgSrc: '/images/Logos/Faculties/ART.png',
    link: '/SmartAssistant/Faculties/ART'
},
{
    id: 11,
    name: 'كلية الإعلام',
    imgSrc: '/images/Logos/Faculties/MEDIA.png',
    link: '/SmartAssistant/Faculties/MEDIA'
},
{
    id: 12,
    name: 'كلية الآثار',
    imgSrc: '/images/Logos/Faculties/ARCH.png',
    link: '/SmartAssistant/Faculties/ARCH'
},
{
    id: 13,
    name: 'كلية الحقوق',
    imgSrc: '/images/Logos/Faculties/LAW.png',
    link: '/SmartAssistant/Faculties/LAW'
},
{
    id: 14,
    name: 'كلية السياحة',
    imgSrc: '/images/Logos/Faculties/TOUR.png',
    link: '/SmartAssistant/Faculties/TOUR'
},
{
    id: 15,
    name: 'كلية الاقتصاد والإدارة',
    imgSrc: '/images/Logos/Faculties/ECON.png',
    link: '/SmartAssistant/Faculties/ECON'
},
{
    id: 16,
    name: 'كلية العلوم السينمائية',
    imgSrc: '/images/Logos/Faculties/CINE.png',
    link: '/SmartAssistant/Faculties/CINE'
},
{
    id: 17,
    name: 'كلية العلوم الأساسية',
    imgSrc: '/images/Logos/Faculties/SCI.png',
    link: '/SmartAssistant/Faculties/SCI'
},
{
    id: 18,
    name: 'كلية التكنولوجيا الحيوية',
    imgSrc: '/images/Logos/Faculties/BIOTECH.png',
    link: '/SmartAssistant/Faculties/BIOTECH'
},
{
    id: 19,
    name: 'كلية التربية',
    imgSrc: '/images/Logos/Faculties/EDU.png',
    link: '/SmartAssistant/Faculties/EDU'
},
{
    id: 20,
    name: 'كلية اللغات والترجمة',
    imgSrc: '/images/Logos/Faculties/LANG.png',
    link: '/SmartAssistant/Faculties/LANG'
},
{
    id: 21,
    name: 'كلية العلوم الاجتماعية',
    imgSrc: '/images/Logos/Faculties/SOCSCI.png',
    link: '/SmartAssistant/Faculties/SOCSCI'
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