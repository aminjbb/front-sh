<template>
  <main class="v-cart">
    <h1 class="ov-h h-0">سبد خرید </h1>
    <v-container class="pt-0">
      <template v-if="userBasket?.details?.length === 0">
        <generalCartEmpty :count="skuCount" :products="suggestProductsMoc"/>
      </template>

      <template v-else>
        <template v-if="screenType === 'desktop'">
          <desktopCartStepper :data="userBasket"/>
        </template>
        <template v-if="screenType === 'mobile'">
          <mobileCartStepper :data="userBasket"/>
        </template>
      </template>
    </v-container>
  </main>
</template>

<script>
import Basket from '@/composables/Basket.js'

export default {
  data() {
    return {
      skuCount: 0,
      screenType: null,
      suggestProducts: [],
      suggestProductsMoc: [{
        image: {
          image_url: 'products.jpg'
        },
        label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر'
      },
        {
          image: {
            image_url: 'products.jpg'
          },
          label: 'شامپو تقویت‌کننده و ضدریزش مو فولیکا'
        },
        {
          image: {
            image_url: 'products.jpg'
          },
          label: 'کرم نرم کننده حاوی عصاره جوجوبا مای ظرفیت 150 میلی لیتر '
        },
        {
          image: {
            image_url: 'products.jpg'
          },
          label: 'مداد چشم گلدن رز مدل Dream کد 406'
        },
        {
          image: {
            image_url: 'products.jpg'
          },
          label: 'شامپو تقویت‌کننده و ضدریزش مو فولیکا'
        },
      ],
      products: [],
      productsMoc: {
        "total_price": 4200000,
        "paid_price": 3780000,
        shps: [{
          image: {
            image_url: 'products.jpg',
          },
          label: 'ماسک مو فولیکا مدل Arginine B حجم 200 میلی لیتر به همراه شامپو مو فولیکا حجم 400 میلی لیتر و هدیه سرم براق کننده مو فولیکا مدل Detanglin حجم 200 میلی لیتر',
          color: {
            label: 'مشکی',
            code: '#000',
          },
          shopping_name: 'زیبارویان',
          customer_price: 184030,
          available: false,
          site_price: 269900,
          discount: 30,
          count: 2,
          status: 'change_price'
        },
          {
            image: {
              image_url: 'products.jpg',
            },
            label: 'شامپو تقویت کننده و ضد ریزش مو فولیکا',
            color: {
              label: 'مشکی',
              code: '#000',
            },
            shopping_name: 'زیبارویان',
            customer_price: 184030,
            available: true,
            site_price: 269900,
            discount: null,
            count: 2,
            status: 'change_price'
          },
          {
            image: {
              image_url: 'products.jpg',
            },
            label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه',
            color: {
              label: 'مشکی',
              code: '#000',
            },
            shopping_name: 'زیبارویان',
            customer_price: 184030,
            site_price: 269900,
            available: false,
            discount: 30,
            count: 1,
            status: null
          }
        ]
      }
    }
  },

  setup(props) {
    const title = ref('فروشگاه اینترنتی شاواز | سبد حرید')
    const description = ref("سبد خرید شاواز ")

    useHead({
      title,
      meta: [{
        name: 'description',
        content: description
      }]
    })

    return {
      title
    }
  },

  mounted() {
    /**
     * Check screen size
     */
    window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
  },
  computed: {
    userBasket() {
      try {
        const userBasket = this.$store.getters['get_basket']
        return userBasket.data.data
      } catch (e) {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/cart.scss';
</style>
