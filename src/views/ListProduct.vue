<template>
  <div class="w-full text-base font-sans text-black md:overflow-hidden">
      <div class="flex justify-center my-4 space-x-2">
        <div>
          <input v-model="boxsearch" v-show="search.click" placeholder="Enter sneaker's name!"
                  class="p-2 py-2 lg:w-80 sm:w-60 bg-white rounded border-2 border-black">
          </div>
        <div>
          <button class="bg-black rounded-full text-white py-2 px-2 w-10 h-10 hover:text-pink"  @click="statusSearch" v-show="search.nClick">
            <span class="material-icons">search</span>
          </button>
          <button class="hover:bg-pink bg-black py-2 px-3 rounded-md text-white lg:text-lg sm:text-base uppercase" v-show="search.click" @click="statusSearch">
            Cancel
          </button>
        </div>
      </div>

      <div class="lg:flex lg:justify-center">
          <button @click="toggleModal" class="hover:bg-black hover:text-pink py-3 px-3 mx-2 rounded-md text-darkgray text-xl font-bold uppercase">
            Add Product
          </button>
      </div>
      <add-product v-if="showModal" @save-product="addNewProduct" @close="toggleModal">
      </add-product>
      <div v-if="showModal" class="show-modal"></div>
    
    <edit-product v-if="openEdit" @close="closeModal" :pId="productEdit">
    </edit-product>
    <div v-if="openEdit" class="show-modal"></div>

    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-left justify-items-center my-4">
      <div v-for="(p, index) in filterProduct" :key="index" :id="p.productId" class="w-full p-1 md:p-2">
        <base-block class="relative">
          <img class="object-cover w-full rounded-t-md border-gray-200 lg:h-48 sm:h-36 bg-gray-200" :src="getProductImage(p.productImg)"/>
          <div class="text-left p-2">
            <p class="mt-3">{{"Name: "+ p.productName }}</p>
            <p>{{"Type: "+ p.productType}}</p>
            <p>{{"Price: "+ p.productPrice }} THB</p>
          </div>
          <div class="pb-8 pt-4">
              <button class="bottom-4 left-4 hover:text-pink absolute text-black text-base" @click="editProduct(p.productId)">
                <font-awesome-icon icon="edit" class="mr-2"/>
              </button>
            <button class="absolute bottom-4 left-14 hover:text-pink text-black" @click="deleteProduct(p.productId)">
                <font-awesome-icon icon="trash-alt" class="mr-2"/>
            </button>
          </div>
            <router-link to="/list-product">
              <button @click="clickDetail(p.productId)"  class="bottom-2 right-2 hover:bg-black hover:text-pink py-2 w-32 rounded-md absolute text-black text-base uppercase">
                <p class="md:hidden lg:inline">see more</p> <font-awesome-icon icon="arrow-right" class=" mr-2"/>
              </button>
            </router-link>
        </base-block>
      </div> 
    </div>

    <!-- popup detail -->
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
                      <div class="lg:flex lg:flex-row justify-around mt-2 space-x-5 sm:flex sm:flex-col">
                        <div class="lg:flex lg:justify-center sm:justify-center mt-2 w-3/5 rounded-md border-gray-200 bg-gray-200">
                          <img class="object-cover w-auto lg:h-52 p-2 mt-12" :src="getProductImage(pr.productImg)"/>
                        </div>

                        <div class=" mt-2 w-2/5 space-y-2 ">
                          <p class="text-xl text-left whitespace-nowrap">Name: {{pr.productName}}</p>
                          <p class="text-lg text-left whitespace-nowrap">Type: {{pr.productType}}</p>
                          <p class="text-lg text-left whitespace-nowrap">Price: {{pr.productPrice}}</p>
                          <p class="text-lg text-left whitespace-nowrap">Size: {{pr.productSize}}</p>
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
                        
                          <div class="lg:pt-6">
                            <router-link to="/cart">
                              <button @click="addToCart(pr.productId, quantity)" class=" bg-black hover:text-pink py-2 lg:w-4/5 sm:w-4/5 md:w-full sm:px-4 rounded-md text-white text-base text-center whitespace-nowrap uppercase">
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
import ProductService from '../service/ProductService';
import authHeader from '../service/AuthenHeader';
import AddProduct from '../components/AddProduct.vue';
import EditProduct from '../components/EditProduct.vue';
export default {
    components: {
      AddProduct,
      EditProduct
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
        showModal: false,
        productEdit: "",
        openEdit: false
      };  
    },
    methods: {
      toggleModal: function() {
        this.showModal = !this.showModal;
      },
      closeModal(){
        this.openDetail = false;
        this.openEdit = false;
      },
      deleteProduct(productId) {
        alert("Do you want to delete this product?");
        ProductService.delete(`/delete/${productId}`,  {
            headers: {
                Authorization: authHeader().Authorization,
             },
        }) 
          .then(response => {
            this.product = response.data;
            alert("The product was deleted!");
            this.$router.go()
          }).catch(error => {
              if(error.status === 401){
                alert("You must been login for delete product!")
                this.$router.push('/');
              }
                console.log(error);
          })
      },
      clickDetail(productId){
        this.popupProduct = [];
        var pro = [];
        ProductService.get("/product/"+productId)
        .then(res => {
          pro = res.data;
          this.popupProduct.push(pro);
        }); 
        this.openDetail = true;    
      },
      editProduct(productId){
        this.productEdit = productId;
        this.openEdit = true;       
      },
      addToCart(productId, quantity){
        ProductService.post(`/cart/add/${productId}/${quantity}`, {} ,{
             headers: {
                Authorization: authHeader().Authorization
             },
        }).then(response => {
                if(response.status === 200){
                  alert("Added in cart!")
                }  
                
            }).catch(error => {
              if(error.status === 401){
                alert("You must been login for add product to cart!")
                this.$router.push('/');
              }
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
      // return "http://52.230.37.169/backend/image/"+productImg;
      return "https://skorshop.ddns.net/backend/image/"+productImg;
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
      },

    },
    created() {
    this.retrieveProduct(); 
    this.listColor(); 
    },
    computed: {
    filterProduct() {
      return this.product.filter(({ productName }) => 
        { return productName.toUpperCase()
        .includes(this.boxsearch.toUpperCase())
        }
      );
      
    },
  },
};
</script>

<style>
  .colorFormat {
    display: flex;
    width: 100%;
  }
</style>