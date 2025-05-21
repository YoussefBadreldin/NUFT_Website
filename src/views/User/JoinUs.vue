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
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="firstName">الاسم الأول</label>
                                        <input type="text" class="form-control" id="firstName" v-model="formData.firstName" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="lastName">الاسم الأخير</label>
                                        <input type="text" class="form-control" id="lastName" v-model="formData.lastName" required>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="email">البريد الإلكتروني</label>
                                        <input type="email" class="form-control" id="email" v-model="formData.email" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="phone">رقم الهاتف</label>
                                        <input type="tel" class="form-control" id="phone" v-model="formData.phone" required>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
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
                                    <div class="form-group col-md-6">
                                        <label for="department">القسم</label>
                                        <select class="form-control" id="department" v-model="formData.department" required>
                                            <option value="">اختر القسم</option>
                                            <option value="marketing">التسويق</option>
                                            <option value="development">التطوير</option>
                                            <option value="content">المحتوى</option>
                                            <option value="support">الدعم</option>
                                            <option value="other">أخرى</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="experience">الخبرة (بالسنوات)</label>
                                        <input type="number" class="form-control" id="experience" v-model="formData.experience" min="0" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="education">المؤهل العلمي</label>
                                        <input type="text" class="form-control" id="education" v-model="formData.education" required>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="coverLetter">رسالة التقديم</label>
                                    <textarea class="form-control" id="coverLetter" v-model="formData.coverLetter" rows="4"></textarea>
                                    <small class="form-text text-muted">اختياري - يمكنك إضافة رسالة تقديم توضح سبب رغبتك في الانضمام إلينا</small>
                                </div>

                                <div class="form-group">
                                    <label for="resume">السيرة الذاتية (PDF)</label>
                                    <input type="file" class="form-control-file" id="resume" @change="handleFileUpload" accept=".pdf" required>
                                    <small class="form-text text-muted">يرجى تحميل سيرتك الذاتية بصيغة PDF</small>
                                </div>

                                <div v-if="error" class="alert alert-danger">
                                    {{ error }}
                                </div>

                                <button type="submit" class="btn btn-primary submit-btn" :disabled="isSubmitting">
                                    <span v-if="isSubmitting">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        جاري التقديم...
                                    </span>
                                    <span v-else>تقديم الطلب</span>
                                </button>
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
import axios from 'axios';

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
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                position: '',
                department: '',
                experience: '',
                education: '',
                coverLetter: '',
                resume: null
            },
            isSubmitting: false,
            error: null
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file && file.type === 'application/pdf') {
                this.formData.resume = file;
            } else {
                this.error = 'يرجى تحميل ملف PDF فقط';
                event.target.value = '';
            }
        },
        async submitForm() {
            try {
                this.isSubmitting = true;
                this.error = null;

                // Create FormData object to handle file upload
                const formData = new FormData();
                formData.append('firstName', this.formData.firstName);
                formData.append('lastName', this.formData.lastName);
                formData.append('email', this.formData.email);
                formData.append('phone', this.formData.phone);
                formData.append('position', this.formData.position);
                formData.append('department', this.formData.department);
                formData.append('experience', this.formData.experience);
                formData.append('education', this.formData.education);
                formData.append('coverLetter', this.formData.coverLetter);
                formData.append('resume', this.formData.resume);

                // Send the form data to the API
                await axios.post('https://nuft-website-backend.vercel.app/join-us/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                // Show success message
                alert('تم تقديم طلبك بنجاح! سنتواصل معك قريباً.');
                
                // Reset form
                this.resetForm();
            } catch (error) {
                console.error('Error submitting form:', error);
                this.error = 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.';
            } finally {
                this.isSubmitting = false;
            }
        },
        resetForm() {
            this.formData = {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                position: '',
                department: '',
                experience: '',
                education: '',
                coverLetter: '',
                resume: null
            };
            this.error = null;
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

.form-row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

.form-group {
    margin-bottom: 20px;
}

.col-md-6 {
    flex: 0 0 50%;
    max-width: 50%;
    padding-right: 15px;
    padding-left: 15px;
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

.alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}

.form-text {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #6c757d;
}

.submit-btn i {
    margin-left: 8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .col-md-6 {
        flex: 0 0 100%;
        max-width: 100%;
    }
    
    .form-row {
        margin-right: 0;
        margin-left: 0;
    }
}
</style>