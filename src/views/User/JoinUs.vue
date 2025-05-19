<template>
    <div>
        <HeaderComponent />

        <!-- Main content wrapper with RTL -->
        <div class="rtl-content">
            <!-- Join Us Section -->
            <div class="JoinUs-Section">
                <div class="container">
                    <div class="row session-title">
                        <h2>انضم إلينا</h2>
                        <p>مرحباً بك في فريق NUFT!</p>
                    </div>
                    <div class="row">
                        <div class="col-md-8 mx-auto">
                            <form @submit.prevent="submitForm" class="join-form">
                                <div class="form-group">
                                    <label for="fullName">الاسم الكامل</label>
                                    <input type="text" class="form-control" id="fullName" v-model="formData.fullName" required>
                                </div>

                                <div class="form-group">
                                    <label for="email">البريد الإلكتروني</label>
                                    <input type="email" class="form-control" id="email" v-model="formData.email" required>
                                </div>

                                <div class="form-group">
                                    <label for="phone">رقم الهاتف</label>
                                    <input type="tel" class="form-control" id="phone" v-model="formData.phone" required>
                                </div>

                                <div class="form-group">
                                    <label for="position">المنصب المطلوب</label>
                                    <select class="form-control" id="position" v-model="formData.position" required>
                                        <option value="">اختر المنصب</option>
                                        <option value="content_writer">كاتب محتوى</option>
                                        <option value="social_media">مسؤول وسائل التواصل الاجتماعي</option>
                                        <option value="data_entry">إدخال البيانات</option>
                                        <option value="technical_support">الدعم الفني</option>
                                        <option value="other">أخرى</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="experience">الخبرة (بالسنوات)</label>
                                    <input type="number" class="form-control" id="experience" v-model="formData.experience" min="0" required>
                                </div>

                                <div class="form-group">
                                    <label for="education">المؤهل العلمي</label>
                                    <input type="text" class="form-control" id="education" v-model="formData.education" required>
                                </div>

                                <div class="form-group">
                                    <label for="message">رسالة التقديم</label>
                                    <textarea class="form-control" id="message" v-model="formData.message" rows="4" required></textarea>
                                </div>

                                <div class="form-group">
                                    <label for="cv">السيرة الذاتية (PDF)</label>
                                    <input type="file" class="form-control-file" id="cv" @change="handleFileUpload" accept=".pdf" required>
                                </div>

                                <button type="submit" class="btn btn-primary submit-btn">تقديم الطلب</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <FooterComponent />
        <smartAssistantComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
    name: 'JoinUsComponent',
    components: {
        HeaderComponent,
        FooterComponent,
        smartAssistantComponent
    },
    data() {
        return {
            formData: {
                fullName: '',
                email: '',
                phone: '',
                position: '',
                experience: '',
                education: '',
                message: '',
                cv: null
            },
            isSubmitting: false
        };
    },
    mounted() {
        // Add any logic needed when the component is mounted
    },
    methods: {
        handleFileUpload(event) {
            this.formData.cv = event.target.files[0];
        },
        async submitForm() {
            try {
                this.isSubmitting = true;
                // Here you would typically send the form data to your backend
                // For now, we'll just log it
                console.log('Form submitted:', this.formData);
                
                // Show success message
                alert('تم تقديم طلبك بنجاح! سنتواصل معك قريباً.');
                
                // Reset form
                this.formData = {
                    fullName: '',
                    email: '',
                    phone: '',
                    position: '',
                    experience: '',
                    education: '',
                    message: '',
                    cv: null
                };
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.');
            } finally {
                this.isSubmitting = false;
            }
        }
    }
};
</script>

<style scoped>
/* RTL Content Wrapper */
.rtl-content {
    direction: rtl;
    text-align: right;
}

/* Join Us Section Styles */
.JoinUs-Section {
    padding: 80px 0;
    background-color: #f8f9fa; /* Or any preferred background color */
    position: relative;
}

.JoinUs-Section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #007bff, #00bcd4); /* Or match your site's gradient */
}

.JoinUs-Section .session-title {
    text-align: center;
    margin-bottom: 60px;
}

.JoinUs-Section .session-title h2 {
    margin-bottom: 15px;
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    position: relative;
    display: inline-block;
}

.JoinUs-Section .session-title h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: #007bff; /* Or match your site's highlight color */
    border-radius: 2px;
}

.JoinUs-Section .session-title p {
    color: #666;
    font-size: 1.2rem;
    margin-top: 20px;
}

/* Add more specific styles for your form or content here */

.join-form {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c3e50;
}

.form-control {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-control-file {
    padding: 10px 0;
}

.submit-btn {
    width: 100%;
    padding: 12px;
    font-size: 18px;
    font-weight: 600;
    background: linear-gradient(90deg, #007bff, #00bcd4);
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.submit-btn:hover {
    transform: translateY(-2px);
}

.submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .join-form {
        padding: 20px;
    }
    
    .form-control {
        font-size: 14px;
    }
}
</style>