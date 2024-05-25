<template>
<component
    :is="tag"
    class="product-card--simple d-flex flex-column align-center"
    :href="href">
    <div v-if="tag==='div' && image" class="product-card__image mb-3 mt-4">
        <img :src="image" :title="label" :alt="label" width="79" height="80" />
    </div>

    <a v-else-if="tag==='a' && image" class="product-card__image mb-3 mt-4" :href="href">
        <img :src="image" :title="label" :alt="label" width="79" height="80" />
    </a>

    <h3 class="t13 w400 text-grey text-center mb-2">
        <a v-if="tag==='a'" class="t13 w400 text-grey">
            {{label}}
        </a>

        <template v-else>
            {{label}}
        </template>
    </h3>
</component>
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

        /**
         * Component main tag
         * If be a should ser href prop too
         */
        tag: {
            type: String,
            default: 'a',
        }
    },
}
</script>

<style lang="scss">
.product-card--simple {
    border-left: 1px solid #eee;
    padding: 0 16px;

    h3:hover{
        color:#333 !important
    }
}
</style>
