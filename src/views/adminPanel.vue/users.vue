<template>
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="user in allUsers" :key="user.id">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">{{ user.email }}</h5>
              <p class="card-text">Password: {{ user.password }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'getUsers',
    data() {
      return {
        allUsers: [],
      };
    },
    methods: {
      getAllusers() {
        axios.get('https://nuft-backend.onrender.com/auth/getallusers')
          .then(response => {
            this.allUsers = response.data;
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      }
    },
    created() {
      this.getAllusers();
    }
  };
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  </style>
  