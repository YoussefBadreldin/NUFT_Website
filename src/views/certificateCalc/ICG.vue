<template>
    <div>
        <header-component />

        <div class="page-nav row justify-content-center">
            <h2>معادلة الثانوية البرطانية</h2>
        </div>

        <!-- Body -->
        <div class="container mt-md-5 mt-3 mb-4">
            <div class="row justify-content-center">
                <!-- Score Calculation Section -->
                <div class="col-md-6 col-12">
                    <div class="block p-4 mb-4 bg-white rounded-lg border">
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
                                <button class="btn border mr-2 mt-2" @click="calculateScore">احسب المجموع</button>
                                <input type="text" v-model="scorePercentage" readonly class="form-control d-inline-block w-auto text-center mt-2" placeholder="نسبة الدرجة">
                                <input type="text" v-model="governmentScore" readonly class="form-control d-inline-block w-auto text-center mt-2" placeholder="درجة الحكومة">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer-component />
    </div>
</template>

<script>
import HeaderComponent from "../../../public/global/headerComponent.vue";
import FooterComponent from "../../../public/global/footerComponent.vue";

export default {
    name: 'IGCSECalculator',
    components: {
        HeaderComponent,
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
.page-nav {
    text-align: center;
    width: 100.97%; /* Adjust as needed */
}

.container {
    text-align: center;
}

.block {
    margin: 0 auto;
}
</style>
