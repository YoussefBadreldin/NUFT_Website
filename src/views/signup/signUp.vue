<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item navbar-brand">
          <a href="/Home">
            <img src="../../../images/logo.png" alt="Logo" class="d-inline-block align-top" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
    <div class="wrapper">
        <div class="title">
            {{ mode === 'signup' ? 'ابدأ الآن' : 'مرحباً بك مجدداً' }}
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
            axios.post('https://nuft-backend.onrender.com/auth/signup', {
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
            axios.post('https://nuft-backend.onrender.com/auth/signin', {
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
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

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
    background: #f2f2f2;
}

::selection {
    background: #4158d0;
    color: #fff;
}

.wrapper {
    width: 100%;
    max-width: 380px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 150px auto 100px auto; /* Top margin: 40px, Bottom margin: 60px */
}


.wrapper .title {
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    line-height: 100px;
    color: #fff;
    border-radius: 15px 15px 0 0;
    background: linear-gradient(-135deg, #ced2e1, #4158d0);
}

.wrapper form {
    padding: 20px 30px;
    margin-top: 20px;
}

.wrapper form .field {
    margin-top: 20px;
    position: relative;
}

.wrapper form .field input {
    width: 100%;
    height: 50px;
    padding-left: 20px;
    border: 1px solid lightgrey;
    border-radius: 25px;
    font-size: 17px;
    outline: none;
    transition: border-color 0.3s ease;
}

.wrapper form .field input:focus,
.wrapper form .field input:valid {
    border-color: #4158d0;
}

.wrapper form .field label {
    position: absolute;
    top: 50%;
    left: 20px;
    color: #999;
    font-size: 17px;
    pointer-events: none;
    transform: translateY(-50%);
    transition: all 0.3s ease;
}

.wrapper form .field input:focus ~ label,
.wrapper form .field input:valid ~ label {
    top: -10px;
    font-size: 16px;
    color: #4158d0;
    background: #fff;
    padding: 0 5px;
}

.wrapper form .btn-primary {
    width: 100%;
    height: 50px;
    background: linear-gradient(-135deg, #ced2e1, #4158d0);
    border: none;
    border-radius: 25px;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.wrapper form .btn-primary:active {
    transform: scale(0.95);
}

.wrapper form .signup-link {
    color: #262626;
    margin-top: 20px;
    text-align: center;
}

.wrapper form .signup-link a {
    color: #4158d0;
    text-decoration: none;
}

.wrapper form .signup-link a:hover {
    text-decoration: underline;
}

.nav-link {
    color: #ced2e1 !important;
    padding-top: 20px; 
    padding-bottom: 20px;
    font-size: 1.4rem;
}

.nav-link p {
    color: red;
    font-size: 1.2rem;
}

nav {
    background-color: #001d3d !important;
}

.navbar-nav {
    display: flex;
    justify-content: center;
    align-items: center; /* Align items vertically */
    width: 100%;
}

.nav-item {
    margin: 0 10px;
}

.signup-button {
    background-color: #ffbf00; 
    color: #001d3d !important; 
    padding: 15px 20px; /* Increased padding for vertical centering */
    border-radius: 5px;
    font-weight: bold; 
    text-align: center; 
}

.btn-primary {
    color: white; 
}

.navbar-brand {
    display: flex;
    align-items: center;
    margin-left: -55px; 
}
</style>