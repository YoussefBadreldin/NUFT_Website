<template>
  <div class="parent">
    <div v-if="!isAuthenticated" class="login-form">
   <h1 style="color: #001d3d; font-weight: bold;">NUFT Admin Panel</h1>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="loginError" class="error">Invalid username or password</p>
    </div>

    <div v-else>
      <div class="buttons" dir="rtl">
        <a href="/NUFTawyNumber1-national" class="button">الجامعات الاهلية</a>
        <a href="/NUFTawyNumber1-private" class="button">الجامعات الخاصة</a>
        <a href="/NUFTawyNumber1-special" class="button">الجامعات ذات طبيعة خاصة</a>
        <a href="/NUFTawyNumber1-International" class="button">الجامعات الدولية</a>
        <a href="/NUFTawyNumber1-News" class="button">الاخبار</a>
        <a href="/NUFTawyNumber1-Scholarships" class="button">المنح</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      isAuthenticated: false,
      loginError: false,
    };
  },
  methods: {
    handleLogin() {
      const validUsername = "admin";
      const validPassword = "OMGit'sNUFT";

      if (this.username === validUsername && this.password === validPassword) {
        this.isAuthenticated = true;
        this.loginError = false;
      } else {
        this.loginError = true;
      }
    },
  },
};
</script>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form label {
  margin-right: 10px;
}

.login-form input {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.login-form button {
  padding: 10px 20px;
  background-color: #001d3d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #003366;
}

.error {
  color: red;
  margin-top: 10px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.button {
  background-color: #001d3d;
  color: #fff;
  padding: 15px 30px;
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background-color: #003366;
  transform: translateY(-2px);
}

@media (max-width: 425px) {
  .buttons {
    flex-direction: column;
    gap: 10px;
  }

  .button {
    width: 100%;
    text-align: center;
    padding: 12px;
    font-size: 1rem;
  }
}
</style>
