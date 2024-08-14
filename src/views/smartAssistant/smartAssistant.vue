<template>
    <div>
        <HeaderComponent />

        <!-- Options Section -->
        <div class="options-section">
            <div class="container text-center">
                <h2>!أهلاً بك</h2>
                <p><strong>أنا مساعدك الشخصي</strong></p>
                <p>كيف يمكنني مساعدتك؟</p>
                <div class="row">
                    <div class="col-md-4">
                        <router-link to="/smartAssistant/search">
                            <button class="btn btn-primary">الجامعات التي تحتوي على كلية معينة</button>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/smartAssistant/score">
                            <button class="btn btn-primary">معرفة الكليات التي تناسب مجموعي</button>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link to="/smartAssistant/faculties">
                            <button class="btn btn-primary">البحث عن جامعة معينة</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue'; 

export default {
    name: 'MainComponent',
    components: {
        HeaderComponent,
        FooterComponent
    }
};
</script>

<style scoped>
/* Options Section Styles */
.options-section {
    padding: 20px;
    background-color: #f8f9fa;
}

.options-section .btn {
    margin: 10px;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .carousel-item img {
        height: 40vh; /* Set height as a percentage of the viewport height */
        object-fit: cover; /* Ensure image covers the area without distortion */
    }
}
</style>
