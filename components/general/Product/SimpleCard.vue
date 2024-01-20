<template>
<a class="product-card--simple d-flex flex-column align-center justify-cneter" :href="content.link">
    <div v-if="content.image && content.image.image_url" class="product-card__image mb-3 mt-4">
        <img :src="/* content?.image?.image_url */imageAddress(content?.image?.image_url)" :title="content.label" :alt="content.label" width="79" height="80" />
    </div>

    <h3  class="t13 w400 text-grey text-grey text-center mb-2">
        {{content.shps?.sku?.label}}
    </h3>
</a>
</template>

<script>
export default {
    props: {
        /**
         * Content
         */
        content: Object,
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

<style>
.product-card--simple {
    border-left:1px solid #eee;
    padding: 0 16px;
}
</style>
