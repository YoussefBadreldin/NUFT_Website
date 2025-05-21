<template>
    <div>
        <header-component />

        <div class="admission-admin-container" dir="rtl">
            <!-- Category Tabs -->
            <div class="type-tabs">
                <button 
                    v-for="type in universityTypes" 
                    :key="type.value"
                    :class="['type-tab', { active: selectedType === type.value }]"
                    @click="selectedType = type.value"
                >
                    {{ type.label }}
                </button>
            </div>

            <div class="section-container">
                <div class="section-header">
                    <div class="search-bar">
                        <input 
                            type="text" 
                            v-model="searchQuery" 
                            placeholder="ابحث عن جامعة..."
                            @input="filterUniversities"
                        >
                    </div>
                </div>

                <div v-if="loading" class="loading-state">
                    <div class="spinner"></div>
                    <p>جاري التحميل...</p>
                </div>
                
                <div v-else-if="filteredUniversities.length === 0" class="no-results">
                    <i class="fas fa-university"></i>
                    <p>لا توجد جامعات</p>
                </div>
                
                <div v-else class="universities-grid">
                    <div v-for="university in filteredUniversities" :key="university.id" class="university-card">
                        <div class="university-header">
                            <div class="university-title">
                                <div class="university-logo" v-if="universityLinks[university.university]?.university_Logo">
                                    <img :src="universityLinks[university.university].university_Logo" :alt="university.university_Arabic_Name">
                                </div>
                                <h3 @click="toggleUniversity(university.id)" class="university-name-toggle">
                                    {{ university.university_Arabic_Name }}
                                </h3>
                            </div>
                            <div class="dropdown-icon" :class="{ 'expanded': expandedUniversityId === university.id }">
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>
                        
                        <div class="university-content" v-show="expandedUniversityId === university.id">
                            <div class="status-sections">
                                <!-- Transfer Status -->
                                <div class="status-box">
                                    <h4>التحويل</h4>
                                    <div class="status-row">
                                        <div class="status-item">
                                            <p>الحالة: {{ university.transfer_status }}</p>
                                            <p>آخر موعد: {{ formatDate(university.transfer_deadline) }}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Thanawya Status -->
                                <div class="status-box">
                                    <h4>الثانوية العامة</h4>
                                    <div class="status-row">
                                        <div class="status-item">
                                            <h5>السنة الأولي</h5>
                                            <p><span>الحالة: <br> {{ university.thanwyaa_firstYear_status }}</span></p>
                                            <p><span>آخر موعد: <br> {{ formatDate(university.thanwyaa_firstYear_deadline) }}</span></p>
                                        </div>
                                        <div class="status-item">
                                            <h5>السنة الثانية</h5>
                                            <p><span>الحالة: <br> {{ university.thanwyaa_secondYear_status }}</span></p>
                                            <p><span>آخر موعد: <br> {{ formatDate(university.thanwyaa_secondYear_deadline) }}</span></p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Azhar Status -->
                                <div class="status-box">
                                    <h4>الثانوية الأزهرية</h4>
                                    <div class="status-row">
                                        <div class="status-item">
                                            <h5>السنة الأولي</h5>
                                            <p><span>الحالة: <br> {{ university.azhar_firstYear_status }}</span></p>
                                            <p><span>آخر موعد: <br> {{ formatDate(university.azhar_firstYear_deadline) }}</span></p>
                                        </div>
                                        <div class="status-item">
                                            <h5>السنة الثانية</h5>
                                            <p><span>الحالة: <br> {{ university.azhar_secondYear_status }}</span></p>
                                            <p><span>آخر موعد: <br> {{ formatDate(university.azhar_secondYear_deadline) }}</span></p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Arab/English Status -->
                                <div class="status-box">
                                    <h4>الشهادات العربية والإجنبية</h4>
                                    <div class="status-row">
                                        <div class="status-item">
                                            <h5>السنة الأولي</h5>
                                            <p><span>الحالة: <br> {{ university.Arabenglish_firstYear_status }}</span></p>
                                            <p><span>آخر موعد: <br> {{ formatDate(university.Arabenglish_firstYear_deadline) }}</span></p>
                                        </div>
                                        <div class="status-item">
                                            <h5>السنة الثانية</h5>
                                            <p><span>الحالة: <br> {{ university.Arabenglish_secondYear_status }}</span></p>
                                            <p><span>آخر موعد: <br> {{ formatDate(university.Arabenglish_secondYear_deadline) }}</span></p>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Wafdeen Status -->
                                <div class="status-box">
                                    <h4>الوافدين</h4>
                                    <div class="status-row">
                                        <div class="status-item">
                                            <p>الحالة: {{ university.wafdeen_status }}</p>
                                            <p>آخر موعد: {{ formatDate(university.wafdeen_deadline) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer-component />
        <smartAssistantComponent />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
    name: 'AdmissionStatusAdmin',
    components: {
        HeaderComponent,
        FooterComponent,
        smartAssistantComponent
    },
    data() {
        return {
            selectedType: 'private',
            universities: [],
            universityStatuses: [],
            universityDeadlines: [],
            universityLinks: {},
            loading: true,
            searchQuery: '',
            filteredUniversities: [],
            expandedUniversityId: null,
            universityTypes: [
                { label: 'الجامعات الخاصة', value: 'private' },
                { label: 'الجامعات الأهلية', value: 'national' },
                { label: 'الجامعات الدولية', value: 'international' },
                { label: 'الجامعات ذات طبيعة خاصة', value: 'special' }
            ]
        };
    },
    methods: {
        async fetchData() {
            this.loading = true;
            const statusEndpoints = {
                national: 'https://nuft-website-backend.vercel.app/national/admission',
                private: 'https://nuft-website-backend.vercel.app/private/admission',
                special: 'https://nuft-website-backend.vercel.app/special/admission',
                international: 'https://nuft-website-backend.vercel.app/international/admission'
            };

            const deadlineEndpoints = {
                national: 'https://nuft-website-backend.vercel.app/national/deadline',
                private: 'https://nuft-website-backend.vercel.app/private/deadline',
                special: 'https://nuft-website-backend.vercel.app/special/deadline',
                international: 'https://nuft-website-backend.vercel.app/international/deadline'
            };
  
            const linkEndpoints = {
                national: 'https://nuft-website-backend.vercel.app/national/links',
                private: 'https://nuft-website-backend.vercel.app/private/links',
                special: 'https://nuft-website-backend.vercel.app/special/links',
                international: 'https://nuft-website-backend.vercel.app/international/links'
            };

            try {
                const [statusResponse, deadlineResponse, linksResponse] = await Promise.all([
                    axios.get(statusEndpoints[this.selectedType]),
                    axios.get(deadlineEndpoints[this.selectedType]),
                    axios.get(linkEndpoints[this.selectedType])
                ]);
          
                this.universityStatuses = statusResponse.data;
                this.universityDeadlines = deadlineResponse.data;
          
                // Merge status and deadline data
                this.universities = this.universityStatuses.map(status => {
                    const deadline = this.universityDeadlines.find(d => d.university === status.university) || {};
                    return {
                        ...status,
                        transfer_deadline: deadline.transfer_deadline,
                        thanwyaa_firstYear_deadline: deadline.thanwyaa_firstYear_deadline,
                        thanwyaa_secondYear_deadline: deadline.thanwyaa_secondYear_deadline,
                        azhar_firstYear_deadline: deadline.azhar_firstYear_deadline,
                        azhar_secondYear_deadline: deadline.azhar_secondYear_deadline,
                        Arabenglish_firstYear_deadline: deadline.Arabenglish_firstYear_deadline,
                        Arabenglish_secondYear_deadline: deadline.Arabenglish_secondYear_deadline,
                        wafdeen_deadline: deadline.wafdeen_deadline
                    };
                });
          
                this.filteredUniversities = this.universities;
          
                // Create a map of university links using university code as key
                this.universityLinks = linksResponse.data.reduce((acc, link) => {
                    acc[link.university] = link;
                    return acc;
                }, {});
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('حدث خطأ أثناء جلب البيانات');
            } finally {
                this.loading = false;
            }
        },
  
        filterUniversities() {
            if (!this.searchQuery) {
                this.filteredUniversities = this.universities;
                return;
            }
            const query = this.searchQuery.toLowerCase();
            this.filteredUniversities = this.universities.filter(university => 
                university.university_Arabic_Name.toLowerCase().includes(query)
            );
        },
  
        toggleUniversity(universityId) {
            if (this.expandedUniversityId === universityId) {
                this.expandedUniversityId = null;
            } else {
                this.expandedUniversityId = universityId;
            }
        },
  
        formatDate(dateString) {
            if (!dateString) return 'غير محدد';
            return dateString;
        }
    },
    watch: {
        selectedType() {
            this.fetchData();
        }
    },
    created() {
        this.fetchData();
    }
};
</script>

<style scoped>
.admission-admin-container {
    padding: 2rem;
    background: #f8f9fa;
    min-height: calc(100vh - 300px);
    font-family: 'Cairo', sans-serif;
}

.type-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.type-tab {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
    color: #495057;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    min-width: 150px;
    text-align: center;
}

.type-tab:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: #f8f9fa;
}

