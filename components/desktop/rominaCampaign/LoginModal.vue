<template>
<div class="c-modal">
    <v-dialog v-if="dialog" v-model="dialog" color="white" width="600px">
        <div class="voucher-auth voucher-auth--desktop bg-white pb-6 h-100 d-flex flex-column w-100">
            <div class="d-flex align-center justify-space-between py-6 px-6">
                <span class="t16 w600 text-sGray">دریافت هدیه</span>

                <div class="cur-p" @click="closeModal()">
                    <v-icon color="sGrayDarken1">mdi-close</v-icon>
                </div>
            </div>

            <v-row v-if="!logined" class="flex-grow-1 px-6 my-7">
                <v-col sm="7" class="pl-7">
                    <h4 class="t17 w700 l30">{{ modalData?.content }}</h4>
                    <div class="login">
                        <v-locale-provider rtl>
                            <div class="game-auth">
                                <template v-if="loginStep === 1">
                                    <!-- Step 1: Get user's phone number -->
                                    <v-form ref="phoneNumberForm" class="w-100">
                                        <div class="w-100 form-inner">
                                            <div class="mt-6 w-100">
                                                <div class="t16 w400 text-sGray mb-8">
                                                    شماره موبایلت رو اینجا وارد کن
                                                </div>

                                                <v-text-field class="game-auth__input" v-model="mobile" :rules="mobileRule" type="tel" variant="outlined" placeholder="شماره موبایل" hide-details height="46px" />
                                            </div>
                                        </div>
                                    </v-form>
                                </template>

                                <template v-else-if="loginStep === 2">
                                    <!-- Step 2: Enter OTP -->
                                    <v-form ref="otpForm" class="w-100">
                                        <div class="w-100 form-inner">
                                            <div class="mt-3">
                                                <div class="t16 w400 text-center mb-4 text-sGray">
                                                    کد ارسال شده به شماره موبایلت رو وارد کن
                                                </div>

                                                <v-otp-input class="d-ltr" length="5" v-model="otp" color="white" :rules="otpRule" />

                                                <div class="mt-3">
                                                    <div v-if="showRetry" class="text-center mb-2 pr-1">
                                                        <div>
                                                            <a @click="sendOTP()" class="back-step t12 w500 text-sGray cur-p">
                                                                ارسال مجدد از طریق پیامک
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div v-else class="text-center mb-2 pr-1">
                                                        <span class="t12 w500 text-sGray number-font">
                                                            امکان ارسال مجدد کد: {{ seconds }} :{{ minutes }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </v-form>
                                </template>
                            </div>
                        </v-locale-provider>
                    </div>
                </v-col>
                <v-col sm="5" class="d-flex align-center justify-center flex-column">
                    <img data-not-lazy src="~/assets/images/campaign/romina-login1.svg" width="110" height="134" />
                </v-col>
            </v-row>

            <div v-else class="px-2">
                <template v-if="noOrder">
                    <div class="d-flex flex-column align-center justify-center w100 h100 px-4">
                        <p class="t16 w300 l32 text-sGray text-center">
                            با شماره‌ی شما هنوز سفارشی در شاواز ثبت نشده ولی می‌‌‌‌‌‌‌‌تونی بعد از ثبت اولین سفارشت به این صفحه سر بزنی و هدیه‌‌‌‌‌‌‌‌ رومینا رو دریافت کنی.
                        </p>

                        <img data-not-lazy class="mt-10 mb-13" src="~/assets/images/campaign/romina-login3.svg" width="120" height="105" />

                        <v-btn href="/" :loading="loading" color="primary" block type="submit" height="46px" class="game-auth__btn mb-5">
                            <span class="w700">ثبت سفارش</span>
                        </v-btn>
                    </div>
                </template>

                <template v-if="hasOrder">
                    <div class="d-flex align-center justify-space-between px-4">
                        <span class="t16 w400 mb-5 text-sGray">آدرس تحویل هدیه‌‌‌‌‌‌‌‌‌‌‌‌ات رو انتخاب کن</span>

                        <span class="t16 w700 text-primary" @click="addNewAddress">آدرس جدید</span>
                    </div>
                    
                    <template v-if="showAddress">
                        <div v-if="userAddress && userAddress.length" class="campaign-address px-4" :class="{'height-auto' :showMore}">
                            <div v-for="(address , index) in userAddress.slice(0,showMoreCount)" :key="`address${index}`" class="d-flex align-center campaign-address__item" @click="selectAddress(address.id)" :id="`address${address.id}`">
                                <v-icon icon="mdi-map-marker-outline" class="ml-2" color="grey" size="large"/>
                                <div class="d-flex flex-column">
                                    <p class="t14 number-font text-grey-darken-3 ">
                                        {{address?.address}}
                                    </p>

                                    <div class="d-flex align-center mt-2">
                                        <span class="t14 w600 text-grey-darken-3">گیرنده:</span>
                                        <span class="t14 w400 text-grey-darken-3">{{ address?.receiver_full_name }} </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-100 d-flex justify-end px-4">
                            <span class="text-primary d-flex align-center t12 w700 mb-5 mt-2 cur-p" @click="activeShowMore" :style="showMore === true ? 'display:none !important' :''">
                                مشاهده بیشتر
                                <v-icon icon="mdi-chevron-down" color="primary"></v-icon>
                            </span>
                        </div>

                        <div class="px-4">
                            <v-btn @click="getGift()" :loading="loading" color="primary" block type="submit" height="46px" class="game-auth__btn">
                                <span class="w700">ثبت و ارسال هدیه</span>
                            </v-btn>
                        </div>
                    </template>

                    <template v-if="addAddress"></template>
                </template>
            </div>

            <div v-if="!logined" class="px-6">
                <template v-if="loginStep === 1">
                    <v-btn @click="sendOTP()" :loading="loading" color="primary" block type="submit" height="46px" class="game-auth__btn">
                        <span class="w700">دریافت کد</span>
                    </v-btn>
                </template>

                <template v-else-if="loginStep === 2">
                    <v-btn @click="verifyOTP()" :loading="loading" color="primary" block rounded="xl" type="submit" height="48px" class="game-auth__btn br8">
                        تایید کد
                    </v-btn>
                </template>
            </div>
        </div>
    </v-dialog>
</div>
</template>

<script>
import auth from '@/middleware/auth';
import User from '@/composables/User.js'

export default {

    props: {
        /** Modal title */
        title: String,

        /** Image */
        image: String,

        /** Voucher  */
        voucher: String,

        /** Voucher image */
        voucherImage: String,
        screenType: String,
        signupStatus: Boolean

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
            activeButton: false,
            dialog: false,
            loading: false,
            logined: false,
            userInfo: null,
            noOrder: false,
            hasOrder: false,
            showMore:false,
            showMoreCount:3,
            selectAddressId:null,
            showAddress: false,
            addAddress: false
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

        const {
            getUserAddress,
            userAddress
        } = new User()

        return {
            userToken,
            runtimeConfig,
            randomNumberForBasket,
            getUserAddress,
            userAddress
        }
    },

    methods: {
        /**
         * Open modal
         */
        openModal() {
            this.dialog = true
        },

        /**
         * Close modal
         */
        closeModal() {
            this.dialog = false;
        },

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
                    this.startTime = response.data ?.data ?.time
                    this.loginStep = 2;
                    this.runCountdown();
                }
            } catch (error) {
                console.error('Send OTP error:', error);
                useNuxtApp().$toast.error(error ?.response ?.data ?.message, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
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
                console.log(response.status)
                if (response.status === 200) {
                    this.userToken = response.data.data.token;

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
                        event_type: response.data ?.data ?.user ?.is_new === 1 ? 'signup' : 'login', // Type of event: 'login' or 'signup'.
                        userStatus: response.data ?.data ?.user ?.is_new === 1 ? 'new' : 'returning', // or 'returning' depending on the user's status.
                        wheel: 'true', // or 'returning' depending on the user's status.
                    });

                    if (!this.showSuccess) {
                        useNuxtApp().$toast.success(response.data.message, {
                            rtl: true,
                            position: 'top-center',
                            theme: 'dark'
                        });
                    }

                    this.logined = true;
                    this.userInfo = response.data.data.user;

                    if (response ?.data ?.data ?.user ?.has_order === false) {
                        this.noOrder = true;
                    } else {
                        this.hasOrder = true;
                        this.showAddress = truel
                        this.getUserAddress();
                    }
                }

            } catch (error) {
                console.error('Verify OTP error:', error);
            } finally {
                this.loading = false;
            }
        },

        activeShowMore(){
            this.showMore = !this.showMore;
            this.showMoreCount = 100
        },

        selectAddress(id){
            this.selectAddressId = id;
            const activeElements = document.querySelectorAll('.activeAddress');

            if(activeElements){
                activeElements.forEach(element => {
                    element.classList.remove('activeAddress');
                });
            }

            document.getElementById(`address${id}`).classList.add('activeAddress')
        },

        getGift(){
            console.log("🚀 ~ selectAddress ~  this.selectAddressId:",  this.selectAddressId)
        },

        addNewAddress(){
            this.showAddress = false;
            this.addAddress = true
        }
    },

    mounted() {
        if (this.signupStatus === true) {
            this.openModal();
        }
    },

    watch: {
        mobile(newVal) {
            if (/^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(newVal)) {
                this.activeButton = true
            } else {
                this.activeButton = false
            }
        },
    }
}
</script>

