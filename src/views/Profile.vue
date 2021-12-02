<template>
    <div class="font-sans">
        <div class="mt-4 text-center uppercase font-bold text-darkgray text-2xl">
            your profile
        </div>
        <div class="flex justify-center text-left my-4">
            <div class="lg:w-2/4 rounded-md bg-darkgray shadow-lg p-2 ">
                        <div class="lg:flex lg:flex-row lg:space-x-4 md:flex md:flex-row md:space-x-4 sm:flex sm:flex-col">
                            <div class="flex flex-col lg:w-1/2">
                                <label class="labelsign text-white">Firstname: </label>
                                <input v-model="firstname" type="text" class="inputsign" required>
                            </div>

                            <div class="flex flex-col lg:w-1/2">
                                <label class="labelsign text-white">Lastname: </label>
                                <input v-model="lastname" type="text" class="inputsign" required>
                            </div> 
                        </div>

                        <div class="lg:flex lg:flex-row lg:space-x-4 md:flex md:flex-row md:space-x-4 sm:flex sm:flex-col lg:pt-2">
                            <div class="flex flex-col lg:w-1/2 md:w-1/2"> 
                                <label class="labelsign text-white">Date of Birth: </label>
                                <input v-model="birth"  type="Date" class="inputsign" required>
                            </div>

                            <div class="flex flex-col lg:w-1/2 md:w-1/2">
                                <label class="labelsign text-white">Gender:</label>
                                <div class="flex flex-row pt-2 space-x-2">
                                    <input v-model="gender" type="radio" id="Male" name="gender" value="Male" >
                                    <label for="Male" class="labelsign text-white">Male</label>
                                    <input v-model="gender" type="radio" id="Female" name="gender" value="Female" >
                                    <label for="Female" class="labelsign text-white">Female</label>
                                </div>
                            </div>
                        </div>

                    <div class="lg:flex lg:flex-row lg:space-x-4 md:flex md:flex-row md:space-x-4 sm:flex sm:flex-col lg:pt-2">
                        <div class="flex flex-col lg:w-1/2">
                            <label class="labelsign text-white">Email: </label>
                            <input v-model="email"  type="email" class="inputsign" required>
                        </div>

                        <div class="flex flex-col lg:w-1/2">
                            <label class="labelsign text-white">Telephone: </label>
                            <input v-model="tel" type="text" class="inputsign" required>
                        </div>
                    </div>
                    
                    <div class="flex justify-around pt-3 ">
                        <button @click="updateProfile(userId)"  type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-64 bg-pink hover:bg-pklight rounded-md">
                            <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                            ></span>
                            edit
                        </button>
                    </div> 
                    <div
                        v-if="message"
                        class="alert"
                        :class="successful ? 'alert-success' : 'alert-danger'"
                     >
                        {{ message }}
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductService from '../service/ProductService';
import authHeader from '../service/AuthenHeader.js'
export default {
    data(){
        return {
            user: [],
            firstname: "",
            lastname: "",
            birth: null,
            gender: "",
            email: "",
            tel: "",
            username: "",
            password: "",
            userId: null,
            edited: null
        }
    },
    methods: {
        retrieveUser() {
            ProductService.get(`/user`, {
                headers: {
                Authorization: authHeader().Authorization,
             },
            }).then(response => {
                for(let i in response.data){
                    this.userId = response.data[i].userId,
                    this.firstname = response.data[i].firstname,
                    this.lastname = response.data[i].lastname,
                    this.birth = response.data[i].birth,
                    this.gender = response.data[i].gender,
                    this.email = response.data[i].email,
                    this.tel = response.data[i].tel
                }
                // console.log(response)
            })
        },
        updateProfile(userId){
            const formData = new FormData();
            let edit = {
                userId: this.userId,
                firstname: this.firstname,
                lastname: this.lastname,
                birth: this.birth,
                gender: this.gender,
                email: this.email,
                tel: this.tel
            }
            const userData = JSON.stringify(edit);
            console.log(userData);
            const blob = new Blob([userData], {
                type: 'application/json'
            });
            
            formData.append('newUser', blob);
            console.log(formData);
            ProductService.put(`user/edit/${userId}`, formData, {
                headers: {
                    Authorization: authHeader().Authorization,
                    'Content-Type' : 'multipart/form-data'
                },
            }).then(response => {
                response.status === 200 ? alert("Already edited!") : alert("Error")
                this.$router.go()
            })
        },
    },
    created() {
    this.retrieveUser(); 
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.users;
        },
    },
}
</script>