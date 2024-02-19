<template>
<section v-if="content" class="product-card product-card--order">
    <v-row align="center">
        <v-col
            cols="12"
            md="9"
            class="d-flex align-center product-card__details">
            <div v-if="content.shps?.sku?.image_url && content.shps?.sku?.image_url" class="product-card__image ml-5">
                <img :src="content.shps?.sku?.image_url" :title="content.shps?.sku?.brand?.label" :alt="content.shps?.sku?.brand?.label" width="100" height="100" />
            </div>

            <div>
                <h3 v-if="content.shps" class="t14 w400 text-grey-darken-1 product-card__title mb-5">
                    {{content.shps?.sku?.label}}
                </h3>

                <div class="d-flex align-center t13 w400 text-grey mb-2">
                    <v-icon
                        icon="mdi-tag-outline"
                        color="grey-lighten-1"
                        class="ml-2" />
                    <span>
                        برند:
                        {{content.shps?.sku?.brand?.label}}
                    </span>
                </div>

                <div class="d-flex align-center t13 w400 text-grey mb-2">
                    <div class="color-pick ml-2">
                        <span :style="{ backgroundColor: content.shps?.sku?.color?.color }"></span>
                    </div>
                    <span>
                        رنگ:
                        {{content.shps?.sku?.color?.label}}
                    </span>
                </div>

                <div class="d-flex align-center t13 w400 text-grey mb-2">
                    <v-icon
                        icon="mdi-store-outline"
                        color="grey-lighten-1"
                        class="ml-2" />
                    <span>
                        فروشنده:
                        {{content.shps?.sku?.seller?.shopping_name}}
                    </span>
                </div>
            </div>
        </v-col>
        <v-col
            cols="12"
            md="3"
            class="d-flex product-card__price-info">
            <div v-if="!cancel" class="t13 w400 text-grey-darken-1 number-font mb-2">
                تعداد:
                <template v-if="count">{{count}}</template>
                <template v-else> {{content.count}}</template>
            </div>

            <div>
                <div v-if="cancel">
                    <div v-if="showCount && productCount" class="product-card__product-count mb-3">
                        <v-icon
                            icon="mdi-plus"
                            color="grey"
                            @click="increaseCount()" />
                        <span class="t16 w300 text-grey-darken-2 number-font">
                            {{productCount}}
                        </span>
                        <v-icon
                            icon="mdi-minus"
                            color="grey"
                            @click="decreaseCount()" />
                    </div>

                    <div v-if="showAllCount && content.count" class="product-card__product-count mb-3">
                        <v-icon icon="mdi-plus" color="grey" />
                        <span class="t16 w300 text-grey-darken-2 number-font">
                            {{content.count}}
                        </span>
                        <v-icon icon="mdi-minus" color="grey" />
                    </div>

                    <div v-if="content.site_price" class="d-flex align-center justify-space-between">
                        <span class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main number-font">
                            {{ splitChar(Number(String(content.site_price).slice(0, -1))) }}
                        </span>
                        <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
                    </div>
                </div>

                <div v-else>
                    <template v-if="content.discount">
                        <div v-if="content.site_price !== null" class="d-flex align-center justify-end">
                            <span class="t19 w400 text-pink-darken-1 product-card__price-info__price product-card__price-info__price--new  number-font">
                                {{ splitChar(Number(String(content.site_price).slice(0, -1))) }}
                                <span class="t12 w300 text-pink-darken-1 currency">تومان</span>
                            </span>
                        </div>

                        <span v-if="content.customer_price !== null" class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                            <span class="number-font">{{ splitChar(Number(String(content.customer_price).slice(0, -1))) }}</span>
                            <span class="t10 w300 text-grey currency">تومان</span>
                        </span>
                    </template>

                    <template v-else>
                        <div v-if="content.customer_price !== null" class="d-flex align-center justify-end">
                            <span class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main number-font">
                                {{ splitChar(Number(String(content.customer_price).slice(0, -1))) }}
                            </span>
                            <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
                        </div>
                    </template>
                </div>

                <div v-if="!hideButtons" class="d-flex align-center justify-end mt-4">
                    <v-btn
                        :href="`/sku/${slug}/#comments`"
                        height="36"
                        title="ثبت دیدگاه"
                        append-icon="mdi-comment-plus-outline"
                        class="btn btn--comment">
                        ثبت دیدگاه
                    </v-btn>
                </div>
            </div>
        </v-col>
    </v-row>

    <div v-if="content.count === 0" class="d-flex align-center mt-3">
        <v-icon
            icon="mdi-circle"
            class="ml-1"
            color="primary" />
        <span class="text-grey-darken-1 t13 w14">
            <span class="w500 text-grey-darken-3">کالا لغو شده است.</span>
        </span>
    </div>

    <div v-if="title" class="d-flex align-center mt-5">
        <v-icon
            icon="mdi-circle"
            class="ml-1"
            color="grey-darken-1" />
        <span class="text-grey-darken-1 t13 w14">
            <template v-if="orderStatus == 'canceling'">
                علت لغو کالا:
            </template>

            <template v-if="orderStatus == 'return'">
                علت مرجوعی:
            </template>

            <span class="w500 text-grey-darken-3">{{title}}</span>
        </span>
    </div>

    <div v-if="description" class="d-flex align-center mt-5">
        <v-icon
            icon="mdi-circle"
            class="ml-1"
            color="grey-darken-1" />

        <span class="text-grey-darken-1 t13 w14 number-font">
            توضیحات:
            {{description}}
        </span>
    </div>
