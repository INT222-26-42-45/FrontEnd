<template>
    <div class="text-darkgray text-xl font-bold uppercase px-5 lg:py-5 py-2 lg:w-1/6 mx-auto w-max">
        Your cart
    </div>

    <div class="lg:flex justify-center items-start my-3">
        <div>
            <div class="grid md:grid-cols-2 sm:grid-cols-1 text-left font-sans text-lg justify-items-center">
                <base-block>
                <div class="grid grid-cols-2">
                    <div class="box-content h-56 w-full bg-gray-200">
                        <img src="../assets/574-2.png" class="object-cover mt-10 w-full border-gray-200 lg:h-36  bg-gray-200" />
                    </div>
                    <div class="relative text-left pl-4">
                        <p>ProductName</p>
                        <p id="product-price" class="mb-0 font-weight-bold">ProductPrice</p>
                        <p id="product-quantity" class="mb-0">
                            Quantity :
                        </p>
                        <button class="absolute bottom-0 right-0 uppercae text-center font-bold text-white py-2 px-3 mx-2 rounded-md bg-red-600">
                            Delete
                        </button>
                    </div>
                </div>
                </base-block>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cart',
    props: ["baseURL"],
    data() {
        return {
            carts: null,
            token: null,
            lengt: 0,
            totalcost: 0,
            cartItem: [],
            Id: -1
        }
    },

}
</script>