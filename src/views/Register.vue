<template>
    <div class="flex flex-row">
        <div class=" w-2/5 mt-8 ml-24">
            <div class="border bg-white bg-opacity-30 rounded-lg w-5/6 h-auto">
                <p class="uppercase font-sans text-center text-xl font-bold mt-4">register</p>
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
                        <label class="labelsign">Username: </label>
                        <input v-model="username" type="text" class="inputsign" required>
                    </div>

                    <div class="flex flex-col">
                        <label class="labelsign">Password: </label>
                        <input v-model="password" type="password" class="inputsign" required>
                    </div>
                    <!-- <div class="flex flex-col">
                        <label class="labelsign">Confirm Password: </label>
                        <input v-model="passwordConfirm" type="password" class="inputsign" required>
                    </div> -->
                    <div class="flex justify-center pt-2">
                        <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-72 bg-black hover:bg-pink" :disabled="loading">
                            <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                            ></span>
                            create account
                        </button>
                    </div>

                    <p class="labelsign text-center underline hover:text-pink"><router-link to="/">Sign In Here</router-link></p>
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

        <div class="w-3/5 mt-10">
           <img src="../assets/Register.png" />
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'Register',
//   props: ["baseURL"],
  data() {
      return {
        firstname: "",
        lastname: "",
        birth: null,
        gender: "",
        email: "",
        tel: "",
        username: "",
        password: "",
        successful: false,
        loading: false,
        message: ""
      }
  },
  computed: {
      loggedIn() {
          return this.$store.state.auth.status.loggedIn;
      },
  },
  mounted(){
      if (this.loggedIn) {
          this.$router.push('/');
      }
  },
  methods: {
      signUp(firstname,lastname,birth,gender,email,tel,username,password) {
          const users = {firstname:firstname,lastname:lastname,birth:birth,gender:gender,email:email,tel:tel,username:username,password:password}
          this.message = "";
          this.successful = false;
          this.loading = true;

          this.$store.dispatch("auth/register", users).then(
              (data) => {
                  this.message = data.message;
                  this.successful = true;
                  this.loading = false;
                  this.$router.push('/');
              },
              (error) => {
                  this.message = 
                  (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                  error.message ||
                  error.toString();
                  this.successful = false;
                  this.loading = false;
              }
          );
      },

  }
}
</script>