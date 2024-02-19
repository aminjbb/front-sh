/**
 * Home composable
 */
import { ref} from 'vue';
import { AxiosCall } from '~/utils/axios_call.js'

export default function setup() {
    const homeSectionList = ref([]);
    const loading = ref(false)

    async function getHomeSections(query) {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'homepage/index'
        let data = await AxiosMethod.axios_get()
        if (data) {
            homeSectionList.value = data.data
            loading.value = false
        }
    };

    return {getHomeSections, homeSectionList, loading  }
}

