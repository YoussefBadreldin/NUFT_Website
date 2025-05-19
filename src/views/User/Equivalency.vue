<template>
    <div>
        <HeaderComponent />

        <div class="page-header" dir="rtl">
            <h2>معادلة الشهادات</h2>
        </div>

        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <!-- Certificate Type Selection -->
                    <div class="form-group text-center mb-4">
                        <label for="certificateType" class="mb-3">اختر نوع الشهادة:</label>
                        <select 
                            v-model="selectedCertificate" 
                            class="form-control w-auto mx-auto"
                            @change="handleCertificateChange"
                        >
                            <option value="">-- اختر نوع الشهادة --</option>
                            <option value="american">الدبلومة الامريكية</option>
                            <option value="igcse">الثانوية البريطانية</option>
                            <option value="azhari" disabled>الثانوية الازهرية (قريبا)</option>
                            <option value="stem" disabled>الثانوية المصرية للمتفوقين STEM (قريبا)</option>
                            <option value="nile" disabled>ثانوية مدارس النيل الدولية (قريبا)</option>
                            <option value="saudi" disabled>الثانوية السعودية (قريبا)</option>
                            <option value="kuwaiti" disabled>الثانوية الكويتية (قريبا)</option>
                            <option value="bahraini" disabled>الثانوية البحرينية (قريبا)</option>
                        </select>
                    </div>

                    <!-- Dynamic Form Display -->
                    <div v-if="selectedCertificate" class="certificate-form">
                        <!-- American Diploma Form -->
                        <div v-if="selectedCertificate === 'american'">
                            <div class="form-group">
                                <label for="Exam">:الامتحان</label>
                                <select class="custom-select w-auto d-block mx-auto" v-model="americanData.selectedExam">
                                    <option value="1">SAT</option>
                                    <option value="2">ACT</option>
                                </select>
                            </div>

                            <!-- SAT Form -->
                            <div v-if="americanData.selectedExam === '1'" class="score-form">
                                <div class="form-group text-center">
                                    <label for="sat1"> :SAT 1 درجة</label>
                                    <input type="number" v-model="americanData.sat1" placeholder="من 1600" max="1600" step="10" class="form-control w-auto d-block mx-auto" required>
                                </div>
                                <div class="form-group text-center">
                                    <label for="sat2"> :SAT 2 درجة</label>
                                    <input type="number" v-model="americanData.sat2" placeholder="من 1600" max="1600" step="10" class="form-control w-auto d-block mx-auto" required>
                                </div>
                                <div class="form-group text-center">
                                    <label for="gpa">:(GPA) درجة المعدل التراكمي</label>
                                    <input type="number" v-model="americanData.gpa" placeholder="من 40" max="40" class="form-control w-auto d-block mx-auto" required>
                                </div>
                            </div>

                            <!-- ACT Form -->
                            <div v-if="americanData.selectedExam === '2'" class="score-form">
                                <div class="form-group text-center">
                                    <label for="english">:الإنجليزية</label>
                                    <input type="number" v-model="americanData.english" placeholder="من 36" max="36" step="1" class="form-control w-auto d-block mx-auto" required>
                                </div>
                                <div class="form-group text-center">
                                    <label for="reading">:القراءة</label>
                                    <input type="number" v-model="americanData.reading" placeholder="من 36" max="36" step="1" class="form-control w-auto d-block mx-auto" required>
                                </div>
                                <div class="form-group text-center">
                                    <label for="math">:الرياضيات</label>
                                    <input type="number" v-model="americanData.math" placeholder="من 36" max="36" class="form-control w-auto d-block mx-auto" required>
                                </div>
                            </div>
                        </div>

                        <!-- IGCSE Form -->
                        <div v-if="selectedCertificate === 'igcse'" class="score-form">
                            <div class="form-group">
                                <label for="igcse1">IGCSE / O-Level:</label>
                                <br>
                                <select v-model="igcseData.igcseALevels">
                                    <option v-for="n in 9" :key="n">{{ n }} A*</option>
                                </select>
                                <select v-model="igcseData.igcseALevels">
                                    <option v-for="n in 9" :key="n">{{ n }} A</option>
                                </select>
                                <select v-model="igcseData.igcseBLevels">
                                    <option v-for="n in 9" :key="n">{{ n }} B</option>
                                </select>
                                <select v-model="igcseData.igcseCLevels">
                                    <option v-for="n in 9" :key="n">{{ n }} C</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="igcse2">IGCSE / O-Level:</label>
                                <br>
                                <select v-model="igcseData.igcse9Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 9</option>
                                </select>
                                <select v-model="igcseData.igcse8Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 8</option>
                                </select>
                                <select v-model="igcseData.igcse7Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 7</option>
                                </select>
                                <select v-model="igcseData.igcse6Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 6</option>
                                </select>
                                <select v-model="igcseData.igcse5Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 5</option>
                                </select>
                                <select v-model="igcseData.igcse4Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 4</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="as">AS Levels:</label>
                                <br>
                                <select v-model="igcseData.asALevels">
                                    <option v-for="n in 5" :key="n">{{ n }} A</option>
                                </select>
                                <select v-model="igcseData.asBLevels">
                                    <option v-for="n in 5" :key="n">{{ n }} B</option>
                                </select>
                                <select v-model="igcseData.asCLevels">
                                    <option v-for="n in 5" :key="n">{{ n }} C</option>
                                </select>
                                <select v-model="igcseData.asDLevels">
                                    <option v-for="n in 5" :key="n">{{ n }} D</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="a">A Levels:</label>
                                <br>
                                <select v-model="igcseData.aALevels">
                                    <option v-for="n in 4" :key="n">{{ n }} A*</option>
                                </select>
                                <select v-model="igcseData.aALevels">
                                    <option v-for="n in 4" :key="n">{{ n }} A</option>
                                </select>
                                <select v-model="igcseData.aBLevels">
                                    <option v-for="n in 4" :key="n">{{ n }} B</option>
                                </select>
                                <select v-model="igcseData.aCLevels">
                                    <option v-for="n in 4" :key="n">{{ n }} C</option>
                                </select>
                                <select v-model="igcseData.aDLevels">
                                    <option v-for="n in 5" :key="n">{{ n }} D</option>
                                </select>
                            </div>
                        </div>

                        <!-- Common Elements for Both Forms -->
                        <div class="row mx-0 justify-content-center mt-4">
                            <button class="btn border mr-2" @click="calculateScore">احسب المجموع</button>
                            <input type="text" v-model="totalScore" readonly class="form-control d-inline-block w-auto text-center" placeholder="مجموعك الكلي">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <FooterComponent />
        <smartAssistantComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
    name: 'Equivalency',
    components: {
        HeaderComponent,
        FooterComponent,
        smartAssistantComponent
    },
    data() {
        return {
            selectedCertificate: '',
            totalScore: '',
            americanData: {
                selectedExam: '1',
                sat1: '',
                sat2: '',
                gpa: '',
                english: '',
                reading: '',
                math: '',
                calculationMethod: '1'
            },
            igcseData: {
                igcseALevels: 0,
                igcseBLevels: 0,
                igcseCLevels: 0,
                igcse9Levels: 0,
                igcse8Levels: 0,
                igcse7Levels: 0,
                igcse6Levels: 0,
                igcse5Levels: 0,
                igcse4Levels: 0,
                asALevels: 0,
                asBLevels: 0,
                asCLevels: 0,
                asDLevels: 0,
                aALevels: 0,
                aBLevels: 0,
                aCLevels: 0,
                aDLevels: 0,
                withFactor: false
            }
        };
    },
    methods: {
        handleCertificateChange() {
            this.totalScore = '';
        },
        calculateScore() {
            if (this.selectedCertificate === 'american') {
                this.calculateAmericanScore();
            } else if (this.selectedCertificate === 'igcse') {
                this.calculateIGCSEScore();
            }
        },
        calculateAmericanScore() {
            // Implement American score calculation logic
            let score = 0;
            if (this.americanData.selectedExam === '1') {
                // SAT calculation
                score = ((parseFloat(this.americanData.sat1) + parseFloat(this.americanData.sat2)) / 3200) * 100;
                score += (parseFloat(this.americanData.gpa) / 40) * 100;
            } else {
                // ACT calculation
                score = ((parseFloat(this.americanData.english) + 
                         parseFloat(this.americanData.reading) + 
                         parseFloat(this.americanData.math)) / 108) * 100;
            }
            this.totalScore = score.toFixed(2);
        },
        calculateIGCSEScore() {
            // Implement IGCSE score calculation logic
            let totalScore = 0;
            
            // Calculate IGCSE scores
            totalScore += (this.igcseData.igcseALevels * 8 + 
                          this.igcseData.igcseBLevels * 7 + 
                          this.igcseData.igcseCLevels * 6);
            
            totalScore += (this.igcseData.igcse9Levels * 9 + 
                          this.igcseData.igcse8Levels * 8 + 
                          this.igcseData.igcse7Levels * 7 + 
                          this.igcseData.igcse6Levels * 6 + 
                          this.igcseData.igcse5Levels * 5 + 
                          this.igcseData.igcse4Levels * 4);
            
            // Calculate AS Level scores
            totalScore += (this.igcseData.asALevels * 5 + 
                          this.igcseData.asBLevels * 4 + 
                          this.igcseData.asCLevels * 3 + 
                          this.igcseData.asDLevels * 2);
            
            // Calculate A Level scores
            totalScore += (this.igcseData.aALevels * 5 + 
                          this.igcseData.aBLevels * 4 + 
                          this.igcseData.aCLevels * 3 + 
                          this.igcseData.aDLevels * 2);
            
            this.totalScore = totalScore.toFixed(2);
        }
    }
};
</script>

