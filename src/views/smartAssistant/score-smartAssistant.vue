<template>
    <div>
        <HeaderComponent />
        <h2>!أهلا بك</h2>
        <p><strong>أنا مساعدك الشخصي</strong></p>
        <p>يرجى إدخال البيانات التالية بدقة لمعرفة الكليات التي تناسب مجموعك</p>
        <br>
        <div class="form-group">
            <label for="percentage">ادخل مجموعك بالنسبة المئوية (بعد المعادلة)</label>
            <input type="number" id="percentage" v-model="percentage" placeholder="أدخل النسبة المئوية">
        </div>

        <div class="form-group">
            <label for="certificate">اختر نوع شهادتك</label>
            <select id="certificate" v-model="selectedCertificate">
                <option value="secondary_general">الثانوية العامة المصرية</option>
                <option value="stem_nile">ستم والنيل</option>
                <option value="azhar_secondary">الثانوية الأزهرية</option>
                <option value="arabic_foreign">شهادة عربية أو أجنبية</option>
            </select>
        </div>

        <div>
            <button @click="search">بحث</button>
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
            selectedCertificate: ''
        };
    },
    methods: {
        search() {
            // Define your search logic here
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
}

button:hover {
    background-color: #0056b3;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .carousel-item img {
        height: 40vh; /* Set height as a percentage of the viewport height */
        object-fit: cover; /* Ensure image covers the area without distortion */
    }
}
</style>
