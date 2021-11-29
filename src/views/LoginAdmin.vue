<template>
    <div class="flex justify-center my-4 font-sans text-black md:overflow-hidden">
            <div class="lg:divide-x-2 lg:divide-darkgray border shadow-lg bg-white pb-2 p-2 rounded-lg lg:w-2/3 h-auto 
                        lg:flex lg:flex-row sm:w-auto md:w-auto">
                <div class="w-3/5 mt-2">
                    <img class="lg:w-auto lg:h-5/6 lg:mt-4 sm:mt-2 sm:w-auto sm:h-2/6" src="../assets/Login.png" />
                </div>
                <div class="lg:pl-6 flex flex-col  justify-center">
                    <p class="uppercase font-sans text-center text-xl font-bold mt-8">admin sign in</p>
                    <form  @submit.prevent="signIn(username,password)" class="sm:flex sm:flex-col sm:justify-center md:flex md:flex-col md:justify-center space-y-4 mt-6 mb-6">
                        <div>
                            <input v-model="username" type="text"  class="inputsign px-3 py-2 w-72" placeholder="USERNAME" required>
                        </div>
                        <div>
                            <input v-model="password" type="password"  class="inputsign px-3 py-2 w-72" placeholder="PASSWORD" required>
                        </div>
                        <div>
                            <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-72 bg-black hover:bg-pink" :disabled="loading">
                                <span
                                    v-show="loading"
                                    class="spinner-border spinner-border-sm"
                                ></span>
                                <span>Log in</span>
                            </button>
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
  name: 'LoginAdmin',
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
          this.$router.push('/admin-management');
      }
  },
  methods: {
      signIn(username,password) {
          const users = {username:username,password:password}
          this.loading = true;
          this.$store.dispatch("auth/login", users).then(
              () => {
                  this.$router.push('/admin-management');
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