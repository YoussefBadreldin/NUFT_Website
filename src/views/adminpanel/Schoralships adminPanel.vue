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
    <div v-if="isAuthenticated">
      <h1 class="header-title">NUFT Admin Panel</h1>
      <h1 class="header-title">المنح الدراسية</h1>

      <div class="form-section">
        <h2 class="section-title">Add Scholarship</h2>
        <form @submit.prevent="addScholarship">
          <div class="form-group">
            <label for="scholarship_name">Name:</label>
            <input type="text" v-model="scholarship_name" id="scholarship_name" required>
          </div>
          <div class="form-group">
            <label for="scholarship_description">Description:</label>
            <textarea id="scholarship_description" v-model="scholarship_description" cols="30" rows="5"></textarea>
          </div>
          <div class="form-group">
            <label for="scholarship_image">Image URL:</label>
            <input type="text" v-model="scholarship_image" id="scholarship_image">
          </div>
          <div class="form-group">
            <label for="scholarship_type">Type:</label>
            <input type="text" v-model="scholarship_type" id="scholarship_type" required>
          </div>
          <div class="form-group">
            <label for="scholarship_amount">Amount:</label>
            <input type="number" v-model="scholarship_amount" id="scholarship_amount" required>
          </div>
          <div class="form-group">
            <label for="scholarship_deadline">Deadline:</label>
            <input type="date" v-model="scholarship_deadline" id="scholarship_deadline" required>
          </div>
          <div class="form-group">
            <label for="scholarship_criteria">Criteria:</label>
            <textarea id="scholarship_criteria" v-model="scholarship_criteria" cols="30" rows="5"></textarea>
          </div>
          <div class="form-group">
            <label for="scholarship_link">Link:</label>
            <input type="text" v-model="scholarship_link" id="scholarship_link" required>
          </div>
          <div class="form-group">
            <label for="scholarship_status">Status:</label>
            <input type="text" v-model="scholarship_status" id="scholarship_status" required>
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
      scholarship_name: '',
      scholarship_description: '',
      scholarship_image: '',
      scholarship_type: '',
      scholarship_amount: '',
      scholarship_deadline: '',
      scholarship_criteria: '',
      scholarship_link: '',
      scholarship_status: '',
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
        scholarship_name: this.scholarship_name,
        scholarship_description: this.scholarship_description,
        scholarship_image: this.scholarship_image,
        scholarship_type: this.scholarship_type,
        scholarship_amount: this.scholarship_amount,
        scholarship_deadline: this.scholarship_deadline,
        scholarship_criteria: this.scholarship_criteria,
        scholarship_link: this.scholarship_link,
        scholarship_status: this.scholarship_status
      };
      axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/scholarships/addScholarship', formData)
        .then(() => {
          console.log('Scholarship added successfully');
          alert('Scholarship added successfully');
          // Reset form fields
          this.scholarship_name = '';
          this.scholarship_description = '';
          this.scholarship_image = '';
          this.scholarship_type = '';
          this.scholarship_amount = '';
          this.scholarship_deadline = '';
          this.scholarship_criteria = '';
          this.scholarship_link = '';
          this.scholarship_status = '';
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
.login-form input[type="number"],
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
input[type="url"], 
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
