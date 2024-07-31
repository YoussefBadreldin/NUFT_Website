<template>
    <div>
        <header-component />
        <div class="container mt-5">
            <h2 class="text-center mb-4">Contacts</h2>
            <div class="row">
                <div v-if="loading" class="col-12 text-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <div v-else>
                    <div v-if="contacts.length === 0" class="col-12 text-center">
                        <p>No contacts found.</p>
                    </div>
                    <div v-else class="row">
                        <div v-for="contact in contacts" :key="contact._id" class="col-md-4 mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{{ contact.name }}</h5>
                                    <p class="card-text">
                                        <strong>Email:</strong> {{ contact.email }}<br>
                                        <strong>Phone:</strong> {{ contact.phone }}<br>
                                        <strong>Message:</strong> {{ contact.message }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer-component />
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'ContactList',
    data() {
        return {
            contacts: [],
            loading: true
        };
    },
    mounted() {
        this.fetchContacts();
    },
    methods: {
        fetchContacts() {
            axios.get('https://nuft-backend.onrender.com/contact/get')
                .then(response => {
                    this.contacts = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    console.error("There was an error fetching the contacts:", error);
                    this.loading = false;
                });
        }
    },
    created(){
        this.fetchContacts();
    }
};
</script>


