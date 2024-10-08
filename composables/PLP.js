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
    const selectedLastCategory = ref(null)
    const parentCategory = ref(null)

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

        useAsyncData(
            async () => {
                let url = "".concat(
                    runtimeConfig.public.apiBase,
                    endPoint.value,
                    checkRouteForSlug()
                );

                try {
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
                            response1?.data?.data?.data.slice(0,5).forEach((item, index) => {
                                const schemaObj = {
                                    "@type": "ListItem",
                                    "position": index+1,
                                    "name": item.label,
                                    "item":{
                                        "@type":"Product",
                                        "name":item.label,
                                        "url":`https://shavaz.com/sku/${item.slug}`,
                                        "review":{
                                            "@type":"Review",
                                            "reviewRating":{
                                                "@type":"Rating",
                                                "bestRating":5,
                                                "ratingValue":0 // fix after fix api
                                            },
                                            "author":{
                                                "@type":"Person",
                                                "name":"admin"
                                            },
                                            "datePublished":item?.created_at, // fix after fix api
                                            "reviewBody":item?.last_review, // fix after fix api
                                            "name":'',// fix after fix api
                                        },
                                        "aggregateRating":{
                                            "@type":"AggregateRating",
                                            "ratingValue":3,// fix after fix api
                                            "reviewCount":item?.review_count// fix after fix api
                                        },
                                        "image":item.image_url
                                    }
                                }
                                schemaList.push(schemaObj);
                            });

                            /** item list schema structure */
                            structuredDataItem.value = {
                                "@context": "http://schema.org/",
                                "@type": "BreadcrumbList",
                                itemListElement : schemaList
                            }
                            /** Set useHead for schema */
                            useHead({
                                script: [{ type: 'application/ld+json', children: JSON.stringify(structuredDataItem.value) }]
                            })  


                            productList.value = response1;
    
                            secondaryData.value = response2;
                            plpTitle.value = response2.data.data.page.meta_title; // Get `title` of page
                            description.value = response2.data.data.page.meta_description; // Get `description` of page 
                            categoryList.value = response2.data.data?.categories // Get category page
                            selectedLastCategory.value = categoryList.value.find(item => item.is_selected == true); // Get last category with is_selected: true
                            parentCategory.value = response2.data.data?.parent_category // Get category patent name for categories page
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
        getBreadcrumb, breadcrumb , description , plpTitle , loading, categoryList, selectedLastCategory, parentCategory
    }
}

