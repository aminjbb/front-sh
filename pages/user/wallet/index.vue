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
                        <generalWalletCard :wallet="userWallet.wallet?.wallet" />
                    </div>

                    <div class="col-7 pa-3">
                        <generalWalletTransaction
                            :details="this.userWallet?.total"
                            :tableHeader="tableHeader"
                            :items="formatTransaction" />
                    </div>
                </v-row>
            </div>
        </v-row>
    </v-container>
    <generalWalletModalResult ref="resultModal" type="increase" title="پرداخت موفق" :content="getLastTransaction" :phoneNumber="userWallet.phone_number"/>
</main>
</template>

<script>
import User from '@/composables/User.js';

export default {

    data() {
        return {
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
        }
    },

    setup() {
        const userToken = useCookie('userToken');

        const title = ref('فروشگاه اینترنتی شاواز | کیف پول')
        const description = ref("شارژ کیف پول، برداشت از کیف پول، کیف پول کاربر، پنل کیف پول")

        const {
            getUserWallet,
            userWallet
        } = new User()

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]

        })

        return {
            userToken,
            getUserWallet,
            userWallet
        };
    },

    computed: {
        formatTransaction() {
            const transactionArray = [];
            if (this.userWallet.transactions && this.userWallet.transactions.success_transactions && this.userWallet.transactions.success_transactions.length > 0) {

                this.userWallet.transactions.success_transactions.forEach(element => {
                    const obj = {
                        type: element.type,
                        price: element.amount,
                        code: element.order_id,
                        date_fa: element.created_at_fa,
                    }
                    transactionArray.push(obj);
                })
            }

            const finalArray = transactionArray.reverse();
            return finalArray;
        },

        getLastTransaction(){
            if(this.userWallet.transactions && this.userWallet.transactions.length > 0){
                return this.userWallet.transactions[this.userWallet.transactions.length -1];
            }
            return '';
        }
    },

    mounted() {
        if (!this.userToken) {
            window.location = '/login';
        } else {
            this.getUserWallet();
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            this.$refs.resultModal.openModal();
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/wallet.scss';
</style>
