<template>
<div v-if="content" class="product-card" @click="enhanceEcommerce()">
    <div v-if="content.discount_percent" class="product-card__index">
        <span class="t16">%{{content.discount_percent}}</span>
    </div>

    <a v-if="content.image_url" class="product-card__image w-100 mb-3" :href=" shps ?`/sku/${content.slug}?shps=${shps}` :`/sku/${content.slug}`">
        <img :src="content?.image_url" :title="content.label" :alt="content.label" width="370" height="386" />
    </a>
    
    <h3 v-if="!hideLabel && content.label" class="w-100 text-center px-6 t16 w400 number-font px-6 text-sGray mt-4 mb-4">
        <a class="t16 w400 number-font text-sGray" :href="`/sku/${content.slug}`">
            {{content.label}}
        </a>
    </h3>

    <div class="product-card__price-info px-6 w-100" :class="content.discount ? 'mb-3' : 'mb-7'">
        <div class="d-flex flex-column align-center justify-center">
            <template v-if="content.discount">
                <div class="d-flex align-center">
                    <span v-if="content.site_price" class="t16 fw700 text-primary text-center number-font">
                        {{splitChar(Number(String(content.site_price).slice(0, -1)))}}
                        <svgToman/>
                    </span>
                </div>

                <span v-if="content.customer_price" class="t12 fw700 number-font text-sGray" style="text-decoration: line-through;">
                    {{ splitChar(Number(String(content.customer_price).slice(0, -1)))}}
                </span>
            </template>

            <template v-else>
                <div class="d-flex align-center without-discount">
                    <span class="t16 fw700 text-sGray text-center number-font">{{splitChar(Number(String(1450000).slice(0, -1)))}}</span>
                    <svgToman class="mr-1"/>
                </div>
            </template>
        </div>
    </div>

    <div class="px-6 pb-6 w-100">
        <v-btn
            :href="`/sku/${content.slug}`"
            height="56"
            block
            title="خرید"
            class="btn">
            <span class="t16 w600 text-sGrayDarken2">خرید</span>
        </v-btn>
    </div>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Content
         */
        content: Object,
        /**
         *  Product index in list
         */
        index: String | Number,
        /**
         * Show index
         */
         showIndex: Boolean,
        /**
         * Hide card info
         */
        hideInfo: Boolean,
        /**
         * Show buy function
         */
        functions: Boolean,
        /**
         * Active delete icon
         */
        deleteIcon: Boolean,
        /**
         * Show colors in card
         */
        showColors: Boolean,
        /**
         * Shps id for go to pdp
         */
        shps: String,

        /**
         * Section name
         */
        sectionName: String,

        /**
         * Category name
         */
         categoryName:{
            type: String,
            default: null
        },

        showBasket:Boolean
    },

    methods: {
        /**
         * Emit remove function
         * @param {*} status
         */
        removeProduct(content) {
            this.$emit('removeProduct', content);
        },

        enhanceEcommerce(){
            window.dataLayer = window.dataLayer || [];
            const selectItem = {
              items: [{   // an array where all currently viewed products must be included
                item_id: this.content?.id,	// insert an actual product ID
                price:  Number(String(this.content?.site_price).slice(0, -1)),    // insert an actual product price. Number or a string. Don't include currency code
                section_name: this.sectionName, // insert the name of the list where the product is currently displayed
                index: this.index, 	// insert product's position in that list
                item_category:this.categoryName
              }]
            }
            window.dataLayer.push({
                event: 'select_item',  	// name of the event. In this case, it always must be select_item
                ecommerce:selectItem
            });
          window.zebline.event.track('select_item' , selectItem)
        }
    },

  computed:{
      skusObjectStock(){
        try {
          return this.content?.seller_s_k_us[0]?.site_stock
        }catch (e) {
          return  0
        }

      },

    relatedObjectStock(){
      try {
        return this.content?.site_stock
      }catch (e) {
        return  0
      }

    },
  }
}
</script>

<style scoped>
@import '~/assets/scss/views/campaign.scss';
</style>
