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
    const breadcrumb = ref([]);
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
    const structuredDataBreadcrumb = ref(null)
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
                        let productImageGallery =[]
                        mainResponse.data?.data?.detail?.image_gallery.forEach((image)=>{
                            productImageGallery.push(`"${image.image_url}"`)
                        })
                        /**Schema - structured data */
                        structuredData.value = {
                            "@context": "http://schema.org/",
                            "@type": "Product",
                            "name": mainResponse.data?.data?.info.label,
                            "image":productImageGallery ,
                            "description":  mainResponse.data?.data?.detail?.story,
                            "url": `${runtimeConfig.public.siteUrl}/sku/${response.data.data?.info?.slug}`,
                            "mpn": "", //ask milad
                            "datePublished" : mainResponse?.data?.data?.info?.created_at,
                            "reviewBody":mainResponse.data?.data?.detail.comments?.data[0]?.content,
                            "brand": {
                                "@type": "Brand",
                                "name": mainResponse.data?.data?.info.brand_name,
                                "url":`${runtimeConfig.public.siteUrl}/sku/${mainResponse.data?.data?.info.brand_slug}`,
                                "id":`${runtimeConfig.public.siteUrl}/sku/${mainResponse.data?.data?.info.brand_slug}`,
                            },
                            "offers": {
                                "@type": "Offer",
                                "priceCurrency": "IRR",
                                "availability": "http://schema.org/InStock",
                                "price":mainResponse.data?.data?.info?.shps_list[0].customer_price,
                                "itemCondition":"https://schema.org/NewCondition",

                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": mainResponse.data?.data?.info.score,
                                "reviewCount": mainResponse.data?.data?.detail.comments?.data?.length,
                            },
                            "review":{
                                "@type":"Review",
                                "reviewRating":{
                                    "@type":"Rating",
                                    "bestRating":5,
                                    "ratingValue": mainResponse.data?.data?.info.score,
                                }
                            },
                            "author":{
                                "@type":"Person","name":"admin"
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

                        const schemaBreadcrumbList = []

                        const sortBreadcrumb = Object.entries(breadcrumb.value).reverse();

                        sortBreadcrumb.forEach(([key, value], index) => {
                            const schemaObj = {
                                "@type": "ListItem",
                                "position": index+1,
                                "name": value.name,
                                item:{
                                    "@type":"Corporation",
                                    "@id":key.includes('category') ? `${runtimeConfig.public.siteUrl}/category/${value.slug}` : key.includes('product') ? `${runtimeConfig.public.siteUrl}/product/${value.slug}`: key.includes('sku_group') ? `${runtimeConfig.public.siteUrl}/sku-group/${value.slug}`: ''
                                }
                            }
                            schemaBreadcrumbList.push(schemaObj);
                        });
                        structuredDataBreadcrumb.value = {
                            "@context": "http://schema.org/",
                            "@type": "BreadcrumbList",
                            itemListElement : schemaBreadcrumbList
                        }
                        useHead({
                            script: [
                                {type: 'application/ld+json', children: JSON.stringify(structuredData.value)},
                                {type: 'application/ld+json', children: JSON.stringify(structuredDataBreadcrumb.value)}
                            ]
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

