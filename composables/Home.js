/**
 * Home composable
 */
import { ref} from 'vue';
import axios from "axios";

export default function setup() {
    const homeSectionList = ref([]);
    const loading = ref(true)
    const runtimeConfig = useRuntimeConfig()
    useAsyncData(
       async () =>
           await   axios.get(runtimeConfig.public.apiBase + `/homepage/index/`)
                .then((response) => {
                    homeSectionList.value = response.data?.data?.sections
                })
                .catch((err) => {
                    if (err.response.status){
                        showError({
                            statusCode: 404,
                            statusMessage: "Page Not Found"
                        })
                    }
                }).finally(() => {
                    loading.value = false
               })
    )


    return { homeSectionList, loading  }
}

