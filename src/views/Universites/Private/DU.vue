
<template>
  <div>
    <HeaderComponent />
    <section>
      <div class="center-content">
        <img 
          :src="filteredLinks.length > 0 ? filteredLinks[0].university_Logo : '#'" 
          alt="University Logo" 
          class="university-logo"
        />
        <h2 class="center-text">
          {{ filteredLinks.length > 0 ? filteredLinks[0].university_Arabic_Name : '#' }}
        </h2>
        <p class="center-text">
          {{ filteredLinks.length > 0 ? filteredLinks[0].Uni_Bio : '#' }}
        </p>
        <a 
          :href="filteredLinks.length > 0 ? filteredLinks[0].location : '#'" 
          class="center-text"
        >
          <button @click="openMap(filteredLinks.length > 0 ? filteredLinks[0].location : '')">
            عرض الموقع على الخرائط
          </button>
        </a>
        
        <!-- Social Media Links -->
        <div class="social-right-item" style="display: flex; justify-content: center; margin-top: 20px;">
          <ul style="display: flex; justify-content: space-between; width: 100%; max-width: 300px;">
            <li><a :href="filteredLinks.length > 0 ? filteredLinks[0].website : '#'"><i class="fas fa-globe"></i></a></li>
            <li><a :href="`tel:${filteredLinks.length > 0 ? filteredLinks[0].phone : '#'}`"><i class="fas fa-phone"></i></a></li>
            <li><a :href="`mailto:${filteredLinks.length > 0 ? filteredLinks[0].email : '#'}`"><i class="fas fa-envelope"></i></a></li>
            <li><a :href="filteredLinks.length > 0 ? filteredLinks[0].facebook : '#'"><i class="fab fa-facebook-f"></i></a></li>
            <li><a :href="filteredLinks.length > 0 ? filteredLinks[0].instagram : '#'"><i class="fab fa-instagram"></i></a></li>
            <li><a :href="filteredLinks.length > 0 ? filteredLinks[0].youtube : '#'"><i class="fab fa-youtube"></i></a></li>
            <li><a :href="filteredLinks.length > 0 ? filteredLinks[0].linkedin : '#'"><i class="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <h1>الكليات والبرامج</h1>
      <div class="table-responsive" dir="rtl">
        <table style="margin-top: 0;" dir="rtl">
          <thead>
            <tr>
              <th rowspan="2">الكلية</th>
              <th rowspan="2">البرامج</th>
              <th rowspan="2">الرسوم للمصريين (في السنة)</th>
              <th rowspan="2">الرسوم للوافدين (في السنة)</th>
              <th rowspan="2">الشعبة</th>
              <th colspan="2">الحد الأدنى للثانوية العامة وستيم والنيل</th>
              <th colspan="2">الحد الأدنى للثانوية الأزهرية (بعد المعادلة)</th>
              <th colspan="2">الحد الأدنى للشهادات العربية والأجنبية (بعد المعادلة)</th>
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
              <td>{{ faculty.faculty }}</td>
              <td>{{ faculty.programs }}</td>
              <td>{{ faculty.feesEgyption }}</td>
              <td>{{ faculty.feesNatives }}</td>
              <td>{{ faculty.section }}</td>
              <td>{{ faculty.thanwyaa_firstYear_score }}</td>
              <td>{{ faculty.thanwyaa_secondYear_score }}</td>
              <td>{{ faculty.azhar_firstYear_score }}</td>
              <td>{{ faculty.azhar_secondYear_score }}</td>
              <td>{{ faculty.Arabenglish_firstYear_score }}</td>
              <td>{{ faculty.Arabenglish_secondYear_score }}</td>
              <td>{{ faculty.wafdeen_score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <p>
        الرسوم المذكورة لا تشمل رسوم التقديم (إن وجدت)، المصاريف الإدارية (إن وجدت)، تأمين المعاملات (إن وجد)، رسوم الخدمات التعليمية (إن وجدت)، مصاريف الإقامة والنقل (إن وجدت)
      </p>
      <a href="/Status/UGRAD/National" style="display: block; text-align: center;">
        <button>اضغط هنا لمعرفة حالة تقديم الجامعة</button>
      </a>
    </section>

    
    <!-- Dorms -->
    <section>
    <br>
      <h2>السكن</h2>
      <div class="table-responsive" dir="rtl">
        <table>
          <thead>
            <tr>
              <th>النوع</th>
              <th>الرسوم (في الترم)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dorm, index) in filteredDorms" :key="index">
              <td>{{ dorm.type }}</td>
              <td>{{ dorm.price }}</td>
            </tr>
          </tbody>
        </table>
        <br>
      </div>
      <a :href="dorms_link" target="_blank"><button>مزيد من التفاصيل عن السكن</button></a>
    </section>

    <!-- Transportation -->
    <section>
    <br>
      <h2>الانتقالات</h2>
      <div class="table-responsive" dir="rtl">
        <table>
          <thead>
            <tr>
              <th>الخط</th>
              <th>الرسوم (في الترم)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trans, index) in filteredTrans" :key="index">
              <td>{{ trans.type }}</td>
              <td>{{ trans.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <a :href="transportation_link" target="_blank"><button>مزيد من التفاصيل عن الانتقالات</button></a>
    </section>

    <!-- Scholarships -->
    <section>
      <h2>المنح الدراسية</h2>
      <div class="table-responsive" dir="rtl">
     <p>
      توفر الجامعة منح مختلفة 
      </p>
      </div>
      <a :href="scholarship_link" target="_blank"><button>تفاصيل المنح</button></a>
    </section>

    <!-- Admission Links -->
<section dir="rtl">
  <br>
  <h2>روابط التقديم</h2>
  <ul>
    <a :href="Egyptian_Admission_link" target="_blank"><button>رابط التقديم للطلاب المصريين</button></a>
    <a :href="Egyptian_Admission_link2" target="_blank"><button>رابط التقديم للطلاب المصريين (البرامج الدولية)</button></a>
    <a :href="Egyptian_Transfer_link" target="_blank"><button>رابط التحويل للطلاب المصريين</button></a>
    <a :href="Wafdeen_Admission_link" target="_blank"><button>رابط التقديم للطلاب الوافدين</button></a>
  </ul>
</section>

    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../../public/global/headerComponent.vue';
import FooterComponent from '../../../../public/global/footerComponent.vue';

export default {
    name: 'DU',
    data() {
        return {
            all_data: [],
            filteredData: [],
            filteredInternational: [],
            links: [],
            filteredLinks: [],
            university_Arabic_Name: '',
            university_Logo: '',
            Uni_Bio: '',
            location: '',
            website: '',
            phone: '',
            email: '',
            facebook: '',
            instagram: '',
            youtube: '',
            linkedin: '',
            firstYear: '',
            secondYear: '',
            international_programs: '',
            dorms_link: '',
            transportation_link: '',
            scholarship_link: '',
            Egyptian_Admission_link: '',
            Egyptian_Admission_link2: '',
            Egyptian_Transfer_link: '',
            Wafdeen_Admission_link: '',
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
                const response = await axios.get('https://nuft-website-backend.vercel.app/privatefaculty/getprivate');
                console.log('API response data:', response.data);
                if (response.data && Array.isArray(response.data.faculty)) {
                    this.all_data = response.data.faculty;
                } else {
                    console.error('API response does not contain an array:', response.data);
                }
                if (Array.isArray(this.all_data)) {
                    console.log('All data:', this.all_data);
                    this.filteredData = this.all_data.filter(index => index.university === 'DU' && index.normal_or_Dual === 'normal');
                    this.filteredInternational = this.all_data.filter(index => index.normal_or_Dual === 'dual' && index.university === 'DU');
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
                const response = await axios.get('https://nuft-website-backend.vercel.app/privatelinks/get_privatelinks');
                this.links = response.data;
                this.filteredLinks = this.links.filter(index => index.university === 'DU');
                console.log(this.filteredLinks);
                if (this.filteredLinks.length > 0) {
                    const linkData = this.filteredLinks[0];
                    this.university_Arabic_Name = linkData.university_Arabic_Name;
                    this.university_Logo = linkData.university_Logo;
                    this.Uni_Bio = linkData.Uni_Bio;
                    this.location = linkData.location;
                    this.website = linkData.website;
                    this.phone = linkData.phone;
                    this.email = linkData.email;
                    this.facebook = linkData.facebook;
                    this.instagram = linkData.instagram;
                    this.youtube = linkData.youtube;
                    this.linkedin = linkData.linkedin;
                    this.firstYear = linkData.first_year;
                    this.secondYear = linkData.second_year;
                    this.international_programs = linkData.international_programs;
                    this.dorms_link = linkData.dorms_link;
                    this.transportation_link = linkData.transportation_link;
                    this.scholarship_link = linkData.scholarship_link;
                    this.Egyptian_Admission_link = linkData.Egyptian_Admission_link;
                    this.Egyptian_Admission_link2 = linkData.Egyptian_Admission_link2;
                    this.Egyptian_Transfer_link = linkData.Egyptian_Transfer_link;
                    this.Wafdeen_Admission_link = linkData.Wafdeen_Admission_link;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getDorms() {
            try {
                const response = await axios.get('https://nuft-website-backend.vercel.app/privatedorms/getprivatedorms');
                this.dorms = response.data;
                this.filteredDorms = this.dorms.filter(dorm => dorm.spec === 'DU');
                //console.log('dorms table', this.filteredDorms)
            } catch (error) {
                console.log(error);
            }
        },
        async gettrans() {
            try {
                const response = await axios.get('https://nuft-website-backend.vercel.app/privatetrans/getprivatetrans');
                this.trans = response.data;
                this.filteredTrans = this.trans.filter(index => index.spec === 'DU');
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
    },
    mounted() {
        window.scrollTo(0, 0);
    }
};
</script>


<style scoped>
/* General Styles for Tables */
.table-responsive {
    overflow: auto; /* Allows both horizontal and vertical scrolling */
    max-height: 500px; /* Adjust this value as needed for your design */
    width: 100%;
    /* Custom Scrollbar Styles */
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: #888 #f1f1f1; /* For Firefox */
}

.table-responsive::-webkit-scrollbar {
    width: 8px; /* Width for vertical scrollbar */
    height: 8px; /* Height for horizontal scrollbar */
}

.table-responsive::-webkit-scrollbar-track {
    background: #f1f1f1; /* Background of the scrollbar track */
}

.table-responsive::-webkit-scrollbar-thumb {
    background: #888; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Optional: Adds rounded corners to the scrollbar thumb */
}

/* Styles for Tables */
table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0; /* Removes space between borders */
}

/* Sticky Header Styles */
thead {
    position: -webkit-sticky; /* For Safari */
    position: sticky;
    top: 0; /* Adjust this if you have other fixed elements above the table */
    background-color: black;
    color: white;
    z-index: 1; /* Ensures header is above other content */
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

/* Sticky Header Row Styles */
thead th {
    background-color: black;
    color: white;
}

/* Mobile Specific Styles */
@media (max-width: 768px) {
    table {
        font-size: 14px; /* Adjust font size for better readability */
    }

    th, td {
        padding: 12px; /* Increase padding for touch accessibility */
    }
}
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
