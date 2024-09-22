<template>
    <v-bottom-sheet v-if="sheet" v-model="sheet" color="white" height="auto" class="c-modal">
        <div class="pt-3 px-4 pb-5 bg-white h-100 ticket-rating">
            <header class="d-flex justify-space-between align-center pb-5 pt-3">
                <span class="t16 w700">
                    {{title}}
                </span>

                <v-btn class="c-modal__header__btn pa-0 text-none" @click="closeModal()" color="grey-darken-1" size="medium" variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div>
                <div class="ticket__form ticket__form--rate">
                    <v-row>
                        <v-col cols="12" class="d-flex align-center justify-center mt-3">
                            <v-rating class="ltr" hover :length="5" :size="40" half-increments :model-value="rateModel" v-model="rateModel" color="grey" active-color="sWarning" />
                        </v-col>

                        <v-col cols="12" class="ticket__form__item ticket__form__item--text-field" :class="{'show-note' : showNote}">
                            <v-textarea variant="outlined" v-model="form.content" :placeholder="text" hide-details rows="6" class="br8"/>
                        </v-col>
                    </v-row>

                    <div class="ticket__form__btn d-flex justify-center w-100 mobile-pa-0 align-center">
                        <v-btn :loading="loading" @click="addRating()" block height="36" title="تایید و ثبت" class="btn btn--submit br12 my-4">
                           {{ buttonText }}
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </v-bottom-sheet>
</template>

<script>
import axios from "axios";

export default {

    setup() {
        const userToken = useCookie('userToken')
        const runtimeConfig = useRuntimeConfig()
        return {
            userToken,
            runtimeConfig
        }
    },
    data() {
        return {
            sheet: false,
            loading: false,
            form: {
                content: null,
            },
            rateModel:0,
            showNote: false,
        }
    },

    props: {
        /** Modal title */
        title: String,

        /** Modal text */
        text: String,

        /** Button text */
        buttonText: String,

        /** Item id */
        itemId: String | Number

    },

    methods: {
        openModal() {
            this.sheet = true
        },

        closeModal() {
            this.sheet = false;
        },

        /**
         * Add answer
         */
         addRating() {
            this.loading = true;

            const formData = new FormData();

            formData.append('rate', this.rateModel)
            formData.append('rate_note', this.form.content)


            axios
                .post(this.runtimeConfig.public.apiBase + `/ticket/user/crud/rate/threads/${this.itemId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    useNuxtApp().$toast.success(response.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                    this.getUserTicketById();
                    this.form = {
                        content: null,
                    }
                })
                .catch((err) => {
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }).finally(() => {
                    this.loading = false;
                    this.sheet = false
                });
        },
    },

    watch:{
        rateModel(newVal){
            if(newVal !== 0 && newVal !== null){
                this.showNote = true
            }else{
                this.showNote = false
            }
        }
    }
}
</script>

<style lang="scss">
.c-modal {
    .v-bottom-sheet__content{
        border-top-right-radius: 12px !important;
        border-top-left-radius: 12px !important;
        overflow: hidden;
    }

    .ticket-rating{
        border-top-left-radius: 12px !important;
        border-top-right-radius: 12px !important;
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

    .ticket__form{
        &__item{
            .v-field__outline__start{
                border-top-right-radius: 12px !important;
                border-bottom-right-radius: 12px !important;
            }

            .v-field__outline__end{
                border-top-left-radius: 12px !important;
                border-bottom-left-radius: 12px !important;
            }

            .v-field__input{
                font-size: 14px !important;
            }
        }

        &--rate{
            .ticket__form__item{
                display: none;

                &.show-note{
                    display: flex;
                }
            }

            .ticket__form__btn{
                .v-btn{
                    height: 36px !important;
                }
            }
        }

        .v-rating__item{
            .v-icon{
                font-size: 40px !important;
            }
        }
    }
}
</style>
