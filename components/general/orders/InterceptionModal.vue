<template>
<div class="c-modal">
    <div class="simple-button cur-p" @click="openModal()">
        رهگیری مرسوله
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        :fullscreen="screenType === 'mobile'? true : false"
        width="618px">
        <v-card class="pt-3 px-6 pb-5">
            <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                <span class="t15 w400">
                    رهگیری مرسوله
                </span>

                <v-btn
                    class="c-modal__header__btn pa-0 text-none"
                    @click="closeModal()"
                    color="grey-darken-1"
                    size="large"
                    variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div class="interception-modal">
                <v-data-table
                    v-if="trackingDetails && trackingDetails.length"
                    class="table mt-5"
                    :headers="tableHeader"
                    :items="trackingDetails"
                    :height="isMobile ? 'auto' : 358"
                    item-value="id">
                    <template v-slot:item="{ item }">
                        <tr class="v-data-table__tr">
                            <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font" :style="isMobile === true ? { backgroundColor: '#F5F5F5 !important'} : ''">
                                <span class="w600 text-black ml-10" v-if="isMobile">کد مرسوله : </span>
                                <template v-if="item.tracking_code">
                                    {{ item.tracking_code }}
                                </template>
                                <template v-else> ------- </template>
                            </td>

                            <td class="v-data-table__td v-data-table-column--align-start t12 text-grey">
                                <span class="w600 text-black ml-10" v-if="isMobile">وضعیت : </span>
                                {{ item.status }}
                            </td>

                            <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font">
                                <span class="w600 text-black ml-10" v-if="isMobile">تاریخ : </span>
                                <template v-if="item.created_at">
                                    {{ item.created_at }}
                                </template>
                                <template v-else> ------- </template>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
                <h4 v-else class="w600 text-black text-center my-5 t16">در حال حاضر داده ای برای نمایش وجود ندارد.</h4>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import Order from '@/composables/Order.js'

export default {

    data() {
        return {
            dialog: false,
            loading: false,
            screenType: null,
            isMobile: false,
            tableHeader: [{
                    title: 'کد مرسوله',
                    key: 'id',
                },
                {
                    title: 'وضعیت',
                    key: 'status',
                },
                {
                    title: 'تاریخ',
                    key: 'created_at',
                }
            ]
        }
    },

    setup() {
        const {
            trackingOrder,
            trackingDetails
        } = new Order()
        return {
            trackingOrder,
            trackingDetails
        }
    },

    computed: {
        tableContent() {
            const tableItems = []
            this.items.forEach((element, index) => {
                const obj = {
                    'id': element.id,
                    'status': element.status,
                    'created_at': element.created_at,
                }

                tableItems.push(obj);
            });

            return tableItems;
        }
    },

    methods: {
        openModal() {
            this.dialog = true;
            this.trackingOrder();
        },

        closeModal() {
            this.dialog = false;
        },
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
        window.innerWidth < 769 ? this.isMobile = true : this.isMobile = false;
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.c-modal {
    .v-card {
        background: #fff !important;
    }

    &__header {
        border-bottom: 1px solid #E0E0E0;

        &__btn {
            min-width: auto !important;
        }
    }
}

.interception-modal {
    .table {
        @include gbp(769) {
            border-radius: 8px;
            border: 1px solid #F5F5F5;
            overflow: hidden;
        }

        thead {
            background-color: #FFFFFF;
            padding: 12px 0;

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

            th {
                background-color: #FFFFFF !important;
            }
        }

        .v-table__wrapper {
            height: auto !important;
            overflow: visible !important;

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

        @include gbp(769) {
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
