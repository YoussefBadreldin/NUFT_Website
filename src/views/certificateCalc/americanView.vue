<template>
    <div>
        <!-- Head Section -->
        <header-component />
        <!-- Page Title -->
        <div class="page-nav row">
            <h2>American Diploma</h2>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="/CertificatesCalculator"><i class="fas fa-chevron-right"></i> Certificates Calculator</a></li>
                <li><i class="fas fa-chevron-right"></i> <a href="/CertificatesCalculator/American">American Diploma</a></li>
            </ul>
        </div>

        <!-- Body Section -->
        <div class="container mt-md-5 mt-3 mb-4">
            <div class="row">
                <div class="col-md-6 col-12">
                    <div class="block p-4 mb-4 bg-white rounded-lg border">
                        <h3 style="text-align: center;"><strong>Calculate Your Score</strong></h3>
                        <div class="form-group">
                            <label for="Exam">Exam:</label>
                            <select class="custom-select w-auto d-block" v-model="selectedExam" @change="showSuitable">
                                <option value="1">SAT</option>
                                <option value="2">ACT</option>
                            </select>
                        </div>

                        <!-- SAT score form -->
                        <div v-if="selectedExam === '1'" class="score-form">
                            <div class="form-group">
                                <label for="sat1">SAT 1 score:</label>
                                <input type="number" v-model="sat1" placeholder="Out of 1600" max="1600" step="10" class="form-control w-auto" required>
                            </div>
                            <div class="form-group">
                                <label for="sat2">SAT 2 score:</label>
                                <input type="number" v-model="sat2" placeholder="Out of 1600" max="1600" step="10" class="form-control w-auto" required>
                            </div>
                            <div class="form-group">
                                <label for="gpa">GPA score:</label>
                                <input type="number" v-model="gpa" placeholder="Out of 40" max="40" class="form-control w-auto" required>
                            </div>
                        </div>

                        <!-- ACT score form -->
                        <div v-if="selectedExam === '2'" class="score-form">
                            <div class="form-group">
                                <label for="english">English:</label>
                                <input type="number" v-model="english" placeholder="Out of 36" max="36" step="1" class="form-control w-auto" required>
                            </div>
                            <div class="form-group">
                                <label for="reading">Reading:</label>
                                <input type="number" v-model="reading" placeholder="Out of 36" max="36" step="1" class="form-control w-auto" required>
                            </div>
                            <div class="form-group">
                                <label for="math">Math:</label>
                                <input type="number" v-model="math" placeholder="Out of 36" max="36" class="form-control w-auto" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="meth">Calculation method:</label>
                            <select class="custom-select w-auto d-block" v-model="calculationMethod" required>
                                <option value="1">Public Universities</option>
                                <option value="2">Private & National Universities</option>
                                <option value="3">Higher Institutes</option>
                            </select>
                        </div>

                        <div class="row mx-0 justify-content-center">
                            <button class="btn border mr-2 mt-2" @click="calculateScore">Calculate score</button>
                            <input type="text" v-model="totalScore" readonly class="form-control d-inline-block w-auto text-center mt-2" placeholder="Your total score">
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-12">
                    <div class="block bg-white p-4 mb-md-0 mb-4 rounded-lg border">
                        <h3 style="text-align: center;"><strong>Important Notes</strong></h3>
                        <p v-for="(note, index) in notes" :key="index">{{ note }}</p>
                    </div>
                </div>
            </div>
        </div>
        <smart-assistant />
        <footer-component />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import SmartAssistant from '../../../public/global/smartAssistant.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name:"americanView",
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent,
    },
    data() {
        return {
            selectedExam: '1', // default to SAT
            sat1: '',
            sat2: '',
            gpa: '',
            english: '',
            reading: '',
            math: '',
            calculationMethod: '1', // default to Public Universities
            totalScore: '',
            notes: [
                // Add your notes here
                'Note 1',
                'Note 2',
                'Note 3'
            ]
        };
    },
    methods: {
        showSuitable() {
            // Method to toggle SAT/ACT score form visibility
            // The method is not necessary since v-if handles the visibility
        },
        calculateScore() {
            let n1 = parseFloat(this.sat1);
            let n2 = parseFloat(this.sat2);
            let n3 = parseFloat(this.gpa);

            if (this.selectedExam === '1' && !isNaN(n1) && !isNaN(n2) && !isNaN(n3)) {
                if (this.calculationMethod === '1') {
                    if (n1 >= 1050) {
                        if (n2 >= 1100) {
                            this.totalScore = (n1 >= 1090) ? (n1 * 69 / 1600 + n2 * 15 / 1600 + n3) : (n1 * 60 / 1600 + n2 * 15 / 1600 + n3);
                        } else {
                            this.totalScore = (n1 >= 1090) ? (n1 * 69 / 1600 + n3) : (n1 * 60 / 1600 + n3);
                        }
                    } else {
                        this.totalScore = "You must get at least 1050 score";
                    }
                } else if (this.calculationMethod === '3') {
                    if (n1 >= 890) {
                        if (n2 >= 900) {
                            this.totalScore = (n1 >= 1090) ? (n1 * 69 / 1600 + n2 * 15 / 1600 + n3) : (n1 * 60 / 1600 + n2 * 15 / 1600 + n3);
                        } else {
                            this.totalScore = (n1 >= 1090) ? (n1 * 69 / 1600 + n3) : (n1 * 60 / 1600 + n3);
                        }
                    } else {
                        this.totalScore = "You must get at least 890 score";
                    }
                } else {
                    // Handle other calculation methods
                }
            } else if (this.selectedExam === '2') {
                let n11 = parseFloat(this.english);
                let n22 = parseFloat(this.reading);
                let n33 = parseFloat(this.math);

                if (!isNaN(n11) && !isNaN(n22) && !isNaN(n33)) {
                    // Calculate ACT total score here
                    this.totalScore = "ACT total score calculation not implemented";
                } else {
                    this.totalScore = "Please fill in all the ACT scores";
                }
            } else {
                this.totalScore = "Please select an exam and fill in all required fields";
            }
        }
    }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
