<template>
  <div>
    <HeaderComponent />

    <div class="wrapper">
      <div class="title">
        <div v-html="mode === 'signup' ? 'ابدأ رحلتك مع<br>أول دليل شامل عن الجامعات المصرية' : 'يرجى تسجيل الدخول'"></div>
      </div>

      <form @submit.prevent="handleSubmit">
        <div v-if="mode === 'signup'">
          <!-- Signup Fields -->
          <div class="input-group">
            <div class="field">
              <label>الاسم الأخير</label>
              <input type="text" required v-model="lastName" placeholder="مثال: البدوي">
            </div>
            <div class="field">
              <label>الاسم الأول</label>
              <input type="text" required v-model="firstName" placeholder="مثال: احمد">
            </div>
          </div>

          <div class="input-group">
            <div class="field">
              <label>رقم الهاتف</label>
              <div class="phone-number-group">
                <select required v-model="countryCode">
                  <option value="" disabled>رمز الدولة</option>
                  <option value="+20">مصر (+20)</option>
                  <option value="+966">السعودية (+966)</option>
                  <option value="+962">الأردن (+962)</option>
                  <option value="+961">لبنان (+961)</option>
                  <option value="+971">الإمارات (+971)</option>
                  <option value="+968">عمان (+968)</option>
                  <option value="+965">الكويت (+965)</option>
                  <option value="+973">البحرين (+973)</option>
                  <option value="+970">فلسطين (+970)</option>
                  <option value="+967">اليمن (+967)</option>
                  <!-- Add more country codes as needed -->
                </select>
                <input type="tel" required v-model="phoneNumber" placeholder=" 10xxxxxxxx :مثال">
              </div>
            </div>
            <div class="field">
              <label>الجنسية</label>
              <select required v-model="nationality">
                <option value="" disabled>اختر الجنسية</option>
                <option value="مصر">مصر</option>
                <option value="السعودية">السعودية</option>
                <option value="الأردن">الأردن</option>
                <option value="لبنان">لبنان</option>
                <option value="الإمارات">الإمارات</option>
                <option value="عمان">عمان</option>
                <option value="الكويت">الكويت</option>
                <option value="البحرين">البحرين</option>
                <option value="فلسطين">فلسطين</option>
                <option value="اليمن">اليمن</option>
                <!-- Add more nationalities as needed -->
              </select>
            </div>
          </div>

          <div class="input-group">
            <div class="field">
              <label>المجموع بعد المعادلة</label>
              <input type="number" required v-model="grade" placeholder="مثال: 90">    
            </div>
            <div class="field">
              <label>الشعبة</label>
              <select required v-model="division">
                <option value="" disabled>اختر الشعبة</option>
                <option value="ادبي">ادبي</option>
                <option value="علمي">علمي</option>
                <option value="علمي علوم">علمي علوم</option>
                <option value="علمي رياضة">علمي رياضة</option>
              </select>
            </div>
            <div class="field">
              <label>نوع الشهادة</label>
              <select required v-model="certificateType">
                <option value="" disabled>اختر نوع الشهادة</option>
                <option value="الثانوية العامة">الثانوية العامة</option>
                <option value="ستيم والنيل">ستيم والنيل</option>
                <option value="الثانوية الازهرية">الثانوية الازهرية</option>
                <option value="الشهادات العربية والاجنبية">الشهادات العربية والاجنبية</option>
              </select>
            </div>
          </div>
 <div class="field">
          <label>الكليات محل الاهتمام</label>
          <div class="checkbox-group">
            <div class="checkbox-column">
              <div class="checkbox-item">
                <input type="checkbox" id="college1" value="كلية الطب البشري" v-model="collegesOfInterest">
                <label for="college1">كلية الطب البشري</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college2" value="كلية طب الأسنان" v-model="collegesOfInterest">
                <label for="college2">كلية طب الأسنان</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college3" value="كلية العلاج الطبيعي" v-model="collegesOfInterest">
                <label for="college3">كلية العلاج الطبيعي</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college4" value="كلية الصيدلة" v-model="collegesOfInterest">
                <label for="college4">كلية الصيدلة</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college5" value="كلية الطب البيطري" v-model="collegesOfInterest">
                <label for="college5">كلية الطب البيطري</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college6" value="كلية التمريض" v-model="collegesOfInterest">
                <label for="college6">كلية التمريض</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college7" value="كلية تكنولوجيا العلوم الصحية" v-model="collegesOfInterest">
                <label for="college7">كلية تكنولوجيا العلوم الصحية</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college8" value="كلية العلوم الأساسية" v-model="collegesOfInterest">
                <label for="college8">كلية العلوم الأساسية</label>
              </div>
            </div>
            <div class="checkbox-column">
              <div class="checkbox-item">
                <input type="checkbox" id="college9" value="كلية التكنولوجيا الحيوية" v-model="collegesOfInterest">
                <label for="college9">كلية التكنولوجيا الحيوية</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college10" value="كلية الهندسة" v-model="collegesOfInterest">
                <label for="college10">كلية الهندسة</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college11" value="كلية علوم الحاسب" v-model="collegesOfInterest">
                <label for="college11">كلية علوم الحاسب</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college12" value="الكليات البولي تيكنيك" v-model="collegesOfInterest">
                <label for="college12">الكليات البولي تيكنيك</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college13" value="كلية الفنون" v-model="collegesOfInterest">
                <label for="college13">كلية الفنون</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college14" value="كلية الإعلام" v-model="collegesOfInterest">
                <label for="college14">كلية الإعلام</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college15" value="كلية الآثار" v-model="collegesOfInterest">
                <label for="college15">كلية الآثار</label>
              </div>
            </div>
            <div class="checkbox-column">
              <div class="checkbox-item">
                <input type="checkbox" id="college17" value="كلية السياحة" v-model="collegesOfInterest">
                <label for="college17">كلية السياحة</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college18" value="كلية الاقتصاد والإدارة" v-model="collegesOfInterest">
                <label for="college18">كلية الاقتصاد والإدارة</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college19" value="كلية العلوم السينمائية" v-model="collegesOfInterest">
                <label for="college19">كلية العلوم السينمائية</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college20" value="كلية التربية" v-model="collegesOfInterest">
                <label for="college20">كلية التربية</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college21" value="كلية اللغات والترجمة" v-model="collegesOfInterest">
                <label for="college21">كلية اللغات والترجمة</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="college22" value="كلية العلوم الاجتماعية" v-model="collegesOfInterest">
                <label for="college22">كلية العلوم الاجتماعية</label>
              </div>
                <div class="checkbox-item">
                <input type="checkbox" id="college16" value="كلية الحقوق" v-model="collegesOfInterest">
                <label for="college16">كلية الحقوق</label>
              </div>
            </div>
          </div>
        </div>

          <div class="field">
            <label>البريد الالكتروني</label>
            <input type="email" required v-model="email" placeholder="example@domain.com">
          </div>

          <div class="input-group">
            <div class="field">
              <label>تأكيد كلمة المرور</label>
              <input type="password" required v-model="confirmPassword" placeholder=" Ahmed2024$ :مثال"> 
            </div>
            <div class="field">
              <label>كلمة المرور</label>
              <input type="password" required v-model="password" placeholder=" Ahmed2024$ :مثال"> 
            </div>
          </div>
        </div>

        <div class="field" v-if="mode !== 'signup'">
          <label>اسم المستخدم</label>
          <input type="text" required v-model="email" placeholder="example@domain.com">
        </div>

        <div class="field" v-if="mode !== 'signup'">
          <label>كلمة المرور</label>
          <input type="password" required v-model="password">
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
    <br> <br> <br>
    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
  name: "AuthForm",
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      lastName: '',
      firstName: '',
      phoneNumber: '',
      countryCode: '', // Default value to show disabled option
      nationality: '', // Default value to show disabled option
      grade: '',
      division: '', // Default value to show disabled option
      certificateType: '', // Default value to show disabled option
      collegesOfInterest: [],
      mode: 'signin' // Initial mode is signin
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
    axios.post('https://nuft-website-backend.vercel.app/auth/signup', {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        countryCode: this.countryCode,
        phoneNumber: this.phoneNumber,
        nationality: this.nationality,
        grade: this.grade,
        division: this.division,
        certificateType: this.certificateType,
        collegesOfInterest: this.collegesOfInterest,
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
      // Determine user type based on username
      const isAdmin = this.email.toLowerCase() === 'admin';
      
      axios.post('https://nuft-website-backend.vercel.app/auth/signin', {
        email: this.email,
        password: this.password,
      }).then(() => {
        console.log('Logged in successfully');
        localStorage.setItem('name', this.email);
        localStorage.setItem('isAdmin', isAdmin);
        
        // Redirect based on user type
        if (isAdmin) {
          this.$router.push('/admin');
        } else {
          this.$router.push('/Home');
        }
      }).catch(error => {
        if (error.response && error.response.status === 404) {
          alert('User not found');
        } else if (error.response && error.response.status === 401) {
          alert('Incorrect username or password');
        } else {
          console.error('Error with login:', error);
        }
      });
    },
    toggleMode() {
      // Toggle between signup and signin modes
      this.mode = this.mode === 'signup' ? 'signin' : 'signup';
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    
    // Check if already logged in
    const name = localStorage.getItem('name');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (name) {
      if (isAdmin) {
        this.$router.push('/admin');
      } else {
        this.$router.push('/account');
      }
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
    max-width: 600px; /* Adjust as needed */
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

.field {
    position: relative;
    margin-bottom: 20px; /* Adjust spacing as needed */
}

.field input,
.field select {
    width: 100%;
    height: 45px;
    padding-left: 15px;
    text-align: center; /* Center text (including placeholders) */
    border: 1px solid #ccc;
    border-radius: 25px;
    font-size: 16px;
    outline: none;
    background: #fff;
    transition: border-color 0.3s ease;
}

.field input::placeholder {
    text-align: center; /* Center the placeholder text */
}

.field select:invalid {
    color: #999;
}

.field select option[value=""][disabled] {
    display: none;
}

.field input:focus,
.field select:focus {
    border-color: #4158d0;
}

.field label {
    position: static; /* Change to static positioning */
    display: block; /* Ensure label takes up full width */
    margin-bottom: 5px; /* Space between label and input field */
    color: #999;
    font-size: 16px;
    transition: all 0.3s ease;
}

.field input:focus ~ label,
.field input:valid ~ label,
.field select:focus ~ label,
.field select:valid ~ label {
    color: #4158d0;
    font-size: 14px; /* Adjust font size */
    background: #fff;
    padding: 0;
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
    margin-bottom: 20px;
}

.input-group .field {
    flex: 1;
    min-width: 150px;
}

.phone-number-group {
    display: flex;
    gap: 10px;
}

.phone-number-group select {
    flex: 1;
}

.phone-number-group input[type="tel"] {
    flex: 2;
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
    z-index: 1000;
}

.checkbox-group {
    display: flex;
    justify-content: center; /* Center the columns horizontally */
    gap: 20px;
}

.checkbox-column {
    flex: 1;
    max-width: 200px;
    margin: 0;
}

.checkbox-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
}

.checkbox-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    appearance: none;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 2px;
    position: relative;
    cursor: pointer;
}

.checkbox-item input[type="checkbox"]:checked::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 10px;
    height: 10px;
    background-color: #4158d0;
    clip-path: polygon(0% 0%, 100% 100%, 100% 0%, 0% 100%);
}

.checkbox-item label {
    font-size: 14px;
    margin-left: 0;
}

.error {
    color: red;
    font-size: 0.875em;
    margin-top: 0.25em;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
    .wrapper {
        margin-top: 20px;
        padding: 10px;
    }

    .input-group {
        flex-direction: column;
        gap: 10px;
    }

    .checkbox-group {
        flex-direction: column;
        gap: 5px;
    }

    .checkbox-column {
        max-width: 100%; /* Full width for each column */
    }
}
</style>
