/**
 * User composable
 */
import {
    ref
} from 'vue';
import axios from 'axios'
import auth from "~/middleware/auth.js";

export default function setup() {
    const userAddress = ref([]);
    const userWallet = ref([]);
    const userTransactions = ref([]);
    const ticketList = ref([]);
    const titleList = ref([]);
    const productUserHistory = ref([]);
    const singleTicket = ref(null);
    const wishList = ref([]);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()
    const randomProducts = ref([]);

    /**
     * Get user address
     */
    async function getUserAddress() {
        axios
            .get(runtimeConfig.public.apiBase + `/user/profile/address`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                userAddress.value = response.data.data
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
     * Get user transaction
     */
    async function getUserTransactionsList() {
        axios
            .get(runtimeConfig.public.apiBase + `/finance/user/wallet/transactions`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                userTransactions.value = response.data.data
            })
            .catch((err) => {

            });
    };

    /**
     * Get user wallet
     */
    async function getUserWallet() {
        axios
            .get(runtimeConfig.public.apiBase + `/user/profile/finance/index`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                userWallet.value = response.data.data
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
     * Get user ticket list
     */
    async function getUserTicketList() {
        axios
            .get(runtimeConfig.public.apiBase + `/ticket/user/crud/index?per_page=10000&order=updated_at&order_type=desc`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                ticketList.value = response.data.data
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
     * Get user ticket Title
     */
    async function getUserTicketTitle() {
        axios
            .get(runtimeConfig.public.apiBase + `/ticket/user/topic/index`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                titleList.value = response.data.data
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
     * Get user single ticket bu id
     */
    async function getUserTicketById() {
        axios
            .get(runtimeConfig.public.apiBase + `/ticket/user/crud/get/${route.params.id}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                singleTicket.value = response.data.data
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
     * Get user ticket list
     */
    async function getUserWhishList() {
        axios
            .get(runtimeConfig.public.apiBase + `/product/wishlist/crud/index`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                wishList.value = response.data.data
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
     * Get user product history on th profile page
     */
    async function getProductUserHistory() {
        if (userToken.value){
            axios
                .get(runtimeConfig.public.apiBase + `/product/user/history`, {
                    headers: {
                        Authorization: `Bearer ${userToken.value}`,
                    },
                })
                .then((response) => {
                    productUserHistory.value = response.data.data
                })
                .catch((err) => {

                });
        }

    };

    /**
     * Get random products when user is not login
     */
    async function getRandomProducts() {
        axios
            .get(runtimeConfig.public.apiBase + `/product/random/sku/index`, {})
            .then((response) => {
                randomProducts.value = response.data.data.data
            })
            .catch((err) => {

            });
    };

    return {
        getUserAddress,
        userAddress,
        getUserTransactionsList,
        userTransactions,
        getUserWallet,
        userWallet,
        getUserTicketList,
        ticketList,
        getUserTicketById,
        singleTicket,
        getUserWhishList,
        wishList,
        loading,
        getProductUserHistory,
        productUserHistory,
        getRandomProducts,
        randomProducts,
        getUserTicketTitle,
        titleList
    }
}