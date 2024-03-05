/**
 * User composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute, useRouter} from "vue-router";
import auth from "~/middleware/auth.js";
import {useStore} from 'vuex'

export default function setup() {
    const product = ref([]);
    const secondaryData = ref([]);
    const breadcrumb = ref(null);
    const color = ref(null);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()
    const router = useRouter()
    const error = useError();
    const store = useStore()

    async function getSecondaryData(query) {
        axios
            .get(runtimeConfig.public.apiBase + `/product/pdp/details/${route.params.slug}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
                // params: {
                //     comment_per_page: 20
                // }
            })
            .then((response) => {
                secondaryData.value = response
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            });
    };
    async function getBreadcrumb(type) {
        axios
            .get(runtimeConfig.public.apiBase + `/product/breadcrumb/index?type=${type}&slug=${route.params.slug}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },

            })
            .then((response) => {
                breadcrumb.value = response.data.data
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            });
    };
    async function getPdpData(query) {
        axios.get(runtimeConfig.public.apiBase + `/product/pdp/get/${route.params.slug}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                product.value = response
            })
            .catch((err) => {
                if (err.response.status){
                    showError({
                        statusCode: 404,
                        statusMessage: "Page Not Found"
                    })
                }
            }).finally(() => {
            store.commit('set_loadingModal', false)
        })
    };
    store.commit('set_loadingModal', true),
    useAsyncData(
        () =>
        axios.get(runtimeConfig.public.apiBase + `/product/pdp/get/${route.params.slug}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                product.value = response
            })
            .catch((err) => {
                if (err.response.status){
                    showError({
                        statusCode: 404,
                        statusMessage: "Page Not Found"
                    })
                }
            }).finally(() => {
            store.commit('set_loadingModal', false)
        }), {
            watch: [color]
        }
    )

    return {product, color, getSecondaryData, secondaryData , getPdpData,  getBreadcrumb, breadcrumb}
}

