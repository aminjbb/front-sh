<template>
  <div>
    <template v-if="view === 'desktop'">
      <v-dialog v-model="modalLogin" width="600" height="395">
        <v-card class=" pa-3">
          <v-locale-provider rtl>

            <div class="game-auth">
              <template v-if="loginStep === 1">
                <!-- Step 1: Get user's phone number -->
                <v-form @submit.prevent="sendOTP" ref="phoneNumberForm" class="w-100">
                  <div class="w-100 form-inner">
                    <div class="mt-6">
                      <img data-not-lazy src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="100%"
                           height="44" title="Shavaz Logo"/>

                      <h2 class="game-title-mobile t16 w700 mt-5">
                        ورود یا ثبت ‌نام
                      </h2>

                      <div class="t12 w400 l26 text-grey-lighten-1 my-4">
                        برای ورود و ثبت ‌نام، شماره موبایل خود را وارد نمایید.
                      </div>

                      <v-text-field v-model="mobile" :rules="mobileRule" type="tel" variant="outlined"
                                    placeholder="شماره تلفن همراه" hide-details height="46px" color="black"/>
                    </div>

                    <div class="mt-7">
                      <v-btn :loading="loading" color="primary500" block type="submit" height="46px"
                             class="game-auth__btn">
                        دریافت کد تایید
                      </v-btn>
                    </div>

                    <div class="t10 w700 l26 text-center mt-3">
                      ورود شما به معنای پذیرش شرایط شاواز و قوانین حریم‌خصوصی است
                    </div>
                  </div>
                </v-form>
              </template>

              <template v-else-if="loginStep === 2">
                <!-- Step 2: Enter OTP -->
                <v-form @submit.prevent="verifyOTP" ref="otpForm" class="w-100">
                  <div class="w-100 form-inner">
                    <img data-not-lazy src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="100%"
                         height="44" title="Shavaz Logo"/>

                    <div class="mt-6">
                      <div class="t15 text-center mb-1  number-font text-bold  text-grey-lighten-1">
                        کد تایید به شماره {{ mobile }} ارسال شده‌است.
                      </div>

                      <v-otp-input class="d-ltr" length="5" v-model="otp" color="white" :rules="otpRule"/>

                      <div class="mt-6">
                        <div v-if="showRetry" class="text-center pr-1">
                          <div>
                            <a @click="sendOTP()" class="back-step t14 w700 darken-1 cur-p text-grey-lighten-1">
                              ارسال مجدد از طریق پیامک
                            </a>
                          </div>
                        </div>
                        <div v-else class="text-center mb-2 pr-1">
                                                <span class="t14 w700 number-font text-grey-lighten-1">
                                                    امکان ارسال مجدد کد: {{ seconds }} :{{ minutes }}
                                                </span>
                        </div>
                      </div>

                      <a @click="backStep1()"
                         class="cur-p d-block back-step t13 w700 text-center text-primary500 darken-1 my-7">
                        <v-icon icon="mdi-pencil" color="primary500" size="small"/>
                        ویرایش شماره همراه
                      </a>

                      <v-btn :loading="loading" color="primary500" block rounded="xl" type="submit" height="46px"
                             class="game-auth__btn">
                        تایید کد
                      </v-btn>
                    </div>

                  </div>
                </v-form>
              </template>
            </div>
          </v-locale-provider>

        </v-card>
      </v-dialog>
    </template>
    <template v-else-if="view === 'mobile'">
      <v-bottom-sheet v-model="modalSheet">
        <v-card class=" pa-3">
          <v-locale-provider rtl>

            <div class="game-auth">
              <template v-if="loginStep === 1">
                <!-- Step 1: Get user's phone number -->
                <v-form @submit.prevent="sendOTP" ref="phoneNumberForm" class="w-100">
                  <div class="w-100 form-inner">
                    <div class="mt-6">
                      <img data-not-lazy src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="100%"
                           height="44" title="Shavaz Logo"/>

                      <h2 class="game-title-mobile t16 w700 mt-5">
                        ورود یا ثبت ‌نام
                      </h2>

                      <div class="t12 w400 l26 text-grey-lighten-1 my-4">
                        برای ورود و ثبت ‌نام، شماره موبایل خود را وارد نمایید.
                      </div>

                      <v-text-field v-model="mobile" :rules="mobileRule" type="tel" variant="outlined"
                                    placeholder="شماره تلفن همراه" hide-details height="46px"/>
                    </div>

                    <div class="mt-7">
                      <v-btn :loading="loading" color="primary500" block type="submit" height="46px"
                             class="game-auth__btn">
                        دریافت کد تایید
                      </v-btn>
                    </div>

                    <div class="t10 w700 l26 text-center mt-3">
                      ورود شما به معنای پذیرش شرایط شاواز و قوانین حریم‌خصوصی است
                    </div>
                  </div>
                </v-form>
              </template>

              <template v-else-if="loginStep === 2">
                <!-- Step 2: Enter OTP -->
                <v-form @submit.prevent="verifyOTP" ref="otpForm" class="w-100">
                  <div class="w-100 form-inner">
                    <img data-not-lazy src="~/assets/images/mobile-logo.svg" class="" alt="Shavaz Logo" width="100%"
                         height="44" title="Shavaz Logo"/>

                    <div class="mt-6">
                      <div class="t15 text-center mb-1  number-font text-bold  text-grey-lighten-1">
                        کد تایید به شماره {{ mobile }} ارسال شده‌است.
                      </div>

                      <v-otp-input class="d-ltr" length="5" v-model="otp" color="white" :rules="otpRule"/>

                      <div class="mt-6">
                        <div v-if="showRetry" class="text-center pr-1">
                          <div>
                            <a @click="sendOTP()" class="back-step t14 w700 darken-1 cur-p text-grey-lighten-1">
                              ارسال مجدد از طریق پیامک
                            </a>
                          </div>
                        </div>
                        <div v-else class="text-center mb-2 pr-1">
                                                <span class="t14 w700 number-font text-grey-lighten-1">
                                                    امکان ارسال مجدد کد: {{ seconds }} :{{ minutes }}
                                                </span>
                        </div>
                      </div>

                      <a @click="backStep1()"
                         class="cur-p d-block back-step t13 w700 text-center text-primary500 darken-1 my-7">
                        <v-icon icon="mdi-pencil" color="primary500" size="small"/>
                        ویرایش شماره همراه
                      </a>

                      <v-btn :loading="loading" color="primary500" block rounded="xl" type="submit" height="46px"
                             class="game-auth__btn">
                        تایید کد
                      </v-btn>
                    </div>

                  </div>
                </v-form>
              </template>
            </div>
          </v-locale-provider>

        </v-card>
      </v-bottom-sheet>
    </template>
  </div>
