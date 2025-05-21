<template>
  <div class="faculty-template">
    <HeaderComponent />
    
    <!-- Faculty Header Section -->
    <section class="faculty-header">
      <div class="container">
        <div class="faculty-info">
          <h1 class="faculty-name">{{ facultyName }}</h1>
          <p class="faculty-bio">في الجامعات الخاصة والاهلية والدولية والذات طبيعة خاصة</p>
        </div>
      </div>
    </section>

    <!-- Programs Section -->
    <section class="programs-section">
      <div class="container">
        <div class="programs-grid">
          <div v-for="(faculty, index) in sortedFilteredData" 
               :key="index" 
               class="program-card">
            <div class="program-header">
              <h3 class="university-name">
                <a :href="faculty.guide_Url" target="_blank">{{ faculty.university_Arabic_Name }}</a>
              </h3>
              <span class="university-type">{{ faculty.type }}</span>
            </div>
            
            <div class="program-details">
              <div class="info-group">
                <h4>البرامج</h4>
                <ul class="programs-list">
                  <li v-for="(program, index) in formatPrograms(faculty.programs)" :key="index">
                    {{ program }}
                  </li>
                </ul>
              </div>

              <div class="info-group">
                <h4>الرسوم الدراسية</h4>
                <div class="fees-grid">
                  <div class="fee-category">
                    <h5>المصريين</h5>
                    <div class="fee-item">
                      <span class="fee-value">{{ faculty.feesEgyption }}</span>
                    </div>
                  </div>
                  
                  <div class="fee-category">
                    <h5>الوافدين</h5>
                    <div class="fee-item">
                      <span class="fee-value">{{ faculty.feesNatives }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="info-group">
                <h4>الشعبة</h4>
                <p>{{ faculty.section }}</p>
              </div>

              <div class="requirements">
                <h4>الحد الأدنى</h4>
                <div class="requirements-grid">
                  <div class="requirement-category">
                    <h5>الثانوية العامة وستيم والنيل</h5>
                    <div class="requirement-item">
                      <span class="score">{{ faculty.thanwyaa_firstYear_score }}</span>
                      <span class="year">{{ firstYear }}</span>
                    </div>
                    <div class="requirement-item">
                      <span class="score">{{ faculty.thanwyaa_secondYear_score }}</span>
                      <span class="year">{{ secondYear }}</span>
                    </div>
                  </div>

                  <div class="requirement-category">
                    <h5>الثانوية الأزهرية</h5>
                    <div class="requirement-item">
                      <span class="score">{{ faculty.azhar_firstYear_score }}</span>
                      <span class="year">{{ firstYear }}</span>
                    </div>
                    <div class="requirement-item">
                      <span class="score">{{ faculty.azhar_secondYear_score }}</span>
                      <span class="year">{{ secondYear }}</span>
                    </div>
                  </div>

                  <div class="requirement-category">
                    <h5>الشهادات العربية والأجنبية</h5>
                    <div class="requirement-item">
                      <span class="score">{{ faculty.Arabenglish_firstYear_score }}</span>
                      <span class="year">{{ firstYear }}</span>
                    </div>
                    <div class="requirement-item">
                      <span class="score">{{ faculty.Arabenglish_secondYear_score }}</span>
                      <span class="year">{{ secondYear }}</span>
                    </div>
                  </div>
                </div>
                <div class="wafdeen-requirement">
                  <div class="requirement-category">
                    <h5>الوافدين</h5>
                    <div class="requirement-item">
                      <span class="score">{{ faculty.wafdeen_score }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../../public/global/headerComponent.vue';
import FooterComponent from '../../../../public/global/footerComponent.vue';

export default {
  name: 'FacultyTemplate',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      all_data: [],
      filteredData: [],
      firstYear: '',
      secondYear: '',
      facultyName: '',
      faculty_short: ''
    };
  },
  computed: {
    sortedFilteredData() {
      return [...this.filteredData].sort((a, b) => {
        return a.type.localeCompare(b.type);
      });
    }
  },
  methods: {
    formatPrograms(programs) {
      if (!programs) return [];
      if (typeof programs === 'string') {
        // Replace Arabic comma with regular comma, then split by comma or hyphen
        return programs.replace(/،/g, ',')
                      .split(/[,-]/)
                      .map(p => p.trim())
                      .filter(p => p.length > 0); // Remove empty strings
      }
      return Array.isArray(programs) ? programs : [];
    },
    async getData() {
      try {
        const [response1, response2, response3, response4] = await Promise.all([
          axios.get('https://nuft-website-backend.vercel.app/national/faculty/'),
          axios.get('https://nuft-website-backend.vercel.app/private/faculty/'),
          axios.get('https://nuft-website-backend.vercel.app/international/faculty/'),
          axios.get('https://nuft-website-backend.vercel.app/special/faculty/')
        ]);

        const combinedData = [
          ...(response1.data || []),
          ...(response2.data || []),
          ...(response3.data || []),
          ...(response4.data || [])
        ];

        this.all_data = combinedData;
        this.filteredData = this.all_data.filter(item => 
          item.faculty_short === this.faculty_short && 
          item.normal_or_Dual === 'normal'
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async getLinks() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/private/links/');
        const links = response.data;
        const linkData = links.find(index => index.university === 'IU');
        if (linkData) {
          this.firstYear = linkData.first_year;
          this.secondYear = linkData.second_year;
        }
      } catch (error) {
        console.error('API request error:', error);
      }
    },
    setFacultyInfo() {
      const facultyMap = {
        'MED': 'كلية الطب البشري',
        'DENT': 'كلية طب الأسنان',
        'PHARM': 'كلية الصيدلة',
        'ENG': 'كلية الهندسة',
        'SCI': 'كلية العلوم الأساسية',
        'AGRI': 'كلية الزراعة',
        'VET': 'كلية الطب البيطري',
        'COMM': 'كلية التجارة',
        'ARTS': 'كلية الآداب',
        'LAW': 'كلية الحقوق',
        'ECON': 'كلية الاقتصاد والأدارة',
        'MASS': 'كلية الإعلام',
        'ARCH': 'كلية الأثار',
        'FINE': 'كلية الفنون الجميلة',
        'EDU': 'كلية التربية',
        'NURS': 'كلية التمريض',
        'PHYS': 'كلية العلاج الطبيعي',
        'SPORT': 'كلية التربية الرياضية',
        'TOUR': 'كلية السياحة',
        'LANG': 'كلية اللغات والترجمة',
        'ISLAM': 'كلية الدراسات الإسلامية',
        'CS': 'كلية علوم الحاسب',
        'PT': 'كلية العلاج الطبيعي',
        'POLY': 'الكليات البوليتكنيك',
        'HS': 'كلية تكنولوجيا العلوم الصحية',
        'ART': 'كلية الفنون',
        'MEDIA': 'كلية الإعلام',
        'BIOTECH': 'كلية التكنولوجيا الحيوية',
        'CINE': 'كلية العلوم السينمائية ',
        'SOCSCI': 'كلية العلوم الاجتماعية'
      };

      this.faculty_short = this.$route.params.faculty;
      this.facultyName = facultyMap[this.faculty_short] || this.faculty_short;
    }
  },
  created() {
    this.setFacultyInfo();
    this.getData();
    this.getLinks();
  },
  watch: {
    '$route.params.faculty': {
      handler() {
        this.setFacultyInfo();
        this.getData();
      },
      immediate: true
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.faculty-template {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Faculty Header Styles */
.faculty-header {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.faculty-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.faculty-name {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
}

.faculty-bio {
  font-size: 1.1rem;
  max-width: 800px;
  line-height: 1.6;
  margin: 0;
}

/* Programs Section Styles */
.programs-section {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  color: #1a237e;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.program-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.program-card:hover {
  transform: translateY(-5px);
}

.program-header {
  background: #1a237e;
  color: white;
  padding: 1.5rem;
}

.university-name {
  margin: 0;
  font-size: 1.5rem;
}

.university-name a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.university-name a:hover {
  color: #3498db;
}

.university-type {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.program-details {
  padding: 1.5rem;
}

.info-group {
  margin-bottom: 1.5rem;
}

.info-group h4 {
  color: #1a237e;
  margin: 1.5rem 0 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e8eaf6;
}

.fees-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.fee-category h5 {
  color: #1a237e;
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #e8eaf6;
}

.fee-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.fee-value {
  font-size: 1rem;
  font-weight: 600;
  color: #1a237e;
}

.requirements {
  background: white;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.requirements h4 {
  color: #1a237e;
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  text-align: center;
  padding-bottom: 0.15rem;
  border-bottom: 1px solid #e8eaf6;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.wafdeen-requirement {
  max-width: 150px;
  margin: 0 auto;
}

.requirement-category {
  background: #f8f9fa;
  border-radius: 4px;
  padding: 0.35rem;
  text-align: center;
  border: 1px solid #e8eaf6;
}

.requirement-category h5 {
  color: #1a237e;
  margin: 0 0 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  padding-bottom: 0.1rem;
  border-bottom: 1px solid #e8eaf6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.requirement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  padding: 0.1rem;
}

.requirement-item .score {
  font-size: 0.75rem;
  font-weight: 600;
  color: #1a237e;
  line-height: 1;
}

.requirement-item .year {
  color: #666;
  font-size: 0.65rem;
  background: #e8eaf6;
  padding: 0.05rem 0.15rem;
  border-radius: 2px;
  font-weight: 500;
  line-height: 1;
}

@media (max-width: 768px) {
  .faculty-name {
    font-size: 2rem;
  }
  
  .faculty-bio {
    font-size: 1rem;
  }
  
  .programs-grid {
    grid-template-columns: 1fr;
  }
  
  .requirements-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;
  }
  
  .requirement-category {
    padding: 0.3rem;
  }
  
  .requirement-category h5 {
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .fees-grid {
    grid-template-columns: 1fr;
  }
  
  .wafdeen-requirement {
    max-width: 100%;
  }
  
  .requirements-grid {
    grid-template-columns: 1fr;
  }
  
  .requirement-category {
    padding: 0.35rem;
  }
}

.programs-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.programs-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e8eaf6;
  color: #1a237e;
  font-size: 0.95rem;
}

.programs-list li:last-child {
  border-bottom: none;
}
</style>
