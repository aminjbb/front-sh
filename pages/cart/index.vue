<template>
<main class="v-cart">
    <h1 class="ov-h h-0">سبد خرید </h1>
    <v-container class="pt-0">
        <template v-if="userBasket.length < 1">
            <generalCartEmpty :count="skuCount" :products="productUserHistory.slice(0,6)" />
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
import User from '@/composables/User.js';
export default {
    data() {
        return {
            skuCount: 0,
            screenType: null,
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

        const {
            getProductUserHistory,
            productUserHistory
        } = new User();

        return {
            title,
            getProductUserHistory,
            productUserHistory
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
        
        this.getProductUserHistory();
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/cart.scss';
</style>
