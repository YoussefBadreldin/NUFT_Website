<template>
    <div>
        <header-component />

        <!-- Page Title -->
        <div class="page-nav row">
            <h2>تواصل معنا</h2>
        </div>

        <!-- Body -->
        <div class="row contact-row no-margin">
            <div class="container">

                <!-- Contact Info -->
                <h2 class="text-center" style="margin-top: 50px;">بيانات التواصل</h2>
                <div class="text-center contact-info">
                    <p>
                        <a href="mailto:info@nuft.com">
                            <i class="fas fa-envelope-square"></i> info@nuft.com
                        </a>
                    </p>
                    <p>
                        <a href="http://wa.me/201285012807">
                            <i class="fab fa-whatsapp"></i> +20 128 5012807
                        </a>
                    </p>
                    <p>
                        <a href="https://www.facebook.com/NUFT.EG" target="_blank">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/nuft.eg" target="_blank">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/nufteg/" target="_blank">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="https://t.me/NUFT_EG" target="_blank">
                            <i class="fab fa-telegram"></i>
                        </a>
                        <a href="https://www.tiktok.com/@NUFT.EG" target="_blank">
                            <i class="fab fa-tiktok"></i>
                        </a>
                        <a href="https://www.youtube.com/@nuft_eg" target="_blank">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </p>
                </div>

                <!-- Contact Form -->
                <br> <br>
                <div class="row justify-content-center">
                    <div class="col-sm-8 col-md-6 contact-form">
                        <h2 class="text-center">نموذج التواصل</h2>
                        <form @submit.prevent="submitForm">
                            <div class="form-group">
                                <label for="name">:الاسم</label>
                                <input v-model="form.name" type="text" id="name" name="name" placeholder="اسمك" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="email">:الايميل</label>
                                <input v-model="form.email" type="email" id="email" name="email" placeholder="ايميلك" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="number">:الرقم</label>
                                <input v-model="form.phone" type="text" id="number" name="number" placeholder="رقمك" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="message">:الرسالة</label>
                                <textarea v-model="form.message" id="message" rows="5" placeholder="رسالتك" class="form-control"></textarea>
                            </div>
                            <div class="form-group text-center">
                                <button type="submit" class="btn btn-success btn-block">ارسال</button>
                            </div>
                            <div id="errorMessages" v-html="errorMessages" class="text-danger error-messages"></div>
                        </form>
                        <div id="thankYouMessage" v-if="submitted" class="thank-you-message text-center">
                            شكراً لتواصلكم معنا.<br>سوف نعود إليكم في أقرب وقت ممكن.
                        </div>
                    </div>
                </div>
<br>
            </div>
        </div>

        <footer-component />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from "../../public/global/headerComponent.vue";
import FooterComponent from "../../public/global/footerComponent.vue";

export default {
    name: 'ContactUs',
    components: {
        HeaderComponent,
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
                errorMessage += 'يرجى ملء جميع الحقول قبل الإرسال.<br>';
            }
            if (!name.match(nameRegex)) {
                errorMessage += 'يجب أن يحتوي الاسم على حروف ومسافات فقط.<br>';
            }
            if (!email.match(emailRegex)) {
                errorMessage += 'يجب أن يكون البريد الإلكتروني بالتنسيق \'example@example.com\'.<br>';
            }
            if (!phone.match(numberRegex)) {
                errorMessage += 'يجب أن يحتوي الرقم على أرقام وعلامة الزائد فقط.<br>';
            }

            this.errorMessages = errorMessage;

            if (!errorMessage) {
                axios.post('https://nuft-website-backend.vercel.app/contact/add', this.form)
                    .then(() => {
                        this.submitted = true;
                        this.form = {
                            name: '',
                            email: '',
                            phone: '',
                            message: '',
                        };

                        this.errorMessages = '';
                    })
                    .catch(() => {
                        this.errorMessages = 'حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.';
                    });
            }
        },
    },
};
</script>

<style scoped>
.page-nav {
    width: 100%;
}

.contact-info p {
    margin-bottom: 10px;
    font-size: 16px;
    color: black;
}

.contact-info a {
    color: black;
    text-decoration: none;
    margin-right: 15px; /* Increased spacing between icons */
}

.contact-info a:hover {
    text-decoration: underline;
}

.contact-form {
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.contact-form .form-group {
    margin-bottom: 20px;
}

.contact-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.contact-form .form-control {
    border-radius: 5px;
    border: 1px solid #ced4da;
    padding: 10px;
    font-size: 16px;
}

.contact-form .btn {
    font-size: 18px;
    padding: 10px 20px;
}

.error-messages {
    margin-top: 20px;
    font-size: 14px;
}

.thank-you-message {
    font-size: 24px;
    margin-top: 30px;
}
</style>
