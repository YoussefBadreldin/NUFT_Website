<template>
    <div>
        <HeaderComponent />

        <div>
            <div class="page-nav row">
                <h2>حالة تقديمات الجامعات الاهلية</h2>
            </div>

            <section>
                <div class="table-responsive" dir="rtl">
                    <table class="Stat">
                        <thead>
                            <tr>
                                <th rowspan="2">الجامعة</th>
                                <th rowspan="2">التحويل</th>
                                <th colspan="2">الثانوية العامة</th>
                                <th colspan="2">الشهادات العربية والإنجليزية والأزهرية</th>
                                <th colspan="2">شهادات ستيم والنيل</th>
                                <th rowspan="2">الوافدين</th>
                            </tr>
                            <tr>
                                <th>{{ firstYear }}</th>
                                <th>{{ secondYear }}</th>
                                <th>{{ firstYear }}</th>
                                <th>{{ secondYear }}</th>
                                <th>{{ firstYear }}</th>
                                <th>{{ secondYear }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="university in universities" :key="university.name">
                                <td :style="{ color: getColor(university.transfer) }">{{ university.statusTransfer }}</td>
                                <td :style="{ color: getColor(university.thanwyaaAmaaStatus_first) }">{{ university.thanwyaaAmaaStatus_first }}</td>
                                 <td :style="{ color: getColor(university.thanwyaaAmaaStatus_second) }">{{ university.thanwyaaAmaaStatus_second }}</td>
                                  <td :style="{ color: getColor(university.ArabEnglishAzhariCertificates_first) }">{{ university.ArabEnglishAzhariCertificates_first }}</td>
                                  <td :style="{ color: getColor(university.ArabEnglishAzhariCertificates_second) }">{{ university.ArabEnglishAzhariCertificates_second }}</td>
                                   <td :style="{ color: getColor(university.StemNileCertificates_first) }">{{ university.StemNileCertificates_first }}</td>    
                                <td :style="{ color: getColor(university.StemNileCertificates_second) }">{{ university.StemNileCertificates_second }}</td>
                                  <td :style="{ color: getColor(university.internationalStudents) }">{{ university.InternationalStudents }}</td>
                                <td>
                                    {{ university.faclityName }}
                                    <i class="fa fa-bell notification-bell" :class="{ active: university.isSubscribed }"
                                        @click="toggleSubscription(university)"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style="text-align: center;"><br>يتم تحديث حالة الجامعات بشكل دوري●</p>
            </section>
        </div>

        <SmartAssistant />
        <FooterComponent />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import SmartAssistant from '../../../public/global/smartAssistant.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name: 'NationalUniversitiesAdmissionsStatus',
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent,
    },
    data() {
        return {
            firstYear: '',
            secondYear: '',
            universities: [
                // Uncomment and update these with actual data as needed
                /*
                {
                    name: 'الجامعة الفرنسية في مصر',
                    transfer: 'لم يبدأ',
                    thanwyaaAmaaStatus_first: 'لم يبدأ',
                    thanwyaaAmaaStatus_second: 'لم يبدأ',
                    ArabEnglishAzhariCertificates_first: 'لم يبدأ',
                    ArabEnglishAzhariCertificates_second: 'لم يبدأ',
                    StemNileCertificates_first: 'لم يبدأ',
                    StemNileCertificates_second: 'لم يبدأ',
                    InternationalStudents: 'لم يبدأ',
                    isSubscribed: false
                },
                {
                    name: 'جامعة النيل',
                    transfer: 'متاح',
                    thanwyaaAmaaStatus_first: 'متاح',
                    thanwyaaAmaaStatus_second: 'متاح',
                    ArabEnglishAzhariCertificates_first: 'متاح',
                    ArabEnglishAzhariCertificates_second: 'متاح',
                    StemNileCertificates_first: 'متاح',
                    StemNileCertificates_second: 'متاح',
                    InternationalStudents: 'متاح',
                    isSubscribed: false
                },
                {
                    name: 'الجامعة المصرية للتعلم الإلكتروني',
                    transfer: 'انتهى',
                    thanwyaaAmaaStatus_first: 'انتهى',
                    thanwyaaAmaaStatus_second: 'انتهى',
                    ArabEnglishAzhariCertificates_first: 'انتهى',
                    ArabEnglishAzhariCertificates_second: 'انتهى',
                    StemNileCertificates_first: 'انتهى',
                    StemNileCertificates_second: 'انتهى',
                    InternationalStudents: 'انتهى',
                    isSubscribed: false
                },
                {
                    name: 'جامعة عين شمس الوطنية',
                    transfer: 'تحت الإنشاء',
                    thanwyaaAmaaStatus_first: 'تحت الإنشاء',
                    thanwyaaAmaaStatus_second: 'تحت الإنشاء',
                    ArabEnglishAzhariCertificates_first: 'تحت الإنشاء',
                    ArabEnglishAzhariCertificates_second: 'تحت الإنشاء',
                    StemNileCertificates_first: 'تحت الإنشاء',
                    StemNileCertificates_second: 'تحت الإنشاء',
                    InternationalStudents: 'تحت الإنشاء',
                    isSubscribed: false
                }
                */
            ],
            all_data: [],
        }
    },
    methods: {
        toggleSubscription(university) {
            university.isSubscribed = !university.isSubscribed;
            // In a real application, you would send a request to your backend to handle subscription logic
            if (university.isSubscribed) {
                alert(`تم الاشتراك في إشعارات ${university.name}`);
            } else {
                alert(`تم إلغاء الاشتراك من إشعارات ${university.name}`);
            }
        },
        toggleSubscribeAll() {
            this.universities.forEach(university => {
                university.isSubscribed = !university.isSubscribed;
            });
            // In a real application, you would send a request to your backend to handle subscription logic for all universities
            if (this.universities[0].isSubscribed) {
                alert(`تم الاشتراك في إشعارات جميع الجامعات`);
            } else {
                alert(`تم إلغاء الاشتراك من إشعارات جميع الجامعات`);
            }
        },
        getColor(status) {
            switch (status) {
                case 'انتهى':
                    return 'red';
                case 'متاح':
                    return 'green';
                case 'لم يبدأ':
                    return 'brown';
                case 'تحت الإنشاء':
                    return 'purple';
                default:
                    return 'inherit';
            }
        },
        getAdmission(){
            axios.get('https://nuft-backend.onrender.com/admission/get').then(response=>{
                this.universities = response.data;
            }).catch(error=>{
                console.log(error);
            })
        },
        getYears(){
            axios.get('https://nuft-backend.onrender.com/links/get_links').then(response=>{
                this.all_data = response.data;
                this.firstYear = this.all_data[0].first_year;
                this.secondYear = this.all_data[0].second_year;
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    created(){
        this.getAdmission();
        this.getYears();
        console.log(this.firstYear);
        console.log(this.all_data);
    }
}
</script>

<style scoped>
/* Add your scoped CSS styles here */
</style>
