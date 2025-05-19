<template>
    <div>
        <HeaderComponent />

        <div class="container" dir="rtl">
            <div class="page-header">
                <h2>حالة التقديمات</h2>
            </div>

            <div class="status-tabs">
                <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    :class="['tab-button', { active: activeTab === tab.id }]"
                    @click="activeTab = tab.id"
                >
                    {{ tab.name }}
                </button>
            </div>

            <div class="universities-grid" v-if="!isLoading">
                <div v-for="(pair, index) in pairedUniversities" :key="index" class="university-pair-card">
                    <div class="pair-header">
                        <h3>
                            <a :href="pair[0].guide_Url" target="_blank" class="university-link">
                                {{ pair[0].university_Arabic_Name }}
                            </a>
                        </h3>
                    </div>
                    
                    <div class="status-container">
                        <div class="status-section">
                            <div class="status-item">
                                <span class="status-label">التحويل</span>
                                <div class="status-values single-column">
                                    <span class="status-value" :class="getStatusClass(pair[0].transfer_status)">
                                        {{ pair[0].transfer_status }}
                                    </span>
                                    <span class="status-value" :class="getStatusClass(pair[1].transfer_status)">
                                        آخر موعد: {{ pair[1].transfer_status }}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="status-item">
                                <span class="status-label">الثانوية العامة وستيم والنيل</span>
                                <div class="status-values">
                                    <div class="year-column">
                                        <span class="year-label">{{ firstYear }}</span>
                                        <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_firstYear_status)">
                                            {{ pair[0].thanwyaa_firstYear_status }}
                                        </span>
                                        <span class="status-value" :class="getStatusClass(pair[1].thanwyaa_firstYear_status)">
                                            آخر موعد: {{ pair[1].thanwyaa_firstYear_status }}
                                        </span>
                                    </div>
                                    <div class="year-column">
                                        <span class="year-label">{{ secondYear }}</span>
                                        <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_secondYear_status)">
                                            {{ pair[0].thanwyaa_secondYear_status }}
                                        </span>
                                        <span class="status-value" :class="getStatusClass(pair[1].thanwyaa_secondYear_status)">
                                            آخر موعد: {{ pair[1].thanwyaa_secondYear_status }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="status-item">
                                <span class="status-label">الثانوية الأزهرية</span>
                                <div class="status-values">
                                    <div class="year-column">
                                        <span class="year-label">{{ firstYear }}</span>
                                        <span class="status-value" :class="getStatusClass(pair[0].azhar_firstYear_status)">
                                            {{ pair[0].azhar_firstYear_status }}
                                        </span>
                                        <span class="status-value" :class="getStatusClass(pair[1].azhar_firstYear_status)">
                                            آخر موعد: {{ pair[1].azhar_firstYear_status }}
                                        </span>
                                    </div>
                                    <div class="year-column">
                                        <span class="year-label">{{ secondYear }}</span>
                                        <span class="status-value" :class="getStatusClass(pair[0].azhar_secondYear_status)">
                                            {{ pair[0].azhar_secondYear_status }}
                                        </span>
                                        <span class="status-value" :class="getStatusClass(pair[1].azhar_secondYear_status)">
                                            آخر موعد: {{ pair[1].azhar_secondYear_status }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="status-item">
                                <span class="status-label">الشهادات العربية والإجنبية</span>
                                <div class="status-values">
                                    <div class="year-column">
                                        <span class="year-label">{{ firstYear }}</span>
                                        <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_firstYear_status)">
                                            {{ pair[0].Arabenglish_firstYear_status }}
                                        </span>
                                        <span class="status-value" :class="getStatusClass(pair[1].Arabenglish_firstYear_status)">
                                            آخر موعد: {{ pair[1].Arabenglish_firstYear_status }}
                                        </span>
                                    </div>
                                    <div class="year-column">
                                        <span class="year-label">{{ secondYear }}</span>
                                        <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_secondYear_status)">
                                            {{ pair[0].Arabenglish_secondYear_status }}
                                        </span>
                                        <span class="status-value" :class="getStatusClass(pair[1].Arabenglish_secondYear_status)">
                                            آخر موعد: {{ pair[1].Arabenglish_secondYear_status }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="status-item">
                                <span class="status-label">الوافدين</span>
                                <div class="status-values single-column">
                                    <span class="status-value" :class="getStatusClass(pair[0].wafdeen_status)">
                                        {{ pair[0].wafdeen_status }}
                                    </span>
                                    <span class="status-value" :class="getStatusClass(pair[1].wafdeen_status)">
                                        آخر موعد: {{ pair[1].wafdeen_status }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-text">جاري التحميل...</p>
            </div>

            <p class="update-notice">يتم تحديث حالة تقديم الجامعات بشكل دوري●</p>
        </div>

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
    name: "AdmissionStatus",
    components: {
        HeaderComponent,
        FooterComponent,
        smartAssistantComponent
    },
    data() {
        return {
            activeTab: 'national',
            firstYear: '',
            secondYear: '',
            universities: [],
            all_data: [],
            isLoading: false,
            tabs: [
                { id: 'national', name: 'الجامعات الأهلية' },
                { id: 'private', name: 'الجامعات الخاصة' },
                { id: 'special', name: 'الجامعات ذات طبيعة خاصة' },
                { id: 'international', name: 'الجامعات الأجنبية' }
            ]
        }
    },
    computed: {
        pairedUniversities() {
            const pairs = [];
            for (let i = 0; i < this.universities.length; i += 2) {
                pairs.push(this.universities.slice(i, i + 2));
            }
            return pairs;
        }
    },
    methods: {
        getStatusClass(status) {
            if (status.includes('انتهي')) {
                return 'status-ended';
            } else if (status.includes('متاح')) {
                return 'status-available';
            } else if (status.includes('لم يبدأ')) {
                return 'status-not-started';
            }
            return '';
        },
        async getAdmission() {
            this.isLoading = true;
            const endpoints = {
                national: 'https://nuft-website-backend.vercel.app/nationaladmission/get',
                private: 'https://nuft-website-backend.vercel.app/privateadmission/get',
                special: 'https://nuft-website-backend.vercel.app/specialadmission/get',
                international: 'https://nuft-website-backend.vercel.app/internationaladmission/get'
            };

            try {
                const response = await axios.get(endpoints[this.activeTab]);
                this.universities = response.data.map(university => ({
                    ...university,
                    guide_guide_Url: university.guide_guide_Url || '#',
                }));
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
        async getYears() {
            const endpoints = {
                national: 'https://nuft-website-backend.vercel.app/nationallinks/get_nationallinks',
                private: 'https://nuft-website-backend.vercel.app/privatelinks/get_privatelinks',
                special: 'https://nuft-website-backend.vercel.app/speciallinks/get_speciallinks',
                international: 'https://nuft-website-backend.vercel.app/internationallinks/get_internationallinks'
            };

            try {
                const response = await axios.get(endpoints[this.activeTab]);
                this.all_data = response.data;
                this.firstYear = this.all_data[0].first_year;
                this.secondYear = this.all_data[0].second_year;
            } catch (error) {
                console.log(error);
            }
        }
    },
    watch: {
        activeTab() {
            this.getAdmission();
            this.getYears();
        }
    },
    created() {
        this.getAdmission();
        this.getYears();
    }
};
</script>

<style scoped>
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Cairo', sans-serif;
}

.page-header {
    text-align: center;
    margin-bottom: 2rem;
}

.page-header h2 {
    color: #2c3e50;
    font-size: 2rem;
    margin: 0;
    font-weight: 700;
}

.status-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.tab-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    background-color: #f8f9fa;
    color: #2c3e50;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Cairo', sans-serif;
}

.tab-button:hover {
    background-color: #e9ecef;
}

.tab-button.active {
    background-color: #2c3e50;
    color: white;
}

.universities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.university-pair-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.pair-header {
    background-color: #2c3e50;
    padding: 1rem;
    text-align: center;
}

.pair-header h3 {
    margin: 0;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
}

.university-link {
    color: white;
    text-decoration: none;
    transition: color 0.2s ease;
}

.university-link:hover {
    color: #3498db;
}

.status-container {
    padding: 1.5rem;
}

.status-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.status-item {
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
}

.status-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.status-label {
    display: block;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 0.75rem;
    font-size: 1rem;
}

.status-values {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.year-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.year-label {
    font-weight: bold;
    color: #666;
    text-align: center;
    padding: 0.25rem;
    background-color: #f8f9fa;
    border-radius: 4px;
}

.status-value {
    padding: 0.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
    text-align: center;
}

.status-ended {
    background-color: #ffebee;
    color: #c62828;
}

.status-available {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.status-not-started {
    background-color: #f3e5f5;
    color: #6a1b9a;
}

.update-notice {
    text-align: center;
    color: #666;
    font-style: italic;
    margin-top: 2rem;
}

.status-values.single-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 300px;
    margin: 0 auto;
}

@media (max-width: 1200px) {
    .universities-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .status-values {
        grid-template-columns: 1fr;
    }
    
    .page-header h2 {
        font-size: 1.5rem;
    }

    .status-tabs {
        flex-wrap: wrap;
    }

    .tab-button {
        width: 100%;
    }
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: 1rem;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #2c3e50;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-text {
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 500;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>