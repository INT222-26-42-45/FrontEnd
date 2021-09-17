<template>
    <div>
        <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center mb-4">
            <div class=" border-0 rounded-md shadow-lg flex flex-col lg:w-3/4 md:w-1/2 bg-white outline-none focus:outline-none">
                <div class="flex justify-end">
                    <button class="close text-black" type="button" @click="closeDetail" >X </button>
                </div>
                <div class="pt-2 flex justify-center md:justify-center">
                    <h3 class="text-2xl uppercase font-semibold text-black">product detail</h3>
                </div>
                <div class="flex flex-row justify-around mt-2 space-x-5 ">
                    <div class="w-3/5 space-y-1 pl-4 pt-2 pb-4">
                        <div class="border bg-gray-200 h-96 rounded-md">
                            <img class="mt-16" src="../assets/NMDR1-1.png" />
                        </div>
                    </div>

                    <div class="w-2/5 text-left pt-1 pl-6 space-y-2">
                        <p class="font-sans text-xl font-semibold text-black">productName</p>
                        <p class="text">productType</p>
                        <p class="text">productPrice</p>
                        <p class="text">productSize</p>
                        <p class="text">productColor</p>
                        <router-link to="/cart">
                            <button class="font-sans text-lg font-medium uppercase absolute bottom-16 text-center text-white py-2 px-24 rounded-md bg-black hover:bg-pink">add to cart</button>
                        </router-link>
                    </div>
                </div>
                <div>
                    <p class="text">productDescription</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "product-detail",
    emits: ["closed"],
    data(){
        return {
            pSize: "",
            pColor: null
        }
    },
    methods: {
        closeDetail(){
            this.$emit("closed", true);
        }
    }
}
</script>