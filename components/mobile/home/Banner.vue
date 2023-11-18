<template lang="">
<div class="banner banner--mobile">
    <v-row>
        <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            :sm="col">
            <div class="banner__image mb-3">
                <img :src="imageAddress('main-slider.jpg')" :title="item.title" :alt="item.title" width="380" height="200" />
            </div>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    props: {
        items: null,
        col: {
            type: String,
            default: '6'
        }
    },

    methods: {
        //TODO: Should delete after add endpoint
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/should-delete/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/should-delete/' + path]
        }
    },
}
</script>

<style scoped>
@import '~/assets/scss/components/mobile/home/banner.scss';
</style>
