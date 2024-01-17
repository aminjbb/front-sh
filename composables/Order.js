/**
 * Home composable
 */
import { ref} from 'vue';
import { AxiosCall } from '~/utils/axios_call.js'

export default function setup(posts) {
    const orderList = ref([]);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()

    async function getOrderList(query) {
        axios
            .get(runtimeConfig.public.apiBase +`page/get-with-slug/${route.params.slug}`)
            .then((response) => {
                orderList.value = response.data.data
            })
            .catch((err) => {

            });
    };

    return {getOrderList, orderList, loading  }
}

