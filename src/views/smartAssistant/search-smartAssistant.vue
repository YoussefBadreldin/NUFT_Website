<template>
    <div>
        <HeaderComponent />

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
    },
    methods: {
        // Define your methods here
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
