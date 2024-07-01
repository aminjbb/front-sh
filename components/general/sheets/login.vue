<template>
<v-bottom-sheet v-model="sheet">
    <div class="voucher-auth bg-white h-100 px-5">
        <div class="close-modal" @click="closeSheet()">
            <v-icon color="grey-darken-1">mdi-close</v-icon>
        </div>

        <h4 class="t18 w700 l30 mt-10 mb-5">کد تخفیف</h4>

        <div>
            <div class="d-flex w-100 justify-center align-center flex-column">
                <template v-if="voucherStep">
                    <span class="t16 w700 mb-5 d-block text-black">به شاواز خوش آمدید ...</span>
                    <img data-not-lazy :src="imageAddress(voucherImage)" width="100" height="100" />
                </template>

                <template v-else>
                    <h4 class="t12 w700 l30 mb-2">{{ title }}</h4>
                    <img data-not-lazy :src="imageAddress(image)" width="100" height="100" />
                </template>
               
            </div>

            <generalAuth v-if="!voucherStep" class="pt-2" @userInfo="getUserInfo" @backToSite="closeModal" noLogo noTitle showCancel loginDesc="شماره موبایل خود را وارد نمایید." />
            <div v-else>
                <span class="t14 w400 mt-5 d-block text-grey-darken-3">کد تخفیف شما :</span>
                <div class="voucher-auth__code mb-10 d-flex align-center cur-p" @click="doCopy(voucher_code)">
                    <span class="text-grey-darken-1 t13 w500 flex-grow-1">{{ voucher_code }}</span>
                    <v-icon icon="mdi-content-copy" class="ml-1" color="primary" size="small" />
                    <span class="t14 w700 text-primary ml-3">کپی کد</span>
                </div>
            </div>
        </div>
    </div>
</v-bottom-sheet>
</template>

<script>
import {
  copyText
} from 'vue3-clipboard'

export default {
    data() {
        return {
            sheet: false,
            voucherStep: false,
            voucher_code:'new_guest'
        }
    },

    props: {
        /** Modal title */
        title: String,

        /** Image */
        image: String,

        /** Voucher  */
        voucher: String,

        /** Voucher image */
        voucherImage: String,

        signupStatus: Boolean
    },

    setup() {
        /**
         * Copy identification code
         * @param {*} code
         */
        const doCopy = (code) => {
          console.log(code)
            copyText(code, undefined, (error, event) => {
                if (error) {
                  console.log(error)
                    useNuxtApp().$toast.error('کپی کد با مشکل مواجه شد.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                } else {
                    useNuxtApp().$toast.success('کد  با موفقیت کپی شد.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }
            })
        }

        return {
            doCopy,
        }
    },

    methods: {
        /**
         * Open sheet
         */
        openSheet() {
            setTimeout(() => {
                if (this.signupStatus === true) {
                    this.sheet = true
                }
            }, 5000);
        },

        /**
         * Close sheet
         */
        closeSheet() {
            this.sheet = false;
        },

        /**
         * Get user Info after login
         * @param {*} user 
         */
        userInfo(user){
            if(user.has_order === false){
                this.voucherStep = true;
                this.voucher_code = user.voucher_code

            } else{
                this.sheet = false;
                window.location.reload();
            }
        },

        /**
         * Image address
         * @param {*} path 
         */
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/' + path]
        },
    },

    mounted() {
        this.openSheet();
    }
}
</script>

<style lang="scss">
.voucher-auth {
    position: relative;
    border-top-left-radius: 16px !important;
    border-top-right-radius: 16px !important;
    overflow: hidden;
    padding-bottom: 16px;

    .game-auth__desc {
        margin-bottom: 20px !important;
    }

    .close-modal {
        width: 24px;
        height: 24px;
        box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.405);
        position: absolute;
        top: 39px;
        left: 16px;
        border-radius: 50%;
    }

    &__code{
        border-radius: 4px;
        border: 1px solid #9E9E9E;
        margin-top: 10px;
        height: 50px;
        padding: 10px;
        color: black;
        font-size: 18px;

        > span:first-child{
            font-size: 15px;
            color: black !important;
        }
    }
}
</style>
