<template>
<div class="c-modal w-100">
    <div class="w-100 d-flex justify-center">
        <v-btn
            @click="openModal()"
            height="44"
            title="ثبت یا ویرایش آدرس"
            class="btn btn--cancel">
            ثبت یا ویرایش آدرس
        </v-btn>
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        fullscreen>
        <v-card class="pt-2 pb-5 c-modal--comment c-modal--cart-mobile-address">
            <header class="c-modal--comment__header d-flex justify-space-between align-center pb-1 px-6">
                <div class="d-flex flex-column c-modal--comment__header__title">
                    <span class="t16 w400 mb-1">
                        انتخاب آدرس
                    </span>
                </div>

                <v-btn
                    class="c-modal--comment__header__btn pa-0 text-none"
                    @click="closeModal()"
                    color="grey-darken-3"
                    size="large"
                    variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div class="px-6">
                <template v-for="(address , index) in userAddress" :key="`address${index}`">
                    <div class="d-flex align-center justify-space-between">
                        <v-checkbox
                            class="address-checkbox"
                            v-model="addressModal"
                            @change="selectAddress()"
                            hide-details
                            :value="address" />

                        <generalUserAddressCardSimple
                            :userDetail="userDetail"
                            :provinces="provinces"
                            class="flex-grow-1 border-0"
                            :address="address"
                            :getUserAddress="getUserAddress" />
                    </div>
                    <v-divider
                        v-if="index+1 < userAddress.length"
                        color="grey-lighten-1"
                        class="my-3" />
                </template>

                <div class="xs-show v-user--address__mobile-btn mt-10">
                    <generalUserAddressModal 
                        title="ثبت آدرس جدید"
                        buttonType="text"
                        :userDetail="userDetail"
                        :provinces="provinces"
                        :getUserAddress="getUserAddress"/>
                </div>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import User from '@/composables/User.js'
import Public from '@/composables/Public.js'

export default {
    data() {
        return {
            userDetail: null,
            dialog: false,
            addressModal: null,
        }
    },

    setup() {
        const userToken = useCookie('userToken');
        const {
            getUserAddress,
            userAddress
        } = new User();

        const {
            getProvince,
            provinces
        } = new Public();

        return {
            getUserAddress,
            userAddress,
            getProvince,
            provinces,
            userToken
        }
    },

    props: {
        /**
         * User info
         */
        userDetail: Object
    },

    methods: {
        /**
         * Selected Address 'AddressId' for send package to customer
         */
        selectAddress() {
            this.$emit('selectedAddress', this.addressModal);
            this.closeModal();
        },

        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        },
    },

    beforeMount() {
        this.getUserAddress()
        this.getProvince()
    }
}
</script>

<style scoped lang="scss">
.c-modal--comment{
    &__header {
        background: var(--Shade-white, #FFF);
        box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.20);
    }
}

.c-modal--cart-mobile-address{
    .v-user--address__mobile-btn{
        border-radius: 8px 8px 0px 0px;
        background: #FFF;
        box-shadow: 0px 0px 15px 0px rgba(89, 89, 89, 0.50);
        bottom:0 !important;
        padding:25px !important
    }
}
</style>
