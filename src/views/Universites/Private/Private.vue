<template>
  <div>
    <HeaderComponent />

    <div class="Card-Box" dir="rtl">
      <div class="container" style="text-align: center;">
        <h3>ما هي الجامعات الخاصة المصرية؟</h3>
        <p>توجد في مصر 36 جامعة خاصة.</p>
        <br><br>
        <h2>الجامعات الخاصة</h2>
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
                    name: 'جامعة 6 اكتوبر',
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
                },
                {
                    id: 5,
                    name: 'الجامعة الألمانية بالقاهرة',
                    imgSrc: '/images/Logos/Universites/Private/GUC.png',
                    link: '/guide/UGRAD/private/GUC'
                },
                {
                    id: 6,
                    name: 'جامعة الأهرام الكندية',
                    imgSrc: '/images/Logos/Universites/Private/ACU.png',
                    link: '/guide/UGRAD/private/ACU'
                },
                {
                    id: 7,
                    name: 'الجامعة البريطانية في مصر',
                    imgSrc: '/images/Logos/Universites/Private/BUE.png',
                    link: '/guide/UGRAD/private/BUE'
                },
                {
                    id: 8,
                    name: 'الجامعة الحديثة للتكنولوجيا والمعلومات',
                    imgSrc: '/images/Logos/Universites/Private/MTI.png',
                    link: '/guide/UGRAD/private/MTI'
                },
                {
                    id: 9,
                    name: 'جامعة سيناء',
                    imgSrc: '/images/Logos/Universites/Private/SU.png',
                    link: '/guide/UGRAD/private/SU'
                },
                {
                    id: 10,
                    name: 'جامعة فاروس بالإسكندرية',
                    imgSrc: '/images/Logos/Universites/Private/PUA.png',
                    link: '/guide/UGRAD/private/PUA'
                },
                {
                    id: 11,
                    name: 'جامعة المستقبل',
                    imgSrc: '/images/Logos/Universites/Private/FUE.png',
                    link: '/guide/UGRAD/private/FUE'
                },
                {
                    id: 12,
                    name: 'الجامعة المصرية الروسية',
                    imgSrc: '/images/Logos/Universites/Private/ERU.png',
                    link: '/guide/UGRAD/private/ERU'
                },
                {
                    id: 13,
                    name: 'جامعة النهضة ببني سويف',
                    imgSrc: '/images/Logos/Universites/Private/NUB.png',
                    link: '/guide/UGRAD/private/NUB'
                },
                {
                    id: 14,
                    name: 'جامعة الدلتا للعلوم والتكنولوجيا',
                    imgSrc: '/images/Logos/Universites/Private/DU.png',
                    link: '/guide/UGRAD/private/DU'
                },
                {
                    id: 15,
                    name: 'جامعة هيليوبليس',
                    imgSrc: '/images/Logos/Universites/Private/HU.png',
                    link: '/guide/UGRAD/private/HU'
                },
                {
                    id: 16,
                    name: 'جامعة دراية',
                    imgSrc: '/images/Logos/Universites/Private/DerayaU.png',
                    link: '/guide/UGRAD/private/DerayaU'
                },
                {
                    id: 17,
                    name: 'جامعة الجيزة الجديدة',
                    imgSrc: '/images/Logos/Universites/Private/NGU.png',
                    link: '/guide/UGRAD/private/NGU'
                },
                {
                    id: 18,
                    name: 'جامعة بدر بالقاهرة',
                    imgSrc: '/images/Logos/Universites/Private/BUC.png',
                    link: '/guide/UGRAD/private/BUC'
                },
                {
                    id: 19,
                    name: 'الجامعة المصرية الصينية',
                    imgSrc: '/images/Logos/Universites/Private/ECU.png',
                    link: '/guide/UGRAD/private/ECU'
                },
                {
                    id: 20,
                    name: 'جامعة حورس',
                    imgSrc: '/images/Logos/Universites/Private/HUE.png',
                    link: '/guide/UGRAD/private/HUE'
                },
                {
                    id: 21,
                    name: 'جامعة ميرت',
                    imgSrc: '/images/Logos/Universites/Private/MUE.png',
                    link: '/guide/UGRAD/private/MUE'
                },
                {
                    id: 22,
                    name: 'جامعة السلام',
                    imgSrc: '/images/Logos/Universites/Private/ASU.png',
                    link: '/guide/UGRAD/private/ASU'
                },
                {
                    id: 23,
                    name: 'جامعة سفنكس',
                    imgSrc: '/images/Logos/Universites/Private/SphinxU.png',
                    link: '/guide/UGRAD/private/SphinxU'
                },
                {
                    id: 24,
                    name: 'جامعة مايو بالقاهرة',
                    imgSrc: '/images/Logos/Universites/Private/MUC.png',
                    link: '/guide/UGRAD/private/MUC'
                },
                {
                    id: 25,
                    name: 'جامعة الحياة بالقاهرة',
                    imgSrc: '/images/Logos/Universites/Private/AHUC.png',
                    link: '/guide/UGRAD/private/AHUC'
                },
                {
                    id: 26,
                    name: 'جامعة الصالحية الجديدة',
                    imgSrc: '/images/Logos/Universites/Private/SGU.png',
                    link: '/guide/UGRAD/private/SGU'
                },
                {
                    id: 27,
                    name: 'جامعة بدر بأسيوط',
                    imgSrc: '/images/Logos/Universites/Private/BUA.png',
                    link: '/guide/UGRAD/private/BUA'
                },
                {
                    id: 28,
                    name: 'جامعة الريادة للعلوم والتكنولوجيا',
                    imgSrc: '/images/Logos/Universites/Private/RST.png',
                    link: '/guide/UGRAD/private/RST'
                },
                {
                    id: 29,
                    name: 'جامعة المدينة بالقاهرة',
                    imgSrc: '/images/Logos/Universites/Private/CUC.png',
                    link: '/guide/UGRAD/private/CUC'
                },
                {
                    id: 30,
                    name: 'جامعة السويدي للتكنولوجيا',
                    imgSrc: '/images/Logos/Universites/Private/SUT.png',
                    link: '/guide/UGRAD/private/SUT'
                },
                {
                    id: 31,
                    name: 'جامعة الابتكار',
                    imgSrc: '/images/Logos/Universites/Private/IU.png',
                    link: '/guide/UGRAD/private/IU'
                },
                {
                    id: 32,
                    name: 'جامعة رشيد',
                    imgSrc: '/images/Logos/Universites/Private/RU.png',
                    link: '/guide/UGRAD/private/RU'
                },
                {
                    id: 33,
                    name: 'جامعة باديا',
                    imgSrc: '/images/Logos/Universites/Private/BADYA.png',
                    link: '/guide/UGRAD/private/BADYA'
                },
                {
                    id: 34,
                    name: 'جامعة وادي النيل',
                    imgSrc: '/images/Logos/Universites/Private/NVU.png',
                    link: '/guide/UGRAD/private/NVU'
                },
                {
                    id: 35,
                    name: 'جامعة القاهرة ساكسوني للعلوم التطبيقية والتكنولوجيا',
                    imgSrc: '/images/Logos/Universites/Private/SEU.png',
                    link: '/guide/UGRAD/private/SEU'
                },
                {
                    id: 36,
                    name: 'جامعة اللوتس',
                    imgSrc: '/images/Logos/Universites/Private/LUM.png',
                    link: '/guide/UGRAD/private/LUM'
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