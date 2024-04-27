/**
 * Order composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default function setup() {

    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const randomNumberForBasket = useCookie('randomNumberForBasket')
    const sendingMethods = ref([]);
    const route = useRoute()
    const store = useStore()
    const voucher = ref(null)
    const transactionData = ref({})
    const loadingAddBasket = ref(false)
    const loadingFirstAddBasket = ref(false)
    const count = ref(0)
    const freeDelivery = ref(false)

    /**
     * Create random number
     * @returns 
     */
    async function createRandomNumber(){
        let result = '';
        for(let i = 0; i < 20; i++) {
            result += Math.floor(Math.random() * 10); // generates a random integer between 0 and 9
        }
        return result

    }

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
                    loadingAddBasket.value = false;
                    loadingAddBasket.value = false;
                    loadingFirstAddBasket.value = false;
                    
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

    /**
     * Get Basket before login
     */
    async function getBasketBeforeLogin() {
        const randomNumberForBasket = useCookie('randomNumberForBasket')
        axios
            .get(runtimeConfig.public.apiBase + `/basket/crud/get?identifier=${randomNumberForBasket.value}`, {
            })
            .then((response) => {
                store.commit('set_basket', response);
                loadingAddBasket.value = false;
            })
            .catch((err) => {
            });
    };

    /**
     * Add Shps to basket
     * @param {*} shps 
     * @param {*} count 
     * @param {*} method 
     */
    async function addToBasket(shps , countMain, method,wayBasket= false) {
        const randomNumberForBasket = useCookie('randomNumberForBasket')

        if(countMain === 0){
            loadingFirstAddBasket.value = true
        }else{
            loadingAddBasket.value = true;
        }

        if(method === 'increase'){
            countMain = countMain + 1
        }else if(method === 'decrease' && count.value !== 0){
            countMain = countMain - 1
        }

        axios
            .post(runtimeConfig.public.apiBase + `/basket/crud/create`, {
                shps: shps,
                count: countMain
            }, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                const getResponseCount = response?.data?.data?.details.find(item => item.shps.id === shps )
                if(getResponseCount && getResponseCount.count) count.value = getResponseCount.count
                getBasket();
                if(wayBasket === false){
                    loadingAddBasket.value = false;
                    loadingFirstAddBasket.value = false;
                }
            })
            .catch((err) => {
                const getResponseCount = err.response?.data?.data?.details.find(item => item.shps.id === shps )
                if(getResponseCount && getResponseCount.count) count.value = getResponseCount.count
                
                loadingAddBasket.value = false;
                loadingFirstAddBasket.value = false;
                
                useNuxtApp().$toast.error(err.response.data.message, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });

                if (err.response.status === 401){
                    if (randomNumberForBasket.value && randomNumberForBasket.value != "") {
                        beforeAuthAddToBasket(shps , countMain, randomNumberForBasket.value, method)
                    }
                    else{
                        const randomNumber = createRandomNumber()
                        randomNumberForBasket.value = randomNumber
                        beforeAuthAddToBasket(shps , countMain, randomNumber, method)
                    }
                }
            });
    };

    /**
     * Add shps to basket before login
     * @param {*} shps 
     * @param {*} count 
     * @param {*} number 
     */
    async function beforeAuthAddToBasket(shps , countMain , number, method, wayBasket = false) {
        if(countMain === 0){
            loadingFirstAddBasket.value = true
        }else{
            loadingAddBasket.value = true;
        }

        if(method === 'increase'){
            countMain = countMain + 1
        }else if(method === 'decrease' && count.value !== 0){
            countMain = countMain - 1
        }
        
        axios
            .post(runtimeConfig.public.apiBase + `/basket/crud/create`, {
                shps: shps,
                count: countMain ,
                identifier: number
            })
            .then((response) => {
                const getResponseCount = response.data.data.details.find(item => item.shps.id === shps )
                if(getResponseCount && getResponseCount.count) count.value = getResponseCount.count

                getBasket()

                loadingAddBasket.value = false;
                loadingFirstAddBasket.value = false;

            })
            .catch((err) => {
                const getResponseCount = err.response.data.data.details.find(item => item.shps.id === shps )
                if(getResponseCount && getResponseCount.count) count.value = getResponseCount.count
                
                if(wayBasket === false){
                    loadingAddBasket.value = false;
                    loadingFirstAddBasket.value = false;
                }
                
                useNuxtApp().$toast.error(err.response.data.message, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            });
    };

    /**
     * Remove shps from basket
     * @param {*} shps 
     */
    async function deleteShpsBasket(shps ) {
        loadingAddBasket.value = true;
        
        const formData = new FormData()
        formData.append('shps' , shps)

        if (randomNumberForBasket.value && randomNumberForBasket.value != ""){
            formData.append('identifier' , randomNumberForBasket.value )
        }

        axios
            .post(runtimeConfig.public.apiBase + `/basket/crud/delete/shps`, formData, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                if(!response.data.data.details){
                    randomNumberForBasket.value = ''
                }
                count.value = 0;
                getBasket();
               
            })
            .catch((err) => {
                // auth.checkAuthorization(err.response)
            });
    };

    /**
     * Calculate sending price
     * @param {*} address_id 
     * @param {*} sending_method 
     */
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
                getBasket();
                if(response.data.data.sending_price === 0){
                    freeDelivery.value = true
                }
            })
            .catch((err) => {
                // auth.checkAuthorization(err.response)
            });
    };

    /**
     * Calculate voucher
     * @param {*} code 
     */
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

    /**
     * Delete voucher from basket
     */
    async function deleteVoucherFromBasket() {
        axios
            .post(runtimeConfig.public.apiBase + `/basket/crud/delete/voucher`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                voucher.value = null;
                store.commit('set_basket', response);
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

    /**
     * Create order in Step4 in basket
     * @param {*} sending_method 
     * @param {*} invitation_code 
     * @param {*} address_id 
     * @param {*} payment_method 
     */
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
                if (err.response.status === 409){

                    const form = {
                        dialog:true,
                        buttonType:'desktop',
                        title:'تغییراتی در سفارش ایجاد شد.',
                        text:`در این سفارش آیتم(های) زیر تغییر پیدا کرده است`,
                        object:err.response.data,
                        submitText:'تایید',
                        type:'',
                        emptyBasket:err.response.data.data.is_basket_empty
                    }
                    store.commit('set_orderModalError', form)
                }
                if(err.response.data.data === null){
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }
            });
    };

    /**
     * Get transaction data
     */
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
                useNuxtApp().$toast.error(err.response.data.message, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            });
    };

    /**
     * Create failed order
     * @param {*} orderId 
     */
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

    async function getSendingMethods(addressId) {
        axios
            .post(runtimeConfig.public.apiBase + `/order/sending-methods`, {
                address_id:addressId
            }, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                sendingMethods.value = response.data.data
            })
            .catch((err) => {

            });
    };

    return {getBasket, loading ,addToBasket , deleteShpsBasket ,
        calculateSendingPrice , createOrder,calculateVoucher,voucher,
        getTransactionData,transactionData,createFailedOrder , beforeAuthAddToBasket, deleteVoucherFromBasket,
        loadingAddBasket, count ,  getSendingMethods ,sendingMethods, freeDelivery  }
}

