<template>
<div>
    <v-dialog
        v-if="dialog"
        v-model="dialog"
        :fullscreen="screenType === 'mobile'? true : false"
        width="526px">
        <v-card class="inventory-increase-modal">
            <header class="c-modal__header d-flex justify-space-between align-center py-4 px-3">
                <span class="t16 w400 text-grey-darken-3">
                    {{title}}
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

            <div class="d-flex flex-column align-center justify-center py-5">
                <span class="t14 w400 text-grey-darken-1">
                    <template v-if="type === 'increase'">
                        افزایش موجودی کیف پول
                    </template>
                    <template v-if="type === 'decrease'">
                        مبلغ برداشت
                    </template>

                </span>
                <span class="t20 w400 text-grey-darken-3 number-font">{{splitChar(Number(String(content.amount).slice(0, -1)))}} <span class="t14 w400 text-grey-darken-1">تومان</span></span>
            </div>

            <v-divider color="grey" />

            <div class="modal-table px-6">
                <div class="d-flex align-center justify-space-between">
                    <div class="t12 w400 text-grey">آدرس کیف پول: </div>
                    <div class="t14 w400 text-grey-darken-3 number-font ltr">{{phoneNumber}}</div>
                </div>

                <div class="d-flex align-center justify-space-between">
                    <div class="t12 w400 text-grey">زمان تراکنش: </div>
                    <div class="t14 w400 text-grey-darken-3 number-font ltr">{{content.created_at_fa}}</div>
                </div>

               <!--  <div class="d-flex align-center justify-space-between">
                    <div class="t12 w400 text-grey">پرداخت از کارت: </div>
                    <div class="t14 w400 text-grey-darken-3 number-font ltr">{{content.created_at_fa}}</div>
                </div> -->

                <!-- <div class="d-flex align-center justify-space-between">
                    <div class="t12 w400 text-grey">کد رهگیری: </div>
                    <div class="t14 w400 text-grey-darken-3 number-font ltr">{{content.refid}}</div>
                </div> -->

               <!--  <div class="d-flex align-center justify-space-between">
                    <div class="t12 w400 text-grey">شماره مرجع: </div>
                    <div class="t14 w400 text-grey-darken-3 number-font ltr">{{content.created_at_fa}}</div>
                </div> -->
            </div>

            <div class="px-6 my-8">
                <v-btn
                    @click="closeModal()"
                    height="44"
                    title="بازگشت به کیف پول"
                    class="btn btn--cancel w-100">
                    بازگشت به کیف پول
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
            screenType: null,
            dialog: false,
            
        }
    },

    props: {
        /**
         * content
         */
        content: Object,

        /**
         * Title
         */
        title: String,

        /**
         * Type
         * Can be Increase and decrease
         */
        type: {
            type: String,
            default: 'increase'
        },

        /**
         * User phone number
         */
        phoneNumber: String,
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

.modal-table {
    >div {
        padding: 12px 0;
        border-bottom: 1px solid #eee
    }
}
</style>
