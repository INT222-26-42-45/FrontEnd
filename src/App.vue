<template>
  <div id="nav" class="bg-black font-sans text-base relative select-none bg-grey md:flex md:items-stretch w-full">
    <router-link to="/">
      <img class="ml-4 w-24 h-12 mt-2" alt="logo" src="./assets/logo.png" />
    </router-link>

    <div class=" pr-4 md:flex md:items-stretch md:flex-no-shrink md:flex-grow">
      <div class="md:flex md:items-stretch md:justify-end ml-auto">
        <div class="flex-no-grow flex-no-shrink py-2 px-4 leading-normal text-white no-underline flex items-center">
          <router-link to="/home">HOME</router-link> 
        </div>
        <div class="flex-no-grow flex-no-shrink py-2 px-4 leading-normal text-white no-underline flex items-center">
          <router-link to="/list-product">LIST PRODUCT</router-link>
        </div>
        <div class="flex-no-grow flex-no-shrink py-2 px-4 leading-normal text-white no-underline flex items-center"> 
          <router-link to="/cart">
            <font-awesome-icon icon="shopping-cart" class="mr-2"/>
          </router-link>
        </div> 
        <div v-if="currentUser" class="flex-no-grow flex-no-shrink py-2 px-4 leading-normal text-white no-underline flex items-center">
          <div class="flex-no-grow flex-no-shrink py-2 pr-4 leading-normal text-white no-underline flex items-center"> 
            <router-link to="/profile" >
              <font-awesome-icon icon="user" class="mr-3"/>
                {{ currentUser.username }}
            </router-link>
          </div>
        </div>
        <button  v-if="currentUser" class="flex-no-grow flex-no-shrink py-2 px-4 leading-normal text-white no-underline flex items-center " @click.prevent="logOut">
          <font-awesome-icon icon="sign-out-alt" class="mr-2"/>LOG OUT
        </button>
      
      </div>
    </div> 
  </div>
  <router-view/>
  <footer class="bg-black">
     <div class="container flex flex-col justify-center p-10 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
      <div class="flex flex-wrap flex-grow mt-10 -mb-10 text-left md:pl-20 md:mt-0 md:text-left">
        <div class="w-full lg:w-1/4 md:w-1/2">
            <router-link to="/list-product">
              <h1 class="mb-3 text-lg font-bold tracking-widest text-white uppercase title-font no-underline">Products
              </h1>
            </router-link>
            <nav class="list-none w-full">
              <router-link to="/list-product">
                <li>
                  <p class="text-sm text-white break-normal no-underline">Nike Sneaker</p>
                </li>
              </router-link>
              <router-link to="/list-product">
                <li>
                  <p class="text-sm mt-2 text-white">Adidas Sneaker</p>
                </li>
              </router-link>
              <router-link to="/list-product">
                <li>
                  <p class="text-sm mt-2 text-white">NB Sneaker</p>
                </li>
              </router-link>
            </nav>
        </div>
        <div class="w-full  lg:w-1/4 md:w-1/2">
            <router-link to="/list-product">
              <h1 class="mb-3 text-lg font-bold tracking-widest text-white  uppercase title-font">Collections
              </h1>
            </router-link>
              <nav class="mb-8 list-none">
                <router-link to="/list-product">
                <li>
                    <p class="text-sm text-white">Nike Air</p>
                </li>
                </router-link>
                <router-link to="/list-product">
                  <li>
                    <p class="text-sm mt-2 text-white">Sperstar NMD</p>
                  </li>
                </router-link>
                <router-link to="/list-product">
                <li>
                    <p class="text-sm mt-2 text-white">574</p>
                </li>
                </router-link>
              </nav>
        </div>
        <div class="w-full lg:w-1/4 md:w-1/2">
          <router-link to="/contact-us">
            <h1 class="mb-3 text-lg font-bold tracking-widest text-white uppercase title-font">Support
            </h1>
          </router-link>
            <nav class="mb-8 list-none">
            <router-link to="/contact-us">
              <li>
                <p class="text-sm text-white">Nike</p>
              </li>
            </router-link>
            <router-link to="/contact-us">
              <li>
                <p class="text-sm mt-2 text-white">Adidas</p>
              </li>
            </router-link>
            <router-link to="/contact-us">
              <li>
                <p class="text-sm mt-2 text-white">New Balance</p>
              </li>
            </router-link>
            </nav>
        </div>
        <div class="w-full lg:w-1/4 md:w-1/2">
          <img class="w-24 h-12 lg:mt-20 md:mt-8" alt="logofooter" src="./assets/logo.png" />
        </div>
      </div>
    </div>         
  </footer>
</template>
<script>
export default {
  data(){
    return {
      logoutShow: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.users;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 18px;
  font-size: 20px;
}
#nav a {
  font-weight: bold;
  color: #ffffff;
}
#nav a.router-link-exact-active {
  color: #FF008C;
}
</style>