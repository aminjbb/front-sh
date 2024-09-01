<template>
<main class="v-ticket">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/ticket" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="text-sGrayDarken2 t14 w700">افزودن تیکت</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>

            <div class="col-9 pa-4 mobile-pa-0">
                <v-card class="pa-8 mobile-pa-0 mobile-no-border v-ticket__card">
                    <div class="ticket__form" :class="isMobile === true ? 'px-3' : 'pt-8 px-6'">
                        <p class="t12 w500 text-sGrayDarken1 mb-2 l25">
                            برای ثبت تیکت جدید، لطفاً اطلاعات خواسته شده را در فرم زیر تکمیل کنید. در صورت نیاز، می‌توانید فایل‌های مرتبط را پیوست کنید. این اطلاعات به ما کمک می‌کند تا به‌سرعت و به بهترین نحو ممکن به درخواست شما رسیدگی کنیم.
                        </p>

                        <v-form ref="ticket" v-model="valid">
                            <v-row class="ticket__form__1stRow w-100 ma-0">
                                <div class="ticket__form__item ticket__form__item--text-field">
                                    <v-select label="موضوع" density="compact" variant="outlined"  :rules="rule" item-title="title" item-value="value" hide-details :items="getFirstTitles" v-model="form.title" @update:model-value="getSubTitle()"/>
                                </div>

                                <div class="ticket__form__item ticket__form__item--text-field">
                                    <v-select label="انتخاب زیرموضوع" density="compact" variant="outlined" :rules="rule" item-title="title" item-value="value" hide-details :items="subTitleList" v-model="form.subtitle" @update:model-value="selectSubTitle()"/>
                                </div>

                                <div cols="12" md="6" class="ticket__form__item ticket__form__item--text-field">
                                    <v-select label="اولویت تیکت" density="compact" variant="outlined" :rules="rule" item-title="title" item-value="value" hide-details :items="priorities" v-model="form.priority"/>
                                </div>

                                <div cols="12" md="6" class="ticket__form__item ticket__form__item--text-field">
                                    <v-text-field density="compact" variant="outlined"  :rules="mandatoryFields['sku_id'] ? rule : ''" hide-details label="شناسه کالا" v-model="form.sku_id" />
                                </div>

                                <div cols="12" md="6" class="ticket__form__item ticket__form__item--text-field">
                                    <v-text-field density="compact" variant="outlined" :rules="mandatoryFields['order_number'] ? rule : ''" hide-details label="شماره سفارش" v-model="form.order_number" />
                                </div>
                            </v-row>

                            <v-row>
                                <v-col cols="12" class="ticket__form__item ticket__form__item--text-field">
                                    <v-textarea label="توضیحات" variant="outlined" v-model="form.content" placeholder="توضیحات را اینجا بنویسید" hide-details rows="4" />
                                </v-col>

                                <v-col cols="12" class="ticket__form__item ">
                                    <span class="t16 w700 text-sGrayDarken2 mb-3 d-block">افزودن فایل</span>
                                    <generalUploader @getImage="getImage" :rules="uploadRules" :isMobile="isMobile === true ? true : false"/>
                                </v-col>
                            </v-row>
                        </v-form>

                        <div class="d-flex justify-center w-100 mobile-pa-0 align-center mb-7 mt-5">
                            <v-btn :loading="loading" @click="addTicket()" prepend-icon="mdi-message-processing-outline" height="44" class="btn btn--submit px-5 br12" title="ثبت تیکت" :block="isMobile === true ? true : false">
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
            valid: true,
            loading: false,
            isMobile: false,
            tab: null,
            images: [],
            ticketImage: [],
            subTitleList: [],
            mandatoryFields:[],
            titleChildren: null,
            rule: [v => !!v || 'این فیلد الزامی است'],

            form: {
                title: null,
                subtitle: null,
                sku_id: null,
                order_number: null,
                priority: null,
                content: null,
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

            uploadRules: [
                'کاربر عزیز حداکثر حجم فایل  10 مگابایت باشد.',
                'فرمت مجاز jpeg - png - mp4 - mkv باشد.'
            ]
        }
    },

    computed:{
        getFirstTitles(){
          const firstTitleArray = [];

          this.titleList.forEach(item => {
              const value = {
                title : item.title,
                value : item.id
              }
              firstTitleArray.push(value)
          })
          
          return firstTitleArray;
        }
    },

    setup() {
        const title = ref('ایجاد تیکت جدید')
        const description = ref('فروشگاه اینترنتی شاواز | ایجاد تیکت جدید');

        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken');

        const {
            getUserTicketTitle,
            titleList
        } = new User();

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        });

        return {
            runtimeConfig,
            userToken,
            getUserTicketTitle,
            titleList
        }
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
         * Add ticket
         */
        addTicket() {
            this.loading = true;
            const formData = new FormData()
            let skuAccess = true;
            let orderNumberAccess = true;
            let photoAccess = true;

            /* Check required item in form */
            if(this.mandatoryFields && this.mandatoryFields.length){
                this.mandatoryFields.forEach(item => {
                  if(item === 'sku_id' ){
                    console.log(this.form.sku_id )
                    if(this.form.sku_id !== null && this.form.sku_id !== ''){
                      skuAccess = true
                    } else{
                      useNuxtApp().$toast.error('شناسه کالا انتخاب نشده است.', {
                          rtl: true,
                          position: 'top-center',
                          theme: 'dark'
                      });

                      skuAccess = false;
                    }
                  }

                  if(item === 'order_number' ){
                    if(this.form.order_number !== null && this.form.order_number !== ''){
                      orderNumberAccess = true
                    } else{
                      useNuxtApp().$toast.error('شماره سفارش انتخاب نشده است.', {
                          rtl: true,
                          position: 'top-center',
                          theme: 'dark'
                      });

                      orderNumberAccess = false;
                    }
                  }

                  if(item === 'photo' ){
                    if(this.images && this.images.length){
                      photoAccess = true
                    } else{
                      useNuxtApp().$toast.error('تصویری از محصول آپلود نشده است..', {
                          rtl: true,
                          position: 'top-center',
                          theme: 'dark'
                      });

                      photoAccess = false;
                    }
                  }
                });
            }

            if(skuAccess === true && photoAccess === true && orderNumberAccess === true){
              formData.append('topic_id', this.form.subtitle)
              formData.append('content', this.form.content)
              formData.append('priority', this.form.priority)
              formData.append('sku_id', Number(String(this.form.sku_id)))
              formData.append('order_number', Number(String(this.form.order_number)))

              if (this.images) {
                  this.images.forEach((image, index) => {
                      formData.append(`files_id[${index}]`, image)
                  })
              }

              axios
                  .post(this.runtimeConfig.public.apiBase + '/ticket/user/crud/create', formData, {
                      headers: {
                          Authorization: `Bearer ${this.userToken}`,
                      },
                  })
                  .then((response) => {
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({
                          event: 'submitTicket', // The event name for tracking ticket submissions.
                          userID: this.$store.getters['get_userData'].id, // The user's unique identifier.
                          ticketpriority: this.form.priority, // The priority of the ticket.
                          ticketSubject: this.form.title, // The subject of the ticket.
                          ticketDescription: this.form.content, // The detailed description of the issue.
                      });

                      this.$router.push(`/user/ticket/${response?.data?.data?.id}`);

                      useNuxtApp().$toast.success('تیکت شما با موفقیت ایجاد شد.', {
                          rtl: true,
                          position: 'top-center',
                          theme: 'dark'
                      });
                  })
                  .catch((err) => {
                    if (err.response ?.data ?.details?.order_number){
                      useNuxtApp().$toast.error(err.response ?.data ?.details?.order_number, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                      });
                    }
                    if (err.response ?.data ?.details?.sku_id){
                      useNuxtApp().$toast.error(err.response ?.data ?.details?.sku_id, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                      });
                    }
                    if (err.response ?.data ?.details?.files_id){
                      useNuxtApp().$toast.error(err.response ?.data ?.details?.files_id, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                      });
                    }


                  }).finally(() => {
                      this.loading = false;
                  });
            } else{
              this.loading = false;
            }
        },

        /**
         * Fix bug for select in c-select
         */
        getSubTitle() {
            this.subTitleList = [];
            this.titleChildren = null;

            const item = this.titleList.find(item => item.id === this.form.title);
            this.mandatoryFields = item.mandatory_fields;

            this.titleChildren = item?.children;

            this.titleChildren.forEach(item => {
                const value = {
                  title : item.title,
                  value : item.id
                }
                this.subTitleList.push(value)
            })
        },

        selectSubTitle(){
            const item = this.titleList.find(item => item.id === this.form.title);
            this.mandatoryFields = this.mandatoryFields.concat(item.mandatory_fields.filter(item => !this.mandatoryFields.includes(item)));
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.isMobile = true : this.isMobile = false;

        this.getUserTicketTitle();
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/ticket.scss';
</style>
