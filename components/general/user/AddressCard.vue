<template>
<section class="address-card" :class="screenType === 'mobile' ? 'px-2' : ''">
    <div class="d-flex align-center justify-space-between">
        <div class="flex-grow-1 d-flex align-center address-card__info">
            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">شهر / استان:</span>
                <span class="t12 w400 text-deep-purple">{{ address?.city?.label }} / {{ address?.state?.label }}</span>
            </div>

            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">کد پستی:</span>
                <span class="t12 text-deep-purple number-font">{{ address?.postal_code }}</span>
            </div>

            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">شماره تماس:</span>
                <span class="t12 text-deep-purple number-font">{{ address?.phone_number }}</span>
            </div>

            <div class="d-flex align-center">
                <v-icon
                    icon="mdi-circle"
                    color="deep-purple"
                    size="x-small" />
                <span class="t12 w400 text-deep-purple">گیرنده:</span>
                <span class="t12 w400 text-deep-purple">{{ address?.receiver_full_name }} </span>
            </div>
        </div>
        <div class="address-card__actions mr-10">
            <div class="d-flex align-center xs-hide">
                <generalUserAddressModal
                    title="ویرایش آدرس"
                    buttonType="icon"
                    class="ml-5"
                    :userDetail="userDetail"
                    :getUserAddress="getUserAddress"
                    edit
                    :address="address"
                    :provinces="provinces" />

                <generalModalsDelete
                    :ref="`deleteAddress${address.id}`"
                    :getUserAddress="getUserAddress"
                    title="حذف آدرس"
                    text="آیا از حذف این آدرس اطمینان دارید؟"
                    submitText="حذف آدرس"
                    buttonType="icon"
                    @removeProduct="removeAddress(address)" />
            </div>

            <div class="mobile-drop-down xs-show pos-r">
                <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-icon
                            icon="mdi-dots-vertical"
                            color="grey"
                            v-bind="props" />
                    </template>

                    <v-list>
                        <v-list-item>
                            <generalUserAddressModal
                                title="ویرایش آدرس"
                                :ref="`editAddress${address.id}`"
                                buttonType="mobile"
                                :userDetail="userDetail"
                                :getUserAddress="getUserAddress"
                                edit
                                :address="address"
                                hideAction
                                :provinces="provinces" />
                        </v-list-item>

                        <v-list-item>
                            <generalModalsDelete
                                :ref="`deleteAddress${address.id}`"
                                :getUserAddress="getUserAddress"
                                title="حذف آدرس"
                                text="آیا از حذف این آدرس اطمینان دارید؟"
                                submitText="حذف آدرس"
                                buttonType="mobile"
                                @removeProduct="removeAddress(address)" />
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
    </div>
    <p class="t14 number-font text-grey-darken-3 mt-3">
        {{address?.address}}
    </p>
</section>
</template>

<script>
import axios from "axios";
import auth from "~/middleware/auth.js";

export default {

  data(){
    return{
      screenType:null,
    }
  },
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
                  this.$store.commit('set_snackBar', {
                    show:true , text:'آدرس شما با موفقیت حذف شد.' , status:'success'
                  })
                })
                .catch((err) => {
                    auth.checkAuthorization(err.response)
                  this.$store.commit('set_snackBar', {
                    show:true , text:err.response.data.message , status:'error'
                  })
                }).finally(() => {
                    this.$refs[`deleteAddress${address.id}`].loading = false;
                    this.$refs[`deleteAddress${address.id}`].dialog = false;
                    this.getUserAddress()
                });
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

.address-card {
    border-bottom: 1px solid #eee;
    padding: 20px 0;
    width: 100%;
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
