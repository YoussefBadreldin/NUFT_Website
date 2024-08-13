<template>
  <div class="parent">
    <!-- Login Form -->
    <div v-if="!isAuthenticated" class="login-form">
    <h1 style="color: #ffbf00; font-weight: bold;">الجامعات الدولية</h1>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>

    <!-- Admin Panel -->
    <div v-if="isAuthenticated">
      <h1 style="color: #001d3d; font-weight: bold;">NUFT Admin Panel</h1>

      <h1 style="color: #ffbf00; font-weight: bold;">الجامعات الدولية</h1>
       
      <div class="form-section">
      <h1>Add University Faculties</h1>      
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="university">Uni Short Name:</label>
            <input type="text" v-model="university" id="university">
          </div>
          <div class="form-group">
            <label for="normal_or_Dual">Type (Normal or Dual):</label>
            <input type="text" v-model="normal_or_Dual" id="normal_or_Dual">
          </div>   
          <div class="form-group">
            <label for="faculty">Faculty/International Program Name:</label>
            <input type="text" v-model="faculty" id="faculty">
          </div>                                       
          <div class="form-group">
            <label for="programs">Faculty Programs/International Program Details:</label>
            <input type="text" v-model="programs" id="programs">
          </div>
          <div class="form-group">
            <label for="feesEgyption">Egyptian Fees (EGP):</label>
            <input type="text" v-model="feesEgyption" id="feesEgyption">
          </div>
          <div class="form-group">
            <label for="feesNatives">Wafedeen Fees (USD):</label>
            <input type="text" v-model="feesNatives" id="feesNatives">
          </div>
          <div class="form-group">
            <label for="section">Section:</label>
            <input type="text" v-model="section" id="section">
          </div>
          <div class="form-group">
            <label for="thanwyaa_firstYear_score">Thanwya Score (Past):</label>
            <input type="text" v-model="thanwyaa_firstYear_score" id="thanwyaa_firstYear_score">
          </div>
          <div class="form-group">
            <label for="thanwyaa_secondYear_score">Thanwya Score (Current):</label>
            <input type="text" v-model="thanwyaa_secondYear_score" id="thanwyaa_secondYear_score">
          </div>
          <div class="form-group">
            <label for="azhar_firstYear_score">Azhar Score (Past):</label>
            <input type="text" v-model="azhar_firstYear_score" id="azhar_firstYear_score">
          </div>
          <div class="form-group">
            <label for="azhar_secondYear_score">Azhar Score (Current):</label>
            <input type="text" v-model="azhar_secondYear_score" id="azhar_secondYear_score">
          </div>
          <div class="form-group">
            <label for="Arabenglish_firstYear_score">Arabenglish Score (Past):</label>
            <input type="text" v-model="Arabenglish_firstYear_score" id="Arabenglish_firstYear_score">
          </div>
          <div class="form-group">
            <label for="Arabenglish_secondYear_score">Arabenglish Score (Current):</label>
            <input type="text" v-model="Arabenglish_secondYear_score" id="Arabenglish_secondYear_score">
          </div>
          <div class="form-group">
            <label for="wafdeen_score">Wafdeen Score:</label>
            <input type="text" v-model="wafdeen_score" id="wafdeen_score">
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <div class="form-section">
      <h1>Add University Info & Links</h1>      
        <form @submit.prevent="links">
          <div class="form-group">
            <label for="university_Name">Uni Short Name:</label>
            <input type="text" v-model="university_Name">
          </div>
          <div class="form-group">
            <label for="university_Arabic_Name">University Arabic Name (short name in brackets):</label>
            <input type="text" v-model="university_Arabic_Name">
          </div>
          <div class="form-group">
            <label for="university_Logo">University Logo (/images/Logos/Universites/National/.png):</label>
            <input type="text" v-model="university_Logo">
          </div>
          <div class="form-group">
            <label for="Uni_Bio">University Bio (one sentence):</label>
            <input type="text" v-model="Uni_Bio">
          </div>
          <div class="form-group">
            <label for="location">Location (https://):</label>
            <input type="text" v-model="location">
          </div>
          <div class="form-group">
            <label for="website">Website (https://):</label>
            <input type="text" v-model="website">
          </div>
          <div class="form-group">
            <label for="phone">Phone (without tel):</label>
            <input type="text" v-model="phone">
          </div>
          <div class="form-group">
            <label for="email">Email (without mailto):</label>
            <input type="text" v-model="email">
          </div>
          <div class="form-group">
            <label for="facebook">Facebook (https://):</label>
            <input type="text" v-model="facebook">
          </div>
          <div class="form-group">
            <label for="instagram">Instagram (https://):</label>
            <input type="text" v-model="instagram">
          </div>
          <div class="form-group">
            <label for="youtube">YouTube (https://):</label>
            <input type="text" v-model="youtube">
          </div>
          <div class="form-group">
            <label for="linkedin">LinkedIn (https://):</label>
            <input type="text" v-model="linkedin">
          </div>
          <div class="form-group">
            <label for="first_year">Tansik Past Year:</label>
            <input type="text" v-model="first_year">
          </div>
          <div class="form-group">
            <label for="second_year">Tansik Current Year:</label>
            <input type="text" v-model="second_year">
          </div>
          <div class="form-group">
            <label for="international_programs">International Programs Details (https://):</label>
            <input type="text" v-model="international_programs">
          </div>
          <div class="form-group">
            <label for="dorms_link">Dorms Details Link (https://):</label>
            <input type="text" v-model="dorms_link">
          </div>
          <div class="form-group">
            <label for="transportation_link">Transportation Details Link (https://):</label>
            <input type="text" v-model="transportation_link">
          </div>
          <div class="form-group">
            <label for="scholarship_link">Scholarship Details Link (https://):</label>
            <input type="text" v-model="scholarship_link">
          </div>
          <div class="form-group">
            <label for="Egyptian_Admission_link">Egyptians Admission Link (https://):</label>
            <input type="text" v-model="Egyptian_Admission_link">
          </div>
          <div class="form-group">
            <label for="Egyptian_Admission_link2">Egyptians International Programs Admission Link (https://):</label>
            <input type="text" v-model="Egyptian_Admission_link2">
          </div>
          <div class="form-group">
            <label for="Egyptian_Transfer_link">Egyptians Transfer Link:</label>
            <input type="text" v-model="Egyptian_Transfer_link">
          </div>
          <div class="form-group">
            <label for="Wafdeen_Admission_link">Wafdeen Admission Link:</label>
            <input type="text" v-model="Wafdeen_Admission_link">
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <div class="form-section">
      <h1>Add University Dorms</h1>     
        <form @submit.prevent="dorms">
          <div class="form-group">
            <label for="dorms_Name">Dorm Name:</label>
            <input type="text" v-model="dorms_Name">
          </div>
          <div class="form-group">
            <label for="dorms_Description">Dorm Description:</label>
            <input type="text" v-model="dorms_Description">
          </div>
          <div class="form-group">
            <label for="dorms_Fees">Dorm Fees (per month):</label>
            <input type="text" v-model="dorms_Fees">
          </div>
          <div class="form-group">
            <label for="dorms_Facilities">Dorm Facilities:</label>
            <input type="text" v-model="dorms_Facilities">
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <div class="form-section">
      <h1>Add University Transportation</h1>   
        <form @submit.prevent="transportation">
          <div class="form-group">
            <label for="transportation_Name">Transportation Name:</label>
            <input type="text" v-model="transportation_Name">
          </div>
          <div class="form-group">
            <label for="transportation_Description">Transportation Description:</label>
            <input type="text" v-model="transportation_Description">
          </div>
          <div class="form-group">
            <label for="transportation_Fees">Transportation Fees (per month):</label>
            <input type="text" v-model="transportation_Fees">
          </div>
          <div class="form-group">
            <label for="transportation_Facilities">Transportation Facilities:</label>
            <input type="text" v-model="transportation_Facilities">
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <div class="form-section">
      <h1>Add University Admission Status</h1>
        <form @submit.prevent="admission">
          <div class="form-group">
            <label for="admission_Title">Admission Title:</label>
            <input type="text" v-model="admission_Title">
          </div>
          <div class="form-group">
            <label for="admission_Description">Admission Description:</label>
            <input type="text" v-model="admission_Description">
          </div>
          <div class="form-group">
            <label for="admission_Fees">Admission Fees (EGP):</label>
            <input type="text" v-model="admission_Fees">
          </div>
          <div class="form-group">
            <label for="admission_Facilities">Admission Facilities:</label>
            <input type="text" v-model="admission_Facilities">
          </div>
          <button type="submit">Add</button>
        </form>
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
          // Authentication data
          username: '',
           password: '',
           isAuthenticated: false,
            // Data properties for "handleSubmit"
            university: '',
            faculty: '',
            normal_or_Dual: '',
            programs: '',
            feesEgyption: '',
            feesNatives: '',
            section: '',
            thanwyaa_firstYear_score: '',
            thanwyaa_secondYear_score: '',
            azhar_firstYear_score: '',
            azhar_secondYear_score: '',
            Arabenglish_firstYear_score: '',
            Arabenglish_secondYear_score: '',
            wafdeen_score: '',

            // Data properties for "links"
            university_Name: '',
            university_Arabic_Name: '',
            university_Logo: '',
            Uni_Bio: '',
            location: '',
            website: '',
            phone: '',
            email: '',
            facebook: '',
            instagram: '',
            youtube: '',
            linkedin: '',
            first_year: '',
            second_year: '',
            international_programs: '',
            dorms_link: '',
            transportation_link: '',
            scholarship_link: '',
            Egyptian_Admission_link: '',
            Egyptian_Admission_link2: '',
            Egyptian_Transfer_link: '',
            Wafdeen_Admission_link: '',

            // Data properties for "dorms"
            spec: '',
            type: '',
            price: '',

            // Data properties for "transportation"
            spec2: '',
            type2: '',
            price2: '',

            // Data properties for "admission"
            university_admission: '',
            university_Arabic_Name_admission: '',
            transfer_status: '',
            thanwyaa_firstYear_status: '',
            thanwyaa_secondYear_status: '',
            azhar_firstYear_status: '',
            azhar_secondYear_status: '',
            Arabenglish_firstYear_status: '',
            Arabenglish_secondYear_status: '',
            wafdeen_status: '',
            guide_Url: '',
        };
    },
   methods: {
    handleLogin() {
      // Simple hardcoded authentication check
      if (this.username === 'admin' && this.password === 'admin') {
        this.isAuthenticated = true;
      } else {
        alert('Invalid username or password');
      }
    },
    handleSubmit() {
            const formData = {
                university: this.university,
                faculty: this.faculty,
                normal_or_Dual: this.normal_or_Dual,
                programs: this.programs,
                feesEgyption: this.feesEgyption,
                feesNatives: this.feesNatives,
                section: this.section,
                thanwyaa_firstYear_score: this.thanwyaa_firstYear_score,
                thanwyaa_secondYear_score: this.thanwyaa_secondYear_score,
                azhar_firstYear_score: this.azhar_firstYear_score,
                azhar_secondYear_score: this.azhar_secondYear_score,
                Arabenglish_firstYear_score: this.Arabenglish_firstYear_score,
                Arabenglish_secondYear_score: this.Arabenglish_secondYear_score,
                wafdeen_score: this.wafdeen_score,
            };

            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/internationalfaculty/addinternational', formData)
                .then(response => {
                    console.log(response.data);
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.error('Error adding facility:', error);
                    alert('Error when adding form');
                });
        },
        links() {
            const links_form_data = {
                university: this.university_Name,
                university_Arabic_Name: this.university_Arabic_Name,
                university_Logo: this.university_Logo,
                Uni_Bio: this.Uni_Bio,
                location: this.location,
                website: this.website,
                phone: this.phone,
                email: this.email,
                facebook: this.facebook,
                instagram: this.instagram,
                youtube: this.youtube,
                linkedin: this.linkedin,
                first_year: this.first_year,
                second_year: this.second_year,
                international_programs: this.international_programs,
                dorms_link: this.dorms_link,
                transportation_link: this.transportation_link,
                scholarship_link: this.scholarship_link,
                Egyptian_Admission_link: this.Egyptian_Admission_link,
                Egyptian_Admission_link2: this.Egyptian_Admission_link2,
                Egyptian_Transfer_link: this.Egyptian_Transfer_link,
                Wafdeen_Admission_link: this.Wafdeen_Admission_link,
            };

            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/internationallinks/add_internationallinks', links_form_data)
                .then(() => {
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.error('Error adding links:', error);
                });
        },
         dorms(){
            const form = {
                type: this.type,
                price: this.price,
                spec: this.spec
            }
            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/internationaldorms/addinternationaldorms', form).then(()=>{
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
            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/internationaltrans/addinternationaltrans', form).then(()=>{
                alert('form sent succesffully');
            }).catch(error=>{
                console.log(error);
            })
        },
        admission() {
            const form = {
                    university_admission: this.university_admission,
                    university_Arabic_Name_admission: this.university_Arabic_Name_admission,
                    transfer_status: this.transfer_status,
                    thanwyaa_firstYear_status: this.thanwyaa_firstYear_status,
                    thanwyaa_secondYear_status: this.thanwyaa_secondYear_status,
                    azhar_firstYear_status: this.azhar_firstYear_status,
                    azhar_secondYear_status: this.azhar_secondYear_status,
                    Arabenglish_firstYear_status: this.Arabenglish_firstYear_status,
                    Arabenglish_secondYear_status: this.Arabenglish_secondYear_status,
                    wafdeen_status: this.wafdeen_status,
                    guide_Url: this.guide_Url,
            };

            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/internationaladmission/add', form)
                .then(() => {
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.error('Error adding admission status:', error);
                });
        }
    }
};
</script>

<style scoped>
.parent {
  margin: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-form h2 {
  margin-bottom: 20px;
}

.login-form form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.login-form label {
  margin-bottom: 5px;
}

.login-form input[type="text"], 
.login-form input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.login-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #45a049;
}

/* Admin Panel styles */
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.form-section {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
