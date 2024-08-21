<template>
    <div>
        <!-- Head Section -->
        <header-component />

        <!-- Page Title -->
        <div class="page-nav row justify-content-center">
            <h2 class="text-center">معادلة الدبلومة الامريكية</h2>
        </div>

        <!-- قسم المحتوى -->
        <div class="container mt-md-5 mt-3 mb-4">
            <div class="row justify-content-center">
                <div class="col-md-6 col-12">
                    <div class="block p-4 mb-4 bg-white rounded-lg border">
                        <div class="form-group">
                            <label for="Exam">:الامتحان</label>
                            <select class="custom-select w-auto d-block mx-auto" v-model="selectedExam" @change="showSuitable">
                                <option value="1">SAT</option>
                                <option value="2">ACT</option>
                            </select>
                        </div>

                        <!-- نموذج درجات SAT -->
                        <div v-if="selectedExam === '1'" class="score-form">
                            <div class="form-group text-center">
                                <label for="sat1"> :SAT 1 درجة</label>
                                <input type="number" v-model="sat1" placeholder="من 1600" max="1600" step="10" class="form-control w-auto d-block mx-auto" required>
                            </div>
                            <div class="form-group text-center">
                                <label for="sat2"> :SAT 2 درجة</label>
                                <input type="number" v-model="sat2" placeholder="من 1600" max="1600" step="10" class="form-control w-auto d-block mx-auto" required>
                            </div>
                            <div class="form-group text-center">
                                <label for="gpa">:(GPA) درجة المعدل التراكمي</label>
                                <input type="number" v-model="gpa" placeholder="من 40" max="40" class="form-control w-auto d-block mx-auto" required>
                            </div>
                        </div>

                        <!-- نموذج درجات ACT -->
                        <div v-if="selectedExam === '2'" class="score-form">
                            <div class="form-group text-center">
                                <label for="english">:الإنجليزية</label>
                                <input type="number" v-model="english" placeholder="من 36" max="36" step="1" class="form-control w-auto d-block mx-auto" required>
                            </div>
                            <div class="form-group text-center">
                                <label for="reading">:القراءة</label>
                                <input type="number" v-model="reading" placeholder="من 36" max="36" step="1" class="form-control w-auto d-block mx-auto" required>
                            </div>
                            <div class="form-group text-center">
                                <label for="math">:الرياضيات</label>
                                <input type="number" v-model="math" placeholder="من 36" max="36" class="form-control w-auto d-block mx-auto" required>
                            </div>
                        </div>

                        <div class="form-group text-center">
                            <label for="meth">:طريقة الحساب</label>
                            <select class="custom-select w-auto d-block mx-auto" v-model="calculationMethod" required>
                                <option value="1">الجامعات الحكومية</option>
                                <option value="2">الجامعات الخاصة والاهلية</option>
                                <option value="3">المعاهد العليا</option>
                            </select>
                        </div>

                        <div class="row mx-0 justify-content-center">
                            <button class="btn border mr-2 mt-2" @click="calculateScore">احسب المجموع</button>
                            <input type="text" v-model="totalScore" readonly class="form-control d-inline-block w-auto text-center mt-2 mx-2" placeholder="مجموعك الكلي">
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
    name:"americanView",
    components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
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
                'ملاحظة 1',
                'ملاحظة 2',
                'ملاحظة 3'
            ]
        };
    },
    methods: {
        showSuitable() {
            // Method to toggle SAT/ACT score form visibility
            // The method is not necessary since v-if handles the visibility
        },
        calculateScore() {
            // Your calculation logic here
        }
    }
};
</script>

<style scoped>
.page-nav {
    width: 100%;
}

h2 {
    text-align: center;
}

.block {
    text-align: center;
}

.custom-select {
    display: block;
    margin: 0 auto;
}

.form-group label {
    display: block;
    text-align: center;
}

.score-form {
    margin-bottom: 15px;
}
</style>
