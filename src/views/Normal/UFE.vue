<template>
    <div>
        <!-- Your existing template code here -->
        <HeaderComponent />
         <section>
 <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="/images/Logos/Universites/National/UFE.png" alt="University Logo" style="width: 100%; max-width: 300px; height: auto;">

    <!-- ######## Uni Title ####### -->
    <h2 style="text-align: center; margin-top: 20px;">(UFE) الجامعة الفرنسية بمصر </h2>

    <!-- ######## Uni info ####### -->
    <p style="text-align: center;">جامعة أهلية تحت إشراف مزدوج من وزارتي التعليم العالي المصرية والفرنسية
    <br>
أنشئت وفقًا للقرار الجمهوري رقم 26 لسنة 2002
</p>

    <!-- ######## Uni Location ####### -->
    <p style="text-align: center;"> بتقغ على مساحة 3.7 فدادين، وتم تخصيص مساحة 30 فدانًا إضافية للإنشاء مقر جديد، ليصبح إجمالي المساحة 33.7 فدانًا بمدينة الشروق، محافظة القاهرة</p>
    <a href="https://goo.gl/maps/z7rRdwxEEbt95edC8?coh=178573&entry=tt" style="display: block; text-align: center;">
        <button>عرض الموقع على الخرائط</button>
    </a>

    <!-- ######## Social Media Links ####### -->
    <div class="social-right-item" style="display: flex; justify-content: center; margin-top: 20px;">
<ul style="display: flex; justify-content: space-between; width: 100%; max-width: 300px;">
    <li><a href="https://www.ufe.edu.eg"><i class="fas fa-globe"></i></a></li>
    <li><a href="tel:17054"><i class="fas fa-phone"></i></a></li>
    <li><a href="mailto:admission@ufe.edu.eg"><i class="fas fa-envelope"></i></a></li>
    <li><a href="https://www.facebook.com/ufe.edu.eg"><i class="fab fa-facebook-f"></i></a></li>
    <li><a href="https://www.instagram.com/ufe_egypt/"><i class="fab fa-instagram"></i></a></li>
    <li><a href="https://www.youtube.com/@universitefrancaisedegypte6560"><i class="fab fa-youtube"></i></a></li>
    <li><a href="https://www.linkedin.com/company/universitefrancaisedegypte"><i class="fab fa-linkedin-in"></i></a></li>
</ul>
    </div>
