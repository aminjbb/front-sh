<template>
<main class="v-user v-user--address">
    <h1 class="ov-h h-0">آدرس های من </h1>
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">آدرس‌ها</span>
    </header>

    <v-container class="pt-0">
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>

            <div class="col-9 pa-4">
                <v-card class="pa-5 mobile-pa-0 mobile-no-border">
                    <header class="d-flex align-center justify-space-between mb-5 xs-hide">
                        <span>آدرس‌های شما</span>
                        <generalUserAddressModal v-if="userAddress && userAddress.length" :getUserAddress="getUserAddress" :userDetail="userDetail" :provinces="provinces" title="ثبت آدرس جدید" buttonType="text" />
                    </header>

                    <template v-if="userAddress && userAddress.length">
                        <generalUserAddressCard v-for="(address , index) in userAddress" :key="`address${index}`" :userDetail="userDetail" :provinces="provinces" :address="address" :class="index+1 == userAddress.length ? 'border-0' :''" :getUserAddress="getUserAddress" />
                    </template>

                    <template v-else>
                        <div class="d-flex flex-column justify-center align-center pt-15 pb-15">
                            <SvgEmptyAddress class="mt-10" />

                            <span class="t14 w400 text-grey-darken-1 mt-2">هنوز آدرسی ثبت نکرده‌اید.</span>

                            <generalUserAddressModal v-if="screenType === 'desktop'" :getUserAddress="getUserAddress" :userDetail="userDetail" :provinces="provinces" title="ثبت آدرس جدید" buttonType="text" class="mt-5"/>
                        </div>
                    </template>

                    <div class="xs-show v-user--address__mobile-btn">
                        <generalUserAddressModal title="ثبت آدرس جدید" buttonType="text" :userDetail="userDetail" :provinces="provinces" :getUserAddress="getUserAddress" />
                    </div>
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
import User from '@/composables/User.js'
import Public from '@/composables/Public.js'
import auth from '@/middleware/auth';

export default {
    data() {
        return {
            userData: null,
            screenType: null
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | آدرس های من')
        const description = ref("آدرس های من")
        const userToken = useCookie('userToken');
        const {
            getUserAddress,
            userAddress
        } = new User()
        const {
            getProvince,
            provinces
        } = new Public()
        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
        return {
            getUserAddress,
            userAddress,
            getProvince,
            provinces,
            userToken
        }
    },

    beforeMount() {
        this.getUserAddress()
        this.getProvince()
    },

    computed: {
        userDetail() {
            try {
                return this.$store.getters['get_userData']
            } catch (e) {
                return null
            }
        }
    },

    methods: {
        /**
         * fetch user data
         */
        async fetchUserProfile() {
            if (this.screenType = 'mobile') {
                try {
                    const response = await auth.getUserProfile(this.userToken)
                    this.userData = response.data.data

                } catch (error) {
                    // Handle errors
                }
            }
        },
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
</style>
