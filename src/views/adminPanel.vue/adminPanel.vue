<template>
  <div>
       <div class="header-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 left-item">
            <ul></ul>
          </div>
          <div class="col-lg-5 right-item">
            <ul>
             <li><a><strong>بث تجريبي</strong></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item navbar-brand">
            <a href="">
              <img src="../../../images/logo.png" alt="Logo" class="d-inline-block align-top" />
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <div class="form-section">
      <br> <br>
        <h1>اضافة بيانات الجامعات</h1>
        <br> <br>
        <form @submit.prevent="handleSubmit">
          <div>
            <input type="text" v-model="speciality" id="speciality">
            <label for="speciality">:(Short-Name) اسم الجامعة</label>
          </div>
          <div>
            <input type="text" v-model="facality_or_international" id="facality_or_international">
            <label for="facality_or_international">:(Normal / Dual) نوع البرنامج</label>
          </div>
          <div>
            <input type="text" v-model="facihglities" id="facilities">
            <label for="facilities">:(Short-Name) اسم الكلية</label>
          </div>
          <div>
            <input type="text" v-model="programs" id="programs">
            <label for="programs">:اسم البرنامج</label>
          </div>
          <div>
            <input type="text" v-model="section" id="section">
            <label for="section">:الشعبة</label>
          </div>
          <div>
            <input type="text" v-model="feesEgyption" id="feesEgyption">
            <label for="feesEgyption">:المصاريف (للمصريين)</label>
          </div>
          <div>
            <input type="text" v-model="feesNatives" id="feesNatives">
            <label for="feesNatives">:المصاريف (للوافدين)</label>
          </div>
          <div>
            <input type="text" v-model="scoreFirst" id="scoreFirst">
            <label for="scoreFirst">:الحد الادني للثانوية العامة (العام السابق)</label>
          </div>
          <div>
            <input type="text" v-model="scoreSecond" id="scoreSecond">
            <label for="scoreSecond">:الحد الادني للثانوية العامة (العام الحالي)</label>
          </div>
          <div>
            <input type="text" v-model="scorefirstAzhar" id="scorefirstAzhar">
            <label for="scorefirstAzhar">:الحد الادني للثانوية الازهرية والشهادات المعادلة (العام السابق)</label>
          </div>
          <div>
            <input type="text" v-model="scoreYearsecondAzhar" id="scoreYearsecondAzhar">
            <label for="scoreYearsecondAzhar">:الحد الادني للثانوية الازهرية والشهادات المعادلة (العام الحالي)</label>
          </div>
          <div>
            <input type="text" v-model="scorefirstStem" id="scorefirstStem">
            <label for="scorefirstStem">:الحد الادني لستيم والنيل (العام السابق)</label>
          </div>
          <div>
            <input type="text" v-model="scoreYearsecondStem" id="scoreYearsecondStem">
            <label for="scoreYearsecondStem">:الحد الادني لستيم والنيل (العام الحالي)</label>
          </div>
          <div>
            <input type="text" v-model="minimumForNatives" id="minimumForNatives">
            <label for="minimumForNatives">:الحد الادني للوافدين</label>
          </div>
          <div>
            <input type="text" v-model="detailsSchoolarship" id="detailsSchoolarship">
            <label for="detailsSchoolarship">:رابط تفاصيل المنح</label>
          </div>
          <br>
          <button type="submit">اضافة</button>
        </form>
      </div>

      <div class="form-section">
      <br> <br>
        <h1>تحديث بيانات الجامعات</h1>
        <br> <br>
        <form @submit.prevent="updateData">
          <button type="submit">تحديث</button>
        </form>
      </div>

      <div class="form-section">
      <br> <br>
        <h1>اضافة روابط واساسيات الجامعات</h1>
        <br> <br>
        <form @submit.prevent="links">
          <div>
            <input type="text" v-model="university_Name">
            <label for="university_Name">:(Short-Name) اسم الجامعة</label>
          </div>
          <div>
            <input type="text" v-model="first_year">
            <label for="first_year">:العام السابق (يتم تضاف بداية الموسم)</label>
          </div>
          <div>
            <input type="text" v-model="second_year">
            <label for="second_year">:العام الحالي (يتم تضاف بداية الموسم)</label>
          </div>
          <div>
            <input type="text" v-model="international_program_link">
            <label for="international_program_link">:رابط تفاصيل البرامج الدولية</label>
          </div>
          <div>
            <input type="text" v-model="register_link_dorms">
            <label for="register_link_dorms">:رابط حجز السكن</label>
          </div>
          <div>
            <input type="text" v-model="view_location">
            <label for="view_location">:رابط لوكشن الجامعة</label>
          </div>
          <div>
            <input type="text" v-model="register_link">
            <label for="register_link">:رابط التقديم للمصريين</label>
          </div>
          <div>
            <input type="text" v-model="Admission_link_egyption">
            <label for="Admission_link_egyption">:رابط التقديم للمصريين (البرامج الدولية)</label>
          </div>
          <div>
            <input type="text" id="transfer_link" v-model="transfer_link">
            <label for="transfer_link">:رابط التحويل للمصريين</label>
          </div>
          <div>
            <input type="text" v-model="Admission_link_natives">
            <label for="Admission_link_natives">:رابط التقديم للوافدين</label>
          </div>
          <br>
          <button type="submit">اضافة</button>
        </form>
      </div>

      <div class="form-section">
      <br> <br>
        <h1>تحديث روابط واساسيات الجامعات</h1>
        <br> <br>
        <form @submit.prevent="updateLinks">
          <button type="submit">تحديث</button>
        </form>
      </div>

      <div class="form-section">
      <br> <br>
        <h1>اضافة سكن الجامعات</h1>
        <br> <br>
        <form @submit.prevent="dorms">
          <div>
            <input type="text" v-model="spec">
            <label for="spec">:(Short-Name) اسم الجامعة</label>
          </div>
          <div>
            <input type="text" v-model="type">
            <label for="type">:نوع السكن (فردي / زوجي)</label>
          </div>
          <div>
            <input type="text" v-model="price">
            <label for="price">:السعر</label>
          </div>
          <br>
          <button type="submit">اضافة</button>
        </form>
      </div>

      <div class="form-section">
      <br> <br>
        <h1>تحديث سكن الجامعات</h1>
        <br> <br>
        <form @submit.prevent="updateDorms">
          <button type="submit">تحديث</button>
        </form>
      </div>

      <div class="form-section">
      <br> <br>
        <h1>اضافة انتقالات الجامعات</h1>
        <br> <br>
        <form @submit.prevent="trans">
          <div>
            <input type="text" v-model="spec2">
            <label for="spec2">:(Short-Name) اسم الجامعة</label>
          </div>
          <div>
            <input type="text" v-model="type2">
            <label for="type2">:الخط</label>
          </div>
          <div>
            <input type="text" v-model="price2">
            <label for="price2">:السعر</label>
          </div>
          <br>
          <button type="submit">اضافة</button>
        </form>
      </div>

      <div class="form-section">
      <br> <br>
        <h1>تحديث انتقالات الجامعات</h1>
        <br> <br>
        <form @submit.prevent="updateTrans">
          <button type="submit">تحديث</button>
        </form>
      </div>

