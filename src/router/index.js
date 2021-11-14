import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ListProduct from '../views/ListProduct.vue'
import ManageProduct from '../views/ManageProduct.vue'
import Cart from '../views/Cart.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import LoginAdmin from '../views/LoginAdmin.vue'
import User from '../views/User.vue'
import BrandColor from '../views/BrandColor.vue'
import ProductDetail from '../views/ProductDetail.vue'

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
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/profile-admin',
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

  {
    path: '/product-detail',
    name: 'ProductDetail',
    component: ProductDetail
  }

]

const router = createRouter({
  history: createWebHistory(),//(process.env.BASE_URL),
  routes
})

export default router
