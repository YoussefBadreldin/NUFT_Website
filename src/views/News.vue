<template>
  <div>
    <header-component />

    <!-- Page Title -->
    <div class="page-nav row">
      <h2>الاخبار</h2>
    </div>

    <!-- Cards Box -->
    <div class="our-blog bb3 pc2">
      <div class="container">
        <div class="row-news row">
          <div class="col-md-10 vbf mx-auto">
            <!-- News cards go here -->
            <div class="news-card row" v-for="news in sortedNews" :key="news.id">
              <div class="col-2">
                <div class="date-box">
                  <span>{{ news.news_day }}</span>
                  <p>{{ news.news_month }}</p>
                  <small>{{ news.news_year }}</small>
                </div>
              </div>
              <div class="col-7 setv">
                <h4><a :href="news.news_link" target="_blank">{{ news.news_title }}</a></h4>
                <p>{{ news.news_details }}</p>
                <a :href="news.news_link" class="btn btn-primary" target="_blank">تفاصيل</a>
              </div>
              <div class="col-3 img-cv">
                <img :src="news.news_photo" :alt="news.news_title" v-if="news.news_photo" />
                <!-- Optionally show a placeholder if the image is missing -->
                <img v-if="!news.news_photo" src="path/to/placeholder-image.png" alt="Placeholder Image" />
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
import HeaderComponent from '../../public/global/headerComponent.vue';
import FooterComponent from '../../public/global/footerComponent.vue';

export default {
  name: 'NewsPage',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      newsData: [] // This will hold the news items fetched from the API
    };
  },
  computed: {
    sortedNews() {
      // Sort newsData array based on year, month, and day in descending order (newest first)
      return this.newsData.slice().sort((a, b) => {
        const dateA = new Date(a.news_year, this.getMonthIndex(a.news_month), a.news_day);
        const dateB = new Date(b.news_year, this.getMonthIndex(b.news_month), b.news_day);
        return dateB - dateA; // Descending order
      });
    }
  },
  methods: {
    async getNews() {
      try {
        const response = await axios.get('https://nuft-website-backend-874bbf91403c.herokuapp.com/news/getNews');
        this.newsData = response.data.map(news => ({
          id: news.id, // Ensure each news item has a unique ID
          news_title: news.news_title,
          news_photo: news.news_photo,
          news_day: news.news_day,
          news_month: news.news_month,
          news_year: news.news_year,
          news_details: news.news_details,
          news_link: news.news_link // Added news_link field
        }));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    },
    getMonthIndex(monthName) {
      const months = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
      return months.indexOf(monthName);
    }
  },
  created() {
    this.getNews(); // Fetch news data when the component is created
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
</style>
