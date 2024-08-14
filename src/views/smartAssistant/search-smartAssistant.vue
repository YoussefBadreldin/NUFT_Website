<template>
    <div>
        <HeaderComponent />
        <br>
        <h2>!أهلا بيك</h2>
        <p><strong>أنا مساعدك الشخصي</strong></p>
        <p>يرجى إدخال البيانات التالية بدقة للبحث عن الجامعة</p>
        <br>
        <div class="form-group">
            <label for="universityName">اسم الجامعة (باللغة العربية)</label>
            <input type="text" id="universityName" v-model="universityName" placeholder="أدخل اسم الجامعة">
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
            universityName: '',      // Holds the university name input
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
            // Mapping Arabic names to routes
            const universityRoutes = {
                'جامعة العلمين': '/Guide/UGRAD/National/AIU',
                'جامعة القاهرة': '/guide/undergrad/national/cu',
                'جامعة الإسكندرية': '/guide/undergrad/national/alex',
                // Add more mappings as needed
            };

            // Find the route based on the university name
            const route = universityRoutes[this.universityName.trim()];

            if (route) {
                this.$router.push(route);  // Navigate to the mapped route
            } else {
                this.result = 'الجامعة غير موجودة في قاعدة البيانات';
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
