import { createRouter, createWebHistory } from 'vue-router';
import UserAccount from '../views/UserAccount.vue';
import Cart from '../views/Cart.vue';
import MainPage from '../views/MainPage.vue';
import PaymentForm from '../views/PaymentForm.vue'
import AboutUs from '../views/AboutUs.vue'
import PaymentFormFromCart from '../views/PaymentFormFromCart.vue'
// import App from '../App.vue';



export default createRouter({
  history: createWebHistory(),
  routes: [
    // { path: "/", component: App },
    {path: "/basket", component: Cart},
    {path: "/account", component: UserAccount},
    {path: "/mainpage", component: MainPage},
    {path: "/buypage", name: "buypage", component: PaymentForm},
    {path: "/payfromcart", name: "payfromcart", component: PaymentFormFromCart},
    {path: "/aboutus", component: AboutUs},
  ]
});
