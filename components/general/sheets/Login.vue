<template>
  <v-bottom-sheet v-model="sheet" height="auto">
    <div class="voucher-auth voucher-auth--sheet bg-white h-100 px-5 pb-7">
      <div class="close-modal cur-p" @click="closeSheet()">
        <v-icon color="grey-darken-1">mdi-close</v-icon>
      </div>
      <h4 class="t18 w700 l30 mt-10 mb-5">کد تخفیف</h4>

      <div>
        <div class="d-flex w-100 justify-center align-center flex-column">
          <template v-if="voucherStep">
            <span class="t16 w700 mb-5 d-block text-black">به شاواز خوش آمدید ...</span>
            <img data-not-lazy :src="imageAddress(voucherImage)" width="100" height="100"/>
          </template>

          <template v-else>
            <h4 class="t12 w700 l30 mb-2">{{ modalData?.content }}</h4>
            <img data-not-lazy :src="modalData?.image_url " width="100" height="100"/>
          </template>

        </div>

        <generalAuth  :showSucces="false" v-if="!voucherStep" class="pt-2" backToSiteText="ورود به سایت" @userInfo="getUserInfo"
                     @backToSite="goLoginPage" noLogo noTitle showCancel loginDesc="شماره موبایل خود را وارد نمایید."/>
        <div v-else>
          <span class="t14 w400 mt-5 d-block text-grey-darken-3">کد تخفیف شما :</span>
          <div class="voucher-auth__code mb-10 d-flex align-center cur-p" @click="doCopy(voucher_code)">
            <span class="text-grey-darken-1 t13 w500 flex-grow-1">{{ voucher_code }}</span>
            <span class="t14 w700 text-primary ml-3">کپی</span>
            <v-icon icon="mdi-content-copy" class="ml-1" color="primary" size="small"/>
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
      voucher_code: 'new_guest'
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
          this.$store.commit('set_snackBar', {
            show:true , text:'کپی کد با مشکل مواجه شد.' , status:'error'
          })
        } else {
          this.$store.commit('set_snackBar', {
            show:true , text:'کد  با موفقیت کپی شد.' , status:'success'
          })
        }
      })
    }

    const voucherShownCookie = useCookie('voucher_shown', {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days in seconds
    });

    return {
      doCopy,
      voucherShownCookie
    }
  },

  methods: {
    /**
     * Open sheet
     */
    openSheet() {
      setTimeout(() => {
        if (this.modalData !== null) {
          this.sheet = true
          this.voucherShownCookie = true;  // Set the cookie value
        }
      }, 5000);
    },

    /**
     * Close sheet
     */
    closeSheet() {
      this.sheet = false;

      if (this.voucherStep === true) {
        window.location.reload();
      }
    },

    /**
     * Go to login page
     */
    goLoginPage() {
      this.$router.push('/login')
    },

    /**
     * Get user Info after login
     * @param {*} user
     */
    getUserInfo(user) {
      if (user.has_order === false) {
        this.voucherStep = true;
        this.voucher_code = user.voucher_code

      } else {
        this.$store.commit('set_snackBar', {
          show:true , text:'با این شماره قبلا سفارش ثبت شده است.' , status:'error'
        })
        this.dialog = false;
        window.location.reload();
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

  computed: {
    modalData() {
      return this.$store.getters['get_homePageFirstTimeModal']
    }
  },

  mounted() {
    if (this.voucherShownCookie !== true && this.signupStatus === true) {
      this.openSheet();
    }
  }
}
</script>

<style lang="scss">
$parent: 'voucher-auth';

.#{$parent} {
  &--sheet {
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
      position: absolute;
      top: 39px;
      left: 16px;
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

      > span:first-child {
        font-size: 15px;
        color: black !important;
      }
    }
  }
}
</style>
