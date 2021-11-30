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
                        <th class="uppercase w-1/3">username</th>
                        <th class="uppercase w-1/2">firstname</th>
                        <th class="uppercase w-1/2">lastname</th>
                        <th class="uppercase w-1/3">gender</th>
                        <th class="uppercase w-1/2">management</th>
                    </tr>
                </thead>
                <tbody>
                        <tr class="h-10">
                            <td class="border-b border-darkgray">{{u.username}}</td>
                            <td class="border-b border-darkgray">{{u.firstname}}</td>
                            <td class="border-b border-darkgray">{{u.lastname}}</td>
                            <td class="border-b border-darkgray">{{u.gender}}</td>
                            <td class="border-b border-darkgray space-x-4">
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
                response.status === 200 ? alert("Delete User Success!") : alert("Error")
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