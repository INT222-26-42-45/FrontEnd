<template>
    <div class="flex justify-center mt-4 ">
    <div>
    <input type="text" @input="box_search" v-model="boxsearch" placeholder="Enter sneaker's name!"
            class="p-2 bg-white rounded border-2 border-black">
    </div>
    <div>
      <button class="ml-1 p-2 rounded focus:outline-none bg-blue-300" @click="statusSearch">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-product",
  emits: ["status-search", "box-search"],
    data(){
      return{
        search: false,
        boxsearch: '',
        notFound: false
      }
    },

    methods: {
      statusSearch(){
        this.search = !this.search
        if(this.search){
          this.boxsearch= ''
        }
        this.$emit('status-search', this.search)
      },
      box_search(){
        let theText = this.boxsearch
        this.$emit('box-search', theText)
        theText = ''
      }
    }
}
</script>