<style lang="scss">
$parent: 'voucher-auth';

.#{$parent} {
    position: relative;

    &--desktop {
        border-radius: 8px !important;

        .game-auth__desc {
            margin-bottom: 20px !important;
        }

        .game-auth__input {
            margin-bottom: 70px;
        }

        .close-modal {
            width: 24px;
            height: 24px;
            position: absolute;
            top: 20px;
            left: 15px;
            border-radius: 50%;
        }

        .#{$parent}__code {
            border-radius: 4px;
            border: 1px solid #9E9E9E;
            margin-top: 10px;
            height: 50px;
            padding: 10px;
            color: black;
            font-size: 18px;

            >span:first-child {
                font-size: 15px;
                color: black !important;
            }
        }
    }
}

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
        border-radius: 8px !important;
        height: 48px !important;
        box-shadow: none !important;
    }

    .v-otp-input__content {
        direction: ltr !important;
    }
}

input {
    font-family: 'IranSansFaNum' !important;
}

.campaign-address{
    overflow-y:auto !important ;

    &.height-auto{
        height: 350px !important;
    }

    &__item{
        padding: 16px;
        border:1px solid #CBCBCB;
        border-radius: 8px;
        margin-bottom: 12px;
        cursor: pointer;

        &.activeAddress{
            border-color: #D72685;

            *{
                color: #D72685 !important;
            }
        }
    }
}
</style>
