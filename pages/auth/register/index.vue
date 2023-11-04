<template lang="">
<div class="p-auth login">
    <v-locale-provider rtl>
        <div class="p-auth__card">
            <template v-if="registerStep === 1">
                <!-- Step 1: Get user's phone number -->
                <v-form
                    @submit.prevent="sendOTP"
                    ref="phoneNumberForm"
                    class="w-100">
                    <div class="w-100 form-inner">
                        <div class="d-flex justify-center">
                            <img src="@/assets/images/shavaz-logo.png" class="mb-5" alt="shavaz image">
                        </div>

                        <div class="mt-6">
                            <div class="p-auth__text">
                                برای ورود و ثبت‌نام، شماره موبایل خود را وارد نمایید.
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
                            <p class="p-auth__text">
                                ورود به معنای پذیرش <a>شرایط</a> و <a>قوانین حریم</a> خصوصی شاواز می‌باشد.
                            </p>
                        </div>
                    </div>
                </v-form>
            </template>

            <template v-else-if="registerStep === 2">
                <!-- Step 2: Enter OTP -->
                <v-form
                    @submit.prevent="verifyOTP"
                    ref="otpForm"
                    class="w-100">
                    <div class="w-100 form-inner">
                        <div class="d-flex justify-center">
                            <img src="@/assets/images/shavaz-logo.png" class="mb-5" alt="shavaz image">
                        </div>

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

                            <v-text-field
                                v-model="otp"
                                :rules="otpRule"
                                class=""
                                variant="outlined" />
                            <div class="mb-1">
                                <span class="p-auth__text">
                                    کد به شماره {{ mobile }} ارسال شده‌است.
                                </span>
                            </div>

                            <a @click="backStep1()" class="back-step text-light-blue darken-1">
                                تغییر شماره
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
                                <span class="p-auth__text">
                                    {{seconds}} :{{minutes}} مانده تا ارسال مجدد کد تایید
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
        </div>
    </v-locale-provider>
</div>
</template>

<script>
// Middleware
import auth from '@/middleware/auth';

export default {
    data() {
        return {
            registerStep: 1,
            mobile: '',
            otp: '',
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
            startTime: 2,
        };
    },

    setup() {
        const userToken = useCookie('userToken')
        userToken.value = ''
        return {
            userToken
        }
    },

    methods: {
        backStep1() {
            this.registerStep = 1;
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
            }, 1000);
        },

        /**
         * Register
         */
        async register() {
            try {
                this.loading = true;
                const response = await auth.register(this.user);
                if (response && response.success) {
                    //TODO: You can redirect the user to the dashboard after register
                    console.log('ثبت نام با موفقیت انحام شد');
                } else {
                    //TODO: Handle OTP verification failure. You can display an error message here
                }
            } catch (error) {
                console.error('Register error:', error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Send OTP
         */
        async sendOTP() {
            try {
                this.loading = true;
                const response = await auth.sendOTP(this.mobile);

                if (response && response.status === "Success") {
                    this.registerStep = 2;
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
                this.loading = true;

                const response = await auth.verifyOTP(this.mobile, this.otp);
                console.log('response', response)
                if (response.status === "Success") {
                    console.log('response.status2', response.status);
                    this.userToken = response.data.token;
                    this.$router.push('/user/dashboard');
                    useNuxtApp().$toast.success('کاربر عزیز خوش آمدید.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                } else {}
            } catch (error) {
                console.error('Verify OTP error:', error);
            } finally {
                this.loading = false;
            }
        },
    },
}
</script>
