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
    const randomNumberForBasket = useCookie('randomNumberForBasket')
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const voucher = ref({})
    const transactionData = ref({})

    /** get user basket and save on vuex **/
    async function getBasket() {
        const randomNumberForBasket = useCookie('randomNumberForBasket')
        if (userToken.value){
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
                   if ( err.response.status === 401 ||  err.response.status === 403) {
                       if (randomNumberForBasket.value && randomNumberForBasket.value != "") getBasketBeforeLogin()
                   }
                });
        }
        else{
            if (randomNumberForBasket.value && randomNumberForBasket.value != "") getBasketBeforeLogin()
        }
    };
    async function getBasketBeforeLogin() {
        const randomNumberForBasket = useCookie('randomNumberForBasket')
        axios
            .get(runtimeConfig.public.apiBase + `/basket/crud/get?identifier=${randomNumberForBasket.value}`, {
            })
            .then((response) => {
                store.commit('set_basket', response)
            })
            .catch((err) => {
                //auth.checkAuthorization(err.response)
            });
    };

    async function addToBasket(shps , count) {
        const randomNumberForBasket = useCookie('randomNumberForBasket')
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
                if (err.response.status === 401){
                    if (randomNumberForBasket.value && randomNumberForBasket.value != "") {
                        beforeAuthAddToBasket(shps , count)
                    }
                    else{
                        const randomNumber = Math.random(10000000000000000000,99999999999999999999)
                        randomNumberForBasket.value = randomNumber
                        this.count ++;
                        beforeAuthAddToBasket(shps , count)
                    }
                }
                // auth.checkAuthorization(err.response)
            });
    };
    async function beforeAuthAddToBasket(shps , count , number) {
        axios
            .post(runtimeConfig.public.apiBase + `/basket/crud/create`, {
                shps:shps,
                count:count,
                identifier:number
            })
            .then((response) => {
                getBasket()
            })
            .catch((err) => {
                if (err.response.status === 401){
                    localStorage.setItem('returnPathAfterLogin', this.$route.fullPath)
                    router.push('/login')
                }
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

    async function calculateVoucher(code ) {
        axios
            .post(runtimeConfig.public.apiBase + `/order/calculate/voucher`, {
                code:code,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                voucher.value = response.data.data
            })
            .catch((err) => {
                if(err.response.data){
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }
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
                if(payment_method === 'online' || payment_method === 'wallet'){
                    window.location = response.data.data.payment_link
                } else{
                    useNuxtApp().$toast.error('روش انتخابی در حال حاضر فعال نیست.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }

            })
            .catch((err) => {
                if(err.response.data.data === null){
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }
            });
    };

    async function getTransactionData() {
        axios
            .get(runtimeConfig.public.apiBase + `/finance/user/transaction/crud/get?token=${route.query.token}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                transactionData.value = response.data.data
            })
            .catch((err) => {
                // auth.checkAuthorization(err.response)
            });
    };

    async function createFailedOrder(orderId) {
        axios
            .post(runtimeConfig.public.apiBase + `/order/crud/pay/${orderId}`, {},{
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                window.location = response.data.data.payment_link
            })
            .catch((err) => {
                if(err.response.data.data === null){
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }
            });
    };

    return {getBasket, loading ,addToBasket , deleteShpsBasket ,
        calculateSendingPrice , createOrder,calculateVoucher,voucher,
        getTransactionData,transactionData,createFailedOrder , beforeAuthAddToBasket }
}

