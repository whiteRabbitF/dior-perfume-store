<template>
  <div class="menu">
    <form @submit.prevent="search">
      <div class="search-bar" @click="toggleSearch">
        <img src="../assets/search-icon.png" alt="Search">
        <input
          id="search-bar"
          v-if="showSearch"
          ref="searchInput"
          class="search-input"
          type="text"
          placeholder="Введите название продукта"
          v-model="searchQuery"
          @input="search"
        />
        <p v-if="noResults" class="no-results-message">Ничего не найдено</p>
      </div>
    </form>

    <div class="icon-menu">
      <router-link to="/account">
        <img src="../assets/account-icon.png" alt="User" />
        <span>войти</span>
      </router-link>
    </div>

    <div class="icon-menu">
    <router-link to="/basket">
      <img src="../assets/basket.png" alt="Basket" />
      <span>корзина</span>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
    currentIndex: Number,
  },

  data() {
    return {
      showSearch: false,
      searchQuery: '',
      noResults: false,
    };
  },

  methods: {
    search() {
      const searchText = this.searchQuery.toLowerCase().trim();
      if (searchText) {
        const filtered = this.products.filter(product =>
          product.description.toLowerCase().includes(searchText)
        );
        if (filtered.length === 0) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
        this.$emit('filterProducts', filtered);
      } else {
        this.noResults = false;
        this.$emit('filterProducts', this.products);
      }
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      }
    },
  },
  };
</script>

