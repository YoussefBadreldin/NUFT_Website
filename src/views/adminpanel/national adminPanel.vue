<template>
    <div class="parent">
        <h1>NUFT Admin Panel</h1>
        <br><br>
        <h1>الجامعات الاهلية</h1>
        <br><br>
        <h1>Add Faculties</h1>
        <div class="container">
            <form @submit.prevent="addFaculty">
                <div>
                    <label for="university">Uni Short Name:</label>
                    <input type="text" v-model="facultyData.university" id="university">
                </div>
                <div>
                    <label for="normal_or_Dual">Type (normal_or_Dual)</label>
                    <input type="text" id="normal_or_Dual" v-model="facultyData.normal_or_Dual">
                </div>                           
                <div>
                    <label for="faculty">Faculty/Dual Program Name:</label>
                    <input type="text" v-model="facultyData.faculty" id="faculty">
                </div>
                <div>
                    <label for="programs">Programs/Dual Program Details:</label>
                    <input type="text" v-model="facultyData.programs" id="programs">
                </div>
                <div>
                    <label for="feesEgyption">Fees (Egyptian):</label>
                    <input type="text" v-model="facultyData.feesEgyption" id="feesEgyption">
                </div>
                <div>
                    <label for="feesNatives">Fees (Wafedeen):</label>
                    <input type="text" v-model="facultyData.feesNatives" id="feesNatives">
                </div>
                <div>
                    <label for="section">Section:</label>
                    <input type="text" v-model="facultyData.section" id="section">
                </div>
                <div>
                    <label for="thanwyaa_firstYear_score">Thanwya Score (Past):</label>
                    <input type="text" v-model="facultyData.thanwyaa_firstYear_score" id="thanwyaa_firstYear_score">
                </div>
                <div>
                    <label for="thanwyaa_secondYear_score">Thanwya Score (Current):</label>
                    <input type="text" v-model="facultyData.thanwyaa_secondYear_score" id="thanwyaa_secondYear_score">
                </div>
                <div>
                    <label for="azhar_firstYear_score">Azhar Score (Past):</label>
                    <input type="text" v-model="facultyData.azhar_firstYear_score" id="azhar_firstYear_score">
                </div>
                <div>
                    <label for="azhar_secondYear_score">Azhar Score (Current):</label>
                    <input type="text" v-model="facultyData.azhar_secondYear_score" id="azhar_secondYear_score">
                </div>
                <div>
                    <label for="Arabenglish_firstYear_score">Arab & English Score (Past)</label>
                    <input type="text" v-model="facultyData.Arabenglish_firstYear_score" id="Arabenglish_firstYear_score">
                </div>
                <div>
                    <label for="Arabenglish_secondYear_score">Arab & English Score (Current)</label>
                    <input type="text" v-model="facultyData.Arabenglish_secondYear_score" id="Arabenglish_secondYear_score">
                </div>
                <div>
                    <label for="wafdeen_score">Wafdeen Score:</label>
                    <input type="text" v-model="facultyData.wafdeen_score" id="wafdeen_score">
                </div>
                <br>
                <button type="submit">Add</button>
            </form>
        </div>

        <br><br>

        <h1>Add Universities Info & Links</h1>
        <form @submit.prevent="addUniversityInfo">    
            <div>
                <label for="university">Uni short name:</label>
                <input type="text" v-model="universityInfo.university">
            </div>
            <div>
                <label for="university_Arabic_Name">University Arabic Name:</label>
                <input type="text" v-model="universityInfo.university_Arabic_Name">
            </div>
            <div>
                <label for="university_Logo (/images/Logos/Universites/National/)">University Logo URL:</label>
                <input type="text" v-model="universityInfo.university_Logo">
            </div>
            <div>
                <label for="Uni_Bio">University Bio:</label>
                <input type="text" v-model="universityInfo.Uni_Bio">
            </div>
            <div>
                <label for="location (https://)">Location:</label>
                <input type="text" v-model="universityInfo.location">
            </div>
            <div>
                <label for="website (https://)">Website:</label>
                <input type="text" v-model="universityInfo.website">
            </div>
            <div>
                <label for="phone">Phone:</label>
                <input type="text" v-model="universityInfo.phone">
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="text" v-model="universityInfo.email">
            </div>
            <div>
                <label for="facebook (https://)">Facebook:</label>
                <input type="text" v-model="universityInfo.facebook">
            </div>
            <div>
                <label for="instagram (https://)">Instagram:</label>
                <input type="text" v-model="universityInfo.instagram">
            </div>
            <div>
                <label for="youtube (https://)">YouTube:</label>
                <input type="text" v-model="universityInfo.youtube">
            </div>
            <div>
                <label for="linkedin (https://)">LinkedIn:</label>
                <input type="text" v-model="universityInfo.linkedin">
            </div>
            <div>
                <label for="first_year">Tansik Past Year:</label>
                <input type="text" v-model="universityInfo.first_year">
            </div>
            <div>
                <label for="second_year">Tansik Current Year:</label>
                <input type="text" v-model="universityInfo.second_year">
            </div>
            <div>
                <label for="international_programs (https://)">International Programs Details:</label>
                <input type="text" v-model="universityInfo.international_programs">
            </div>
            <div>
                <label for="dorms_link (https://)">Dorms Details Link:</label>
                <input type="text" v-model="universityInfo.dorms_link">
            </div>
            <div>
                <label for="transportation_link (https://)">Transportation Details Link:</label>
                <input type="text" v-model="universityInfo.transportation_link">
            </div>
            <div>
                <label for="scholarship_link (https://)">Scholarship Details Link:</label>
                <input type="text" v-model="universityInfo.scholarship_link">
            </div>
            <div>
                <label for="Egyptian_Admission_link (https://)">Egyptians Admission Link:</label>
                <input type="text" v-model="universityInfo.Egyptian_Admission_link">
            </div>
            <div>
                <label for="Egyptian_Admission_link2 (https://)">Egyptians Admission Link (International Programs):</label>
                <input type="text" v-model="universityInfo.Egyptian_Admission_link2">
            </div>
            <div>
                <label for="Egyptian_Transfer_link (https://)">Egyptians Admission Link (Transfer):</label>
                <input type="text" v-model="universityInfo.Egyptian_Transfer_link">
            </div>
            <div>
                <label for="Wafdeen_Admission_link (https://)">Wafdeen Admission Link:</label>
                <input type="text" v-model="universityInfo.Wafdeen_Admission_link">
            </div>
            <br>
            <button type="submit">Add</button>
        </form>

        <br><br>

        <h1>Add Universities Dorms</h1>
        <form @submit.prevent="addDorms">
            <div>
                <label for="spec">Uni Short Name:</label>
                <input type="text" id="spec" v-model="dormsData.spec">
            </div>
            <div>
                <label for="type">Type:</label>
                <input type="text" id="type" v-model="dormsData.type">
            </div>
            <div>
                <label for="price">Price:</label>
                <input type="text" id="price" v-model="dormsData.price">
            </div>
            <br>
            <button type="submit">Add</button>
        </form>

        <br><br>

        <h1>Add Universities Transportation</h1>
        <form @submit.prevent="addTransportation">
            <div>
                <label for="spec">Uni Short Name:</label>
                <input type="text" id="spec2" v-model="transportationData.spec2">
            </div>
            <div>
                <label for="type">Type:</label>
                <input type="text" id="type2" v-model="transportationData.type2">
            </div>
            <div>
                <label for="price">Price:</label>
                <input type="text" id="price2" v-model="transportationData.price2">
            </div>
            <br>
            <button type="submit">Add</button>
        </form>

        <br><br>

        <h1>Add Admission Status</h1>
        <form @submit.prevent="admission">
            <div>
                <label for="university">University Short Name:</label>
                <input type="text" id="university" v-model="admissionData.university">
            </div>
            <div>
                <label for="university_Arabic_Name">University Arabic Name:</label>
                <input type="text" id="university_Arabic_Name" v-model="admissionData.university_Arabic_Name">
            </div>
            <div>
                <label for="transfer_status">Transfer Status:</label>
                <input type="text" id="transfer_status" v-model="admissionData.transfer_status">
            </div>
            <div>
                <label for="thanwyaa_firstYear_status">Thanwyaa Past Year Status:</label>
                <input type="text" id="thanwyaa_firstYear_status" v-model="admissionData.thanwyaa_firstYear_status">
            </div>
            <div>
                <label for="thanwyaa_secondYear_status">Thanwyaa Current Year Status:</label>
                <input type="text" id="thanwyaa_secondYear_status" v-model="admissionData.thanwyaa_secondYear_status">
            </div>
            <div>
                <label for="azhar_firstYear_status">Azhar Past Year Status:</label>
                <input type="text" id="azhar_firstYear_status" v-model="admissionData.azhar_firstYear_status">
            </div>
            <div>
                <label for="azhar_secondYear_status">Azhar Current Year Status:</label>
                <input type="text" id="azhar_secondYear_status" v-model="admissionData.azhar_secondYear_status">
            </div>
            <div>
                <label for="Arabenglish_firstYear_status">Arab & English Past Year Status:</label>
                <input type="text" id="Arabenglish_firstYear_status" v-model="admissionData.Arabenglish_firstYear_status">
            </div>
            <div>
                <label for="Arabenglish_secondYear_status">Arab & English Current Year Status:</label>
                <input type="text" id="Arabenglish_secondYear_status" v-model="admissionData.Arabenglish_secondYear_status">
            </div>
            <div>
                <label for="wafdeen_status">Wafdeen Status:</label>
                <input type="text" id="wafdeen_status" v-model="admissionData.wafdeen_status">
            </div>
            <div>
                <label for="guide_Url">Guide URL (/Guide/UGRAD/national):</label>
                <input type="text" id="guide_Url" v-model="admissionData.guide_Url">
            </div>
            <br>
            <button type="submit">Add</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            facultyData: {
                university: '',
                normal_or_Dual: '',
                faculty: '',
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
            },
            universityInfo: {
                university: '',
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
            },
            dormsData: {
                spec: '',
                type: '',
                price: '',
            },
            transportationData: {
                spec2: '',
                type2: '',
                price2: '',
            },
            admissionData: {
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
            },
        };
    },
    methods: {
        addFaculty() {
            console.log('Faculty Data:', this.facultyData);
            // Reset form
            this.facultyData = {
                university: '',
                normal_or_Dual: '',
                faculty: '',
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
            };
        },
        addUniversityInfo() {
            console.log('University Info:', this.universityInfo);
            // Reset form
            this.universityInfo = {
                university: '',
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
            };
        },
        addDorms() {
            console.log('Dorms Data:', this.dormsData);
            // Reset form
            this.dormsData = {
                spec: '',
                type: '',
                price: '',
            };
        },
        addTransportation() {
            console.log('Transportation Data:', this.transportationData);
            // Reset form
            this.transportationData = {
                spec2: '',
                type2: '',
                price2: '',
            };
        },
        admission() {
            console.log('Admission Data:', this.admissionData);
            // Reset form
            this.admissionData = {
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
            };
        },
    },
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