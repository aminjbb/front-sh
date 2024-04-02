/**
 * Order composable
 */
import {ref} from 'vue';
import {AxiosCall} from '~/utils/axios_call.js'
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
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()
    const router = useRouter()

    /**
     * Get user order list
     * @param {*} query 
     */
    async function getOrderList(query) {
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
     * @param {*} query 
     */
    async function getReturnedOrderDetails(orderId) {
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
     * @param {*} query 
     */
    async function getOrder(query) {
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

            });
    };

    return {getOrderList, orderList, getOrder, order, returnOrRejectOrder, orderReturnOrRejectObject, loading,
            getReturnedOrderList , returnedOrderList, getReturnedOrderDetails, returnedOrderDetail, cancelReturnedOrder}
}

