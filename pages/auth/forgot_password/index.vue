<template>
<div class="p-auth login">
    <v-locale-provider rtl>
        <div class="p-auth__card">
            <template v-if="forgotPasswordStep === 1">
                <!-- Step 1: Get user's phone number -->
                <v-form
                    @submit.prevent="sendOTP"
                    ref="phoneNumberForm"
                    class="w-100">
                    <div class="w-100 form-inner">
                        <a class="d-flex justify-center mb-5" href="/">
                            <img src="@/assets/images/shavaz-logo.png" class="mb-5" alt="shavaz image">
                        </a>

                        <div class="mt-6">
                            <div class="p-auth__text">
                                برای تغییر رمز عبور، شماره تماس خود را وارد نمایید.
                            </div>

                            <v-text-field
                                v-model="mobile"
                                :rules="mobileRule"
                                class=""
                                variant="outlined"
                                placeholder="۰۹*********" />
                        </div>

                        <div class="mt-10">
                            <v-btn
                                :loading="loading"
                                color="primary"
                                block
                                type="submit">
                                دریافت کد
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </template>

            <template v-else-if="forgotPasswordStep === 2">

                <v-form
                    @submit.prevent="verifyOTP"
                    ref="otpForm"
                    class="w-100">
                    <div class="w-100 form-inner">
                        <a class="d-flex justify-center" href="/">
                            <img src="@/assets/images/shavaz-logo.png" class="mb-5" alt="shavaz image">
                        </a>

                        <div class="mt-6">

                            <div class="text-right mb-2 pr-1">
                                <span class="p-auth__text">
                                    کد تایید را وارد نمایید
                                </span>
                            </div>

                            <v-text-field
                                v-model="otp"
                                :rules="otpRule"
                                class=""
                                variant="outlined" />

                            <div class="mb-2">
                                <span class="p-auth__text number-font">
                                    کد به شماره {{ mobile }} ارسال شده‌است.
                                </span>
                            </div>

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
                            <v-btn
                                :loading="loading"
                                color="primary"
                                block
                                rounded="xl"
                                type="submit">
                                ورود
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </template>

            <template v-else-if="forgotPasswordStep === 3">
                <v-form
                    @submit.prevent="resetPassword"
                    ref="resetPasswordForm"
                    v-model="resetPasswordValid"
                    class="w-100 ltr">
                    <div class="w-100 form-inner">
                        <a class="d-flex justify-center mb-5" href="/">
                            <img src="@/assets/images/shavaz-logo.png" class="mb-5" alt="shavaz image">
                        </a>

                        <div class="mt-6">
                            <div class="p-auth__text">
                                رمز عبور را وارد نمایید
                            </div>

                            <v-text-field
                                v-model="newPassword"
                                class=""
                                :rules="blankRule"
                                :type="newPasswordType"
                                variant="outlined">
                                <template v-slot:append-inner>
                                    <v-icon @click="newPasswordTypeChange()">mdi-eye</v-icon>
                                </template>
                            </v-text-field>
                        </div>
                        <div class="mt-6">
                            <div class="p-auth__text">
                                رمز عبور را تکرار نمایید
                            </div>

                            <v-text-field
                                :rules="confirmPasswordRules"
                                v-model="passwordConfirmation"
                                class=""
                                :type="passwordConfirmationType"
                                variant="outlined">
                                <template v-slot:append-inner>
                                    <v-icon @click="passwordConfirmationTypeChange()">mdi-eye</v-icon>
                                </template>
                            </v-text-field>
                        </div>
                        <div class="mt-10">
                            <v-btn
                                :loading="loading"
                                color="primary"
                                block
                                type="submit">
                                تایید
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </template>
        </div>
    </v-locale-provider>
</div>
</template>

<script>
// Middleware
import auth from '@/middleware/auth';
import axios from "axios";
import password from "~/pages/user/password.vue";

export default {

    data() {
        return {
            forgotPasswordStep: 1,
            mobile: '',
            otp: '',
            newPassword: null,
            passwordConfirmation: null,
            loading: false,
            blankRule: [(v) => !!v || "این فیلد الزامی است"],
            mobileRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
                    v
                ) || "شماره موبایل معتبر نیست",
            ],
            confirmPasswordRules: [
                (value) => !!value || "این فیلد الزامی است",
                (value) => value === this.newPassword || "تکرار رمز صحیح نیست. لطفا مجدد رمز خود را وارد کنید.",
            ],
            otpRule: [v => !!v || "کد تایید را وارد نمایید"],
            minutes: null,
            seconds: null,
            showRetry: true,
            counter: '',
            startTime: 2,
            passwordWay: false,
            passwordConfirmationType: 'password',
            newPasswordType: 'password',
            resetPasswordValid: true
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
        userToken.value = ''
        return {
            userToken,
            runtimeConfig
        }
    },

    methods: {
        /**
         * change new password type
         */
        newPasswordTypeChange() {
            if (this.newPasswordType === 'password') this.newPasswordType = 'text'
            else this.newPasswordType = 'password'
        },

        /**
         * change new confirmation password type
         */
        passwordConfirmationTypeChange() {
            if (this.passwordConfirmationType === 'password') this.passwordConfirmationType = 'text'
            else this.passwordConfirmationType = 'password'
        },

        backStep1() {
            this.forgotPasswordStep = 1;
            this.passwordWay = false;
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
            this.counter = `0${this.startTime}:00`;
            const duration = (this.startTime * 60) - 1;
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
                    learInterval(myCountdown);
                }
                
            }, 1000);
        },

        /**
         * Send OTP for forgot Password
         */
        async sendOTP() {
            try {
                this.loading = true;
                const response = await auth.sendForgotPasswordOTP(this.mobile);

                if (response.data && response.status === 200) {
                    this.forgotPasswordStep = 2;
                    this.runCountdown();
                }
            } catch (error) {
                console.error('Send OTP error:', error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Verify OTP
         */
        async verifyOTP() {
            try {
                this.forgotPasswordStep = 3
            } catch (error) {

            } finally {
                this.loading = false;
            }
        },

        /**
         * reset password
         */
        async resetPassword() {
            try {
                await this.$refs.resetPasswordForm.validate
                if (this.resetPasswordValid) {
                    this.loading = true;
                    const response = await auth.resetPassword(this.mobile, this.newPassword, this.passwordConfirmation, this.otp);
                    if (response.status === 200) {
                        this.userToken = response.data.data.token;
                        useNuxtApp().$toast.success(response.data.message, {
                            rtl: true,
                            position: 'top-center',
                            theme: 'dark'
                        });
                        setTimeout(() => {
                            this.$router.push('/login')
                        }, 2000)
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
