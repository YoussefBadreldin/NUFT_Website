<template>
  <div class="parent">
    <!-- Login Form -->
    <div v-if="!isAuthenticated" class="login-form">
    <h1 style="color: #ffbf00; font-weight: bold;">المنح</h1>
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
      <h1 style="color: #001d3d; font-weight: bold;">NUFT Admin Panel</h1>

      <h1 style="color: #ffbf00; font-weight: bold;">المنح</h1>
      <br>
      
      <form @submit.prevent="Schoralshipsfunction">
      <h1>Add Schoralships</h1>
        <div class="form-group">
          <label for="Schoralships">Schoralships Details:</label>
          <textarea id="Schoralships" v-model="Schoralships" cols="30" rows="10"></textarea>
        </div>
        <br>
        <button type="submit">Add</button>
      </form>
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
      Schoralships: '',
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
    Schoralshipsfunction() {
      const form = {
        text: this.Schoralships,
      };
      axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/Schoralships/addSchoralships', form)
        .then(() => {
          console.log('Schoralships sent successfully');
          alert('Schoralships sent successfully');
        })
        .catch(error => {
          console.log(error);
          alert('Error sending Schoralships');
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

.login-form h2 {
  margin-bottom: 20px;
}

.login-form form {
  display: flex;
  flex-direction: column;
  width: 300px;
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
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.form-section {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"] {
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