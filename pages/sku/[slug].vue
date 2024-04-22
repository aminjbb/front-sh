<template>
<main class="v-product v-product--single">
    <h1 class="v-hide">{{ title }}</h1>
    <v-container>
        <generalBreadcrumb :items="breadcrumbList" />

        <v-row>
            <v-col
                class="pa-3"
                cols="12"
                lg="5">
                <generalProductSingleImageGallery
                    :getPdpData="getPdpData"
                    :wishlist="wishlist"
                    :productSelectedSeller="productSelectedSeller"
                    :items="skuImageGallery"
                    :productDetail="productDetail"/>
            </v-col>

            <v-col
                class="pa-3"
                cols="12"
                lg="7">
                <generalProductSingleDetails :content="productDetail" />

                <template v-if="screenType !== null && screenType === 'desktop'">
                    <v-row class="v-product--single__border ma-0 px-1 mt-5">
                        <v-col md="7" lg="8">
                            <desktopProductSingleSelectedSeller :content="productSelectedSeller" />
                        </v-col>
                        <v-col md="5" lg="4">
                   
                            <generalAddToBasket 
                                :content="productSelectedSeller" 
                                :productDetails="productDetail"  
                                :productCategory="this.breadcrumb?.category_l2?.slug ? this.breadcrumb.category_l2.slug : this.breadcrumb?.category_l1?.slug"
                                />
                        </v-col>
                    </v-row>
                </template>

                <template v-else-if="screenType !== null && screenType === 'mobile'">
                    <v-row class="v-product--single__border ma-0 px-1 mt-5">
                        <v-col md="7" lg="8">
                            <mobileProductSingleSelectedSeller :content="productSelectedSeller" :sellers="productSellers" />
                        </v-col>
                    </v-row>
                </template>
            </v-col>
        </v-row>

        <template v-if="screenType !== null && screenType === 'desktop'">
            <generalAboutOurValues class="v-product--single__values ma-0 mt-5 mb-10" />

            <!-- TODO: When we have seller should uncomment this part -->
            <!-- <div class="v-product--single__border mt-5" id="seller-list">
                <template v-for="(seller, index) in productSellers" :key="`seller${index}`">
                    <generalProductSingleSellerCard :seller="seller" />
                </template>
            </div> -->
        </template>

        <mobileHomeSection8Slider
            v-if="relatedProducts?.length"
            class="mt-5 pb-3"
            :items="relatedProducts"
            title="محصولات مشابه"
            hideIndex
            isPLP
            navigation />

        <generalProductSingleCompleteDetails
            :description="pdpSecondaryData?.story"
            :attrs="pdpSecondaryData?.specifics"
            :instructions="pdpSecondaryData?.how_to_use"
            :advantages="pdpSecondaryData?.advantage"
            :disadvantages="pdpSecondaryData?.disadvantage"
            :userUse = "pdpSecondaryData?.uses_case"/>

<!--        <v-divider color="grey" class="mt-5" />-->

        <generalProductSingleComments :productSelectedSeller="productSelectedSeller" :comments="skuComments" :getSecondaryData="getSecondaryData" />

        <template v-if="screenType !== null && screenType === 'mobile'">
            <div class="mobile-basket">
                <generalAddToBasket
                    :content="productSelectedSeller"
                    :productCategory="this.breadcrumb?.category_l2?.slug ? this.breadcrumb.category_l2.slug : this.breadcrumb?.category_l1?.slug"
                    :productDetails="productDetail"
                    revers="revers"
                    :mdCols="['6','6']"
                    :smCols="['4','8']" />
            </div>
        </template>

    </v-container>
</main>
</template>

<script>
import PDP from '@/composables/PDP.js'

