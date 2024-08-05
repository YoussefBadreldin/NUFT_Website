<template>
    <header-component />
    <div class="wrapper">
        <div class="title">
            {{ mode === 'signup' ? 'Sign Up Form' : 'Sign In Form' }}
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="field">
                <input type="email" required v-model="email">
                <label>Email Address</label>
            </div>
            <div class="field">
                <input type="password" required v-model="password">
                <label>Password</label>
            </div>
            <div class="field">
                <button type="submit" class="btn btn-primary">
                    {{ mode === 'signup' ? 'Sign Up' : 'Sign In' }}
                </button>
            </div>
            <div class="signup-link">
                {{ mode === 'signup' ? 'Already a member?' : 'Not a member?' }}
                <a href="#" @click.prevent="toggleMode">
                    {{ mode === 'signup' ? 'Sign in here' : 'Sign up now' }}
                </a>
            </div>
        </form>
    </div>
    <smart-assistant />
    <footer-component />
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name: "SignUp",
    data() {
        return {
            email: '',
            password: '',
            mode: 'signup' // Initial mode is signup
        };
    },
    components: {
        HeaderComponent,
        FooterComponent
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

html,
body {
    display: grid;
    height: 100%;
    width: 100%;
    place-items: center;
    background: #f2f2f2;
    /* background: linear-gradient(-135deg, #c850c0, #4158d0); */
}

::selection {
    background: #4158d0;
    color: #fff;
}

.wrapper {
    width: 380px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.wrapper .title {
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    line-height: 100px;
    color: #fff;
    user-select: none;
    border-radius: 15px 15px 0 0;
    background: linear-gradient(-135deg, #c850c0, #4158d0);
}

.wrapper form {
    padding: 10px 30px 50px 30px;
    margin-top: 20vh;
}

.wrapper form .field {
    height: 50px;
    width: 100%;
    margin-top: 20px;
    position: relative;
}

.wrapper form .field input {
    height: 100%;
    width: 100%;
    outline: none;
    font-size: 17px;
    padding-left: 20px;
    border: 1px solid lightgrey;
    border-radius: 25px;
    transition: all 0.3s ease;
}

.wrapper form .field input:focus,
form .field input:valid {
    border-color: #4158d0;
}

.wrapper form .field label {
    position: absolute;
    top: 50%;
    left: 20px;
    color: #999999;
    font-weight: 400;
    font-size: 17px;
    pointer-events: none;
    transform: translateY(-50%);
    transition: all 0.3s ease;
}

form .field input:focus~label,
form .field input:valid~label {
    top: 0%;
    font-size: 16px;
    color: #4158d0;
    background: #fff;
    transform: translateY(-50%);
}

form .content {
    display: flex;
    width: 100%;
    height: 50px;
    font-size: 16px;
    align-items: center;
    justify-content: space-around;
}

form .content .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
}

form .content input {
    width: 15px;
    height: 15px;
    background: red;
}

form .content label {
    color: #262626;
    user-select: none;
    padding-left: 5px;
}

form .content .pass-link {
    color: "";
}

form .field input[type="submit"] {
    color: #fff;
    border: none;
    padding-left: 0;
    margin-top: -10px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    background: linear-gradient(-135deg, #c850c0, #4158d0);
    transition: all 0.3s ease;
}

form .field input[type="submit"]:active {
    transform: scale(0.95);
}

form .signup-link {
    color: #262626;
    margin-top: 20px;
    text-align: center;
}

form .pass-link a,
form .signup-link a {
    color: #4158d0;
    text-decoration: none;
}

form .pass-link a:hover,
form .signup-link a:hover {
    text-decoration: underline;
}
</style>