/**
 * User composable
 */
import {
    ref
} from 'vue';
import axios from 'axios'

export default function setup(posts) {
    const userAddress = ref([]);
    const userWallet = ref([]);
    const userTransactions = ref([]);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')

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

            });
    };

    return {
        getUserAddress,
        userAddress,
        getUserTransactionsList,
        userTransactions,
        getUserWallet,
        userWallet,
        loading
    }
}