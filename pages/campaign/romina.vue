<template>
<desktopRominaCampaignHeader />

<main class="campaign--romina">
    <desktopRominaCampaignMainHero />

    <v-container class="pos-r">
        <desktopRominaCampaignGetGift />
        <desktopRominaCampaignHero />
        <desktopRominaCampaignSlider id="romina-sku-list" :items="skuList.data" :class="screenType === 'desktop' ? 'px-7' : 'px-3'" />
    </v-container>
</main>

<desktopRominaCampaignFooter :class="screenType === 'desktop' ? 'mt-10' : ''" />
</template>

  
  
<script>
import Campaign from '@/composables/Campaign.js'

export default {
    data() {
        return {
            screenType: 'desktop'
        }
    },
    setup() {
        const title = ref('کمپین رومینا')
        const description = ref(' فروشگاه اینترنتی شاواز Shavaz.com| مقایسه و خرید آنلاین انواع لوازم آرایشی، بهداشتی، عطر با ضمانت اصالت کالا با پایین ترین قیمت - برای خرید کلیک کنید!')

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }],
        });

        const {
            getSku,
            skuList
        } = new Campaign()

        return {
            getSku,
            skuList
        }
    },

    created() {
        this.getSku();
    },

    mounted() {
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    }
}
</script>

<style lang="scss">
@import '~/assets/scss/views/campaign.scss';
</style>
