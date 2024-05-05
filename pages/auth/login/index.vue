<template>
<div class="p-auth login">
    <v-locale-provider rtl>
        <div class="p-auth__card">
            <template v-if="loginStep === 1">
                <!-- Step 1: Get user's phone number -->
                <v-form @submit.prevent="sendOTP" ref="phoneNumberForm" class="w-100">
                    <div class="w-100 form-inner">
                        <a class="d-flex justify-center mb-5" href="/">
                            <img src="@/assets/images/shavaz-logo.png" class="mb-5" alt="shavaz image">
                        </a>

                        <div class="mt-6">
                            <div class="p-auth__text">
                                برای ورود و ثبت‌نام، شماره موبایل خود را وارد نمایید.
                            </div>

                            <v-text-field v-model="mobile" :rules="mobileRule" type="tel" class="" variant="outlined" placeholder="۰۹*********" />
                        </div>

                        <div class="mt-10">
                            <v-btn :loading="loading" color="primary" block type="submit">
                                دریافت کد
                            </v-btn>
                            <p class="p-auth__text">
                                ورود به معنای پذیرش <a href="/rules/general-rules">شرایط و قوانین حریم</a> خصوصی شاواز می‌باشد.
                            </p>
                        </div>
                    </div>
                </v-form>
            </template>

            <template v-else-if="loginStep === 2">
                <!-- Step 2: Enter OTP -->
                <v-form v-if="passwordWay" @submit.prevent="verifyPassword" ref="otpForm" class="w-100">
                    <div class="w-100 form-inner">
                        <a class="d-flex justify-center" href="/">
                            <img src="@/assets/images/shavaz-logo.png" class="mb-5" alt="shavaz image">
                        </a>

                        <div class="mt-6">
                            <div v-if="register" class="text-right mb-4 pr-1">
                                <span class="p-auth__text">
                                    حساب کاربری با شماره {{ mobile }} وجود ندارد. کد تایید ارسال شده را وارد نمایید.
                                </span>
                            </div>

                            <div class="text-right mb-2 pr-1">
                                <span class="p-auth__text">
                                    رمز عبور خود را وارد نمایید
                                </span>
                            </div>

                            <v-text-field v-model="password" class="" :type="passwordType" variant="outlined">
                                <template v-slot:append-inner>
                                    <v-icon @click="changePasswordType()">mdi-eye</v-icon>
                                </template>
                            </v-text-field>

                            <a @click="forgotPassword()" class="cur-p d-block back-step text-light-blue darken-1 mb-3">
                                فراموشی رمز عبور
                                <v-icon icon="mdi-chevron-left" color="light-blue darken-1" />
                            </a>

                            <a @click="loginWithMobile()" class="cur-p d-block back-step text-light-blue darken-1">
                                ورود رمز یکبار مصرف
                                <v-icon icon="mdi-chevron-left" color="light-blue darken-1" />
                            </a>
                        </div>

                        <div class="mt-10">
                            <div class="text-center mb-2 pr-1">
                                <span class="p-auth__text number-font">
                                    {{ seconds }} :{{ minutes }} مانده تا ارسال مجدد کد تایید
                                </span>
                            </div>
                            <v-btn :loading="loading" color="primary" block rounded="xl" type="submit">
                                ورود
                            </v-btn>
                        </div>
                    </div>
                </v-form>

                <v-form v-else @submit.prevent="verifyOTP" ref="otpForm" class="w-100">
                    <div class="w-100 form-inner">
                        <a class="d-flex justify-center" href="/">
                            <img src="@/assets/images/shavaz-logo.png" class="mb-5" alt="shavaz image">
                        </a>

                        <div class="mt-6">
                            <div v-if="register" class="text-right mb-4 pr-1">
                                <span class="p-auth__text">
                                    حساب کاربری با شماره {{ mobile }} وجود ندارد. کد تایید ارسال شده را وارد نمایید.
                                </span>
                            </div>

                            <div class="text-right mb-2 pr-1">
                                <span class="p-auth__text">
                                    کد تایید را وارد نمایید
                                </span>
                            </div>

                            <v-text-field v-model="otp" :rules="otpRule" class="" variant="outlined"/>

                            <div class="mb-2">
                                <span class="p-auth__text number-font">
                                    کد به شماره {{ mobile }} ارسال شده‌است.
                                </span>
                            </div>

                            <a @click="backStep1()" class="cur-p d-block back-step text-light-blue darken-1 mb-3">
                                تغییر شماره
                                <v-icon icon="mdi-chevron-left" color="light-blue darken-1" />
                            </a>

                            <a @click="loginWithPasswords()" class="cur-p d-block back-step text-light-blue darken-1">
                                ورود با رمز عبور
                                <v-icon icon="mdi-chevron-left" color="light-blue darken-1" />
                            </a>
                        </div>

                        <div class="mt-10">
                            <div v-if="showRetry" class="text-center mb-2 pr-1">
                                <span class="p-auth__text">
                                    <div>
                                        <span class="ml-4">ارسال مجدد از طریق</span>
                                        <a @click="sendOTP()" class="back-step text-light-blue darken-1">
                                            پیامک
                                            <v-icon icon="mdi-chevron-left" color="light-blue darken-1" />
                                        </a>
                                    </div>
                                </span>
                            </div>
                            <div v-else class="text-center mb-2 pr-1">
                                <span class="p-auth__text number-font">
                                    {{ seconds }} :{{ minutes }} مانده تا ارسال مجدد کد تایید
                                </span>
                            </div>
                            <v-btn :loading="loading" color="primary" block rounded="xl" type="submit">
                                ورود
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </template>

            <template v-else-if="loginStep === 3">
                <div class="w-100 form-inner">
                    <a class="d-flex justify-center" href="/">
                        <img src="@/assets/images/shavaz-logo.png" class="mb-5" alt="shavaz image" width="106" height="37">
                    </a>

                    <div class="t16 w400 text-center text-grey-darken-2">
                        به شاواز خوش آمدید...
                    </div>

                    <div class="d-flex justify-center">
                        <img src="@/assets/images/Welcome.jpg" class="mb-5" alt="shavaz image" width="160" height="160">
                    </div>

                    <div class="mt-10 d-flex align-center center">
                        <v-btn href="/" height="44" title="بازگشت به سایت" class="btn btn--submit ml-2 w-50">
                            بازگشت به سایت
                        </v-btn>

                        <v-btn href="/user/profile" height="44" title="تکمیل حساب کاربری" class="btn btn--cancel mr-2 w-50">
                            تکمیل حساب کاربری
                        </v-btn>
                    </div>
                </div>
            </template>

        </div>
    </v-locale-provider>