</section>
</template>

<script>
import {
    splitChar
} from "~/utils/functions.js";

export default {
    data() {
        return {
            productCount: 1,
            slug : this.content.shps?.sku?.slug
        }
    },
    props: {
        /**
         * Content
         */
        content: Object,

        /**
         * If card use for cancel page active this prop
         */
        cancel: {
            type: Boolean,
            default: false,
        },

        /**
         * index of card
         */
        index: String,

        /**
         * show add count box
         */
        showCount: {
            type: Boolean,
            default: false,
        },

        /**
         * show all count box
         */
        showAllCount: {
            type: Boolean,
            default: false,
        },

        /**
         * Hide action buttons
         */
        hideButtons: {
            type: Boolean,
            default: false,
        },

        /**
         * Title of return or cancel product 
         * Under the box
         */
        title: String,

        /**
         * Description of return or cancel product 
         * Under the box
         */
        description: String,

        /**
         * Product count 
         * If isn't in 'Content'
         */
        count: String,

        /**
         * Order status
         * Should be 'canceling - return''
         */
        orderStatus: {
            type: String,
            default: 'canceling',
        }
    },

    methods: {
        splitChar,

        //TODO: Should delete after add endpoint
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/should-delete/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/should-delete/' + path]
        },

        increaseCount() {
            if (this.productCount < this.content.count) {
                this.productCount++;
            }
            let item = {
                count: this.productCount,
                item: this.content,
                id: this.content.id
            }
            this.$emit('productCount', item);
        },

        decreaseCount() {
            if (this.productCount > 1) {
                this.productCount--;
            }
            let item = {
                count: this.productCount,
                item: this.content,
                id: this.content.id
            }
            this.$emit('productCount', item);
        },
    },
}
</script>

<style lang="scss">
@import '~/assets/scss/components/general/product-card.scss';
@import "~/assets/scss/tools/bp";

$parent:'product-card';

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

        .btn--comment {
            border-radius: 4px;
            background: var(--pink-pink-lighten-5, #FBE9F3);
            height: 36px;

            .v-btn__content {
                font-size: 13px;
                font-variation-settings: "wght"500;
            }

            .v-btn__content,
            .v-icon {
                color: #757575;
            }
        }

        .btn--cancel {
            border-width: 1px !important;
            margin-left: 15px;

            .v-btn__content {
                font-size: 13px;
                font-variation-settings: "wght"500;
            }
        }

        .v-icon.mdi-circle {
            font-size: 5px;
        }
    }
}
</style>
