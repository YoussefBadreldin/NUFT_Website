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

        <div v-if="result" class="result">
            <p>{{ result }}</p>
            <p v-if="resultDetails">{{ resultDetails }}</p>
            <button v-if="result === 'الطب البشري'" @click="toggleDetails">تفاصيل</button>
        </div>

        <div v-if="showDetails" class="details">
            <p>هنا تفاصيل عن الطب البشري...</p>
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
            result: '',           // Holds the result message
            resultDetails: '',    // Holds additional result details
            showDetails: false    // Controls the visibility of details
        };
    },
    methods: {
        search() {
            if (this.percentage >= 74 && this.percentage <= 79 && this.selectedYear === '2024') {
                if (['secondary_general', 'stem_nile', 'azhar_secondary'].includes(this.selectedCertificate)) {
                    this.result = 'الطب البشري';
                    this.resultDetails = 'في جامعات ';
                } else {
                    this.result = 'لا يوجد تخصص مطابق';
                    this.resultDetails = '';
                }
            } else {
                this.result = 'المجموع أو السنة غير متوافقين';
                this.resultDetails = '';
            }
            this.showDetails = false;  // Hide details when performing a new search
        },
        toggleDetails() {
            this.showDetails = !this.showDetails;
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
