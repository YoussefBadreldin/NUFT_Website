<template>
    <div>

        <HeaderComponent />

        <body>

            <div class="page-nav row">
                <h2>معادلة الشهادات</h2>
            </div>

            <div class="Card-Box">
                <div class="container" dir="rtl">
                    <br>
                    <div class="row Box-ro">
                        <div class="col-md-4">
                            <a href="/Calculator/American">
                                <div class="Box-card">
                                    <img src="/images/Certificates/American.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>الدبلومة الامريكية</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="/Calculator/IGCSE">
                                <div class="Box-card">
                                    <img src="/images/Certificates/IGCSE.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>الثانوية البريطانية</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <!--<div class="col-md-4">
                            <a href="/Calculator/Azhari">
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
                            <a href="/Calculator/STEM">
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
                            <a href="/Calculator/Nile">
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
                            <a href="/Calculator/Saudi">
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
                            <a href="/Calculator/Kuwaiti">
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
                            <a href="/Calculator/Bahraini">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Bahraini.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>Bahraini Certificate</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>-->
                    </div>
                </div>
            </div>

        </body>
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
export default {
    name: 'CertificatesCalculator',
    components: {
        HeaderComponent,
        FooterComponent,
    }
}
</script>