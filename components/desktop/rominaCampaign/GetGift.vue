<template>
<section class="get-gift d-flex align-center justify-center flex-column bg-white w-100" :class="screenType === 'desktop' ? ' px-15 pb-6 pt-9' : ' px-4 pb-4 pt-9'">
    <h2 class="w600 text-sGrayDarken2 mb-2" :class="screenType === 'desktop' ? 't22' : 't16'">هدیه رایگان رومینا برای تو که دوست شاوازی</h2>

    <p class="text-sGrayDarken2 mb-2 text-center" :class="screenType === 'desktop' ? 't20 w300' : 't14 w400'">فقط کافیه شماره‌ات رو وارد کنی و با انتخاب یا وارد کردن آدرست، هدیه شاواز و رومینا به دستت برسه!</p>

    <btn class="btn btn--submit br6 px-10 d-flex align-center cur-p" :class="screenType === 'desktop' ? 'mt-4' : 'mt-2'" :height="screenType === 'desktop' ? '44' : '34'" :width="screenType === 'desktop' ? '165' : '96'" @click="openModal()">
        <span class="w700 text-white" :class="screenType === 'desktop' ? 't16' : 't12'">دریافت هدیه</span>
    </btn>
</section>

<desktopRominaCampaignLoginModal :signupStatus="!loginStatus" ref="loginModal" />
<desktopRominaCampaignLoginBottomSheet :signupStatus="!loginStatus" ref="loginSheet" />
</template>

<script>
import auth from '@/middleware/auth';
export default {
    data() {
        return {
            loginStatus: false,
            screenType:'desktop',
        }
    },

    setup() {
        const userToken = useCookie('userToken')

        return {
            userToken
        }
    },

    created() {
        this.fetchUserProfile();
    },

    methods: {
        openModal() {
            if (window.innerWidth < 769) {
                this.$refs.loginSheet.sheet = true;
            } else {
                this.$refs.loginModal.dialog = true;
            }

        },
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

    mounted() {
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

.get-gift {
    box-shadow: 0px 4px 13px 0px rgba(97, 97, 97, 0.10);

    margin-top: -52px;

    @include gbp(0, 769) {
        margin-top: -29px
    }
}
</style>
