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
                                        <h6>معادلة الدبلومة الامريكية</h6>
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
                                        <h6>معادلة الثانوية البريطانية</h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Azhari.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>معادلة الثانوية الازهرية <strong>(قريبا)</strong></h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="">
                                <div class="Box-card">
                                    <img src="/images/Certificates/STEM.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>معادلة الثانوية المصرية للمتفوقين STEM <strong>(قريبا)</strong></h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Nile.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>معادلة ثانوية مدارس النيل الدولية <strong>(قريبا)</strong></h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Saudi.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>معادلة الثانوية السعودية <strong>(قريبا)</strong></h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Kuwaiti.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>معادلة الثانوية الكويتية <strong>(قريبا)</strong></h6>
                                        <ul>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-md-4">
                            <a href="">
                                <div class="Box-card">
                                    <img src="/images/Certificates/Bahraini.png" alt="">
                                    <div class="Box-det" style="text-align:center;">
                                        <h6>معادلة الثانوية البحرينية <strong>(قريبا)</strong></h6>
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

<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>