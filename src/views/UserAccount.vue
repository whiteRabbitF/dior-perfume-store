<template>
        <router-link to="/dior-perfume-store">
        <div class="back-icon"><img src="../assets/back-icon.png" alt="">
        <span>назад</span></div>
      </router-link>
  <div class="login-container">
    <h2 class="welcome">Добро пожаловать!</h2>
    <form class="login-form" @submit.prevent="login">
      <div class="form-group">
        <label class="username" for="username">Имя пользователя:</label>
        <input class="input-account" type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label class="password" for="password">Пароль:</label>
        <input class="input-account" type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <button class="log-in" type="submit">Войти</button>
      </div>
    </form>

  </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("Вход выполнен:", this.username);
    },
  },
};
  </script>