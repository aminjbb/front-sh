<template>
<div>
    <div class="d-flex align-center justify-end" @click="openModal()">
        <div class="d-flex align-center">
            <v-icon
                icon="mdi-arrow-top-left-thin-circle-outline"
                size="small"
                color="grey"
                class="ml-1" />
            <span class="text-grey t14 w500 cur-p">برداشت موجودی</span>
        </div>
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        :fullscreen="screenType === 'mobile'? true : false"
        width="526">
        <v-card class="inventory-modal">
            <header class="c-modal__header d-flex justify-space-between align-center py-4 px-3">
                <span class="t16 w400 text-grey-darken-3">
                    <template v-if="step === 1">برداشت موجودی</template>
                    <template v-else-if="step === 2">اطلاعات کارت</template>
                    <template v-else-if="step === 3">بررسی نهایی</template>
                </span>

                <v-btn
                    class="c-modal__header__btn pa-0 text-none"
                    @click="closeModal()"
                    color="grey-darken-1"
                    size="x-small"
                    variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <v-divider color="grey" />

            <div class="px-6">
                <template v-if="step === 1">
                    <div class="pt-4 pb-5">
                        <div class="d-flex justify-space-between align-center">
                            <span class="t12 w400 text-grey-darken-1">موجودی قابل برداشت</span>
                            <span class="t12 w400 text-grey-darken-1 number-font">{{splitChar(walletInventory) }}تومان</span>
                        </div>
                    </div>

                    <div>
                        <div class="d-flex align-center inventory-modal__desc2">
                            <v-icon
                                icon="mdi-credit-card-check-outline"
                                color="grey"
                                class="ml-2"
                                size="normal" />
                            <span class="t12 w400 text-grey-darken-1"> موجودی قابل برداشت شامل شارژ کیف پول از طریق مرجوع یا لغو سفارش می‌باشد.</span>
                        </div>
                    </div>

                    <div class="d-flex align-center inventory-modal__selected-mound mt-5">
                        <div
                            class="ml-3"
                            @click="increase()"
                            :class="{activeIncrease}">
                            <v-icon icon="mdi-plus" color="grey-darken-1" />
                        </div>
                        <div class="flex-grow-1">
                            <v-text-field :class={error} density="compact" variant="outlined" hide-details placeholder="مبلغ برداشت" v-model="mount" />
                        </div>
                        <div
                            class="mr-3"
                            @click="decrease()"
                            :class="{activeDecrease}">
                            <v-icon icon="mdi-minus" color="grey-darken-1" />
                        </div>
                    </div>

                    <div class="text-center t12 w400 text-deep-purple inventory-modal__desc my-2 number-font" :class={error}>
                        <template v-if="walletInventoryMsg">
                            مبلغ انتخابی، بیش از موجودی قابل برداشت شما میباشد.
                        </template>
                        <template v-else>
                            مبلغ مجار برای برداشت از ۱۰,۰۰۰ تومان تا ۲۰۰,۰۰۰ تومان در روز می‌باشد
                        </template>
                    </div>

                    <div class="my-8">
                        <v-btn
                            :disabled="!error ? false : true"
                            @click="getCartNumber()"
                            height="44"
                            title="تایید و ادامه"
                            class="btn btn--submit w-100">
                            تایید و ادامه
                        </v-btn>
                    </div>
                </template>

                <template v-if="step === 2">
                    <div class="pt-4">
                        <div class="d-flex justify-space-between align-center">
                            <span class="t12 w400 text-grey-darken-1">مبلغ برداشت</span>
                            <span class="t12 w400 text-grey-darken-1 number-font">{{splitChar(mount) }}تومان</span>
                        </div>
                    </div>

                    <v-divider color="grey" class="mt-3 mb-5" />
                    <div class="pb-5">
                        <span class="t12 w400 text-grey-darken-1 mb-2 d-block">شماره شبا <span class="text-red">*</span></span>

                        <v-text-field
                            :rules="NumberCardCodeRule"
                            class="w-100 mb-10"
                            density="compact"
                            variant="outlined"
                            hint="اطلاعات شبا داده شده باید متعلق به صاحب حساب باشد."
                            append-inner-icon="mdi-credit-card-outline"
                            v-model="cartNumber" />

                        <v-btn
                            :disabled="cartNumber === null || cartNumber == '' ? true : false"
                            @click="submitCartNumber()"
                            height="44"
                            title="تایید و ادامه"
                            class="btn btn--submit w-100">
                            تایید و ادامه
                        </v-btn>
                    </div>
                </template>

                <template v-if="step === 3">
                    <div class="d-flex flex-column align-center justify-center py-5">
                        <span class="t14 w400 text-grey-darken-1">
                            شماره کارت:
                        </span>

                        <span class="t16 w500 text-black number-font my-2 bold ltr" style="letter-spacing: 2px;">{{cartNumber}}</span>

                        <div class="d-flex align-center">
                            <v-icon
                                color="warning"
                                class="ml-1"
                                icon="mdi-alert-remove-outline"
                                size="small" />
                            <span class="t12 w400 text-warning number-font">فرآیند برداشت وجه، طی 24 الی 48 ساعت آینده انجام می شود</span>
                        </div>
                    </div>

                    <div class="modal-table">
                        <div class="d-flex align-center justify-space-between">
                            <div class="t12 w400 text-grey">مبلغ برداشت:</div>
                            <div class="t14 w400 text-grey-darken-3 number-font">{{splitChar(mount)}} تومان</div>
                        </div>

                        <div class="d-flex align-center justify-space-between">
                            <div class="t12 w400 text-grey">کارمزد بانکی: </div>
                            <div class="t14 w400 text-grey-darken-3 number-font">{{splitChar(600)}} تومان</div>
                        </div>

                        <div class="d-flex align-center justify-space-between">
                            <div class="t12 w400 text-grey">دریافتی شما: </div>
                            <div class="t14 w400 text-grey-darken-3 number-font">{{splitChar(mount - 600)}} تومان</div>
                        </div>
                    </div>

                    <v-row class="ma-0 mt-4 mb-2">
                        <v-col cols="4">
                            <v-btn
                                @click="closeModal()"
                                height="44"
                                title="انصراف"
                                class="btn btn--cancel w-100">
                                انصراف
                            </v-btn>
                        </v-col>
                        <v-col cols="8">
                            <v-btn
                                :loading="loading"
                                @click="decreaseInventory()"
                                height="44"
                                title="تایید و برداشت"
                                class="btn btn--submit w-100">
                                تایید و برداشت
                            </v-btn>
                        </v-col>
                    </v-row>
                </template>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            data: Object,
            dialog: false,
            mount: 10000,
            loading: false,
            activeIncrease: false,
            activeDecrease: false,
            walletInventoryMsg: false,
            error: false,
            step: 1,
            screenType: null,
            cartNumber: null,
            NumberCardCodeRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) => /^[0-9]{24}$/.test(v) || "شماره شبا معتبر وارد کنید",
            ],
        }
    },

    props: {
        walletInventory: Number | String,
    },

    watch: {
        mount(newValue) {
            if (newValue < 10000 || newValue > 200000) {
                if (newValue > this.walletInventory) {
                    this.walletInventoryMsg = true;
                } else {
                    this.walletInventoryMsg = false;
                }

                this.error = true;
            } else {
                if (newValue > this.walletInventory) {
                    this.walletInventoryMsg = true;
                    this.error = true;
                } else {
                    this.error = false;
                    this.walletInventoryMsg = false;
                }
            }

        },

        walletInventory(newValue) {
            if (newValue) {
                if (this.mount > newValue) {
                    this.error = true;
                    this.walletInventoryMsg = true;
                }
            }
        }
    },

    setup() {
        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken');

        return {
            runtimeConfig,
            userToken,
        }
    },

    methods: {
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
            this.step = 1;
        },

        /**
         * Select mount with v-model
         * @param {*} mount
         */
        selectMount(mount) {
            this.mount = digits(mount, 'en');

        },

        /**
         * Increase mount bu `+` button
         */
        increase() {
            this.error = false;
            this.mount= parseInt(this.mount) + 10000;
            this.mount = digits(this.mount, 'en');
            this.activeIncrease = true; // Set to active
            setTimeout(() => {
                this.activeIncrease = false; // Reset after 1 second
            }, 300);
        },

        /**
         * Decrease mount by `-` button
         */
        decrease() {
            this.mount = digits(this.mount, 'en');
            if (this.mount > 10000) {
                this.error = false;
                this.mount=parseInt(this.mount) - 10000 ;
                this.activeDecrease = true; // Set to active
                setTimeout(() => {
                    this.activeDecrease = false; // Reset after 1 second
                }, 300);
            } else {
                this.error = true;
            }
        },

        /**
         * Go to cart number step
         */
        getCartNumber() {
            this.mount = digits(this.mount, 'en');

            if (this.mount > this.walletInventory) {
                this.error = true;
            } else {
                this.step = 2;
            }
        },

        /**
         * Submit bank cart number
         */
        submitCartNumber() {
            this.step = 3
        },

        decreaseInventory() {
            this.loading = true
            const formData = new FormData()

            formData.append('amount',  digits(this.mount, 'en') + '0')
            formData.append('card_number', digits(this.cartNumber, 'en'))

            axios
                .post(this.runtimeConfig.public.apiBase + '/finance/user/wallet/withdraw', formData, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    this.closeModal();

                    useNuxtApp().$toast.success('درخواست برداشت از کیف پول در صف انجام قرار گرفت.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                })
                .catch((err) => {
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }).finally(() => {
                    this.loading = false;
                });
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    }
}
</script>

<style lang="scss">
.c-modal__header {
    span {
        color: #424242 !important
    }

    &__btn {
        .v-icon {
            font-size: 20px !important;
        }
    }
}

.inventory-modal {
    &__select-mount {
        >a {
            border-radius: 4px;
            border: 1px solid var(--grey-grey, #9E9E9E);
            text-align: center;
            padding: 4px 0;
        }
    }

    &__selected-mound {

        >div:first-child,
        >div:last-child {
            border-radius: 8px;
            border: 1px solid #757575;
            padding: 12px;
            display: flex;
            align-items: center;
            justify-content: center;

            .v-icon {
                font-size: 18px !important;
            }

            &.activeIncrease {
                border-color: #4CAF50 !important;
                background: #E8F5E9 !important;
                color: #4CAF50 !important;

                i {
                    color: #4CAF50 !important;
                }
            }

            &.activeDecrease {
                border-color: #D32F2F !important;
                background: #fdc7c7 !important;
                color: #D32F2F !important;

                i {
                    color: #D32F2F !important;
                }
            }
        }

        .v-field__input {
            font-family: 'IranSansFaNum' !important;
            text-align: center !important;
        }

        .v-field__outline__start,
        .v-field__outline__end {
            border-color: #757575 !important;
            opacity: 1 !important
        }

        .v-field__outline__end {
            border-top-left-radius: 8px !important;
            border-bottom-left-radius: 8px !important;
        }

        .v-field__outline__start {
            border-top-right-radius: 8px !important;
            border-bottom-right-radius: 8px !important;
        }
    }

    .error {
        color: #D32F2F !important;

        .v-field__outline__start,
        .v-field__outline__end {
            border-color: #D32F2F !important;
        }
    }

    &__desc {
        color: #673ab7 !important;
        font-size: 12px !important;
    }

    &__desc2 {
        span {
            font-size: 12px !important;
        }

        .v-icon {
            font-size: 23px !important;
        }
    }

    .btn--submit {
        .v-btn__content {
            color: #fff !important;
            font-size: 17px !important;
        }

        &.v-btn--disabled {
            .v-btn__content {
                color: #727272 !important;
            }
        }
    }

    .modal-table {
        border-top: 1px solid #e0e0e0;

        >div {
            border-bottom: 1px solid #e0e0e0;
            padding: 12px 0;
        }
    }
}
</style>
