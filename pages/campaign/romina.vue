<template>
    <desktopRominaCampaignHeader />

    <main class="campaign--romina">
        <desktopRominaCampaignMainHero />

        <v-container class="pos-r">
            <desktopRominaCampaignGetGift />
            <desktopRominaCampaignHero />
            <desktopRominaCampaignSlider id="romina-sku-list" :items="skuList.data" :class="screenType === 'desktop' ? 'px-7' : 'px-3'"/>
        </v-container>
    </main>

    <desktopRominaCampaignFooter :class="screenType === 'desktop' ? 'mt-10' : ''"/>
  </template>
  
  <script>
  import Campaign from '@/composables/Campaign.js'

  export default {
    data() {
        return {
            screenType:'desktop'
        }
    },
    setup() {
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