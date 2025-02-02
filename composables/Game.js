/**
 * User composable
 */
import {
    ref
} from 'vue';
import axios from 'axios'
import {useStore} from "vuex";

export default function setup() {
    const runtimeConfig = useRuntimeConfig()
    const route = useRoute()
    const voucherList = ref([]);
    const prize = ref({});
    const luckyWheel = ref({})
    const turnPerUser = ref(0)
    const store = useStore()

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
                store.commit('set_snackBar', {
                    show:true , text:err.response.data.message , status:'error'
                })
            });
    };

     /**
     * Get user voucher list
     */
     async function getUserVoucherList(token) {
        axios
            .get(runtimeConfig.public.apiBase + `/game/lucky-wheel/user/prizes/${route.params.slug}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                voucherList.value = response.data.data
            })
            .catch((err) => {
                if (err.response.status !=401)
                    store.commit('set_snackBar', {
                        show:true , text:err.response.data.message , status:'error'
                    })
            });
    };

    /**
     * Get voucher Prize
     */
    async function getUserPrize(token) {
        axios
            .get(runtimeConfig.public.apiBase + `/game/lucky-wheel/turn/${route.params.slug}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                prize.value = response.data.data;

                const characters = 'abcdefghijklmnopqrstuvwxyz';
                const numbers = '0123456789';
                let randomWord = '';
                let randomNum = '';
                
                for (let i = 0; i < 3; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    randomWord += characters[randomIndex];
                }

                for (let i = 0; i < 2; i++) {
                    const randomIndexNum = Math.floor(Math.random() * numbers.length);
                    randomNum += numbers[randomIndexNum];
                }

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'wheelPercent', // The event name for tracking user authentication.
                    percent:response?.data?.data?.prize.discount_amount,
                    number: randomWord + randomNum + this.$store.getters['get_userData']?.phone_number,
                });
                window.zebline.event.track('wheelPercent' , {
                    percent:response?.data?.data?.prize.discount_amount,
                    number: randomWord + randomNum + this.$store.getters['get_userData']?.phone_number,
                })
            })
            .catch((err) => {
                store.commit('set_snackBar', {
                    show:true , text:err.response.data.message , status:'error'
                })
            });
    };

    return {
        getUserVoucherList,
        voucherList,
        getUserPrize,
        prize,
        getLuckyWheel,
        luckyWheel,
        turnPerUser,
        runtimeConfig
    }
}