<template>
    <div class="font-sans">
        <div class="mt-8 text-center uppercase font-bold text-darkgray text-2xl">
            your profile
        </div>
        <!-- <div class="flex justify-around pt-3 ">
            <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-64 bg-pink hover:bg-pklight rounded-md">
                    see your profile
            </button>
        </div> -->
        <div class="flex justify-center mt-4">
            <div class=" w-2/4 rounded-md bg-darkgray shadow-lg p-2 ">
                <form  @submit.prevent="updateProfile(edited)" class="space-y-1 text-left p-2">
                        <div class="flex flex-row space-x-4">
                            <div class="flex flex-col w-1/2">
                                <label class="labelsign text-white">Firstname: </label>
                                <input v-model="firstname" type="text" class="inputsign" required>
                            </div>

                            <div class="flex flex-col w-1/2">
                                <label class="labelsign text-white">Lastname: </label>
                                <input v-model="lastname" type="text" class="inputsign" required>
                            </div> 
                        </div>

                        <div class="flex flex-row space-x-4 pt-2">
                            <div class="flex flex-col w-1/2"> 
                                <label class="labelsign text-white">Date of Birth: </label>
                                <input v-model="birth"  type="Date" class="inputsign" required>
                            </div>

                            <div class="flex flex-col w-1/2">
                                <label class="labelsign text-white">Gender:</label>
                                <div class="flex flex-row pt-2 space-x-2">
                                    <input v-model="gender" type="radio" id="Male" name="gender" value="Male" >
                                    <label for="Male" class="labelsign text-white">Male</label>
                                    <input v-model="gender" type="radio" id="Female" name="gender" value="Female" >
                                    <label for="Female" class="labelsign text-white">Female</label>
                                </div>
                            </div>
                        </div>

                    <div class="flex flex-row space-x-4 pt-2">
                        <div class="flex flex-col w-1/2">
                            <label class="labelsign text-white">Email: </label>
                            <input v-model="email" type="email" class="inputsign" required>
                        </div>

                        <div class="flex flex-col w-1/2">
                            <label class="labelsign text-white">Telephone: </label>
                            <input v-model="tel" type="text" class="inputsign" required>
                        </div>
                    </div>

                    <div class="flex flex-row space-x-4 pt-2">
                        <div class="flex flex-col w-1/2">
                            <label class="labelsign text-white">Username: </label>
                            <input v-model="username" type="text" class="inputsign" required>
                        </div>

                        <div class="flex flex-col w-1/2">
                            <label class="labelsign text-white">Password: </label>
                            <input v-model="password" type="password" class="inputsign" required>
                        </div>
                    </div>
                    <!-- <div class="flex flex-col">
                        <label class="labelsign">Confirm Password: </label>
                        <input v-model="passwordConfirm" type="password" class="inputsign" required>
                    </div> -->
                    <div class="flex justify-around pt-3 ">
                        <button @click="clickEdit" v-if="editBtn" type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-64 bg-pink hover:bg-pklight rounded-md">
                            <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                            ></span>
                            edit
                        </button>
                    </div>
                    <div v-if="openConfirm" class="flex justify-around pt-3 ">
                        <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-64 bg-green-600 hover:bg-green-500 rounded-md" :disabled="loading">
                            <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                            ></span>
                            save
                        </button>
                        <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-64 bg-red-600 hover:bg-red-500 rounded-md" :disabled="loading">
                            <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                            ></span>
                            cancle
                        </button>
                    </div>
                </form>
                    <!-- <div
                        v-if="message"
                        class="alert"
                        :class="successful ? 'alert-success' : 'alert-danger'"
                     >
                        {{ message }}
                    </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import ProductService from '../service/ProductService';
import AuthenHeader from '../service/AuthenHeader.js'
export default {
    data(){
        return {
            openConfirm: false,
            openProfile: false,
            editBtn: true,
            user: [],
            firstname: "",
            lastname: "",
            birth: null,
            gender: "",
            email: "",
            tel: "",
            username: "",
            password: "",
            invalidFirstname: false,
            invalidLastname: false,
            invalidBirth: false,
            invalidGender: false,
            invalidEmail: false,
            invalidTel: false,
            invalidUsername: false,
            invalidPassword: false,
            userId: this.id,
            edited: null
        }
    },
    methods: {
        clickEdit(){
            this.openConfirm = true;
            this.editBtn = false;
        },
        retrieveUser(userId) {
            ProductService.get("/user/"+userId, {
                headers: AuthenHeader()
            })
                .then(response => {
                this.user = response.data;
                console.log(response)
            })
        },
        // clickProfile(userId){
        // this.openProfile = true;
        //     this.pageprofile = [];
        //     var pro = [];
        //         ProductService.get("/user/"+userId)
        //         .then(res => {
        //         pro = res.data;
        //     this.pageprofile.push(pro);
        //     });    
        // },
        profileForm(){
            this.invalidFirstname = this.firstname === "" ? true:false;
            this.invalidLastname = this.lastname === "" ? true:false;
            this.invalidBirth = this.birth === "" ? true:false;
            this.invalidGender = this.gender === "" ? true:false;
            this.invalidEmail = this.email === "" ? true:false;
            this.invalidTel = this.tel === "" ? true:false;
            this.invalidUsername = this.username === "" ? true:false;
            this.invalidPassword = this.password === "" ? true:false;
            if(this.invalidFirstname || this.invalidLastname || 
                this.invalidBirth || this.invalidGender || 
                this.invalidEmail || this.invalidTel ||
                this.invalidUsername || this.invalidPassword)
            {
                return;
            }
            this.updateProfile();
        },
        updateProfile(edit){
            const formData = new FormData();
            const uId = edit.userId;
            let isEdit = {
                userId: uId,
                firstname: this.firstname,
                lastname: this.lastname,
                birth: this.birth,
                gender: this.gender,
                email: this.email,
                tel: this.tel,
                username: this.username,
                password: this.password
            }
            const userData = JSON.stringify(isEdit);
            const blob = new Blob([userData], {
                type: 'application/json'
            });
            
            formData.append('newUser', blob);
            ProductService.put("/edit/"+ uId, formData, {
                // headers: {
                //     'Conten-Type' : 'multipart/form-data'
                // }
                headers: AuthenHeader()
            }).then(response => {
                response.status === 200 ? alert("Edit") : alert("Error")
            })
        },
        editProfile(user){
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.birth = user.birth;
            this.gender = user.gender;
            this.email = user.email;
            this.tel = user.tel;
            this.username = user.username;
            this.password = user.password;
            this.edited = user;
        }

    },
    created() {
    this.retrieveUser(); 
    },

}
</script>