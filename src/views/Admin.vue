<template>
    <div class="font-sans w-full text-black md:overflow-hidden">
        <div class="lg:flex lg:flex-row sm:flex sm:flex-col flex justify-center mt-10 lg:space-x-12">
            <div class="flex flex-col space-y-2 mb-4">
                <router-link to="/user">
                    <button class="bg-black hover:text-pink py-3 px-3 w-48 rounded-md text-white text-xl font-bold uppercase">
                    users
                    </button>
                </router-link>
                <router-link to="/brand-color" >
                    <button class="bg-black hover:text-pink py-3 px-3 w-48 rounded-md text-white text-xl font-bold uppercase">
                    brands/colors
                    </button>
                </router-link>
            </div>
            <div class="lg:w-2/4 md:w-2/4 rounded-md bg-darkgray shadow-lg p-2 ">
                    <div class=" text-center uppercase font-bold text-white text-2xl">
                        your profile
                    </div>
                    <form class="space-y-1 text-left p-2 mt-3">
                     <div v-if="!successful">
                        <div class="lg:flex lg:flex-row justify-around sm:flex-col lg:space-x-4">
                            <div class="flex flex-col lg:w-1/2 sm:w-full md:w-full">
                                <label class="labelsign text-white">Firstname: </label>
                                <input v-model="firstname" type="text" class="inputsign" required>
                            </div>

                            <div class="flex flex-col lg:w-1/2 sm:w-full md:w-full">
                                <label class="labelsign text-white">Lastname: </label>
                                <input v-model="lastname" type="text" class="inputsign" required>
                            </div> 
                        </div>

                        <div class="lg:flex lg:flex-row justify-around sm:flex-col lg:space-x-4">
                            <div class="flex flex-col lg:w-1/2 sm:w-full md:w-full"> 
                                <label class="labelsign text-white">Date of Birth: </label>
                                <input v-model="birth"  type="Date" class="inputsign" required>
                            </div>

                            <div class="flex flex-col lg:w-1/2 sm:w-full md:w-full">
                                <label class="labelsign text-white">Gender:</label>
                                <div class="flex flex-row pt-2 space-x-2">
                                    <input v-model="gender" type="radio" id="Male" name="gender" value="Male" >
                                    <label for="Male" class="labelsign text-white">Male</label>
                                    <input v-model="gender" type="radio" id="Female" name="gender" value="Female" >
                                    <label for="Female" class="labelsign text-white">Female</label>
                                </div>
                            </div>
                        </div>

                    <div class="lg:flex lg:flex-row justify-around sm:flex-col lg:space-x-4">
                        <div class="flex flex-col lg:w-1/2 sm:w-full md:w-full">
                            <label class="labelsign text-white">Email: </label>
                            <input v-model="email" type="email" class="inputsign" required>
                        </div>

                        <div class="flex flex-col lg:w-1/2 sm:w-full md:w-full">
                            <label class="labelsign text-white">Telephone: </label>
                            <input v-model="tel" type="text" class="inputsign" required>
                        </div>
                    </div>

                    <div class="flex flex-row pt-2">
                        <div class="flex flex-col w-full">
                            <label class="labelsign text-white">Username: </label>
                            <input v-model="username" type="text" class="inputsign" required>
                        </div>
                      
                    </div>
                    <div class="lg:flex lg:flex-row justify-around sm:flex-col lg:space-x-4">
                        <div class="flex flex-col lg:w-1/2 sm:w-full md:w-full">
                            <label class="labelsign text-white">Current Password: </label>
                            <input v-model="password" type="password" class="inputsign" required>
                        </div>

                        <div class="flex flex-col lg:w-1/2 sm:w-full md:w-full">
                            <label class="labelsign text-white">New Password: </label>
                            <input v-model="password" type="password" class="inputsign" required>
                        </div>
                    </div>
                    <div class="flex justify-around pt-3 ">
                        <button @click="clickEdit" v-if="editBtn" type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-64 bg-pink hover:bg-pklight rounded-md">
                            <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                            ></span>
                            edit
                        </button>
                    </div>
                    <div v-if="openConfirm" class="flex justify-around space-x-2 pt-3">
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

                    </div>
                </form>
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
export default {
    data(){
        return {
            openConfirm: false,
            editBtn: true,
        }
    },
    methods: {
        clickEdit(){
            this.openConfirm = true;
            this.editBtn = false;
        }
    }
}
</script>