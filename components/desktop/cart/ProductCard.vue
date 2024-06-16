<template>
<section v-if="content" class="product-card product-card--order">
    <v-row align="center">
        <v-col
            v-if="content.site_price !== content.current_site_price || content.site_stock === 0"
            cols="12"
            class="d-flex align-center">
            <v-icon
                icon="mdi-alert-circle-outline"
                :color="content.site_price !== content.current_site_price ? 'deep-purple' :  content.site_stock === 0 ? 'danger' : 'grey'"
                class="ml-2" />
            <p :class="content.site_price !== content.current_site_price  ? 'text-deep-purple' : content.site_stock === 0 ? 'text-danger' : 'text-grey'" class="t12 w400 l-28">
                <template v-if="content.site_price !== content.current_site_price">
                    کالا تغییر قیمت داشته است.
                </template>
                <template v-else-if=" content.site_stock === 0 ">
                    کالا به اتمام رسیده است.
                    <br>
                    در صورت عدم حذف توسط شما، این کالا به صورت خودکار از سبد شما حذف میشود.
                </template>
            </p>
        </v-col>

        <v-col cols="9" class="d-flex align-center product-card__details">
            <div v-if="content.shps && content.shps?.sku?.image_url" class="product-card__image ml-5">
                <template v-if="noLazy">
                    <a :href="`/sku/${content.shps?.sku?.slug}`" class="d-block">
                        <img data-not-lazy :src="content.shps?.sku?.image_url" :title="content.label" :alt="content.label" width="100" height="100" />
                    </a>
                </template>
                <template v-else>
                    <a :href="`/sku/${content.shps?.sku?.slug}`" class="d-block">
                        <img :src="content.shps?.sku?.image_url" :title="content.label" :alt="content.label" width="100" height="100" />
                    </a>
                </template>
            </div>

            <div>
                <a v-if="content.shps?.sku" :href="`/sku/${content.shps?.sku?.slug}`" class="d-block">
                    <h3 class="t14 w400 text-grey-darken-1 product-card__title mb-5">
                        {{ content.shps?.sku?.label }}
                    </h3>
                </a>

                <div class="d-flex align-center t13 w400 text-grey mb-2">
                    <div class="color-pick ml-2">
                        <span :style="{ backgroundColor: content.shps?.sku?.color.value }"></span>
                    </div>
                    <span>
                        رنگ:
                        {{ content.shps?.sku?.color.label }}
                    </span>
                </div>

                <div v-if="!noSeller" class="d-flex align-center t13 w400 text-grey mb-2">
                    <v-icon
                        icon="mdi-store-outline"
                        color="grey-lighten-1"
                        class="ml-2" />
                    <span>
                        فروشگاه:
                        {{content.shps?.seller?.shopping_name}}
                    </span>
                </div>
            </div>
        </v-col>
        <v-col cols="3" class="d-flex product-card__price-info justify-end">
            <div>
                <div class="product-card__product-count mb-3">
                        <v-btn variant="plain" :loading="loadingAddBasket" class="pa-0 w-100">
                            <v-icon icon="mdi-plus" color="grey" size="small" @click="increaseCount()" class="mx-3"/>
                            <span class="t14 w300 text-grey-darken-2 number-font">
                                {{ count }}
                            </span>
                            <v-icon class="mx-3" :icon="count === 1 ? 'mdi-trash-can-outline' :'mdi-minus'" color="grey" size="small" @click="decreaseCount()" />
                        </v-btn>
                </div>

                <template v-if="content.count > 0 && content.site_stock > 0">
                    <template v-if="content.discount">
                        <div v-if="content.current_site_price" class="d-flex align-center justify-space-between">
                            <span class="t19 w400 text-pink-darken-1 product-card__price-info__price product-card__price-info__price--new  number-font">
                                {{ splitChar(Number(String(content.current_site_price).slice(0, -1))) }}
                                <span class="t12 w300 text-pink-darken-1 currency">تومان</span>
                            </span>
                        </div>

                        <span v-if="content.customer_price" class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                            <span class="number-font">{{ splitChar(Number(String(content.customer_price).slice(0, -1))) }}</span>
                            <span class="t10 w300 text-grey currency">تومان</span>
                        </span>
                    </template>

                    <template v-else>
                        <div v-if="content.current_site_price" class="d-flex align-center justify-end">
                            <span class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main number-font">
                                {{ splitChar(Number(String(content.current_site_price).slice(0, -1))) }}
                            </span>
                            <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
                        </div>
                    </template>
                </template>

                <template v-else>
                    <div class="d-flex align-center justify-center">
                        <span class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">
                            ناموجود
                        </span>
                    </div>
                </template>
            </div>
        </v-col>
    </v-row>

    <generalModalsDelete ref="deleteProduct" title="حذف کالا از سبد" text="آیا از حذف این کالا از سبد خرید اطمینان دارید؟ " submitText="حذف" @removeProduct="removeProductFromBasket"/>
