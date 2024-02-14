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

                        <generalUserAddressModal
                            :getUserAddress="getUserAddress"
                            :userDetail="userDetail"
                            :provinces="provinces"
                            title="ثبت آدرس جدید"
                            buttonType="text" />
                    </header>
                    
                    <generalUserAddressCard
                        :userDetail="userDetail"
                        :provinces="provinces"
                        :address="address"
                        v-for="(address , index) in userAddress"
                        :class="index+1 == userAddress.length ? 'border-0' :''"
                        :getUserAddress="getUserAddress"
                        :key="`address${index}`" />

                    <div class="xs-show v-user--address__mobile-btn">
                        <generalUserAddressModal title="ثبت آدرس جدید" buttonType="text" />
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
import auth from "~/middleware/auth.js";

export default {
    data() {
        return {
            userDetail: null,
            userData:null,
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

    methods: {
        /**
         * fetch user data
         */
        async fetchUserProfile() {
            try {
                this.userDetail = await auth.getUserProfile(this.userToken);
            } catch (error) {
                // Handle errors
            }
        },
    },

    beforeMount() {
        this.getUserAddress()
        this.getProvince()
        this.fetchUserProfile()
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
</style>
