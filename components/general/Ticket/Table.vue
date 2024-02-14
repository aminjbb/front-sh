<template lang="">
<div class="ticket-table">
    <v-data-table
        class="table mt-5"
        :headers="tableHeader"
        :items="tableContent"
        :height="isMobile ? 'auto' : 358"
        item-value="index">
        <template v-slot:item="{ item }">
            <tr class="v-data-table__tr">
                <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font" :style="isMobile === true ? { backgroundColor: '#FBE9F3 !important'} : ''">
                    <span class="w600 text-black ml-10" v-if="isMobile">ردیف : </span>
                    {{ item.raw.index }}
                </td>

                <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font">
                    <span class="w600 text-black ml-10" v-if="isMobile">شماره تیکت: </span>

                    <template v-if="isMobile">
                        <a class="text-blue number-font" :href="`/user/ticket/${id}`">
                            {{ item.raw.id }}
                        </a>
                    </template>
                    <template v-else>{{ item.raw.id }} </template>
                </td>

                <td class="v-data-table__td v-data-table-column--align-start t12 text-grey">
                    <span class="w600 text-black ml-10" v-if="isMobile">موضوع : </span>
                    {{ item.raw.title }}
                </td>

                <td class="v-data-table__td v-data-table-column--align-start t12 text-grey">
                    <span class="w600 text-black ml-10" v-if="isMobile">اولویت : </span>
                    {{ getPriorityText(item.raw.priority) }}
                </td>

                <td class="v-data-table__td v-data-table-column--align-start t12 text-grey number-font">
                    <span class="w600 text-black ml-10" v-if="isMobile">تاریخ ارسال : </span>
                    {{ item.raw.created_at }}
                </td>

                <td class="v-data-table__td v-data-table-column--align-start t12 text-grey">
                    <span class="w600 text-black ml-10" v-if="isMobile">وضعیت : </span>
                    {{ getStatusText(item.raw.status) }}
                </td>

                <td class="v-data-table__td v-data-table-column--align-start t12 text-grey" :style="isMobile === true ? { display: 'none !important'} : ''">
                    <span class="w600 text-black ml-10" v-if="isMobile">عملیات : </span>
                    <a :href="`/user/ticket/${item.raw.id}`">
                        <v-icon
                            icon="mdi-eye-outline"
                            size="x-small"
                            color="grey" />
                    </a>
                </td>
            </tr>
        </template>
    </v-data-table>
</div>
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
         * Table header
         */
        tableHeader: Array,

        /**
         * Table data
         */
        items: Array,
    },

    computed: {
        tableContent() {
            const tableItems = []
            this.items.forEach((element, index) => {
                const obj = {
                    'index': index + 1,
                    'id': element.id,
                    'title': element.title,
                    'priority': element.priority,
                    'created_at': element.created_at_fa,
                    'status': element.status,
                    'setting': ''
                }

                tableItems.push(obj);
            });

            return tableItems;
        }
    },

    methods: {
        /**
         * Get priority text
         */
        getPriorityText(priority) {
            const text = '';

            if (priority == 'urgent') {
                return 'ضروری';
            }
            if (priority == 'low') {
                return 'پایین';
            }
            if (priority == 'high') {
                return 'بالا';
            }
            if (priority == 'medium') {
                return 'متوسط';
            }

            return 'معمولی';
        },

        /**
         * Get status text
         */
         getStatusText(status) {
            const text = '';

            if (status == 'open') {
                return 'باز';
            }
            if (status == 'answered') {
                return 'پاسخ داده شده';
            }
            if (status == 'resolved') {
                return 'بسته شده';
            }
            if (status == 'postponed') {
                return 'متوقف شده';
            }
            if (status == 'seen') {
                return 'دیده شده';
            }

            return 'نامعلوم';
        },
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

.ticket-table .table {
    @include gbp(769) {
        border-radius: 8px;
        border: 1px solid #F5F5F5;
        overflow: hidden;
    }

    thead {
        background-color: #FBE9F3;
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
            background-color: #FBE9F3 !important;
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
</style>
