<template>
    <desktopRominaCampaignHeader />

    <main class="campaign--romina">
        <desktopRominaCampaignMainHero />

        <v-container class="pos-r">
            <desktopRominaCampaignGetGift />
            <desktopRominaCampaignHero />
        </v-container>
    </main>

    <desktopRominaCampaignFooter />
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/campaign.scss';
</style>