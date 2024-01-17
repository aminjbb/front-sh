import { LazyNuxtPage } from '#build/components';
<template lang="">
<div>
    <div class="d-flex align-center" @click="openModal()">
        <v-icon
            icon="mdi-plus-circle-outline"
            size="small"
            color="grey"
            class="ml-1" />
        <span class="text-grey t14 w500">افزایش موجودی</span>
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
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
                    <span class="t12 w400 text-grey-darken-1 number-font">{{/* data.all */splitChar(243000) }}تومان</span>
                </div>
            </div>

            <div class="d-flex align-center inventory-increase-modal__select-mount px-5">
                <a class="flex-grow-1 text-grey t12 w400 number-font mx-2" @click="selectMount(100000)">
                    {{splitChar(100000) }} تومان
                </a>

                <a class="flex-grow-1 text-grey t12 w400 number-font mx-2" @click="selectMount(50000)">
                    {{splitChar(50000) }} تومان
                </a>

                <a class="flex-grow-1 text-grey t12 w400 number-font mx-2" @click="selectMount(20000)">
                    {{splitChar(20000) }} تومان
                </a>

                <a class="flex-grow-1 text-grey t12 w400 number-font mx-2" @click="selectMount(10000)">
                    {{splitChar(10000) }} تومان
                </a>
            </div>

            <div class="d-flex align-center inventory-increase-modal__selected-mound px-6 mt-5">
                <div class="ml-3" @click="increase()">
                    <v-icon icon="mdi-plus" color="grey-darken-1" />
                </div>
                <div class="flex-grow-1">
                    <v-text-field
                        density="compact"
                        variant="outlined"
                        hide-details
                        placeholder="مبالغ دیگر"
                        v-model="mount" />
                </div>
                <div class="mr-3" @click="decrease()">
                    <v-icon icon="mdi-minus" color="grey-darken-1" />
                </div>
            </div>

            <div class="text-center t12 w400 text-deep-purple inventory-increase-modal__desc my-2 number-font">
                مبلغ مجار برای کیف پول از ۱۰,۰۰۰ تومان تا ۲۰۰,۰۰۰ تومان می‌باشد
            </div>

            <div class="px-6 my-8">
                <v-btn
                    :loading="loading"
                    :disabled="mount ? false : true"
                    @click="increaseInventory()"
                    height="44"
                    :title="submitText"
                    class="btn btn--submit w-100">
                    افزایش موجودی
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            data: Object,
            dialog: false,
            mount: null,
            loading: false
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
        selectMount(mount) {
            this.mount = mount;
        },

        /**
         * Increase inventory method
         */
        increaseInventory() {
            this.loading = true;

            //TODO : Add increase inventory methods
        },

        /**
         * Increase mount bu `+` button
         */
        increase() {
            this.mount++;
        },

        /**
         * Decrease mount by `-` button
         */
        decrease() {
            if (this.mount > 1) {
                this.mount--;
            }
        }
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
