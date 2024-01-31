/**
 * User composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute, useRouter} from "vue-router";
import auth from "~/middleware/auth.js";

export default function setup(posts) {
    const productList = ref([]);
    const secondaryData = ref([]);
    const page = ref(1);
    const filterQuery = ref(null);
    const endPoint = ref(null);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()
    const router = useRouter()
    async function getSecondaryData(query) {
        axios
            .get(runtimeConfig.public.apiBase + `${endPoint.value}page/data/${route.params.slug}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                secondaryData.value = response
            })
            .catch((err) => {
                auth.checkAuthorization(err.response)
            });
    };
    if (route.name == 'product-slug') endPoint.value = '/product/plp/product/'
    else if (route.name == 'sku-group-slug') endPoint.value = '/product/plp/skugroup/'
    else if (route.name == 'brand-slug') endPoint.value = '/product/plp/brand'
    else if (route.name == 'category-slug') endPoint.value = '/product/plp/category'
    else if (route.name == 'promotion-slug') endPoint.value = '/product/plp/promotion/'
    useAsyncData(
        () =>
            axios.get(runtimeConfig.public.apiBase + `${endPoint.value}${route.params.slug}`, {
                    page: page.value
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken.value}`,
                    },
                })
                .then((response) => {
                    productList.value = response
                })
                .catch((err) => {

                }), {
            watch: [page]
        }
    )

    return {productList, filterQuery,getSecondaryData ,secondaryData,  page}
}

