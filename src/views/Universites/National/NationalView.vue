<template>
    <div>    
    <HeaderComponent />
 
    <div class="page-nav row">
        <h2>دليل الجامعات الاهلية</h2>

    </div>

    <div class="Card-Box" dir="rtl">
        <div class="container" style="text-align: center;">
        <h3>ما هي الجامعات الاهلية المصرية؟</h3>
        هي جامعات غير ربحية تعيد استثمار جميع الرسوم في ميزانية المؤسسة لتعزيز مرافق الجامعة وخدماتها. تشتهر برسومها المنخفضة مقارنةً بالجامعات الخاصة وبالمناهج التعليمية المتقدمة والقدرات التي توفرها بالتعاون مع كيانات محلية وأجنبية. تخضع لقانون الجامعات الخاصة والاهلية رقم 12 لسنة 2009، ولائحته التنفيذية، والقانون رقم 143 لسنة 2019، الذي يعدل بعض أحكام قانون الجامعات الخاصة الاهلية الصادر بالقانون رقم 12 لسنة 2009. وتحت إشراف المجلس الأعلى للجامعات الاهلية. وعددهم 20 جامعة  .
        <br><br>
        <h3><br>أنواع الجامعات الاهلية</h3>
        <div class="row Box-ro">
            <div class="col-md-4">
            <router-link to="/Guide/UGRAD/National/Normal">
                <div class="Box-card">
                <img src="/images/Categories/NormalNU.png" alt="Normal National Universities">
                <div class="Box-det" style="text-align: center;">
                    <h6>الجامعات الاهلية</h6>
                </div>
                </div>
            </router-link>
            </div>
            <div class="col-md-4">
            <router-link to="/Guide/UGRAD/National/International">
                <div class="Box-card">
                <img src="/images/Categories/InternationalNU.png" alt="International National Universities">
                <div class="Box-det" style="text-align: center;">
                    <h6>الجامعات الاهلية الدولية</h6>
                </div>
                </div>
            </router-link>
            </div>
            <div class="col-md-4">
            <router-link to="/guide/UGRAD/National/Affiliated">
                <div class="Box-card">
                <img src="/images/Categories/AffiliatedNU.png" alt="Affiliated National Universities">
                <div class="Box-det" style="text-align: center;">
                    <h6>الجامعات الاهلية المنبثقة</h6>
                </div>
                </div>
            </router-link>
            </div>
        </div>
        </div>
    </div>


<FooterComponent />
        <smartAssistantComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../../public/global/headerComponent.vue';
import FooterComponent from '../../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../../public/global/smartAssistantComponent.vue';

export default {
    components: {
    HeaderComponent,
    FooterComponent,
    smartAssistantComponent
    }
}
</script>

<style scoped>
.page-nav {
    /* Set the width of the page-nav section */
    width: 100.97%; /* Adjust as needed */
}
</style>
