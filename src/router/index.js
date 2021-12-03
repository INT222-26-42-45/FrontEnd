import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactUs from '../views/ContactUs.vue'
import ListProduct from '../views/ListProduct.vue'
import Cart from '../views/Cart.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import LoginAdmin from '../views/LoginAdmin.vue'
import User from '../views/User.vue'
import BrandColor from '../views/BrandColor.vue'

const routes = [
  
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },

  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUs
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
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/admin-management',
    name: 'Admin',
    component: Admin
  },

  {
    path: '/login-admin',
    name: 'LoginAdmin',
    component: LoginAdmin
  },

  {
    path: '/user',
    name: 'User',
    component: User
  },

  {
    path: '/brand-color',
    name: 'BrandColor',
    component: BrandColor
  },



]

const router = createRouter({
  history: createWebHistory(),//(process.env.BASE_URL),
  routes
})

export default router
