<template lang="">
<main class="v-user v-user--favorite-list">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">لیست علاقمندی‌ها</span>
    </header>

    <v-container class="pt-0">
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4">
                <v-card class="pa-8 mobile-pa-0 mobile-no-border has-header">
                    <header class="card__header">لیست علاقمندی‌ها</header>
                    <v-row class="favorite-list ma-0">
                        <v-col
                            v-for="item in favoriteList"
                            cols="12"
                            class="favorite-list__item"
                            lg="4"
                            md="6">
                            <generalProductCard
                                hideInfo
                                functions
                                removeIcon
                                deleteIcon
                                @removeProduct="removeProduct"
                                :content="item" />
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
export default {
    data() {
        return {
            favoriteList: [{
                    label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
                    customer_price: '89,300',
                },
                {
                    label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
                    customer_price: '89,300',
                },
                {
                    label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
                    customer_price: '89,300',
                },
                {
                    label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
                    customer_price: '89,300',
                },
                {
                    label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
                    customer_price: '89,300',
                }
            ]
        }
    },

    setup(){
        const title = ref('فروشگاه اینترنتی شاواز | لیست علاقه‌ مندی‌ ها')
        const description = ref("لیست علاقه‌ مندی ها")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
    },

    methods: {
        removeProduct(content){
            //TODO: Add remove product from favorite list method
            console.log('level-3',content);
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
</style>

