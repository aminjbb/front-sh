<template lang="">
<main class="v-wallet">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">رمز عبور</span>
    </header>

    <v-container class="pt-0">
        <v-row>
            <div class="col-3 pa-3 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-4 pa-3">
                <v-card class="pa-8 mobile-pa-0 mobile-no-border has-header">
                    <header class="card__header">کیف پول</header>
                    <div class="px-6">
                        <div class="wallet-card mt-5 mb-2">
                            <!-- <svgWalletCard class="w-100 h-100" /> -->
                            <div class="pos-a w-100 wallet-card__money">
                                <div class="pos-a d-flex align-center wallet-card__money--1st pa-2">
                                    <span v-if="walletMocData && walletMocData.all_mony" class="text-primary t14 bold number-font">{{splitChar(walletMocData.all_mony)}}</span>
                                    <span class="t11 w300 text-primary mr-2">تومان</span>
                                </div>

                                <div class="pos-a d-flex align-center justify-space-between w-100 wallet-card__money--2nd py-2 px-3">
                                    <span class="t12 w400 text-grey-darken-3">موجودی قابل برداشت: </span>

                                    <div class="d-flex align-center">
                                        <span v-if="walletMocData && walletMocData.accept_mony" class="text-grey-darken-3 t14 bold number-font">{{splitChar(walletMocData.accept_mony)}}</span>
                                        <span class="t11 w300 text-grey-darken-3 mr-2">تومان</span>
                                    </div>
                                </div>

                                <div class="pos-a d-flex align-center justify-space-between w-100 wallet-card__money--3th py-2 px-3">
                                    <span class="t12 w400 text-grey-darken-3">موجودی غیر قابل برداشت:</span>

                                    <div class="d-flex align-center">
                                        <span v-if="walletMocData && walletMocData.forbidden_money" class="text-grey-darken-3 t14 bold number-font">{{splitChar(walletMocData.forbidden_money)}}</span>
                                        <span class="t11 w300 text-grey-darken-3 mr-2">تومان</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-space-between align-center mb-4">
                            <div class="d-flex align-center">
                                <v-icon icon="mdi-plus-circle-outline" size="small" color="grey" class="ml-1"/>
                                <span class="text-grey t14 w500">افزایش موجودی</span>
                            </div>
                            <div class="d-flex align-center justify-end">
                                <div class="d-flex align-center">
                                <v-icon icon="mdi-arrow-top-left-thin-circle-outline" size="small" color="grey" class="ml-1"/>
                                <span class="text-grey t14 w500">برداشت موجودی</span>
                            </div>
                            </div>
                        </div>

                        <v-divider color="grey" class="mb-5"/>

                        <div class="wallet-rules">
                            <div class="d-flex align-top">
                                <v-icon icon="mdi-credit-card-check-outline" size="small" color="deep-purple" class="ml-1"/>
                                <span class="text-deep-purple t12 w400 l20"> موجودی قابل برداشت شامل شارژ کیف پول از طریق مرجوع یا لغو سفارش می‌باشد.</span>
                            </div>

                            <div class="d-flex align-top mt-5">
                                <v-icon icon="mdi-credit-card-remove-outline" size="small" color="deep-purple" class="ml-1"/>
                                <span class="text-deep-purple t12 w400 l20">  موجودی غیر قابل برداشت شامل شارژ کیف پول از طریق معرفی به دوستان، کارت هدیه، کدهای تبلیغاتی و ... می‌باشد. این موجودی تنها قابل استفاده برای ثبت سفارش از شاواز می‌باشد </span>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>

            <div class="col-5 pa-3">
                <v-card class="pa-8 mobile-pa-0 mobile-no-border has-header">
                    <header class="card__header">تراکنش‌ها</header>

                    <div class="px-5 mt-5">
                        <div class="d-flex align-center transactions">
                            <div class="flex-grow-1 d-flex align-center justify-space-between pa-2 transactions__item">
                                <span class="t12 w400 text-grey-darken-3">جمع شارژها:</span>
                                <div class="d-flex align-center">
                                    <span class="t14 number-font bold text-grey-darken-3 ml-1">{{splitChar(1250000)}}</span>
                                    <span class="t10 w400 text-grey-darken-3">تومان</span>
                                </div>
                            </div>

                            <div class="flex-grow-1 d-flex align-center justify-space-between pa-2 transactions__item">
                                <span class="t12 w400 text-grey-darken-3">جمع خریدها:</span>
                                <div class="d-flex align-center">
                                    <span class="t14 number-font bold text-grey-darken-3 ml-1">{{splitChar(1105000)}}</span>
                                    <span class="t10 w400 text-grey-darken-3">تومان</span>
                                </div>
                            </div>

                            <div class="flex-grow-1 d-flex align-center justify-space-between pa-2 transactions__item">
                                <span class="t12 w400 text-grey-darken-3">جمع برگشت ها:</span>
                                <div class="d-flex align-center">
                                    <span class="t14 number-font bold text-grey-darken-3 ml-1">{{splitChar(98000)}}</span>
                                    <span class="t10 w400 text-grey-darken-3">تومان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
import auth from '@/middleware/auth';
import {
    splitChar
} from "~/utils/functions.js";

export default {

    data() {
        return {
            user: null,
            password: null,
            visible: false,
            wallet: null,
            walletMocData: {
                all_mony: '243500',
                accept_mony: '98000',
                forbidden_money: '145000'
            },
            rule: [v => !!v || 'این فیلد الزامی است'],
        }
    },

    setup() {
        const userToken = useCookie('userToken');

        const title = ref('فروشگاه اینترنتی شاواز | کیف پول')
        const description = ref("شارژ کیف پول، برداشت از کیف پول، کیف پول کاربر، پنل کیف پول")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })

        return {
            userToken
        };
    },

    methods: {
        splitChar,

        async fetchUserProfile() {
            try {
                const userProfile = await auth.getUserProfile(this.userToken)
                // Use the userProfile data as needed
                console.log('User Profile Data:', userProfile)
            } catch (error) {
                // Handle errors
            }
        }
    },

    mounted() {
        this.fetchUserProfile();
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/wallet.scss';
</style>
