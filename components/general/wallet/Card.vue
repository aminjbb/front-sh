<template>
<v-card class="wallet pa-8 mobile-pa-0 mobile-no-border has-header">
    <header class="card__header xs-hide">
        <h1 class="t16">کیف پول</h1>
    </header>
    <div class="px-6">
        <v-row class="ma-0 pa-0">
            <div class="pa-0 col-6">
                <div class="wallet-card mt-5 mb-2">
                    <img src="~/assets/images/wallet.svg" class="wallet-card__image" alt="Shavaz wallet image" width="339" height="146">
                    <div class="pos-a w-100 wallet-card__money">
                        <div class="pos-a d-flex align-center wallet-card__money--1st pa-2">
                            <span v-if="wallet && wallet.value" class="text-primary t14 fw700 number-font">{{splitChar(amount)}}</span>
                            <span class="t11 w300 text-primary mr-2">تومان</span>
                        </div>

                        <div class="pos-a d-flex align-center justify-space-between w-100 wallet-card__money--2nd py-2 px-3">
                            <span class="t12 w400 text-grey-darken-3">موجودی قابل برداشت: </span>

                            <div class="d-flex align-center">
                                <span v-if="wallet && wallet.value" class="text-grey-darken-3 t14 fw700 number-font">{{splitChar(amount)}}</span>
                                <span class="t11 w300 text-grey-darken-3 mr-2">تومان</span>
                            </div>
                        </div>

                        <div class="pos-a d-flex align-center justify-space-between w-100 wallet-card__money--3th py-2 px-3">
                            <span class="t12 w400 text-grey-darken-3">موجودی غیر قابل برداشت:</span>

                            <div class="d-flex align-center">
                                <span v-if="wallet && wallet.value" class="text-grey-darken-3 t14 fw700 number-font">{{splitChar(inaccessible_value)}}</span>
                                <span class="t11 w300 text-grey-darken-3 mr-2">تومان</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-space-between align-center mb-4 tablet-show">
                    <generalWalletModalInventoryIncrease :walletInventory="amount" />

                    <generalWalletModalInventory :walletInventory="amount" />
                </div>
            </div>

            <div class="col-6 tablet-show py-5 px-3">
                <div class="wallet-rules">
                    <div class="d-flex align-top">
                        <v-icon icon="mdi-credit-card-check-outline" size="small" color="deep-purple" class="ml-1" />
                        <span class="text-deep-purple t12 w400 l20"> موجودی قابل برداشت شامل شارژ کیف پول از طریق مرجوع یا لغو سفارش می‌باشد.</span>
                    </div>

                    <div class="d-flex align-top mt-5">
                        <v-icon icon="mdi-credit-card-remove-outline" size="small" color="deep-purple" class="ml-1" />
                        <span class="text-deep-purple t12 w400 l20"> موجودی غیر قابل برداشت شامل شارژ کیف پول از طریق معرفی به دوستان، کارت هدیه، کدهای تبلیغاتی و ... می‌باشد. این موجودی تنها قابل استفاده برای ثبت سفارش از شاواز می‌باشد </span>
                    </div>
                </div>
            </div>
        </v-row>

        <div class="d-flex justify-space-between align-center mb-4 tablet-hide">
            <generalWalletModalInventoryIncrease :walletInventory="amount" />

            <generalWalletModalInventory :walletInventory="amount" />
        </div>

        <v-divider color="grey" class="mb-5 tablet-hide" />

        <div class="wallet-rules tablet-hide">
            <div class="d-flex align-top">
                <v-icon icon="mdi-credit-card-check-outline" size="small" color="deep-purple" class="ml-1" />
                <span class="text-deep-purple t12 w400 l20"> موجودی قابل برداشت شامل شارژ کیف پول از طریق مرجوع یا لغو سفارش می‌باشد.</span>
            </div>

            <div class="d-flex align-top mt-5">
                <v-icon icon="mdi-credit-card-remove-outline" size="small" color="deep-purple" class="ml-1" />
                <span class="text-deep-purple t12 w400 l20"> موجودی غیر قابل برداشت شامل شارژ کیف پول از طریق معرفی به دوستان، کارت هدیه، کدهای تبلیغاتی و ... می‌باشد. این موجودی تنها قابل استفاده برای ثبت سفارش از شاواز می‌باشد </span>
            </div>
        </div>
    </div>
</v-card>
</template>

<script>
export default {
    computed: {
        amount() {
            try {
                return Number(String(this.wallet.value).slice(0, -1))
            } catch (e) {
                return null;
            }
        },
        inaccessible_value() {
            try {
                return Number(String(this.wallet.inaccessible_value).slice(0, -1))
            } catch (e) {
                return null;
            }
        },
    },
    props: {
        wallet: Object,
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/wallet.scss';

.wallet {

    @include gbp(1500) {
        height: 527px;
    }

    >div.px-6 {
        @include gbp(0, 768) {
            padding: 0 !important;
        }
    }

    .wallet-card {
        width: 100%;
        position: relative;
        border-radius: 7px !important;
        overflow: hidden;

        &__image {
            width: 100%;
            height: auto;
        }

        &__money {
            top: 0;
            right: 0;
            height: 100%;

            &--1st {
                top: 20px;
                left: 0;
            }

            &--2nd {
                bottom: 43px;
                right: 0;
            }

            &--3th {
                bottom: 12px;
                right: 0;
            }
        }
    }
}
</style>
