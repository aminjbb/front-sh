/**
 * Order composable
 */
import {ref} from 'vue';
import {AxiosCall} from '~/utils/axios_call.js'
import axios from 'axios'

export default function setup() {
    const runtimeConfig = useRuntimeConfig()
    const mostSearchItems = ref([])

    async function getMostSearch() {
        axios
            .get(runtimeConfig.public.apiBase + `/search/most-searched`)
            .then((response) => {
                mostSearchItems.value = response.data
            })
            .catch((err) => {
                
            });
    };

    return {getMostSearch ,mostSearchItems}
}

