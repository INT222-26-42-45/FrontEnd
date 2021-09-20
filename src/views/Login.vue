<template>
    <div class="flex flex-row">
        <div class="w-3/5">
           <img class="w-auto h-5/6 mt-10" src="../assets/Login.png" />
        </div>

        <div class="w-2/5 mt-44">
            <div class="relative border bg-white bg-opacity-30 rounded-lg w-2/3 h-72">
                <p class="uppercase font-sans text-center text-xl font-bold mt-4">sign in</p>
                <form  @submit="signin" class="space-y-4 mt-6 mb-6">
                    <input type="email" v-model="email" class="border-2 border-gray-400 px-3 py-2 w-72" placeholder="EMAIL" required>
                    <input type="password" v-model="password" class="border-2 border-gray-400 px-3 py-2 w-72" placeholder="PASSWORD" required>
                    <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-72 bg-black hover:bg-pink">
                        Continue
                        <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </button>
                    <div class="absolute bottom-4 right-6 flex flex-row space-x-1 labelsign">
                        <p >or</p>
                        <p class="underline hover:text-pink"><router-link to="/register">Sign Up</router-link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  props: ["baseURL"],
  data() {
      return {
          email: null,
          password: null,
          loading: null
      }
  },
  methods: {
      async signin(l) {
          l.preventDefault();
          this.loading = true;

          const user = {
              email: this.email,
              password: this.password
          }

          await axios({
              method: 'post',
              url: this.baseURL + "user/signIn",
              data: JSON.stringify(user),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then(res => {
              localStorage.setItem('token', res.data.token);
              this.$emit("refreshNav");
              this.$router.back();
          })
          .catch(err => {
              this.$swal({
                  text: "Unable to Log in!",
                  icon: "error",
                  closeOnClickOutside: false,
              });
              console.log(err);
          })
          .finally(() => {
              this.loading = false;
          })
      }
  },
  mounted() {
      this.loading = false;
  }
}
</script>