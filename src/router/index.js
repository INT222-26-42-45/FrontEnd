import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ListProduct from '../views/ListProduct.vue'
import ManageProduct from '../views/ManageProduct.vue'
import Cart from '../views/Cart.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/manage-product',
    name: 'ManageProduct',
    component: ManageProduct
  },

  {
    path: '/list-product',
    name: 'ListProduct',
    component: ListProduct
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
