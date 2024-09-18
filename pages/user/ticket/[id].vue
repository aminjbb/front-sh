<template>
<main class="v-ticket v-ticket--single">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/ticket" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="text-sGrayDarken2 t14 w700">جزئیات تیکت</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>

            <div class="col-9 pa-4 mobile-pa-0">
                <v-card class="pa-8 mobile-pa-0 v-ticket__card">
                    <div class="flex-grow-1 d-flex flex-column" :class="isMobile === true ? 'mb-2' : 'pa-8'">
                        <header class="v-ticket__header d-flex align-center justify-space-between mb-3 xs-hide">
                            <h1 class="t18 w700 text-sGrayDarken2">{{ singleTicket?.parent_topic }}</h1>

                            <v-btn
                                v-if="singleTicket?.status !== 'resolved'"
                                href="/user/ticket"
                                height="45"
                                title="بازگشت"
                                class="btn--cancel br12">
                                بازگشت
                            </v-btn>
                        </header>

                        <generalTicketSingleInfoCard v-if="singleTicket" :content="singleTicket" :more="singleTicket.status !== 'open' ? true : false"/>

                        <div v-if="singleTicket?.threads" class="v-ticket__list mt-6">
                            
                            <div class="v-ticket__list__sort" v-for="(ticketListByDate, index) in singleTicket.threads" :key="`parent${index}`">

                                <header v-if="ticketListByDate.date" class="d-flex align-center justify-center">
                                    <span class="bg-white px-2">
                                        <span class="px-4 py-2 t12 w400 text-primary number-font s-border br12">{{ticketListByDate.date}}</span>
                                    </span>
                                </header>

                                <template v-if="ticketListByDate.items">
                                    <generalTicketAnswerCard v-for="(ticket, index) in ticketListByDate.items" :key="`child${index}`" :content="ticket" class="mb-6" :status="ticket?.creator === 'admin' ? 'admin' : 'user'" :class="ticket?.creator === 'admin' ? 'pb-9' : ''"/>
                                </template>
                            </div>
                        </div>
                    </div>
                </v-card>

                <div v-if="isMobile" class="xs-show px-3">
                    <v-btn
                        href="/user/ticket"
                        height="45"
                        title="بستن جزئیات"
                        block
                        class="btn--cancel w-100 br12 no-shadow">
                        بستن جزئیات
                    </v-btn>
                </div>

                <!-- <div v-if="!showAnswerBox && singleTicket?.status !== 'resolved'" class="xs-show px-3">
                    <v-btn
                        @click="showAnswer()"
                        height="36"
                        title="ثبت پاسخ"
                        class="btn--cancel w-100">
                        ثبت پاسخ
                    </v-btn>
                </div> -->

                <!-- <v-card v-if="showAnswerBox && singleTicket?.status !== 'resolved'" class="pa-8 mobile-pa-0 mobile-no-border">
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
                </v-card> -->
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
          valid:true,
            ticket: null,
            loading: false,
            showAnswerBox: false,
            isMobile: false,
            form: {
                content: null,
            },
            images: [],
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

          if (!Array.isArray(this.images)) {
            this.images = []
          }
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

          console.log(this.images, 'image')

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
