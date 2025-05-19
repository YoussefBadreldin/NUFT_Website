<template>
    <div>
        <header-component />

        <!-- Page Title -->
        <div class="page-header" dir="rtl">
            <h2>تواصل معنا</h2>
        </div>

        <!-- Contact Section -->
        <div class="contact-section" dir="rtl">
            <div class="container">
                <div class="contact-wrapper">
                    <!-- Contact Info Side -->
                    <div class="contact-info-side">
                        <div class="info-card">
                            <h3>بيانات التواصل</h3>
                            <div class="contact-methods">
                                <a href="mailto:info@nufteg.com" class="contact-method">
                                    <div class="icon-wrapper">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="method-details">
                                        <span class="label">البريد الإلكتروني</span>
                                        <span class="value">info@nufteg.com</span>
                                    </div>
                                </a>
                                <a href="http://wa.me/201285012807" class="contact-method">
                                    <div class="icon-wrapper">
                                        <i class="fab fa-whatsapp"></i>
                                    </div>
                                    <div class="method-details">
                                        <span class="label">واتساب</span>
                                        <span class="value">+20 128 5012807</span>
                                    </div>
                                </a>
                            </div>
                            <div class="social-links">
                                <h4>تابعنا على</h4>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/NUFT.EG" target="_blank" class="social-icon">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="https://www.instagram.com/nuft.eg" target="_blank" class="social-icon">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/company/nufteg/" target="_blank" class="social-icon">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                    <a href="https://t.me/NUFT_EG" target="_blank" class="social-icon">
                                        <i class="fab fa-telegram"></i>
                                    </a>
                                    <a href="https://www.tiktok.com/@NUFT.EG" target="_blank" class="social-icon">
                                        <i class="fab fa-tiktok"></i>
                                    </a>
                                    <a href="https://www.youtube.com/@nuft_eg" target="_blank" class="social-icon">
                                        <i class="fab fa-youtube"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form Side -->
                    <div class="contact-form-side">
                        <div class="form-card">
                            <h3>نموذج التواصل</h3>
                            <form @submit.prevent="submitForm">
                                <div class="form-group">
                                    <label for="name">الاسم</label>
                                    <input 
                                        v-model="form.name" 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        placeholder="اسمك" 
                                        class="form-control"
                                    >
                                </div>
                                <div class="form-group">
                                    <label for="email">الايميل</label>
                                    <input 
                                        v-model="form.email" 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder="ايميلك" 
                                        class="form-control"
                                    >
                                </div>
                                <div class="form-group">
                                    <label for="number">الرقم</label>
                                    <input 
                                        v-model="form.phone" 
                                        type="text" 
                                        id="number" 
                                        name="number" 
                                        placeholder="رقمك" 
                                        class="form-control"
                                    >
                                </div>
                                <div class="form-group">
                                    <label for="message">الرسالة</label>
                                    <textarea 
                                        v-model="form.message" 
                                        id="message" 
                                        rows="5" 
                                        placeholder="رسالتك" 
                                        class="form-control"
                                    ></textarea>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="submit-btn">
                                        <span>ارسال</span>
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                                <div id="errorMessages" v-html="errorMessages" class="error-messages"></div>
                            </form>
                            <div id="thankYouMessage" v-if="submitted" class="thank-you-message">
                                <i class="fas fa-check-circle"></i>
                                <h4>تم الإرسال بنجاح</h4>
                                <p>شكراً لتواصلكم معنا.<br>سوف نعود إليكم في أقرب وقت ممكن.</p>
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
    name: 'ContactUs',
    components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
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

.contact-section {
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

.contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

.info-card, .form-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: 100%;
}

.info-card h3, .form-card h3 {
    color: #1a237e;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 700;
}

.contact-methods {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.contact-method {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    padding: 1rem;
    border-radius: 10px;
    background: #f8f9fa;
    transition: all 0.3s ease;
}

.contact-method:hover {
    background: #e8eaf6;
    transform: translateX(-5px);
}

.icon-wrapper {
    width: 40px;
    height: 40px;
    background: #1a237e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
}

.icon-wrapper i {
    color: white;
    font-size: 1.2rem;
}

.method-details {
    display: flex;
    flex-direction: column;
}

.method-details .label {
    font-size: 0.9rem;
    color: #666;
}

.method-details .value {
    font-weight: 600;
    color: #1a237e;
}

.social-links {
    margin-top: 2rem;
}

.social-links h4 {
    margin-bottom: 1rem;
    color: #1a237e;
}

.social-icons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.social-icon {
    width: 40px;
    height: 40px;
    background: #f8f9fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1a237e;
    text-decoration: none;
    transition: all 0.3s ease;
}

.social-icon:hover {
    background: #1a237e;
    color: white;
    transform: translateY(-3px);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #1a237e;
    font-weight: 600;
}

.form-control {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: #1a237e;
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
}

.submit-btn {
    width: 100%;
    padding: 1rem;
    background: #1a237e;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.submit-btn:hover {
    background: #283593;
    transform: translateY(-2px);
}

.error-messages {
    color: #d32f2f;
    margin-top: 1rem;
    font-size: 0.9rem;
}

.thank-you-message {
    text-align: center;
    padding: 2rem;
    color: #1a237e;
}

.thank-you-message i {
    font-size: 3rem;
    color: #4caf50;
    margin-bottom: 1rem;
}

.thank-you-message h4 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.thank-you-message p {
    color: #666;
    line-height: 1.6;
}

@media (max-width: 992px) {
    .contact-wrapper {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .page-header h2 {
        font-size: 2rem;
    }

    .info-card, .form-card {
        padding: 1.5rem;
    }

    .contact-method {
        padding: 0.75rem;
    }

    .social-icons {
        justify-content: center;
    }
}
</style>