</template>

<script>
// Middleware
import auth from '@/middleware/auth';
import axios from "axios";

export default {
  props: {
    view: null
  },
  data() {
    return {
      loginStep: 1,
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
      startTime: null,
      passwordType: 'password',
      modalLogin: false,
      modalSheet: false
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
    return {
      userToken,
      runtimeConfig,
      randomNumberForBasket
    }
  },

  methods: {

    backStep1() {
      this.loginStep = 1;
      this.minutes = null;
      this.seconds = null;
      this.startTime = null;
      this.counter = '';
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

        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken', {
            maxAge: 60 * 60 * 24 * 365, // 1 year
        });
        const randomNumberForBasket = useCookie('randomNumberForBasket')
        return {
            userToken,
            runtimeConfig,
            randomNumberForBasket
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
        const response = await auth.sendOTP(digits(this.mobile, 'en'));

        if (response.data && response.status === 200) {
          this.startTime = response.data?.data?.time
          this.loginStep = 2;
          this.runCountdown();
        }
      } catch (error) {
        console.error('Send OTP error:', error);
        this.$store.commit('set_snackBar', {
          show: true, text: error?.response?.data?.message, status: 'error'
        })

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
        const response = await auth.verifyOTP(digits(this.mobile, 'en'), digits(this.otp, 'en'));
        if (response.status === 200) {
          this.userToken = response.data.data.token;
          if (this.randomNumberForBasket) {
            await this.syncBasket()
          }

          const characters = 'abcdefghijklmnopqrstuvwxyz';
          const numbers = '0123456789';
          let randomWord = '';
          let randomNum = '';

          for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomWord += characters[randomIndex];
          }

          for (let i = 0; i < 2; i++) {
            const randomIndexNum = Math.floor(Math.random() * numbers.length);
            randomNum += numbers[randomIndexNum];
          }

          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'userAuthentication', // The event name for tracking user authentication.
            number: randomWord + randomNum + this.mobile.slice(1),
            event_type: response.data?.data?.user?.is_new === 1 ? 'signup' : 'login', // Type of event: 'login' or 'signup'.
            userStatus: response.data?.data?.user?.is_new === 1 ? 'new' : 'returning', // or 'returning' depending on the user's status.
            wheel: 'true', // or 'returning' depending on the user's status.
          });
          this.$store.commit('set_snackBar', {
            show: true, text: response.data.message, status: 'success'
          })

          this.$emit('logined', response.data.data.token);
          this.modalLogin = false
          this.modalSheet = false
          this.backStep1()
        }

      } catch (error) {
        console.error('Verify OTP error:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    modalLogin(newVal) {
      if (!newVal) {
        this.loginStep = 1
        this.mobile = null
        this.backStep1()
      }
    },
    modalSheet(newVal) {
      if (!newVal) {
        this.loginStep = 1
        this.mobile = null
        this.backStep1()
      }
    }
  },
};
</script>

<style>
input {
  font-family: 'IranSansFaNum' !important;
}
</style>
