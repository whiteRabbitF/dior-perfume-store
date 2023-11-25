import { ref } from 'vue';

const cart = ref([]);

export function addToCart(product) {
  if ('id' in product) {
    const existingItem = cart.value.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    console.log('Adding to cart:', cart.value);
    

    saveCartToLocalStorage();
  } else {
    console.error('Product does not have an "id" property:', product);
  }
}

export function clearCart() {
  cart.value = [];
  saveCartToLocalStorage();
}

export function getCart() {
  return cart;
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart.value));
}







