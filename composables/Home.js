/**
 * Home composable
 */
import { ref} from 'vue';
import { AxiosCall } from '~/utils/axios_call.js'

export default function setup(posts) {
    const homeSectionList = ref([]);
    const cookies = useCookie()
    const loading = ref(false)

    async function getHomeSections(query) {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.using_auth = true
        AxiosMethod.token = cookies.cookies.get('adminToken')
        AxiosMethod.end_point = 'homepage/index'
        let data = await AxiosMethod.axios_get()
        if (data) {
            homeSectionList.value = data.data
            loading.value = false
        }
    };

    return {getHomeSections, homeSectionList, loading  }
}

