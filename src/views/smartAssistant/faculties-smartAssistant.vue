<template>
    <div>
        <HeaderComponent />
        <br>
        <h2>!أهلا بيك</h2>
        <p><strong>أنا مساعدك الشخصي</strong></p>
        <p>يرجى إدخال البيانات التالية بدقة لمعرفة الجامعات التي تحتوي علي كليات معينة</p>
        <br>

        <div class="form-group">
            <label for="facultySelect">اختر الكلية</label>
            <select id="facultySelect" v-model="selectedFaculty">
                <option value="medicine">الطب البشري</option>
                <option value="computer_science">علوم الحاسب</option>
                <option value="engineering">الهندسة</option>
                <!-- Add more options as needed -->
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
            selectedFaculty: '',  // Holds the selected faculty
            result: '',           // Holds the result message
            resultDetails: '',    // Holds additional result details
            showDetails: false    // Controls the visibility of details
        };
    },
    methods: {
        search() {
            // Example logic for demonstration. Adjust as needed.
            if (this.selectedFaculty) {
                this.result = 'تم العثور على التخصص';
                this.resultDetails = 'في جامعات ';
                this.$router.push(`/Guide/UGRAD/${this.selectedFaculty}`);
            } else {
                this.result = 'يرجى اختيار الكلية';
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
