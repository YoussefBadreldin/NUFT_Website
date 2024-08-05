<template>
    <div>

        <header-component />

        <!-- Page Title -->
        <div class="page-nav row">
            <h2>IGCSE</h2>
            <ul>
                <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
                <li><router-link to="/CertificatesCalculator"><i class="fas fa-chevron-right"></i> Equivalent Certificates Calculator</router-link></li>
                <li><router-link to="/CertificatesCalculator/IGCSE"><i class="fas fa-chevron-right"></i> IGCSE</router-link></li>
            </ul>
        </div>

        <!-- Body -->
        <div class="container mt-md-5 mt-3 mb-4">
            <div class="row">
                <!-- Score Calculation Section -->
                <div class="col-md-6 col-12">
                    <div class="block p-4 mb-4 bg-white rounded-lg border">
                        <h3 class="text-center"><strong>Calculate Your Score</strong></h3>
                        <div id="igcse" class="score-form">
                            <!-- IGCSE score form -->
                            <div class="form-group">
                                <label for="igcse1">IGCSE / O-Level:</label>
                                <br>
                                <select v-model="igcseALevels">
                                    <option v-for="n in 9" :key="n">{{ n }} A*</option>
                                </select>
                                <select v-model="igcseALevels">
                                    <option v-for="n in 9" :key="n">{{ n }} A</option>
                                </select>
                                <select v-model="igcseBLevels">
                                    <option v-for="n in 9" :key="n">{{ n }} B</option>
                                </select>
                                <select v-model="igcseCLevels">
                                    <option v-for="n in 9" :key="n">{{ n }} C</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="igcse2">IGCSE / O-Level:</label>
                                <br>
                                <select v-model="igcse9Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 9</option>
                                </select>
                                <select v-model="igcse8Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 8</option>
                                </select>
                                <select v-model="igcse7Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 7</option>
                                </select>
                                <select v-model="igcse6Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 6</option>
                                </select>
                                <select v-model="igcse5Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 5</option>
                                </select>
                                <select v-model="igcse4Levels">
                                    <option v-for="n in 9" :key="n">{{ n }} 4</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="as">AS Levels:</label>
                                <br>
                                <select v-model="asALevels">
                                    <option v-for="n in 5" :key="n">{{ n }} A</option>
                                </select>
                                <select v-model="asBLevels">
                                    <option v-for="n in 5" :key="n">{{ n }} B</option>
                                </select>
                                <select v-model="asCLevels">
                                    <option v-for="n in 5" :key="n">{{ n }} C</option>
                                </select>
                                <select v-model="asDLevels">
                                    <option v-for="n in 5" :key="n">{{ n }} D</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="a">A Levels:</label>
                                <br>
                                <select v-model="aALevels">
                                    <option v-for="n in 4" :key="n">{{ n }} A*</option>
                                </select>
                                <select v-model="aALevels">
                                    <option v-for="n in 4" :key="n">{{ n }} A</option>
                                </select>
                                <select v-model="aBLevels">
                                    <option v-for="n in 4" :key="n">{{ n }} B</option>
                                </select>
                                <select v-model="aCLevels">
                                    <option v-for="n in 4" :key="n">{{ n }} C</option>
                                </select>
                                <select v-model="aDLevels">
                                    <option v-for="n in 5" :key="n">{{ n }} D</option>
                                </select>
                            </div>

                            <div class="row mx-0 justify-content-center">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="withFactor" v-model="withFactor">
                                    <label class="form-check-label" for="withFactor">With factor?</label>
                                </div>
                                <input type="text" id="sportsBonusPercentage" readonly class="form-control d-inline-block w-auto text-center mt-2" placeholder="Sports Bonus Percentage">
                            </div>

                            <div class="row mx-0 justify-content-center">
                                <button class="btn border mr-2 mt-2" @click="calculateScore">Calculate score</button>
                                <input type="text" v-model="scorePercentage" readonly class="form-control d-inline-block w-auto text-center mt-2" placeholder="Score percentage: {{ scorePercentage }} %">
                                <input type="text" v-model="governmentScore" readonly class="form-control d-inline-block w-auto text-center mt-2" placeholder="Government Score: {{ governmentScore }} / 410">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Important Notes -->
                <div class="col-md-6 col-12">
                    <div class="block bg-white p-4 mb-md-0 mb-4 rounded-lg border">
                        <h3 style="text-align: center;"><strong>Important Notes</strong></h3>
                        <p>
                            <strong>For Public universities:</strong>
                            <ul style="font-size: 0.8em;">
                                <li>- </li>
                                <li>- </li>
                                <li>- </li>
                                <li>- </li>
                            </ul>
                        </p>
                        <p>
                            <strong><br>For private & national universities:</strong>
                            <ul style="font-size: 0.8em;">
                                <li>- </li>
                                <li>- </li>
                                <li>- </li>
                            </ul>
                        </p>
                        <p>
                            <strong><br>For higher institutes:</strong>
                            <ul style="font-size: 0.8em;">
                                <li>- </li>
                                <li>- </li>
                            </ul>
                        </p>
                        <p>
                            <strong><br>General notes:</strong>
                            <ul style="font-size: 0.8em;">
                                <li>- </li>
                                <li>- </li>
                                <li>- </li>
                                <li>- </li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <smart-assistant />
        <footer-component />
    </div>
</template>

<script>
import HeaderComponent from "../../../public/global/headerComponent.vue";
import SmartAssistant from "../../../public/global/smartAssistant.vue";
import FooterComponent from "../../../public/global/footerComponent.vue";

export default {
    name: 'IGCSECalculator',
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent,
    },
    data() {
        return {
            igcseALevels: [0, 0, 0, 0],
            igcseBLevels: [0, 0, 0, 0],
            igcseCLevels: [0, 0, 0, 0],
            igcse9Levels: [0, 0, 0, 0, 0],
            igcse8Levels: [0, 0, 0, 0, 0],
            igcse7Levels: [0, 0, 0, 0, 0],
            igcse6Levels: [0, 0, 0, 0, 0],
            igcse5Levels: [0, 0, 0, 0, 0],
            igcse4Levels: [0, 0, 0, 0, 0],
            asALevels: [0, 0, 0, 0],
            asBLevels: [0, 0, 0, 0],
            asCLevels: [0, 0, 0, 0],
            asDLevels: [0, 0, 0, 0, 0],
            aALevels: [0, 0, 0, 0],
            aBLevels: [0, 0, 0, 0],
            aCLevels: [0, 0, 0, 0],
            aDLevels: [0, 0, 0, 0, 0],
            withFactor: false,
            sportsBonusPercentage: '',
            scorePercentage: '',
            governmentScore: '',
        };
    },
    methods: {
        calculateScore() {
            // Implement your score calculation logic here
            // Example logic:
            //let totalScore = 0;
            // Calculate total score based on selected levels and factors
            // Assign to this.scorePercentage and this.governmentScore
        },
    },
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
