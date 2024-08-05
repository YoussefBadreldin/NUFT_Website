<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/Home">
            <img src="../../images/logo.png" alt="Logo" class="d-inline-block align-top" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/Home">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/universitiesGuide">Universities Guidebooks</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/AdmissionStatus">Admissions Status</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/Scholarships">Scholarships</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/CertificatesCalculator">Certificates Calculator</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/News">News</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/signup">Signup</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/ContactUs">Contact Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://resumehossameldeenkamal.vercel.app/">About Programmer</a>
                </li>
                <li class="nav-item">
                    <p class="nav-link" v-if="name">{{ name }}</p>
                </li>
                <li class="nav-item">
                    <button v-if="name" class="btn btn-primary btn-sm" @click="out">Logout</button>
                </li>
            </ul>
            <!-- <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> -->
        </div>
    </nav>
</template>

<script>
export default {
    name: 'HeaderComponent',
    data() {
        return {
            name: '',
        }
    },
    methods: {
        out() {
            localStorage.removeItem('name');
            this.name = '';
        }
    },
    created() {
        this.name = localStorage.getItem('name');
    }
}
</script>

<style scoped>
.nav-link {
    color: black;
}

.nav-link p {
    color: red;
}
nav{
    background-color: #0b0b6e !important;
  }
</style>