</div>
    </section>
    
           <section>
            <br><br>
            <h1>الكليات والبرامج</h1>
            <div class="table-responsive" dir="rtl">
                <table style="margin-top: 0vh;" dir="rtl">
                    <thead>
                        <tr>
                            <th rowspan="2">الكلية</th>
                            <th rowspan="2">البرامج</th>
                            <th rowspan="2">الرسوم للمصريين
                            <br>
                             (في السنة)</th>
                            <th rowspan="2">الرسوم للوافدين
                            <br>
                             (في السنة)</th>
                            <th rowspan="2">الشعبة</th>
                            <th colspan="2">الحد الأدنى للثانوية العامة</th>
                            <th colspan="2">الحد الأدنى للشهادات العربية، الإنجليزية والأزهرية</th>
                            <th colspan="2">الحد الأدنى لستيم والنيل</th>
                            <th rowspan="2">الحد الأدنى للوافدين</th>
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
                الرسوم المذكورة لا تشمل رسوم التقديم (إن وجدت)، المصاريف الإدارية (إن وجدت)، تأمين المعاملات (إن وجد)، رسوم الخدمات التعليمية (إن وجدت)، مصاريف الإقامة والنقل (إن وجدت)
            </p>
        </section>

        <section>
            <br><br>
            <h2>السكن</h2>
            <div class="table-responsive" dir="rtl">
                <table>
                    <thead>
                        <tr>
                            <th>النوع</th>
                            <th>الرسوم
                            <br>
                            (في الترم)</th>
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
            <br>
            <a :href="register_link_dorms" target="_blank"><button>رابط التسجيل</button></a>
        </section>

        <section>
            <br><br>
            <h2>الانتقالات</h2>
            <div class="table-responsive" dir="rtl">
                <table>
                    <thead>
                        <tr>
                            <th>الخط</th>
                            <th>الرسوم
                            <br>
                            (في الترم)</th>
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
            <br>
            <a :href="register_link_transportation" target="_blank"><button>رابط التسجيل</button></a>
        </section>

        <section>
            <br><br>
            <h1>المنح الدراسية</h1>
            <p>توفر الجامعة مجموعة مختلفة من المنح الدراسية</p>
            <a :href="register_link_transportation" target="_blank"><button>مزيد من التفاصيل عن المنح الدراسية</button></a>
        </section>

        <section>
            <br><br>
            <h1>طرق التقديم</h1>
            <a :href="Admission_link_natives" target="_blank"><button>رابط التقديم للطلاب الوافدين</button></a>
            <a :href="transfer_link_egyption" target="_blank"><button>رابط التحويل للطلاب المصريين</button></a>
            <a :href="Admission_link_egyption" target="_blank"><button>رابط التقديم للطلاب المصريين</button></a>
        </section>

        <FooterComponent />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name: 'UFE',
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
                const response = await axios.get('https://nuft-website-backend.vercel.app/faclity/getInternational');
                console.log('API response data:', response.data);
                if (response.data && Array.isArray(response.data.facilities)) {
                    this.all_data = response.data.facilities;
                } else {
                    console.error('API response does not contain an array:', response.data);
                }
                if (Array.isArray(this.all_data)) {
                    console.log('All data:', this.all_data);
                    this.filteredData = this.all_data.filter(index => index.speciality === 'UFE' && index.facality_or_international === 'facality');
                    this.filteredInternational = this.all_data.filter(index => index.facality_or_international === 'international' && index.speciality === 'UFE');
                    console.log('Filtered data:', this.filteredData);
                    console.log('Filtered international:', this.filteredInternational);
                } else {
                    console.error('this.all_data is not an array:', this.all_data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getLinks() {
            try {
                const response = await axios.get('https://nuft-website-backend.vercel.app/links/get_links');
                this.links = response.data;
                this.filteredLinks = this.links.filter(index => index.university_Name === 'UFE');
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
                const response = await axios.get('https://nuft-website-backend.vercel.app/info/getdorms');
                this.dorms = response.data;
                this.filteredDorms = this.dorms.filter(dorm => dorm.spec === 'UFE');
                //console.log('dorms table', this.filteredDorms)
            } catch (error) {
                console.log(error);
            }
        },
        async gettrans() {
            try {
                const response = await axios.get('https://nuft-website-backend.vercel.app/trans/gettrans');
                this.trans = response.data;
                this.filteredTrans = this.trans.filter(index => index.spec === 'UFE');
                console.log('filteredTrans', this.filteredTrans)
            }
            catch (error) {
                console.log(error);
            }
        },
        openMap(location) {
            let mapLink = '';
            switch(location) {
                case 'الطور':
                    mapLink = 'https://goo.gl/maps/E4fviPSqcdWtmMvf8?coh=178573&entry=tt';
                    break;
                case 'راس سدر':
                    mapLink = 'https://goo.gl/maps/kZzF5udbmPRdFuNJA?coh=178573&entry=tt';
                    break;
                case 'شرم الشيخ':
                    mapLink = 'https://goo.gl/maps/i6uAZuZowDPBNV9R9?coh=178573&entry=tt';
                    break;
            }
            window.open(mapLink, '_blank');
        }
    },
    created() {
        this.get_data();
        this.getLinks();
        this.getDorms();
        this.gettrans();
        console.log(this.filteredData);
        console.log('international', this.filteredInternational);
  },
  mounted() {
    window.scrollTo(0, 0);
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
    color: white;
    text-align: center;
}

button {
    margin-bottom: 10px;
    border-radius: 5px; 
    margin-right: 10px;
}
</style>
