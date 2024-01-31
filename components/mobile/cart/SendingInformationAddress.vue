<template lang="">
<div>
    <div class="d-flex align-start flex-column">
        <div class="d-flex align-center mb-5">
            <v-icon
                icon="mdi-map-marker-outline"
                class="ml-2"
                color="primary" />
            <h2 class="text-grey-darken-3 t14 w500">انتخاب آدرس</h2>
        </div>

        <p class="t12 w400 text-grey-darken-1 mb-5">{{selectedAddressMoc.address}}</p>

        <mobileCartAddressModal @selectedAddress="getAddress" :userDetail="userDetail" />
    </div>

    <v-divider color="grey-lighten-1" class="my-3"/>
</div>
</template>

<script>
export default {
    data() {
        return {
            selectedAddress: null,
            selectedAddressMoc: {
                address: 'بزرگراه جلال آل احمد، زیر پل آزمایش، ضلع جنوب شرقی جلال، کوچه کوی نویسندگان، مجتمع کوی نویسندگان، بلوک ۷، واحد ۱۵'
            }
        }
    },

    props: {
        userDetail: Object
    },

    methods: {
        /**
         * Emit Address id to Mobile stepper
         */
        getAddress(id) {
            this.$emit('selectedAddress', id);
        }
    },
}
</script>
