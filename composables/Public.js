/**
 * Public composable
 */
import { ref} from 'vue';
import axios from 'axios'

export default function setup() {
    const provinces = ref([]);
    const cities = ref([]);
    const loading = ref(false)
    const runtimeConfig = useRuntimeConfig()
    const topBanner = ref({})
    const route = useRoute()
    const categoryList =  ref([])
    
    async function getProvince() {
        axios
            .get(runtimeConfig.public.apiBase +`/system/state/crud/index?per_page=10000`)
            .then((response) => {
                provinces.value = response.data.data
            })
            .catch((err) => {

            });
    };

    async function getCities(id) {
        axios
            .get(runtimeConfig.public.apiBase +`/system/state/crud/get/${id}`)
            .then((response) => {
                cities.value = response.data.data.cities
            })
            .catch((err) => {

            });
    };

    async function getTopBanner() {
        axios
            .get(runtimeConfig.public.apiBase +'/top_banner/get')
            .then((response) => {
                const topBannerResponse = response.data.data;

                let pageName = null;
                if(route.name == 'index') pageName = 'main_page';
                else if(route.name == 'category-slug') pageName = 'category';
                else if(route.name == 'brand-slug') pageName = 'brand';
                else if(route.name == 'product-slug') pageName = 'product';
                else if(route.name == 'sku-group-slug') pageName = 'sku_group';
                else if(route.name == 'promotion-slug') pageName = 'promotion';
                else if(route.name == 'sku-slug') pageName = 'sku';
                else pageName = null;

                topBannerResponse?.pages.forEach(item => {
                    if(item === pageName){
                        let imageAddress =  null;

                        if(window.innerWidth > 1200){
                            imageAddress = topBannerResponse?.desktop_image_url
                        }
                        else if(window.innerWidth <= 1200 && window.innerWidth > 480){
                            imageAddress = topBannerResponse?.tablet_image_url
                        }
                        else if(window.innerWidth <= 480){
                            imageAddress = topBannerResponse?.mobile_image_url
                        }

                        if(imageAddress !== null){
                            topBanner.value = {
                                image: imageAddress,
                                link: topBannerResponse?.link,
                                image_alt: topBannerResponse?.image_alt
                            }
                        }
                    }
                });
            })
            .catch((err) => {

            });
    };

    async function getBestCategoryList() {
        axios
            .get(runtimeConfig.public.apiBase + '/product/plp/category/best-selling')
            .then((response) => {
                categoryList.value = response?.data?.data;
            })
            .catch((err) => {
            });
    };

    return {getProvince, provinces, loading , cities ,getCities, getTopBanner, topBanner, getBestCategoryList,categoryList }
}

