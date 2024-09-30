/**
 * Home composable
 */
import { ref} from 'vue';
import axios from "axios";
import {useStore} from 'vuex'


export default function setup() {
    const homeSectionList = ref([]);
    const loading = ref(true)
    const runtimeConfig = useRuntimeConfig()
    const store = useStore()

    useAsyncData(
       async () =>
           await   axios.get(runtimeConfig.public.apiBase + `/homepage/index/`)
                .then((response) => {
                    homeSectionList.value = response.data?.data?.sections
                    if (response?.data?.data?.page) store.commit('set_homePageFirstTimeModal' , response?.data?.data?.page?.modal)
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

