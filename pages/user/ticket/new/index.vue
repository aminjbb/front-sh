<template>
  <main class="v-ticket">
    <header class="v-user__mobile-page-head xs-show">
      <a href="/user/ticket" class="ml-3">
        <v-icon icon="mdi-arrow-right" color="grey-darken-3"/>
      </a>
      <span class="text-sGrayDarken2 t14 w700">افزودن تیکت</span>
    </header>

    <v-container>
      <v-row>
        <div class="col-3 pa-4 xs-hide">
          <generalUserSidebar/>
        </div>

        <div class="col-9 pa-4 mobile-pa-0">
          <v-card class="pa-8 mobile-pa-0 mobile-no-border v-ticket__card">
            <div class="ticket__form" :class="isMobile === true ? 'px-3' : 'pt-8 px-6'">
              <p class="t12 w500 text-sGrayDarken1 mb-2 l25">
                برای ثبت تیکت جدید، لطفاً اطلاعات خواسته شده را در فرم زیر تکمیل کنید. در صورت نیاز، می‌توانید فایل‌های
                مرتبط را پیوست کنید. این اطلاعات به ما کمک می‌کند تا به‌سرعت و به بهترین نحو ممکن به درخواست شما رسیدگی
                کنیم.
              </p>

              <v-form ref="ticket" v-model="valid">
                <v-row class="ticket__form__1stRow w-100 ma-0" v-if="!isMobile">
                  <div class="ticket__form__item ticket__form__item--text-field w__flex--50">
                    <desktopKitsSelectShSelect key="changeTitle" label="موضوع" :items="getFirstTitles" @changeValue="changeTitle"/>
                  </div>

                  <div class="ticket__form__item ticket__form__item--text-field  w__flex--50">

                    <desktopKitsSelectShSelect key="changePriority" label="اولویت تیکت" :items="priorities" @changeValue="changePriority"/>


                  </div>

                  <div class="ticket__form__item ticket__form__item--text-field " v-if="subTitleList?.length"
                       :class="mandatoryFields.includes('seller_sku_id') && mandatoryFields.includes('order_number')? '' :'w__flex--50'">
                    <desktopKitsSelectShSelect key="changeSubTitle" ref="subTitleList" label="انتخاب زیرموضوع" :items="subTitleList" @changeValue="changeSubTitle"/>
                  </div>

                  <template v-for="mandatoryField in mandatoryFields">
                    <div class="ticket__form__item ticket__form__item--text-field"
                         v-if="mandatoryField ==='seller_sku_id'"
                         :class="mandatoryFields.includes('seller_sku_id') && mandatoryFields.includes('order_number')? '' :'w__flex--50'">
                      <v-text-field density="compact" variant="outlined"
                                    :rules="mandatoryFields['seller_sku_id'] ? rule : ''" hide-details
                                    label="شناسه کالا" v-model="form.seller_sku_id"/>
                    </div>

                    <div class="ticket__form__item ticket__form__item--text-field"
                         v-if="mandatoryField ==='order_number'"
                         :class="mandatoryFields.includes('seller_sku_id') && mandatoryFields.includes('order_number')? '' :'w__flex--50'">
                      <v-text-field density="compact" variant="outlined"
                                    :rules="mandatoryFields['order_number'] ? rule : ''" hide-details
                                    label="شماره سفارش" v-model="form.order_number"/>
                    </div>
                  </template>


                </v-row>
                <v-row class="ticket__form__1stRow w-100 ma-0" v-else>
                  <div>
                    <mobileKitsSelectShSelect id="firstTitles" key="firstTitles" label="موضوع" :items="getFirstTitles" @changeValue="changeTitle" />

                  </div>
                  <div v-if="subTitleList?.length">

                    <mobileKitsSelectShSelect :title="`زیرموضوع ${subTitle}`" ref="subTitleList" id="subTitleList" key="subTitleList" label="زیرموضوع" :items="subTitleList" @changeValue="changeSubTitle" />

                  </div>

                  <div >
                    <mobileKitsSelectShSelect title="اولویت " id="priorities" key="priorities" label="اولویت تیکت" :items="priorities" @changeValue="changePriority" />
                  </div>



                  <template v-for="mandatoryField in mandatoryFields">
                    <div
                         v-if="mandatoryField ==='seller_sku_id'">
                      <v-text-field density="compact" variant="outlined"
                                    :rules="mandatoryFields['seller_sku_id'] ? rule : ''" hide-details
                                    label="شناسه کالا" v-model="form.seller_sku_id"/>
                    </div>

                    <div
                         v-if="mandatoryField ==='order_number'">
                      <v-text-field density="compact" variant="outlined"
                                    :rules="mandatoryFields['order_number'] ? rule : ''" hide-details
                                    label="شماره سفارش" v-model="form.order_number"/>
                    </div>
                  </template>


                </v-row>

                <v-row>
                  <v-col cols="12" class="ticket__form__item ticket__form__item--text-field">
                    <v-textarea label="توضیحات" :rules="rule" variant="outlined" v-model="form.content"
                                placeholder="توضیحات را اینجا بنویسید" hide-details rows="4"/>
                  </v-col>

                  <v-col cols="12" class="ticket__form__item ">
                    <span class="t16 w700 text-sGrayDarken2 mb-3 d-block">افزودن فایل</span>
                    <generalUploader @getImage="getImage" :rules="uploadRules"
                                     :isMobile="isMobile === true ? true : false"/>
                  </v-col>
                </v-row>
              </v-form>

              <div class="d-flex justify-center w-100 mobile-pa-0 align-center mb-7 mt-5">
                <v-btn :loading="loading" @click="validate()" prepend-icon="mdi-message-processing-outline" height="44"
                       class="btn btn--submit px-5 br12" title="ثبت تیکت" :block="isMobile === true ? true : false">
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
      mandatoryFields: [],
      subTitle:'',
      titleChildren: null,
      rule: [v => !!v || 'این فیلد الزامی است'],

      form: {
        title: null,
        subtitle: null,
        seller_sku_id: null,
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

  computed: {
    getFirstTitles() {
      const firstTitleArray = [];

      this.titleList.forEach(item => {
        const value = {
          title: item.title,
          value: item.id
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

    changeTitle(value){
      this.form.title = value?.value
      this.subTitle = value?.title
      if (this.$refs.subTitleList ) this.$refs.subTitleList.selectValue = null
      this.getSubTitle()
    },
    changeSubTitle(value){
      this.form.subtitle = value?.value
      this.selectSubTitle()
    },
    changePriority(value){
      this.form.priority = value?.value
    },
    /**
     * Get image
     * @param {*} response
     */
    getImage(response) {
      const image = response.file_id;
      this.images.push(image);
    },

    async validate() {
      this.$refs.ticket.validate()
      if (this.valid) {
        await this.addTicket()
      }
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
      if (this.mandatoryFields && this.mandatoryFields.length) {
        this.mandatoryFields.forEach(item => {
          if (item === 'seller_sku_id') {
            if (this.form.seller_sku_id !== null && this.form.seller_sku_id !== '') {
              skuAccess = true
            } else {
              useNuxtApp().$toast.error('شناسه کالا انتخاب نشده است.', {
                rtl: true,
                position: 'top-center',
                theme: 'dark'
              });

              skuAccess = false;
            }
          }

          if (item === 'order_number') {
            if (this.form.order_number !== null && this.form.order_number !== '') {
              orderNumberAccess = true
            } else {
              useNuxtApp().$toast.error('شماره سفارش انتخاب نشده است.', {
                rtl: true,
                position: 'top-center',
                theme: 'dark'
              });

              orderNumberAccess = false;
            }
          }

          if (item === 'photo') {
            if (this.images && this.images.length) {
              photoAccess = true
            } else {
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

      if (skuAccess === true && photoAccess === true && orderNumberAccess === true) {
        const topicId = this.form.subtitle ? this.form.subtitle : this.form.title
        formData.append('topic_id', topicId)
        formData.append('content', this.form.content)
        formData.append('priority', this.form.priority)
        if (this.form.seller_sku_id) formData.append('seller_sku_id', Number(String(this.form.seller_sku_id)))
        if (this.form.order_number) formData.append('order_number', Number(String(this.form.order_number)))

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
              if (err.response?.data?.details?.order_number) {
                useNuxtApp().$toast.error(err.response?.data?.details?.order_number, {
                  rtl: true,
                  position: 'top-center',
                  theme: 'dark'
                });
              }
              if (err.response?.data?.details?.seller_sku_id) {
                useNuxtApp().$toast.error(err.response?.data?.details?.seller_sku_id, {
                  rtl: true,
                  position: 'top-center',
                  theme: 'dark'
                });
              }
              if (err.response?.data?.details?.files_id) {
                useNuxtApp().$toast.error(err.response?.data?.details?.files_id, {
                  rtl: true,
                  position: 'top-center',
                  theme: 'dark'
                });
              }

              if (err.response?.data?.details?.topic_id) {
                useNuxtApp().$toast.error(err.response?.data?.details?.topic_id, {
                  rtl: true,
                  position: 'top-center',
                  theme: 'dark'
                });
              }

              if (err.response?.data?.message) {
                useNuxtApp().$toast.error(err.response?.data?.message, {
                  rtl: true,
                  position: 'top-center',
                  theme: 'dark'
                });
              }

            }).finally(() => {
          this.loading = false;
        });
      } else {
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
          title: item.title,
          value: item.id,
          object: item,
        }
        this.subTitleList.push(value)
      })
      this.form.subtitle = null
      this.form.order_number = null
      this.form.seller_sku_id = null
    },

    selectSubTitle() {
      const item = this.subTitleList.find(item => item.value === this.form.subtitle);
      this.mandatoryFields = []
      this.mandatoryFields = this.mandatoryFields.concat(item?.object.mandatory_fields.filter(item => !this.mandatoryFields.includes(item)));

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
