<template>
<div v-if="content" class="product-card pa-2" @click="enhanceEcommerce()">
    <div v-if="deleteIcon" class="product-card__delete">
        <generalModalsDelete
            ref="refRemoveProduct"
            title="حذف محصول"
            text="آیا از حذف این محصول از لیست علاقمندی ها اطمینان دارید؟"
            submitText="حذف کالا"
            buttonType="icon"
            @removeProduct="removeProduct(content)" />
    </div>

    <template v-if="lazy">
        <a v-if="content.image && content.image.image_url && !isPLP" class="product-card__image mb-3 mt-4" :href=" shps ?`/sku/${content.slug}?shps=${shps}` :`/sku/${content.slug}`">
            <img :src="content?.image?.image_url" :title="content.label" :alt="content.label" width="130" height="130" />
        </a>
        <a v-else-if="content.image_url && isPLP" class="product-card__image mb-3 mt-4" :href=" shps ?`/sku/${content.slug}?shps=${shps}` :`/sku/${content.slug}`">
            <img :src="content?.image_url" :title="content.label" :alt="content.label" width="130" height="130" />
        </a>
    </template>
    <template v-else>
        <a v-if="content.image && content.image.image_url && !isPLP" class="product-card__image mb-3 mt-4" :href=" shps ?`/sku/${content.slug}?shps=${shps}` :`/sku/${content.slug}`">
            <img data-not-lazy :src="content?.image?.image_url" :title="content.label" :alt="content.label" width="130" height="130" />
        </a>
        <a v-else-if="content.image_url && isPLP" class="product-card__image mb-3 mt-4" :href=" shps ?`/sku/${content.slug}?shps=${shps}` :`/sku/${content.slug}`">
            <img data-not-lazy :src="content?.image_url" :title="content.label" :alt="content.label" width="130" height="130" />
        </a>
    </template>

    <div v-if="content?.brand_name || (content?.colors && content?.colors.length > 0)" class="d-flex align-center justify-space-between w-100 pl-1">
        <span v-if="content?.brand_name" class="t12 w400 text-grey py-2">{{ content.brand_name }}</span>

        <div v-if="content.colors && content.colors.length && showColors" class="product-card__colors d-flex align-center">
            <template v-if="content.colors.length !== 1 && content.colors[0].value !== 'FF00FF00'">
                <div
                    class="product-card__colors__item my-2"
                    v-for="(color,index) in content.colors.slice(0,4)"
                    :key="`product-color${index}`">
                    <span :style="{ backgroundColor: color.value }" :class="color.value === '#ffffff' || color.value === '#FF00FF00' ? 'border' : '' "></span>
                </div>
            </template>

            <div v-if="content.colors.length > 4" class="product-card__colors__more number-font t12 text-right d-inline-block ml-1">{{ content.colors.length - 4 }}+</div>
        </div>
    </div>

    
    <p v-if="!hideLabel && content.label" class="w-100 flex-grow-1 t12 l21 w500 product-card__title card-title">
        <a class="t12 l21 w500 text-right" :href="`/sku/${content.slug}`">
            {{content.label}}
        </a>
    </p>

    <div v-if="content.stock ||  skusObjectStock || relatedObjectStock" class="product-card__price-info mb-2" :class="showBasket ? 'd-flex align-center justify-space-between' : ''">
        <div>
            <generalAddToBasketMinimal v-if="showBasket" :content="content" />
        </div>

        <div :class="!showBasket ? 'pt-3' : ''">
            <template v-if="content.discount">
                <div class="d-flex align-center justify-end">
                    <span class="product-card__price-info__discount t16 w500 ml-2">%{{content.discount_percent}}</span>
                    <span v-if="content.site_price" class="l19 t16 w700 product-card__price-info__price product-card__price-info__price--new">
                        {{splitChar(Number(String(content.site_price).slice(0, -1)))}}
                        <svgToman/>
                    </span>
                </div>

                <span v-if="content.customer_price" class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                    <span>{{ splitChar(Number(String(content.customer_price).slice(0, -1)))}}</span>
                </span>
            </template>

            <template v-else>
                <span v-if="content.customer_price" class="t16 w700 product-card__price-info__price product-card__price-info__price--main">{{splitChar(Number(String(content.customer_price).slice(0, -1)))}}</span>
                <span v-else-if="content.site_price" class="t16 w700 product-card__price-info__price product-card__price-info__price--main">{{splitChar(Number(String(content.site_price).slice(0, -1)))}}</span>
                <svgToman class="mr-1"/>
            </template>
        </div>
    </div>
    <div class="product-card__price-info mb-2" v-else>
      <span class="t14 w800 text-grey-darken-2 currency ">ناموجود</span>
    </div>

    <div v-if="functions" class="d-flex align-center justify-end mt-2 mobile-pa-0 w-100">
        <v-btn
            :href="`/sku/${content.slug}`"
            height="44"
            title="افزودن به سبد"
            class="btn btn--submit">
            افزودن به سبد
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
         * user this card in plp page for image_url and price
         */
        isPLP: {
            type: Boolean,
            default: false
        },

        /**
         * Hide label of card
         */
        hideLabel: {
            type: Boolean,
            default: false
        },

        /**
         * Hide label of card
         */
         lazy: {
            type: Boolean,
            default: true
        },

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
            window.dataLayer.push({
                event: 'select_item',  	// name of the event. In this case, it always must be select_item
                ecommerce: {							
                    items: [{   // an array where all currently viewed products must be included
                        item_id: this.content?.id,	// insert an actual product ID
                        price:  Number(String(this.content?.site_price).slice(0, -1)),    // insert an actual product price. Number or a string. Don't include currency code
                        section_name: this.sectionName, // insert the name of the list where the product is currently displayed
                        index: this.index, 	// insert product's position in that list
                        item_category:this.categoryName
                    }]
                }
            });
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
@import '~/assets/scss/components/general/product-card.scss';
</style>
