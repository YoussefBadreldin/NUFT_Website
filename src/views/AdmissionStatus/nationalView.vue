<template>
    <HeaderComponent />
    <div>
        
        <div class="page-nav row">
            <h2>National Universities Admissions Status</h2>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="/AdmissionStatus"><i class="fas fa-chevron-right"></i> Universities Admissions Status</a>
                </li>
                <li><i class="fas fa-chevron-right"></i> <a href="/AdmissionStatus/UGRAD">Undergraduate</a></li>
                <li><a href="/AdmissionStatus/UGRAD/National"><i class="fas fa-chevron-right"></i> National
                        Universities</a></li>
            </ul>
        </div>

        <div class="subscribe-header">
            <i id="subscribe-header-bell" class="fa fa-bell notification-bell" @click="toggleSubscribeAll"></i>
            <span>Subscribe for changes notifications</span>
        </div>

        <section>
            <div class="table-responsive">
                <table class="Stat">
                    <thead>
                        <tr>
                            <th rowspan="2">University</th>
                            <th rowspan="2">Transfer</th>
                            <th colspan="2">Thanwyaa Amaa</th>
                            <th colspan="2">Arab, English & Azhari Certificates</th>
                            <th colspan="2">Stem & Nile Certificates</th>
                            <th rowspan="2">International Students</th>
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
                                <i class="fa fa-bell notification-bell" :class="{ active: university.isSubscribed }"
                                    @click="toggleSubscription(university)"></i>
                            </td>
                            <td :style="{ color: getColor(university.transfer) }">{{ university.statusTransfer}}</td>
                            <td :style="{ color: getColor(university.thanwyaaAmaaStatus_first) }">{{ university.thanwyaaAmaaStatus_first
                                }}</td>
                            <td :style="{ color: getColor(university.thanwyaaAmaaStatus_second) }">{{ university.thanwyaaAmaaStatus_second
                                }}</td>
                            <td :style="{ color: getColor(university.ArabEnglishAzhariCertificates_first) }">{{
                                university.ArabEnglishAzhariCertificates_first}}</td>
                            <td :style="{ color: getColor(university.ArabEnglishAzhariCertificates_second) }">{{
                                university.ArabEnglishAzhariCertificates_second}}</td>
                            <td :style="{ color: getColor(university.StemNileCertificates_first) }">{{
                                university.StemNileCertificates_first }}</td>
                            <td :style="{ color: getColor(university.StemNileCertificates_second) }">{{
                                university.StemNileCertificates_second}}</td>
                            <td :style="{ color: getColor(university.internationalStudents) }">{{
                                university.InternationalStudents}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style="text-align: center;"><br>● The Admission Status will be updated frequently.</p>
        </section>
    </div>
    <smart-assistant />
    <footer-component />
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import SmartAssistant from '../../../public/global/smartAssistant.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
export default {
    name: 'NationalUniversitiesAdmissionsStatus',
    data() {
        return {
            components: {
                HeaderComponent,
                SmartAssistant,
                FooterComponent,
            },
            firstYear: '',
            secondYear: '',
            universities: [
                // {
                //     name: 'French University in Egypt',
                //     transfer: 'Not Started',
                //     thanwyaaAmaa2023: 'Not Started',
                //     thanwyaaAmaa2024: 'Not Started',
                //     arabEnglishAzhariCertificates2023: 'Not Started',
                //     arabEnglishAzhariCertificates2024: 'Not Started',
                //     stemNileCertificates2023: 'Not Started',
                //     stemNileCertificates2024: 'Not Started',
                //     internationalStudents: 'Not Started',
                //     isSubscribed: false
                // },
                // {
                //     name: 'Nile University',
                //     transfer: 'Avilable',
                //     thanwyaaAmaa2023: 'Avilable',
                //     thanwyaaAmaa2024: 'Avilable',
                //     arabEnglishAzhariCertificates2023: 'Avilable',
                //     arabEnglishAzhariCertificates2024: 'Avilable',
                //     stemNileCertificates2023: 'Avilable',
                //     stemNileCertificates2024: 'Avilable',
                //     internationalStudents: 'Avilable',
                //     isSubscribed: false
                // },
                // {
                //     name: 'Egyptian E-Learning University',
                //     transfer: 'Ended',
                //     thanwyaaAmaa2023: 'Ended',
                //     thanwyaaAmaa2024: 'Ended',
                //     arabEnglishAzhariCertificates2023: 'Ended',
                //     arabEnglishAzhariCertificates2024: 'Ended',
                //     stemNileCertificates2023: 'Ended',
                //     stemNileCertificates2024: 'Ended',
                //     internationalStudents: 'Ended',
                //     isSubscribed: false
                // },
                // {
                //     name: 'Ain Shams National University',
                //     transfer: 'Under Construction',
                //     thanwyaaAmaa2023: 'Under Construction',
                //     thanwyaaAmaa2024: 'Under Construction',
                //     arabEnglishAzhariCertificates2023: 'Under Construction',
                //     arabEnglishAzhariCertificates2024: 'Under Construction',
                //     stemNileCertificates2023: 'Under Construction',
                //     stemNileCertificates2024: 'Under Construction',
                //     internationalStudents: 'Under Construction',
                //     isSubscribed: false
                // }
            ],
            all_data: [],
        }
    },
    methods: {
        toggleSubscription(university) {
            university.isSubscribed = !university.isSubscribed;
            // In a real application, you would send a request to your backend to handle subscription logic
            if (university.isSubscribed) {
                alert(`Subscribed to notifications for ${university.name}`);
            } else {
                alert(`Unsubscribed from notifications for ${university.name}`);
            }
        },
        toggleSubscribeAll() {
            this.universities.forEach(university => {
                university.isSubscribed = !university.isSubscribed;
            });
            // In a real application, you would send a request to your backend to handle subscription logic for all universities
            if (this.universities[0].isSubscribed) {
                alert(`Subscribed to notifications for all universities`);
            } else {
                alert(`Unsubscribed from notifications for all universities`);
            }
        },
        getColor(status) {
            switch (status) {
                case 'Ended':
                    return 'red';
                case 'Avilable':
                    return 'green';
                case 'Not Started':
                    return 'brown';
                case 'Under Construction':
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