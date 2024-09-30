<template>
<section v-if="content" class="order-card pt-5">
    <header class="d-flex justify-content-between align-center">
        <span v-if="content.order_number" class="t12 w700 text-gray">
            <template v-if="content.status === 'returned'">
                کد سفارش مرجوعی
            </template>
            <template v-else>
                کد سفارش
            </template>
            {{ content.order_number }}
        </span>

        <div v-if="content && content.status" class="order-card__status t10 w700" :class="[getStatusBg(content.status), getStatusColor(content.status)]">
            {{ getStatusText(content.status) }}
        </div>
    </header>
    <div class="d-flex align-center">
        <div v-if="content.receiver_name" class="d-flex align-center">
            <v-icon icon="account-box-outline" color="sGrayLighten2" size="x-small"></v-icon>
            <span class="text-sGrayLighten2 t12 w500">تحویل گیرنده:{{ content.receiver_name }}</span>
        </div>
        <div v-if="content?.submit_date_fa" class="d-flex align-center">
            <v-icon icon="account-box-outline" color="sGrayLighten2" size="x-small"></v-icon>
            <span class="text-sGrayLighten2 t12 w500">{{ content?.submit_date_fa }}</span>
        </div>
        <div v-if="content.sending_method" class="d-flex align-center">
            <v-icon icon="account-box-outline" color="sGrayLighten2" size="x-small"></v-icon>
            <span class="text-sGrayLighten2 t12 w500">نحوه ارسال:{{ content.sending_method }}</span>
        </div>
    </div>

    <div class="d-flex align-center justify-space-between">
       <div>
        
       </div>

       <div class="t14 ww700">
        {{ splitChar(Number(String(content?.paid_price).slice(0, -1)))}} 
       </div>
    </div>

        
</section>
<generalOrdersPaymentMethodModal ref="selectPaymentMethod" :view="screenType === 'desktop' ? 'desktop' : 'mobile'" :orderId="content?.id" :paidPrice="content?.paid_price" />
</template>

<script>
import Basket from '@/composables/Basket.js'
import Order from '@/composables/Order.js'

export default {

    props: {
        /**
         * Content
         */
        content: Object,
    },

    data() {
        return {
            screenType: 'desktop',
        }
    },

    setup() {
        const {
            getBasket
        } = new Basket();
        const {
            reCreateOrder,
            reCreateOrderLoading
        } = new Order();
        return {
            getBasket,
            reCreateOrder,
            reCreateOrderLoading
        }
    },

    methods: {

        /**
         * Repeat Payment
         */
        repeatPayment() {
            if (this.screenType === 'desktop') {
                this.$refs.selectPaymentMethod.dialog = true;
            } else {
                this.$refs.selectPaymentMethod.sheet = true;
            }
        },

        /**
         * Recreate for a order
         */
        async createOrder() {
            await this.reCreateOrder(this.content.id);

        },

        /**
         * Get status text
         */
         getStatusText(status) {
            const text = '';

            if (status == 'processing') {
                return 'درحال پردازش';
            }
            if (status == 'sending') {
                return 'درحال ارسال';
            }
            if (status == 'received') {
                return 'تحویل شده';
            }
            if (status == 'returned') {
                return 'مرجوعی';
            }

            return '';
        },

        /**
         * Get status text
         */
         getStatusBg(status) {
            const text = '';

            if (status == 'processing') {
                return 'bg-sWarningLighten2';
            }
            if (status == 'sending') {
                return 'bg-sErrorLighten1';
            }
            if (status == 'received') {
                return 'bg-sSuccessLighten2';
            }
            if (status == 'returned') {
                return 'bg-sInfoLighten2';
            }

            return 'text-sGreyLighten2';
        },

        /**
         * Get status text
         */
         getStatusColor(status) {
            const text = '';

            if (status == 'processing') {
                return 'text-sWarning';
            }
            if (status == 'sending') {
                return 'text-sError';
            }
            if (status == 'received') {
                return 'text-sSuccess';
            }
            if (status == 'returned') {
                return 'text-sInfo';
            }

            return 'text-sGray';
        },
        
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

    watch: {
        reCreateOrderLoading(newVal) {
            if (!newVal) {
                this.getBasket()
                this.$router.push('/cart')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.order-card{
    border-radius: 12px;
    box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10) !important;

    @include gbp (0, 768) {
        box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10) !important;
    }

    &__status{
        padding: 6px 9px;
        border-radius: 6px;
    }
}
</style>
