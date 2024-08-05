<template>
    <div class="parent">
        <h1>Hello, it's the admin panel</h1>
        <div class="container">
            <form @submit.prevent="handleSubmit">
                <div>
                    <label for="facilities">Facilities:</label>
                    <input type="text" v-model="facilities" id="facilities">
                </div>
                <div>
                    <label for="facality_or_international">facality_or_international</label>
                    <input type="text" id="facality_or_international" v-model="facality_or_international">
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
                    <label for="feesNatives">Fees (Natives):</label>
                    <input type="text" v-model="feesNatives" id="feesNatives">
                </div>
                <div>
                    <label for="section">Section:</label>
                    <input type="text" v-model="section" id="section">
                </div>
                <!-- <div>
                    <label for="firstYearThanwyaa">First Year Thanwyaa:</label>
                    <input type="text" v-model="firstYearThanwyaa" id="firstYearThanwyaa">
                </div> -->
                <div>
                    <label for="scoreFirst">Score First Thanwya:</label>
                    <input type="text" v-model="scoreFirst" id="scoreFirst">
                </div>
                <!-- <div>
                    <label for="secondYearThanwyaa">Second Year Thanwyaa:</label>
                    <input type="text" v-model="secondYearThanwyaa" id="secondYearThanwyaa">
                </div> -->
                <div>
                    <label for="scoreSecond">Score Second thanwya:</label>
                    <input type="text" v-model="scoreSecond" id="scoreSecond">
                </div>
                <!-- <div>
                    <label for="firstYearAzhar">First Year Azhar:</label>
                    <input type="text" v-model="firstYearAzhar" id="firstYearAzhar">
                </div> -->
                <div>
                    <label for="scorefirstAzhar">Score First Azhar:</label>
                    <input type="text" v-model="scorefirstAzhar" id="scorefirstAzhar">
                </div>
                <!-- <div>
                    <label for="secondYearAzhar">Second Year Azhar:</label>
                    <input type="text" v-model="secondYearAzhar" id="secondYearAzhar">
                </div> -->
                <div>
                    <label for="scoreYearsecondAzhar">Score Second Azhar:</label>
                    <input type="text" v-model="scoreYearsecondAzhar" id="scoreYearsecondAzhar">
                </div>
                <!-- <div>
                    <label for="firstYearStem">First Year Stem:</label>
                    <input type="text" v-model="firstYearStem" id="firstYearStem">
                </div> -->
                <div>
                    <label for="scorefirstStem">Score First Stem:</label>
                    <input type="text" v-model="scorefirstStem" id="scorefirstStem">
                </div>
                <!-- <div>
                    <label for="secondYearStem">Second Year Stem:</label>
                    <input type="text" v-model="secondYearStem" id="secondYearStem">
                </div> -->
                <div>
                    <label for="scoreYearsecondStem">Score Second Stem:</label>
                    <input type="text" v-model="scoreYearsecondStem" id="scoreYearsecondStem">
                </div>
                <div>
                    <label for="minimumForNatives">Minimum for Natives:</label>
                    <input type="text" v-model="minimumForNatives" id="minimumForNatives">
                </div>
                <div>
                    <label for="speciality">Speciality:</label>
                    <input type="text" v-model="speciality" id="speciality">
                </div>
                <div>
                    <label for="detailsSchoolarship">detailsSchoolarship:</label>
                    <input type="text" v-model="detailsSchoolarship" id="detailsSchoolarship">
                </div>
                <!-- <div>
                    <label for="details_about_internationa_program">details_about_internationa_program</label>
                    <input type="text" id='details_about_internationa_program' v-model="details_about_internationa_program">
                </div> -->
                <button type="submit">Submit</button>
            </form>
        </div>
        <form @submit.prevent="links">
            
            <div>
                <label for="first_year">first_year</label>
                <input type="text" v-model="first_year">
            </div>
            <div>
                <label for="second_year">second_year</label>
                <input type="text" v-model="second_year">
            </div>
            <div>
                <label for="details_about_internationa_program">details_about_international_program</label>
                <input type="text" v-model="details_about_internationa_program">
            </div>
            <!-- <div>
                <label for="details_about_internationa_program">details_about_international_program</label>
                <input type="text" v-model="details_about_internationa_program">
            </div> -->
            <!-- <div>
                <label for="view_location">view_location</label>
                <input type="text" v-model="view_location">
            </div> -->
            <div>
                <label for="register_link_dorms">register_link_dorms</label>
                <input type="text" v-model="register_link_dorms">
            </div>
            <div>
                <label for="register_link_transportation">register_link_transportation</label>
                <input type="text" v-model="register_link_transportation">
            </div>
            <div>
                <label for="view_location">view_location</label>
                <input type="text" v-model="view_location">
            </div>
            <div>
                <label for="register_link">Admission link for egytion</label>
                <input type="text" v-model="register_link">
            </div>
            <div>
                <label for="Admission_link_egyption">Admission_link_egyption(international)</label>
                <input type="text" v-model="Admission_link_egyption">
            </div>
            <div>
                <label for="Admission_link_natives">Admission_link_natives</label>
                <input type="text" v-model="Admission_link_natives">
            </div>
            <div>
                <label for="international_program_link">transfer link fro egyption students</label>
                <input type="text" v-model="international_program_link">
            </div>
            <div>
                <label for="transfer_link">transfer_link</label>
                <input type="text" id="transfer_link" v-model="transfer_link">
            </div>
            <div>
                <label for="university_Name">university_Name</label>
                <input type="text" v-model="university_Name">
            </div>
            <button type="submit">Submit</button>
        </form>
        <form @submit.prevent="dorms">
            <div>
                <label for="type">Type</label>
                <input type="text" id="type" v-model="type">
            </div>
            <div>
                <label for="price">Price</label>
                <input type="text" id="price" v-model="price">
            </div>
            <div>
                <label for="spec">spec</label>
                <input type="text" id="spec" v-model="spec">
            </div>
            <button type="submit">Submit</button>
        </form>
        <form @submit.prevent="trans">
            <div>
                <label for="type">type</label>
                <input type="text" id="type" v-model="type2">
            </div>
            <div>
                <label for="price">price</label>
                <input type="text" id="price" v-model="price2">
            </div>
            <div>
                <label for="spec">spec</label>
                <input type="text" id="spec" v-model="spec2">
            </div>
            <button type="submit">Submit</button>
        </form>
        <h1>Add News</h1>
        <form @submit.prevent="newsfunction">
            <div>
                <label for="news">News</label>
                <textarea name="" id="" cols="30" rows="10" v-model="news"></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
        <h1>Admission Status</h1>
        <form @submit.prevent="admission">
            <div>
                <label for="f_name">Faclity Name</label>
                <input type="text" id="f_name" v-model="f_name">
            </div>
            <div>
                <label for="spec">Specility</label>
                <input type="text" id="spec" v-model="addmission_spec">
            </div>
            <div>
                <label for="trans">statusTransfer</label>
                <input type="text" id="trans" v-model="status_transfer">
            </div>
            <div>
                <label for="thanwyaaAmaaStatus_first">thanwyaaAmaaStatus_first</label>
                <input type="text" id="thanwyaaAmaaStatus_first" v-model="thanwyaaAmaaStatus_first">
            </div>
            <div>
                <label for="thanwyaaAmaaStatus_second">thanwyaaAmaaStatus_second</label>
                <input type="text" id="thanwyaaAmaaStatus_second" v-model="thanwyaaAmaaStatus_second">
            </div>
            <div>
                <label for="ArabEnglishAzhariCertificates_first">ArabEnglishAzhariCertificates_first</label>
                <input type="text" id="ArabEnglishAzhariCertificates_first" v-model="ArabEnglishAzhariCertificates_first">
            </div>
            <div>
                <label for="ArabEnglishAzhariCertificates_second">ArabEnglishAzhariCertificates_second</label>
                <input type="text" id="ArabEnglishAzhariCertificates_second" v-model="ArabEnglishAzhariCertificates_second">
            </div>
            <div>
                <label for="StemNileCertificates_first">StemNileCertificates_first</label>
                <input type="text" id="StemNileCertificates_first" v-model="StemNileCertificates_first">
            </div>
            <div>
                <label for="StemNileCertificates_second">StemNileCertificates_second</label>
                <input type="text" id="StemNileCertificates_second" v-model="StemNileCertificates_second">
            </div>
            <div>
                <label for="InternationalStudents">InternationalStudents</label>
                <input type="text" id="InternationalStudents" v-model="InternationalStudents">
            </div>
            <button type="submit">Submit</button>
        </form>
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
</style>
