<template>
<div class="c-modal">
    <v-btn @click="openModal()" height="36" title="ثبت دیدگاه" append-icon="mdi-comment-plus-outline" class="btn btn--comment">
        ثبت دیدگاه
    </v-btn>

    <v-dialog v-if="dialog" v-model="dialog" color="white" width="850px" :fullscreen="screenType === 'mobile'? true : false">
        <v-card class="pt-3 px-6 pb-5 c-modal--comment">
            <header class="c-modal--comment__header d-flex justify-space-between align-center pb-1">
                <div class="d-flex flex-column c-modal--comment__header__title">
                    <span class="t16 w400 mb-3">
                        ثبت دیدگاه
                    </span>
                    <span class="t12 w400 text-grey mb-2">{{ title }}</span>
                </div>

                <v-btn class="c-modal--comment__header__btn pa-0 text-none" @click="closeModal()" color="grey-darken-1" size="large" variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div>
                <div class="give-rate mt-5">
                    <div class="t14 w400 mb-3 text-center text-grey-darken-3">
                        امتیاز شما
                    </div>

                    <div class="d-flex align-center justify-center">
                        <v-rating class="ltr" hover :length="5" :size="32" half-increments :model-value="rateModel" v-model="rateModel" color="grey" active-color="orange-darken-1" />
                    </div>
                </div>

                <v-divider color="grey" class="mb-3 mt-5" />

                <div>
                    <label class="d-block t12 text-grey-darken-3 mb-4">متن دیدگاه <span class="text-red">*</span></label>
                    <v-form ref="addComment" v-model="valid">
                        <v-textarea variant="outlined" v-model="comment" :rules="rule" placeholder="دیدگاه خود را با دیگران به اشتراک بگذارید" rows="3" />
                    </v-form>
                </div>

                <div>
                    <h5 class="t14 w400 text-grey-darken-3 mb-3">لطفا پیش از ارسال نظر، قوانین زیر را مطالعه نمایید.</h5>

                    <p class="t13 w400 text-grey l25 mb-3">
                        لازم است محتوای ارسالی منطبق برعرف و شئونات جامعه و با بیانی رسمی و عاری از لحن تند، تمسخرو توهین باشد.
                        <br>
                        از ارسال لینک‌ سایت‌های دیگر و ارایه‌ی اطلاعات شخصی نظیر شماره تماس، ایمیل و آی‌دی شبکه‌های اجتماعی پرهیز
                        کنید.
                        <br>
                        در نظر داشته باشید هدف نهایی از ارائه‌ی نظر درباره‌ی کالا ارائه‌ی اطلاعات مشخص و مفید برای راهنمایی سایر
                        کاربران در فرآیند انتخاب و خرید یک محصول است.
                    </p>

                    <span class="t12 w500 text-grey-darken-1">ثبت دیدگاه به معنی موافقت با <span class="text-info">قوانین انتشار شاواز</span> می‌باشد.</span>
                </div>

                <v-divider color="grey" class="mb-5 mt-4" />

                <div class="mt-2 w-100 d-flex align-center justify space-between">
                    <v-btn @click="closeModal()" height="44" title="انصراف" class="btn btn--cancel ml-2">
                        انصراف
                    </v-btn>

                    <v-btn :loading="loading" @click="commentValidate()" height="44" title="تایید و ثبت" class="btn btn--submit mr-2">
                        تایید و ثبت
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</div>
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
            screenType: null,
            loading: false,
            rateModel: 0,
            comment: null,
            valid: true,
            rule: [(v) => !!v || 'این فیلد الزامی است']
        }
    },

    props: {
        /**Modal title */
        title: String,

        /**Modal text */
        text: String,

        /** Product id */
        productId: String,
        /** productSelectedSeller for add comment **/
        productSelectedSeller: Object,
        /** method for get SecondaryData after add comment **/
        getSecondaryData: Function
    },

    methods: {
        openModal() {
            if (this.userToken) this.dialog = true;
            else {
                localStorage.setItem('returnPathAfterLogin', this.$route.fullPath)
                this.$router.push('/login')
            }

        },
        closeModal() {
            this.dialog = false;
        },

        /** validate comment form **/
        async commentValidate() {
            await this.$refs.addComment.validate()
            setTimeout(() => {
                if (this.valid) this.AddComment()
            }, 200)
        },

        /** send comment to api **/
        AddComment() {
            if (this.rateModel === 0) {
                useNuxtApp().$toast.error('لطفا امیتاز را وارد نمایید.', {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            }
            else{
              this.loading = true
              axios.post(this.runtimeConfig.public.apiBase + `/product/pdp/comment/crud/create/`, {
                    sku_id: this.productSelectedSeller.sku_id,
                    shps: this.productSelectedSeller.id,
                    comment: this.comment,
                    score: this.rateModel
                }, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },

                }, )
                .then((response) => {
                    const userDetail = this.$store.getters['get_userData'];
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: 'commentSubmission', // The event name for tracking comment submissions.
                        userStatus: null, // or 'returning' depending on the user's status.
                        userMobileNumber: userDetail?.phone_number, // The user's mobile number used for login.
                        ecommerce: {
                            comment: { // Object to hold the comment details.
                                item_id: this.productSelectedSeller.id, // The product ID related to the comment.
                            }
                        }
                    }); 

                    this.getSecondaryData()
                    this.$refs.addComment.reset()
                })
                .catch((err) => {

                }).finally(() => {
                    this.loading = false
                    this.closeModal()
                })
            }
        },
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },
}
</script>

<style lang="scss">
.c-modal--comment {
    .v-card {
        background: #fff !important;
    }

    &__header {
        border-bottom: 1px solid #E0E0E0;

        &__btn {
            min-width: auto !important;
        }

        &__title span:first-child {
            color: #424242 !important;
            font-size: 16px !important;
        }
    }

    .btn--cancel {
        width: 30%;
    }

    .btn--submit {
        width: 68%;
    }

    .v-field__input {
        font-size: 12px;
    }
}

.c-modal {
    .btn--comment {
        border-radius: 4px;
        background: var(--pink-pink-lighten-5, #FBE9F3);
        height: 36px !important;

        .v-btn__content {
            font-size: 13px;
            font-variation-settings: "wght"500;
        }

        .v-btn__content,
        .v-icon {
            color: #757575;
        }
    }
}
</style>