<br> <br>
<h1>إضافة حالة الجامعات</h1>
<br> <br>
<form @submit.prevent="admission">
<div>
          <input type="text" v-model="addmission_spec" id="addmission_spec">
          <label for="addmission_spec">:نوع الجامعة</label>
        </div>
        <div>
          <input type="text" v-model="f_name" id="f_name">
          <label for="f_name">:اسم الجامعة</label>
        </div>
        <div>
          <input type="text" v-model="status_transfer" id="status_transfer">
          <label for="status_transfer">:حالة التحويل</label>
        </div>
        <div>
          <input type="text" v-model="thanwyaaAmaaStatus_first" id="thanwyaaAmaaStatus_first">
          <label for="thanwyaaAmaaStatus_first">:حالة تقديم الثانوية العامة (العام السابق)</label>
        </div>
        <div>
          <input type="text" v-model="thanwyaaAmaaStatus_second" id="thanwyaaAmaaStatus_second">
          <label for="thanwyaaAmaaStatus_second">:حالة تقديم الثانوية العامة (العام الحالي)</label>
        </div>
        <div>
          <input type="text" v-model="ArabEnglishAzhariCertificates_first" id="ArabEnglishAzhariCertificates_first">
          <label for="ArabEnglishAzhariCertificates_first">:حالة تقديم الازهرية والشهادات المعادلة (العام السابق)</label>
        </div>
        <div>
          <input type="text" v-model="ArabEnglishAzhariCertificates_second" id="ArabEnglishAzhariCertificates_second">
          <label for="ArabEnglishAzhariCertificates_second">:حالة تقديم الازهرية والشهادات المعادلة (العام الحالي)</label>
        </div>
        <div>
          <input type="text" v-model="StemNileCertificates_first" id="StemNileCertificates_first">
          <label for="StemNileCertificates_first">:حالة تقديم ستيم والنيل (العام السابق)</label>
        </div>
        <div>
          <input type="text" v-model="StemNileCertificates_second" id="StemNileCertificates_second">
          <label for="StemNileCertificates_second">:حالة تقديم ستيم والنيل (العام الحالي)</label>
        </div>
        <div>
          <input type="text" v-model="InternationalStudents" id="InternationalStudents">
          <label for="InternationalStudents">:حالة تقديم الوافدين</label>
        </div>
  <br>
  <button type="submit">إضافة</button>
