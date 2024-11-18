/**
 * Campaign composable
 */
import { ref} from 'vue';
import axios from 'axios'
import {useStore} from "vuex";

export default function setup() {
    const runtimeConfig = useRuntimeConfig()
    const skuList =  ref([])
    const loading = ref(false)
    const userToken = useCookie('userToken');
    const successGiftOrder = ref(false)
    const createLoading = ref(false)
    const store = useStore()

    async function getSku() {
        axios
            .get(runtimeConfig.public.apiBase +`/user/campaign/skus`)
            .then((response) => {
                skuList.value = response.data
            })
            .catch((err) => {

            });
    };

    /**
     * Create gift order
     * @param {*} id
     */
    async function createGiftOrder(id, token) {
        createLoading.value = true;
        const formData = new FormData()

        formData.append(`address_id`, id)
        axios
            .post(runtimeConfig.public.apiBase + '/user/campaign/order/crud/create', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                /* useNuxtApp().$toast.success(response.data.data, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                }); */
                successGiftOrder.value = true
            })
            .catch((err) => {

                store.commit('set_snackBar', {
                    show:true , text:err?.response?.data?.message , status:'error'
                })

            }).finally(() => {
                createLoading.value = false
        });
    };

    return {getSku, skuList, createGiftOrder, successGiftOrder, createLoading }
}

