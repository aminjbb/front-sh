/**
 * User composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute} from "vue-router";
import auth from "~/middleware/auth.js";
import {useStore} from 'vuex'

export default function setup() {
    const productList = ref([]);
    const secondaryData = ref([]);
    const breadcrumb = ref(null);
    const page = ref(1);
    const filterQuery = ref([]);
    const filterForFilter = ref('');
    const endPoint = ref(null);
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()
    const store = useStore()
    const query = ref('')
    const plpTitle = ref('')
    const description = ref('')
    const structuredDataBreadcrumb = ref(null)


    function checkRouteForSlug() {
        if (route.name != 'search') {
             return route.params.slug
        }
        return  ''
    };

    async function getSecondaryData() {
        axios
            .get(runtimeConfig.public.apiBase + `${endPoint.value}page/data/${route.params.slug}`, {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
            })
            .then((response) => {
                secondaryData.value = response
                plpTitle.value = response.data.data.page.meta_title
                description.value = response.data.data.page.meta_description
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

                /** create schema object from breadcrumb.value*/
                const schemaBreadcrumbList = []

                const sortBreadcrumb = Object.entries(breadcrumb.value).reverse();

                sortBreadcrumb.forEach(([key, value], index) => {
                    const schemaObj = {
                        "@type": "ListItem",
                        "position": index+1,
                        "name": value.name,
                        "item": key.includes('category') ? `${runtimeConfig.public.siteUrl}/category/${value.slug}` : key.includes('product') ? `${runtimeConfig.public.siteUrl}/product/${value.slug}`: key.includes('sku_group') ? `${runtimeConfig.public.siteUrl}/sku-group/${value.slug}`: ''
                    }
                    schemaBreadcrumbList.push(schemaObj);
                });
                /** breadcrumb schema structure */
                structuredDataBreadcrumb.value = {
                    "@context": "http://schema.org/",
	                "@type": "BreadcrumbList",
                    itemListElement : schemaBreadcrumbList
                }
                /** Set useHead for schema */
                useHead({
                    script: [{ type: 'application/ld+json', children: JSON.stringify(structuredDataBreadcrumb.value) }]
                })
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
    else if (route.name == 'search') endPoint.value = `/product/plp/search/`
    store.commit('set_loadingModal', true),
        useAsyncData(
            () => {
                let url = "".concat(
                    runtimeConfig.public.apiBase,
                    endPoint.value,
                    checkRouteForSlug()
                );

                axios({
                    method: 'get',
                    url: url,
                    headers: {
                        Authorization: `Bearer ${userToken.value}`,
                    },
                    params: {...route.query}
                })
                    .then(response => {
                        productList.value = response
                        if(route.name == 'promotion-slug'){
                            plpTitle.value = response.data.data.page.meta_title
                        }
                    })
                    .catch(err => {
                        if (err.response.status) {
                            showError({
                                statusCode: 404,
                                statusMessage: "Page Not Found"
                            })
                        }
                    }).finally(() => {
                    store.commit('set_loadingModal', false)
                })
            },
            {
                watch: [route]
            }
        )

    return {
        productList, filterQuery, getSecondaryData, secondaryData, page, filterForFilter, query,
        getBreadcrumb, breadcrumb , description , plpTitle
    }
}

