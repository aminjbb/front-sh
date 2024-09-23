/**
 * Order composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute , useRouter} from "vue-router";
import auth from '@/middleware/auth';
import {useStore} from "vuex";

export default function setup() {
    const orderList = ref([]);
    const returnedOrderList = ref([]);
    const returnedOrderDetail = ref([]);
    const paymentMethods = ref([]);
    const order = ref(null);
    const orderReturnOrRejectObject = ref(null);
    const loading = ref(false)
    const reCreateOrderLoading = ref(false)
    const runtimeConfig = useRuntimeConfig();
    const userToken = useCookie('userToken');
    const route = useRoute();
    const router = useRouter();
    const trackingDetails = ref([]);
    const store = useStore()

    /**
     * Get user order list
     */
    async function getOrderList() {
        axios
            .get(runtimeConfig.public.apiBase + `/order/crud/index?per_page=100000`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                orderList.value = response
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            });
    };

    /**
     * Get return order list
     */
    async function getReturnedOrderList() {
        axios
            .get(runtimeConfig.public.apiBase + `/order/returned/crud/index?per_page=100000`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                returnedOrderList.value = response
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            });
    }

    /**
     * Get return order details by id
     */
        async function getReturnedOrderDetails() {
        axios
            .get(runtimeConfig.public.apiBase + `/order/returned/detail/${route.params.id}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {

                returnedOrderDetail.value = response.data;
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            });
    };

    /**
     * Get user one order
     */
    async function getOrder() {
        axios
            .get(runtimeConfig.public.apiBase + `/order/crud/get/${route.params.id}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                order.value = response
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            });
    };

    /**
     * Get user one order
     */
    async function getOrderById(id) {
        axios
            .get(runtimeConfig.public.apiBase + `/order/crud/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                order.value = response
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            });
    };

    /**
     * returnOrRejectOrder
     * @param {*} form
     * @param {*} endPoint
     * @param {*} accept
     */
    async function returnOrRejectOrder(form, endPoint ,accept) {
        loading.value = true
        axios
            .post(runtimeConfig.public.apiBase + endPoint, form, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                if (accept === 1) {
                    store.commit('set_snackBar', {
                        show:true , text:'درخواست شما با موفقیت ثبت شد' , status:'success'
                    })
                    router.push('/user/order')
                }
                orderReturnOrRejectObject.value = response
            })
            .catch((err) => {
                store.commit('set_snackBar', {
                    show:true , text:err.response.data.message , status:'error'
                })
                auth.checkAuthorization(err.response)
            }).finally(() => {
            loading.value = false
        });
    };

    /**
     * Cancel return order
     * @param {*} id
     */
    async function cancelReturnedOrder(id) {
        axios
            .post(runtimeConfig.public.apiBase + `/order/returned/detail/cancel/${id}`, {

            }, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
                store.commit('set_snackBar', {
                    show:true , text:err.response.data.message , status:'error'
                })

            });
    };

    /**
     * Get order tracking
     */
    async function trackingOrder() {
        axios
            .get(runtimeConfig.public.apiBase + `/order/tracking/${route.params.id}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                trackingDetails.value = response.data.data
            })
            .catch((err) => {

            });
    };
    /**
     * Get payment Methods for create order
     */
    async function getPaymentMethods(order_id) {
        let endPoint = ''
        if (order_id) endPoint =`/order/payment-methods?order_id=${order_id}`
        else endPoint =`/order/payment-methods`
        axios
            .get(runtimeConfig.public.apiBase + endPoint, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                paymentMethods.value = response.data.data
            })
            .catch((err) => {

            });
    };

     /**
     * Repeat payment for order
     * @param {*} order_id
     * @param {*} payment_method
     */
     async function rePaymentOrder( order_id , payment_method ) {
        axios
            .post(runtimeConfig.public.apiBase + `/order/crud/repay`, {
                order_id: order_id,
                payment_method:payment_method
            }, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                window.location = response.data.data.payment_link

            })
            .catch((err) => {
                store.commit('set_snackBar', {
                    show:true , text:err.response.data.message , status:'error'
                })
            });
    };

    /**
     * Recreate for a order
     */
    async function reCreateOrder( order_id) {
        reCreateOrderLoading.value = true
        axios
            .get(runtimeConfig.public.apiBase  + `/order/reorder/${ order_id}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
            })
            .catch((err) => {
                store.commit('set_snackBar', {
                    show:true , text:err.response.data.message , status:'error'
                })
            }).finally(() => {
            reCreateOrderLoading.value = false
        });
    };

    return {getOrderList, orderList, getOrder, order, returnOrRejectOrder, orderReturnOrRejectObject, loading,
            getReturnedOrderList , returnedOrderList, getReturnedOrderDetails, returnedOrderDetail, cancelReturnedOrder,
        trackingOrder, trackingDetails, getOrderById ,paymentMethods , getPaymentMethods, rePaymentOrder , reCreateOrder,
        reCreateOrderLoading}
}

