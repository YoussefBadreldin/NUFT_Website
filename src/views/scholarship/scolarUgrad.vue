<template>
    <div>
        <header-component />
        <div class="page-nav row">
            <h2>المنح</h2>
            <ul>
            </ul>
        </div>

        <div class="our-Services">
            <div class="container" dir="rtl">
                <div class="session-title row">
                    <!-- Session title goes here -->
                </div>
            </div>

            <div class="our-blog bb3 pc2">
    <div class="container">
        <div class="row-news row">
            <div class="col-md-10 vbf mx-auto">
                <div class="news-card row">
                    <div class="col-2">
                        <div class="date-box">
                            <p>منح</p>
                            <small>كاملة</small>
                        </div>
                    </div>
                    <div class="col-7 setv">
                        <h4><a href="#">منح دراسية في مجال علوم الكمبيوتر بجامعة النيل</a></h4>
                        <p>
                            <strong>معايير الأهلية:</strong>
                            <ul>
                                <li>- طالب مصري</li>
                            </ul>
                        </p>
                        <p>
                            <strong>عملية التقديم:</strong>
                            <ul>
                                <li>- قم بزيارة <a class="application-link" href="http://www.google.com" target="_blank">هذا الرابط</a> للوصول إلى نموذج التقديم.</li>
                            </ul>
                        </p>
                    </div>
                    <div class="col-3 img-cv">
                        <img src="/images/Logos/Universites/National/NU.png" alt="جامعة النيل">
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