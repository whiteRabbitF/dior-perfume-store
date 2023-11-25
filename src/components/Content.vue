
<template>

  <div class="content-container" id="productsContainer">
      <div v-for="product in displayedProducts" :key="product.id" class="block" :data-id="product.id">
              <img :src="product.image" :alt="product.name" />
          <div class="content">
            <h2>{{ product.name }}</h2>
            <span class="info-about-product">
              <div class="line"></div>
              <h4 class="description-of">{{ product.description }}</h4>
              <span>
                <h4 class="volume">объем:</h4>
                <h4>{{ product.volume }}</h4>
              </span>
              <span>
                <h4 class="intensivity">стойкость:</h4>
                <h4>{{ product.intensity }}/5</h4>
              </span>
              <span>
                <h4 class="notes">нотки:</h4>
                <h4>{{ product.notes }}</h4>
              </span>
            </span>
            <h1 class="price">{{ product.price }}</h1>

            <div class="like-icon" @click="addToCart(product)">
            <img src="../assets/basket.png" alt="Добавить в корзину"/>
          </div>

          <router-link to="/buypage">
            <button class="buy-btn" @click="handleOrderClick(product.price)">Оформить заказ</button>
          </router-link>
          </div>
          
        </div>
    </div>
  
  
  
  <button @click="loadMore" class="show-btn">Загрузить еще</button>
  
  <div>
      <button class="up-btn" @click="scrollToTop">
        <img src="../assets/up-btn.png" alt="">
      </button>
    </div>
  
  </template>
  
  <script>
  import { addToCart } from '../store.js';
  export default {
    props: {
      products: Array,
      currentIndex: Number,
      filteredProducts: Array,
    },
  
    emits: ['loadMore', 'addToCart', 'click'], // Объявляем события

    computed: {
      displayedProducts() {
        let productsToDisplay = this.products;
        if (this.filteredProducts && this.filteredProducts.length > 0) {
          productsToDisplay = this.filteredProducts;
        }
        return productsToDisplay.slice(0, this.currentIndex);
      },
    },
  
    methods: {
        addToCart(product) {
        console.log('Добавление товара в корзину:', product);
        this.$emit('addToCart', product);
    },
        scrollToTop() {
        window.scrollTo(0, 0);
    },
        loadMore() {
        this.$emit("loadMore");
    },
    handleOrderClick(price) {
      this.$router.push({ 
        name: 'buypage', 
        query: { price: price.toString() } });
    },
  },
};
  </script>
  
  
