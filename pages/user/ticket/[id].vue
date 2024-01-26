<template lang="">
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
                            @click="showAnswer()"
                            height="36"
                            title="ثبت پاسخ"
                            class="btn--cancel">
                            ثبت پاسخ
                        </v-btn>
                    </header>

                    <div class="single-ticket flex-grow-1 d-flex flex-column" :class="isMobile === true ? 'px-3 mb-2' : 'px-6 mb-8'">
                        <generalTicketSingleInfoCard :content="ticketMoc" />

                        <div class="single-ticket__list">
                            <template v-for="ticket in ticketMoc.threads" :key="ticket.id">
                                <template v-if="ticket.creator === 'user'">
                                    <generalTicketUserAnswer :answer="ticket" />
                                </template>
                                <template v-if="ticket.creator === 'admin'">
                                    <generalTicketAdminAnswer :answer="ticket" />
                                </template>
                            </template>
                        </div>
                    </div>
                </v-card>

                <v-divider v-if="isMobile" color="grey-lighten-1" class="mb-3" />

                <div v-if="!showAnswerBox" class="xs-show px-3">
                    <v-btn
                        @click="showAnswer()"
                        height="36"
                        title="ثبت پاسخ"
                        class="btn--cancel w-100">
                        ثبت پاسخ
                    </v-btn>
                </div>

                <v-card v-if="showAnswerBox" class="pa-8 mobile-pa-0 mobile-no-border">
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

                                    <generalUploader @getImage="getImage" />
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
export default {
    data() {
        return {
            ticket: null,
            loading: false,
            showAnswerBox: false,
            isMobile:false,
            form: {
                content: null,
                files: null,
            },
            ticketMoc: {
                id: 15423,
                priority: 'medium',
                title: 'پیگیری سفارش',
                created_at_fa: '1402/06/27',
                updated_at_fa: '1402/06/29',
                status: 'answered',
                threads: [{
                        id: 156,
                        creator: 'user',
                        content: 'سلام ریمل اسنس سفارش دادم و وقتی رسید دستم پلمپ نبود و تاریخ تولید و انقضا هم نداشت عکسش رو واستون ارسال کردم فقط همین بود بدون تاریخ و پلمپ',
                    },
                    {
                        id: 569,
                        creator: 'admin',
                        content: 'سلام نگین اسدی عزیز. لطفا درخواست خود را در قسمت مرجوعی در سایت ثبت نمایید.',
                    }
                ]
            }
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | تیکت من')
        const description = ref("صفحه تیکت");

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
    },

    methods: {
        /**
         * upload image
         */
        getImage() {
            //TODO: get image
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
            //TODO:  Add answer
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
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/ticket.scss';
</style>
