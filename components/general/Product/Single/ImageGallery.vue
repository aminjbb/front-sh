<template>
<div v-if="items && items.length" class="image-gallery">
    <v-row class="ma-0 xs-hide h-100">
        <div class="pa-0 pl-3 image-gallery__thumbnail h-100">
            <div class="d-flex flex-column align-center">
                <template v-if="items.length <= 5">
                    <div
                        class="image-gallery__thumbnail__item"
                        v-for="(item, index) in items"
                        :key="`image-gallery__thumbnail-${index}`">
                      <generalKitsImageSimage :src="item.image_url" :alt="item.alt" width="70" height="70"  @click="selectImage(item.image_url)"/>
                    </div>
                </template>

                <template v-else v-for="(item, index) in items.slice(0, 5)" :key="`image-gallery__thumbnail-${index}`">
                    <div v-if="index === 0 || index === 1 || index === 2 || index === 3" class="image-gallery__thumbnail__item">
                      <generalKitsImageSimage :src="item.image_url" :alt="item.alt" width="70" height="70"  @click="selectImage(item.image_url)"/>
                    </div>

                    <div
                        v-if="index === 4"
                        class="image-gallery__thumbnail__item"
                        @click="openModal()">
                        <img :src="items[4].image_url" :alt="items[4].alt" width="70" height="70">

                        <span>
                            <v-icon
                                icon="mdi-dots-horizontal"
                                color="grey-darken-1"
                                size="small" />
                        </span>
                    </div>
                </template>
            </div>
        </div>

        <div class="pa-0 pr-3  h-100">
            <div class="image-gallery__selected-image">
                <div class="image-gallery__selected-image__icons d-flex align-center">
                    <v-icon
                        icon="mdi-share-variant-outline"
                        color="grey-lighten-1"
                        @click="doCopy()"
                        size="small" />

                    <v-icon
                        :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
                        :color="isFavorite ? 'red' : 'grey-lighten-1'"
                        @click="checkFavorite()"
                        size="small" />
                </div>
              <generalKitsImageSimage :lazy="false" :src="selectedImage" :alt="imageAlt" width="351" height="351"/>
            </div>
        </div>
    </v-row>

    <div class="xs-show">
        <div class="pb-2">
            <div class="image-gallery__selected-image__icons d-flex align-center">
                <v-icon
                    icon="mdi-share-variant-outline"
                    color="grey-lighten-1"
                    @click="doCopy()"
                    size="small" />

                <v-icon
                    :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
                    :color="isFavorite ? 'red' : 'grey-lighten-1'"
                    @click="checkFavorite()"
                    size="small" />
            </div>

            <swiper
                :pagination="true"
                :modules="modules"
                class="mySwiper mobile-gallery-height"
                :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false,
                }">
                <swiper-slide
                    v-for="(item,index) in items"
                    :key="index"
                    class="h-100">
                    <div @click="openModal()" class="d-flex w-100 align-center justify-center h-100">
                      <generalKitsImageSimage :lazy="false" :src="item.image_url" :title="item.alt"  width="300" height="300"/>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</div>

<div class="c-modal">
    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        width="850px">
        <v-card class="pt-3 px-6 pb-5 image-gallery-modal">
            <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                <div class="d-flex flex-column c-modal__header__title mt-4">
                    <span class="t16 w400 mb-3">
                        آلبوم تصاویر
                    </span>
                    <span class="t12 w400 text-grey mb-2">{{ imageAlt }}</span>
                </div>

                <v-btn
                    class="c-modal__header__btn pa-0 text-none"
                    @click="closeModal()"
                    color="grey-darken-1"
                    size="large"
                    variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <v-row class="pt-3">
                <v-col
                    cols="12"
                    md="6"
                    lg="7">
                    <swiper
                        :navigation="true"
                        @swiper="setSwiperRef"
                        :modules="modules"
                        :spaceBetween="0"
                        class="mySwiper mb-5">
                        <swiper-slide v-for="(item,index) in items" :key="index">
                            <article class="image-gallery-modal__item">
                                <img :title="title" :src="item?.image_url" :alt="title" width="351" height="351" />
                            </article>
                        </swiper-slide>
                    </swiper>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                    lg="5"
                    class="pr-10 image-gallery-modal__thumbnail">
                    <div>
                        <v-row class="ma-0 ltr">
                            <div
                                v-for="(item, index) in items"
                                @click="slideTo(index + 1)"
                                :key="`slider-thumbs-${index}`"
                                :id="`slider-thumbs-${index}`"
                                class="image-gallery-modal__thumbnail__item">
                                <img :src="item?.image_url" :title="title" :alt="title" width="86" height="86" />
                            </div>
                        </v-row>
                    </div>
                </v-col>
            </v-row>

        </v-card>
    </v-dialog>
</div>
</template>

<script>
// Import Swiper Vue.js components
import {
    ref
} from 'vue';
// Import Swiper Vue.js components
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import {
    FreeMode,
    Navigation,
    Pagination,
    Autoplay
} from 'swiper/modules';

// import copyText package
import {
    copyText
} from 'vue3-clipboard'
import {
    useRoute
} from "vue-router";
import axios from "axios";

