<template>
  <section v-if="content" class="product-card product-card--order-mobile px-4">
    <div v-if="content.site_price !== content.current_site_price || content.site_stock === 0"
         class="d-flex align-center">
      <v-icon
          icon="mdi-alert-circle-outline"
          :color="content.site_price !== content.current_site_price  ? 'deep-purple' : content.site_stock === 0 ? 'danger' : 'grey'"
          class="ml-2"/>
      <p :class="content.site_price !== content.current_site_price ? 'text-deep-purple' : content.site_stock === 0 ? 'text-danger' : 'text-grey'"
         class="t12 w400 l-28">

        <template v-if="content.site_price !== content.current_site_price ">
          کالا  تغییر قیمت داشته است.
        </template>
        <template v-else-if="content.site_stock === 0">
          کالا به اتمام رسیده است.
        </template>
      </p>
    </div>

    <div class="d-flex align-center product-card__details">
      <div v-if="content.shps && content.shps?.sku?.image_url" class="product-card__image ml-5">
        <img :src="content.shps?.sku?.image_url" :title="content.label"
             :alt="content.label" width="100" height="100"/>
      </div>

      <div>
        <h3 v-if="content.shps?.sku" class="t12 w400 text-grey-darken-1 product-card__title mb-5">
          {{ content.shps?.sku?.label }}
        </h3>

        <div class="d-flex align-center t13 w400 text-grey mb-2">
          <div class="color-pick ml-2">
            <span :style="{ backgroundColor: content.shps?.sku?.color.value }"></span>
          </div>
          <span>
                    رنگ:
                    {{ content.shps?.sku?.color.label }}
                </span>
        </div>

        <!--            <div v-if="!noSeller" class="d-flex align-center t13 w400 text-grey mb-2">-->
        <!--                <v-icon-->
        <!--                    icon="mdi-store-outline"-->
        <!--                    color="grey-lighten-1"-->
        <!--                    class="ml-2" />-->
        <!--                <span>-->
        <!--                    فروشگاه:-->
        <!--                    {{content.shopping_name}}-->
        <!--                </span>-->
        <!--            </div>-->
      </div>
    </div>

    <div class="d-flex product-card__price-info align-center justify-space-between w-100">
      <div class="product-card__product-count mb-3">
        <v-icon
            icon="mdi-plus"
            color="grey"
            size="small"
            @click="increaseCount()"/>
        <span class="t12 w300 text-grey-darken-2 number-font">
                {{ productCount }}
            </span>
        <v-icon
            :icon="productCount === 1 ? 'mdi-trash-can-outline' :'mdi-minus'"
            color="grey"
            size="small"
            @click="decreaseCount()"/>
      </div>

      <div v-if="content.count > 0">
        <template v-if="content.discount">
          <div v-if="content.customer_price" class="d-flex align-center justify-space-between">
                    <span
                        class="t19 w400 text-pink-darken-1 product-card__price-info__price product-card__price-info__price--new  number-font">
                        {{ splitChar(content.customer_price) }}
                        <span class="t12 w300 text-pink-darken-1 currency">تومان</span>
                    </span>
          </div>

          <span v-if="content.site_price"
                class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                    <span class="number-font">{{ splitChar(content.site_price) }}</span>
                    <span class="t10 w300 text-grey currency">تومان</span>
                </span>
        </template>

        <template v-else>
          <div v-if="content.customer_price" class="d-flex align-center justify-space-between">
                    <span
                        class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main number-font">
                        {{ splitChar(content.customer_price) }}
                    </span>
            <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
          </div>
        </template>
      </div>

      <div v-else>
        <div class="d-flex align-center justify-center">
                <span
                    class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">
                    ناموجود
                </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  splitChar
} from "~/utils/functions.js";
import Basket from '@/composables/Basket.js'

export default {
  setup() {
    const {addToBasket, deleteShpsBasket} = new Basket()
    return {addToBasket, deleteShpsBasket}
  },
  data() {
    return {
      productCount: 1,
    }
  },
  props: {
    /**
     * Content
     */
    content: Object,

    /**
     * Product count
     * If isn't in 'Content'
     */
    count: String,

    /**
     * Product status
     */
    status: {
      type: String,
    },

    /**
     * hide seller
     */
    noSeller: Boolean
  },

  methods: {
    splitChar,


    increaseCount() {
      this.productCount++;
      this.addToBasket(this.content?.shps?.id, this.productCount)
    },

    decreaseCount() {
      if (this.productCount > 1) {
        this.productCount--;
        this.addToBasket(this.content?.shps?.id, this.productCount)
      } else {
        this.deleteShpsBasket(this.content?.shps?.id)
      }

    },
  },

  mounted() {
    this.productCount = this.content?.count;
  },

  watch: {
    content(val) {
      this.productCount = val.count
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/general/product-card.scss';
@import "~/assets/scss/tools/bp";

$parent: 'product-card';

.#{$parent} {
  &--order-mobile {
    flex-direction: row;
    padding: 20px 0;
    border: 0 !important;
    display: block !important;

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
