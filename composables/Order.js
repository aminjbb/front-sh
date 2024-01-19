/**
 * Home composable
 */
import { ref} from 'vue';
import { AxiosCall } from '~/utils/axios_call.js'
import axios from 'axios'
export default function setup(posts) {
    const orderList = ref([]);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    /** get user order list **/
    async function getOrderList(query) {
        axios
            .get(runtimeConfig.public.apiBase +`/order/crud/index/` ,{
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                orderList.value = response
            })
            .catch((err) => {

            });
    };

    return {getOrderList, orderList, loading  }
}

