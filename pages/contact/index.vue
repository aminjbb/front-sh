<template>
<main class="v-contact">
    <v-container>
        <generalBreadcrumb :items="BreadcrumbItems" />

        <v-card class="pa-8 mobile-no-border">
            <div class="faq-box d-flex justify-center align-center">
                <div class="faq-box__image ml-10" />
                <div class="faq-box__content">
                    <h2 class="t16 w400 text-grey-darken-3 mb-5">تماس با شاواز</h2>
                    <p class="ma-0 t13 w400 text-grey-darken-1">لطفا پیش از ثبت تیکت، ابتدا بخش <a href="/faq" class="text-blue">سوالات متداول</a> را مطالعه نمایید.
                    </p>
                </div>
            </div>
        </v-card>

        <v-card class="pa-8 mobile-no-border">
            <div class="contact-info">
                <h1 class="t24 w500 mb-8 text-grey-darken-2">راه های ارتباط با شاواز</h1>

                <div class="d-flex align-center">
                    <v-icon
                        icon="mdi-phone-in-talk-outline"
                        color="grey"
                        class="ml-2" />

                    <div class="d-flex align-center">
                        <span class="t14 w400 text-grey-darken-2 ml-1">شماره تماس:</span>

                        <a :href="setTel('02191032343')" class="number-font t14 w400 text-grey-darken-2" dir="ltr">
                            021-91032343
                        </a>
                    </div>
                </div>

                <div class="d-flex align-center mt-5">
                    <v-icon
                        icon="mdi-email-outline"
                        color="grey"
                        class="ml-2" />

                    <div class="d-flex align-center">
                        <span class="t14 w400 text-grey-darken-2 ml-1">پست الکترونیک: Info@shavaz.com</span>
                    </div>
                </div>

                <div class="d-flex align-center mt-5">
                    <v-icon
                        icon="mdi-map-marker-outline"
                        color="grey"
                        class="ml-2" />

                    <div class="d-flex align-center">
                        <span class="t14 w400 text-grey-darken-2 ml-1 number-font l28">آدرس: تهران، بزرگراه باکری جنوب کوی ارم خیابان شهیدمحسن یعقوبی(بهار جنوبی) نبش کوچه شهید اکبر اصغر زاده پلاک 18 </span>
                    </div>
                </div>

                <div class="d-flex align-center mt-5">
                    <v-icon
                        icon="mdi-clock-outline"
                        color="grey"
                        class="ml-2" />

                    <div class="d-flex align-center">
                        <span class="t14 w400 text-grey-darken-2 ml-1 number-font">ساعت کاری: شنبه تا چهارشنبه از ساعت 9 الی 24 و پنجشنبه ها از 9 الی 22 </span>
                    </div>
                </div>

                <h2 class="t24 w500 mb-5 text-grey-darken-2 mt-8">شبکه های مجازی</h2>
                <div class="d-flex align-center contact-info__socials">
                    <a href="https://www.instagram.com/shavazcom" target="_blank" title="Shavaz instagram account | اکانت اینستاگرام شاواز " class="ml-2 d-block">
                        <v-icon icon="mdi-instagram" color="grey" />
                    </a>

                    <a href="https://www.aparat.com/shavaz.com" target="_blank" title="shavaz-aparat-account" class="ml-2 d-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11.9963 3.32781C4.27049 3.32531 0.400908 12.6646 5.86232 18.1277C7.07476 19.3405 8.61961 20.1664 10.3015 20.5012C11.9834 20.8359 13.7268 20.6643 15.3112 20.0082C16.8955 19.352 18.2498 18.2408 19.2025 16.815C20.1553 15.3891 20.6639 13.7128 20.6639 11.9979C20.6639 7.21072 16.7843 3.32948 11.9963 3.32781ZM7.08662 7.65244C7.50416 5.48721 10.3311 4.90714 11.5671 6.73317C12.8031 8.55836 11.2154 10.9686 9.05016 10.5519C8.7308 10.4906 8.42665 10.3669 8.15511 10.1879C7.88356 10.009 7.64994 9.77831 7.46759 9.50904C7.28524 9.23977 7.15774 8.93721 7.09237 8.61864C7.027 8.30008 7.02505 7.97176 7.08662 7.65244ZM10.6887 15.1432C10.2686 17.3076 7.44166 17.8835 6.20736 16.0567C4.97389 14.2298 6.56323 11.8229 8.72846 12.2404C9.04786 12.3021 9.35197 12.4262 9.62339 12.6055C9.89481 12.7848 10.1282 13.0159 10.3103 13.2855C10.4923 13.5551 10.6194 13.8579 10.6844 14.1767C10.7493 14.4955 10.7508 14.8239 10.6887 15.1432ZM11.7388 13.1389C10.7787 12.953 10.5203 11.6995 11.3296 11.1495C12.138 10.5994 13.2098 11.2995 13.0297 12.2613C13.0031 12.4038 12.9484 12.5396 12.8691 12.661C12.7897 12.7823 12.6871 12.8868 12.5672 12.9684C12.4473 13.0499 12.3124 13.107 12.1704 13.1362C12.0284 13.1655 11.8812 13.1664 11.7388 13.1389ZM16.9052 16.3375C16.4876 18.5028 13.6606 19.082 12.4247 17.2568C11.1879 15.4308 12.7756 13.0213 14.9416 13.4372C15.2611 13.4986 15.5653 13.6223 15.8369 13.8013C16.1085 13.9803 16.3422 14.211 16.5245 14.4804C16.7069 14.7498 16.8344 15.0524 16.8997 15.3711C16.965 15.6897 16.9669 16.0181 16.9052 16.3375ZM15.2658 11.752C13.1006 11.3345 12.5214 8.50503 14.3474 7.26823C16.1726 6.03226 18.582 7.61993 18.1661 9.78516C18.1052 10.1049 17.9817 10.4095 17.8029 10.6815C17.6241 10.9535 17.3934 11.1875 17.124 11.3702C16.8546 11.5529 16.5518 11.6807 16.2329 11.7462C15.9141 11.8117 15.5854 11.8137 15.2658 11.752ZM13.3206 21.3881L15.2075 21.8964C16.0009 22.107 16.8454 21.9938 17.5554 21.5819C18.2654 21.1699 18.7828 20.4928 18.9937 19.6995L19.5271 17.6977C18.0254 19.698 15.7945 21.0243 13.3198 21.3881M19.6896 4.99882L17.7202 4.4746C18.7155 5.24013 19.5487 6.19573 20.1717 7.28592C20.7946 8.37611 21.1948 9.57917 21.349 10.8253L21.8907 8.77589C22.098 7.9832 21.9827 7.14064 21.57 6.43282C21.1572 5.725 20.4808 5.20964 19.6888 4.99965M2.55447 13.5081L2.10359 15.2082C1.89306 16.0016 2.00622 16.8462 2.41819 17.5562C2.83015 18.2662 3.5072 18.7835 4.30049 18.9945L6.05651 19.4629C4.18176 17.9889 2.93192 15.8628 2.55447 13.5081ZM10.6262 2.5844L8.7868 2.10435C8.39366 1.99962 7.98374 1.97341 7.58047 2.0272C7.1772 2.08099 6.78848 2.21373 6.43654 2.41783C6.0846 2.62194 5.77633 2.89341 5.52937 3.21672C5.2824 3.54003 5.10158 3.90884 4.99723 4.30208L4.53801 6.03726C6.05294 4.15176 8.23037 2.91654 10.6262 2.5844Z" fill="#9E9E9E" />
                        </svg>
                    </a>

                    <a href="https://t.me/shavazcomm" target="_blank" title="Shavaz telegram account | اکانت تلگرام شاواز " class="ml-2 d-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.3764 4.19134L2.6573 11.0595C1.94425 11.3794 1.70308 12.0199 2.48496 12.3675L7.03066 13.8196L18.0216 6.99185C18.6217 6.56322 19.2361 6.67751 18.7074 7.14904L9.26769 15.7402L8.97116 19.376C9.24581 19.9374 9.7487 19.94 10.0695 19.661L12.6811 17.177L17.154 20.5437C18.1928 21.1619 18.7581 20.763 18.9816 19.6299L21.9154 5.66623C22.22 4.2715 21.7006 3.65697 20.3764 4.19134Z" fill="#9E9E9E" />
                        </svg>
                    </a>

                    <a href="https://www.youtube.com/channel/UCh1GzMPHJXoIvTP9DtUli4w" target="_blank" title="Shavaz youtube account | اکانت یونیوب شاواز " class="ml-2 d-block">
                        <v-icon icon="mdi-youtube" color="grey" />
                    </a>

                    <a href="https://twitter.com/ShavazCom" target="_blank" title="Shavaz twitter account | اکانت تویتر شاواز " class="ml-2 d-block">
                        <v-icon icon="mdi-twitter" color="grey" />
                    </a>

                    <a href="https://www.linkedin.com/company/shavaz/about" target="_blank" title="shavaz linkedin account | اکانت لینکدین شاواز " class="ml-2 d-block">
                        <v-icon icon="mdi-linkedin" color="grey" />
                    </a>
                </div>
            </div>
        </v-card>

        <v-card class="pa-8 mobile-no-border">
            <div class="contact-info">
                <h2 class="t16 w500 mb-8 text-grey-darken-2">حرف هاتون رو میخونیم و منتظر نظراتتون هستیم</h2>

                <div class="contact__form mt-5">
                    <v-form ref="contact" v-model="valid">
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                                class="contact__form__item contact__form__item--text-field">
                                <label class="d-block t14 text-grey-darken-3 mb-4">نام و نام خانوادگی:</label>

                                <v-text-field
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    v-model="form.full_name" />
                            </v-col>

                            <v-col
                                cols="12"
                                md="6"
                                class="contact__form__item contact__form__item--text-field">
                                <label class="d-block t14 text-grey-darken-3 mb-4">موضوع <span class="text-red-accent-4">*</span> </label>

                                <v-select
                                    ref="subjectSelect"
                                    density="compact"
                                    variant="outlined"
                                    :rules="rule"
                                    item-title="label"
                                    item-value="value"
                                    :items="categoryTypes"
                                    @update:menu="onUpdateMenu"
                                    v-model="form.subject" />
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                                class="contact__form__item contact__form__item--text-field">
                                <label class="d-block t14 text-grey-darken-3 mb-4">شماره تماس:</label>

                                <v-text-field
                                    density="compact"
                                    :rules="mobileRule"
                                    variant="outlined"
                                    type="number"
                                    single-line
                                    v-model="form.phone_number" />
                            </v-col>

                            <v-col
                                cols="12"
                                md="6"
                                class="contact__form__item contact__form__item--text-field">
                                <label class="d-block t14 text-grey-darken-3 mb-4">پست الکترونیک:</label>

                                <v-text-field
                                    density="compact"
                                    variant="outlined"
                                    type="email"
                                    single-line
                                    v-model="form.email" />
                            </v-col>

                            <v-col cols="12" class="contact__form__item contact__form__item--text-field">
                                <label class="d-block t14 text-grey-darken-3 mb-4">توضیحات:</label>

                                <v-textarea
                                    variant="outlined"
                                    :rules="rule"
                                    v-model="form.description"
                                    placeholder="توضیحات را اینجا بنویسید"
                                    rows="3" />
                            </v-col>
                        </v-row>
                    </v-form>
                    <div class="d-flex justify-end">
                        <v-btn
                            :loading="loading"
                            @click="sendContactMassage()"
                            height="44"
                            color="primary"
                            class="px-8 mt-3"
                            title="ارسال فرم تماس با ما">
                            ارسال پیام
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-card>

        <a class="v-contact__map" href="https://www.google.com/maps/?q=35.72814946987037,51.290000176638316" target="_blank">
            <img src="~/assets/images/shavaz_map.jpg" width="1296" height="356" alt="Shavaz location on map" />
        </a>
    </v-container>
