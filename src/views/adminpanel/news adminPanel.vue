<template>
  <div class="parent">
    <!-- Login Form -->
    <div v-if="!isAuthenticated" class="login-form">
      <h1 class="header-title">الاخبار</h1>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>

    <!-- Admin Panel -->
    <div v-if="isAuthenticated">
      <h1 class="header-title">NUFT Admin Panel</h1>
      <h1 class="header-title">الاخبار</h1>

      <div class="form-section">
        <h2 class="section-title">Add News</h2>
        <form @submit.prevent="addNews">
          <div class="form-group">
            <label for="news_title">Title:</label>
            <input type="text" v-model="news_title" id="news_title" required>
          </div>
          <div class="form-group">
            <label for="news_photo">Logo URL (/images/Logos/NEWS/.png):</label>
            <input type="text" v-model="news_photo" id="news_photo">
          </div>
          <div class="form-group">
            <label for="news_day">Day (number):</label>
            <input type="number" v-model="news_day" id="news_day" min="1" max="31" required>
          </div>
          <div class="form-group">
            <label for="news_month">Month (name in arabic):</label>
            <input type="text" v-model="news_month" id="news_month" required>
          </div>
          <div class="form-group">
            <label for="news_year">Year (number):</label>
            <input type="number" v-model="news_year" id="news_year" min="1900" max="2099" required>
          </div>
          <div class="form-group">
            <label for="news_link">Link (/Guide/UGRAD/ or https://):</label>
            <input type="text" v-model="news_link" id="news_link" required>
          </div>
          <div class="form-group">
            <label for="news_details">Details:</label>
            <textarea id="news_details" v-model="news_details" cols="30" rows="10"></textarea>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminPanel',
  data() {
    return {
      username: '',
      password: '',
      isAuthenticated: false,
      news_title: '',
      news_photo: '',
      news_day: '',
      news_month: '',
      news_year: '',
      news_link: '',
      news_details: '',
    };
  },
  methods: {
    handleLogin() {
      // Simple hardcoded authentication check
      if (this.username === 'admin' && this.password === 'admin') {
        this.isAuthenticated = true;
      } else {
        alert('Invalid username or password');
      }
    },
    addNews() {
      const formData = {
        news_title: this.news_title,
        news_photo: this.news_photo,
        news_day: this.news_day,
        news_month: this.news_month,
        news_year: this.news_year,
        news_details: this.news_details,
        news_link: this.news_link
      };
      axios.post('https://nuft-website-backend.vercel.app/news/addNews', formData)
        .then(() => {
          console.log('News added successfully');
          alert('News added successfully');
          // Reset form fields
          this.news_title = '';
          this.news_photo = '';
          this.news_day = '';
          this.news_month = '';
          this.news_year = '';
          this.news_link = '';
          this.news_details = '';
        })
        .catch(error => {
          console.error('Error adding news:', error);
          alert('Error adding news');
        });
    }
  }
};
</script>

<style scoped>
.parent {
  margin: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.header-title {
  color: #ffbf00;
  font-weight: bold;
}

.login-form h2 {
  margin-bottom: 20px;
}

.login-form form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.login-form .form-group {
  margin-bottom: 15px;
}

.login-form label {
  margin-bottom: 5px;
}

.login-form input[type="text"], 
.login-form input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.login-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #45a049;
}

/* Admin Panel styles */
.form-section {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.section-title {
  color: #ff0000;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"], 
input[type="number"], 
input[type="url"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
