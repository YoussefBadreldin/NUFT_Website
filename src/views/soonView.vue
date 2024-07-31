<template>
    <header-component />
    <div class="parent">
        <img src="../../images/ComingSoon.png" alt="">
    </div>
    <smart-assistant />
    <footer-component />
</template>

<script>

    import HeaderComponent from '../../public/global/headerComponent.vue';
    import SmartAssistant from '../../public/global/smartAssistant.vue';
    import FooterComponent from '../../public/global/footerComponent.vue';
    export default{
        name: "soonView",
        components:{
            HeaderComponent,
            SmartAssistant,
            FooterComponent
        }
    }

</script>
<style scoped>
    .parent{
        width: 100%;
        height: 100vh;
    }
    img{
        width: 100%;
        height: 100%;
        margin-top: 5vh;
    }
</style>