</main>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            loading: false,
            valid: true,
            rule: [v => !!v || 'این فیلد الزامی است'],
            BreadcrumbItems: [{
                    title: 'خانه',
                    href: '/'
                },
                {
                    title: 'تماس با ما',
                    href: '/contact'
                }
            ],
            form: {
                full_name: null,
                phone_number: null,
                email: null,
                subject: null,
                description: null,
            },
            mobileRule: [
                (v) =>
                /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
                    v
                ) || "شماره موبایل معتبر نیست",
            ],
            categoryTypes: [{
                    label: 'پیشنهادات',
                    value: 'suggestion'
                },
                {
                    label: 'انتقاد و شکایات',
                    value: 'criticism'
                },
                {
                    label: 'ارتباط با واحد بازرگانی',
                    value: 'commercial'
                },
                {
                    label: 'ارتباط با واحد دیجیتال مارکتینگ',
                    value: 'digital_marketing'
                },
                {
                    label: 'ارتباط با واحد پشتیبانی',
                    value: 'support'
                },
                {
                    label: 'سایر موضوعات',
                    value: 'other'
                }
            ],
        }
    },
    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | تماس با ما')
        const description = ref("آنچه باید درباره شاواز بدانید")

        const runtimeConfig = useRuntimeConfig()


        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })

        return {
            title,
            runtimeConfig
        }
    },

    methods: {
        /**
         * @param tel
         * @return {string}
         */
        setTel(tel) {
            let num = tel;
            if (String(num)[0] === String(0)) {
                num = String(num).slice(1);
            }
            num = String(num).replace('-', '');
            return `tel:+98${num}`;
        },


        /**
         * Send contact massage
         */
         async sendContactMassage() {
            this.loading = true
            await axios.post(`${this.runtimeConfig.public.apiBase}/user/contact-us/create`, {
                phone_number: digits(this.form.mobile, 'en'),
                email: this.form.email,
                full_name: this.form.full_name ? this.form.full_name : 'ناشناس',
                subject: this.form.subject,
                description: this.form.description,
            }).then((response) => {
                useNuxtApp().$toast.success('پیام شما با موفقیت ثبت شد', {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            }).catch((error) => {

            }).finally((response) => {
                this.loading = false
            })
        },

        /**
         * Fix bug for select in c-select
         */
        onUpdateMenu(open) {
            if (open) {
                // WORKAROUND: fixes dialog menu popup position
                setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
            }
        }
    },

    mounted(){
        this.$refs.subjectSelect.menu = false;
    }
}
</script>

<style>
@import '~/assets/scss/views/contact.scss';
</style>