.type-tab.active {
    background: linear-gradient(135deg, #001d3d, #4158d0);
    color: white;
}

.section-container {
    max-width: 1200px;
    margin: 0 auto;
}

.section-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1.5rem;
}

.search-bar input {
    padding: 0.5rem 1rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    width: 300px;
    font-size: 1rem;
}

.universities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.university-card {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.university-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
    cursor: default;
}

.university-header:hover {
    background-color: #f8f9fa;
}

.university-title {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.university-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #e9ecef;
    flex-shrink: 0;
}

.university-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.university-header h3 {
    margin: 0;
    color: #001d3d;
    font-size: 1.3rem;
}

.dropdown-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

.dropdown-icon.expanded {
    transform: rotate(180deg);
}

.dropdown-icon i {
    color: #001d3d;
    font-size: 1rem;
}

.university-content {
    transition: all 0.3s ease;
    overflow: hidden;
}

.university-content {
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.status-sections {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.status-box {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.status-box h4 {
    color: #001d3d;
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e9ecef;
    text-align: center;
}

.status-row {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.75rem;
}

.status-item {
    flex: 1;
    background: #f8f9fa;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.status-item h5 {
    color: #001d3d;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #dee2e6;
}

.status-item p {
    color: #495057;
    font-size: 0.9rem;
    margin: 0;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.35rem;
    background: white;
    border-radius: 4px;
    border: 1px solid #e9ecef;
    margin-bottom: 0.35rem;
}

.status-item p:before {
    content: "•";
    color: #4158d0;
    font-weight: bold;
    flex-shrink: 0;
    margin-top: 0.2rem;
}

.status-item p span {
    flex: 1;
}

.status-item p:last-child {
    margin-bottom: 0;
}

.loading-state {
    text-align: center;
    padding: 3rem;
    color: #6c757d;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4158d0;
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.no-results {
    text-align: center;
    padding: 3rem;
    color: #6c757d;
}

.no-results i {
    font-size: 3rem;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .admission-admin-container {
        padding: 1rem;
    }

    .section-header {
        flex-direction: column;
        gap: 1rem;
    }

    .search-bar input {
        width: 100%;
    }

    .type-tabs {
        flex-direction: column;
        width: 100%;
    }

    .type-tab {
        width: 100%;
    }

    .status-row {
        flex-direction: column;
    }
}

.university-name-toggle {
    cursor: pointer;
    transition: color 0.2s;
}

.university-name-toggle:hover {
    color: #4158d0;
}
</style>