<template>
<div v-if="content" class="product-card pa-2" @click="enhanceEcommerce()">
    <div v-if="index && showIndex" class="product-card__index">
        <span class="t16">#{{index}}</span>
    </div>

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
        <a v-if="content.image && content.image.image_url && !isPLP" @click="enhanceEcommerce()" class="product-card__image mb-3 mt-4" :href=" shps ?`/sku/${content.slug}?shps=${shps}` :`/sku/${content.slug}`">
            <img :src="content?.image?.image_url" :title="content.label" :alt="content.label" width="130" height="130" />
        </a>
        <a v-else-if="content.image_url && isPLP" @click="enhanceEcommerce()" class="product-card__image mb-3 mt-4" :href=" shps ?`/sku/${content.slug}?shps=${shps}` :`/sku/${content.slug}`">
            <img :src="content?.image_url" :title="content.label" :alt="content.label" width="150" height="150" />
        </a>
    </template>
    <template v-else>
        <a v-if="content.image && content.image.image_url && !isPLP" @click="enhanceEcommerce()" class="product-card__image mb-3 mt-4" :href=" shps ?`/sku/${content.slug}?shps=${shps}` :`/sku/${content.slug}`">
            <img data-not-lazy :src="content?.image?.image_url" :title="content.label" :alt="content.label" width="130" height="130" />
        </a>
        <a v-else-if="content.image_url && isPLP" @click="enhanceEcommerce()" class="product-card__image mb-3 mt-4" :href=" shps ?`/sku/${content.slug}?shps=${shps}` :`/sku/${content.slug}`">
            <img data-not-lazy :src="content?.image_url" :title="content.label" :alt="content.label" width="150" height="150" />
        </a>
    </template>
    <a class="flex-grow-1 w-100" :href="`/sku/${content.slug}`" @click="enhanceEcommerce()">
        <h3 v-if="!hideLabel && content.label" class="t13 w500 text-grey product-card__title card-title mb-2">
            {{content.label}}
        </h3>
    </a>

    <div class="product-card__info d-flex align-center justify-end mb-2" :class="hideInfo ? 'hideInfo' : ''">
        <div v-if="content.score" class="product-card__info__rate">
            <span class="t12 text-grey">{{content.score}}</span>
            <v-icon icon="mdi-star" color="orange-lighten-2" />
        </div>
    </div>

    <div class="product-card__price-info mb-2" v-if="content.stock ||  skusObjectStock || relatedObjectStock ">
        <template v-if="content.discount">
            <div class="d-flex align-center justify-space-between">
                <span class="product-card__price-info__discount t11 w500">{{content.discount_percent}}%</span>
                <span v-if="content.site_price" class="t18 w400 text-pink-darken-1 product-card__price-info__price product-card__price-info__price--new">
                    {{ splitChar(Number(String(content.site_price).slice(0, -1))) }}
                    <span class="t12 w300 text-pink-darken-1 currency">تومان</span>
                </span>
            </div>

            <span v-if="content.customer_price" class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                <span>{{ splitChar(Number(String(content.customer_price).slice(0, -1))) }}</span>
                <span class="t10 w300 text-grey currency">تومان</span>
            </span>
        </template>
        <template v-else>
            <span v-if="content.customer_price" class="t18 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">{{ splitChar(Number(String(content.customer_price).slice(0, -1))) }}</span>
            <span v-else-if="content.site_price" class="t18 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">{{ splitChar(Number(String(content.site_price).slice(0, -1))) }}</span>
            <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
        </template>
    </div>
    <div class="product-card__price-info mb-2" v-else>
      <span class="t14 w800 text-grey-darken-2 currency ">ناموجود</span>
    </div>

    <div v-if="content.colors && showColors" class="product-card__colors d-flex align-center justify-center">
        <template v-if="content.colors.length !== 1 && content.colors[0].value !== 'FF00FF00'">
            <div
                class="product-card__colors__item"
                v-for="(color,index) in content.colors.slice(0,6)"
                :key="`product-color${index}`">
                <span :style="{ backgroundColor: color.value }" :class="color.value === '#ffffff' || color.value === '#FF00FF00' ? 'border' : '' "></span>
                
                <v-tooltip activator="parent" location="top">{{color.label}}</v-tooltip>
            </div>
        </template>
        <div v-if="content.colors.length > 7" class="number-font text-grey-lighten-1 t12 w400">+{{ content.colors.length - 7 }} تنوع</div>
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
                        item_brand: null,	// insert an actual product price ** TODO: We don't have this in API
                        item_category:  null,   // insert an actual product top-level category ** TODO: We don't have this in API
                        section_name: this.sectionName, // insert the name of the list where the product is currently displayed
                        item_color: null,  // insert the color of product select ** TODO: We don't have this
                        index: this.index 	// insert product's position in that list
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
