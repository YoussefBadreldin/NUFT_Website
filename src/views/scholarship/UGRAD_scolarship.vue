<template>
  <div>
    <header-component />

    <!-- Page Title -->
    <div class="page-nav row">
      <h2>منح المرحلة الجامعية</h2>
    </div>

    <!-- Cards Box -->
    <div class="our-blog bb3 pc2">
      <div class="container">
        <div class="row-news row">
          <div class="col-md-10 vbf mx-auto">
            <!-- Scholarship cards go here -->
            <div class="news-card row" v-for="scholarship in sortedScholarships" :key="scholarship.id">
              <div class="col-2">
                <div class="date-box">
                  <p>{{ scholarship.scholarship_type }}</p>
                </div>
              </div>
              <div class="col-7 setv">
                <h4><a :href="scholarship.scholarship_link" target="_blank">{{ scholarship.scholarship_title }}</a></h4>
                <p>{{ scholarship.scholarship_details }}</p>
                <p class="due-date"><strong>اخر موعد للتقديم:</strong> {{ scholarship.due_date }}</p>
                <a :href="scholarship.scholarship_link" class="btn btn-primary" target="_blank">تفاصيل</a>
              </div>
              <div class="col-3 img-cv">
                <img :src="scholarship.scholarship_photo" :alt="scholarship.scholarship_title" v-if="scholarship.scholarship_photo" />
                <!-- Optionally show a placeholder if the image is missing -->
                <img v-if="!scholarship.scholarship_photo" src="path/to/placeholder-image.png" alt="Placeholder Image" />
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
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
  name: 'ScholarshipPage',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      scholarshipData: [] // This will hold the scholarship items fetched from the API
    };
  },
  computed: {
    sortedScholarships() {
      // Optionally sort the scholarshipData array based on due_date or any other criteria
      return this.scholarshipData.slice().sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    }
  },
  methods: {
    async getScholarships() {
      try {
        const response = await axios.get('https://nuft-website-backend-874bbf91403c.herokuapp.com/Schoralships/getSchoralships');
        this.scholarshipData = response.data.map(scholarship => ({
          id: scholarship.id, // Ensure each scholarship item has a unique ID
          scholarship_title: scholarship.scholarship_title,
          scholarship_photo: scholarship.scholarship_photo,
          scholarship_details: scholarship.scholarship_details,
          scholarship_link: scholarship.scholarship_link,
          scholarship_type: scholarship.scholarship_type,
          due_date: scholarship.due_date
        }));
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    }
  },
  created() {
    this.getScholarships(); // Fetch scholarship data when the component is created
  }
};
</script>

<style scoped>
.page-nav {
  width: 100%; /* Adjust as needed */
}

.img-cv img {
  width: 100%;
  height: auto; /* Maintain aspect ratio */
}

.btn-primary {
  display: inline-block;
  padding: 0.5em 1em;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.25em;
  text-decoration: none;
  text-align: center;
}

.scholarship-type {
  font-weight: bold;
  margin-top: 1em;
}

.due-date {
  margin-top: 0.5em;
}
.date-box {
  display: flex; /* Use flexbox for better control */
  align-items: center; /* Center align items vertically */
  justify-content: center; /* Center align items horizontally */
  width: 100%; /* Ensure the box uses full width */
  height: auto; /* Height adjusts based on content */
  padding: 0.5em; /* Add padding for better spacing */
  border: 1px solid #ccc; /* Optional: add a border */
  border-radius: 0.25em; /* Optional: round the corners */
  text-align: center; /* Center text inside the box */
  overflow-wrap: break-word; /* Allow long words to break and wrap to the next line */
  word-wrap: break-word; /* Ensure long words wrap to the next line */
}

.date-box p {
  margin: 0; /* Remove default margin */
  white-space: normal; /* Allow text to wrap */
  overflow: visible; /* Show overflowed text */
}

</style>
