<template>
    <div>
        <header-component />
        <!-- ################# Page Title ####################### --->
        <div class="page-nav row">
            <h2>Undergraduate Scholarships</h2>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="/Scholarships"><i class="fas fa-chevron-right"></i> Scholarships</a></li>
                <li><i class="fas fa-chevron-right"></i> <a href="/Scholarships/UGRADScholarships">Undergraduate</a>
                </li>
            </ul>
        </div>

        <!-- ################# Empty Space ####################### --->
        <div class="our-Services">
            <div class="container">
                <div class="session-title row">
                    <!-- Session title goes here -->
                </div>
            </div>

            <!-- ################# Cards Box ####################### --->
            <div class="our-blog bb3 pc2">
                <div class="container">
                    <div class="row-news row">
                        <div class="col-md-10 vbf mx-auto">
                            <div class="news-card row">
                                <div class="col-2">
                                    <div class="date-box">
                                        <p>Full</p>
                                        <small>Scholarships</small>
                                    </div>
                                </div>
                                <div class="col-7 setv">
                                    <h4><a href="#">Scholarships in field of computer science at Nile University</a>
                                    </h4>
                                    <p>
                                        <strong>Eligibility Criteria:</strong>
                                    <ul>
                                        <li>- Egyptian student</li>
                                    </ul>
                                    </p>
                                    <p>
                                        <strong>Application Process:</strong>
                                    <ul>
                                        <li>- Visit <a class="application-link" href="http://www.google.com"
                                                target="_blank">this link</a> to access the application form.</li>
                                    </ul>
                                    </p>
                                </div>
                                <div class="col-3 img-cv">
                                    <img src="/images/Logos/Universites/National/NU.png" alt="Nile University">
                                </div>
                            </div>
                            <!-- Repeat for other scholarships cards -->
                        </div>
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
    name:"ScholarshipsUGRAD",
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent,
    },
}
</script>