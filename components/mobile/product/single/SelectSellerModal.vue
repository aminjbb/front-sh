<template>
<div class="c-modal">
    <a class="d-block t12 w400 text-info number-font" @click="openModal()">
        2 فروشنده دیگر
    </a>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        width="100%">
        <v-card class="pt-3 px-6 pb-5 c-modal--report">
            <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                <span class="t15 w400">
                    فروشندگان
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

            <div v-if="sellers && sellers.length > 0">
                <template v-for="(seller, index) in sellers" :key="`seller${index}`">
                    <generalProductSingleSellerCard :seller="seller" revers/>
                    <v-divider v-if="index +1 < sellers.length" color="grey-darken-1" />
                </template>
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
            loading: false,
        }
    },

    props: {
        /** 
         * Sellers list
         */
        sellers: String,

        /**
         * product id
         */
        productId:String,
    },

    methods: {
        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        },

        selectSeller() {},
    },
}
</script>

<style lang="scss">
.c-modal--report {
    .v-card {
        background: #fff !important;
    }

    &__header {
        border-bottom: 1px solid #f7f6f6;

        &__btn {
            min-width: auto !important;
        }
    }

    .v-field__input {
        font-size: 12px;
    }
}
</style>