</div>
</template>

<script>
// Middleware
import auth from '@/middleware/auth';
import axios from "axios";

export default {

    data() {
        return {
            loginStep: 1,
            mobile: '',
            otp: '',
            password: null,
            loading: false,
            mobileRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
                    v
                ) || "شماره موبایل معتبر نیست",
            ],
            otpRule: [v => !!v || "کد تایید را وارد نمایید"],
            minutes: null,
            seconds: null,
            showRetry: true,
            counter: '',
            startTime: null,
            passwordWay: false,
            passwordType: 'password'
        };
    },

    setup() {

        const title = ref('فروشگاه اینترنتی شاواز | ورود به پنل کاربری')
        const description = ref(' مقایسه و خرید آنلاین انواع لوازم آرایشی، بهداشتی، عطر | برندهای متنوع با پایین ترین قیمت | فروشگاه اینترنتی شاواز Shavaz.com - خرید اینترنتی لوازم آرایشی و بهداشتی با ضمانت اصالت کالا -  برای خرید کلیک کنید!')

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        });

        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken')
        const randomNumberForBasket = useCookie('randomNumberForBasket')
        userToken.value = ''
        return {
            userToken,
            runtimeConfig,
            randomNumberForBasket
        }
    },

    methods: {
        changePasswordType() {
            if (this.passwordType === 'password') this.passwordType = 'text'
            else this.passwordType = 'password'
        },

        forgotPassword() {
            this.$router.push('/forgot_password')
        },

        backStep1() {
            this.loginStep = 1;
            this.passwordWay = false;
            this.minutes = null;
            this.seconds = null;
            this.startTime = null;
            this.counter = '';
        },

        loginWithPasswords() {
            this.passwordWay = true;
        },

        loginWithMobile() {
            this.passwordWay = false;
        },

        /**
         * Countdown
         */
        runCountdown() {
            this.showRetry = false;
            const duration = this.startTime - 1; // Convert seconds to countdown duration
            let timer = duration;

            const myCountdown = setInterval(() => {
                this.minutes = parseInt(timer / 60, 10);
                this.seconds = parseInt(timer % 60, 10);

                this.minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
                this.seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;

                this.counter = `${this.minutes}:${this.seconds}`;

                if (--timer < 0) timer = duration;

                if (this.counter === '00:00') {
                    this.showRetry = true;
                    clearInterval(myCountdown);
                }

                if (this.loginStep === 1) {
                    clearInterval(myCountdown);
                }
            }, 1000);
},

        /**
         * Send OTP
         */
        async sendOTP() {
            try {
                this.startTime = null;
                this.loading = true;
                const response = await auth.sendOTP( digits(this.mobile, 'en'));

                if (response.data && response.status === 200) {
                    this.startTime = response.data?.data?.time
                    this.loginStep = 2;
                    this.runCountdown();
                }
            } catch (error) {
                console.error('Send OTP error:', error);
                useNuxtApp().$toast.error(error?.response?.data?.message,  {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            } finally {
                this.loading = false;
            }
        },

        /**
         *  Assign Basket After Login
         */
        async syncBasket() {
            await axios.post(`${this.runtimeConfig.public.apiBase}/basket/crud/sync`, {
                identifier: this.randomNumberForBasket
            }, {
                headers: {
                    Authorization: `Bearer ${this.userToken}`,
                },
            }).then(() => {
                this.randomNumberForBasket = ''
            });
        },

        /**
         * Verify OTP
         */
        async verifyOTP() {
            try {
                this.loading = true;
                const response = await auth.verifyOTP(digits(this.mobile, 'en'), digits(this.otp, 'en'));
                if (response.status === 200) {
                    this.userToken = response.data.data.token;
                    if (this.randomNumberForBasket) {
                        await this.syncBasket()
                    }

                    const characters = 'abcdefghijklmnopqrstuvwxyz';
                    let randomWord = '';
                    
                    for (let i = 0; i < 3; i++) {
                        const randomIndex = Math.floor(Math.random() * characters.length);
                        randomWord += characters[randomIndex];
                    }
  
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                    event: 'userAuthentication', // The event name for tracking user authentication.
                    number: randomWord + this.mobile.slice(1),
                    event_type: response.data?.data?.user?.is_signed_up === 0 ? 'signup' : 'login', // Type of event: 'login' or 'signup'.
                    userStatus: response.data?.data?.user?.is_signed_up === 0 ? 'new' : 'returning', // or 'returning' depending on the user's status.
                    });
                    console.log("🚀 ~ verifyOTP ~ window.dataLayer:", window.dataLayer)

                    const completeResponse = await axios.get(`${this.runtimeConfig.public.apiBase}/user/status/is-completed`, {
                        headers: {
                            Authorization: `Bearer ${this.userToken}`,
                        },
                    });

                    // if (completeResponse.data.data === false) {
                    //     this.loginStep = 3;

                    // } else {
                    //     useNuxtApp().$toast.success(response.data.message, {
                    //         rtl: true,
                    //         position: 'top-center',
                    //         theme: 'dark'
                    //     });
                    //     if (localStorage.getItem('returnPathAfterLogin')) {
                    //         window.location = localStorage.getItem('returnPathAfterLogin')
                    //         localStorage.removeItem('returnPathAfterLogin')
                    //     } else {
                    //         window.location = '/'
                    //     }
                    // }
                }
            } catch (error) {
                console.error('Verify OTP error:', error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Verify password
         */
        async verifyPassword() {
            try {
                this.loading = true;

                const response = await auth.verifyPassword(digits(this.mobile, 'en'), this.password);

                if (response.status === 200) {
                    this.userToken = response.data.data.token;

                    const completeResponse = await axios.get(`${this.runtimeConfig.public.apiBase}/user/status/is-completed`, {
                        headers: {
                            Authorization: `Bearer ${this.userToken}`,
                        },
                    });

                    if (completeResponse.data == false) {
                        this.loginStep = 3;

                    } else {
                        useNuxtApp().$toast.success(response.data.message, {
                            rtl: true,
                            position: 'top-center',
                            theme: 'dark'
                        });
                        if (localStorage.getItem('returnPathAfterLogin')) {
                            window.location = localStorage.getItem('returnPathAfterLogin')
                            localStorage.removeItem('returnPathAfterLogin')
                        } else {
                            window.location = '/'
                        }

                    }
                }
            } catch (error) {
                console.error('Verify OTP error:', error);
            } finally {
                this.loading = false;
            }
        },

    },
};
</script>

<style>
input {
    font-family: 'IranSansFaNum' !important;
}
</style>
