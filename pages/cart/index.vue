<template>
<main class="v-cart">
    <h1 class="ov-h h-0">سبد خرید </h1>
    <v-container class="pt-0">
        <template v-if="userBasket?.details?.length === 0">
            <generalCartEmpty :count="skuCount" :products="suggestProductsMoc" />
        </template>

        <template v-else>
            <template v-if="screenType === 'desktop'">
                <desktopCartStepper :data="userBasket" />
            </template>
            <template v-if="screenType === 'mobile'">
                <mobileCartStepper :data="userBasket" />
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
        }
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
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/cart.scss';
</style>
