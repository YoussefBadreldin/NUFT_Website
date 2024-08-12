<template>
    <div class="parent">
        <h1>NUFT Admin Panel</h1>
        <br><br>
        <h1>الجامعات الاهلية</h1>
        <br><br>
        <h1>Add Faculties</h1>        
        <div class="container">
            <form @submit.prevent="handleSubmit">
                 <div>
                    <label for="university">Uni Short Name:</label>
                    <input type="text" v-model="university" id="university">
                </div>
                <div>
                    <label for="normal_or_Dual">Type (normal_or_Dual)</label>
                    <input type="text" id="normal_or_Dual" v-model="normal_or_Dual">
                </div>                           
                <div>
                    <label for="faculty">Faculty/Dual Program Name:</label>
                    <input type="text" v-model="faculty" id="faculty">
                </div>

                <div>
                    <label for="programs">Programs/Dual Program Details:</label>
                    <input type="text" v-model="programs" id="programs">
                </div>
                <div>
                    <label for="feesEgyption">Fees (Egyptian):</label>
                    <input type="text" v-model="feesEgyption" id="feesEgyption">
                </div>
                <div>
                    <label for="feesNatives">Fees (Wafedeen):</label>
                    <input type="text" v-model="feesNatives" id="feesNatives">
                </div>
                <div>
                    <label for="section">Section:</label>
                    <input type="text" v-model="section" id="section">
                </div>
                <div>
                    <label for="thanwyaa_firstYear_score">Thanwya Score (Past):</label>
                    <input type="text" v-model="thanwyaa_firstYear_score" id="thanwyaa_firstYear_score">
                </div>
                <div>
                    <label for="thanwyaa_secondYear_score">Thanwya Score (Current):</label>
                    <input type="text" v-model="thanwyaa_secondYear_score" id="thanwyaa_secondYear_score">
                </div>
                <div>
                    <label for="azhar_firstYear_score">Azhar Score (Past):</label>
                    <input type="text" v-model="azhar_firstYear_score" id="azhar_firstYear_score">
                </div>
                <div>
                    <label for="azhar_secondYear_score">Azhar Score (Current):</label>
                    <input type="text" v-model="azhar_secondYear_score" id="azhar_secondYear_score">
                </div>
                <div>
                    <label for="Arabenglish_firstYear_score">Arab & English Score (Past)</label>
                    <input type="text" v-model="Arabenglish_firstYear_score" id="Arabenglish_firstYear_score">
                </div>
                <div>
                    <label for="Arabenglish_secondYear_score">Arab & English Score (Current)</label>
                    <input type="text" v-model="Arabenglish_secondYear_score" id="Arabenglish_secondYear_score">
                </div>
                <div>
                    <label for="wafdeen_score">Wafdeen Score:</label>
                    <input type="text" v-model="wafdeen_score" id="wafdeen_score">
                </div>
                <br>
                <button type="submit">Add</button>
            </form>
        </div>

<br><br>

        <h1>Add Universties Info & Links</h1>
       <form @submit.prevent="links">    
    <div>
        <label for="university">Uni short name:</label>
        <input type="text" v-model="university2">
    </div>
    <div>
        <label for="university_Arabic_Name">University Arabic Name:</label>
        <input type="text" v-model="university_Arabic_Name">
    </div>
    <div>
        <label for="university_Logo">University Logo URL:</label>
        <input type="text" v-model="university_Logo">
    </div>
    <div>
        <label for="Uni_Bio">University Bio:</label>
        <input type="text" v-model="Uni_Bio">
    </div>
    <div>
        <label for="location">Location:</label>
        <input type="text" v-model="location">
    </div>
    <div>
        <label for="website">Website:</label>
        <input type="text" v-model="website">
    </div>
    <div>
        <label for="phone">Phone:</label>
        <input type="text" v-model="phone">
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="text" v-model="email">
    </div>
    <div>
        <label for="facebook">Facebook:</label>
        <input type="text" v-model="facebook">
    </div>
    <div>
        <label for="instagram">Instagram:</label>
        <input type="text" v-model="instagram">
    </div>
    <div>
        <label for="youtube">YouTube:</label>
        <input type="text" v-model="youtube">
    </div>
    <div>
        <label for="linkedin">LinkedIn:</label>
        <input type="text" v-model="linkedin">
    </div>
    <div>
        <label for="first_year">Tansik Past Year:</label>
        <input type="text" v-model="first_year">
    </div>
    <div>
        <label for="second_year">Tansik Current Year:</label>
        <input type="text" v-model="second_year">
    </div>
    <div>
        <label for="international_programs">International Programs Details:</label>
        <input type="text" v-model="international_programs">
    </div>
    <div>
        <label for="dorms_link">Dorms Details Link:</label>
        <input type="text" v-model="dorms_link">
    </div>
    <div>
        <label for="transportation_link">Transportation Details Link:</label>
        <input type="text" v-model="transportation_link">
    </div>
        <div>
        <label for="scholarship_link">scholarship Details Link:</label>
        <input type="text" v-model="scholarship_link">
    </div>
    <div>
        <label for="Egyptian_Admission_link">Egyptians Admission Link:</label>
        <input type="text" v-model="Egyptian_Admission_link">
    </div>
    <div>
        <label for="Egyptian_Admission_link2">Egyptians Admission Link (International Programs):</label>
        <input type="text" v-model="Egyptian_Admission_link2">
    </div>
    <div>
        <label for="Egyptian_Transfer_link">Egyptians Admission Link (Transfer):</label>
        <input type="text" v-model="Egyptian_Transfer_link">
    </div>
    <div>
        <label for="Wafdeen_Admission_link">Wafdeen Admission Link:</label>
        <input type="text" v-model="Wafdeen_Admission_link">
    </div>
            <br>
            <button type="submit">Add</button>
        </form>

