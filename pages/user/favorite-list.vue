<template lang="">
<main class="v-user">
    <v-container class="pt-0">
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalSidebar />
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

    methods: {
        removeProduct(content){
            //TODO: Add remove product from favorite list method
            console.log('level-3',content);
        }
    },
}
</script>
