<template>
<div class="c-modal">
    <div class="d-flex align-center justify-end cur-p" @click="openModal()">
        <v-icon
            icon="mdi-alert-circle-outline"
            size="small"
            color="grey"
            class="ml-2" />
        <span class="t11 w400 text-grey">گزارش نادرستی</span>
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        width="564px">
        <v-card class="pt-3 px-6 pb-5 c-modal--report">
            <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                <span class="t15 w400">
                    گزارش نادرستی
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

            <div>
                <p class="t12 w400 mt-4 text-grey">
                    نادرستی در کالای {{ title }} مربوط به کدام بخش است؟
                </p>

                <div>
                    <template v-for="report in reportItems" :key="report.id">
                        <v-checkbox
                            v-model="reportModel"
                            :label="report.label"
                            @change="selectReport()"
                            hide-details
                            style="height:38px"
                            :value="report.label" />

                    </template>
                </div>

                <div>
                    <v-divider color="grey" class="mb-3 mt-5"/>

                    <label class="d-block t12 text-grey-darken-3 mb-4">توضیحات</label>
                    <v-textarea
                        variant="outlined"
                        v-model="description"
                        placeholder="دلیل گزارش خود را توضیح دهید"
                        rows="3" />
                </div>

                <div class="mt-2 w-100">
                    <v-btn
                        :loading="loading"
                        @click="addReport()"
                        height="44"
                        :disabled="activeButton === true ? false :true"
                        :title="submitText"
                        class="btn btn--submit w-100">
                        ثبت
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {

    data() {
        return {
            dialog: false,
            activeButton: false,
            description:null,
            loading:false,
            reportModel:[],
            reportItems: [{
                    label: 'نام کالا نادرست است.'
                },
                {
                    label: 'تصویر کالا نادرست است.'
                },
                {
                    label: 'مشخصات کالا نادرست است.'
                },
                {
                    label: 'توضیحات کالا نادرست است.'
                },
                {
                    label: 'روش استفاده کالا نادرست است.'
                }
            ]
        }
    },

    props: {
        /**Modal title */
        title: String,

        /**Modal text */
        text: String,

        /** Product id */
        productId: String,
    },

    methods: {
        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        },

        addReport() {
            this.activeButton = true;
            //Add ' send report' method
        },
    },
}
</script>

<style lang="scss">
.c-modal--report {
    .v-card {
        background: #fff !important;
    }

    &__header {
        border-bottom: 1px solid #E0E0E0;

        &__btn {
            min-width: auto !important;
        }
    }

    .v-field__input{
        font-size: 12px;
    }
}
</style>
