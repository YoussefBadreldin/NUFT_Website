<template>
  <div class="university-template">
    <HeaderComponent />
    
    <!-- University Header Section -->
    <section class="university-header">
      <div class="container">
        <div class="university-info">
          <img 
            :src="universityData.university_Logo" 
            :alt="universityData.university_Arabic_Name" 
            class="university-logo"
            @error="handleImageError"
          />
          <h1 class="university-name">{{ universityData.university_Arabic_Name }}</h1>
          <p class="university-bio">{{ universityData.Uni_Bio }}</p>
          
          <!-- Location Button -->
          <button 
            class="location-btn"
            @click="openMap(universityData.location)"
          >
            <i class="fas fa-map-marker-alt"></i>
            عرض الموقع على الخرائط
          </button>
          
          <!-- Social Media Links -->
          <div class="social-links">
            <a :href="universityData.website" target="_blank" class="social-link">
              <i class="fas fa-globe"></i>
            </a>
            <a :href="`tel:${universityData.phone}`" class="social-link">
              <i class="fas fa-phone"></i>
            </a>
            <a :href="`mailto:${universityData.email}`" class="social-link">
              <i class="fas fa-envelope"></i>
            </a>
            <a :href="universityData.facebook" target="_blank" class="social-link">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a :href="universityData.instagram" target="_blank" class="social-link">
              <i class="fab fa-instagram"></i>
            </a>
            <a :href="universityData.youtube" target="_blank" class="social-link">
              <i class="fab fa-youtube"></i>
            </a>
            <a :href="universityData.linkedin" target="_blank" class="social-link">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Faculties Section -->
    <section class="faculties-section">
      <div class="container">
        <h2 class="section-title">الكليات والبرامج</h2>
        <div class="faculties-grid" ref="facultiesGrid">
          <div v-for="faculty in universityData.faculties" 
               :key="faculty.id" 
               class="faculty-card"
               :style="{ transform: `translateX(${currentSlide * -100}%)` }">
            <div class="faculty-header">
              <h3 class="faculty-name">{{ faculty.faculty }}</h3>
              <span class="faculty-type">الشعبة: {{ faculty.section }}</span>
            </div>
            
            <div class="faculty-details">
              <div class="programs" v-if="faculty.programs && faculty.programs.length">
                <h4>البرامج</h4>
                <ul>
                  <li v-for="program in faculty.programs" :key="program">{{ program }}</li>
                </ul>
              </div>

              <div class="fees">
                <h4>الرسوم الدراسية</h4>
                <div class="fees-grid">
                  <div class="fee-category">
                    <h5>الوافدين</h5>
                    <template v-if="faculty.feesNatives2 || faculty.feesNatives3 || faculty.feesNatives4">
                      <div class="fee-item">
                        <span>{{ formatFee(faculty.feesNatives) }}</span>
                        <span>فئة أ</span>
                      </div>
                      <div class="fee-item" v-if="faculty.feesNatives2">
                        <span>{{ formatFee(faculty.feesNatives2) }}</span>
                        <span>فئة ب</span>
                      </div>
                      <div class="fee-item" v-if="faculty.feesNatives3">
                        <span>{{ formatFee(faculty.feesNatives3) }}</span>
                        <span>فئة ج</span>
                      </div>
                      <div class="fee-item" v-if="faculty.feesNatives4">
                        <span>{{ formatFee(faculty.feesNatives4) }}</span>
                        <span>فئة د</span>
                      </div>
                    </template>
                    <template v-else>
                      <div class="fee-item single-fee">
                        <span>{{ formatFee(faculty.feesNatives) }}</span>
                      </div>
                    </template>
                  </div>
                  
                  <div class="fee-category">
                    <h5>المصريين</h5>
                    <template v-if="faculty.feesEgyption2 || faculty.feesEgyption3 || faculty.feesEgyption4">
                      <div class="fee-item">
                        <span>{{ formatFee(faculty.feesEgyption) }}</span>
                        <span>فئة أ</span>
                      </div>
                      <div class="fee-item" v-if="faculty.feesEgyption2">
                        <span>{{ formatFee(faculty.feesEgyption2) }}</span>
                        <span>فئة ب</span>
                      </div>
                      <div class="fee-item" v-if="faculty.feesEgyption3">
                        <span>{{ formatFee(faculty.feesEgyption3) }}</span>
                        <span>فئة ج</span>
                      </div>
                      <div class="fee-item" v-if="faculty.feesEgyption4">
                        <span>{{ formatFee(faculty.feesEgyption4) }}</span>
                        <span>فئة د</span>
                      </div>
                    </template>
                    <template v-else>
                      <div class="fee-item single-fee">
                        <span>{{ formatFee(faculty.feesEgyption) }}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </div>

              <div class="requirements">
                <h4>الحد الأدني</h4>
                <div class="requirements-grid">
                  <div class="requirement-category" v-if="shouldShowRequirements">
                    <h5>الثانوية<br> العامة</h5>
                    <template v-if="universityType === 'national'">
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2025</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.thanwyaa_secondYear_score) }}</span>
                        <span class="year">2024</span>
                      </div>
                    </template>
                    
                    <template v-else-if="universityType === 'private'">
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2025</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.thanwyaa_secondYear_score) }}</span>
                        <span class="year">2024</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.thanwyaa_firstYear_score) }}</span>
                        <span class="year">2023</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2022</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2021</span>
                      </div>
                    </template>
                    
                    <template v-else>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2025</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.thanwyaa_secondYear_score) }}</span>
                        <span class="year">2024</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.thanwyaa_firstYear_score) }}</span>
                        <span class="year">2023</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2022</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2021</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2020</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2019</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2018</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2017</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2016</span>
                      </div>
                    </template>
                  </div>
                  <div class="requirement-category" v-if="shouldShowRequirements">
                    <h5>الثانوية<br> الأزهرية</h5>
                    <template v-if="universityType === 'national'">
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2025</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.azhar_secondYear_score) }}</span>
                        <span class="year">2024</span>
                      </div>
                    </template>
                    
                    <template v-else-if="universityType === 'private'">
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2025</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.azhar_secondYear_score) }}</span>
                        <span class="year">2024</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.azhar_firstYear_score) }}</span>
                        <span class="year">2023</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2022</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2021</span>
                      </div>
                    </template>
                    
                    <template v-else>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2025</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.azhar_secondYear_score) }}</span>
                        <span class="year">2024</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.azhar_firstYear_score) }}</span>
                        <span class="year">2023</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2022</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2021</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2020</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2019</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2018</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2017</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2016</span>
                      </div>
                    </template>
                  </div>
                  <div class="requirement-category" v-if="shouldShowRequirements">
                    <h5>الشهادات العربية والأجنبية</h5>
                    <template v-if="universityType === 'national'">
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2025</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.Arabenglish_secondYear_score) }}</span>
                        <span class="year">2024</span>
                      </div>
                    </template>
                    
                    <template v-else-if="universityType === 'private'">
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2025</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.Arabenglish_secondYear_score) }}</span>
                        <span class="year">2024</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.Arabenglish_firstYear_score) }}</span>
                        <span class="year">2023</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2022</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2021</span>
                      </div>
                    </template>
                    
                    <template v-else>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2025</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.Arabenglish_secondYear_score) }}</span>
                        <span class="year">2024</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">{{ formatScore(faculty.Arabenglish_firstYear_score) }}</span>
                        <span class="year">2023</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2022</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2021</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2020</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2019</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2018</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2017</span>
                      </div>
                      <div class="requirement-item">
                        <span class="score">0%</span>
                        <span class="year">2016</span>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="requirements-grid wafdeen-grid">
                  <div class="requirement-category">
                    <h5>الوافدين</h5>
                    <div class="requirement-item">
                      <span class="score">{{ formatScore(faculty.wafdeen_score) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Mobile Navigation Dots -->
        <div class="mobile-nav-dots" v-if="isMobile">
          <span v-for="(_, index) in universityData.faculties" 
                :key="index"
                :class="{ active: currentSlide === index }"
                @click="goToSlide(index)">
          </span>
        </div>
      </div>
    </section>

    <!-- International Programs Section -->
    <section class="international-programs-section" v-if="universityData.international_programs">
      <div class="container">
        <h2 class="section-title">البرامج الدولية</h2>
        <div class="international-programs-content">
          <template v-if="universityData.international_programs.startsWith('http')">
            <a :href="universityData.international_programs" target="_blank" class="link-btn">
              <i class="fas fa-globe"></i>
              البرامج الدولية
            </a>
          </template>
          <template v-else>
            <div class="international-programs-info">
              <i class="fas fa-globe"></i>
              {{ universityData.international_programs }}
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Dorms Section -->
    <section class="dorms-section" v-if="universityData.dorms && universityData.dorms.length">
      <div class="container">
        <h2 class="section-title">السكن الجامعي</h2>
        <div class="dorms-grid">
          <div v-for="dorm in universityData.dorms" :key="dorm.id" class="dorm-card">
            <div class="dorm-header">
              <h3>{{ dorm.name }}</h3>
            </div>
            <div class="dorm-details">
              <p>{{ dorm.description }}</p>
              <div class="dorm-info">
                <span><i class="fas fa-money-bill-wave"></i> {{ dorm.price }}</span>
                <span><i class="fas fa-map-marker-alt"></i> {{ dorm.location }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="section-link" v-if="universityData.dorms_link">
          <a :href="universityData.dorms_link" target="_blank" class="link-btn">
            <i class="fas fa-external-link-alt"></i>
            المزيد عن السكن الجامعي
          </a>
        </div>
      </div>
    </section>

    <!-- Transportation Section -->
    <section class="transportation-section" v-if="universityData.transportation && universityData.transportation.length">
      <div class="container">
        <h2 class="section-title">وسائل المواصلات</h2>
        <div class="transportation-grid">
          <div v-for="trans in universityData.transportation" :key="trans.id" class="transportation-card">
            <div class="transportation-header">
              <h3>{{ trans.name }}</h3>
            </div>
            <div class="transportation-details">
              <p>{{ trans.description }}</p>
              <div class="transportation-info">
                <span><i class="fas fa-money-bill-wave"></i> {{ trans.price }}</span>
                <span><i class="fas fa-route"></i> {{ trans.route }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="section-link" v-if="universityData.transportation_link">
          <a :href="universityData.transportation_link" target="_blank" class="link-btn">
            <i class="fas fa-external-link-alt"></i>
            المزيد عن وسائل المواصلات
          </a>
        </div>
      </div>
    </section>

    <!-- Scholarship Section -->
    <section class="scholarship-section" v-if="universityData.scholarship_link">
      <div class="container">
        <h2 class="section-title">المنح الدراسية</h2>
        <div class="scholarship-content">
          <p>تقدم الجامعة العديد من المنح الدراسية للطلاب المتميزين. يمكنك معرفة المزيد عن المنح المتاحة وشروط التقديم من خلال الرابط التالي:</p>
          <div class="section-link">
            <a :href="universityData.scholarship_link" target="_blank" class="link-btn">
              <i class="fas fa-graduation-cap"></i>
              المنح الدراسية
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Admission Links Section -->
    <section class="admission-section">
      <div class="container">
        <h2 class="section-title">روابط التقديم</h2>
        <div class="admission-links">
          <a :href="universityData.Egyptian_Admission_link" target="_blank" class="admission-btn">
            <i class="fas fa-user-graduate"></i>
            رابط التقديم للطلاب المصريين
          </a>
          <a :href="universityData.Egyptian_Transfer_link" target="_blank" class="admission-btn">
            <i class="fas fa-exchange-alt"></i>
            رابط التحويل للطلاب المصريين
          </a>
          <a :href="universityData.Wafdeen_Admission_link" target="_blank" class="admission-btn">
            <i class="fas fa-globe-americas"></i>
            رابط التقديم للطلاب الوافدين
          </a>
        </div>
      </div>
    </section>

    <FooterComponent />
    <smartAssistantComponent />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
  name: 'UniversityTemplate',
  components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
  },
  data() {
    return {
      universityData: {
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
        faculties: [],
        dorms: [],
        transportation: [],
        dorms_link: '',
        transportation_link: '',
        scholarship_link: '',
        Egyptian_Admission_link: '',
        Egyptian_Admission_link2: '',
        Egyptian_Transfer_link: '',
        Wafdeen_Admission_link: ''
      },
      currentSlide: 0,
      isMobile: false,
      touchStartX: 0,
      touchEndX: 0
    };
  },
  methods: {
    async fetchUniversityData() {
      try {
        const universityId = this.$route.params.id;
        const universityType = this.$route.params.type.toLowerCase();

        // Fetch faculty data
        const facultyResponse = await axios.get(`https://nuft-website-backend.vercel.app/${universityType}faculty/get${universityType}`);
        if (facultyResponse.data && Array.isArray(facultyResponse.data.faculty)) {
          this.universityData.faculties = facultyResponse.data.faculty
            .filter(index => index.university === universityId && index.normal_or_Dual === 'normal')
            .map(faculty => ({
              ...faculty,
              programs: this.formatPrograms(faculty.programs)
            }));
        }

        // Fetch university info
        const linksResponse = await axios.get(`https://nuft-website-backend.vercel.app/${universityType}links/get_${universityType}links`);
        const universityInfo = linksResponse.data.find(link => link.university === universityId);
        if (universityInfo) {
          this.universityData = {
            ...this.universityData,
            university_Arabic_Name: universityInfo.university_Arabic_Name,
            university_Logo: universityInfo.university_Logo,
            Uni_Bio: universityInfo.Uni_Bio,
            location: universityInfo.location,
            website: universityInfo.website,
            phone: universityInfo.phone,
            email: universityInfo.email,
            facebook: universityInfo.facebook,
            instagram: universityInfo.instagram,
            youtube: universityInfo.youtube,
            linkedin: universityInfo.linkedin,
            firstYear: universityInfo.first_year,
            secondYear: universityInfo.second_year,
            international_programs: universityInfo.international_programs,
            dorms_link: universityInfo.dorms_link,
            transportation_link: universityInfo.transportation_link,
            scholarship_link: universityInfo.scholarship_link,
            Egyptian_Admission_link: universityInfo.Egyptian_Admission_link,
            Egyptian_Admission_link2: universityInfo.Egyptian_Admission_link2,
            Egyptian_Transfer_link: universityInfo.Egyptian_Transfer_link,
            Wafdeen_Admission_link: universityInfo.Wafdeen_Admission_link
          };
        }

        // Fetch dorms data
        const dormsResponse = await axios.get(`https://nuft-website-backend.vercel.app/${universityType}dorms/get${universityType}dorms`);
        this.universityData.dorms = dormsResponse.data.filter(dorm => dorm.spec === universityId);

        // Fetch transportation data
        const transResponse = await axios.get(`https://nuft-website-backend.vercel.app/${universityType}trans/get${universityType}trans`);
        this.universityData.transportation = transResponse.data.filter(trans => trans.spec === universityId);

      } catch (error) {
        console.error('Error fetching university data:', error);
      }
    },
    formatPrograms(programs) {
      if (!programs) return [];
      if (typeof programs === 'string') {
        return programs.split(',').map(p => p.trim());
      }
      return Array.isArray(programs) ? programs : [];
    },
    formatFee(fee) {
      if (!fee) return 'غير متوفر';
      return typeof fee === 'string' ? fee : fee.toString();
    },
    formatScore(score) {
      if (!score) return 'غير متوفر';
      return typeof score === 'string' ? score : score.toString();
    },
    openMap(location) {
      if (location) {
        window.open(location, '_blank');
      }
    },
    handleImageError(event) {
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2QzZENkYiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    handleTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
    },
    handleTouchEnd() {
      const swipeThreshold = 50;
      const diff = this.touchStartX - this.touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && this.currentSlide < this.universityData.faculties.length - 1) {
          // Swipe left
          this.currentSlide++;
        } else if (diff < 0 && this.currentSlide > 0) {
          // Swipe right
          this.currentSlide--;
        }
      }
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    }
  },
  created() {
    this.fetchUniversityData();
  },
  watch: {
    '$route.params': {
      handler() {
        this.fetchUniversityData();
      },
      deep: true
    }
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    
    if (this.isMobile) {
      const grid = this.$refs.facultiesGrid;
      grid.addEventListener('touchstart', this.handleTouchStart);
      grid.addEventListener('touchmove', this.handleTouchMove);
      grid.addEventListener('touchend', this.handleTouchEnd);
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
    
    if (this.isMobile) {
      const grid = this.$refs.facultiesGrid;
      grid.removeEventListener('touchstart', this.handleTouchStart);
      grid.removeEventListener('touchmove', this.handleTouchMove);
      grid.removeEventListener('touchend', this.handleTouchEnd);
    }
  },
  computed: {
    universityType() {
      return this.$route.params.type.toLowerCase();
    },
    shouldShowRequirements() {
      return true; // You can add conditions here if needed
    }
  }
};
</script>

<style scoped>
.university-template {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* University Header Styles */
.university-header {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.university-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.university-logo {
  width: 150px;
  height: 150px;
  object-fit: contain;
  background: white;
  padding: 1rem;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.university-name {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
}

.university-bio {
  font-size: 1.1rem;
  max-width: 800px;
  line-height: 1.6;
  margin: 0;
}

.location-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid white;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.location-btn:hover {
  background: white;
  color: #1a237e;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  color: white;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px);
}

/* Faculties Section Styles */
.faculties-section {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  color: #1a237e;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.faculties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  position: relative;
}

.faculty-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.faculty-card:hover {
  transform: translateY(-5px);
}

.faculty-header {
  background: #1a237e;
  color: white;
  padding: 1.5rem;
}

.faculty-name {
  margin: 0;
  font-size: 1.5rem;
}

.faculty-type {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.faculty-details {
  padding: 1.5rem;
}

.faculty-details h4 {
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

.programs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.programs li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.fees-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
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
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.25rem;
}

.fee-item span:first-child {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a237e;
  margin: 0;
  order: 1;
}

.fee-item span:last-child {
  color: #666;
  font-size: 0.75rem;
  background: #e8eaf6;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-weight: 500;
  white-space: nowrap;
  order: 2;
}

.fee-item.single-fee {
  text-align: center;
  padding: 0.25rem 0;
}

.fee-item.single-fee span {
  display: inline;
  width: auto;
}

.requirements {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
}

.requirements h4 {
  color: #1a237e;
  margin: 0 0 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e8eaf6;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
  direction: rtl;
}

.requirement-category {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.5rem;
  text-align: right;
  border: 1px solid #e8eaf6;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.requirement-category h5 {
  color: #1a237e;
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #e8eaf6;
  text-align: center;
}

.requirement-item {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.2rem;
}

.requirement-item .score {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a237e;
  margin: 0;
}

.requirement-item .year {
  color: #666;
  font-size: 0.75rem;
  background: #e8eaf6;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-weight: 500;
  white-space: nowrap;
}

.wafdeen-grid {
  grid-template-columns: 1fr;
  max-width: 200px;
  margin: 0.75rem auto 0;
}

/* Dorms Section Styles */
.dorms-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

.dorms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.dorm-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.dorm-header {
  background: #1a237e;
  color: white;
  padding: 1.5rem;
}

.dorm-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.dorm-details {
  padding: 1.5rem;
  text-align: center;
}

.dorm-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  color: #666;
}

/* Transportation Section Styles */
.transportation-section {
  padding: 4rem 0;
}

.transportation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.transportation-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.transportation-header {
  background: #1a237e;
  color: white;
  padding: 1.5rem;
}

.transportation-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.transportation-details {
  padding: 1.5rem;
  text-align: center;
}

.transportation-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  color: #666;
}

/* Scholarship Section Styles */
.scholarship-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

.scholarship-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.scholarship-content p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Common Link Button Styles */
.section-link {
  text-align: center;
  margin-top: 2rem;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1a237e;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-btn:hover {
  background: #283593;
  transform: translateY(-2px);
}

/* Admission Section Styles */
.admission-section {
  background: #f1f3f9;
  padding: 4rem 0;
}

.admission-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.admission-btn {
  background: #1a237e;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.admission-btn:hover {
  background: #283593;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .university-name {
    font-size: 2rem;
  }
  
  .university-bio {
    font-size: 1rem;
  }
  
  .faculties-grid {
    display: flex;
    overflow: hidden;
    gap: 0;
  }
  
  .faculty-card {
    min-width: 100%;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }
  
  .admission-links {
    flex-direction: column;
  }
  
  .admission-btn {
    width: 100%;
    justify-content: center;
  }

  .dorms-grid,
  .transportation-grid {
    grid-template-columns: 1fr;
  }
  
  .dorm-info,
  .transportation-info {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
  
  .mobile-nav-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .mobile-nav-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ccc;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .mobile-nav-dots span.active {
    background: #1a237e;
  }

  .requirements-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem;
  }
  
  .wafdeen-grid {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
  
  .requirement-category {
    padding: 0.4rem;
  }
  
  .requirement-item {
    padding: 0.15rem;
    gap: 0.2rem;
  }
  
  .requirement-item .score {
    font-size: 0.85rem;
  }
  
  .requirement-item .year {
    font-size: 0.7rem;
    padding: 0.1rem 0.25rem;
  }

  .fees-grid {
    gap: 0.4rem;
  }
}

@media (max-width: 480px) {
  .requirements-grid {
    grid-template-columns: 1fr;
  }
  
  .wafdeen-grid {
    margin-top: 0.5rem;
  }
}

.requirement-item .score:empty::before {
  content: "0%";
  opacity: 0.5;
}

/* International Programs Section Styles */
.international-programs-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

.international-programs-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.international-programs-content .link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1a237e;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.international-programs-content .link-btn:hover {
  background: #283593;
  transform: translateY(-2px);
}

.international-programs-info {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
  color: #1a237e;
}

.international-programs-info i {
  color: #1a237e;
  font-size: 1.2rem;
}
</style> 