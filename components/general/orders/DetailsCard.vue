<template>
<div class="details-order-card d-flex align-center justify-space-between">
    <a class="details-order-card__image ml-2" :href="`/sku/${content?.shps?.sku?.slug}`">
        <img :src="content?.shps?.sku?.image_url" :title="content?.shps?.sku?.label" :alt="content?.shps?.sku?.label" width="65" height="65" />
        <span class="number-font fw700 t10 w700 text-primary d-flex align-center justify-center">{{ content?.count }}</span>
    </a>

        <div class="flex-grow-1">
            <div class="d-flex align-center justify-space-between mb-4">
                <h2 class="t12 fw500 number-font">{{ content?.shps?.sku?.label }}</h2>

                <div v-if="content.discount === 0" class="price t14 fw700 number-font text-sGrayDarken2 d-flex align-center">
                    {{ splitChar(Number(String(content?.customer_price).slice(0, -1)))}}
                    <svgToman />
                </div>

                <div v-else class="price d-flex flex-column">
                    <div class="t14 fw700 number-font text-sGrayDarken2 d-flex align-center">
                        {{ splitChar(Number(String(content?.site_price).slice(0, -1)))}}
                        <svgToman />
                    </div>
                    <div class="t11 fw500 number-font text-sGray old-price">
                        {{ splitChar(Number(String(content?.customer_price).slice(0, -1)))}}
                    </div>
                </div>
            </div>

            <div class="d-flex align-center details-order-card__info" :class=" screenType === 'desktop' ? 'mb-5' : 'mb-1'">
                <div v-if="content?.id" class="d-flex align-center">
                    <v-icon icon="mdi-clipboard-text-outline" color="sGrayLighten2" size="x-small" class="ml-1"></v-icon>
                    <span class="text-sGrayLighten2 t12 w500 number-font">شناسه: {{ content?.shps?.id }}</span>
                </div>
                <div v-if="content?.shps?.sku?.color?.label" class="d-flex align-center">
                    <span class="color-code" :style="{ backgroundColor: content?.shps?.sku?.color?.color}" :class="content?.shps?.sku?.color?.color === '#ffffff' || content?.shps?.sku?.color?.color === '#FF00FF00' ? 's-border' : ''"></span>
                    <span class="text-sGrayLighten2 t12 w500 number-font">رنگ: {{ content?.shps?.sku?.color.label }}</span>
                </div>
                <div v-if="content?.shps?.sku?.seller" class="d-flex align-center">
                    <v-icon icon="mdi-store" color="sGrayLighten2" size="x-small" class="ml-1"></v-icon>
                    <span class="text-sGrayLighten2 t12 w500">فروشنده: {{ content?.shps?.sku?.seller?.shopping_name }}</span>
                </div>
                <div v-if="content?.shps?.sku?.brand" class="d-flex align-center">
                    <v-icon icon="mdi-briefcase-outline" color="sGrayLighten2" size="x-small" class="ml-1"></v-icon>
                    <span class="text-sGrayLighten2 t12 w500">برند: {{ content?.shps?.sku?.brand?.label }}</span>
                </div>
            </div>
        </div>
</div>

    <template v-if="status === 'pre_progress' && content.count > 0">
        <div class="d-flex align-center w-100 justify-end">
            <v-btn class="s-btn s-btn--outline s-btn--outline-primary s-btn--bg-white" :width="screenType === 'desktop' ? '200' : '100%'" :href="`/user/order/${orderId}/sku/${content.id}/cancel`">
                <span class="text-primary t12 w700">لغو محصول</span>
            </v-btn>
        </div>
    </template>

    <template v-if="content.count === 0">
        <div class="d-flex align-center w-100 justify-end">
            <v-btn class="s-btn s-btn--outline s-btn--outline-disabled s-btn--no-bg" :width="screenType === 'desktop' ? '200' : '100%'">
                <span class="text-sGrayLighten5 t12 w700">لغو شده</span>
            </v-btn>
        </div>
    </template>
</template>

<script>
export default {
    props: {
        content: Object,
        orderId: null,
        status:null,
    },

    data() {
        return {
            screenType: 'desktop',
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.details-order-card{
    border-radius: 6px;
    background: #FFF;
    box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10);
    padding: 8px;

    &__info{
        > div:not(:last-child){
            position: relative;
            padding-left: 6px;
            margin-left: 6px;

            &::after{
                content: '';
                width: 1px;
                height: 12px;
                left: 0;
                top: 3px;
                background: #E8E8E8 !important;
                position: absolute;
            }
        }

        >div{
            @include gbp (0, 768) {
                margin-bottom: 5px;
            }
        }

        @include gbp (0, 768) {
           flex-wrap:wrap !important
        }

        .color-code{
            width: 10px;
            height: 10px;
            display: block;
            border-radius:50%;
            margin-left: 2px;
        }
    }

    h2{
        color: #656565;
    }

    &__image{
        width: 65px;
        height: 65px;
        flex: 0 0 65px;
        display: block;
        overflow: hidden;
        border-radius: var(--Space_12, 12px);
        border: 1px solid #F3F3F3;
        background: #FAFAFA;
        position: relative;
        margin-left: 6px;

        img{
            width: auto;
            height: 100%;
        }

        > span{
            position: absolute;
            border: 1px solid #F3F3F3;
            background: #FBE9F3;
            border-radius: 6px;
            bottom: 4px;
            right: 4px;
            width: 18px;
            height: 18px;
        }
    }

    .price {
        svg {
            margin-right: 2px;
        }

        path {
            fill: #3C3C3C;
        }
    }

    .old-price {
        text-decoration:line-through
    }
}

</style>
