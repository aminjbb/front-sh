<template lang="">
<main class="v-user v-user--address">
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

                        <generalUserAddressModal title="ثبت آدرس جدید" buttonType="text" />
                    </header>

                    <generalUserAddressCard />

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
export default {
    data() {
        return {
            addressList: [],
        }
    },

    methods: {

        /**
         * Get address list
         */
        getAddressList(){
            //TODO: Get address list from api
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
</style>
