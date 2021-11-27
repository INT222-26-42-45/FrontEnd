<template>
  <div class="w-full text-base font-sans text-black md:overflow-hidden">

    <div class="flex justify-center mt-4 space-x-2">
      <div>
        <input @keyup="searchProduct" v-show="search.click" v-model="boxsearch" placeholder="Enter sneaker's name!"
                class="p-2 py-2 w-80 bg-white rounded border-2 border-black">
        </div>
      <div>
        <button  @click="statusSearch" v-show="search.nClick">
          <span class="material-icons">search</span>
        </button>
        <button class="hover:bg-pink bg-black py-2 px-3 rounded-md text-white text-lg uppercase" v-show="search.click" @click="statusSearch">
          Cancel
        </button>
      </div>
    </div> 
    
    <div class="flex justify-center h-full" v-show="notFound">
        <p class="font-bold text-2xl my-24"> Your search isn't listed. </p>
    </div>
    <div class="grid md:grid-cols-4 sm:grid-cols-1 text-left justify-items-center">
      <div v-show="p.pShow" v-for="p in product" :key="p.productId" :id="p.productId" class="w-full p-1 md:p-2">
        <base-block class="relative">
          <img class="object-cover w-full rounded-t-md border-gray-200 h-36 bg-gray-200" :src="getProductImage(p.productImg)"/>
          <div class="text-left p-2">
            <p class="mt-3">{{"Name: "+ p.productName }}</p>
            <p>{{"Type: "+ p.productType}}</p>
            <p>{{"Price: "+ p.productPrice }} THB</p>
          </div>
          <div class="pb-8 pt-4">
            <router-link to="/list-product">
              <button @click="clickDetail(p.productId)"  class="bottom-2 right-2 hover:bg-black hover:text-pink py-2 w-32 rounded-md absolute text-black text-base uppercase">
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
                    <div v-for="pr in popupProduct" :key="pr.productId" >
                      <div class="lg:flex lg:flex-row justify-around mt-2 space-x-5 sm:flex-col">
                        <div class="flex justify-center mt-2 w-3/5 rounded-md border-gray-200 bg-gray-200">
                        <img class="object-cover w-auto lg:h-52 p-2 mt-12" :src="getProductImage(pr.productImg)"/>
                        </div>

                        <div class=" mt-2 w-2/5 space-y-2 ">
                          <p class="text-xl  text-left">Name: {{pr.productName}}</p>
                          <p class="text-lg  text-left">Type: {{pr.productType}}</p>
                          <p class="text-lg text-left">Price: {{pr.productPrice}}</p>
                          <p class="text-lg text-left">Size: {{pr.productSize}}</p>
                          <div class="text-left ">
                            <label class="text-lg " >Color: </label>
                              <div class="">
                                <input type="checkbox" class="ml-4" v-model="selectColor" :value="pr.colors"/>
                                <div class="w-8 h-8 rounded-md border ml-2" :style="{ background: pr.colors.colorName }"></div>
                            </div>
                            <p v-if="invalidColors" class="error">"Please select product color"</p>
                          </div>
                          <div class="flex">
                            <label id="quant" class="text-lg text-center">Quantity: </label>
                            <input v-model="quantity" type="number" name="quantity" 
                            class="ml-2 w-20 h-8 rounded-sm text-center text-lg text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"/>
                          </div>
                        
                          <div class=" pt-6">
                            <router-link to="/cart">
                              <button @click="addToCart(pr.productId, quantity)" class=" bg-black hover:text-pink py-2 w-4/5 rounded-md text-white text-base uppercase">
                              add to cart <font-awesome-icon icon="shopping-cart" class="mr-2"/>
                              </button>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    
                    
                    <div class="mt-6">
                      <p class="text-xl font-semibold">{{pr.productName}}</p>
                      <p class="text-lg text-justify">{{pr.productDescription}}</p>
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
// import axios from 'axios';
import ProductService from '../service/ProductService';
import authHeader from '../service/AuthenHeader';
// import SearchProduct from '../components/SearchProduct.vue';
export default {
    components: {
      // SearchProduct,
    },
    data(){
      return {
        product: [],
        show: false,
        popupProduct: [],
        openDetail: false,
        quantity: 1,
        productId: null,
        productName: "",
        search: {click: false, nClick: true},
        boxsearch: "",
        notFound: false,
        pShow: true
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
      addToCart(productId, quantity){
        ProductService.post(`/cart/add/${productId}/${quantity}`, {} ,{
             headers: {
                Authorization: authHeader().Authorization,
             },
        }).then(response => {
                response.status === 200 ? alert("Add") : alert("Error")
            }).catch(error => {
                console.log(error);
            })
      },
      retrieveProduct() {
        ProductService.get("/product")
          .then(response => {
            this.product = response.data;
          })
      },
      getProductImage(productImg){
      // return "http://localhost:9000/image/"+productImg;
      return "http://52.230.37.169/backend/image/"+productImg;
      },
      refreshList() {
        this.retrieveProduct();
      },
      listColor(){
            ProductService.get("/color").then(response => {
                this.colors = response.data;
            })
      },
      statusSearch() {
        this.search.click = !this.search.click
        this.search.nClick = !this.search.nClick
        this.boxsearch = ""
        this.showList();
      },
      searchProduct(){
        if(this.boxsearch){
          for (let index = 0; index < this.product.length; index++){
            const texts = this.product[index];
            if(texts.productName !== this.boxsearch.toUpperCase()){
              texts.pShow = false
              this.notFound = false
            }
            if(texts.productName.includes(this.boxsearch.toUpperCase())){
              texts.pShow = true
              this.notFound = false
            }
            if(this.product.every(texts => !texts.pShow)){
              this.notFound = true
            }
          }
        }else{
          this.showList();
        }
      },
    
      showList(){
        for (let index = 0; index < this.product.length; index++){
          this.product[index].pShow = true
          this.notFound = false
        }
      }
    },
    created() {
    this.retrieveProduct(); 
    this.listColor(); 
    },
  //   computed: {
  //   filterImages() {
  //     const { product, boxsearch } = this;
  //     return product.filter(({ productName }) => productName.includes(boxsearch));
      
  //   },

  // },
};
</script>

<style>
  .colorFormat {
    display: flex;
    width: 100%;
  }
</style>