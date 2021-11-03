<template>
    <div class="font-sans">
        <div class="mt-8 text-center uppercase font-bold text-darkgray text-2xl">
            your profile
        </div>
        <div class="flex justify-center mt-4">
            <div class="w-2/5 border border-gray-50 rounded-md shadow-lg p-2 ">
                <form  @submit.prevent="signUp(firstname,lastname,birth,gender,email,tel,username,password)" class="space-y-1 text-left p-4">
                     <div v-if="!successful">
                    <div class="flex flex-col">
                        <label class="labelsign">Firstname: </label>
                        <input v-model="firstname" type="text" class="inputsign" required>
                    </div>

                    <div class="flex flex-col">
                        <label class="labelsign">Lastname: </label>
                        <input v-model="lastname" type="text" class="inputsign" required>
                    </div> 

                    <div class="flex flex-col"> 
                        <label class="labelsign">Date of Birth: </label>
                        <input v-model="birth"  type="Date" class="inputsign" required>
                    </div>

                    <div class="flex flex-col">
                        <label class="labelsign">Gender:</label>
                        <div class="flex flex-row pt-2 space-x-2">
                            <input v-model="gender" type="radio" id="Male" name="gender" value="Male" >
                            <label for="Male" class="labelsign">Male</label>
                            <input v-model="gender" type="radio" id="Female" name="gender" value="Female" >
                            <label for="Female" class="labelsign">Female</label>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <label class="labelsign">Email: </label>
                        <input v-model="email" type="email" class="inputsign" required>
                    </div>

                    <div class="flex flex-col">
                        <label class="labelsign">Telephone: </label>
                        <input v-model="tel" type="text" class="inputsign" required>
                    </div>

                    <div class="flex flex-col">
                        <label class="labelsign">Change Username: </label>
                        <input v-model="username" type="text" class="inputsign" required>
                    </div>

                    <div class="flex flex-col">
                        <label class="labelsign">Change Password: </label>
                        <input v-model="password" type="password" class="inputsign" required>
                    </div>
                    <!-- <div class="flex flex-col">
                        <label class="labelsign">Confirm Password: </label>
                        <input v-model="passwordConfirm" type="password" class="inputsign" required>
                    </div> -->
                    <div class="flex justify-center pt-2 space-x-2">
                        <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-72 bg-green-600 hover:bg-green-500 rounded-md" :disabled="loading">
                            <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                            ></span>
                            save
                        </button>
                        <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-72 bg-red-600 hover:bg-red-500 rounded-md" :disabled="loading">
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


}
</script>