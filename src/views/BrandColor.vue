<template>
    <div class="flex flex-col font-sans">
        <div class="mt-4 text-center uppercase font-bold text-black text-2xl">
            brand & color management
        </div>
        <div class="flex flex-row justify-around space-x-8 my-4">
            <div class="flex flex-col pl-4">
                <div class="text-center uppercase font-bold text-black text-xl">
                    brand
                </div>
                <div class="border border-gray-50 rounded-md shadow-lg p-2 mt-2">
                    <div class="mt-4 space-x-3">
                        <input type="text" placeholder="Enter name brand!" class="border-2 border-pink focus:outline-none focus:ring-1 focus:ring-pink text-base font-sans px-3 py-2 rounded-md" required>
                        <button type="submit" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-2 w-16 bg-black hover:text-pink rounded-md">
                            add
                        </button>
                    </div>
                    <div class="mt-4 pb-2 text-darkgray flex justify-center">
                        <table class="border-collapse border border-darkgray table-fixed w-3/4 text-lg">
                            <thead>
                                <tr class="border border-r border-darkgray h-12 text-xl">
                                    <th class="uppercase w-1/5">id</th>
                                    <th class="uppercase w-1/3">brand</th>
                                    <th class="uppercase w-1/3">management</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="h-10">
                                    <td class="border-b border-darkgray">1</td>
                                    <td class="border-b border-darkgray">apple</td>
                                    <td class="border-b border-darkgray space-x-4">
                                        <button type="submit" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-1 w-16 bg-yellow-400 hover:bg-yellow-500 rounded-md">
                                            edit
                                        </button>
                                        <button type="submit" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-1 w-16 bg-red-600 hover:bg-red-700 rounded-md">
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="flex flex-col pr-4">
                <div class="text-center uppercase font-bold text-black text-xl">
                     color
                </div>
                <div class="border border-gray-50 rounded-md shadow-lg p-2 mt-2">
                    <div class="mt-4 space-x-3">
                        <input type="text" placeholder="Enter hax color code!" class="border-2 border-pink focus:outline-none focus:ring-1 focus:ring-pink text-base font-sans px-3 py-2 rounded-md" required>
                        <button type="submit" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-2 w-16 bg-black hover:text-pink rounded-md">
                            add
                        </button>
                    </div>
                    <div class="mt-4 pb-2 text-darkgray flex justify-center">
                        <table class="border-collapse border border-darkgray table-fixed w-3/4 text-lg">
                            <thead>
                                <tr class="border border-r border-darkgray h-12 text-xl">
                                    <th class="uppercase w-1/5">id</th>
                                    <th class="uppercase w-1/3">hax code</th>
                                    <th class="uppercase w-1/3">management</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="h-10">
                                    <td class="border-b border-darkgray">1</td>
                                    <td class="border-b border-darkgray">apple</td>
                                    <td class="border-b border-darkgray space-x-4">
                                        <button type="submit" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-1 w-16 bg-yellow-400 hover:bg-yellow-500 rounded-md">
                                            edit
                                        </button>
                                        <button type="submit" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-1 w-16 bg-red-600 hover:bg-red-700 rounded-md">
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>