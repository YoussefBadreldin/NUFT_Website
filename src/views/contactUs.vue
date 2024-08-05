<template>
    <div>
        <header-component />

        <!-- Page Title -->
        <div class="page-nav row">
            <h2>Contact Us</h2>
            <ul>
                <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
                <li><router-link to="/ContactUs"><i class="fas fa-chevron-right"></i> Contact Us</router-link></li>
            </ul>
        </div>

        <!-- Body -->
        <div class="row contact-row no-margin">
            <div class="container">

                <!-- Contact Info -->
                <h2 class="text-center" style="margin-top: 50px;">Contact Info</h2>
                <div style="text-align: center; color: black;">
                    <p style="margin-bottom: 10px; font-size: 15px;">
                        <a href="mailto:info@nuft.com" style="color: black;">
                            <i class="fas fa-envelope-square"></i> info@nuft.com
                        </a>
                    </p>
                    <p style="margin-bottom: 10px; font-size: 15px;">
                        <a href="http://wa.me/201285012807" style="color: black;">
                            <i class="fab fa-whatsapp"></i> +20 128 5012807
                        </a>
                    </p>
                    <p style="font-size: 15px;">
                        <a href="https://www.facebook.com/NUFT.EG" target="_blank" style="color: black; margin-right: 10px;">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/nuft.eg" target="_blank" style="color: black; margin-right: 10px;">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/nufteg/" target="_blank" style="color: black; margin-right: 10px;">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="https://t.me/NUFT_EG" target="_blank" style="color: black; margin-right: 10px;">
                            <i class="fab fa-telegram"></i>
                        </a>
                        <a href="https://www.tiktok.com/@NUFT.EG" target="_blank" style="color: black; margin-right: 10px;">
                            <i class="fab fa-tiktok"></i>
                        </a>
                        <a href="https://www.youtube.com/@nuft_eg" target="_blank" style="color: black; margin-right: 10px;">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </p>
                </div>

                <!-- Contact Form -->
                <div class="row justify-content-center">
                    <div class="col-sm-6" style="padding: 20px;">
                        <h2 class="text-center" style="margin-top: 30px;">Contact Form</h2>
                        <form @submit.prevent="submitForm">
                            <div class="form-group row">
                                <label for="name" class="col-sm-3 col-form-label">Name:</label>
                                <div class="col-sm-8">
                                    <input v-model="form.name" type="text" id="name" name="name" placeholder="Name" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email" class="col-sm-3 col-form-label">Email:</label>
                                <div class="col-sm-8">
                                    <input v-model="form.email" type="email" id="email" name="email" placeholder="Email" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="number" class="col-sm-3 col-form-label">Number:</label>
                                <div class="col-sm-8">
                                    <input v-model="form.phone" type="text" id="number" name="number" placeholder="Number" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="message" class="col-sm-3 col-form-label">Message:</label>
                                <div class="col-sm-8">
                                    <textarea v-model="form.message" id="message" rows="5" placeholder="Your Message" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-8 offset-sm-3">
                                    <button type="submit" class="btn btn-success">Send Message</button>
                                </div>
                            </div>
                            <div id="errorMessages" v-html="errorMessages" style="color: red; font-size: 16px; text-align: center;"></div>
                        </form>
                        <div id="thankYouMessage" v-if="submitted" style="text-align: center; font-size: 28px; padding-bottom: 50px;">
                            Thank you for contacting us. <br> We will get back to you <br> as soon as possible.
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <smart-assistant />
        <footer-component />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from "../../public/global/headerComponent.vue";
import SmartAssistant from "../../public/global/smartAssistant.vue";
import FooterComponent from "../../public/global/footerComponent.vue";

export default {
    name: 'ContactUs',
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone: '',
                message: '',
            },
            errorMessages: '',
            submitted: false,
        };
    },
    methods: {
        submitForm() {
            const { name, email, phone, message } = this.form;
            const nameRegex = /^[A-Za-z\s]+$/;
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const numberRegex = /^[0-9+]+$/;
            let errorMessage = '';

            if (!name || !email || !phone || !message) {
                errorMessage += 'Please fill all fields before submitting.<br>';
            }
            if (!name.match(nameRegex)) {
                errorMessage += 'Name must contain only letters and spaces.<br>';
            }
            if (!email.match(emailRegex)) {
                errorMessage += 'Email must be in the format \'example@example.com\'.<br>';
            }
            if (!phone.match(numberRegex)) {
                errorMessage += 'Number must contain only digits and the plus sign.<br>';
            }

            this.errorMessages = errorMessage;

            if (!errorMessage) {
                axios.post('https://nuft-backend.onrender.com/contact/add', this.form)
                    .then(() => {
                        console.log(this.form);
                        this.submitted = true;
                        this.form = {
                            name: '',
                            email: '',
                            phone: '',
                            message: '',
                        };

                        this.errorMessages = '';
                        console.log(this.form);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.errorMessages = 'An error occurred while submitting the form. Please try again.';
                    });
            }
        },
    },
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
