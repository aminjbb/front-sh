<template>
<div class="product-comments d-flex flex-column h-100">
    <v-row class="ma-0 flex-grow-1">
        <v-col
            cols="4"
            md="12"
            class="pa-0">
            <div v-if="content?.sku?.image && content?.sku.image.image_url" class="product-card__image mb-3 mt-4 d-flex justify-center align-center">
                <img :src=" content?.sku?.image?.image_url" :title="content.label" :alt="content.label" width="136" height="136" />
            </div>
        </v-col>

        <v-col
            cols="8"
            md="12"
            class="d-flex align-center pa-0">
            <h3 v-if="content?.sku?.label" class="t13 w500 text-grey mb-2">
                {{content?.sku?.label}}
            </h3>
        </v-col>
    </v-row>

    <v-btn
        :href="`/sku/${content?.sku?.page_slug}`"
        height="44"
        title="ثبت نظر"
        class="btn btn--cancel w-100 mt-5">
        ثبت نظر
    </v-btn>

</div>
</template>

<script>
export default {
    props: {
        /**
         * product object
         */
        content: Object
    },
}
</script>
