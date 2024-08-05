<template>
    <div>
    <HeaderComponent />
    <!-- ################# Page Title #######################--->
    <div class="page-nav row">
        <h2>International National Universities Guidebook</h2>
        <ul>
        <li><router-link to="/"><i class="fas fa-home"></i> Home</router-link></li>
        <li><router-link to="/UniversitiesGuide"><i class="fas fa-chevron-right"></i> Universities Guidebooks</router-link></li>
        <li><router-link to="/UniversitiesGuide/UGRAD"><i class="fas fa-chevron-right"></i> Undergraduate Guidebooks</router-link></li>
        <li><router-link to="/UniversitiesGuide/UGRAD/National"><i class="fas fa-chevron-right"></i> National Universities</router-link></li>
        <li><router-link to="/UniversitiesGuide/UGRAD/National/International"><i class="fas fa-chevron-right"></i> International National Universities</router-link></li>
        </ul>
    </div>

    <!-- ################# Search Box #######################--->
    <div class="search-box">
        <div class="container" style="text-align: center;">
        <input type="text" v-model="searchQuery" placeholder="Search universities by name..." />
        <button @click="search"><i class="fas fa-search"></i></button>
        </div>
    </div>
    
    <!-- ################# Cards Box #######################--->
    <div class="Card-Box">
        <div class="container">
        <div class="session-title row"></div>
        <div class="row Box-ro">
            <div class="col-md-4" v-for="university in universities" :key="university.id">
            <router-link :to="university.link">
                <div class="Box-card">
                <img :src="university.imgSrc" :alt="university.name">
                <div class="Box-det" style="text-align: center;">
                    <h6>{{ university.name }}</h6>
                </div>
                </div>
            </router-link>
            </div>
        </div>
        </div>
    </div>

    <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../public/global/headerComponent.vue';
import FooterComponent from '../../public/global/footerComponent.vue';

export default {
    name:'interNational',
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
    return {
        searchQuery: '',
        universities: [
        {
            id: 1,
            name: 'King Salman International University',
            imgSrc: '/images/Logos/Universites/National/KSIU.png',
            link: '/UniversitiesGuide/UGRAD/National/International/KSIU'
        },
        {
            id: 2,
            name: 'Alamein International University',
            imgSrc: '/images/Logos/Universites/National/AIU.png',
            link: '/UniversitiesGuide/UGRAD/National/International/AIU'
        },
        {
            id: 3,
            name: 'Galala University',
            imgSrc: '/images/Logos/Universites/National/GU.png',
            link: '/UniversitiesGuide/UGRAD/National/International/GU'
        },
        {
            id: 4,
            name: 'New Mansoura University',
            imgSrc: '/images/Logos/Universites/National/NMU.png',
            link: '/UniversitiesGuide/UGRAD/National/International/NMU'
        }
        ]
    };
    },
    methods: {
    search() {
        console.log('Search query:', this.searchQuery);
        // Implement search functionality here
    }
    }
};
</script>
