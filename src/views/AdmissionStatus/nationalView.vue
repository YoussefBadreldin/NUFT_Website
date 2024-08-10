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
                                <td>
                                    {{ university.faclityName }}
                                </td>
                                <td :style="{ color: getColor(university.statusTransfer) }">{{ university.statusTransfer }}</td>
                                <td :style="{ color: getColor(university.thanwyaaAmaaStatus_first) }">{{ university.thanwyaaAmaaStatus_first }}</td>
                                 <td :style="{ color: getColor(university.thanwyaaAmaaStatus_second) }">{{ university.thanwyaaAmaaStatus_second }}</td>
                                  <td :style="{ color: getColor(university.ArabEnglishAzhariCertificates_first) }">{{ university.ArabEnglishAzhariCertificates_first }}</td>
                                  <td :style="{ color: getColor(university.ArabEnglishAzhariCertificates_second) }">{{ university.ArabEnglishAzhariCertificates_second }}</td>
                                   <td :style="{ color: getColor(university.StemNileCertificates_first) }">{{ university.StemNileCertificates_first }}</td>    
                                <td :style="{ color: getColor(university.StemNileCertificates_second) }">{{ university.StemNileCertificates_second }}</td>
                                <td :style="{ color: getColor(university.InternationalStudents) }">{{ university.InternationalStudents }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style="text-align: center;"><br>يتم تحديث حالة الجامعات بشكل دوري●</p>
            </section>
        </div>

        <FooterComponent />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name: 'NationalUniversitiesAdmissionsStatus',
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
        return {
            firstYear: '',
            secondYear: '',
            universities: [
            ],
            all_data: [],
        }
    },
    methods: {
        getColor(status) {
            switch (status) {
                case 'انتهي (كل الكليات)':
                    return 'red';
                case 'متاح (كل الكليات)':
                    return 'green';
                case 'لم يبدأ (كل الكليات)':
                    return 'brown';
                case 'تحت الإنشاء':
                    return 'purple';
                default:
                    return 'inherit';
            }
        },
        getAdmission(){
            axios.get('https://nuft-website-backend-874bbf91403c.herokuapp.com/admission/get').then(response=>{
                this.universities = response.data;
            }).catch(error=>{
                console.log(error);
            })
        },
        getYears(){
            axios.get('https://nuft-website-backend-874bbf91403c.herokuapp.com/links/get_links').then(response=>{
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
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>