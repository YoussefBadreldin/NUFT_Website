<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">
      <img src="../../../images/logo.png" alt="شعار NUFT - دليلك إلى الجامعات المصرية" class="d-inline-block align-top" />
    </a>
  </nav>

  <div class="wrapper">
    <div class="title">
      <div v-html="mode === 'signup' ? 'ابدأ رحلتك مع<br>أول دليل شامل عن الجامعات المصرية' : 'يرجى تسجيل الدخول'"></div>
    </div>

        <form @submit.prevent="handleSubmit">
            <div class="field">
                <input type="email" required v-model="email">
                <label>البريد الالكتروني</label>
            </div>
            <div class="field">
                <input type="password" required v-model="password">
                <label>كلمة المرور</label>
            </div>
            <div class="field">
                <button type="submit" class="btn btn-primary">
                    {{ mode === 'signup' ? 'انشئ الحساب' : 'تسجيل الدخول' }}
                </button>
            </div>
            <div class="signup-link">
                {{ mode === 'signup' ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟' }}
                <a href="#" @click.prevent="toggleMode">
                    {{ mode === 'signup' ? 'قم بتسجيل الدخول هنا' : 'أنشئ حسابك الان' }}
                </a>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AuthForm",
    data() {
        return {
            email: '',
            password: '',
            mode: 'signin' // Initial mode is signin
        };
    },
    components: {
    },
    methods: {
        handleSubmit() {
            if (this.mode === 'signup') {
                this.signUp();
            } else {
                this.signIn();
            }
        },
        signUp() {
            axios.post('https://nuft-website-backend.vercel.app/auth/signup', {
                email: this.email,
                password: this.password
            }).then(response => {
                console.log('User created successfully:', response.data);
                // Optionally, switch mode after successful signup
                this.mode = 'signin';
            }).catch(error => {
                if (error.response && error.response.status === 500) {
                    alert('Email is already registered');
                } else {
                    console.error('Error creating user:', error);
                }
            });
        },

        signIn() {
            axios.post('https://nuft-website-backend.vercel.app/auth/signin', {
                email: this.email,
                password: this.password,
            }).then(() => {
                console.log('Logged in successfully');
                this.$router.push('/Home'); // Redirect to Home upon successful login
                localStorage.setItem('name', this.email); // Store user's name in local storage
            }).catch(error => {
                if (error.response && error.response.status === 404) {
                    alert('User not found');
                } else if (error.response && error.response.status === 401) {
                    alert('Incorrect email or password');
                } else {
                    console.error('Error with login:', error);
                }
            });
        },

        toggleMode() {
            // Toggle between signup and signin modes
            this.mode = this.mode === 'signup' ? 'signin' : 'signup';
        }
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

html, body {
    display: grid;
    height: 100%;
    width: 100%;
    place-items: center;
    background: #f5f5f5;
}

::selection {
    background: #001d3d;
    color: #fff;
}

.wrapper {
    width: 100%;
    max-width: 400px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin: auto;
    margin-top: 50px;
}

.wrapper .title {
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    line-height: 80px;
    color: #fff;
    border-radius: 10px 10px 0 0;
    background: linear-gradient(135deg, #001d3d, #4158d0);
}

.wrapper form {
    padding: 20px;
}

.wrapper form .field {
    margin-bottom: 20px;
    position: relative;
}

.wrapper form .field input,
.wrapper form .field select {
    width: 100%;
    height: 45px;
    padding-left: 15px;
    border: 1px solid #ccc;
    border-radius: 25px;
    font-size: 16px;
    outline: none;
    background: #fff;
    transition: border-color 0.3s ease;
}

.wrapper form .field input:focus,
.wrapper form .field input:valid,
.wrapper form .field select:focus {
    border-color: #4158d0;
}

.wrapper form .field label {
    position: absolute;
    top: 50%;
    left: 15px;
    color: #999;
    font-size: 16px;
    pointer-events: none;
    transform: translateY(-50%);
    transition: all 0.3s ease;
}

.wrapper form .field input:focus ~ label,
.wrapper form .field input:valid ~ label,
.wrapper form .field select:focus ~ label,
.wrapper form .field select:valid ~ label {
    top: -10px;
    font-size: 14px;
    color: #4158d0;
    background: #fff;
    padding: 0 5px;
}

.wrapper form .btn-primary,
.wrapper form .btn-secondary {
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 25px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.wrapper form .btn-primary {
    background: linear-gradient(135deg, #001d3d, #4158d0);
}

.wrapper form .btn-primary:hover {
    background: linear-gradient(135deg, #003a5d, #334d9b);
}

.wrapper form .btn-secondary {
    background: #f5f5f5;
    color: #001d3d;
}

.wrapper form .btn-secondary:hover {
    background: #ddd;
}

.wrapper form .signup-link {
    color: #666;
    text-align: center;
}

.wrapper form .signup-link a {
    color: #4158d0;
    text-decoration: none;
}

.wrapper form .signup-link a:hover {
    text-decoration: underline;
}

.input-group {
    display: flex;
    gap: 10px;
}

.input-group select,
.input-group input[type="tel"] {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 25px;
    padding-left: 15px;
    font-size: 16px;
    outline: none;
    background: #fff;
    transition: border-color 0.3s ease;
}

.input-group select:focus,
.input-group input[type="tel"]:focus {
    border-color: #4158d0;
}
/* Add a wrapper around the checkbox and label for better control */
.checkbox-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 20px; /* Adjust spacing as needed */
}

.checkbox-wrapper input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 5px;
    width: 20px;
    height: 20px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.checkbox-wrapper input[type="checkbox"]:checked {
    background-color: #4158d0;
    border-color: #4158d0;
}

.checkbox-wrapper input[type="checkbox"]:checked::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 5px;
    border: solid #fff;
    border-width: 0 0 2px 2px;
    transform: translate(-50%, -50%) rotate(-45deg);
}

.checkbox-wrapper label {
    margin-left: 10px;
    font-size: 16px;
    color: #333;
}
/* Add a wrapper around each checkbox and its label */
.checkbox-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px; /* Adjust spacing as needed */
}

.checkbox-group input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 5px;
    width: 20px;
    height: 20px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.checkbox-group input[type="checkbox"]:checked {
    background-color: #4158d0;
    border-color: #4158d0;
}

.checkbox-group input[type="checkbox"]:checked::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 5px;
    border: solid #fff;
    border-width: 0 0 2px 2px;
    transform: translate(-50%, -50%) rotate(-45deg);
}

.checkbox-group label {
    margin-left: 10px;
    font-size: 16px;
    color: #333;
    cursor: pointer; /* Change cursor to pointer for better user interaction */
}
.navbar {
  display: flex;
  justify-content: center; /* Center the logo horizontally */
}

.navbar-brand {
  display: flex;
  align-items: center; /* Center the logo vertically */
}

.logo-center {
  margin: 0 auto; /* Auto margin to center the logo */
}
  .navbar {
    background-color: #001d3d !important;
  }
  footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 20px;
  z-index: 1000; /* Ensures the footer stays above other content */
}
.groupcheckbox-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligns items to the left */
  gap: 10px; /* Adds spacing between items */
}

.groupcheckbox-title {
  font-weight: bold;
  margin-bottom: 10px; /* Space between title and checkboxes */
}

.groupcheckbox-item {
  display: flex;
  align-items: center;
}

.error {
  color: red;
  font-size: 0.875em; /* Adjust size as needed */
  margin-top: 0.25em;
}
</style>