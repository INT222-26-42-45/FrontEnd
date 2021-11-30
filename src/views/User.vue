<template>
    <div class="flex flex-col font-sans my-4">
        <div class=" text-center uppercase font-bold text-black text-2xl">
            account management
        </div>
        <div class="flex justify-center mt-4 text-darkgray">
            <div v-for="u in user" :key="u.userId">
            <table class="border-collapse border border-darkgray table-fixed w-3/4 text-lg shadow-lg">
                <thead>
                    <tr class="border border-r border-darkgray h-12 text-xl">
                        <th class="uppercase w-1/5">id</th>
                        <th class="uppercase w-1/3">username</th>
                        <th class="uppercase w-1/2">firstname</th>
                        <th class="uppercase w-1/2">lastname</th>
                        <th class="uppercase w-1/3">gender</th>
                        <th class="uppercase w-1/2">management</th>
                    </tr>
                </thead>
                <tbody>
                        <tr class="h-10">
                            <td class="border-b border-darkgray">{{u.userId}}</td>
                            <td class="border-b border-darkgray">{{u.username}}</td>
                            <td class="border-b border-darkgray">{{u.firtname}}</td>
                            <td class="border-b border-darkgray">{{u.lastname}}</td>
                            <td class="border-b border-darkgray">{{u.gender}}</td>
                            <td class="border-b border-darkgray space-x-4">
                                <button @click="clickDelete" type="submit" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-1 w-16 bg-red-600 hover:bg-red-700 rounded-md">
                                    delete
                                </button>
                            </td>
                        </tr>
                    
                </tbody>
            </table>
            </div>
        </div>
        <!-- <div class="border-collapse border border-darkgray table-fixed w-3/4 text-lg shadow-lg">
            <router-view @show="refreshList()" ></router-view>
        </div> -->

        <div v-if="openVerify"  class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center mb-4">
            <div class=" h-56 border-0 rounded-md shadow-lg flex flex-col lg:w-2/4 md:w-1/2 bg-white outline-none focus:outline-none">

              <div class="flex justify-end">
                <button class="close text-black" type="button" @click="closeModal()" > X </button>
              </div>

              <div class="pt-3 flex justify-center md:justify-center">
                <h3 class="text-2xl text-darkgray font-semibold">Enter your password to verify identity to delete the user!</h3>
              </div>

              <div class=" bg-white rounded-md px-4 pb-4">
                <form class="text-darkgray space-y-2">
                    <div class="lg:flex lg:flex-row justify-center mt-2 space-x-5 sm:flex-col">
                        <div class="mt-2 w-3/5">
                            <input v-model="password" type="password" class="inputsign w-full" required>
                        </div>
                    </div>
                    <div class="flex justify-around pt-3 ">
                        <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-64 bg-green-600 hover:bg-green-500 rounded-md">
                            <span
                            class="spinner-border spinner-border-sm"
                            ></span>
                            submit
                        </button>
                        <button @click="closeModal()" type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-64 bg-red-600 hover:bg-red-500 rounded-md">
                            <span
                            class="spinner-border spinner-border-sm"
                            ></span>
                            cancle
                        </button>
                    </div>
                  </form>
               </div>

            </div>
        </div>

        <div v-if="openVerify" class="show-modal"></div>
    </div>
</template>
<script>
import ProductService from '../service/ProductService.js';
import AuthenHeader from '../service/AuthenHeader.js';
export default {
    data(){
        return {
            openVerify: false,
            user: [],
            userId: null
        }
    },
    methods: {
        closeModal(){
            this.openVerify = false;
        },
        clickDelete(){
            this.openVerify = true;
        },
        retrieveListUser() {
            ProductService.get("/listuser", {
                headers: AuthenHeader()
            })
                .then(response => {
                this.listUser = response.data;
                console.log(response)
            })
        },
    },
    created() {
        this.retrieveListUser();
    } 
};
</script> 