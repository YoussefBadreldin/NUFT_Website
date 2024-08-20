<template>
    <div>
        <HeaderComponent />
        <br>
        <h2>!أهلا بيك</h2>
        <p><strong>أنا مساعدك الشخصي</strong></p>
        <p>يرجى إدخال البيانات التالية بدقة لمعرفة الكليات التي تناسب مجموعك</p>
        <br>
        <div class="form-group">
            <label for="percentage">ادخل مجموعك بالنسبة المئوية (بعد المعادلة)</label>
            <input type="number" id="percentage" v-model="percentage" placeholder="أدخل النسبة المئوية">
        </div>

        <div class="form-group">
            <label for="certificateType">اختر نوع شهادتك</label>
            <select id="certificateType" v-model="selectedCertificate">
                <option value="secondary_general">الثانوية العامة المصرية</option>
                <option value="stem_nile">ستم والنيل</option>
                <option value="azhar_secondary">الثانوية الأزهرية</option>
                <option value="arabic_foreign">شهادة عربية أو أجنبية</option>
            </select>
        </div>

        <div class="form-group">
            <label for="year">اختر سنة الحصول</label>
            <select id="year" v-model="selectedYear">
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>
        </div>

        <div>
            <button @click="search">بحث</button>
        </div>

        <div v-if="matchingFaculties.length" class="result">
            <p>الكليات التي تناسب مجموعك:</p>
            <ul>
                <li v-for="faculty in matchingFaculties" :key="faculty.name">
                    {{ faculty.name }}
                </li>
            </ul>
        </div>

        <br>
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue'; 

export default {
    name: 'MainComponent',
    components: {
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            percentage: null,
            selectedCertificate: '',
            selectedYear: '',
            matchingFaculties: [],  // Holds the list of faculties that meet the criteria
        };
    },
    methods: {
        search() {
            // Define the minimum scores for each faculty and institution
            const facultyScores = {
                'كلية الطب البشري': {
                    '2024': {
                        'private_universities_except_sinai': 85,
                        'specific_universities': 83,
                        'king_salman_sina': 81
                    },
                    '2023': {
                        'private_universities_except_sinai': 90,
                        'specific_universities': 85,
                        'king_salman_sina': 83
                    }
                },
                'كلية التمريض': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية تكنولوجيا العلوم الصحية': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية الفنون': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية الإعلام': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية الآثار': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية الحقوق': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية السياحة': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية الاقتصاد والإدارة': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية العلوم السينمائية': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية العلوم الأساسية': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية التكنولوجيا الحيوية': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية التربية': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية اللغات والترجمة': {
                    '2024': 58,
                    '2023': 58
                },
                'كلية العلوم الاجتماعية': {
                    '2024': 58,
                    '2023': 58
                }
            };

            // Clear previous results
            this.matchingFaculties = [];

            // Determine the relevant scores based on user input
            const minScore = facultyScores[this.selectedCertificate] && facultyScores[this.selectedCertificate][this.selectedYear] || 0;

            for (const [faculty, scores] of Object.entries(facultyScores)) {
                let score = minScore;

                if (faculty === 'كلية الطب البشري') {
                    if (this.selectedCertificate === 'arabic_foreign') {
                        if (this.selectedYear === '2024') {
                            if (['private_universities_except_sinai', 'specific_universities', 'king_salman_sina'].includes(this.selectedInstitution)) {
                                score = scores[this.selectedInstitution];
                            }
                        } else if (this.selectedYear === '2023') {
                            if (['private_universities_except_sinai', 'specific_universities', 'king_salman_sina'].includes(this.selectedInstitution)) {
                                score = scores[this.selectedInstitution];
                            }
                        }
                    }
                } else {
                    score = scores[this.selectedYear];
                }

                if (this.percentage >= score) {
                    this.matchingFaculties.push({ name: faculty });
                }
            }
        }
    }
};
</script>

<style scoped>
/* Form Group Styles */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Button Styles */
button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    margin-right: 10px; /* Add space between buttons */
}

button:hover {
    background-color: #0056b3;
}

/* Result Styles */
.result {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
}

/* Details Styles */
.details {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f0f0f0;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .carousel-item img {
        height: 40vh; /* Set height as a percentage of the viewport height */
        object-fit: cover; /* Ensure image covers the area without distortion */
    }
}
</style>
