<template>
    <div>
        <!-- Your existing template code here -->
        <HeaderComponent />
        <!-- ######## Faculties ####### -->
        <section>
            <h2>Faculties</h2>
            <div class="table-responsive">
                <div class="view_location">
                    <!-- <img src="../../../images/Logos/Universites/National/AIU.png" alt=""> -->
                    <a id="locationLink" :href="location" target="_blank">
                        <button>View Location</button>
                    </a>
                </div>
                <table style="margin-top:30vh;">
                    <thead>
                        <tr>
                            <th rowspan="2">Faculty</th>
                            <th rowspan="2">Programs</th>
                            <th rowspan="2">Fees for Egyptians</th>
                            <th rowspan="2">Fees for Natives</th>
                            <th rowspan="2">Section</th>
                            <th colspan="2">Minimum Score Needed for Thanwyaa Amaa</th>
                            <th colspan="2">Minimum Score Needed for Arab, English & Azhari Certificates</th>
                            <th colspan="2">Minimum Score Needed for Stem & Nile Certificates</th>
                            <th rowspan="2">Minimum Score Needed for Natives</th>
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
                        <tr v-for="(faculty, index) in filteredData" :key="index">
                            <td>{{ faculty.facilities }}</td>
                            <td>{{ faculty.programs }}</td>
                            <td>{{ faculty.feesEgyption }}</td>
                            <td>{{ faculty.feesNatives }}</td>
                            <td>{{ faculty.section }}</td>
                            <td>{{ faculty.scoreFirst }}</td>
                            <td>{{ faculty.scoreSecond }}</td>
                            <td>{{ faculty.scorefirstAzhar }}</td>
                            <td>{{ faculty.scoreYearsecondAzhar }}</td>
                            <td>{{ faculty.scorefirstStem }}</td>
                            <td>{{ faculty.scoreYearsecondStem }}</td>
                            <td>{{ faculty.minimumForNatives }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                ● The mentioned fees do not include application fees (if any), administrative expenses (if any),
                transaction insurance (if any), educational services fees (if any), accommodation and transportation
                expenses (if any).
            </p>
        </section>

        <!-- ######## International Programs ####### -->
        <section>
            <h2>International Programs</h2>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th rowspan="2">Faculty</th>
                            <th rowspan="2">Programs</th>
                            <th rowspan="2">Fees for Egyptians</th>
                            <th rowspan="2">Fees for Natives</th>
                            <th rowspan="2">Section</th>
                            <th colspan="2">Minimum Score Needed for Thanwyaa Amaa</th>
                            <th colspan="2">Minimum Score Needed for Arab, English & Azhari Certificates</th>
                            <th colspan="2">Minimum Score Needed for Stem & Nile Certificates</th>
                            <th rowspan="2">Minimum Score Needed for Natives</th>
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
                        <tr v-for="(faculty, index) in filteredInternational" :key="index">
                            <td>{{ faculty.facilities }}</td>
                            <td>{{ faculty.programs }}</td>
                            <td>{{ faculty.feesEgyption }}</td>
                            <td>{{ faculty.feesNatives }}</td>
                            <td>{{ faculty.section }}</td>
                            <td>{{ faculty.scoreFirst }}</td>
                            <td>{{ faculty.scoreSecond }}</td>
                            <td>{{ faculty.scorefirstAzhar }}</td>
                            <td>{{ faculty.scoreYearsecondAzhar }}</td>
                            <td>{{ faculty.scorefirstStem }}</td>
                            <td>{{ faculty.scoreYearsecondStem }}</td>
                            <td>{{ faculty.minimumForNatives }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                ● The mentioned fees do not include application fees (if any), administrative expenses (if any),
                transaction insurance (if any), educational services fees (if any), accommodation and transportation
                expenses (if any).
            </p>
            <a :href="details_about_internationa_program" target="_blank">
                <button>More Details about International Programs</button>
            </a>
        </section>
        <section>
            <h2>Dormitories</h2>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dorm, index) in filteredDorms" :key="index">
                            <td>{{ dorm.type }}</td>
                            <td>{{ dorm.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <a :href="register_link_dorms" target="_blank"><button>Register Link</button></a>
        </section>
        <section>
            <h2>Transportation</h2>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dorm, index) in filteredTrans" :key="index">
                            <td>{{ dorm.type }}</td>
                            <td>{{ dorm.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <a :href="register_link_dorms" target="_blank"><button>Register Link</button></a>
        </section>
        <section>
            <h1>Sholarships</h1>
            <p>Sholarships Details</p>
            <a :href="register_link_transportation" target="_blank"><button>More Details About Scolarships</button></a>
        </section>
        <section>
            <a :href="Admission_link_egyption" target="_blank"><button>Admission Link for Egyptian Students</button></a>
            <a :href="international_program_link" target="_blank"><button>Admission Link for Egyptian Students
                    (International Programs)</button></a>
            <a :href="Admission_link_natives" target="_blank"><button>Admission Link for Native Students</button></a>
            <a :href="transfer_link_egyption" target="_blank"><button>Transfer Link for Egyptian Students</button></a>
        </section>
        <FooterComponent />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name: 'galalaUniversity',
    data() {
        return {
            all_data: [],
            filteredData: [],
            filteredInternational: [],
            links: [],
            filteredLinks: [],
            firstYear: '',
            secondYear: '',
            location: '',
            details_about_internationa_program: '',
            register_link_dorms: '',
            register_link_transportation: '',
            international_program_link: '',
            register_link: '',
            transfer_link_egyption: '',
            Admission_link_natives: '',
            Admission_link_egyption: '',
            scholarship_datils: '',
            dorms: [],
            filteredDorms: [],
            trans: [],
            filteredTrans: [],
        };
    },
    components: {
        HeaderComponent,
        FooterComponent
    },
    methods: {
        async get_data() {
            try {
                const response = await axios.get('https://nuft-backend.onrender.com/faclity/getInternational');
                console.log('API response data:', response.data);
                if (response.data && Array.isArray(response.data.facilities)) {
                    this.all_data = response.data.facilities;
                } else {
                    console.error('API response does not contain an array:', response.data);
                }
                if (Array.isArray(this.all_data)) {
                    console.log('All data:', this.all_data);
                    this.filteredData = this.all_data.filter(index => index.speciality === 'galala' && index.facality_or_international === 'facality');
                    this.filteredInternational = this.all_data.filter(index => index.facality_or_international === 'international' && index.speciality === 'galala');
                    console.log('Filtered data:', this.filteredData);
                    console.log('Filtered international:', this.filteredInternational);
                }
                else {
                    console.error('this.all_data is not an array:', this.all_data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getLinks() {
            try {
                const response = await axios.get('https://nuft-backend.onrender.com/links/get_links');
                this.links = response.data;
                this.filteredLinks = this.links.filter(index => index.university_Name === 'galala');
                console.log(this.filteredLinks);
                if (this.filteredLinks.length > 0) {
                    this.firstYear = this.filteredLinks[0].first_year;
                    this.secondYear = this.filteredLinks[0].second_year;
                    this.location = this.filteredLinks[0].view_location;
                    this.details_about_internationa_program = this.filteredLinks[0].details_about_internationa_program;
                    this.register_link_dorms = this.filteredLinks[0].register_link_dorms;
                    this.register_link_transportation = this.filteredLinks[0].register_link_transportation;
                    this.register_link = this.filteredLinks[0].regitser_link;
                    this.Admission_link_egyption = this.filteredLinks[0].Admission_link_egyption;
                    this.Admission_link_natives = this.filteredLinks[0].Admission_link_natives;
                    this.international_program_link = this.filteredLinks[0].international_program_link;
                    this.transfer_link_egyption = this.filteredLinks[0].transfer_link;
                    this.scholarship_datils = this.filteredLinks[0].scholarship_datils;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getDorms() {
            try {
                const response = await axios.get('https://nuft-backend.onrender.com/info/getdorms');
                this.dorms = response.data;
                this.filteredDorms = this.dorms.filter(dorm => dorm.spec === 'galala');
                //console.log('dorms table', this.filteredDorms)
            } catch (error) {
                console.log(error);
            }
        },
        async gettrans() {
            try {
                const response = await axios.get('http://localhost:3000/trans/gettrans');
                this.trans = response.data;
                this.filteredTrans = this.trans.filter(index => index.spec === 'galala');
                console.log('filteredTrans', this.filteredTrans)
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.get_data();
        this.getLinks();
        this.getDorms();
        this.gettrans();
        console.log(this.filteredData);
        console.log('international', this.filteredInternational);
    }

};
</script>




<style scoped>
.view_location {
    margin-top: 20vh;
    position: absolute;
    top: 5vh;
    width: 100%;
}

.page-nav ul {
    list-style: none;
    padding: 0;
}

.page-nav ul li {
    display: inline;
    margin-right: 10px;
}

.table-responsive {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: black;
    text-align: center;
}
</style>