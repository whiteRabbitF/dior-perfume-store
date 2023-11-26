import { createApp } from 'vue';
import App from './App.vue';
import './scss/style.scss';
import './scss/Cart.scss';
import './scss/MainPage.scss';
import './scss/Account.scss';
import './scss/Content.scss';
import './scss/Aboutus.scss';
import './scss/PaymentForms.scss';
import './scss/Header.scss';
import './scss/Footer.scss';
import './scss/NavigationMenu.scss';
import './scss/SortingContainer.scss';
import 'normalize.css';
import router from './router/router.js';


const app = createApp(App);
app.use(router);
app.mount('#app');

document.body.style.zoom = "70%";

