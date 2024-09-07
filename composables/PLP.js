/**
 * PLP composable
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
    const loading =ref(true)
    const categoryList = ref([]);
    const lastCategoryImage = ref(null)

    function checkRouteForSlug() {
        if (route.name != 'search') {
             return route.params.slug
        }
        return  ''
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

                const homeSchemaObj = {
                    "@type": "ListItem",
                    "position": 1,
                    "name": 'خانه',
                    "item": runtimeConfig.public.siteUrl
                }

                schemaBreadcrumbList.push(homeSchemaObj);

                breadcrumb.value.forEach((value, index) => {
                    const schemaObj = {
                        "@type": "ListItem",
                        "position": index+2,
                        "name": value.name,
                        "item": runtimeConfig.public.siteUrl + value.slug
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

        useAsyncData(
            async () => {
                let url = "".concat(
                    runtimeConfig.public.apiBase,
                    endPoint.value,
                    checkRouteForSlug()
                );

                try {
                    loading.value = true;
                    // First API
                    const response1 = await axios({
                        method: 'get',
                        url: url,
                        headers: {
                            Authorization: `Bearer ${userToken.value}`,
                        },
                        params: {...route.query}
                    });
                    
                    if(route.name !== 'promotion-slug' && route.name !=='search' && route.name !=='sku-group-slug'){
                        // Second API
                        const response2 = await axios({
                            method: 'get',
                            url: runtimeConfig.public.apiBase + `${endPoint.value}page/data/${route.params.slug}`,
                            headers: {
                                Authorization: `Bearer ${userToken.value}`,
                            },
                        });

                        if(response1 && response2){
                            productList.value = response1;
    
                            secondaryData.value = response2;
                            plpTitle.value = response2.data.data.page.meta_title;
                            description.value = response2.data.data.page.meta_description;
                            categoryList.value = response2.data.data?.categories

                            lastCategoryImage.value = categoryList.value.find(item => item.is_selected == true);
                        }
                    }

                    if(route.name == 'promotion-slug' || route.name =='search' || route.name =='sku-group-slug'){
                        productList.value = response1;

                        if(route.name == 'promotion-slug'){
                            plpTitle.value = response1.data.data.page.meta_title
                            description.value = response1.data.data.page.meta_description;
                        }
                    }

                } catch (error) {
                    if (error.response) {
                        showError({
                            statusCode: error.response.status,
                            statusMessage: error.response.statusText
                        });
                    }
                }
                finally{
                    loading.value= false
                }
            },
            {
                watch: [route]
            }
        );
        

    return {
        productList, filterQuery, secondaryData, page, filterForFilter, query,
        getBreadcrumb, breadcrumb , description , plpTitle , loading, categoryList, lastCategoryImage
    }
}

