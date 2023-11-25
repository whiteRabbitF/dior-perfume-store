<template>
  <div>
    <div v-if="cart && cart.length <= 0">
    <router-link to="/dior-perfume-store/">
      <div class="back-icon"><img src="../assets/back-icon.png" alt="">
      <span>назад</span></div>
    </router-link>
  </div>

    <div v-if="cart && cart.length > 0">
      <router-link to="/dior-perfume-store/">
      <div class="back-icon"><img src="../assets/back-icon.png" alt="">
      <span>назад</span></div>
    </router-link>
      <h1 class="cart">КОРЗИНА</h1>
      <div v-for="(item, index) in cart" :key="index" class="block-cart" :data-id="item.id">
        <div class="cart-positions">
          <img :src="item.image" :alt="item.name" />
          <div class="content-cart">
            <h2>{{ item.name }} </h2>
            <span class="info-about-product">
              <div class="line"></div>
              <h4>{{ item.description }}</h4>
              <span>
                <h4 class="volume">объем</h4>
                <h4>{{ item.volume }}</h4>
              </span>
              <span>
                <h4 class="intensity">стойкость <br> аромата</h4>
                <h4>{{ item.intensity }} /5</h4>
              </span>
            </span>
            <h1 class="price">{{ item.price }}/шт</h1>
          </div>

          <footer>

            <div class="quantity-container">
              <button @click="onDecrementQuantity(index)" class="minus">-</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="onIncrementQuantity(index)" class="plus">+</button>
            </div>

            <div class="cart-options">
              <div class="total-item">Итого: {{ calculateItemTotal(item) }} ₽</div>

            <router-link to="/payfromcart">
              <button @click="buy(item)" class="buy-from-cart">Оформить заказ</button>
            </router-link>

            <button @click="() => removeFromCart(index)" class="delete-from-cart"><img src="../assets/delete-from-cart-icon.png" alt="delete">
            <span class="delete-span">удалить</span></button>
          </div>

          </footer>
        </div>
      </div>

      <div class="total-container">
        <p class="total-price">Общая стоимость корзины: {{ calculateTotal() }} ₽</p>
      </div>
    </div>

    <div v-else class="empty-basket" v-show="cart && cart.length === 0">
      Корзина пуста
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: Array,
  },

  methods: {
    onIncrementQuantity(index) {
      this.$emit('increment-quantity', index);
    },

    onDecrementQuantity(index) {
      this.$emit('decrement-quantity', index);
    },

    calculateTotal() {
      return this.cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        const quantity = item.quantity;

        // Проверяем, что price и quantity существуют и являются числами
        if (!isNaN(price) && !isNaN(quantity)) {
          return total + price * quantity;
        } else {
          return total;
        }
      }, 0);
    },

    calculateItemTotal(item) {
      const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
      const quantity = item.quantity;

      if (!isNaN(price) && !isNaN(quantity)) {
        return (price * quantity);
      } else {
        return 0;
      }
    },

    buy(item) {
    const itemTotal = this.calculateItemTotal(item);

    this.$router.push({ 
      name: 'payfromcart', 
      query: { total: itemTotal }
    });
  },

    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
  },
};
</script>


