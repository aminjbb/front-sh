/**
 * User composable
 */
import {
    ref
} from 'vue';
import axios from 'axios'

export default function setup() {
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()
    const voucherList = ref([]);
    const prize = ref({});
    const luckyWheel = ref({})
    const turnPerUser = ref(0)

    /**
     * Get Lucky wheel
     */
    async function getLuckyWheel() {
        axios
            .get(runtimeConfig.public.apiBase + `/game/lucky-wheel/get/${route.params.slug}`)
            .then((response) => {
                turnPerUser.value = response.data.data?.turn_per_user;
                luckyWheel.value = response.data.data?.prizes;
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
     * Get user voucher list
     */
     async function getUserVoucherList() {
        axios
            .get(runtimeConfig.public.apiBase + `/game/lucky-wheel/user/prizes/${route.params.slug}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                voucherList.value = response.data.data
            })
            .catch((err) => {
                if (err.response.status !=401)
                useNuxtApp().$toast.error(err.response.data.message, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            });
    };

    /**
     * Get voucher Prize
     */
    async function getUserPrize() {
        axios
            .get(runtimeConfig.public.apiBase + `/game/lucky-wheel/turn/${route.params.slug}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                prize.value = response.data.data
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'wheelPercent', // The event name for tracking user authentication.
                    percent:response?.data?.data?.prize.discount_amount
                });
            })
            .catch((err) => {
                useNuxtApp().$toast.error(err.response.data.message, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            });
    };

    return {
        getUserVoucherList,
        voucherList,
        getUserPrize,
        prize,
        getLuckyWheel,
        luckyWheel,
        turnPerUser
    }
}