<template>
    <div class="parent">
        <h1>NUFT Admin Panel</h1>
        <br><br>
        <h1>الاخبار</h1>
        <br><br>
        <h1>Add News</h1>
        <form @submit.prevent="newsfunction">
            <div>
                <label for="news">News Details:</label>
                <textarea name="" id="" cols="30" rows="10" v-model="news"></textarea>
            </div>
            <br>
            <button type="submit">Add</button>
        </form>
    <br><br>    
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminPanel',
    data() {
        return {
            news: '',
        };
    },
    methods: {
        newsfunction(){
            const form = {
                text: this.news,
            }
            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/news/addNews', form)
                .then(()=>{
                    console.log('News sent successfully');
                    alert("News sent successfully");
                })
                .catch(error=>{
                    console.log(error);
                    alert("Error sending news");
                })
        }
    }
};
</script>

<style scoped>
form div {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

@media (max-width: 425px) {
    form div {
        grid-template-columns: 1fr;
    }
}
</style>
