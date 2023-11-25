<template>
      <router-link to="/basket">
      <div class="back-icon"><img src="../assets/back-icon.png" alt="">
      <span>назад</span></div>
    </router-link>
    <div class="payment-container">
      <h1>Выберите опцию</h1>
      <div class="delivery-container">
        <button @click="selectDeliveryMethod('delivery')" :class="{ 'selected': deliveryMethod === 'delivery' }">Доставка</button>
        <button @click="selectDeliveryMethod('pickup')" :class="{ 'selected': deliveryMethod === 'pickup' }">Самовывоз</button>
      </div>
  
      <div class="order-summary">
        <div class="summary-item">
          <span>Сумма заказа................................................. {{ totalAmountFromCart }} ₽</span>
        </div>
        <div class="summary-item">
          <span>Доставка СДЭК.....................................</span>
          <span>{{ deliveryCost !== null ? `${deliveryCost} ₽` : 'не выбрано' }}</span>
        </div>
        <div class="summary-item total">
          <span>ИТОГО.............................................................</span>
          <span>{{ totalAmount }} ₽</span>
        </div>
      </div>
  
      <h1>Введите данные карты</h1>
      <label for="cardNumber">Номер карты:</label>
      <input v-model="cardNumber" type="text" id="cardNumber" placeholder="Введите номер карты" maxlength="16" />
  
      <label for="expiryDate">Срок действия:</label>
      <input v-model="expiryDate" type="text" id="expiryDate" placeholder="MM/YY" maxlength="5" />
  
      <label for="cvv">CVV код:</label>
      <input v-model="cvv" type="text" id="cvv" placeholder="Введите CVV" maxlength="3" />
  
      <button @click="processPayment" :disabled="!isValid">Оплатить</button>
      <p class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  
  
  <script>
  import productsData from "/products/products.json?url";
  
  export default {
    data() {
      return {
        deliveryMethod: 'delivery',
        deliveryCost: null,
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        errorMessage: '',
        productPrice: 0,
        totalAmountFromCart: 0,
      };
    },
    computed: {
      totalAmount() {
        const deliveryCost = this.deliveryCost !== null ? parseFloat(this.deliveryCost) : 0;
        return (this.totalAmountFromCart + deliveryCost).toFixed(2);
      },
      isValid() {
        return this.cardNumber && this.expiryDate && this.cvv;
      },
    },
    methods: {
      selectDeliveryMethod(method) {
        this.deliveryMethod = method;
        this.deliveryCost = method === 'delivery' ? 800 : 0;
      },
      processPayment() {
        if (this.isValid) {
          console.log('Payment processed successfully!');
          console.log('All Products:', productsData);
        } else {
          this.errorMessage = 'Введите корректные данные карты.';
        }
      },
    },
    
    created() {
    const total = this.$route.query.total;
    this.totalAmountFromCart = total ? parseFloat(total) : 0;
    console.log('Created PaymentForm with Total Amount:', this.totalAmountFromCart);
  },
  };
  </script>
  
  
  
  
  
  
  
  