<template>
<a class="product-card--simple d-flex flex-column align-center justify-cneter" :href="href">
    <div v-if="image" class="product-card__image mb-3 mt-4">
        <img :src="image" :title="label" :alt="label" width="79" height="80" />
    </div>

    <h3 class="t13 w400 text-grey text-grey text-center mb-2">
        {{label}}
    </h3>
</a>
</template>

<script>
export default {
    props: {
        /**
         * Content image
         */
        image: String,

        /**
         * Content label
         */
        label: String,

        /**
         * Content href
         */
        href: String,
    },
}
</script>

<style>
.product-card--simple {
    border-left: 1px solid #eee;
    padding: 0 16px;
}
</style>
