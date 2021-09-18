<template>
    <div class="text-darkgray text-xl font-bold uppercase px-5 lg:py-5 py-2 lg:w-1/6 mx-auto w-max">
        Your cart
    </div>

    <div class="lg:flex justify-center items-start my-3">
        <div v-for="itr in length" :key="itr">
            <div class="grid md:grid-cols-2 sm:grid-cols-1 text-left font-sans text-base justify-items-center">
                <base-block>
                <div class="grid grid-cols-2">
                    <div class="box-content h-56 w-full bg-gray-200">
                        <img :src="cartItem[itr-1].pImg" class="object-cover mt-10 w-full border-gray-200 lg:h-36  bg-gray-200" />
                    </div>
                    <div class="relative text-left pl-4">
                        <p id="product-name">{{ cartItem[itr-1].pName }}</p>
                        <p id="product-price" class="mb-0 font-weight-bold">{{ cartItem[itr-1].pPrice }}THB</p>
                        <p id="product-quantity" class="mb-0">
                            Quantity:
                            <input size="1" class="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0" v-model="cartItem[itr-1].pQuantity" @change="updateItem(cartItem[itr-1].id,cartItem[itr-1].pQuantity)"/>
                        </p>
                        <p id="product-quantity" class="mb-0">
                            Total: {{cartItem[itr-1].pPrice*cartItem[itr-1].pQuantity}}
                        </p>
                        <div class="absolute bottom-0 flex flex-row ">
                            <input  type="number" name="quantity"
                                    class="rounded-sm border border-gray-600 w-20 px-2 py-1"/>
                            <button class=" uppercae text-center font-sans text-white px-2 mx-2 rounded-md bg-green-500  hover:bg-green-600">
                                update
                            </button>
                        </div>
                        <div class="absolute bottom-0 right-0">
                            <button @click="deleteItem(cartItem[itr-1].id)" class="uppercae text-center font-sans text-white py-1 px-2 mx-2 rounded-md bg-red-600  hover:bg-red-700">
                                delete
                            </button>
                        </div>
                    </div>
                </div>
                </base-block>
            </div>
        </div>
        <div>
            <h5>Total Cost :{{ totalcost }}THB</h5>
            <!-- <button :disabled="isDisabled()" class="button_check" @click="checkout()" >Confirm Order</button> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Cart',
    props: ["baseURL"],
    data() {
        return {
            carts: null,
            token: null,
            lengt: 0,
            totalcost: 0,
            cartItem: [],
            Id: -1
        }
    },
    methods: {
        isDisabled(){
            if(this.len === 0){
                return true;
            }
            return false;
        },
        showDetails(itr){
            this.$router.push({ name: 'ShowDetails', params: { id : this.cartItem[itr].productId } })
        },
        checkout(){
            this.$router.push({ name: 'Checkout',params:{id:this.len}})
        },
        listCartItems(){
            axios.get(`${this.baseURL}cart/?token=${this.token}`).then((response) => {
                if(response.status==200){
                    this.carts=response.data;
                    this.lengt = Object.keys(this.carts.cartItems).length
                    this.totalcost = this.carts.totalCost
                    let i;
                    for(i=0;i<this.len;i++){
                        this.cartItem.push({
                            pImg:this.carts.cartItems[i].product.peoductImg,
                            pName:this.carts.cartItems[i].product.productName,
                            pDescription:this.carts.cartItems[i].product.productDescription,
                            pPrice:this.carts.cartItems[i].product.productPrice,
                            pQuantity:this.carts.cartItems[i].quantity ,
                            id:this.carts.cartItems[i].cartId,
                            pId:this.carts.cartItems[i].product.productId,
                            userId:this.carts.cartItems[i].userId
                        })
                    }
                }
            },
            (error)=>{
                console.log(error)
            });
        },
        deleteItem(itemId){
            axios.delete(`${this.baseURL}cart/delete/${itemId}/?token=${this.token} `)
                .then((response)=>{
                    if(response.status==200){
                        this.$router.go(0);
                    }
                },(error)=>{
            console.log(error)
            })
        },
        updateItem(itemId,quantity){
            let i
            for(i=0;i<this.len;i++){
                if(this.cartItem[i].id === itemId){
                    break
                }
            }
            this.cartItem[i].pQuantity = quantity
            let userId = this.cartItem[i].userId
            let productId = this.cartItem[i].pId
            axios.put(`${this.baseURL}cart/update/${itemId}/?token=${this.token}`,{
                id:itemId,
                userId,
                productId,
                quantity
            }).then(() => {
                this.listCartItems()
            })
        }
    },
    mounted() {
    this.token = localStorage.getItem("token");
    this.listCartItems();
    },

};
</script>