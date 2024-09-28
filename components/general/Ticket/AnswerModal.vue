<template>
    <v-dialog v-if="dialog" v-model="dialog" color="white" width="600px" class="c-modal">
        <v-card class="pt-3 px-4 pb-5">
            <header class="d-flex justify-space-between align-center pb-5 pt-3">
                <span class="t16 w700">
                    {{title}}
                </span>

                <v-btn class="c-modal__header__btn pa-0 text-none" @click="closeModal()" color="grey-darken-1" size="medium" variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div>
                <div class="ticket__form">
                    <v-row>
                        <v-col cols="12" class="ticket__form__item ticket__form__item--text-field">
                            <v-textarea variant="outlined" v-model="form.content" :placeholder="text" hide-details rows="9" class="br8"/>
                        </v-col>

                        <v-col cols="12" class="ticket__form__item ">
                            <span class="t16 w700 text-sGrayDarken2 mb-3 d-block">افزودن فایل</span>
                            <generalUploader ref="imageUploader" fileSize="2097152" @getImage="getImage" @deleteImage="deleteImage" :rules="uploadRules" :isMobile="isMobile === true ? true : false" />
                        </v-col>
                    </v-row>

                    <div class="ticket__form__btn d-flex justify-center w-100 mobile-pa-0 align-center">
                        <v-btn :loading="loading" @click="addAnswer()" prepend-icon="mdi-message-processing-outline" width="328" height="44" title="تایید و ثبت" class="btn btn--submit br12 mt-4">
                           {{ buttonText }}
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
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
            dialog: false,
            loading: false,
            rule: [(v) => !!v || 'این فیلد الزامی است'],
            form: {
                content: null,
            },
            images: [],
            uploadRules:['فرمت عکس بصورت jpeg یا png و حداکثر حجم 2 مگابایت باشد.']
        }
    },

    props: {
        /**Modal title */
        title: String,

        /**Modal text */
        text: String,

        buttonText: String,

    },

    methods: {
        openModal() {
            this.dialog = true
        },

        closeModal() {
            this.dialog = false;
        },

        /**
         * Get image
         * @param {*} response
         */
        getImage(response) {
            const image = response.file_id;
            this.images.push(image);
        },

        /**
         * Delete image
         */
        deleteImage(id){
            const index = this.images.findIndex(item => item === id);
            if (index !== -1) {
                this.images.splice(index, 1);
            }
        },

        /**
         * Add answer
         */
        addAnswer() {
            this.loading = true;

            const formData = new FormData();

            formData.append('content', this.form.content)

            if (this.images) {
                this.images.forEach((image, index) => {
                    formData.append(`files_id[${index}]`, image)
                })
            }

            axios
                .post(this.runtimeConfig.public.apiBase + `/ticket/user/crud/update/threads/${this.$route.params.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    useNuxtApp().$toast.success('پاسخ شما با موفقیت ارسال شد.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                    this.$emit('updateData', true);
                    this.form = {
                        content: null,
                    },

                    this.images = [];
                    this.$refs.imageUploader.files = [];
                })
                .catch((err) => {
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }).finally(() => {
                    this.loading = false;
                    this.dialog = false
                });
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

    .ticket__form__item{
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

    .ticket__form__btn {
        .v-btn{
            display: flex;
            &__content{
                flex-grow: 1 !important;
                font-variation-settings: "wght" 700;
            }
        }
    }
}
</style>
