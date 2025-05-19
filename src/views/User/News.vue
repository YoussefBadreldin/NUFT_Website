<template>
  <div>
    <header-component />

    <!-- Page Title -->
    <div class="page-header" dir="rtl">
      <h2>الأخبار</h2>
    </div>

    <!-- News Container -->
    <div class="news-container" dir="rtl">
      <div class="container">
        <div class="news-timeline">
          <!-- News items go here -->
          <div class="news-item" v-for="news in sortedNews" :key="news.id">
            <div class="news-date-box">
              <div class="date-content">
                <span class="day">{{ news.news_day }}</span>
                <span class="month">{{ news.news_month }}</span>
                <span class="year">{{ news.news_year }}</span>
              </div>
            </div>
            <div class="news-content-box">
              <div class="news-image">
                <img 
                  :src="news.news_photo" 
                  :alt="news.news_title" 
                  v-if="news.news_photo"
                  @error="handleImageError" 
                />
                <img 
                  v-else 
                  src="/images/default-news.png" 
                  alt="صورة الخبر" 
                  class="default-image"
                />
              </div>
              <div class="news-details">
                <h4><a :href="news.news_link" target="_blank">{{ news.news_title }}</a></h4>
                <p>{{ news.news_details }}</p>
                <a :href="news.news_link" class="read-more" target="_blank">
                  اقرأ المزيد
                  <span class="arrow">←</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer-component />
    <smartAssistantComponent />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
  name: 'NewsPage',
  components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
  },
  data() {
    return {
      newsData: []
    };
  },
  computed: {
    sortedNews() {
      return this.newsData.slice().sort((a, b) => {
        const dateA = new Date(a.news_year, this.getMonthIndex(a.news_month), a.news_day);
        const dateB = new Date(b.news_year, this.getMonthIndex(b.news_month), b.news_day);
        return dateB - dateA;
      });
    }
  },
  methods: {
    async getNews() {
      try {
        const response = await axios.get('https://nuft-website-backend.vercel.app/news/getNews');
        this.newsData = response.data.map(news => ({
          id: news.id,
          news_title: news.news_title,
          news_photo: news.news_photo,
          news_day: news.news_day,
          news_month: news.news_month,
          news_year: news.news_year,
          news_details: news.news_details,
          news_link: news.news_link
        }));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    },
    getMonthIndex(monthName) {
      const months = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
      return months.indexOf(monthName);
    },
    handleImageError(event) {
      event.target.src = '../../../images/default-news.png';
    }
  },
  created() {
    this.getNews();
  }
};
</script>

<style scoped>
.page-header {
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h2 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
  color: #1a237e;
}

.news-container {
  padding: 2rem 0;
  background-color: #f8f9fa;
  min-height: calc(100vh - 300px);
  font-family: 'Cairo', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.news-timeline {
  position: relative;
  padding: 2rem 0;
}

.news-timeline::before {
  content: '';
  position: absolute;
  right: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #e0e0e0;
}

.news-item {
  display: flex;
  margin-bottom: 3rem;
  position: relative;
}

.news-date-box {
  width: 120px;
  flex-shrink: 0;
  margin-left: 2rem;
  position: relative;
}

.news-date-box::after {
  content: '';
  position: absolute;
  right: -2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  background-color: #1a237e;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px #1a237e;
}

.date-content {
  background-color: #1a237e;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-content .day {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.date-content .month {
  display: block;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.date-content .year {
  display: block;
  font-size: 0.9rem;
  opacity: 0.9;
}

.news-content-box {
  flex-grow: 1;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.news-content-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.news-image {
  width: 300px;
  flex-shrink: 0;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-content-box:hover .news-image img {
  transform: scale(1.05);
}

.news-details {
  padding: 1.5rem;
  flex-grow: 1;
}

.news-details h4 {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
}

.news-details h4 a {
  color: #1a237e;
  text-decoration: none;
  transition: color 0.3s ease;
}

.news-details h4 a:hover {
  color: #283593;
}

.news-details p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  text-align: right;
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: #1a237e;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #283593;
}

.read-more .arrow {
  margin-right: 0.5rem;
  transition: transform 0.3s ease;
}

.read-more:hover .arrow {
  transform: translateX(-5px);
}

@media (max-width: 992px) {
  .news-timeline::before {
    right: 120px;
  }

  .news-content-box {
    flex-direction: column;
  }

  .news-image {
    width: 100%;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .page-header h2 {
    font-size: 2rem;
  }

  .news-timeline::before {
    display: none;
  }

  .news-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .news-date-box {
    margin-left: 0;
    margin-bottom: 1rem;
  }

  .news-date-box::after {
    display: none;
  }

  .news-content-box {
    width: 100%;
  }
}
</style>
