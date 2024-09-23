<template>
<main class="v-user v-user--dashboard">
    <h1 class="ov-h h-0">ناحیه کاربری</h1>

    <v-container>
        <v-row>
            <v-col cols="12" md="3">
                <generalUserSidebar />
            </v-col>
            <v-col cols="12" md="9" class="xs-hide">
                <v-card class="py-8 px-4 mobile-pa-0 mobile-no-border">
                    <h2 class="t16 w400 text-grey-darken-3 mb-3">
                        دعوت از دوستان
                    </h2>

                    <ul class="ma-0 pa-0 pr-5">
                        <li class="t14 w400 text-grey-darken-1 number-font">
                            لینک دعوت زیر را برای دوستات بفرست تا با ثبت‌نام در شاواز کد تخفیف 20,000 تومانی هدیه بگیرند.
                        </li>
                        <li class="t14 w400 text-grey-darken-1 number-font mt-1">
                            با اولین سفارش هر دوستت، کیف پول تو هم 15,000 تومان شارژ میشه.
                        </li>

                        <div class="d-flex align-center mt-5">
                            <div class="ml-10 w-50">
                                <label class="d-block t12 text-grey-darken-2 mb-2">کد معرف</label>
                                <v-text-field class="cur-p" color="grey-lighten-3" density="compact" variant="solo" height="42" append-inner-icon="mdi-content-copy" :placeholder="identificationCode" single-line hide-details @click="doCopy(identificationCode)" />
                            </div>

                            <div>
                                <img src="@/assets/images/dashboard-price.jpg" alt="shavaz image" width="155" height="76">
                            </div>
                        </div>
                    </ul>
                </v-card>

                <v-card class="py-8 px-4 mobile-pa-0 mobile-no-border">
                    <h2 class="t16 w400 text-grey-darken-3 mb-3">
                        محصولاتی که اخیرا مشاهده کرده‌اید
                    </h2>
                    <v-row class="ma-0 mt-5">
                        <template v-if="productUserHistory && productUserHistory.length">
                            <generalProductSimpleCard v-for="(product, index) in productUserHistory" class="v-col-sm-4 v-col-lg-2 v-col-12 mb-3" :key="`product${index}`" :href="`/sku/${product?.slug}`" :image="product?.image_url" :label="product?.label" />
                        </template>
                        <template v-else>
                            <generalLoading />
                        </template>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</main>
</template>

<script>
import User from '@/composables/User.js'
import {
    copyText
} from 'vue3-clipboard'

export default {

    data() {
        return {
            identificationCode: '',
            products: [],
            userDetail: null,
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | ناحیه کاربری')
        const description = ref("ناحیه کاربری");
        const userToken = useCookie('userToken');
        const {
            getProductUserHistory,
            productUserHistory
        } = new User()
        /**
         * Copy identification code
         * @param {*} code
         */
        const doCopy = (code) => {
            copyText(code, undefined, (error, event) => {
                if (error) {
                  this.$store.commit('set_snackBar', {
                    show:true , text:'کپی متن با مشکل مواجه شد.' , status:'error'
                  })
                } else {
                  this.$store.commit('set_snackBar', {
                    show:true , text:'متن  با موفقیت کپی شد.' , status:'success'
                  })
                }
            })
        }

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })

        return {
            doCopy,
            userToken,
            getProductUserHistory,
            productUserHistory
        }
    },

    created() {
        this.getProductUserHistory()
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';

.v-user--dashboard {
    .v-field {
        box-shadow: none;
        border: 1px solid var(--grey-grey-lighten-2, #E0E0E0);
    }

    .mdi-content-copy {
        color: #D72685;
        font-size: 18px;
    }

    .v-field__input {
        height: 42px;
    }
}
</style>
