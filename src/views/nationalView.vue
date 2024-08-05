<template>
    <div>    
    <HeaderComponent />
    <!-- ################# Page Title #######################--->
    <div class="page-nav row">
        <h2>National Universities Guidebook</h2>
        <ul>
        <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
        <li><router-link to="/UniversitiesGuide"><i class="fas fa-chevron-right"></i> Universities Guidebooks</router-link></li>
        <li><router-link to="/UniversitiesGuide/UGRAD"><i class="fas fa-chevron-right"></i> Undergraduate Guidebooks</router-link></li>
        <li><router-link to="/UniversitiesGuide/UGRAD/National"><i class="fas fa-chevron-right"></i> National Universities</router-link></li>
        </ul>
    </div>

    <!-- ################# Cards Box #######################--->
    <div class="Card-Box">
        <div class="container" style="text-align: center;">
        <!-- Add your text here -->
        <h3>Introduction and Admission Requirements for National Universities</h3>
        <h5><br>What are the Egyptian National universities?</h5>
        These are non-profit universities that reinvest all fees into the institution's budget to enhance the university's facilities and services. They are known for their affordable fees compared to private universities and for the advanced educational curricula and capabilities provided in collaboration with local and foreign entities. They are governed by the Private and National Universities Law No. 12 of 2009, its executive regulations, and Law No. 143 of 2019, which amends some provisions of the Private and National Universities Law issued by Law No. 12 of 2009. They are under the supervision of the Supreme Council of National Universities. There are 30 universities in total, with 10 still under construction.
        <br><br>
        <h5>What is the mechanism and conditions for applying to Egyptian private universities for the academic year 2024/2023?</h5>
        - Applications for those who have obtained equivalent Arabic and foreign certificates in 2022 and 2023, Azhar certificates in 2022, certificates of schools of excellence and Nile schools in 2022, and Egyptian general secondary in 2022 start on Tuesday, May 9, 2023, with the final certificate proving the student's final total.
        <br>- Applications for those who have obtained the Egyptian general secondary in 2023, Azhar certificates in 2023, certificates of schools of excellence and Nile schools in 2023, start after the results are announced, with the final certificate proving the student's final total.
        <br>- King Salman International University accepts technical diplomas in some academic fields.
        <br>- The application process is direct for each university, either electronically or on paper at the university headquarters, according to the decision of each university.
        <br>- The admission system is unified without admission tests and is based on the priority of application or competition between the totals of applicants according to the decision of each university, and by completing the required documents until the available places are filled.
        <h3><br>National Universities Categories Guidebooks</h3>
        <div class="row Box-ro">
            <div class="col-md-4">
            <router-link to="/UniversitiesGuide/UGRAD/soon">
                <div class="Box-card">
                <img src="/images/Categories/NormalNU.png" alt="Normal National Universities">
                <div class="Box-det" style="text-align: center;">
                    <h6>Normal National Universities</h6>
                </div>
                </div>
            </router-link>
            </div>
            <div class="col-md-4">
            <router-link to="/UniversitiesGuide/UGRAD/National/International">
                <div class="Box-card">
                <img src="/images/Categories/InternationalNU.png" alt="International National Universities">
                <div class="Box-det" style="text-align: center;">
                    <h6>International National Universities</h6>
                </div>
                </div>
            </router-link>
            </div>
            <div class="col-md-4">
            <router-link to="/UniversitiesGuide/UGRAD/soon">
                <div class="Box-card">
                <img src="/images/Categories/AffiliatedNU.png" alt="Affiliated National Universities">
                <div class="Box-det" style="text-align: center;">
                    <h6>Affiliated National Universities</h6>
                </div>
                </div>
            </router-link>
            </div>
        </div>
        </div>
    </div>


    <FooterComponent />

    </div>
</template>

<script>
import HeaderComponent from '../../public/global/headerComponent.vue';
import FooterComponent from '../../public/global/footerComponent.vue';

export default {
    components: {
    HeaderComponent,
    FooterComponent,
    }
}
</script>

<style>
/* Add your component-specific styles here */
</style>
