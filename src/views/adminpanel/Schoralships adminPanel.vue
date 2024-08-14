<template>
  <div class="parent">
    <!-- Login Form -->
    <div v-if="!isAuthenticated" class="login-form">
      <h1 class="header-title">المنح</h1>
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
    <div v-if="isAuthenticated" class="admin-panel">
      <h1 class="header-title">NUFT Admin Panel</h1>
      <h1 class="header-title">المنح الدراسية</h1>

      <div class="form-section">
        <h2 class="section-title">Add Scholarship</h2>
        <form @submit.prevent="addScholarship">
          <div class="form-group">
            <label for="scholarship_title">Title:</label>
            <input type="text" v-model="scholarship_title" id="scholarship_title" required>
          </div>
          <div class="form-group">
            <label for="scholarship_photo">Logo URL (/images/Logos/Scholarships/png):</label>
            <input type="text" v-model="scholarship_photo" id="scholarship_photo">
          </div>
          <div class="form-group">
            <label for="scholarship_details">Description:</label>
            <textarea id="scholarship_details" v-model="scholarship_details" cols="30" rows="5"></textarea>
          </div>
          <div class="form-group">
            <label for="scholarship_link">Link (https://):</label>
            <input type="text" v-model="scholarship_link" id="scholarship_link" required>
          </div>
          <div class="form-group">
            <label for="scholarship_type">Type (e.g., Full Scholarship):</label>
            <input type="text" v-model="scholarship_type" id="scholarship_type" required>
          </div>
          <div class="form-group">
            <label for="due_date">Due Date (Full in Arabic):</label>
            <input type="text" v-model="due_date" id="due_date" required>
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
      scholarship_title: '',
      scholarship_details: '',
      scholarship_photo: '',
      scholarship_type: '',
      due_date: '',
      scholarship_link: ''
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
    addScholarship() {
      const formData = {
        scholarship_title: this.scholarship_title,
        scholarship_details: this.scholarship_details,
        scholarship_photo: this.scholarship_photo,
        scholarship_type: this.scholarship_type,
        due_date: this.due_date,
        scholarship_link: this.scholarship_link
      };
      
      axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/Schoralships/add', formData)
        .then(() => {
          console.log('Scholarship added successfully');
          alert('Scholarship added successfully');
          // Reset form fields
          this.scholarship_title = '';
          this.scholarship_details = '';
          this.scholarship_photo = '';
          this.scholarship_type = '';
          this.due_date = '';
          this.scholarship_link = '';
        })
        .catch(error => {
          console.error('Error adding scholarship:', error);
          alert('Error adding scholarship');
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
.login-form input[type="password"], 
.login-form input[type="date"] {
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
.admin-panel {
  margin-top: 20px;
}

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
input[type="date"] {
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
