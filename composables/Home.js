/**
 * Home composable
 */
import { ref} from 'vue';
import axios from "axios";

export default function setup() {
    const homeSectionList = ref([]);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    useAsyncData(
       async () =>
           await   axios.get(runtimeConfig.public.apiBase + `/homepage/index/`)
                .then((response) => {
                    homeSectionList.value = response.data.data
                })
                .catch((err) => {
                    if (err.response.status){
                        showError({
                            statusCode: 404,
                            statusMessage: "Page Not Found"
                        })
                    }
                }).finally(() => {})
    )


    return { homeSectionList, loading  }
}

