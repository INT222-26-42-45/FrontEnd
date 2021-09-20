<template>
    <div class="flex flex-row">
        <div class=" w-2/5 mt-8 ml-24">
            <div class="border bg-white bg-opacity-30 rounded-lg w-5/6 h-auto">
                <p class="uppercase font-sans text-center text-xl font-bold mt-4">register</p>
                <form  @submit="signup" class="space-y-1 text-left p-4">
                    <div class="flex flex-col">
                        <label class="labelsign">Firstname: </label>
                        <input type="text" class="inputsign" required>
                    </div>
                    <div class="flex flex-col">
                        <label class="labelsign">Lastname: </label>
                        <input type="text" class="inputsign" required>
                    </div> 
                    <div class="flex flex-col">
                        <label class="labelsign">Email: </label>
                        <input type="email" class="inputsign" required>
                    </div>
                    <div class="flex flex-col">
                        <label class="labelsign">Telephone: </label>
                        <input type="text" class="inputsign" required>
                    </div>
                    <div class="flex flex-col"> 
                        <label class="labelsign">Date of Birth: </label>
                        <input  type="Date" class="inputsign" required>
                    </div>
                    <div class="flex flex-col">
                        <label class="labelsign">Gender:</label>
                        <div class="flex flex-row pt-2 space-x-2">
                            <input type="radio" id="Male" name="gender" value="M" >
                            <label for="Male" class="labelsign">Male</label>
                            <input type="radio" id="Female" name="gender" value="F" >
                            <label for="Female" class="labelsign">Female</label>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label class="labelsign">Username: </label>
                        <input type="text" class="inputsign" required>
                    </div>
                    <div class="flex flex-col">
                        <label class="labelsign">Password: </label>
                        <input type="password" class="inputsign" required>
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
export default {
  name: 'Register',
  components: {
    
  }
}
</script>