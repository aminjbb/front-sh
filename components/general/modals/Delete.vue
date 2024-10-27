<template>
<div class="c-modal">
    <template v-if="buttonType == 'icon'">
        <v-icon
            @click="openModal()"
            class="cur-p"
            icon="mdi-delete-outline"
            size="small"
            color="red" />
    </template>

    <template v-if="buttonType == 'mobile'">
        <div @click="openModal()" class="text-grey t14 d-flex align-center py-1 cur-p">
            <v-icon
                icon="mdi-delete-outline"
                class="ml-2"
                size="small"
                color="grey" />
            <span class="text-grey t14">{{ title }}</span>
        </div>
    </template>

    
    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        width="500px">
        <v-card class="pt-3 px-6 pb-5">
            <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                <span class="t16 w700 text-sGrayDarken2">
                    {{title}}
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
                <p class="t12 w700 my-8 text-sGray">{{text}}</p>

                <div v-if="items" class="mb-4">
                    <div v-for="(item, index) in items" :key="index" class="d-flex align-center justify-space-between">
                        <span class="t12 w700 text-sGrayLighten2">{{ item.label }}</span>
                        <span class="t14 fw700 text-sGrayLighten2 number-font">
                            <template v-if="price">
                                {{ splitChar(Number(String(item.value).slice(0, -1))) }} <SvgToman/>
                            </template>
                            <template v-else>{{ title }}</template>
                        </span>
                    </div>
                </div>

                <div class="d-flex align-center justify-space-between mt-2 mobile-pa-0 w-100">
                    <v-btn
                        :loading="loading"
                        @click="removeProduct()"
                        height="44"
                        :title="submitText"
                        width="49%"
                        class="btn btn--submit br12 ov-h" >
                        <span class="w700">{{submitText}}</span>
                    </v-btn>

                    <v-btn
                        @click="closeModal()"
                        height="44"
                        title="انصراف"
                        width="49%"
                        class="btn btn--cancel ov-h br12">
                        <span class="w700">انصراف</span>
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
            loading:false,
        }
    },

    props: {
        /**Modal title */
        title: String,

        /**Modal text */
        text: String,

        /**Modal submit button text */
        submitText: String,

        /**
         * Button Type
         * Can be : icon - Text - mobile
         */
        buttonType: String,

        /**show special list in data*/
        items: Array,

        /**If you have price in items value */
        price:Boolean
    },

    methods: {
        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        },

       async removeProduct() {
            this.loading =true
            this.$emit('removeProduct');

        },
    },
}
</script>

<style lang="scss">

.c-modal {
    .v-card {
        background: #fff !important;
    }

    &__header {

        &__btn {
            min-width: auto !important;
            
            .v-btn__content{
                background: #ddd;
                border-radius:50% ;
            }
        }
    }
}
</style>
