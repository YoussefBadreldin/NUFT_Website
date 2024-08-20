<template>
  <div>
    <HeaderComponent />
    <section>
      <h1>كلية الطب البيطري</h1>
      <div class="table-responsive" dir="rtl">
        <table>
          <thead>
            <tr>
              <th rowspan="2">الجامعة</th>
              <th rowspan="2">نوع الجامعة</th>
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
              <td>{{ faculty.university_Arabic_Name }}</td>
              <td>{{ faculty.type }}</td>
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
    </section>
    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
  name: 'VET',
  data() {
    return {
      all_data: [],
      filteredData: [],
      filteredInternational: [],
      firstYear: '',
      secondYear: '',
    };
  },
  components: {
    HeaderComponent,
    FooterComponent
  },
  methods: {
    async getData() {
      try {
        // Make requests to 4 different URLs using Promise.all
        const [response1, response2, response3, response4] = await Promise.all([
          axios.get('https://nuft-website-backend.vercel.app/nationalfaculty/getnational'),
          axios.get('https://nuft-website-backend.vercel.app/privatefaculty/getprivate'),
          axios.get('https://nuft-website-backend.vercel.app/internationalfaculty/getinternational'),
          axios.get('https://nuft-website-backend.vercel.app/specialfaculty/getspecial')
        ]);

        // Combine or process the data from all responses
        const combinedData = [
          ...(response1.data?.faculty || []),
          ...(response2.data?.faculty || []),
          ...(response3.data?.faculty || []),
          ...(response4.data?.faculty || [])
        ];

        // Filter data based on your conditions
        this.all_data = combinedData;
        this.filteredData = this.all_data.filter(item => item.faculty_short === 'VET' && item.normal_or_Dual === 'normal');
        this.filteredInternational = this.all_data.filter(item => item.faculty_short === 'VET' && item.normal_or_Dual === 'dual');

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async getLinks() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/privatelinks/get_privatelinks');
        const links = response.data;
        const linkData = links.find(index => index.university === 'IU');
        if (linkData) {
          this.firstYear = linkData.first_year;
          this.secondYear = linkData.second_year;
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    }
  },
  created() {
    this.getData();
    this.getLinks();
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
/* General Styles for Tables */
.table-responsive {
    overflow: auto;
    max-height: 500px;
    width: 100%;
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
}

.table-responsive::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.table-responsive::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.table-responsive::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    position: sticky;
    top: 0;
    background-color: black;
    color: white;
    z-index: 1;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

@media (max-width: 768px) {
    table {
        font-size: 14px;
    }

    th, td {
        padding: 12px;
    }
}

button {
    margin-bottom: 10px;
    border-radius: 5px;
    margin-right: 10px;
}
</style>