export default {
    data() {
        return {
            selectedImage: this.items ? this.items[0] ?.image_url : '',
            dialog: false,
            isFavorite: false,
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        /**
         * Image gallery items
         */
        items: Array,

        /**
         * image alt
         */
        imageAlt: String,

        /**
         * productSelectedSeller for add to favorite or delete favorite sku
         */
        productSelectedSeller: Object,

        /**
         * productSelectedSeller for add datalayer
         */
        productDetail: Object,

        /**
         * wishlist for sku-item
         */
        wishlist: Object,

        /**
         * getPdpData method for get pdp data after add sku to favorite
         */
        getPdpData: Function,

        /**
         * Get category for Data-layer
         */
         productCategory:String,

    },
    setup() {
        const route = useRoute()
        const userToken = useCookie('userToken')
        const runtimeConfig = useRuntimeConfig()

        let swiperRef = null;

        const setSwiperRef = (swiper) => {
            swiperRef = swiper;
        };

        const slideTo = (index) => {
            swiperRef.slideTo(index - 1, 0);

            const allClass = document.querySelectorAll('div.image-gallery-modal__thumbnail__item');
            allClass.forEach(item => {
                item.classList.remove('active');
            });

            document.getElementById(`slider-thumbs-${index - 1}`).classList.add('active');
        };

        /**
         * Copy address
         */
        const doCopy = () => {
            copyText(`https://shavaz.com${route.path}`, undefined, (error, event) => {
                if (error) {
                  this.$store.commit('set_snackBar', {
                    show:true , text:'کپی لینک با مشکل مواجه شد.' , status:'error'
                  })
                } else {
                  this.$store.commit('set_snackBar', {
                    show:true , text:'لینک  با موفقیت کپی شد.' , status:'success'
                  })
                }
            })
        }

        return {
            swiperRef: null,
            setSwiperRef,
            slideTo,
            modules: [FreeMode, Navigation, Pagination, Autoplay],
            doCopy,
            userToken,
            runtimeConfig
        };

    },
    methods: {

        /**
         * Show selected image
         * @param {*} imageAddress
         */
        selectImage(imageAddress) {
            this.selectedImage = imageAddress;
        },

        /**
         * Open modal
         */
        openModal() {
            this.dialog = true;
        },

        /**
         * Close modal
         */
        closeModal() {
            this.dialog = false;
        },

        /**
         * check sku is favorite
         */

        checkFavorite() {
            if (this.userToken) {
                this.isFavorite = !this.isFavorite
                if (this.isFavorite){
                    this.addToFavorite()

                    window.dataLayer = window.dataLayer || [];
                    const addToWishListItem ={
                      items: [{// an array where all currently viewed products must be included
                        item_id: this.productDetail.id,// insert an actual product ID
                        price: Number(String(this.productSelectedSeller?.site_price).slice(0, -1)),// insert an actual product price. Number or a string. Don't include currency code
                        item_brand: this.productDetail?.brand_label,// insert an actual product price
                        item_category: this.productCategory,	// insert an actual product top-level category
                        name: this.productDetail?.label
                      }]
                    }
                    window.dataLayer.push({
                        event: 'add_to_wishlist', // name of the event. In this case, it always must be add_to_wishlist
                        ecommerce:addToWishListItem
                    });
                    try {
                      window.zebline.event.track('add_to_wishlist' , addToWishListItem)

                    }
                    catch (e) {


                    }
                }
                   
                else{
                  this.deleteFavorite()
                }
            } else {
              this.$store.commit('set_snackBar', {
                show:true , text:'کاربر محترم ابتدا لاگین کنید.' , status:'error'
              })
            }

        },

        /**
         * addToFavorite
         */
        addToFavorite() {
            axios.post(this.runtimeConfig.public.apiBase + `/product/wishlist/crud/create/`, {
                    sku_id: this.productSelectedSeller.sku_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },

                })
                .then((response) => {
                    this.getPdpData();
                  this.$store.commit('set_snackBar', {
                    show:true , text:'محصول با موفقت به لیست علاقه مندی ها اضافه شد.', status:'success'
                  })
                })
                .catch((err) => {

                }).finally(() => {

                })
        },
        /**
         * deleteToFavorite
         */
        deleteFavorite() {
            axios.delete(this.runtimeConfig.public.apiBase + `/product/wishlist/crud/delete/${this.productSelectedSeller.sku_id}`, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                  this.$store.commit('set_snackBar', {
                    show:true , text:'محصول با موفقت از لیست علاقه مندی ها حذف شد.' , status:'success'
                  })
                })
                .catch((err) => {

                }).finally(() => {

                })
        },
    },
    
    watch: {
        items() {
            if (this.items ?.length) this.selectImage(this.items[0].image_url)
        },
        wishlist() {
            if (this.wishlist.is_favorite) this.isFavorite = true
            else this.isFavorite = false
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/components/general/products/image-gallery.scss";
</style>

<style lang="scss" scoped>
.mobile-gallery-height{
    height:400px;
}

.c-modal {
    .v-card {
        background: #fff !important;
    }

    &__header {
        border-bottom: 1px solid #E0E0E0;

        &__btn {
            min-width: auto !important;
        }

        &__title span:first-child {
            color: #424242 !important;
            font-size: 16px !important;
        }
    }
}
</style>
