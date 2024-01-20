<template lang="">
    <main class="v-product v-product--single">
        <h1 class="v-hide">{{title}}</h1>

        <v-container>
            <v-row>
                <v-col class="pa-3" cols="12" lg="5">
                    <generalProductImageGallery :items="contentMocket.images" :imageAlt="contentMocket.label"/>
                </v-col>
                <v-col class="pa-3" cols="12" lg="7">

                </v-col>
            </v-row>
        </v-container>
    </main>
</template>
<script>
export default {
    data() {
        return {
            content:null,
            contentMocket:{
                label:'پالت سایه چشم 32 رنگ رولوشن مدل Flawless 3 Resurrection',
                images:[
                    {
                        image_url:'product2.png',
                    },
                    {
                        image_url:'product2.png',
                    },
                    {
                        image_url:'products.jpg',
                    },
                    {
                        image_url:'product2.png',
                    },
                    {
                        image_url:'product2.png',
                    },
                    {
                        image_url:'product2.png',
                    },
                    {
                        image_url:'product2.png',
                    },
                ]
            }
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
