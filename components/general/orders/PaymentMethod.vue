<template>
<div>
    <template v-if="paymentMethods && paymentMethods.length">
        <template v-for="(payment , index) in paymentMethods" :key="`payment${index}`">
            <div class="d-flex align-center justify-space-between flex-grow-1">
                <div>
                    <div class="d-flex align-center">
                        <v-checkbox class="address-checkbox" v-model="paymentModal" @change="selectPayment()" hide-details :value="payment.name" />
                        <h3 class="t15 w400 text-grey-darken-2">{{payment.title}}</h3>
                    </div>
                    <p class="number-font t12 w400 text-grey">
                        {{payment.subtitle}}
                    </p>
                </div>

                <img :src="payment.logo" alt="payment-image" width="85" height="54">

            </div>
            <v-divider v-if="index+1 < paymentMethods.length" color="grey-lighten-1" class="my-3" />
        </template>
    </template>
    <template v-else>
        <generalLoading />
    </template>
</div>
</template>

<script>
export default {
    data() {
        return {
            paymentModal: null,
        }
    },

    setup() {
        const {
            paymentMethods,
            getPaymentMethods
        } = new Order();

        return {
            paymentMethods,
            getPaymentMethods
        }
    },

    methods: {
        /**
         * Selected Payment for send package to customer
         */
        selectPayment() {
            this.$emit('selectedPayment', this.paymentModal);
        },
    },

    mounted() {
        if (this.paymentMethods && this.paymentMethods.length > 0) {
            this.paymentModal = this.paymentMethods[0].name;
            this.selectPayment();
        }

        this.getPaymentMethods();
    }
}
</script>

<style lang="scss">
.discount-code {
    input {
        height: 44px !important;
    }
}
</style>
