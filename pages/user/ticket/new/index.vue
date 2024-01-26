<template lang="">
<main class="v-ticket">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">ثبت تیکت جدید</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>

            <div class="col-9 pa-4 mobile-pa-0">
                <v-card class="pa-8 mobile-pa-0 mobile-no-border has-header" style="min-height:100%">
                    <header class="d-flex align-center xs-hide card__header">
                        <a href="/user/ticket" class="ml-3">
                            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
                        </a>

                        <h1>ثبت تیکت جدید</h1>
                    </header>

                    <div class="ticket__form" :class="isMobile === true ? 'px-3' : 'pt-8 px-6'">
                        <v-form ref="ticket" v-model="valid">
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="6"
                                    class="ticket__form__item ticket__form__item--text-field">
                                    <label class="d-block t12 text-grey-darken-3 mb-2">موضوع <span class="text-red-accent-4">*</span></label>

                                    <v-text-field
                                        class=""
                                        :rules="persianRule"
                                        density="compact"
                                        variant="outlined"
                                        single-line
                                        hide-details
                                        v-model="form.title" />
                                </v-col>

                                <v-col
                                    cols="12"
                                    md="6"
                                    class="ticket__form__item ticket__form__item--text-field">
                                    <label class="d-block t12 text-grey-darken-3 mb-2">اولویت </label>

                                    <v-select
                                        density="compact"
                                        variant="outlined"
                                        single-line
                                        :rules="rule"
                                        item-title="title"
                                        item-value="value"
                                        hide-details
                                        :items="priorities"
                                        v-model="form.priority" />
                                </v-col>

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
                                @click="addTicket()"
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
            isMobile:false,
            tab: null,
            form: {
                title: null,
                priority: null,
                content: null,
                files: null,
            },
            priorities: [{
                    title: 'فوری',
                    value: 'urgent'
                },
                {
                    title: 'بالا',
                    value: 'high'
                },
                {
                    title: 'معمولی',
                    value: 'medium'
                },
                {
                    title: 'پایین',
                    value: 'low '
                },
            ],
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | لیست تیکت های من')
        const description = ref("لیست تیکت ها");

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
    },

    methods: {
        getImage() {
            //TODO: get image
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
