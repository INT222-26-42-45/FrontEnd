<template>
    <div class="font-sans w-full text-black md:overflow-hidden">
        <div>
            <img class="inset-x-0 object-cover w-full h-64" alt="group1" src="../assets/admin2.png">
        </div>
        <div class="lg:flex lg:flex-row sm:flex sm:flex-col flex justify-center my-10">
            <div class="lg:flex lg:flex-row lg:justify-around lg:space-x-6 sm:flex sm:flex-col md:flex md:flex-row md:justify-center md:space-x-6">
                <router-link to="/user">
                    <button class="bg-black hover:text-pink py-3 px-3 w-48 rounded-md text-white text-xl font-bold uppercase">
                    users
                    </button>
                </router-link>
                <router-link to="/brand-color">
                    <button class="bg-black hover:text-pink py-3 px-3 w-48 rounded-md text-white text-xl font-bold uppercase">
                    brands/colors
                    </button>
                </router-link>
            </div>
        </div>
        <div>
            <img class="inset-x-0 object-cover w-full h-64" alt="group1" src="../assets/admin1.png">
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