<br><br>

        <h1>Add Universities Dorms</h1>
        <form @submit.prevent="dorms">
            <div>
                <label for="spec">Uni Short Name:</label>
                <input type="text" id="spec" v-model="spec">
            </div>
            <div>
                <label for="type">Type:</label>
                <input type="text" id="type" v-model="type">
            </div>
            <div>
                <label for="price">Price:</label>
                <input type="text" id="price" v-model="price">
            </div>
            <br>
            <button type="submit">Add</button>
        </form>

<br><br>

        <h1>Add Universities Transportation</h1>
        <form @submit.prevent="trans">
          <div>
                <label for="spec">Uni Short Name:</label>
                <input type="text" id="spec" v-model="spec2">
            </div>
            <div>
                <label for="type">type:</label>
                <input type="text" id="type" v-model="type2">
            </div>
            <div>
                <label for="price">price:</label>
                <input type="text" id="price" v-model="price2">
            </div>

            <br>
            <button type="submit">Add</button>
        </form>

<br><br>

        <h1>Add Admission Status</h1>
       <form @submit.prevent="admission">
    <div>
        <label for="university">Uni Short Name:</label>
        <input type="text" id="university" v-model="university3">
    </div>
    <div>
        <label for="university_Arabic_Name">Uni Arabic Name:</label>
        <input type="text" id="university_Arabic_Name" v-model="university_Arabic_Name2">
    </div>
    <div>
        <label for="transfer_status">Transfer Status:</label>
        <input type="text" id="transfer_status" v-model="transfer_status">
    </div>
    <div>
        <label for="thanwyaa_firstYear_status">Thanwya Status (past)</label>
        <input type="text" id="thanwyaa_firstYear_status" v-model="thanwyaa_firstYear_status">
    </div>
    <div>
        <label for="thanwyaa_secondYear_status">Thanwya Status (current):</label>
        <input type="text" id="thanwyaa_secondYear_status" v-model="thanwyaa_secondYear_status">
    </div>
    <div>
        <label for="azhar_firstYear_status">Azhar Status (past)</label>
        <input type="text" id="azhar_firstYear_status" v-model="azhar_firstYear_status">
    </div>
    <div>
        <label for="azhar_secondYear_status">Azhar Status (Current)</label>
        <input type="text" id="azhar_secondYear_status" v-model="azhar_secondYear_status">
    </div>
    <div>
        <label for="Arabenglish_firstYear_status">Arab & English Status (past):</label>
        <input type="text" id="Arabenglish_firstYear_status" v-model="Arabenglish_firstYear_status">
    </div>
    <div>
        <label for="Arabenglish_secondYear_status">Arab & English status (current):</label>
        <input type="text" id="Arabenglish_secondYear_status" v-model="Arabenglish_secondYear_status">
    </div>
    <div>
        <label for="wafdeen_status">Wafdeen Status:</label>
        <input type="text" id="wafdeen_status" v-model="wafdeen_status">
    </div>
    <div>
        <label for="guide_Url">Guide URL:</label>
        <input type="text" id="guide_Url" v-model="guide_Url">
    </div>
    <br>
    <button type="submit">Add</button>
