<template>
    <div>

        <HeaderComponent />

        <body>

            <!-- ################# Page Title #######################--->
            <div class="page-nav row">
                <h2>Equivalent Certificates Calculator</h2>
                <ul>
                    <li><a href="/"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="/CertificatesCalculator"><i class="fas fa-chevron-right"></i> Certificates
                            Calculator</a></li>
                </ul>
            </div>

            <div class="Card-Box">
                <div class="container">
                    <br>
                    <div class="row Box-ro">
                        <div class="col-md-4">
                            <a href="/CertificatesCalculator/American">
                                <div class="Box-card">
                                    <img src="/images/Certificates/American.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>American Diploma</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/CertificatesCalculator/IGCSE">
                                <div class="Box-card">
                                    <img src="/images/Certificates/IGCSE.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>IGCSE</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/CertificatesCalculator/Azhari">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Azhari.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>Azhari Certificate</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/CertificatesCalculator/STEM">
                                <div class="Box-card">
                                    <img src="/images/Certificates/STEM.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>STEM Certificate</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/CertificatesCalculator/Nile">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Nile.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>Nile Certificate</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/CertificatesCalculator/Saudi">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Saudi.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>Saudi Certificate</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/CertificatesCalculator/Kuwaiti">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Kuwaiti.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>Kuwaiti Certificate</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/CertificatesCalculator/Bahraini">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Bahraini.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>Bahraini Certificate</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </body>
        <smart-assistant />
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import SmartAssistant from '../../../public/global/smartAssistant.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
export default {
    name: 'CertificatesCalculator',
    components: {
        HeaderComponent,
        SmartAssistant,
        FooterComponent,
    }
}
</script>