<style scoped>
.page-header {
    padding: 2rem 0;
    text-align: center;
    margin-bottom: 2rem;
}

.page-header h2 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Cairo', sans-serif;
    color: #1a237e;
}

.container {
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.form-group {
    margin-bottom: 2rem;
}

.form-group label {
    display: block;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1a237e;
}

.form-control {
    display: inline-block;
    width: auto;
    min-width: 200px;
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    text-align: right;
}

.form-control:focus {
    border-color: #1a237e;
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
    outline: none;
}

select {
    margin: 0 0.5rem;
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: right;
    direction: rtl;
}

select:focus {
    border-color: #1a237e;
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
    outline: none;
}

.certificate-form {
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    margin-bottom: 3rem;
    direction: rtl;
}

.score-form {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    margin-top: 2rem;
    direction: rtl;
}

.btn {
    min-width: 150px;
    padding: 0.75rem 1.5rem;
    background: #1a237e;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Cairo', sans-serif;
}

.btn:hover {
    background: #283593;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

input[readonly] {
    background-color: #f8f9fa;
    border: 2px solid #e0e0e0;
    color: #1a237e;
    font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
    .page-header h2 {
        font-size: 2rem;
    }

    .certificate-form {
        padding: 1.5rem;
    }

    .form-control, select {
        width: 100%;
        margin: 0.5rem 0;
    }

    .btn {
        width: 100%;
        margin-top: 1rem;
    }
}

/* Animation for form elements */
.form-control, select, .btn {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Custom select styling */
select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: left 1rem center;
    background-size: 1em;
    padding-left: 2.5rem;
}

/* Disabled option styling */
select option:disabled {
    color: #999;
    background-color: #f5f5f5;
}

/* Hover effects */
.form-control:hover, select:hover {
    border-color: #1a237e;
}

/* Focus styles */
.form-control:focus, select:focus {
    border-color: #1a237e;
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
}
</style> 