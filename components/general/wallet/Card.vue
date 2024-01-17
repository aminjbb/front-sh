<template lang="">
<v-card class="wallet pa-8 mobile-pa-0 mobile-no-border has-header">
    <header class="card__header xs-hide">کیف پول</header>
    <div class="px-6">
        <v-row class="ma-0 pa-0">
            <div class="pa-0 col-6">
                <div class="wallet-card mt-5 mb-2">
                    <img src="~/assets/images/wallet.svg" class="wallet-card__image" alt="Shavaz wallet image" width="339" height="146">
                    <div class="pos-a w-100 wallet-card__money">
                        <div class="pos-a d-flex align-center wallet-card__money--1st pa-2">
                            <span v-if="wallet && wallet.all_mony" class="text-primary t14 bold number-font">{{splitChar(wallet.all_mony)}}</span>
                            <span class="t11 w300 text-primary mr-2">تومان</span>
                        </div>

                        <div class="pos-a d-flex align-center justify-space-between w-100 wallet-card__money--2nd py-2 px-3">
                            <span class="t12 w400 text-grey-darken-3">موجودی قابل برداشت: </span>

                            <div class="d-flex align-center">
                                <span v-if="wallet && wallet.accept_mony" class="text-grey-darken-3 t14 bold number-font">{{splitChar(wallet.accept_mony)}}</span>
                                <span class="t11 w300 text-grey-darken-3 mr-2">تومان</span>
                            </div>
                        </div>

                        <div class="pos-a d-flex align-center justify-space-between w-100 wallet-card__money--3th py-2 px-3">
                            <span class="t12 w400 text-grey-darken-3">موجودی غیر قابل برداشت:</span>

                            <div class="d-flex align-center">
                                <span v-if="wallet && wallet.forbidden_money" class="text-grey-darken-3 t14 bold number-font">{{splitChar(wallet.forbidden_money)}}</span>
                                <span class="t11 w300 text-grey-darken-3 mr-2">تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-6 tablet-show">
                <div class="wallet-rules">
                    <div class="d-flex align-top">
                        <v-icon
                            icon="mdi-credit-card-check-outline"
                            size="small"
                            color="deep-purple"
                            class="ml-1" />
                        <span class="text-deep-purple t12 w400 l20"> موجودی قابل برداشت شامل شارژ کیف پول از طریق مرجوع یا لغو سفارش می‌باشد.</span>
                    </div>

                    <div class="d-flex align-top mt-5">
                        <v-icon
                            icon="mdi-credit-card-remove-outline"
                            size="small"
                            color="deep-purple"
                            class="ml-1" />
                        <span class="text-deep-purple t12 w400 l20"> موجودی غیر قابل برداشت شامل شارژ کیف پول از طریق معرفی به دوستان، کارت هدیه، کدهای تبلیغاتی و ... می‌باشد. این موجودی تنها قابل استفاده برای ثبت سفارش از شاواز می‌باشد </span>
                    </div>
                </div>
            </div>
        </v-row>

        <div class="d-flex justify-space-between align-center mb-4">
            <generalWalletModalInventoryIncrease />

            <generalWalletModalInventory />
        </div>

        <v-divider color="grey" class="mb-5 tablet-hide" />

        <div class="wallet-rules tablet-hide">
            <div class="d-flex align-top">
                <v-icon
                    icon="mdi-credit-card-check-outline"
                    size="small"
                    color="deep-purple"
                    class="ml-1" />
                <span class="text-deep-purple t12 w400 l20"> موجودی قابل برداشت شامل شارژ کیف پول از طریق مرجوع یا لغو سفارش می‌باشد.</span>
            </div>

            <div class="d-flex align-top mt-5">
                <v-icon
                    icon="mdi-credit-card-remove-outline"
                    size="small"
                    color="deep-purple"
                    class="ml-1" />
                <span class="text-deep-purple t12 w400 l20"> موجودی غیر قابل برداشت شامل شارژ کیف پول از طریق معرفی به دوستان، کارت هدیه، کدهای تبلیغاتی و ... می‌باشد. این موجودی تنها قابل استفاده برای ثبت سفارش از شاواز می‌باشد </span>
            </div>
        </div>
    </div>
</v-card>
</template>

<script>
export default {
    props: {
        wallet: Object
    }
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
        @include gbp(0,768) {
            padding: 0 !important;
        }
    }

    .tablet-show {
        padding: 20px 10px;
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
