<template>
<section class="address-card">

    <div class="d-flex align-center justify-space-between">
        <p class="t14 number-font text-grey-darken-1 l25 ma-0">
            {{address?.address}}
        </p>

        <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <v-icon
                    icon="mdi-dots-vertical"
                    color="grey"
                    v-bind="props" />
            </template>

            <v-list>
                <v-list-item>
                    <generalUserAddressModal title="ویرایش آدرس" buttonType="mobile" :userDetail="userDetail" :getUserAddress="getUserAddress" edit :address="address" :provinces="provinces"/>
                </v-list-item>

                <v-list-item>
                    <generalModalsDelete :getUserAddress="getUserAddress" title="حذف آدرس" text="آیا از حذف این آدرس اطمینان دارید؟" submitText="حذف آدرس" buttonType="mobile" @removeProduct="removeAddress(address)" />
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</section>
</template>

<script>
import axios from "axios";
import auth from "~/middleware/auth.js";

export default {
    setup() {
        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken');
        return {
            runtimeConfig,
            userToken
        }
    },
    props: {
        /** get User Address */
        getUserAddress: {
            type: Function
        },

        /** User Detail */
        userDetail: Object,

        /** Address */
        address: Object,

        /** provinces */
        provinces: Object
    },

    methods: {
        /**
         * Remove address
         * @param {*} address 
         */
        removeAddress(address) {
            axios
                .delete(this.runtimeConfig.public.apiBase + `/user/profile/address/delete/${address.id}`, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {

                })
                .catch((err) => {

                    auth.checkAuthorization(err.response)
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }).finally(() => {
                    this.$refs.generalModalsDelete.dialog = false
                    this.$refs.generalModalsDelete.loading = false
                    this.loading = false
                    this.getUserAddress()
                });
        },
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.address-card {
    border-bottom: 1px solid #eee;
    padding: 20px 0;

    .mdi-circle {
        font-size: 4px !important;
        margin-left: 4px;
    }

    >div:first-child {
        @include gbp(0, 1280) {
            align-items: flex-start !important;
        }
    }

    &__info {
        @include gbp(0, 1280) {
            flex-direction: column !important;
            align-items: flex-start !important;
        }

        >div {
            @include gbp(1280) {
                padding-left: 7%;
            }

            @include gbp(0, 1280) {
                margin-bottom: 10px !important;
            }
        }
    }
}
</style>
