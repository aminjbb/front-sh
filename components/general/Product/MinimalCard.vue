<template>
<a class="minimal-product-card py-2 pr-5 pl-5 d-block" :href="`/sku/${content.slug}`">
    <div class="minimal-product-card__inner d-flex">
        <div class="minimal-product-card__image">
            <img :src="content?.image?.image_url" :title="content.label" :alt="content.label" width="70" height="70" />
        </div>

        <h3 v-if="content.label" class="t13 w500 text-grey minimal-product-card__title">
            {{content.label}}
        </h3>
    </div>
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
}
</script>

<style scoped>
@import '~/assets/scss/components/general/minimal-product-card.scss';
</style>
