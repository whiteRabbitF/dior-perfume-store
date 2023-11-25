<template>
  <div id="app">
    <Header 
    />
    <router-view />

    <NavigationMenu
    v-if="$route.path !== '/basket' 
    && $route.path !== '/mainpage' 
    && $route.path !== '/account' 
    && $route.path !== '/buypage' 
    && $route.path !== '/aboutus' 
    && $route.path !==  '/payfromcart'"
      :products="products"
      :currentIndex="currentIndex"
      @filterProducts="filterProducts"
    />

    <Sorting
    v-if="$route.path !== '/basket' 
    && $route.path !== '/mainpage' 
    && $route.path !== '/account' 
    && $route.path !== '/buypage' 
    && $route.path !== '/aboutus' 
    && $route.path !==  '/payfromcart'"
      @filterProducts="updateFilteredProducts"
      :products="products"
    />

    <ContentComponent
    v-if="$route.path !== '/basket' 
    && $route.path !== '/mainpage' 
    && $route.path !== '/account' 
    && $route.path !== '/buypage' 
    && $route.path !== '/aboutus' 
    && $route.path !==  '/payfromcart'"
      :products="products"
      :currentIndex="currentIndex"
      :filteredProducts="filteredProducts"
      @loadMore="loadMoreItems"
      @addToCart="addToCart"
      @click="handleOrderClick(productPrice)"
    />

    <Footer 
    v-if="$route.path !== '/basket'"
    />

    <Cart
    v-if="$route.path === '/basket' 
    && $route.path !== '/mainpage' 
    && $route.path !== '/account' 
    && $route.path !== '/buypage' 
    && $route.path !== '/aboutus' 
    && $route.path !==  '/payfromcart'"
      :cart="cart"
      :onIncrementQuantity="incrementQuantity" 
      :onDecrementQuantity="decrementQuantity"
    />

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ContentComponent from './components/Content.vue';
import Header from './components/Header.vue';
import NavigationMenu from './components/NavigationMenu.vue';
import Sorting from './components/Sorting.vue';
import Footer from './components/Footer.vue';
import Cart from './views/Cart.vue';
import { addToCart } from "./store.js";

export default {
  data() {
    return {
      cart: [], // Массив для хранения товаров в корзине
    };c
  },
  components: {
    Header,
    NavigationMenu,
    Sorting,
    ContentComponent,
    Footer,
    Cart,
  },
  methods: {
    addToCart(product) {
      // Поиск товара в корзине
      const existingItemIndex = this.cart.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем количество на 1
        this.cart[existingItemIndex].quantity += 1;
      } else {
        // Если товара нет в корзине, добавляем его с начальным количеством 1
        const newItem = { ...product, quantity: 1 };
        this.cart.push(newItem);
      }
    },
    incrementQuantity(index) {
      if (this.cart[index] && this.cart[index].quantity) {
        this.cart[index].quantity++;
      }
    },
    decrementQuantity(index) {
      if (this.cart[index] && this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      }
    },

  },
  setup() {
    const products = ref([]);

        const fetchProducts = async () => {
      try {
        const response = await fetch('./products/products.json');
        
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        products.value = data;
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        console.error('Ошибка парсинга JSON:', error.message);
      }
    };

    onMounted(() => {
      fetchProducts();
    });

    const itemsPerPage = 12;
    const currentIndex = ref(12);
    const filteredProducts = ref([]);


    const loadMoreItems = () => {
      currentIndex.value += itemsPerPage;
    };

    const filterProducts = (filtered) => {
      filteredProducts.value = filtered;
    };

    const updateFilteredProducts = (filtered) => {
      filteredProducts.value = filtered;
    };

    return {
      products,
      currentIndex,
      loadMoreItems,
      filteredProducts,
      updateFilteredProducts,
      filterProducts,
    };
  },
};
</script>


