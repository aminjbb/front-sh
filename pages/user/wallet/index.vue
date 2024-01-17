<template lang="">
<main class="v-wallet">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">کیف پول</span>
    </header>

    <v-container class="pt-0">
        <v-row>
            <div class="col-3 pa-3 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9">
                <v-row class="ma-0 pa-0">
                    <div class="col-5 pa-3">
                        <generalWalletCard :wallet="walletMocData" />
                    </div>

                    <div class="col-7 pa-3">
                        <generalWalletTransaction
                            :details="detailsMac"
                            :tableHeader="tableHeader"
                            :items="transactionTableMacData" />
                    </div>
                </v-row>
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
            detailsMac: {
                all: '1250000',
                bought: '1105000',
                receive: '98000',
            },
            tableHeader: [{
                title: 'ردیف',
                key: 'index',
            }, {
                title: 'نوع تراکنش',
                key: 'type',
            }, {
                title: 'مبلغ',
                key: 'price',
            }, {
                title: 'کد سفارش',
                key: 'code',
            }, {
                title: 'تاریخ تراکنش',
                key: 'date_fa',
            }],
            transactionTableMacData: [{
                    type: 'decrease',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'increase',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'increase',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'decrease',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'increase',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'decrease',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'increase',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'increase',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'decrease',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'decrease',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'decrease',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'increase',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'decrease',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'increase',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'decrease',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                },
                {
                    type: 'decrease',
                    price: '34300',
                    code: '52589',
                    date_fa: '1402/06/12 - 11:24:52'
                }
            ]
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
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/wallet.scss';
</style>
