/**
 * User composable
 */
import {ref} from 'vue';
import axios from 'axios'
import {useRoute} from "vue-router";
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
    const productIdMeta = ref('')
    const productNameMeta = ref('')
    const ogImage = ref('')
    const productPriceMeta = ref('')
    const productOldPriceMeta = ref('')
    const availability = ref('')
    const structuredData = ref(null)
    const loading = ref(true)


    async function getPdpData(orderType) {
        axios.get(runtimeConfig.public.apiBase + `/product/pdp/info/${route.params.slug}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken.value}`,
                },
                params: {
                    order_type:orderType
                }
            })
            .then((response) => {
                secondaryData.value =response.data?.data?.detail
            })
            .catch((err) => {
                if (err.response.status) {
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
            async () => {
                try {
             
                    // First API - product
                    const mainResponse = await axios({
                        method: 'get',
                        url: runtimeConfig.public.apiBase + `/product/pdp/info/${route.params.slug}`,
                        headers: {
                            Authorization: `Bearer ${userToken.value}`,

                        },
                        params: {...route.query}
                    }).catch((err) => {
                        showError({
                            statusCode: 404,
                            statusMessage: "Page Not Found"
                        })
                    });

                    if (mainResponse) {
                        breadcrumb.value =mainResponse.data?.data?.breadCrumb
                        secondaryData.value =mainResponse.data?.data?.detail
                        product.value = mainResponse.data?.data?.info
                        skuTitle.value = mainResponse.data?.data?.info.page.meta_title
                        description.value =mainResponse.data?.data?.info.page.meta_description
                        productIdMeta.value =mainResponse.data?.data?.info?.id
                        productNameMeta.value =mainResponse.data?.data?.info?.label
                        ogImage.value =mainResponse.data?.data?.info?.primary_image_url
                        productPriceMeta.value =mainResponse.data?.data?.info?.shps_list[0]?.customer_price
                        productOldPriceMeta.value =mainResponse.data?.data?.info?.shps_list[0]?.site_price
                        if (mainResponse.data?.data?.info?.shps_list[0]?.stock === 1)   availability.value = 'instock'
                        else  availability.value = 'outofstock'

                        /**Schema - structured data */
                        structuredData.value = {
                            "@context": "http://schema.org/",
                            "@type": "Product",
                            "name": mainResponse.data?.data?.info.label,
                            "image": mainResponse.data?.data?.info.primary_image_url,
                            "description": mainResponse.data?.data?.info.label,
                            "url": `${runtimeConfig.public.siteUrl}/sku/${response.data.data.slug}`,
                            "brand": {
                                "@type": "Brand",
                                "name": mainResponse.data?.data?.info.brand_name
                            },
                            "offers": {
                                "@type": "Offer",
                                "priceCurrency": "IRR",
                                "availability": "http://schema.org/InStock",
                                "price":mainResponse.data?.data?.info?.shps_list[0].customer_price,
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": mainResponse.data?.data?.info.score,
                            },
                            "seller": {
                                "@context": "http://schema.org/",
                                "@type": "Organization",
                                "name": "shavaz",
                                "url": "https://shavaz.com/",
                                "countryCode": "IR",
                                "logo": {
                                    "@type": "ImageObject",
                                    "inLanguage": "fa-IR",
                                    "url": `${runtimeConfig.public.siteUrl}/Sign192.png`,
                                    "contentUrl": `${runtimeConfig.public.siteUrl}/Sign192.png`,
                                    "width": 192,
                                    "height": 192,
                                    "caption": "فروشگاه اینترنتی شاواز"
                                }
                            }
                        }
                        useHead({
                            script: [{type: 'application/ld+json', children: JSON.stringify(structuredData.value)}]
                        })
                    }

                } catch (error) {
                    if (error.response) {
                        if (error.response?.status) {
                            showError({
                                statusCode: 404,
                                statusMessage: "Page Not Found"
                            })
                        }
                    }
                } finally {
                    loading.value = false
                }
            }
        );

    return {
        product, color, secondaryData, loading,
        getPdpData,  breadcrumb, skuTitle, description, availability , productOldPriceMeta,
        productPriceMeta , ogImage , productNameMeta , productIdMeta
    }
}

