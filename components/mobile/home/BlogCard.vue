<template >

<a v-if="content" class="blog-card blog-card--mobile" :href="content.link ? content.link : '#'">

    <img :src="content.image?.image_url" :title="content.label" :alt="content.label" width="306" height="260" />
    <div class="blog-card__title">
        <h3 v-if="content.label" class="t16">{{content.label}}</h3>
    </div>
</a>
</template>

<script>
export default {
    props: {
        /**
         * Content
         */
        content: Object
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
@import '~/assets/scss/components/mobile/home/blog-card.scss';
</style>
