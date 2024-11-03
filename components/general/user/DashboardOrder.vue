<template>
    <div class="scroll--x">
        <div class="d-flex user-sidebar-order">
            <div class="user-sidebar-order__item d-flex flex-column">
                <img src="~/assets/images/icons/bag.svg" width="22" class="mb-3"/>
                <span class="t10 w700 text-sWarning mb-1">درحال پردازش</span>
                <span class="t10 w400 text-sGrayLighten2 number-font">سفارش ({{ preProgressOrder }})</span>
            </div>
            <div class="user-sidebar-order__item d-flex flex-column">
                <img src="~/assets/images/icons/group.svg" width="22" class="mb-3"/>
                <span class="t10 w700 text-sError mb-1">در حال ارسال</span>
                <span class="t10 w400 text-sGrayLighten2 number-font">سفارش ({{ sendingOrder }})</span>
            </div>
            <div class="user-sidebar-order__item d-flex flex-column">
                <img src="~/assets/images/icons/shopping-bag.svg" width="22" class="mb-3"/>
                <span class="t10 w700 text-sSuccess mb-1">تحویل شده</span>
                <span class="t10 w400 text-sGrayLighten2 number-font">سفارش ({{ receivedOrder }})</span>
            </div>
            <div class="user-sidebar-order__item d-flex flex-column">
                <img src="~/assets/images/icons/convert-3d-cube.svg" width="22" class="mb-3"/>
                <span class="t10 w700 text-sSecondary mb-1">مرجوعی</span>
                <span class="t10 w400 text-sGrayLighten2 number-font">سفارش ({{ userReturnedOrderList }})</span>
            </div>
        </div>
    </div>
</template>

<script>
import Order from '@/composables/Order.js'

export default {
    setup() {
        const {
            getOrderList,
            orderList,
            getReturnedOrderList,
            returnedOrderList
        } = new Order()
        return {
            getOrderList,
            orderList,
            getReturnedOrderList,
            returnedOrderList
        }
    },

    computed: {
        /** user order list **/
        userOrders() {
            try {
                if(this.orderList && this.orderList ?.data ?.data ?.data){
                    return this.orderList ?.data ?.data ?.data
                }
            } catch (e) {
                return []
            }
        },
        
        /** user returned Order list **/
        userReturnedOrderList() {
            try {
                const returnOrder = this.returnedOrderList ?.data ?.data ?.data
                if (returnOrder.length > 0) return returnOrder.length
                else return '0'
            } catch (e) {
                return '0'
            }
        },

        /** Pre progress order list **/
        preProgressOrder() {
            try {
                const preProgress = this.userOrders.filter(order => order?.status === 'processing')
                if (preProgress.length > 0) return preProgress.length
                else return '0'
            } catch (e) {
                return '0'
            }
        },
        /** Sending order list **/
        sendingOrder() {
            try {
                const sendingOrder = this.userOrders.filter(order => order?.status === 'sending')
                if (sendingOrder.length > 0) return sendingOrder.length
                else return '0'
            } catch (e) {
                return '0'
            }
        },
        /** Received order list **/
        receivedOrder() {
            try {
                const receivedOrder = this.userOrders.filter(order => order.status === 'received')
                if (receivedOrder.length > 0) return receivedOrder.length
                else return '0'
            } catch (e) {
                return '0'
            }
        },
    },

    beforeMount() {
        this.getOrderList()
        this.getReturnedOrderList()
    },
}
</script>

<style lang="scss">

.user-sidebar-order{
    padding-right: 12px;

    &__item{
        width:96px;
        height: 94px;
        border-radius: 16px;
        border: 1px solid #F3F3F3;
        background: #fff;
        padding: 12px;
        flex: 0 0 96px;
        margin-left: 8px;
    }
}

</style>