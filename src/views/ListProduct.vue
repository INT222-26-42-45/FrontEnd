<template>
  <div class="container text-base font-sans text-black mx-auto">
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
    
    <div class="grid md:grid-cols-4 sm:grid-cols-1 text-left justify-items-center">
      <div v-for="p in product" :key="p.productId" :id="p.productId" class="w-full p-1 md:p-2">
        <base-block class="relative">
          <img class="object-cover w-full rounded-t-md border-gray-200 h-36 bg-gray-200" :src="getProductImage(p.productImg)" />
          <div class="text-left p-2">
            <p class="mt-3">{{"Name: "+ p.productName }}</p>
            <p>{{"Type: "+ p.productType}}</p>
            <p>{{"Price: "+ p.productPrice }}</p>
            <div class="pb-8">
              <router-link to="/list-product">
                <button @click="toggleDetail" class="absolute bottom-2 right-0 uppercae text-center font-sans text-white py-2 px-2 mx-2 rounded-md bg-black hover:bg-pink">
                  see more
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
    <product-detail v-if="showDetail" @closed="toggleDetail"></product-detail>
    <div v-if="showDetail" class="show-modal"></div>
  </div>
</template>

<script>
import ProductService from '../service/ProductService';
import SearchProduct from '../components/SearchProduct.vue';
import ProductDetail from '../components/ProductDetail.vue';
export default {
    components: {
      SearchProduct,  
      ProductDetail
    },
    data(){
    return {
      product: [],
      showDetail: false

    };
    },
    methods: {
    toggleDetail: function(){
      this.showDetail = !this.showDetail;
    },
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