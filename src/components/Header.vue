<template>
    <header class="menu-container">

      <div class="main-menu" id="main-menu">
        <img class="logo-main" src="../assets/dior-logo.png" />
        <ul>

          <router-link to="/mainpage">
            <li><a href="/mainpage" class="main-button">Главная</a></li>
          </router-link>

          <router-link to="/dior-perfume-store/">
          <li><a href="/" class="main-button">Каталог</a></li>
          </router-link>

          <router-link to="/basket">
          <li><a href="/" class="main-button">Корзина</a></li>
          </router-link>

          <router-link to="/aboutus">
          <li><a href="#" class="main-button">Дом Dior</a></li>
        </router-link>
        
        </ul>

        <div class="perfume">
          <p>dior perfume <br> and beauty</p>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
  };
  </script>