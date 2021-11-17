<template>
  <div class="w-full text-base font-sans text-black md:overflow-hidden">
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
            <!-- <div>
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
            </div> -->
          </div>
          <div class="pb-8 pt-4">
            <router-link to="/list-product">
              <button @click="clickDetail(p.productId)"  class="bottom-2 right-2 bg-black hover:text-pink py-2 w-32 rounded-md absolute text-white text-base uppercase">
                see more <font-awesome-icon icon="arrow-right" class="mr-2"/>
              </button>
            </router-link>
          </div>
        </base-block>
      </div> 
    </div>
    <div class="md:grid-cols-4">
        <router-view @show="refreshList()" ></router-view>
    </div>

    <div v-if="openDetail"  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center mb-4">
            <div class="h-96 border-0 rounded-md shadow-lg flex flex-col lg:w-3/4 md:w-1/2 bg-white outline-none focus:outline-none">
              
              <div class="flex justify-end">
                <button class="close text-black" type="button" @click="closeModal()" > X </button>
              </div>

              <div class="pt-3 flex justify-center md:justify-center">
                <h3 class="text-3xl uppercase text-darkgray">product detail</h3>
              </div>

                <div class=" bg-white rounded-md px-4 pb-4">
                  <form class="text-darkgray">
                    <div class="lg:flex lg:flex-row justify-around mt-2 space-x-5 sm:flex-col">
                      <div v-for="pr in popupProduct" :key="pr.productId" >
                        
                        <div class="flex justify-center mt-2 w-3/5 space-y-1 rounded-md border-gray-200 bg-gray-200">
                        <img class="object-cover w-auto lg:h-52 p-2 " :src="getProductImage(pr.productImg)"/>
                        </div>

                        <div class=" mt-2 w-2/5 space-y-2 ">
                        <p class="text-xl  text-left">Name: {{pr.productName}}</p>
                        <p class="text-lg  text-left ">Type: {{pr.productType}}</p>
                        <p class="text-lg text-left">Price: {{pr.productPrice}}</p>
                        
                        <div class="text-left ">
                          <label class="text-lg " >Color: </label>
                            <div class="flex justify-items-start ml-9">
                              <div v-for="color in pr.colors" :key="color.colorId">
                              <input type="checkbox" class="ml-4" v-model="selectColor" :value="color"/>
                              <div class="w-8 h-8 rounded-md border ml-2" :style="{ background: color.colorName }"></div>
                            </div>
                          </div>
                          <p v-if="invalidColors" class="error">"Please select product color"</p>
                        </div>
                        <div class="flex">
                        <p class="text-lg text-center ml-9">Size: {{pr.productSize}}</p>
                        </div>
                        <div class="flex">
                          <label id="quant" class="text-lg text-center ml-8">Quantity: </label>
                           <input  type="number" name="quantity"
                           class="w-24 h-10 ml-5 rounded-sm text-center text-lg text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"/>
                        </div>
                      </div>

                        <!-- <div class="flex justify-center mt-2 w-3/5 space-y-1 rounded-md border-gray-200 bg-gray-200">
                          <img class="object-cover w-auto lg:h-52 p-2" src="../assets/Airmax-90-4.png" />
                        </div>

                        <div class=" mt-2 w-2/5 space-y-2 ">
                          <p class="text-xl text-left">Nike Air Max 90</p>
                          <p class="text-lg text-left">Men/Women</p>
                          <p class="text-lg text-left">Price: 3600</p>
                          <div class="text-left">
                            <label class="text-lg ">Color: </label>
                              <div class="grid grid-cols-10 justify-items-start">
                                <div v-for="color in colors" :key="color.colorId"  >
                                  <input class="ml-2" type="checkbox" v-model="selectColor" :value="color" />
                                  <div class="w-8 h-8 rounded-md border" :style="{ background: color.colorName }"></div>
                                </div>
                              </div>
                              <p v-if="invalidColors" class="error">"Please select product color"</p>
                          </div>
                          <div class="w-20 h-10">
                            <p class="text-lg text-left">Quantity:</p>
                            <input type="number" value="1" 
                              class="w-full rounded-sm text-center text-lg text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                          </div> -->
                          <div class=" pt-6">
                            <router-link to="/cart">
                              <button class=" bg-black hover:text-pink py-2 w-4/5 rounded-md text-white text-base uppercase">
                              add to cart <font-awesome-icon icon="shopping-cart" class="mr-2"/>
                              </button>
                            </router-link>
                          </div>
                        <!-- </div> -->
                    
                    
                    <div class="mt-6">
                      <p class="text-xl font-semibold">{{pr.productName}}</p>
                      <p class="text-lg text-justify">{{pr.productDescription}}</p>
                    </div>
                      </div>
                  </div>
                  </form>
               </div>
            
          </div>
      </div>

      <div v-if="openDetail" class="show-modal"></div>

  </div>
</template>

<script>
import ProductService from '../service/ProductService';
// import SearchProduct from '../components/SearchProduct.vue';

export default {
    components: {
    },
    data(){
      return {
        product: [],
        show: false,
        popupProduct: [],
        openDetail: false
      };
    },
    methods: {
      closeModal(){
      this.openDetail = false;
      },
      clickDetail(productId){
        // this.openDetail = true;
        this.popupProduct = [];
        var pro = [];
        ProductService.get("/product/"+productId)
        .then(res => {
          pro = res.data;
          this.popupProduct.push(pro);
        }); 
        this.openDetail = true;    
      },
      
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
            console.log(response)
          })
      },
      getProductImage(productImg){
      return "http://localhost:9000/image/"+productImg  ;
      // return "http://52.230.37.169:9000/image/"+productImg;
      // return "http://40.65.142.182/backend/image/"+productImg;
      },
      refreshList() {
        this.retrieveProduct();
      },
      listColor(){
            ProductService.get("/color").then(response => {
                this.colors = response.data;
            })
        },
    },
    created() {
    this.retrieveProduct(); 
    this.listColor(); 
    },
};
</script>

<style>
  .colorFormat {
    display: flex;
    width: 100%;
  }
</style>