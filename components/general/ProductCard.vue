<template lang="">
<a class="product-card pa-2" :href="content.link">
    <div v-if="index" class="product-card__index">
        <span class="t16">#{{index}}</span>
    </div>

    <div class="product-card__image mb-3 mt-4">
        <img :src="imageAddress('products.jpg')" :title="content.title" :alt="content.title" width="90" height="90" />
    </div>

    <h3 v-if="content.title" class="t14 w500 text-grey product-card__title mb-2">
        {{content.title}}
    </h3>

    <div class="product-card__info d-flex align-center justify-space-between mb-2" :class="hideInfo ? 'hideInfo' : ''">
        <div class="product-card__info__send">
            <v-icon icon="mdi-truck-outline" color="deep-purple" />
            <span class="t12 text-grey">ارسال فوری</span>
        </div>

        <div class="product-card__info__rate">
            <span class="t12 text-grey">4.3</span>
            <v-icon icon="mdi-star" color="orange-lighten-2" />
        </div>
    </div>

    <div class="product-card__price-info mb-2">
        <template v-if="content.discount">
            <div class="d-flex align-center justify-space-between">
                <span class="product-card__price-info__discount t11 w500">{{content.discount}}</span>
                <span class="t19 w400 text-pink-darken-1 product-card__price-info__price product-card__price-info__price--new">
                    {{content.new_price}}
                    <span class="t12 w300 text-pink-darken-1 currency">{{content.currency}}</span>
                </span>
            </div>

            <span class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                <span>{{content.old_price}}</span>
                <span class="t10 w300 text-grey currency">{{content.currency}}</span>
            </span>
        </template>

        <template v-else>
            <span class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">{{content.price}}</span>
            <span class="t12 w300 text-grey-darken-2 currency">{{content.currency}}</span>
        </template>
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

        /**
         * Show index
         */
        index: String,

        /**
         * Hide card info
         */
        hideInfo: Boolean
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
@import '~/assets/scss/components/general/product-card.scss';
</style>
