/**
 * Home composable
 */
import { ref} from 'vue';
import { AxiosCall } from '~/utils/axios_call.js'

export default function setup(posts) {
    const menuList = ref([]);
    const loading = ref(false)

    async function getMenuList(query) {
        loading.value = true
        const AxiosMethod = new AxiosCall()
        AxiosMethod.end_point = 'system/menu/crud/index?group=1'
        let data = await AxiosMethod.axios_get()
        if (data) {
            menuList.value = data.data
            loading.value = false
        }
    };

    return {getMenuList, menuList, loading  }
}

