<template lang="">
<v-card class="pa-8 mobile-pa-0 mobile-no-border has-header">
    <header class="card__header">
        <h2 class="t16">تراکنش‌ها</h2>
    </header>

    <div class="px-5 mt-5 transactions">
        <div class="d-flex align-center transactions__details">
            <div class="flex-grow-1 d-flex align-center justify-space-between pa-2 transactions__details__item">
                <span class="t12 w400 text-grey-darken-3">جمع شارژها:</span>
                <div class="d-flex align-center">
                    <span v-if="details && details.all" class="t14 number-font bold text-grey-darken-3 ml-1">{{splitChar(details.all)}}</span>
                    <span class="t10 w400 text-grey-darken-3">تومان</span>
                </div>
            </div>

            <div class="flex-grow-1 d-flex align-center justify-space-between pa-2 transactions__details__item">
                <span class="t12 w400 text-grey-darken-3">جمع خریدها:</span>
                <div class="d-flex align-center">
                    <span v-if="details && details.bought" class="t14 number-font bold text-grey-darken-3 ml-1">{{splitChar(details.bought)}}</span>
                    <span class="t10 w400 text-grey-darken-3">تومان</span>
                </div>
            </div>

            <div class="flex-grow-1 d-flex align-center justify-space-between pa-2 transactions__details__item">
                <span class="t12 w400 text-grey-darken-3">جمع برگشت ها:</span>
                <div class="d-flex align-center">
                    <span v-if="details && details.receive" class="t14 number-font bold text-grey-darken-3 ml-1">{{splitChar(details.receive)}}</span>
                    <span class="t10 w400 text-grey-darken-3">تومان</span>
                </div>
            </div>
        </div>

        <v-data-table
            v-if="tableContent && tableContent.length >0"
            class="table mt-5"
            :headers="tableHeader"
            :items="tableContent"
            :height="isMobile ? '' : 358"
            item-value="index">
            <template v-slot:item="{ item }">
                <template v-if="item">
                    <tr class="v-data-table__tr">
                        <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font">
                            <span class="w600 text-black ml-10" v-if="isMobile">ردیف : </span>
                            {{ item.raw.index }}
                        </td>
                        <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font">
                            <span class="w600 text-black ml-10" v-if="isMobile">نوع تراکنش : </span>
                            <v-icon
                                :icon="item.raw.type == 'transaction.wallet_deposit' ? 'mdi-plus-circle-outline' : 'mdi-arrow-top-left-thin-circle-outline'"
                                :color="item.raw.type == 'transaction.wallet_deposit' ? 'success' : 'red-lighten-1'"
                                size="small"
                                class="ml-1" />
                            <span :class="item.raw.type == 'transaction.wallet_deposit' ? 'text-success' : 'text-red-lighten-1'" class="t12 w500">
                                <template v-if="item.raw.type == 'transaction.wallet_deposit'">
                                    شارژ کیف پول
                                </template>
                                <template v-else>
                                    برداشت از کیف پول
                                </template>
                            </span>
                        </td>
                        <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font">
                            <span class="w600 text-black ml-10" v-if="isMobile">مبلغ : </span>
                            {{ splitChar(Number(String(item.raw.price).slice(0, -1))) }}
                        </td>
                        <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font">
                            <span class="w600 text-black ml-10" v-if="isMobile">کد سفارش : </span>
                            {{ item.raw.code }}
                        </td>
                        <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font">
                            <span class="w600 text-black ml-10" v-if="isMobile">تاریخ تراکنش : </span>
                            {{ item.raw.date_fa }}
                        </td>
                    </tr>
                </template>
            </template>
        </v-data-table>

        <div v-else class="table text-center t14 w500 text-grey-darken-3 pa-5 mt-5">
            تراکنشی وجود ندارد
        </div>
    </div>
</v-card>
</template>

<script>
import {
    VDataTable
} from 'vuetify/labs/VDataTable'

export default {
    data() {
        return {
            isMobile: false
        }
    },

    components: {
        VDataTable
    },

    props: {
        /**
         * Transaction main data
         */
        details: Object,

        /**
         * Transaction table data
         */
        items: Array,

        /**
         * Transaction table header
         */
        tableHeader: Array,
    },

    computed: {
        tableContent() {
            const tableItems = []
            if (this.items && this.items.length > 0) {
                this.items.forEach((element, index) => {
                    const obj = {
                        'index': index + 1,
                        'type': element.type,
                        'price': element.price,
                        'code': element.code,
                        'date_fa': element.date_fa
                    }

                    tableItems.push(obj);
                });
            }
            return tableItems;
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.isMobile = true : this.isMobile = false;
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/wallet.scss';

.transactions {
    @include gbp(0, 768) {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    &__details {
        border-radius: 8px;
        background: var(--grey-grey-lighten-4, #F5F5F5);
        padding: 12px 8px;

        @include gbp(0, 768) {
            flex-direction: column;
        }

        &__item {
            &:not(:last-child) {
                border-left: 1px solid #AC1E6A;
            }

            @include gbp(0, 768) {
                flex-grow: 1;
                width: 100%;
                flex: 0 0 100%;
                padding: 12px 10px !important;

                &:not(:last-child) {
                    border-bottom: 1px solid #AC1E6A;
                    border-left: 0;
                }
            }
        }
    }

    .table {
        @include gbp(768) {
            border-radius: 8px;
            border: 1px solid #F5F5F5;
            overflow: hidden;
        }

        thead {
            background-color: #fff;
            padding: 8px 0;

            .v-data-table-header__content {
                span {
                    font-size: 12px;
                    color: #000;
                    font-variation-settings: "wght"500;
                }

                .mdi-arrow-up {
                    display: none;
                }
            }
        }

        .v-table__wrapper {
            &::-webkit-scrollbar {
                width: 4px !important;
                border-radius: 4px;
            }

            &::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: #F9F9F9;
                border-radius: 4px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background-color: #9E9E9E;
                border-radius: 4px;
            }
        }

        @include gbp(768) {
            tbody tr:nth-child(2n-1)>td {
                background-color: #FBFBFC !important;
            }
        }

        .v-data-table-footer {
            display: none;
        }
    }

    @include gbp(0, 768) {
        .v-data-table thead {
            border: none;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }

        .v-data-table td {
            display: block;
            text-align: right;
            line-height: 48px;
            border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;

            &:nth-child(2n-1) {
                background-color: #FBFBFC !important;
            }
        }

        .v-data-table tr {
            margin-bottom: 20px !important;
            display: block;
            border-radius: 8px;
            border: 1px solid #F5F5F5;
            overflow: hidden;
        }

        .v-data-table td::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
        }
    }
}
</style>
