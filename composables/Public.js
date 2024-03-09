/**
 * Public composable
 */
import { ref} from 'vue';
import axios from 'axios'

export default function setup() {
    const provinces = ref([]);
    const cities = ref([]);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    
    async function getProvince() {
        axios
            .get(runtimeConfig.public.apiBase +`/system/state/crud/index?per_page=10000`)
            .then((response) => {
                provinces.value = response.data.data
            })
            .catch((err) => {

            });
    };

    async function getCities(id) {
        axios
            .get(runtimeConfig.public.apiBase +`/system/state/crud/get/${id}`)
            .then((response) => {
                cities.value = response.data.data.cities
            })
            .catch((err) => {

            });
    };

    return {getProvince, provinces, loading , cities ,getCities   }
}

