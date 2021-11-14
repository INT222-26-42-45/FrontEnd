<template>
    <div class="font-sans">
        <div class="flex justify-center mt-10 space-x-12">
            <div class=" w-2/4 rounded-md bg-darkgray shadow-lg p-2 ">
                    <div class=" text-center uppercase font-bold text-white text-2xl">
                        your profile
                    </div>
                    <form  @submit.prevent="signUp(firstname,lastname,birth,gender,email,tel,username,password)" class="space-y-1 text-left p-2 mt-3">
                     <div v-if="!successful">
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

                    <div class="flex flex-row pt-2">
                        <div class="flex flex-col w-72">
                            <label class="labelsign text-white">Username: </label>
                            <input v-model="username" type="text" class="inputsign" required>
                        </div>
                      
                    </div>
                    <div class="flex flex-row space-x-4 pt-2">
                        <div class="flex flex-col w-1/2">
                            <label class="labelsign text-white">Current Password: </label>
                            <input v-model="password" type="password" class="inputsign" required>
                        </div>

                        <div class="flex flex-col w-1/2">
                            <label class="labelsign text-white">New Password: </label>
                            <input v-model="password" type="password" class="inputsign" required>
                        </div>
                    </div>
                    <div class="flex justify-around pt-3 ">
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
            <div class="flex flex-col space-y-2 mt-4">
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
        </div>
    </div>
</template>