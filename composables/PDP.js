/**
 * User composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute} from "vue-router";
import auth from "~/middleware/auth.js";
import {useStore} from 'vuex'

export default function setup() {
    const product = ref([]);
    const secondaryData = ref([]);
    const breadcrumb = ref(null);
    const color = ref(null);
    const runtimeConfig = useRuntimeConfig()
    const userToken = useCookie('userToken')
    const route = useRoute()
    const store = useStore()
    const skuTitle = ref('')
    const description = ref('')
    const structuredData = ref(null)
    const structuredDataBreadcrumb = ref(null)

    async function getSecondaryData() {
        axios
            .get(runtimeConfig.public.apiBase + `/product/pdp/details/${route.params.slug}`, {
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

    async function getPdpData() {
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
                skuTitle.value = response.data.data.page.meta_title
                description.value = response.data.data.page.meta_description
                /**Schema - structured data */
                structuredData.value = {
                    "@context": "http://schema.org/",
                    "@type": "Product",
                    "name": response.data.data.label,
                    "image": response.data.data.primary_image_url,
                    "description": response.data.data.label,
                    "url":`${runtimeConfig.public.siteUrl}/sku/${response.data.data.slug}`,
                    "brand": {
                        "@type": "Brand",
                        "name": response.data.data.brand_name
                    },
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "IRR",
                        "availability":"http://schema.org/InStock",
                        "price": response.data.data?.shps_list[0].customer_price,
                    },
                    "aggregateRating":{
                        "@type":"AggregateRating",
                        "ratingValue":response.data.data.score                        ,
                    },
                    "seller":{
                        "@context": "http://schema.org/",
                        "@type": "Organization",
                        "name": "shavaz",
                        "url": "https://shavaz.com/",
                        "countryCode":"IR",
                        "logo":{
                            "@type":"ImageObject",
                            "inLanguage":"fa-IR",
                            "url":`${runtimeConfig.public.siteUrl}/Sign192.png`,
                            "contentUrl":`${runtimeConfig.public.siteUrl}/Sign192.png`,
                            "width":192,
                            "height":192,
                            "caption":"فروشگاه اینترنتی شاواز"
                        }
                    }
                }

                useHead({
                    script: [{ type: 'application/ld+json', children: JSON.stringify(structuredData.value) }]
                })
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

    return {product, color, getSecondaryData, secondaryData ,
        getPdpData,  getBreadcrumb, breadcrumb ,skuTitle , description}
}

