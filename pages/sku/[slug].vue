<template>
<main class="v-product v-product--single">
    <h1 class="v-hide">{{ productLabel }}</h1>
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
                    :items="skuImageGallery" />
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
                            <generalAddToBasket :content="productSelectedSeller" />
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

        const {
            product,
            color,
            getSecondaryData,
            secondaryData,
            getPdpData,
            getBreadcrumb , breadcrumb , title , description
        } = new PDP()
        useHead({
        title,
        meta: [{
          name: 'description',
          content: description
        },
          {
            name: 'title',
            content: title
          }]
      });
        return {
            product,
            color,
            getSecondaryData,
            secondaryData,
            getPdpData,
          getBreadcrumb , breadcrumb , title , description
        }

    },
    data() {
        return {
            screenType: null,
            content: null,

            selectedSeller: null,
            /** cheaper seller or selected seller*/
        }
    },

    computed: {
      breadcrumbList(){
        let breadcrumb = []
        if(this.breadcrumb?.category_l1){
          const form = {
            type : "category_l1",
            href: `/category/${this.breadcrumb.category_l1.slug}`,
            title: this.breadcrumb.category_l1.name
          }
          breadcrumb.push(form)

        }
        if(this.breadcrumb?.category_l2){
          const form = {
            type : "category_l2",
            href: `/category/${this.breadcrumb.category_l2.slug}`,
            title: this.breadcrumb.category_l2.name
          }
          breadcrumb.push(form)

        }
        if(this.breadcrumb?.category_l3){
          const form = {
            type : "category_l3",
            href: `/category/${this.breadcrumb.category_l3.slug}`,
            title: this.breadcrumb.category_l3.name
          }
          breadcrumb.push(form)

        }

        if(this.breadcrumb?.product){
          const form = {
            type : "product",
            href: `/product/${this.breadcrumb.product.slug}`,
            title: this.breadcrumb.product.name
          }
          breadcrumb.push(form)

        }
        if(this.breadcrumb?.sku_group){
          const form = {
            type : "sku_group",
            href: `/sku-group/${this.breadcrumb.sku_group.slug}`,
            disabled: false,
            title: this.breadcrumb.sku_group.name
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

    beforeMount() {
      this.getSecondaryData()
      this.getBreadcrumb('sku')
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
