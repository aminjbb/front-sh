<template>
  <div class="login">
    <v-locale-provider rtl>
      <div class="game-auth">
        <a v-if="!noLogo" class="d-flex justify-center mb-2 mt-2" href="/">
          <img src="@/assets/images/logo.svg" class="mb-5" alt="shavaz image">
        </a>
        <template v-if="loginStep === 1">
          <!-- Step 1: Get user's phone number -->
          <v-form @submit.prevent="sendOTP" ref="phoneNumberForm" class="w-100">
            <div class="w-100 form-inner">
              <div class="mt-6 w-100">
                <h2 v-if="!noTitle" class="text-right t18 w700 mb-4 text-grey-darken-3">
                  ورود یا ثبت‌نام
                </h2>

                <div v-if="loginDesc" class="game-auth__desc text-right t14 w400 l15 text-grey-darken-2 mb-15">
                  {{ loginDesc }}
                </div>

                <div v-else class="game-auth__desc text-right t14 w400 l15 text-grey-darken-2 mb-15">
                  برای ورود و ثبت‌نام، شماره موبایل خود را وارد نمایید.
                </div>

                <v-text-field class="game-auth__input" v-model="mobile" :rules="mobileRule" type="tel"
                              variant="outlined" placeholder="شماره موبایل" hide-details height="46px"/>
              </div>

              <div v-if="showCancel" class="mt-7 d-flex align-center justify-space-between">
                <v-btn :loading="loading" color="primary" type="submit" height="46px" class="game-auth__btn ">
                  دریافت کد
                </v-btn>

                <v-btn @click="backToSite" color="primary" height="46px" class="game-auth__btn--cancel">
                  بازگشت به سایت
                </v-btn>
              </div>

              <div v-else class="mt-7">
                <v-btn :loading="loading" color="primary" block type="submit" height="46px" class="game-auth__btn">
                  دریافت کد تایید
                </v-btn>
              </div>
            </div>
          </v-form>
        </template>

        <template v-else-if="loginStep === 2">
          <!-- Step 2: Enter OTP -->
          <v-form @submit.prevent="verifyOTP" ref="otpForm" class="w-100">
            <div class="w-100 form-inner">
              <div class="mt-3">
                <div class="t15 text-center mb-4 text-grey-darken-2 number-font">
                  کد تایید به {{ mobile }} ارسال شده‌است.

                </div>

                <v-otp-input
                    class="d-ltr"
                    length="5"
                    v-model="otp"
                    color="white"
                    :rules="otpRule"
                />

                <div class="mt-3">
                  <div v-if="showRetry" class="text-center mb-2 pr-1">
                    <div>
                      <a @click="sendOTP()" class="back-step t14 w700 text-grey cur-p">
                        ارسال مجدد از طریق پیامک
                      </a>
                    </div>
                  </div>
                  <div v-else class="text-center mb-2 pr-1">
                                    <span class="t14 w700 text-grey-darken-1 number-font">
                                         امکان ارسال مجدد کد: {{ seconds }} :{{ minutes }}
                                    </span>
                  </div>
                </div>

                <a @click="backStep1()"
                   class="cur-p d-block back-step t13 w700 text-center text-primary darken-1 mb-8 mt-7">
                  <v-icon icon="mdi-pencil" color="primary" size="small"/>
                  ویرایش شماره همراه
                </a>

                <v-btn :loading="loading" color="primary" block rounded="xl" type="submit" height="50px"
                       class="game-auth__btn">
                  تایید کد
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
import Zebline from "~/composables/Zebline.js";

export default {

  props: {
    noLogo: {
      type: Boolean,
      default: false
    },

    noTitle: {
      type: Boolean,
      default: false
    },

    showCancel: Boolean,

    loginDesc: {
      type: String,
      default: null,
    }
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
    const userToken = useCookie('userToken', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    const loginZebline = useCookie('loginZebline', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
    const {
      zeblineLogin
    } = new Zebline()
    const randomNumberForBasket = useCookie('randomNumberForBasket')

    return {
      userToken,
      runtimeConfig,
      randomNumberForBasket,
      zeblineLogin,
      loginZebline
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
        const response = await auth.sendOTP(digits(this.mobile, 'en'));

        if (response.data && response.status === 200) {
          this.startTime = response.data?.data?.time
          this.loginStep = 2;
          this.runCountdown();
        }
      } catch (error) {

        this.$store.commit('set_snackBar', {
          show:true , text:error?.response?.data?.message, status:'error'
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
          this.zeblineLogin(this.mobile)
          this.loginZebline = 'true'

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
          try {
            window.zebline.event.track('userAuthentication', {
              number: randomWord + randomNum + this.mobile.slice(1),
              event_type: response.data?.data?.user?.is_new === 1 ? 'signup' : 'login', // Type of event: 'login' or 'signup'.
              userStatus: response.data?.data?.user?.is_new === 1 ? 'new' : 'returning', // or 'returning' depending on the user's status.
              wheel: 'true', // or 'returning' depending on the user's status.
            })
          }
          catch (e) {
            
          }
          this.$store.commit('set_snackBar', {
            show:true , text:response.data.message , status:'success'
          })

          this.$emit('logined', true);
        }

      } catch (error) {
        console.error('Verify OTP error:', error);
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
     * Emit method for back to site
     */
    backToSite() {
      this.$emit('backToSite', true)
    }
  },
};
</script>


<style lang="scss">

.game-auth {
  &__input {
    background-color: #fff;
    border: 1px solid #757575;
    border-radius: 6px;
    height: 50px;

    .v-field__input {
      line-height: 50px;
      min-height: 50px !important;
      height: 50px;
      font-size: 15px;
      color: #000;
      padding: 0 20px !important;

      &::placeholder {
        color: #000 !important;
      }
    }

    * {
      border: 0 !important;
    }
  }

  &__btn {
    border-radius: 4px !important;
    height: 50px !important;
    width: 55% !important;
    box-shadow: none !important;

    &--cancel {
      background: white !important;
      border: 1px solid #D72685 !important;
      color: #D72685 !important;
      width: 48% !important;
      box-shadow: none !important;
      height: 50px !important;
    }
  }

  .v-otp-input__content {
    direction: ltr !important;
  }
}

input {
  font-family: 'IranSansFaNum' !important;
}
</style>
