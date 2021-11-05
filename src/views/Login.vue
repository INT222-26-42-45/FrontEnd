<template>
    <div class="flex flex-row">
        <div class="w-3/5">
           <img class="w-auto h-5/6 mt-10" src="../assets/Login.png" />
        </div>

        <div class="w-2/5 mt-44">
            <div class="relative border bg-white bg-opacity-30 rounded-lg w-2/3 h-72">
                <p class="uppercase font-sans text-center text-xl font-bold mt-4">sign in</p>
                <form  @submit.prevent="signIn(username,password)" class="space-y-4 mt-6 mb-6">
                    <input v-model="username" type="text"  class="border-2 border-gray-400 px-3 py-2 w-72" placeholder="USERNAME" required>
                    <input v-model="password" type="password"  class="border-2 border-gray-400 px-3 py-2 w-72" placeholder="PASSWORD" required>
                    <!-- <div>
                        <label for="username">Username</label>
                        <input name="username" type="text" class="border-2 border-gray-400 px-3 py-2 w-72" placeholder="USERNAME" required />
                    </div>
                    <div>
                    <label for="password">Password</label>
                    <input name="password" type="password" class="border-2 border-gray-400 px-3 py-2 w-72" placeholder="PASSWORD" required />
                    </div> -->
                    <div>
                    <button type="submit" class="font-sans text-lg font-medium uppercase bottom-0 text-center text-white py-2 w-72 bg-black hover:bg-pink" :disabled="loading">
                        <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Login</span>
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