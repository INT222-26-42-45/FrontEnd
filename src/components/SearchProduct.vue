<template>
     <div class="flex justify-center mt-4 space-x-2">
      <div>
        <input @keyup="searchProduct" v-show="search.click" v-model="boxSearch" placeholder="Enter sneaker's name!"
                class="p-2 py-2 w-80 bg-white rounded border-2 border-black">
        </div>
      <div>
        <button  @click="statusSearch" v-show="search.nClick">
          <span class="material-icons">search</span>
        </button>
        <button class="hover:bg-pink bg-black py-2 px-3 rounded-md text-white text-lg uppercase" v-show="search.click" @click="statusSearch">
          Cancel
        </button>
      </div>
    </div> 
</template>

<script>
export default {
  name: "search-product",
    data(){
      return{

      }
    },

    methods: {

    }
}
</script>
