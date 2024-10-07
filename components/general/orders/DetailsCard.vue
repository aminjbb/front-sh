<template>
<div class="details-order-card d-flex align-center justify-space-between">
    <a class="details-order-card__image" :href="`/sku/${content?.shps?.sku?.slug}`">
        <img :src="content?.shps?.sku?.image_url" :title="content?.shps?.sku?.label" :alt="content?.shps?.sku?.label" width="65" height="65" />
        <span class="number-font bold t10 w700 text-primary d-flex align-center justify-center">{{ content?.count }}</span>
    </a>

    <div class="flex-grow-1">
        <div class="d-flex align-center justify-space-between">
            <h2 class="t12 fw500 number-font text-sGrayDarken1">{{ content?.shps?.sku?.label }}</h2>

            <div v-if="content.discount === 0" class="t14 w700 number-font bold text-sGray d-flex justify-end align-center">
                {{ splitChar(Number(String(content?.discount).slice(0, -1)))}}
                <svgToman />
            </div>

            <div v-else class="d-flex flex-column">
                <div class="t14 fw700 number-font text-sGrayDarken2 d-flex align-center">
                    {{ splitChar(Number(String(content?.site_price).slice(0, -1)))}}
                    <svgToman />
                </div>
                <div class="t11 fw500 number-font text-sGray">
                    {{ splitChar(Number(String(content?.customer_price).slice(0, -1)))}}
                </div>
            </div>
        </div>

        <div class="d-flex align-center details-order-card__info" :class=" screenType === 'desktop' ? 'mb-5' : 'mb-1'">
            <div v-if="content.id" class="d-flex align-center">
                <v-icon icon="mdi-account-box-outline" color="sGrayLighten2" size="x-small" class="ml-1"></v-icon>
                <span class="text-sGrayLighten2 t12 w500 number-font">شناسه: {{ content.id }}</span>
            </div>
            <div v-if="content?.skps?.sku?.color.label" class="d-flex align-center">
                <span class="color-code" :style="{ backgroundColor: content?.skps?.sku?.color?.color}"></span>
                <span class="text-sGrayLighten2 t12 w500 number-font">رنگ: {{ content?.skps?.sku?.color.label }}</span>
            </div>
            <div v-if="content?.skps?.sku?.seller" class="d-flex align-center">
                <v-icon icon="mdi-truck-fast-outline" color="sGrayLighten2" size="x-small" class="ml-1"></v-icon>
                <span class="text-sGrayLighten2 t12 w500">فروشنده: {{ content?.skps?.sku?.seller?.shopping_name }}</span>
            </div>
            <div v-if="content?.skps?.sku?.brand" class="d-flex align-center">
                <v-icon icon="mdi-truck-fast-outline" color="sGrayLighten2" size="x-small" class="ml-1"></v-icon>
                <span class="text-sGrayLighten2 t12 w500">فروشنده: {{ content?.skps?.sku?.brand?.label }}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        content: Object
    }
}
</script>

<style lang="scss">
.details-order-card{
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
                margin-bottom: 10px;
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
}

</style>
