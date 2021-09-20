<template>
    <div class="flex flex-row">
        <div class=" w-2/5 mt-8 ml-24">
            <div class="border bg-white bg-opacity-30 rounded-lg w-5/6 h-auto">
                <p class="uppercase font-sans text-center text-xl font-bold mt-4">register</p>
                <form  @submit="signup" class="space-y-1 text-left p-4">
                    <div class="flex flex-col">
                        <label class="labelsign">Firstname: </label>
                        <input v-model="firstname" type="text" class="inputsign" required>
                    </div>
                    <div class="flex flex-col">
                        <label class="labelsign">Lastname: </label>
                        <input v-model="lastname" type="text" class="inputsign" required>
                    </div> 
                    <div class="flex flex-col">
                        <label class="labelsign">Email: </label>
                        <input v-model="email" type="email" class="inputsign" required>
                    </div>
                    <div class="flex flex-col">
                        <label class="labelsign">Telephone: </label>
                        <input v-model="telephone" type="text" class="inputsign" required>
                    </div>
                    <div class="flex flex-col"> 
                        <label class="labelsign">Date of Birth: </label>
                        <input v-model="dob"  type="Date" class="inputsign" required>
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
                        <label class="labelsign">Username: </label>
                        <input v-model="username" type="text" class="inputsign" required>
                    </div>
                    <div class="flex flex-col">
                        <label class="labelsign">Password: </label>
                        <input v-model="password" type="password" class="inputsign" required>
                    </div>
                    <div class="flex flex-col">
                        <label class="labelsign">Confirm Password: </label>
                        <input v-model="passwordConfirm" type="password" class="inputsign" required>
                    </div>
                    <div class="flex justify-center pt-2">
                        <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-72 bg-black hover:bg-pink">
                            create account
                        </button>
                    </div>

                    <p class="labelsign text-center underline hover:text-pink"><router-link to="/">Sign In Here</router-link></p>
                </form>
            </div>
        </div>

        <div class="w-3/5 mt-10">
           <img src="../assets/Register.png" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Register',
  props: ["baseURL"],
  data() {
      return {
          firstname: null,
          lastname: null,
          email: null,
          telephone: null,
          dob: null,
          gender: null,
          username: null,
          password: null,
          passwordConfirm: null
      }
  },
  methods: {
      async signup(r) {
          r.preventDefault();
          if(this.password == this.passwordConfirm) {
              const user = {
                  firstname: this.firstname,
                  lastname: this.lastname,
                  email: this.email,
                  telephone: this.telephone,
                  dob: this.dob,
                  gender: this.gender,
                  username: this.username,
                  password: this.password
              }

              await axios({
                  method: 'post',
                  url: this.baseURL + "user/signUp",
                  data: JSON.stringify(user),
                  headers: {
                      'Content-Type': 'application'
                  }
              })
              .then(() => {
                this.$router.replace("/");
                this.$swal({
                    text: "User signup successful. Please Login",
                    icon: "success",
                    closeOnClickOutside: false,
                });
              })
              .catch(err => {
                  console.log(err);
              });
          } else {
              this.$swal({
                  text: "Error! Passwords are not matching",
                  icon: "error",
                  closeOnClickOutside: false,
              });
          }
      }
  }
}
</script>