<template>
    <div>
        <header-component />

        <!-- ################# Page Title #######################--->
        <div class="page-nav row">
            <h2>Scholarships</h2>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="/Scholarships"><i class="fas fa-chevron-right"></i> Scholarships</a></li>
            </ul>
        </div>

        <!-- ################# Cards Box #######################--->
        <div class="Card-Box">
            <div class="container">
                <br>
                <div class="row Box-ro">
                    <div class="col-md-4">
                        <a href="/Scholarships/UGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/UGRADScholarships.png" alt="">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Undergraduate</h6>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4">
                        <a href="/Scholarships/PGRAD">
                            <div class="Box-card">
                                <img src="/images/Categories/PGRADScholarships.png" alt="">
                                <div class="Box-det" style="text-align: center;">
                                    <h6>Postgraduate</h6>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <SmartAssistant />
        <footer-component />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import SmartAssistant from '../../../public/global/smartAssistant.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name:"ScholarShips",
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent,
    }
}
</script>