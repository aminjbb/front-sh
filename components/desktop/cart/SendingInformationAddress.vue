<template >
<v-card class="cart-address-list pa-5 mobile-pa-0 mobile-no-border ov-v">
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
        <template v-for="(address , index) in userAddress" :key="`address${index}`">
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
                    :provinces="provinces"
                    :userDetail="userDetail"
                    :getUserAddress="getUserAddress" />
            </div>
            <v-divider v-if="index+1 < userAddress.length" color="grey-lighten-1"  class="my-3"/>
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

.cart-address-list{
    .address-card {
        border-bottom: 0 !important;
    }
}

</style>
