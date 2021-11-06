<template>
  <div class="container text-base font-sans text-black mx-auto">
    <!-- <div class="flex justify-center mt-4 ">
      <div>
        <search-product @box-search="box_search" @status-search="statusSearch" v-show="search"></search-product>
        <button @click="statusSearch" v-show="!search">
          <img src="../assets/search.png" />
        </button>  
      </div>
      <div>      
      </div>
    </div>    -->
    
    <div class="grid md:grid-cols-4 sm:grid-cols-1 text-left justify-items-center">
      <div v-for="p in product" :key="p.productId" :id="p.productId" class="w-full p-1 md:p-2">
        <base-block class="relative">
          <img class="object-cover w-full rounded-t-md border-gray-200 h-36 bg-gray-200" :src="getProductImage(p.productImg)"/>
          <div class="text-left p-2">
            <p class="mt-3">{{"Name: "+ p.productName }}</p>
            <p>{{"Type: "+ p.productType}}</p>
            <p>{{"Price: "+ p.productPrice }} THB</p>
            <div>
              <label>Select Color: </label>
                <div class="colorFormat">
                  <div v-for="color in p.colors" :key="color.colorId">
                    <input type="checkbox" class="mx-2" v-model="selectColor" :value="color"/>
                    <div class="w-6 h-6 rounded-md mx-1 border border-gray-500" :style="{ background: color.colorName }"></div>
                  </div>
                </div>
            </div>
            <div class="mt-2">
              <label>Input Size: </label>
                <input  type="text" id="productSize" name="productSize"
                        class="rounded-sm border border-gray-600 w-20 px-2 py-1"/>
            </div>
            <div class="mt-2">
              <label id="quant">Quantity: </label>
                <input  type="number" name="quantity"
                        class="rounded-sm border border-gray-600 w-20 px-2 py-1"/>
            </div>
            <div class="pb-8 pt-4">
              <router-link to="/cart">
                <button @click="addToCart(this.id)" class="absolute bottom-2 right-0 uppercase text-sm text-center font-sans text-white py-2 px-2 mx-2 rounded-md bg-black hover:bg-pink">
                  add to cart
                </button>
              </router-link>
            </div>
          </div>
        </base-block>
      </div>
    </div>
    <div class="md:grid-cols-4">
        <router-view @show="refreshList()" ></router-view>
    </div>
  </div>
</template>

<script>
import ProductService from '../service/ProductService';
// import SearchProduct from '../components/SearchProduct.vue';

export default {
    // components: {
    //   SearchProduct
    // },
    data(){
      return {
        product: {},
        id: null,
        quantity: 1
      };
    },
    props: ["products", "baseURL"],
    methods: {
      // addToCart(productId){
      //   axios.post(`${this.baseURL}cart/add?token=${this.token}`,{
      //     productId : productId,
      //     quantity : this.quantity
      //   }).then((response) => {
      //   if(response.status==201){
      //     this.$swal({
      //       text: "Product added to the cart!",
      //       icon: "success",
      //       closeOnClickOutside: false,
      //     });
      //   }
      //   },(error) =>{
      //     console.log(error)
      //   });
      // },
      // listCartItems(){
      //   axios.get(`${this.baseURL}cart/?token=${this.token}`).then((response) => {
      //     if(response.status===200){
      //       this.$router.push('/cart')
      //     }
      //   },(error)=>{
      //     console.log(error)
      //   });
      // },
      // retrieveProduct() {
      //   ProductService.get("/product" , {
      //      headers: AuthenHeader()
      //   })
      //       .then(response => {
      //           this.product = response.data;
      //   })
      // },
      retrieveProduct() {
        ProductService.get("/product")
          .then(response => {
            this.product = response.data;
          })
      },
      getProductImage(productImg){
      // return "http://localhost:9000/image/"+productImg  ;
      // return "http://52.230.37.169:9000/image/"+productImg;
      return "http://40.65.142.182/backend/image/"+productImg;
      },
      refreshList() {
        this.retrieveProduct();
      },
    },
    created() {
    this.retrieveProduct();  
    },
};
</script>

<style>
  .colorFormat {
    display: flex;
    width: 100%;
  }
</style>