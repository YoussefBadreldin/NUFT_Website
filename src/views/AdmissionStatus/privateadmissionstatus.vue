<template>
    <div>
        <HeaderComponent />

        <div>
            <div class="page-nav row">
                <h2>حالة تقديمات الجامعات الاهلية</h2>
            </div>

            <section>
                <div class="table-wrapper" dir="rtl">
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
                                    <a :href="university.url" target="">{{ university.faclityName }}</a>
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
                <p style="text-align: center;"><br>يتم تحديث حالة تقديم الجامعات بشكل دوري●</p>
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
    name: 'privateUniversitiesAdmissionsStatus',
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
        return {
            firstYear: '',
            secondYear: '',
            universities: [],
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
            axios.get('https://nuft-website-backend-874bbf91403c.herokuapp.com/privateadmission/get')
                .then(response => {
                    this.universities = response.data.map(university => ({
                        ...university,
                        url: university.url || '#', // Use the URL from the API, or default to '#' if not available
                    }));
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getYears(){
            axios.get('https://nuft-website-backend-874bbf91403c.herokuapp.com/privatelinks/get_privatelinks')
                .then(response => {
                    this.all_data = response.data;
                    this.firstYear = this.all_data[0].first_year;
                    this.secondYear = this.all_data[0].second_year;
                })
                .catch(error => {
                    console.log(error);
                });
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

/* General Styles for Table */
.table-wrapper {
    overflow: auto; /* Allows both horizontal and vertical scrolling */
    max-height: 500px; /* Adjust this value as needed for your design */
    width: 100%;
    /* Custom Scrollbar Styles */
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: #888 #f1f1f1; /* For Firefox */
}

.table-wrapper::-webkit-scrollbar {
    width: 8px; /* Width for vertical scrollbar */
    height: 8px; /* Height for horizontal scrollbar */
}

.table-wrapper::-webkit-scrollbar-track {
    background: #f1f1f1; /* Background of the scrollbar track */
}

.table-wrapper::-webkit-scrollbar-thumb {
    background: #888; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Optional: Adds rounded corners to the scrollbar thumb */
}

table.Stat {
    border-collapse: collapse;
    min-width: 100%; /* Ensure table is wide enough for horizontal scrolling */
}

/* Sticky Header */
table.Stat thead {
    position: sticky;
    top: 0;
    background-color: #fff; /* Adjust for visibility against table rows */
    z-index: 10; /* Ensure header stays above other content */
}

table.Stat th, table.Stat td {
    padding: 8px;
    border: 1px solid #ddd; /* Optional: Adds a border around cells */
    text-align: center; /* Center-aligns text in cells */
}

/* Mobile Specific Styles */
@media (max-width: 768px) {
    table.Stat {
        font-size: 14px; /* Adjust font size for better readability */
    }
    
    table.Stat th, table.Stat td {
        padding: 12px; /* Increase padding for touch accessibility */
    }
}
</style>
