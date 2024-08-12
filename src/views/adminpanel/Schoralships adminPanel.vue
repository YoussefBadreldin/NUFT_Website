<template>
    <div class="parent">
        <h1>NUFT Admin Panel</h1>
        <br><br>
        <h1>المنح</h1>
        <br><br>
        <h1>Add Schoralships</h1>
        <form @submit.prevent="Schoralshipsfunction">
            <div>
                <label for="Schoralships">Schoralships Details:</label>
                <textarea name="" id="" cols="30" rows="10" v-model="Schoralships"></textarea>
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
            Schoralships: '',
        };
    },
    methods: {
        Schoralshipsfunction(){
            const form = {
                text: this.Schoralships,
            }
            axios.post('https://nuft-website-backend-874bbf91403c.herokuapp.com/Schoralships/addSchoralships', form)
                .then(()=>{
                    console.log('Schoralships sent successfully');
                    alert("Schoralships sent successfully");
                })
                .catch(error=>{
                    console.log(error);
                    alert("Error sending Schoralships");
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
