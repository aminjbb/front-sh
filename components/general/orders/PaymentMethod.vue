<template>
<div>
    <template v-if="paymentMethods && paymentMethods.length">
        <template v-for="(payment , index) in paymentMethods" :key="`payment${index}`">
            <v-radio-group class="payment-methods-radio" v-model="paymentModal" @change="selectPayment()">
                <v-radio hide-details :value="payment.name" color="primary">
                    <template v-slot:label>
                        <div class="d-flex align-center">
                            <div class="ov-h d-flex align-center justify-center payment-methods-radio__image">
                                <img :src="payment.logo" alt="payment-image" width="40" height="40">
                            </div>

                            <div>
                                <h3 class="t14 w700 text-sGrayDarken2 mb-2">{{ payment.title }}</h3>

                                <p class="number-font t12 w500 text-sGrey">
                                    {{ payment.subtitle }}
                                </p>
                            </div>
                        </div>
                    </template>
                </v-radio>
            </v-radio-group>    
                <v-divider color="grey-lighten-1" class="my-3" />
        </template>
    </template>

    <template v-else>
        <generalLoading />
    </template>
</div>
</template>

<script>
export default {
    props: {
        orderId: null
    },

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

        this.getPaymentMethods(this.orderId);
    }
}
</script>

<style lang="scss">
.discount-code {
    input {
        height: 44px !important;
    }
}

.payment-methods-radio{
    .v-label{
        opacity: 1;
        flex-grow: 1 !important;
    }

    .v-selection-control{
        direction: ltr !important;
    }

    &__image{
        width: 40px;
        height: 40px;
        flex: 0 0 40px;
        overflow: hidden;
        margin-left: 8px;

        img{
            width: auto;
            height: 100%;
        }
    }
}

</style>
