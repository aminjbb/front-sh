<template>
    <desktopRominaCampaignHeader />

    <main class="campaign--romina">
        <desktopRominaCampaignMainHero />

        <v-container class="pos-r">
            <desktopRominaCampaignGetGift />
            <desktopRominaCampaignHero />
            <desktopRominaCampaignSlider/>
        </v-container>
    </main>

    <desktopRominaCampaignFooter />

    <template>
        <desktopRominaCampaignLoginModal :signupStatus="!loginStatus"  />
    </template>
  </template>
  
  <script>
  import auth from '@/middleware/auth';
  
  export default {
    data() {
        return {
            loginStatus: false,
        }
    },

    created() {
        this.fetchUserProfile();
    },

    methods: {
        /**
         * fetch user data
         */
        async fetchUserProfile() {
            try {
                if (this.userToken) {
                    const response = await auth.getUserProfile(this.userToken)
                    if (response.data.data) {
                        this.$store.commit('set_userData', response.data.data)
                        this.userData = response.data.data
                        this.loginStatus = true;
                    }
                } else {
                    this.loginStatus = false;
                }
            } catch (error) {
                // Handle errors
            }
        },

    },
  
  }
  </script>
  
<style lang="scss">
@import '~/assets/scss/views/campaign.scss';
</style>