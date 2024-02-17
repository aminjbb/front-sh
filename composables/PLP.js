/**
 * User composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute, useRouter} from "vue-router";
import auth from "~/middleware/auth.js";
import {useStore} from 'vuex'
import {stringify} from "qs";

export default function setup() {
    const productList = ref([]);
    const secondaryData = ref([]);
    const page = ref(1);
    const filterQuery = ref([]);
    const filterForFilter = ref('');
    const endPoint = ref(null);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()
    const router = useRouter()
    const error = useError();
    const store = useStore()
    const query = ref('')

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
    else if (route.name == 'brand-slug') endPoint.value = '/product/plp/brand/'
    else if (route.name == 'category-slug') endPoint.value = '/product/plp/category/'
    else if (route.name == 'promotion-slug') endPoint.value = '/product/plp/promotion/'
    store.commit('set_loadingModal', true),
        useAsyncData(
            () =>
                axios.get(runtimeConfig.public.apiBase + `${endPoint.value}${route.params.slug}${query.value}`, {
                        ...route.query
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
                      if (err.response.status){
                            showError({
                                statusCode: 404,
                                statusMessage: "Page Not Found"
                            })
                        }
                    }).finally(() => {
                    store.commit('set_loadingModal', false)
                }), {
                watch: [route]
            }
        )

    return {productList, filterQuery, getSecondaryData, secondaryData, page , filterForFilter , query}
}

