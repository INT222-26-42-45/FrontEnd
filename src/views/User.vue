<template>
    <div class="w-full bg-gray-100 font-sans text-darkgray md:overflow-hidden">
        <div class="pt-4 text-center uppercase font-bold text-black text-2xl ">
            account management
        </div>

        <div class="p-4 flex justify-center">
            <div class="pin-r pin-y md:w-4/5 lg:w-4/5 bg-white p-2 pb-4 shadow-lg rounded-sm border border-gray-200">
                <div class=" flex-1">
                        <div v-for="u in user" :key="u.userId">
                        <table class="w-full table-fixed" cellspacing="0">
                            <thead>
                                <tr class="lg:text-base sm:text-base uppercase text-gray-400 bg-gray-50">
                                    <th class="p-2 whitespace-nowrap text-left ">
                                        username
                                    </th>
                                    <th class="p-2 text-left  whitespace-nowrap hidden md:table-cell sm:table-cell">
                                        firstname
                                    </th>
                                    <th class="p-2 text-left  whitespace-nowrap hidden md:table-cell sm:table-cell">
                                        lastname
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        management
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-base divide-y divide-gray-100">
                                <tr>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="text-left font-medium text-gray-800">{{u.username}}</div>
                                        </div>
                                    </td>
                                    <td class="p-2 hidden whitespace-nowrap md:table-cell sm:table-cell">
                                        <div class="text-left font-medium">{{u.firstname}}</div>
                                    </td>
                                    <td class="p-2 hidden whitespace-nowrap md:table-cell sm:table-cell">
                                        <div class="text-left font-medium">{{u.lastname}}</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap">
                                        <button @click="deleteUser(u.userId)" type="submit" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-1 w-16 bg-red-600 hover:bg-red-700 rounded-md">
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
</template>
<script>
import ProductService from '../service/ProductService.js';
import authHeader from '../service/AuthenHeader.js';
export default {
    data(){
        return {
            user: [],
            userId: null
        }
    },
    methods: {
        retrieveUser() {
            ProductService.get("/listuser", {
                headers: {
                Authorization: authHeader().Authorization
             },
            }).then(response => {
                this.user = response.data;
            })
        },
        deleteUser(userId) {
            alert("Do you want to delete this user?");
            ProductService.delete(`/user/delete/${userId}`, {
             headers: {
                Authorization: authHeader().Authorization,
             },
        }).then(response => {
                response.status === 200 ? alert("User was deleted!") : alert("Error")
                this.$router.go()
            }).catch(error => {
                console.log(error);
            })
      }
        
    },
    created() {
        this.retrieveUser();
    } 
};
</script> 