</form>

<br> <br>
<h1>تحديث حالة الجامعات</h1>
<br> <br>
<form @submit.prevent="updateadmission">
  <button type="submit">تحديث</button>
</form>

      <div class="form-section">
      <br> <br>
        <h1>اضافة المنح</h1>
        <br> <br>
        <form @submit.prevent="updateNews">
          <!-- Same form structure as above -->
          <br>
          <button type="submit">اضافة</button>
        </form>
      </div>

            <div class="form-section">
      <br> <br>
        <h1>تحديث المنح</h1>
        <br> <br>
        <form @submit.prevent="trans">
          <!-- Same form structure as above -->
          <br>
          <button type="submit">تحديث</button>
        </form>

        <br> <br>
        <h1>أضافة الاخبار</h1>
      <br> <br>
      <form @submit.prevent="newsfunction">
        <div>
          <textarea v-model="news" cols="30" rows="10"></textarea>
          <label for="news">:تفاصيل الخبر</label>
        </div>
        <br>
        <button type="submit">أضافة</button>
      </form>

      <br> <br>
      <h1>تحديث الاخبار</h1>
      <br> <br>
      <form @submit.prevent="updateNews">
        <button type="submit">تحديت</button>
      </form>
        <br> <br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminPanel',
    data() {
        return {
            facilities: '',
            facality_or_international: '',
            registration_link: '',
            // Admission_link_egyption: '',
            // Admission_link_natives: '',
            international_program_link: '',
            transfer_link: '',
            programs: '',
            feesEgyption: '',
            feesNatives: '',
            section: '',
            firstYearThanwyaa: '',
            scoreFirst: '',
            secondYearThanwyaa: '',
            scoreSecond: '',
            firstYearAzhar: '',
            scorefirstAzhar: '',
            secondYearAzhar: '',
            scoreYearsecondAzhar: '',
            firstYearStem: '',
            scorefirstStem: '',
            secondYearStem: '',
            scoreYearsecondStem: '',
            minimumForNatives: '',
            speciality: '',
            detailsSchoolarship: '',
            details_about_internationa_program: '',
            first_year: '',
            second_year: '',
            view_location: '',
            register_link_dorms: '',
            register_link_transportation: '',
            university_Name: '',
            register_link: '',
            Admission_link_egyption: '',
            Admission_link_natives: '',
            type:'',
            price: '',
            spec: '',
            type2:'',
            price2: '',
            spec2: '',
            news: '',
            f_name: '',
            addmission_spec: '',
            status_transfer: '',
            thanwyaaAmaaStatus_first: '',
            ArabEnglishAzhariCertificates_first: '',
            ArabEnglishAzhariCertificates_second: '',
            StemNileCertificates_first: '',
            StemNileCertificates_second: '',
            InternationalStudents: '',
        };
    },
    methods: {
        
        handleSubmit() {
            const formData = {
                facilities: this.facilities,
                facality_or_international: this.facality_or_international,
                registration_link: this.registration_link,
                Admission_link_egyption: this.Admission_link_egyption,
                Admission_link_natives: this.Admission_link_natives,
                international_program_link: this.international_program_link,
                transfer_link: this.transfer_link,
                programs: this.programs,
                feesEgyption: this.feesEgyption,
                feesNatives: this.feesNatives,
                section: this.section,
                firstYearThanwyaa: this.firstYearThanwyaa,
                scoreFirst: this.scoreFirst,
                secondYearThanwyaa: this.secondYearThanwyaa,
                scoreSecond: this.scoreSecond,
                firstYearAzhar: this.firstYearAzhar,
                scorefirstAzhar: this.scorefirstAzhar,
                secondYearAzhar: this.secondYearAzhar,
                scoreYearsecondAzhar: this.scoreYearsecondAzhar,
                firstYearStem: this.firstYearStem,
                scorefirstStem: this.scorefirstStem,
                secondYearStem: this.secondYearStem,
                scoreYearsecondStem: this.scoreYearsecondStem,
                minimumForNatives: this.minimumForNatives,
                speciality: this.speciality,
                detailsSchoolarship: this.detailsSchoolarship,
                details_about_internationa_program: this.details_about_internationa_program
            };

            axios.post('https://nuft-backend.onrender.com/faclity/addInternational', formData)
                .then(response => {
                    console.log(response.data);
                    alert('form sent successfully');
                })
                .catch(error => {
                    console.error('Error adding facility:', error);
                    alert('Error when adding form');
                });
        },
        links() {
            const links_form_data = {
                first_year: this.first_year,
                second_year: this.second_year,
                details_about_internationa_program: this.details_about_internationa_program,
                view_location: this.view_location,
                register_link_dorms: this.register_link_dorms,
                register_link_transportation: this.register_link_transportation,
                university_Name: this.university_Name,
                register_link: this.register_link,
                Admission_link_egyption: this.Admission_link_egyption,
                Admission_link_natives: this.Admission_link_natives,
                international_program_link: this.international_program_link,
                transfer_link: this.transfer_link
            };
            axios.post('https://nuft-backend.onrender.com/links/add_links', links_form_data)
                .then(() => {
                    alert('form sent successfully');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        dorms(){
            const form = {
                type: this.type,
                price: this.price,
                spec: this.spec
            }
            axios.post('https://nuft-backend.onrender.com/adddorms', form).then(()=>{
                alert('form sent successfully');
            }).catch(error=>{
                console.log(error);
            })
        },
        trans(){
            const form = {
                type: this.type2,
                price: this.price2,
                spec: this.spec2
            }
            axios.post('https://nuft-backend.onrender.com/trans/addtrans', form).then(()=>{
                alert('form sent succesffully');
            }).catch(error=>{
                console.log(error);
            })
        },
        newsfunction(){
            const form = {
                text: this.news,
            }
            axios.post('https://nuft-backend.onrender.com/news/addNews', form).then(()=>{
                console.log('news sent successfully');
                alert("news sent succesfully");
            }).catch(error=>{
                console.log(error);
            })
        },
        admission(){
            const form = {
                faclityName: this.f_name,
                specility: this.addmission_spec,
                statusTransfer: this.status_transfer,
                thanwyaaAmaaStatus_first: this.thanwyaaAmaaStatus_first,
                thanwyaaAmaaStatus_second: this.thanwyaaAmaaStatus_second,
                ArabEnglishAzhariCertificates_first: this.ArabEnglishAzhariCertificates_first,
                ArabEnglishAzhariCertificates_second: this.ArabEnglishAzhariCertificates_second,
                StemNileCertificates_first: this.StemNileCertificates_first,
                StemNileCertificates_second: this.StemNileCertificates_second,
                InternationalStudents: this.InternationalStudents,
            }
            axios.post('https://nuft-backend.onrender.com/admission/add', form).then(()=>{
                alert('form sent successfully');
            }).catch(error=>{
                console.log(error);
            })
        }
    }
};
</script>

<style scoped>
form div {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

@media (max-width: 425px) {
    form div {
        grid-template-columns: 1fr;
    }
}
<style scoped>
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
.header-top {
  background-color: #C70039;
  padding: 5px 0; /* Reduced top and bottom padding */
  color: white;
  text-align: center;
}

.header-top .container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-top .row {
  width: 100%;
}

.header-top .left-item,
.header-top .right-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-top .left-item ul,
.header-top .right-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.header-top .right-item ul {
  justify-content: center;
}

.header-top li {
  margin-top: -20px;
  padding: 0; /* Ensure no padding in list items */
}

.header-top .right-item a {
  margin: 0; /* Ensure no margin around the link */
  padding: 0; /* Ensure no padding around the link */
  line-height: 1.5; /* Adjust line height if needed */
}

</style>
