/**
 * Order composable
 */
import {ref} from 'vue';
import {AxiosCall} from '~/utils/axios_call.js'
import axios from 'axios'
import {useRoute} from "vue-router";
import auth from '@/middleware/auth';

export default function setup(posts) {
    const orderList = ref([]);
    const order = ref(null);
    const orderReturnOrRejectObject = ref(null);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()

    /** get user order list **/
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

    /** get user one order **/
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

    async function returnOrRejectOrder(form, endPoint) {
        loading.value = true
        axios
            .post(runtimeConfig.public.apiBase + endPoint, form, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                orderReturnOrRejectObject.value = response
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            }).finally(() => {
            loading.value = false
        });
    };

    return {getOrderList, orderList, getOrder, order, returnOrRejectOrder, orderReturnOrRejectObject, loading}
}