</form>


        <br><br>   
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminPanel',
    data() {
        return {
            university: '',
            university_Arabic_Name: '',
            transfer_status: '',
            thanwyaa_firstYear_status: '',
            thanwyaa_secondYear_status: '',
            azhar_firstYear_status: '',
            azhar_secondYear_status: '',
            Arabenglish_firstYear_status: '',
            Arabenglish_secondYear_status: '',
            wafdeen_status: '',
            guide_Url: '',
            faculty: '',
            normal_or_Dual: '',
            registration_link: '',
            international_programs: '',
            transfer_link: '',
            programs: '',
            feesEgyption: '',
            feesNatives: '',
            section: '',
            firstYearThanwyaa: '',
            thanwyaa_firstYear_score: '',
            secondYearThanwyaa: '',
            thanwyaa_secondYear_score: '',
            firstYearAzhar: '',
            azhar_firstYear_score: '',
            secondYearAzhar: '',
            azhar_secondYear_score: '',
            firstYearStem: '',
            Arabenglish_firstYear_score: '',
            secondYearStem: '',
            Arabenglish_secondYear_score: '',
            wafdeen_score: '',
            scholarship_link: '',
            first_year: '',
            second_year: '',
            view_location: '',
            dorms_link: '',
            transportation_link: '',
            university_Name: '',
            register_link: '',
            Admission_link_egyption: '',
            Admission_link_natives: '',
            type: '',
            price: '',
            spec: '',
            type2: '',
            price2: '',
            spec2: '',
            f_name: '',
            addmission_spec: '',
            status_transfer: '',
            thanwyaaAmaaStatus_first: '',
            ArabEnglishAzhariCertificates_first: '',
            ArabEnglishAzhariCertificates_second: '',
            StemNileCertificates_first: '',
            StemNileCertificates_second: '',
            InternationalStudents: '',
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
            Egyptian_Admission_link: '',
            Egyptian_Admission_link2: '',
            Egyptian_Transfer_link: '',
            Wafdeen_Admission_link: ''
        };
    },
    methods: {
        handleSubmit() {
            const formData = {
                faculty: this.faculty,
                normal_or_Dual: this.normal_or_Dual,
                registration_link: this.registration_link,
                Admission_link_egyption: this.Admission_link_egyption,
                Admission_link_natives: this.Admission_link_natives,
                international_programs: this.international_programs,
                transfer_link: this.transfer_link,
                programs: this.programs,
                feesEgyption: this.feesEgyption,
                feesNatives: this.feesNatives,
                section: this.section,
                firstYearThanwyaa: this.firstYearThanwyaa,
                thanwyaa_firstYear_score: this.thanwyaa_firstYear_score,
                secondYearThanwyaa: this.secondYearThanwyaa,
                thanwyaa_secondYear_score: this.thanwyaa_secondYear_score,
                firstYearAzhar: this.firstYearAzhar,
                azhar_firstYear_score: this.azhar_firstYear_score,
                secondYearAzhar: this.secondYearAzhar,
                azhar_secondYear_score: this.azhar_secondYear_score,
                firstYearStem: this.firstYearStem,
                Arabenglish_firstYear_score: this.Arabenglish_firstYear_score,
                secondYearStem: this.secondYearStem,
                Arabenglish_secondYear_score: this.Arabenglish_secondYear_score,
                wafdeen_score: this.wafdeen_score,
                university: this.university,
                scholarship_link: this.scholarship_link,
                first_year: this.first_year,
                second_year: this.second_year,
                view_location: this.view_location,
                dorms_link: this.dorms_link,
                transportation_link: this.transportation_link,
                university_Name: this.university_Name,
                register_link: this.register_link,
                Egyptian_Admission_link: this.Egyptian_Admission_link,
                Egyptian_Admission_link2: this.Egyptian_Admission_link2,
                Egyptian_Transfer_link: this.Egyptian_Transfer_link,
                Wafdeen_Admission_link: this.Wafdeen_Admission_link
            };

            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/nationalfaculty/addnational', formData)
                .then(response => {
                    console.log(response.data);
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.error('Error adding faculty:', error);
                    alert('Error when adding form');
                });
        },
        links() {
            const links_form_data = {
                university: this.university,
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
                Wafdeen_Admission_link: this.Wafdeen_Admission_link
            };
            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/nationallinks/add_nationallinks', links_form_data)
                .then(() => {
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        dorms() {
            const form = {
                type: this.type,
                price: this.price,
                spec: this.spec
            };
            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/nationaldorms/addnationaldorms', form)
                .then(() => {
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        trans() {
            const form = {
                type: this.type2,
                price: this.price2,
                spec: this.spec2
            };
            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/nationaltrans/addnationaltrans', form)
                .then(() => {
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        admission() {
            const form = {
                university: this.university,
                university_Arabic_Name: this.university_Arabic_Name,
                transfer_status: this.transfer_status,
                thanwyaa_firstYear_status: this.thanwyaa_firstYear_status,
                thanwyaa_secondYear_status: this.thanwyaa_secondYear_status,
                azhar_firstYear_status: this.azhar_firstYear_status,
                azhar_secondYear_status: this.azhar_secondYear_status,
                Arabenglish_firstYear_status: this.Arabenglish_firstYear_status,
                Arabenglish_secondYear_status: this.Arabenglish_secondYear_status,
                wafdeen_status: this.wafdeen_status,
                guide_Url: this.guide_Url
            };
            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/nationaladmission/add', form)
                .then(() => {
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.log(error);
                });
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
</style>