<template>
  <div class=" w-full text-base font-sans text-black md:overflow-hidden">
    <div class=" px-5 pt-4 md:flex md:items-stretch md:justify-end ">
      <router-link to="/manage-product">
        <button @click="toggleModal" class="hover:bg-black hover:text-pink py-3 px-3 mx-2 rounded-md text-darkgray text-xl font-bold uppercase">
          Add Product
        </button>
      </router-link>
    </div>

    <add-product v-if="showModal" @save-product="addNewProduct" @close="toggleModal">
    </add-product>
    <div v-if="showModal" class="show-modal"></div>
 
    <div class="grid md:grid-cols-3 sm:grid-cols-1 text-justify justify-items-center">  
      <div v-for="p in product" :key="p.productId" :id="p.productId" class="mx-10 text-sm ">
        <div class="piece rounded-md relative">
        
        <img class="pic" :src="getProductImage(p.productImg)"/>
        <p class="mt-3">{{"Name: "+ p.productName }}</p>
      
        <p class="mt-1">{{"Description: "+ p.productDescription }}</p>

        <p class="mt-1">{{"Type: "+ p.productType}}</p>

        <p class="mt-1">{{"Size: "+ p.productSize }}</p>

        <p class="mt-1 mb-2">{{"Brand: "+ p.brands.brandName }}</p>
        
        <div class="colorFormat">
        <div class="color rounded" 
        :key="p.colors.colorId" :style="{ background: p.colors.colorName }">
        </div>
        </div>

        <p>{{"Date: "+ p.productDate}}</p>

        <p class="mt-1">{{"Price: "+ p.productPrice }}</p>

        <div class="absolute bottom-0 right-0 pb-4 pr-3">
          <button class="bg-black hover:bg-lavender py-2 px-3 mx-2 rounded-md text-white uppercase" @click="editProduct(product)"
                  :class="{ show: editClicked == false }">
                  Edit
                  
          </button> 
          <button class="bg-black hover:bg-rose py-2 px-3 mx-2 rounded-md text-white uppercase" @click="deleteProduct(p.productId)">
                  Delete
          </button>
          </div>
          </div>
        </div>
    </div>
    <div class="md:grid-cols-3">
      <router-view @show="refreshList()" ></router-view>
    </div>
  </div>

  <!-- <edit-product v-if="editClicked" @close="changeEditItemClicked" @save-product="editProduct">
  </edit-product> -->
  <div v-if="editClicked" class="show-modal"></div>

  <div v-if="editClicked" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center mb-4">
            <div class=" h-96 border-0 rounded-md shadow-lg flex flex-col w-3/4 bg-darkgray outline-none focus:outline-none">
                <div class="flex justify-end">
                    <button class="close text-white" type="button" @click="closeModal" > X </button>
                </div>
                <div class="pt-3 flex justify-center md:justify-center">
                    <h3 class="text-3xl uppercase text-white">skór</h3>
                </div>

                <div class=" bg-darkgray rounded-md px-4">
                    <form @submit.prevent="updateProduct(submitEdit)">
                        <div class="flex flex-row justify-around mt-2 space-x-5">
                            <div class="mt-2 w-2/5 space-y-2">
                                <div>
                                    <label class="label">Product name: </label>
                                    <input  type="text" id="productName" name="productName"
                                    v-model="productName"   class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2 focus:ring-2 focus:ring-orange"/>
                                    <p v-if="invalidProductName" class="error">"Please enter product name"</p>
                                </div>
                                <div>
                                    <label class="label">Type: </label>
                                    <input  type="text" id="productType" name="productType" placeholder="Men/Women"
                                    v-model="productType"  class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2"/>
                                    <p v-if="invalidProductType" class="error">"Please enter product type"</p>
                                </div>
                                <div>
                                    <label class="label">Price: </label>
                                    <input  type="number"  placeholder=""
                                    v-model="productPrice"  class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2"/>
                                    <p v-if="invalidProductPrice" class="error">"Please enter product price"</p>
                                </div>
                                <div>
                                    <label class="label">Size: </label>
                                    <input  type="text" id="productSize" name="productSize"
                                    v-model="productSize"  class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2"/>
                                    <p v-if="invalidProductSize" class="error">"Please enter product size"</p>
                                </div>
                                <div>
                                    <label class="label">Date: </label>
                                    <input  type="Date" id="productDate" name="productDate" 
                                    v-model="productDate"  class="font-medium text-left rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2"/>
                                    <p v-if="invalidProductDate" class="error">"Please enter product date"</p>
                                </div>
                            </div>
                            <div class="mt-2 w-3/5 space-y-1">
                                <div>
                                    <label class="label">Description: </label>
                                    <textarea rows="4" cols="50" type="text" id="productDescription" name="productDescription"
                                    placeholder="Enter product description ..." v-model="productDescription"  class="w-full px-3 py-2 mb-1 h-52 font-medium text-left bg-white border-2 border-orange border-opacity-50y rounded-md"/>
                                    <p v-if="invalidProductDescription" class="error">"Please enter product description"</p>
                                </div>
                                <div>
                                    <label class="label">Brand: </label>
                                    <select id="brands"  v-model="selectBrand"  name="brands" class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2" >  
                                        <option v-for="brand in brands" :value="brand"  :key="brand.brandId">{{ brand.brandName }}</option> 
                                    </select>
                                    <p v-if="invalidBrand" class="error">"Please select product brand"</p>
                                </div>
                                <div class=" pt-1.5">
                                    <label  class="label">Color: </label>
                                    <div class="grid grid-cols-10 justify-items-start">
                                        <div v-for="p in product" :key="p.productId"  >
                                            <input type="checkbox" v-model="selectColor" :value="color"/>
                                           <div class=" w-8 h-8 rounded-md mx-2" :style="{ background: p.colors.colorName }"></div>
                                        </div>
                                    </div>
                                    <p v-if="invalidColors" class="error">"Please select product color"</p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 mb-4 flex flex-col items-center space-y-2">
                            <label class="label">Choose a product picture (*.png, *.jpeg): </label>
                            <input type="file" class="text-white" accept="product.productImg/png" @change="selectPic" />
                            <div class="flex justify-center">
                                <img :src="imageUpload" class="object-cover h-60 w-30" />
                            </div>
                        </div>
                        <div class=" flex flex-row justify-center space-x-2 mt-4 mb-4">
                            <button class="bg-lavender hover:bg-lavender hover:text-white py-2 px-16 mx-2 rounded-full text-darkgray text-xl font-bold uppercase" @click="productForm" >
                                Edit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
 
