<template>
<main class="v-user v-user--favorite-list pt-15">
    <h1 class="ov-h h-0">لیست علاقمندی‌ها</h1>

    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">لیست علاقمندی‌ها</span>
    </header>

    <v-container class="pt-0">
        <v-row>
            <div class="col-3 py-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4">
                <v-card class="pa-8 mobile-pa-0 mobile-no-border has-header">
                    <header class="card__header">لیست علاقمندی‌ها</header>
                    <v-row v-if="wishList && wishList.data && wishList.data.length > 0" class="favorite-list ma-0">
                        <v-col
                            v-for="(item, index) in wishList.data"
                            :key="`favorite${index}`"
                            cols="12"
                            class="favorite-list__item"
                            lg="4"
                            md="6">
                            <generalProductCard
                                :ref="`product${item.id}`"
                                hideInfo
                                functions
                                removeIcon
                                deleteIcon
                                isPLP
                                @removeProduct="removeProduct"
                                :index = "index + 1"
                                sectionName = "لیست علاقه منده ها"
                                :content="item" />
                        </v-col>
                    </v-row>

                    <template v-else>
                        <div class="d-flex flex-column justify-center align-center pt-15 pb-15">
                            <svgEmptyFavoriteList class="mt-10"/>

                            <span class="t14 w400 text-grey-darken-1 mt-2">لیست علاقمندی‌های شما خالی است.</span>

                            <v-btn
                                href="/"
                                title="بازدید از سایت"
                                class="mt-5 btn btn--cancel mb-10 px-8">
                                بازدید از سایت
                            </v-btn>
                        </div>
                    </template>
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {}
    },

    setup() {
        const userToken = useCookie('userToken');

        const title = ref('فروشگاه اینترنتی شاواز | لیست علاقه‌ مندی‌ ها');
        const description = ref("لیست علاقه‌ مندی ها");

        const runtimeConfig = useRuntimeConfig()

        const {
            getUserWhishList,
            wishList
        } = new User();

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        });

        return {
            userToken,
            getUserWhishList,
            wishList,
            runtimeConfig
        };
    },

    methods: {
        /**
         * Remove product from favorite list
         * @param {*} content 
         */
        removeProduct(content) {
            axios
                .delete(this.runtimeConfig.public.apiBase + `/product/wishlist/crud/delete/${content.id}`, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    this.closeModal();

                    useNuxtApp().$toast.success('محصول مورد نظر، با موفقیت از لیست علاقه مندی های شما حذف شد.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });

                })
                .catch((err) => {
                    if(err.response?.data?.message){
                        useNuxtApp().$toast.error(err.response.data.message, {
                            rtl: true,
                            position: 'top-center',
                            theme: 'dark'
                        });
                    }
                }).finally(() => {
                    this.loading = false;
                    this.$refs[`product${content.id}`][0].$refs.refRemoveProduct.loading = false;
                    this.$refs[`product${content.id}`][0].$refs.refRemoveProduct.dialog = false;
                    this.getUserWhishList();
                });
        }
    },

    mounted() {
        this.getUserWhishList();
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
.v-user--favorite-list{
    .btn--submit{
        width: 100%;
    }
}
</style>
