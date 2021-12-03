<template>
    <div class="flex flex-col font-sans">
        <div class="mt-4 text-center uppercase font-bold text-black text-2xl">
            brand & color management
        </div>
        <div class="lg:flex lg:flex-row sm:flex sm:flex-col justify-around lg:space-x-8 my-4">
            <div class="flex flex-col lg:pl-4">
                <div class="text-center uppercase font-bold text-black text-xl">
                    brand
                </div>
                <div class="border border-gray-50 rounded-md shadow-lg p-2 mt-2">
                    
                    <div class="mt-4 space-x-3">
                        <input type="text" v-model="brandName" placeholder="Enter name brand!" class="border-2 border-pink focus:outline-none focus:ring-1 focus:ring-pink text-base font-sans px-3 py-2 rounded-md" required>
                        <button type="submit" @click="addBrand()" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-2 w-16 bg-black hover:text-pink rounded-md">
                            add
                        </button>
                    </div>
                    <div v-for="b in brand" :key="b.brandId">
                    <div class="mt-4 pb-2 text-darkgray flex justify-center">
                        <table class="p-4 lg:border-collapse lg:border lg:border-darkgray lg:table-fixed lg:w-3/4 sm:w-3/4">
                            <thead>
                                <tr class="lg:border lg:border-r lg:border-darkgray h-12 lg:text-xl sm:text-base">
                                    <th class="uppercase w-1/3  hidden sm:table-cell">brand</th>
                                    <th class="uppercase w-1/3 hidden sm:table-cell">management</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="h-10 lg:text-xl sm:text-base">
                                    <td class="lg:border-b whitespace-nowrap lg:border-darkgray">{{b.brandName}}</td>
                                    <td class="lg:border-b lg:border-darkgray">
                                        <button type="submit" @click="deleteBrand(b.brandId)"   class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-1 w-16 bg-red-600 hover:bg-red-700 rounded-md">
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>

            <div class="flex flex-col lg:pr-4 ">
                <div class="text-center uppercase font-bold text-black text-xl">
                     color
                </div>
                <div class="border border-gray-50 rounded-md shadow-lg p-2 mt-2">
                    <div class="mt-4 space-x-3">
                        <input type="text" v-model="colorName" placeholder="Enter hex color code!" class="border-2 border-pink focus:outline-none focus:ring-1 focus:ring-pink text-base font-sans px-3 py-2 rounded-md" required>
                        <button type="submit" @click="addColor()"  class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-2 w-16 bg-black hover:text-pink rounded-md">
                            add
                        </button>
                    </div>
                    <div v-for="c in color" :key="c.colorId">
                    <div class="mt-4 pb-2 text-darkgray flex justify-center">
                        <table class="p-4 lg:border-collapse lg:border lg:border-darkgray lg:table-fixed lg:w-3/4 sm:w-3/4">
                            <thead>
                                <tr class="lg:border lg:border-r lg:border-darkgray h-12 lg:text-xl sm:text-base">
                                    <th class="uppercase w-1/3 whitespace-nowrap">hex code</th>
                                    <th class="uppercase w-1/3  hidden sm:table-cell">management</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="h-10 lg:text-xl sm:text-base">
                                    <td class="lg:border-b lg:border-darkgrayy" :style="{ background: c.colorName }"></td>
                                    <td class="lg:border-b lg:border-darkgray">
                                        <button type="submit" @click="deleteColor(c.colorId)" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-1 w-16 bg-red-600 hover:bg-red-700 rounded-md">
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductService from '../service/ProductService.js';
import authHeader from '../service/AuthenHeader.js';
export default {
    data(){
        return {
            brand: [],
            brandId: null,
            brandName: "",
            color: [],
            colorName: "",
            colorId: null
        }
    },
    methods: {
        listBrand() {
            ProductService.get("/brand")
            .then(response => {
                this.brand = response.data;
            })
        },
        addBrand(){
            const formData = new FormData();
            let add = {
                brandName: this.brandName
            }
            const brandData = JSON.stringify(add);
            const blob = new Blob([brandData], {
                type: 'application/json'
            });
            
            formData.append('newBrand', blob);
            ProductService.post(`/brand/add`,  formData, {
             headers: {
                Authorization: authHeader().Authorization,
                'Content-Type' : 'multipart/form-data'
             },
        }).then(response => {
                response.status === 200 ? alert("Brand was added!") : alert("Error")
                this.$router.go()
            }).catch(error => {
                console.log(error);
            })
        },
        deleteBrand(brandId){
            alert("Do you want to delete this brand?");
            ProductService.delete(`/brand/delete/${brandId}`, {
             headers: {
                Authorization: authHeader().Authorization
             },
        }).then(response => {
                response.status === 200 ? alert("Brand was deleted!") : alert("Error")
                this.$router.go()
            }).catch(error => {
                console.log(error);
            })
        },
        listColor() {
            ProductService.get("/color")
            .then(response => {
                this.color = response.data;
            })
        },
        addColor() {
            const formData = new FormData();
            let add = {
                colorName: this.colorName
            }
            const colorData = JSON.stringify(add);
            const blob = new Blob([colorData], {
                type: 'application/json'
            });
            
            formData.append('newColor', blob);
            ProductService.post(`/color/add`,  formData, {
             headers: {
                Authorization: authHeader().Authorization,
                'Content-Type' : 'multipart/form-data'
             },
        }).then(response => {
                response.status === 200 ? alert("Color was added!") : alert("Error")
                this.$router.go()
            }).catch(error => {
                console.log(error);
            })
        },
        deleteColor(colorId){
            alert("Do you want to delete this color?");
            ProductService.delete(`/color/delete/${colorId}`, {
             headers: {
                Authorization: authHeader().Authorization
             },
        }).then(response => {
                response.status === 200 ? alert("Color was deleted!") : alert("Error")
                this.$router.go()
            }).catch(error => {
                console.log(error);
            })
        },
        
    },
    created() {
        this.listBrand();
        this.listColor();
    } 
};
</script> 