</template>

<script>
import imageUpload from "../assets/imageupload.png";
import ProductService from '../service/ProductService';
import AddProduct from '../components/AddProduct.vue';
export default {
  name: "manage-product",
  components: {
    AddProduct,
  },
  data(){
    return {
      product: [],
      brands: [],
      colors: [],
      showModal: false,
      editClicked: false,
      imageUpload: this.imageDb ? this.imageDb : imageUpload,
      imageFile: null,
      productImg: null,
      productName: "",
      productType: "",
      productPrice: null,
      productDate: "",
      productDescription: "",
      productSize: "",
      invalidProductName: false,
      invalidProductType: false,
      invalidProductPrice: false,
      invalidProductSize: false,
      invalidProductDate: false,
      invalidProductDescription: false,
      invalidBrands: false,
      invalidColors: false,
      selectBrand: null,
      selectColor: null,
      image: null,
      submitEdit: null,
      productId: this.id,
    };
  },
  methods: {
    toggleModal: function() {
      this.showModal = !this.showModal;
    },
    openModalEdit(v){
      this.editClicked = v;
    },
    productForm() {
            this.invalidProductName = this.productName === "" ? true:false;
            this.invalidProductType = this.productType === "" ? true:false;
            this.invalidProductPrice = this.productPrice === null || this.productPrice === "" ? true : false;
            this.invalidProductSize = this.productSize === "" ? true:false;
            this.invalidProductDate = this.productDate === "" ? true:false;
            this.invalidProductDescription = this.productDescription === "" ? true:false;
            this.invalidBrands = this.selectBrand === null ? true:false;
            this.invalidColors = this.selectColor.length === 0 ? true:false;
            if(this.invalidProductName || this.invalidProductType || this.invalidProductPrice ||this.invalidProductSize ||
            this.invalidProductDate || this.invalidProductDescription || this.invalidBrands || this.invalidColors ) {
                return;
            }
            this.updateProduct();
            },
    updateProduct(update) {
            const formData = new FormData();
            let pid = update.productId;
            let edit = {
                productId: pid,
                productName: this.productName,
                productType: this.productType,
                productSize: this.productSize,
                productPrice: this.productPrice,
                productDate: this.productDate,
                productImg: this.productImg,
                productDescription: this.productDescription,
                brands: this.selectBrand,
                colors: this.selectColor
            };
            const productData = JSON.stringify(edit);
            const blob = new Blob([productData], {
                type: 'application/json'
            });
            
            formData.append('file', this.imageFile);
            formData.append('newProduct', blob);
            
            ProductService.put("/edit/"+ pid, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }).then(response => {
                response.status === 200 ? alert("Edit") : alert("Error")
            })
        },
    closeModal(){
            this.editClicked = false;
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
    selectPic(s) {
            const file = s.target.files[0];
            this.image = URL.createObjectURL(file);
            this.productImg = file.name;
            this.imageFile = file;
            let reader = new FileReader();
            reader.onload = (s) => {
                this.imageUpload = s.target.result;
            };
            reader.readAsDataURL(file);
        },
    
      listBrand(){
            ProductService.get("/brand").then(response => {
                this.brands = response.data;
            });
        },
      listColor(){
            ProductService.get("/color").then(response => {
                this.colors = response.data;
            })
        },
      editProduct(product) {
        this.editClicked = true;
        this.productName = product.productName;
        this.productPrice = product.productPrice;
        this.productType = product.productType;
        this.productSize = product.productSize;
        this.productPrice = product.productPrice;
        this.productDate = product.productDate;
        this.productDescription = product.productDescription;
        this.selectBrand = product.brands;
        this.selectColor = product.colors;
        this.submitEdit = product;
      },
    refreshList() {
      this.retrieveProduct();
    },
    deleteProduct(productId) {
      ProductService.delete("/delete/"+ productId) 
      .then(response => {
        this.product = response.data;
        this.refreshList();
        this.$router.push('/product');
      });
    },
  },
    created() {
    this.retrieveProduct();
    this.listBrand();
    this.listColor();
  },
  //
};
</script>
<style scoped>
.colorFormat {
  display: flex;
  width: 100%;
}
.color {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 0px;
  margin-bottom: 10px;
}
.piece {
    width: 400px;
    height: 550px;
    border: 1px solid #F9BEC7;
    padding: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    background-color: #F9BEC7;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.pic {
  height: 80px;
  margin: auto;
  display: block;
}
/* button {
  @apply px-4 py-1.5 rounded;
} */
</style>