</section>
</template>

<script>
import Basket from '@/composables/Basket.js'

export default {
    data() {
        return {
            reloadingPage: false,
        }
    },

    setup() {
      const randomNumberForBasket = useCookie('randomNumberForBasket')
      const userToken = useCookie('userToken');
        const {
            addToBasket,
            deleteShpsBasket,
            beforeAuthAddToBasket,
            count,
            loadingAddBasket
        } = new Basket()
        return {
            addToBasket,
            deleteShpsBasket,
            beforeAuthAddToBasket,
            randomNumberForBasket,
            userToken,
            count,
            loadingAddBasket
        }
    },
    
    props: {
        /**
         * Content
         */
        content: Object,

        /**
         * Product status
         */
        status: {
            type: String,
        },

        /**
         * hide seller
         */
        noSeller: Boolean,

        /**
         * hide seller
         */
        noLazy:Boolean
    },

    methods: {
        createRandomNumber(){
            let result = '';
            for(let i = 0; i < 20; i++) {
            result += Math.floor(Math.random() * 10); // generates a random integer between 0 and 9
            }
            return result
        },

        /**
         * Increase count of product
         */
         increaseCount() {
            if (this.userToken) {
                this.addToBasket(this.content ?.shps ?.id, this.count,'increase', true, this.content)
            } else {
                if (this.randomNumberForBasket && this.randomNumberForBasket != "") {
                    this.beforeAuthAddToBasket(this.content ?.shps ?.id, this.count, this.randomNumberForBasket,'increase', false, this.content)
                } else {
                    const randomNumber = this.createRandomNumber()
                    this.randomNumberForBasket = randomNumber
                    this.beforeAuthAddToBasket(this.content ?.shps ?.id, this.count, randomNumber,'increase',false, this.content)
                }
            }
        },

        /**
         * Decrease count of product
         */
         decreaseCount() {
            if (this.count > 1) {
                if (this.userToken) {
                    this.addToBasket(this.content ?.shps ?.id, this.count, 'decrease', true, this.content)
                } else {
                    if (this.randomNumberForBasket && this.randomNumberForBasket != "") {
                        this.beforeAuthAddToBasket(this.content ?.shps ?.id, this.count, this.randomNumberForBasket, 'decrease', false, this.content)
                    } else {
                        const randomNumber = this.createRandomNumber()
                        this.randomNumberForBasket = randomNumber
                        this.beforeAuthAddToBasket(this.content ?.shps ?.id, this.count, randomNumber, 'decrease',false, this.content)
                    }
                }
            } else {
                this.$refs.deleteProduct.dialog = true;
            }
        },

        /**
         * Remove product from basket
         */
        removeProductFromBasket(){
            this.deleteShpsBasket(this.content ?.shps ?.id, this.content)
            this.$refs.deleteProduct.dialog =false;
            this.$refs.deleteProduct.loading =false;
        },
    },

    mounted() {
        this.count = this.content ?.count;
    },

    watch: {
        content(newValue) {
            this.count = newValue.count
        },

        count(newVal,oldVal){
            this.reloadingPage = true
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/scss/components/general/product-card.scss';
@import "~/assets/scss/tools/bp";

$parent: 'product-card';

.#{$parent} {
    &--order {
        flex-direction: row;
        padding: 20px 0;
        border: 0 !important;
        display: block !important;

        .#{$parent} {
            &__price-info {
                flex-direction: column;
                align-items: flex-end;

                @include gbp(0, 992) {
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }

        .color-pick {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            padding: 2px;
            overflow: hidden;
            border: 1px solid #BDBDBD;

            span {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .v-icon.mdi-circle {
            font-size: 5px;
        }
    }
}
</style>
