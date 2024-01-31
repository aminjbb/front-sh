<template lang="">
<v-card class="pa-5 mobile-pa-0 mobile-no-border ov-v">
    <header class="d-flex justify-space-between  align-center mb-5 xs-hide">
        <div class="d-flex align-center">
            <v-icon
                icon="mdi-map-marker-outline"
                color="primary"
                size="small"
                class="ml-2" />
            <span class="t16 w400 text-grey-darken-3">انتخاب آدرس</span>
        </div>

        <generalUserAddressModal
            :getUserAddress="getUserAddress"
            :userDetail="userDetail"
            :provinces="provinces"
            title="ثبت آدرس جدید"
            buttonType="text" />
    </header>

    <div>
        <template v-for="(address , index) in addressMoc" :key="`address${index}`">
            <div class="d-flex align-center justify-space-between">
                <v-checkbox
                    class="address-checkbox"
                    v-model="addressModal"
                    @change="selectAddress()"
                    hide-details
                    :value="address.id" />

                <generalUserAddressCardSimple
                    class="flex-grow-1"
                    :address="address"
                    :getUserAddress="getUserAddress" />
            </div>
            <v-divider v-if="index+1 < addressMoc.length" color="grey-lighten-1"  class="my-3"/>
        </template>
    </div>
</v-card>
</template>

<script>
import User from '@/composables/User.js'
import Public from '@/composables/Public.js'

export default {
    data() {
        return {
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

    methods:{
        /**
         * Selected Address 'AddressId' for send package to customer
         */
        selectAddress(){
            this.$emit('selectedAddress', this.addressModal);
        }
    },

    beforeMount() {
        this.getUserAddress()
        this.getProvince()
    }
}
</script>

<style lang="scss">
.address-checkbox {
    width: 50px;
    flex: 0 0 50px;
}

.address-card {
    border-bottom: 0 !important;
}
</style>
