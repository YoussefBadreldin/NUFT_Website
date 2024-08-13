<template>
    <div class="parent">
        <h1>NUFT Admin Panel</h1>
        <br><br>
        <h1>الجامعات الاهلية</h1>
        <br><br>
        <h1>Add University Faculties</h1>        
        <div class="container">
            <form @submit.prevent="handleSubmit">
                <div>
                    <label for="university">University:</label>
                    <input type="text" v-model="university" id="university">
                </div>
                <div>
                    <label for="faculty">Faculty:</label>
                    <input type="text" v-model="faculty" id="faculty">
                </div>
                <div>
                    <label for="normal_or_Dual">Type (Normal or Dual):</label>
                    <input type="text" v-model="normal_or_Dual" id="normal_or_Dual">
                </div>                           
                <div>
                    <label for="programs">Programs:</label>
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
                    <label for="Arabenglish_firstYear_score">Arabenglish Score (Past):</label>
                    <input type="text" v-model="Arabenglish_firstYear_score" id="Arabenglish_firstYear_score">
                </div>
                <div>
                    <label for="Arabenglish_secondYear_score">Arabenglish Score (Current):</label>
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

        <h1>Add University Info & Links</h1>
        <form @submit.prevent="links">    
            <div>
                <label for="university_Name">University:</label>
                <input type="text" v-model="university_Name">
            </div>
            <div>
                <label for="university_Arabic_Name">University Arabic Name:</label>
                <input type="text" v-model="university_Arabic_Name">
            </div>
            <div>
                <label for="university_Logo">University Logo:</label>
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
                <label for="scholarship_link">Scholarship Details Link:</label>
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

        <h1>Add University Dorms</h1>
        <form @submit.prevent="dorms">
            <div>
                <label for="spec">University:</label>
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

        <h1>Add University Transportation</h1>
        <form @submit.prevent="trans">
            <div>
                <label for="spec2">University:</label>
                <input type="text" id="spec2" v-model="spec2">
            </div>
            <div>
                <label for="type2">Type:</label>
                <input type="text" id="type2" v-model="type2">
            </div>
            <div>
                <label for="price2">Price:</label>
                <input type="text" id="price2" v-model="price2">
            </div>
            <br>
            <button type="submit">Add</button>
        </form>

        <br><br>

        <h1>Add University Admission Status</h1>
        <form @submit.prevent="admission">
        <div>
            <label for="university_admission">University:</label>
            <input type="text" id="university_admission" v-model="university_admission">
        </div>
        <div>
            <label for="university_Arabic_Name_admission">University Arabic Name:</label>
            <input type="text" id="university_Arabic_Name_admission" v-model="university_Arabic_Name_admission">
        </div>
        <div>
            <label for="transfer_status">Transfer Status:</label>
            <input type="text" id="transfer_status" v-model="transfer_status">
        </div>
        <div>
            <label for="thanwyaa_firstYear_status">Thanwyaa First Year Status:</label>
            <input type="text" id="thanwyaa_firstYear_status" v-model="thanwyaa_firstYear_status">
        </div>
        <div>
            <label for="thanwyaa_secondYear_status">Thanwyaa Second Year Status:</label>
            <input type="text" id="thanwyaa_secondYear_status" v-model="thanwyaa_secondYear_status">
        </div>
        <div>
            <label for="azhar_firstYear_status">Azhar First Year Status:</label>
            <input type="text" id="azhar_firstYear_status" v-model="azhar_firstYear_status">
        </div>
        <div>
            <label for="azhar_secondYear_status">Azhar Second Year Status:</label>
            <input type="text" id="azhar_secondYear_status" v-model="azhar_secondYear_status">
        </div>
        <div>
            <label for="Arabenglish_firstYear_status">Arabenglish First Year Status:</label>
            <input type="text" id="Arabenglish_firstYear_status" v-model="Arabenglish_firstYear_status">
        </div>
        <div>
            <label for="Arabenglish_secondYear_status">Arabenglish Second Year Status:</label>
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
        <br>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminPanel',
    data() {
        return {
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

            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/privatefaculty/addprivate', formData)
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

            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/privatelinks/add_privatelinks', links_form_data)
                .then(() => {
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.error('Error adding links:', error);
                });
        },
        dorms() {
            const form = {
                spec: this.spec,
                type: this.type,
                price: this.price,
            };

            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/info/addprivatedorms', form)
                .then(() => {
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.error('Error adding dorms:', error);
                });
        },
        trans() {
            const form = {
                spec: this.spec2,
                type: this.type2,
                price: this.price2,
            };

            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/privatetrans/addprivatetrans', form)
                .then(() => {
                    alert('Form sent successfully');
                })
                .catch(error => {
                    console.error('Error adding transportation:', error);
                });
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

            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/privateadmission/add', form)
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