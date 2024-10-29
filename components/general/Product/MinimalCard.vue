<template>
<a class="minimal-product-card py-2 pr-5 pl-5 d-block" :href="`/sku/${content.slug}`" @click="enhanceEcommerce()">
    <div class="minimal-product-card__inner d-flex">
        <div v-if="content?.image?.image_url" class="minimal-product-card__image">
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

        /**
         * Product index in list
         */
         index: String | Number,

         /**
         * Section name
         */
        sectionName: String,
    },

    methods:{
        enhanceEcommerce(){
            window.dataLayer = window.dataLayer || [];
            const selectItem = {
              items: [{		// an array where all currently viewed products must be included
                item_id: this.content?.id,	// insert an actual product ID
                price: Number(String(this.content?.site_price).slice(0, -1)),	// insert an actual product price. Number or a string. Don't include currency code
                section_name: this.sectionName, // insert the name of the list where the product is currently displayed
                index: this.index 		// insert product's position in that list
              }]
            }
            window.dataLayer.push({
                event: 'select_item',  	// name of the event. In this case, it always must be select_item
                ecommerce: selectItem
            });
          window.zebline.event.track('select_item' , selectItem)
        }
    }
}
</script>

<style scoped>
@import '~/assets/scss/components/general/minimal-product-card.scss';
</style>
