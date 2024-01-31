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
        <v-card class="pt-2 pb-5 c-modal--comment">
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
                <template v-for="(address , index) in addressMoc" :key="`address${index}`">
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
                            class="flex-grow-1"
                            :address="address"
                            :getUserAddress="getUserAddress" />
                    </div>
                    <v-divider
                        v-if="index+1 < addressMoc.length"
                        color="grey-lighten-1"
                        class="my-3" />
                </template>

                <div class="xs-show v-user--address__mobile-btn mt-10">
                    <generalUserAddressModal title="ثبت آدرس جدید" buttonType="text" />
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
            addressMoc: [{
                "id": 2,
                "user_id": 4,
                "first_name": "حسین",
                "last_name": "نصیری",
                "address": "پاسداران خیابان هروی",
                "state_id": 1,
                "city_id": 1,
                "postal_code": "1234567890",
                "number": "20",
                "unit": "202",
                "phone_number": "09125555555",
                "am_i": 1,
                "created_at": "2024-01-15T14:56:28.000000Z",
                "updated_at": "2024-01-15T14:56:28.000000Z",
                "receiver_full_name": "حسین نصیری",
                "state": {
                    "id": 1,
                    "name": "fars",
                    "label": "فارس",
                    "priority": "5",
                    "is_active": 1,
                    "created_at": null,
                    "updated_at": null
                },
                "city": {
                    "id": 1,
                    "name": null,
                    "label": "شیراز",
                    "priority": "1",
                    "state_id": 1,
                    "is_active": 1,
                    "created_at": null,
                    "updated_at": null
                }
            }]
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

<style scoped>
.c-modal--comment__header {
    background: var(--Shade-white, #FFF);
    box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.20);
}
</style>
