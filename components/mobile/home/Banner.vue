<template >
<div v-if="items && items.length" class="banner banner--mobile">
    <header v-if="title" class="text-right t20 text-grey-darken-1 py-4 w500">
        {{title}}
    </header>

    <v-row>
        <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            :sm="col">
            <div class="banner__image">
                <img :src="item.image?.image_url" :title="item.image_alt" :alt="item.image_alt"  width="380" height="200" />
            </div>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Item list
         */
        items: null,

        /**
         * Col number for show in desktop
         */
        col: {
            type: String,
            default: '6'
        },

        /**
         * Section title
         */
        title: String
    },
}
</script>

<style scoped>
@import '~/assets/scss/components/mobile/home/banner.scss';
</style>
