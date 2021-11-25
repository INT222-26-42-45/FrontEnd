
<template>
    <div class="text-black flex flex-col text-2xl font-bold uppercase px-5 lg:py-5 py-2 lg:w-1/6 mx-auto w-max">
        Your cart
    </div>
    <div class="flex justify-center text-darkgray font-sans mb-6">
        <div class="flex flex-col w-full p-8 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
            <div class="flex-1">
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
                                <img src="../assets/Airmax-90-4.png" class="w-48" alt="Thumbnail" />
                            </div>
                        </td>
                        <td>
                            <p class="mb-2 md:ml-2 text-xl">Nike Air Max 90</p>
                            <button type="submit" class="text-gray-700 hover:text-red-600 md:ml-2">
                                <small>(Remove item)</small>
                            </button>
                        </td>
                        <td class="justify-center md:justify-end md:flex mt-8">
                            <div class="w-20 h-10">
                                <input type="number" value="1" 
                                class="w-full rounded-md text-center text-lg text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                            </div>
                        </td>
                        <td class="justify-center mt-6 hidden text-right md:table-cell">
                            <p class="mb-2 md:ml-2 text-xl">4500.00 THB</p>
                        </td>
                        <td class="justify-center mt-6 text-right">
                            <p class="mb-2 md:ml-2 text-xl">4500.00 THB</p>
                        </td>
                    </tr> 
                </tbody>
            </table>
            <hr class="mt-6">
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
                            Total item
                        </div>
                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                            1
                        </div>
                        </div>
                        <div class="flex justify-between pt-4 border-b">
                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center uppercase text-gray-800">
                            Total price
                        </div>
                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                            4500.00 THB
                        </div>
                        </div>
                    <a href="#">
                        <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                        <p class="ml-2 mt-5px">checkout</p>
                        </button>
                    </a>
                </div>
                </div>
            </div>
            </div>
        </div>
</div>
</template>

<script> 

import ProductService from '../service/ProductService.js';
import AuthenHeader from '../service/AuthenHeader';
export default {
    name: "cart",
    props: ["product"],
    data() {
        return {
        cart: [],
        quantity: null
      };
    },
    methods: {
        listCart(userId){
            ProductService.get("/cart/"+userId , {
           headers: AuthenHeader()
            }).then(response => {
                this.cart = response.data;
            })
        },
        updateQuantity(productId, quantity){
            ProductService.post("/cart/update/"+productId, quantity ,{
            headers: AuthenHeader(),
            productId : this.productId,
            quantity : this.quantity
            }).then(response => {
            response.status === 200 ? alert("Add") : alert("Error")
            })
        },
        deleteProduct(productId) {
            ProductService.delete("/cart/delete/"+ productId,{
                headers: AuthenHeader()
            }) 
            .then(response => {
                this.cart = response.data;
            });
        },
    }

};
</script> !