export default {
    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات فروشگاه شاواز');

        const {
            product,
            color,
            getSecondaryData,
            secondaryData,
            getPdpData,
            getBreadcrumb , breadcrumb , skuTitle , description
        } = new PDP()

        useHead({
            title,
            meta: [{
            name: 'description',
            content: description,
            }],
        });

        return {
            product,
            color,
            getSecondaryData,
            secondaryData,
            getPdpData,
            getBreadcrumb , breadcrumb , title , description,skuTitle
        }

    },
    data() {
        return {
            screenType: null,
            content: null,

            selectedSeller: null,
            called :false
        }
    },

    computed: {
      breadcrumbList(){
        let breadcrumb = []
        if(this.breadcrumb?.category_l1?.name){
          const form = {
            type : "category_l1",
            href: `/category/${this.breadcrumb.category_l1?.slug}`,
            title: this.breadcrumb.category_l1?.name
          }
          breadcrumb.push(form)

        }
        if(this.breadcrumb?.category_l2?.name){
          const form = {
            type : "category_l2",
            href: `/category/${this.breadcrumb.category_l2?.slug}`,
            title: this.breadcrumb.category_l2?.name
          }
          breadcrumb.push(form)

        }
        if(this.breadcrumb?.category_l3?.name){
          const form = {
            type : "category_l3",
            href: `/category/${this.breadcrumb.category_l3?.slug}`,
            title: this.breadcrumb.category_l3?.name
          }
          breadcrumb.push(form)

        }

        if(this.breadcrumb?.product?.name){
          const form = {
            type : "product",
            href: `/product/${this.breadcrumb?.product?.slug}`,
            title: this.breadcrumb?.product?.name
          }
          breadcrumb.push(form)

        }
        if(this.breadcrumb?.sku_group?.name){
          const form = {
            type : "sku_group",
            href: `/sku-group/${this.breadcrumb?.sku_group?.slug}`,
            disabled: false,
            title: this.breadcrumb?.sku_group?.name
          }
          breadcrumb.push(form)

        }

        return breadcrumb
      },
        productDetail() {
            try {
                
                return this.product.data.data
            } catch (e) {
                return ''
            }
        },

        wishlist() {
            try {
                return this.productDetail.wishlist
            } catch (e) {
                return null
            }
        },

        productSelectedSeller() {
            try {
              if (this.$route.query.shps){
                const findShps =  this.productDetail.shps_list.find(shps=> shps.id == this.$route.query.shps)
                return findShps
              }
              return this.productDetail.shps_list[0]
            } catch (e) {
                return ''
            }
        },

        productSellers() {
            try {
                return this.productDetail.shps_list
            } catch (e) {
                return ''
            }
        },

        relatedProducts() {
            try {
                return this.secondaryData ?.data ?.data ?.related_products
            } catch (e) {
                return []
            }
        },

        pdpSecondaryData() {
            try {
                return this.secondaryData ?.data ?.data
            } catch (e) {
                return []
            }
        },
        skuComments() {
            try {
                return this.pdpSecondaryData.comments.data
            } catch (e) {

            }
        },

        skuImageGallery() {
            try {
                return this.pdpSecondaryData ?.image_gallery
            } catch (e) {
                return []
            }
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

    watch:{
        skuTitle(newVal){
            this.title = newVal
        },

        productDetail(newValue, oldValue) {
            if(newValue && newValue !== null && this.breadcrumb !== null){
                this.handleWatchChange();
                this.called = true;
            }
        },

        breadcrumb(newValue, oldValue) {
            if(newValue && newValue !== null && this.productDetail !== null && this.called === false){
                this.handleWatchChange();
                this.called = true;
            }
        }
    },

    methods:{
        handleWatchChange() {
            if(this.productDetail){
                this.enhanceECommerce(this.productDetail,this.productSelectedSeller)
            }
        },

        /**
         * Enhance E-commerce for Seo
         * @param {*} product 
         * @param {*} price 
         */
        enhanceECommerce(product,price){
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'view_item',  // name of the event. In this case, it always must be view_item_list
                ecommerce: {							
                    items: [{		// an array where all currently viewed products must be included
                    item_id: product.id,	// insert an actual product ID
                    price: price.customer_price,	// insert an actual product price. Number or a string. Don't include currency code
                    comercial_price: price.site_price, // insert an actual product price after comercial discount
                    item_brand: product?.brand_label,	// insert an actual product price
                    item_category: this.breadcrumb?.category_l2?.slug ? this.breadcrumb.category_l2.slug : this.breadcrumb?.category_l1?.slug,			// insert an actual product top-level category
                    section_name: product?.label, // insert the name of the list where the product is currently displayed
                    item_color: null,  // insert the color of product select
                    }]
                }
            });
        }
    },

    beforeMount() {
      this.getBreadcrumb('sku')
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
