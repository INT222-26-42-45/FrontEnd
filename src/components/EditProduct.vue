<template>
<div class="font-sans overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center mb-4">
    <div class="h-96 border-0 rounded-md shadow-lg flex flex-col lg:w-3/4 bg-darkgray outline-none focus:outline-none">
        <div class="flex justify-end">
            <button class="close text-white" type="button" @click="closeModal" > X </button>
        </div>
        <div class="felx mt-8 text-center uppercase font-bold text-white text-2xl">
            <p>edit product</p>
        </div>

        <div class=" bg-darkgray rounded-md px-4 ">
            <div class="lg:flex lg:flex-row justify-around mt-2 lg:space-x-5 sm:flex-col">
                <div class="mt-2 lg:w-2/5 lg:space-y-2 ">
                    <div>
                        <label class="label">Product name: </label>
                        <input  type="text" id="productName" name="productName"
                                v-model="productName" class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2 focus:ring-2 focus:ring-orange"/>
                    </div>
                    <div>
                        <label class="label">Type: </label>
                        <input  type="text" id="productType" name="productType" placeholder="Men/Women"
                                v-model="productType" class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2"/>
                    </div>
                    <div>
                        <label class="label">Price: </label>
                        <input  type="number" 
                                v-model="productPrice" class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2"/>
                    </div>
                    <div>
                        <label class="label">Size: </label>
                        <input  type="text" id="productSize" name="productSize"
                                v-model="productSize"  class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2"/>
                    </div>
                    <div>
                        <label class="label">Date: </label>
                        <input  type="Date" id="productDate" name="productDate" 
                                v-model="productDate"  class="font-medium text-left rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2"/>
                    </div>
                </div>
                <div class="mt-2 lg:w-3/5 lg:space-y-1">
                    <div>
                        <label class="label">Description: </label>
                        <textarea rows="4" cols="50" type="text" id="productDescription" name="productDescription"
                                placeholder="Enter product description ..." v-model="productDescription"  class="w-full px-3 py-2 mb-1 h-48 font-medium text-left bg-white border-2 border-orange border-opacity-50y rounded-md"/>
                    </div>
                    <div>
                        <label class="label">Brand: </label>
                        <select id="brands"  v-model="selectBrand"  name="brands" class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2" >  
                            <option v-for="brand in brands" :value="brand"  :key="brand.brandId">{{ brand.brandName }}</option> 
                        </select>
                    </div>
                    <div>
                        <label class="label pt-1">Color: </label>
                            <select id="brands"  v-model="selectColor"  name="brands" class="font-medium rounded-md border-2 border-orange border-opacity-50y w-full px-3 py-2" >  
                                <option v-for="color in colors" :value="color"  :key="color.colorId" class=" w-8 h-8 rounded-md mx-2 text-gray-700" :style="{ background: color.colorName }"> 
                                        {{ color.colorName }}</option> 
                            </select>
                    </div>
                </div>
            </div>

            <div class="mt-4 mb-4 flex flex-col items-center space-y-2">
                <label class="label">Choose a product picture (*.png): </label>
                <input type="file" class="text-white" accept="product.productImg/png" @change="selectPic" />
                <div class="flex justify-center">
                    <img :src="imageUpload" class="object-cover lg:h-60 w-30 sm:h-36" />
                </div>
            </div>
            <div class=" flex flex-row justify-center space-x-2 mt-4 mb-4">
                <button class="bg-lavender hover:bg-lavender hover:text-white py-2 px-16 mx-2 rounded-full text-darkgray text-xl font-bold uppercase" @click="updateProduct(productId)" >
                    edit
                </button>
            </div>
        </div>      
    </div>
</div>
</template>

<script>
import imageUpload from "../assets/imageupload.png";
import ProductService from '../service/ProductService.js';
import authHeader from '../service/AuthenHeader';

export default {
    name: "edit-product",
    props: ["pId"],
    data() {
        return {
            imageUpload: this.imageDb ? this.imageDb : imageUpload,
            brands: [],
            colors: [],
            product: [],
            imageFile: null,
            productImg: null,
            image: null,
            productName: "",
            productType: "",
            productPrice: null,
            productDate: "",
            productDescription: "",
            productSize: "",
            selectBrand: null,
            selectColor: null,
            productId: this.pId,
        }
    },
    methods: {
        retrieveProduct() {
        ProductService.get("/product/"+this.productId)
          .then(response => {
                    this.productName = response.data.productName,
                    this.productType = response.data.productType,
                    this.productPrice = response.data.productPrice,
                    this.productDate = response.data.productDate,
                    this.productDescription = response.data.productDescription,
                    this.productSize = response.data.productSize,
                    this.selectBrand = response.data.brands,
                    this.selectColor = response.data.colors,
                    this.productImg = response.data.productImg
          })
        },
        updateProduct(productId) {
            const formData = new FormData();
            let edit = {
                productId: this.productId,
                productName: this.productName,
                productType: this.productType,
                productSize: this.productSize,
                productPrice: this.productPrice,
                productDate: this.productDate,
                productImg: this.productImg,
                productDescription: this.productDescription,
                brands: this.selectBrand,
                colors: this.selectColor
            }
            const productData = JSON.stringify(edit);
            console.log(productData);
            const blob = new Blob([productData], {
                type: 'application/json'
            });
            
            formData.append('file', this.imageFile);
            formData.append('newProduct', blob);
            
            ProductService.put(`/edit/${productId}`, formData, {
                headers: {
                    Authorization: authHeader().Authorization,
                    'Content-Type' : 'multipart/form-data'
                }
            }).then(response => {
                if(response.status === 200){
                  alert("Already edited!")
                  this.$router.go()
                } 
            }).catch(error => {
                if(error.status === 401){
                alert("You must been login for edit product!")
                this.$router.push('/');
                }
                console.log(error);
            })
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
        getProductImage(productImg){
            // return "http://localhost:9000/image/"+productImg;
            // return "http://52.230.37.169/backend/image/"+productImg;
            return "https://skorshop.ddns.net/backend/image/"+productImg;
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
        closeModal(){
            this.$emit("close", true);
        },

  },
    created() {
    this.listBrand();
    this.listColor();
    this.retrieveProduct(); 
    }
};
</script>
