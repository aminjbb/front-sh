<template>
<main class="v-cart">
    <h1 class="ov-h h-0">سبد خرید </h1>
    <v-container class="pt-0">
        <template v-if="!lastStep && userBasket.length < 1">
            <generalCartEmpty :count="skuCount" :products="randomProducts.slice(0,6)" />
        </template>

        <template v-else>
            <desktopCartStepper v-if="screenType === 'desktop'" :data="userBasket" />
            <mobileCartStepper v-if="screenType === 'mobile'" :data="userBasket" />
        </template>
    </v-container>
</main>
</template>

<script>
import User from '@/composables/User.js';
export default {
    data() {
        return {
            skuCount: 0,
            screenType: null,
            lastStep: false,
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

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | سبد خرید')
        const description = ref("سبد خرید شاواز ")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })

        const {
            getRandomProducts,
            randomProducts
        } = new User();

        return {
            title,
            getRandomProducts,
            randomProducts
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
        
        this.getRandomProducts();

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            this.lastStep = true;
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/cart.scss';
</style>
