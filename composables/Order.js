/**
 * Order composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute , useRouter} from "vue-router";
import auth from '@/middleware/auth';

export default function setup() {
    const orderList = ref([]);
    const returnedOrderList = ref([]);
    const returnedOrderDetail = ref([]);
    const order = ref(null);
    const orderReturnOrRejectObject = ref(null);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig();
    const userToken = useCookie('userToken');
    const route = useRoute();
    const router = useRouter();
    const trackingDetails = ref([]);

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
                    useNuxtApp().$toast.success('درخواست شما با موفقیت ثبت شد', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                    router.push('/user/order')
                }
                orderReturnOrRejectObject.value = response
            })
            .catch((err) => {
                useNuxtApp().$toast.error(err.response.data.message, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
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
                useNuxtApp().$toast.error(err.response.data.message, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
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

    return {getOrderList, orderList, getOrder, order, returnOrRejectOrder, orderReturnOrRejectObject, loading,
            getReturnedOrderList , returnedOrderList, getReturnedOrderDetails, returnedOrderDetail, cancelReturnedOrder, trackingOrder, trackingDetails, getOrderById}
}

