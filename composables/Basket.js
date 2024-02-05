/**
 * Order composable
 */
import {ref} from 'vue';
import {AxiosCall} from '~/utils/axios_call.js'
import axios from 'axios'
import {useRoute, useRouter} from "vue-router";
import auth from '@/middleware/auth';
import {useStore} from "vuex";

export default function setup() {
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    /** get user basket and save on vuex **/
    async function getBasket() {
        axios
            .get(runtimeConfig.public.apiBase + `/basket/crud/get`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                store.commit('set_basket', response)
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            });
    };

    async function addToBasket(shps , count) {
        axios
            .post(runtimeConfig.public.apiBase + `/basket/crud/create`, {
                shps:shps,
                count:count
            }, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                getBasket()
            })
            .catch((err) => {
                // auth.checkAuthorization(err.response)
            });
    };
    async function deleteShpsBasket(shps ) {
        axios
            .post(runtimeConfig.public.apiBase + `/basket/crud/delete/shps`, {
                shps:shps,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                getBasket()
            })
            .catch((err) => {
                // auth.checkAuthorization(err.response)
            });
    };
    async function calculateSendingPrice(address_id , sending_method ) {
        axios
            .post(runtimeConfig.public.apiBase + `/order/calculate/sending/price`, {
                address_id:address_id,
                sending_method:sending_method,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                getBasket()
            })
            .catch((err) => {
                // auth.checkAuthorization(err.response)
            });
    };
    async function createOrder(sending_method , invitation_code , address_id , payment_method ) {
        axios
            .post(runtimeConfig.public.apiBase + `/order/crud/create`, {
                address_id:address_id,
                invitation_code:invitation_code,
                sending_method:sending_method,
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
                // auth.checkAuthorization(err.response)
            });
    };



    return {getBasket, loading ,addToBasket , deleteShpsBasket , calculateSendingPrice , createOrder}
}

