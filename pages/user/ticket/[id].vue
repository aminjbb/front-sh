<template>
<main class="v-ticket v-ticket--single">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/ticket" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">جزئیات تیکت</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>

            <div class="col-9 pa-4 mobile-pa-0">
                <v-card class="pa-8 mobile-pa-0 mobile-no-border has-header">
                    <header class="d-flex align-center justify-space-between mb-5 xs-hide card__header">
                        <span>جزئیات تیکت</span>

                        <v-btn
                            v-if="singleTicket.status !== 'resolved'"
                            @click="showAnswer()"
                            height="36"
                            title="ثبت پاسخ"
                            class="btn--cancel">
                            ثبت پاسخ
                        </v-btn>
                    </header>

                    <div class="single-ticket flex-grow-1 d-flex flex-column" :class="isMobile === true ? 'px-3 mb-2' : 'px-6 mb-8'">
                        <generalTicketSingleInfoCard v-if="singleTicket" :content="singleTicket" />

                        <div v-if="singleTicket" class="single-ticket__list">
                            <generalTicketUserAnswer :content="singleTicket.content" :fileList="singleTicket.files"/>

                            <template v-if="singleTicket.threads" v-for="ticket in singleTicket.threads" :key="ticket.id">
                                <template v-if="ticket.creator === 'user'">
                                    <generalTicketUserAnswer :content="ticket.content" :fileList="ticket.files"/>
                                </template>
                                <template v-if="ticket.creator === 'admin'">
                                    <generalTicketAdminAnswer :content="ticket.content" :fileList="ticket.files"/>
                                </template>
                            </template>
                        </div>
                    </div>
                </v-card>

                <v-divider
                    v-if="isMobile"
                    color="grey-lighten-1"
                    class="mb-3" />

                <div v-if="!showAnswerBox && singleTicket.status !== 'resolved'" class="xs-show px-3">
                    <v-btn
                        @click="showAnswer()"
                        height="36"
                        title="ثبت پاسخ"
                        class="btn--cancel w-100">
                        ثبت پاسخ
                    </v-btn>
                </div>

                <v-card v-if="showAnswerBox && singleTicket.status !== 'resolved'" class="pa-8 mobile-pa-0 mobile-no-border">
                    <div class="ticket__form px-3">
                        <v-form ref="ticket" v-model="valid">
                            <v-row>
                                <v-col cols="12" class="ticket__form__item ticket__form__item--text-field">
                                    <label class="d-block t12 text-grey-darken-3 mb-2">توضیحات </label>

                                    <v-textarea
                                        variant="outlined"
                                        v-model="form.content"
                                        placeholder="توضیحات را اینجا بنویسید"
                                        hide-details
                                        rows="3" />
                                </v-col>

                                <v-col cols="12" class="ticket__form__item ">
                                    <label class="d-block t12 text-grey-darken-3 mb-1">تصویر یا ویدیو </label>
                                    <span class="t11 w400 text-grey mb-3 d-block">در صورت نیاز، تصویر یا ویدیو مورد نظر خود را بارگذاری نمایید.</span>

                                    <generalUploader ref="imageUploader" @getImage="getImage" />
                                </v-col>
                            </v-row>

                            <v-divider color="grey" class="my-5" />
                        </v-form>
                        <div class="d-flex justify-end w-100 mobile-pa-0 align-center">
                            <v-btn
                                href="/user/ticket"
                                height="44"
                                title="انصراف"
                                class="btn btn--cancel ml-5">
                                انصراف
                            </v-btn>

                            <v-btn
                                :loading="loading"
                                @click="addAnswer()"
                                height="44"
                                class="btn btn--submit px-8"
                                title="ثبت تیکت">
                                ثبت تیکت
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            ticket: null,
            loading: false,
            showAnswerBox: false,
            isMobile: false,
            form: {
                content: null,
            },
            images: null,
        }
    },

    setup() {
        const userToken = useCookie('userToken');
        const runtimeConfig = useRuntimeConfig()

        const title = ref('فروشگاه اینترنتی شاواز | تیکت من')
        const description = ref("صفحه تیکت");

        const {
            getUserTicketById,
            singleTicket
        } = new User();

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        });

        return {
            userToken,
            getUserTicketById,
            singleTicket,
            runtimeConfig
        };
    },

    methods: {
        /**
         * Get image 
         * @param {*} response 
         */
        getImage(response) {
            const image = response.file_id;
            this.images.push(image);
        },

        /**
         * Show answer form
         */
        showAnswer() {
            this.showAnswerBox = !this.showAnswerBox
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
                    this.getUserTicketById();
                    this.form= {
                        content: null,
                    },

                    this.images = [];
                    this.$refs.imageUploader.files = [];
                    this.showAnswerBox = false;
                })
                .catch((err) => {
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }).finally(() => {
                    this.loading = false;
                });
        },
    },

    mounted() {
        this.getUserTicketById();

        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.isMobile = true : this.isMobile = false;
    },

}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/ticket.scss';
</style>
