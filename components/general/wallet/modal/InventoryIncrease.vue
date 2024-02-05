<template lang="">
<div>
    <div class="d-flex align-center" @click="openModal()">
        <v-icon
            icon="mdi-plus-circle-outline"
            size="small"
            color="grey"
            class="ml-1" />
        <span class="text-grey t14 w500 cur-p">افزایش موجودی</span>
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        :fullscreen="screenType === 'mobile'? true : false"
        width="526">
        <v-card class="inventory-increase-modal">
            <header class="c-modal__header d-flex justify-space-between align-center py-5 px-3">
                <span class="t16 w400 text-grey-darken-3">
                    افزایش موجودی
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

            <div class="px-6 pt-4 pb-5">
                <div class="d-flex justify-space-between align-center">
                    <span class="t12 w400 text-grey-darken-1">موجودی فعلی</span>
                    <span class="t12 w400 text-grey-darken-1 number-font">{{splitChar(walletInventory) }}تومان</span>
                </div>
            </div>

            <div class="d-flex align-center inventory-increase-modal__select-mount px-5" id="inventory-increase-modal__select-mount">
                <a class="flex-grow-1 text-grey t12 w400 number-font mx-2" id="select-mount--1" @click="selectMount('1',100000)">
                    {{splitChar(100000) }} تومان
                </a>

                <a class="flex-grow-1 text-grey t12 w400 number-font mx-2" id="select-mount--2" @click="selectMount('2',50000)">
                    {{splitChar(50000) }} تومان
                </a>

                <a class="flex-grow-1 text-grey t12 w400 number-font mx-2" id="select-mount--3" @click="selectMount('3',20000)">
                    {{splitChar(20000) }} تومان
                </a>

                <a class="flex-grow-1 text-grey t12 w400 number-font mx-2" id="select-mount--4" @click="selectMount('4',10000)">
                    {{splitChar(10000) }} تومان
                </a>
            </div>

            <div class="d-flex align-center inventory-increase-modal__selected-mound px-6 mt-5">
                <div
                    class="ml-3 cur-p"
                    @click="increase()"
                    :class="{activeIncrease}">
                    <v-icon icon="mdi-plus" color="grey-darken-1" />
                </div>
                <div class="flex-grow-1">
                    <v-text-field :class={error} density="compact" variant="outlined" hide-details placeholder="مبالغ دیگر" v-model="mount" />
                </div>
                <div
                    class="mr-3 cur-p"
                    @click="decrease()"
                    :class="{activeDecrease}">
                    <v-icon icon="mdi-minus" color="grey-darken-1" />
                </div>
            </div>

            <div class="text-center t12 w400 text-deep-purple inventory-increase-modal__desc my-2 number-font" :class={error}>
                مبلغ مجار برای کیف پول از ۱۰,۰۰۰ تومان تا ۲۰۰,۰۰۰ تومان می‌باشد
            </div>

            <div class="px-6 my-8">
                <v-btn
                    :loading="loading"
                    :disabled="!error ? false : true"
                    @click="increaseInventory()"
                    height="44"
                    title="افزایش موجودی"
                    class="btn btn--submit w-100">
                    افزایش موجودی
                </v-btn>
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
            screenType: null,
            error: false,
        }
    },

    props: {
        walletInventory: Number | String,
    },

    watch: {
        mount(newValue) {
            if (newValue < 10000 || newValue > 200000) {
                this.error = true;
            } else {
                this.error = false;
            }
        },
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
        },

        /**
         * Select mount with v-model
         * @param {*} mount
         */
        selectMount(id, mount) {
            const parent = document.getElementById('inventory-increase-modal__select-mount');
            const list = parent.querySelectorAll('a');

            list.forEach(item => {
                item.classList.remove('selected');
            });

            document.getElementById(`select-mount--${id}`).classList.add('selected')
            this.mount = mount;
        },

        /**
         * Increase inventory method
         */
        increaseInventory() {
            this.loading = true;

            const formData = new FormData()

            formData.append('amount', this.mount + '0')

            axios
                .post(this.runtimeConfig.public.apiBase + '/finance/user/wallet/deposit', formData, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    window.location = response.data.data.payment_link
                    useNuxtApp().$toast.success('کیف پول با موفقیت شارژ شد.', {
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
                    this.closeModal();
                });
        },

        /**
         * Increase mount bu `+` button
         */
        increase() {
            this.error = false;
            this.mount++;
            this.activeIncrease = true; // Set to active
            setTimeout(() => {
                this.activeIncrease = false; // Reset after 1 second
            }, 300);
        },

        /**
         * Decrease mount by `-` button
         */
        decrease() {
            if (this.mount > 10000) {
                this.error = false;
                this.mount--;
                this.activeDecrease = true; // Set to active
                setTimeout(() => {
                    this.activeDecrease = false; // Reset after 1 second
                }, 300);
            } else {
                this.error = true;
            }
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },
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

.inventory-increase-modal {
    &__select-mount {
        >a {
            border-radius: 4px;
            border: 1px solid var(--grey-grey, #9E9E9E);
            text-align: center;
            padding: 4px 0;
            cursor: pointer;

            &.selected {
                border-color: #D72685 !important;
                background: #FBE9F3 !important;
                color: #D72685 !important;
            }
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
}
</style>
