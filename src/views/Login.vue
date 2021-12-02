<template>
    <div class="font-sans w-full text-black md:overflow-hidden lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col ">
        <div class="lg:w-3/5">
           <img class="lg:w-auto lg:h-5/6 lg:mt-10 sm:mt-6 sm:w-auto sm:h-2/6" src="../assets/Login.png" />
        </div>

        <div class="lg:w-2/5 lg:my-56 sm:mt-8 sm:flex sm:justify-center mb-4">
            <div class="relative border shadow-lg p-3 bg-white bg-opacity-30 rounded-lg lg:w-2/3 sm:w-96 h-72">
                <p class="uppercase font-sans text-center text-xl font-bold mt-4">sign in</p>
                <form  @submit.prevent="signIn(username,password)" class="sm:flex sm:flex-col sm:justify-center space-y-4 mt-6 mb-6">
                    <div>
                        <input v-model="username" type="text"  class="inputsign px-3 py-2 w-72 sm:w-full" placeholder="USERNAME" required>
                    </div>
                    <div>
                        <input v-model="password" type="password"  class="inputsign px-3 py-2 w-72 sm:w-full" placeholder="PASSWORD" required>
                    </div>
                    <div>
                        <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-72 sm:w-full bg-black hover:bg-pink" :disabled="loading">
                            <span
                                v-show="loading"
                                class="spinner-border spinner-border-sm"
                            ></span>
                            <span>Log in</span>
                        </button>
                    </div>

                    <div class="absolute bottom-4 right-6 flex flex-row space-x-1 labelsign">
                        <p >or</p>
                        <p class="underline hover:text-pink"><router-link to="/register">Sign Up</router-link></p>
                    </div>
                        <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
      return {
          username: "",
          password: "",
          loading: false,
          message: "",
      };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
      if (this.loggedIn) {
          this.$router.push('/home');
      }
  },
  methods: {
      signIn(username,password) {
          const users = {username:username,password:password}
          this.loading = true;
          this.$store.dispatch("auth/login", users).then(
              () => {
                  this.$router.push('/home');
              },
              (error) => {
                  this.loading = false;
                  this.message = 
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
              }
          );
      },
  },
};
</script>