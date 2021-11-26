<template>
    <div class="text-black flex flex-col text-2xl font-bold uppercase px-5 lg:py-5 py-2 lg:w-1/6 mx-auto w-max">
        Your cart
    </div>
    <div class="flex justify-center text-darkgray font-sans mb-6">
        <div class="flex flex-col w-full p-8 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
            <div class="flex-1">
            <div v-for="c in cart" :key="c.cartId" >
            <table class="w-full table-fixed" cellspacing="0">
                <thead>
                    <tr class="h-12 uppercase text-xl">
                        <th class="hidden md:table-cell"></th>
                        <th class="text-left">Product</th>
                        <th class="lg:text-right text-left pl-5 lg:pl-0">
                        <p class="lg:hidden" title="Quantity">Qtd</p>
                        <p class="hidden lg:inline">Quantity</p>
                        </th>
                        <th class="hidden text-right md:table-cell">Unit price</th>
                        <th class="text-right">Total price</th>
                    </tr>
                </thead>
                <tbody>

                    <tr class="h-10">
                        <td class="hidden pb-4 md:table-cell">
                            <div class="box-content w-48 rounded-md bg-gray-200 mt-2">
                                <img :src="retrieveProductImage(c.products.productImg)" class="w-48" alt="Thumbnail" />
                            </div>
                        </td>
                        <td>
                            <p class="mb-2 md:ml-2 text-xl">{{c.products.productName}}</p>
                            <button type="submit" @click="deleteCart(c.cartId)"  class="text-gray-700 hover:text-red-600 md:ml-2">
                                <small>(Remove item)</small>
                            </button>
                        </td>
                        <td class="justify-center md:justify-end md:flex mt-8">
                            <div class="w-20 h-10">
                                <input type="number" v-model="c.quantity" 
                                class="w-full rounded-md text-center text-lg text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                            <button type="submit" @click="updateCart(c.cartId,c.quantity)"  class="text-gray-700 hover:text-red-600 md:ml-2">
                                <small>(Update)</small>
                            </button>
                            </div>
                        </td>
                        <td class="justify-center mt-6 hidden text-right md:table-cell">
                            <p class="mb-2 md:ml-2 text-xl">{{c.products.productPrice}}</p>
                        </td>
                        <td class="justify-center mt-6 text-right">
                            <p class="mb-2 md:ml-2 text-xl">{{c.total}}</p>
                        </td>
                    </tr> 
                </tbody>
            </table>
                    <hr class="mt-6">
                        </div>
                        <div class="my-4 mt-6 -mx-2 flex justify-center lg:flex">
                        <div class="lg:px-2 lg:w-1/2">
                        <div class="p-4">
                            <div class="flex justify-center border-b">
                                <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center uppercase text-gray-800">
                                order summary
                                </div>
                            </div>
                                <div class="flex justify-between pt-4 border-b">
                                <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center uppercase text-gray-800">
                                    Total price
                                </div>
                                <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                    {{ totalPrice }}
                                </div>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script> 

import ProductService from '../service/ProductService.js';
import authHeader from '../service/AuthenHeader';
export default {
    name: "cart",
    data() {
        return {
        cart: [],
        quantity: null,
        userId: null,
        totalPrice: null,
        cartId: null
      };
    },
    methods: {
        listCart(){
            ProductService.get(`/cart` , {
             headers: {
                Authorization: authHeader().Authorization,
             },
            }).then(response => {
                this.cart = response.data;
            })
        },
        retrieveProductImage(productImg){
            // return "http://localhost:9000/image/"+productImg;
      return "http://52.230.37.169/backend/image/"+productImg;
      },
      updateCart(cartId,quantity){
        ProductService.put(`/cart/update/${cartId}/${quantity}`, {} ,{
             headers: {
                Authorization: authHeader().Authorization,
             },
        }).then(response => {
                response.status === 200 ? alert("Update") : alert("Error")
                this.$router.go()
            }).catch(error => {
                console.log(error);
            })
      },
      deleteCart(cartId){
        ProductService.delete(`/cart/delete/${cartId}`, {
             headers: {
                Authorization: authHeader().Authorization,
             },
        }).then(response => {
                response.status === 200 ? alert("Delete") : alert("Error")
                this.$router.go()
            }).catch(error => {
                console.log(error);
            })
      },
    },
    mounted(){
        ProductService.get(`/cart` , {
             headers: {
                Authorization: authHeader().Authorization,
             },
            }).then(response => {
                for(let i in response.data){
                    this.totalPrice += response.data[i].total
                }
            })
    },
    created() {
        this.listCart();
    }

};
</script> 