<template>
    <div class="flex flex-col font-sans">
        <div class="mt-8 text-center uppercase font-bold text-black text-2xl">
            account management
        </div>
        <div class="flex justify-center mt-4 text-darkgray">
            <table class="border-collapse border border-darkgray table-fixed w-3/4 text-lg shadow-lg">
                <thead>
                    <tr class="border border-r border-darkgray h-12 text-xl">
                        <th class="uppercase w-1/5">id</th>
                        <th class="uppercase w-1/3">username</th>
                        <th class="uppercase w-1/2">firstname</th>
                        <th class="uppercase w-1/2">lastname</th>
                        <th class="uppercase w-1/3">gender</th>
                        <th class="uppercase w-1/2">management</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="h-10">
                        <td class="border-b border-darkgray">1</td>
                        <td class="border-b border-darkgray">apple</td>
                        <td class="border-b border-darkgray">niraphon</td>
                        <td class="border-b border-darkgray">jongkraijak</td>
                        <td class="border-b border-darkgray">female</td>
                        <td class="border-b border-darkgray space-x-4">
                            <button type="submit" class="font-sans text-base font-medium uppercase bottom-0 text-center text-white py-1 w-16 bg-red-600 hover:bg-red-700 rounded-md">
                                delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>