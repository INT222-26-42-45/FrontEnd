<template>
  <div class="container mx-auto">
    <div class="flex justify-center mt-4 ">
      <div>
        <search-product @box-search="box_search" @status-search="statusSearch" v-show="search"></search-product>
        <button @click="statusSearch" v-show="!search">
          <img src="../assets/search.png" />
        </button>  
      </div>
      <div>      
      </div>
    </div>   
    
    <div class="grid md:grid-cols-4 sm:grid-cols-1 text-left font-sans text-lg justify-items-center">
      <div v-for="p in product" :key="p.productId" :id="p.productId" class="w-full p-1 md:p-2">
        <base-block>
          <img class="object-cover w-full rounded-t-md border-gray-200 lg:h-36 bg-gray-200" :src="getProductImage(p.productImg)" />
          <div class="text-left pl-2 p-2">
            <p class="mt-3">{{"Name: "+ p.productName }}</p>
            <p>{{"Type: "+ p.productType}}</p>
            <p>{{"Price: "+ p.productPrice }}</p>
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
import SearchProduct from '../components/SearchProduct.vue';
export default {
    components: {
      SearchProduct  
    },
    data(){
    return {
      product: [],
      colors: [],
      brands: [],

    };
    },
    methods: {
    retrieveProduct() {
        ProductService.get("/product")
            .then(response => {
                this.product = response.data;
        })
    },
    getProductImage(productImg){
      return "http://localhost:9000/image/"+productImg;
      // return "http://40.65.142.182/backend/image/"+productImg;
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