<template>
  <div class="c-modal c-modal--address">
    <template v-if="buttonType == 'icon'">
      <v-icon
          class="cur-p"
          @click="openModal()"
          icon="mdi-square-edit-outline"
          size="small"
          color="grey"/>
    </template>

    <template v-if="buttonType == 'text'">
      <v-btn
          @click="openModal()"
          height="41"
          title="ثبت آدرس جدید"
          prepend-icon="mdi-plus"
          class="btn btn--cancel ml-1 cur-p">
        ثبت آدرس جدید
      </v-btn>
    </template>

    <template v-if="buttonType == 'mobile'">
      <div @click="openModal()" class="text-grey t14 d-flex align-center py-1 cur-p">
        <v-icon
            icon="mdi-square-edit-outline"
            size="small"
            class="ml-2 d-flex align-center"
            color="grey"/>
        ویرایش آدرس
      </div>
    </template>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        class="full-button"
        :fullscreen="screenType === 'mobile'? true : false"
        width="856px">
      <v-card class="pt-3 px-6 pb-5">
        <header class="c-modal__header d-flex justify-space-between align-center pb-1 border-0">
                    <span class="t15 w400">
                        {{ title }}
                    </span>

          <v-btn
              class="c-modal__header__btn pa-0 text-none"
              @click="closeModal()"
              color="grey-darken-1"
              size="large"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>

        <p class="t12 w400 text-grey mb-8">جزئیات آدرس را تکمیل نمایید.</p>
        <v-form v-model="valid" ref="addAddress">
          <v-row>
            <v-col cols="12" md="6">

              <v-autocomplete
                  :items="provinceList"
                  density="compact"
                  variant="outlined"
                  :rules="rule"
                  label="استان *"
                  v-model="form.province"
                  @update:modelValue="getCitiesList()"/>
            </v-col>

            <v-col cols="12" md="6">
              <v-autocomplete
                  :items="cityList"
                  density="compact"
                  variant="outlined"
                  :rules="rule"
                  label="شهر *"
                  v-model="form.city"
                  @update:modelValue="getCityName()"/>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                  density="compact"
                  variant="outlined"
                  label="کد پستی *"
                  :rules="postalCodeRule"
                  :append-inner-icon="rules ? 'mdi-check' : ''"
                  v-model="form.postal_code"/>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                  density="compact"
                  variant="outlined"
                  label="پلاک *"
                  :rules="rule"
                  :append-inner-icon="rules ? 'mdi-check' : ''"
                  v-model="form.number"
                  @update:modelValue="changeNumberAddress()"/>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                  density="compact"
                  variant="outlined"
                  label="واحد"
                  :rules="rule"
                  :append-inner-icon="rules ? 'mdi-check' : ''"
                  v-model="form.room_number"
                  @update:modelValue="changeRoomNumberAddress()"/>
            </v-col>
          </v-row>

          <div class="mb-10">
            <div class="mb-5">
              <v-text-field
                  density="compact"
                  variant="outlined"
                  label="تکمیل آدرس *"
                  hide-details
                  :rules="rule"
                  :append-inner-icon="rules ? 'mdi-check' : ''"
                  v-model="form.address"/>
            </div>

            <div v-if="form.address" class="full-address mb-5">
              <span class="t15 w500 text-black ml-2 l24">آدرس کامل: </span>
              <span class="t14 text-grey-darken-1 l24 number-font">

                                <template v-if="stateName && !edit"> {{ stateName }},</template>
                                <template v-if="cityName && !edit">, شهر {{ cityName }}</template>
                                {{ form.address }}
                                <template v-if="form.number && !edit">, پلاک {{ form.number }}</template>
                                <template v-if="form.room_number && !edit">, واحد {{ form.room_number }}</template>
                            </span>
            </div>

            <div class="mt-1">
              <v-icon icon="mdi-alert-remove-outline" color="red" class="ml-2"/>
              <span class="t14 text-red">کاربر گرامی، در صورت اشتباه بودن جزئیات آدرس، مسئولیت نرسیدن بسته با مشتری می‌باشد. </span>
            </div>
          </div>

          <div class="c-modal--address__receiver">
            <v-checkbox
                label="گیرنده سفارش خودم نیستم"
                hide-details
                v-model="newReceiver"/>

            <template v-if="newReceiver">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                      density="compact"
                      variant="outlined"
                      label="نام گیرنده *"
                      :rules="persianRule"
                      :append-inner-icon="rules ? 'mdi-check' : ''"
                      v-model="form.first_name"/>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                      density="compact"
                      variant="outlined"
                      label=" نام خانوادگی گیرنده *"
                      :rules="persianRule"
                      :append-inner-icon="rules ? 'mdi-check' : ''"
                      v-model="form.last_name"/>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                      density="compact"
                      variant="outlined"
                      label="شماره تماس گیرنده *"
                      :rules="mobileRule"
                      :append-inner-icon="rules ? 'mdi-check' : ''"
                      v-model="form.phone_number"/>
                </v-col>
              </v-row>
            </template>
          </div>

          <div class="d-flex justify-end">
            <v-btn
                :loading="loading"
                class="btn btn--submit"
                @click="validate()"
                color="grey-darken-1">
              ثبت آدرس
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>

    <generalUserProfileModal ref="profileModal" :phoneNumber="userDetail ?.phone_number"
                             @profileSubmitted="openAddressModal()"/>
  </div>
</template>

<script>
import Public from '@/composables/Public.js'
import axios from "axios";
import auth from "~/middleware/auth.js";

export default {
  setup() {
    const userToken = useCookie('userToken');
    const runtimeConfig = useRuntimeConfig()
    const {
      cities,
      getCities
    } = new Public()
    return {
      cities,
      getCities,
      runtimeConfig,
      userToken
    }
  },

  data() {
    return {
      valid: true,
      dialog: false,
      isDisable: true,
      screenType: null,
      form: {
        address: '',
        postal_code: '',
        number: '',
        room_number: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        province: null,
        city: null
      },
      newReceiver: false,
      rule: [v => !!v || 'این فیلد الزامی است'],
      persianRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) =>
            /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
            "فقط حروف فارسی ",
      ],
      mobileRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) =>
            /^(?:(\u0660\u0669[\u0660-\u0669][\u0660-\u0669]{8})|(\u06F0\u06F9[\u06F0-\u06F9][\u06F0-\u06F9]{8})|(09[0-9][0-9]{8}))$/.test(
                v
            ) || "شماره موبایل معتبر نیست",
      ],
      postalCodeRule: [
        (v) => !!v || "این فیلد الزامی است",
        (v) => /^[\p{N}\d\u06F0-\u06F9]{10}$/u.test(v) || "کد پستی ۱۰ رقمی را وارد کنید",
      ],
      loading: false,
      stateName: null,
      cityName: null,
    }
  },

  props: {
    getUserAddress: {
      type: Function
    },

    /** User Detail */
    userDetail: Object,

    /** Address */
    address: Object,

    /** Provinces */
    provinces: Object,

    /**Modal title */
    title: String,

    /**Modal text */
    text: String,

    /**Modal submit button text */
    submitText: String,

    /**
     * Button Type
     * Can be : icon - Text - mobile
     */
    buttonType: String,

    /** Edit mode */
    edit: Boolean,
  },

  computed: {
    /**
     * City list
     */
    cityList() {
      try {
        let cityList = []
        this.cities.forEach(city => {
          const form = {
            title: city.label,
            value: city.id
          }
          cityList.push(form)
        })
        return cityList
      } catch (e) {
        return []
      }
    },

    /**
     * Province list
     */
    provinceList() {
      try {
        let provinceList = []
        this.provinces.data.forEach(province => {
          const form = {
            title: province.label,
            value: province.id
          }
          provinceList.push(form)
        })
        return provinceList
      } catch (e) {
        return e
      }
    },
  },

  methods: {
    async validate() {
      await this.$refs.addAddress.validate()
      if (this.valid) await this.addressFormDataGenerate()
    },

    /**
     * Address form
     */
    async addressFormDataGenerate() {
      let endPoint = ''
      const formData = new FormData()

      const fullAddress = 'استان ' + this.stateName + ', شهر ' + this.cityName + ', ' + this.form.address + ', پلاک ' + this.form.number + ', واحد ' + this.form.room_number
      if (this.edit) formData.append('address', this.form.address)
      else formData.append('address', fullAddress)
      formData.append('state_id', this.form.province)
      formData.append('city_id', this.form.city)
      formData.append('postal_code', digits(this.form.postal_code, 'en'))
      formData.append('number', digits(this.form.number, 'en'))
      formData.append('unit', digits(this.form.room_number, 'en'))

      if (this.newReceiver) {
        formData.append('am_i', 0)
        formData.append('first_name', this.form.first_name)
        formData.append('last_name', this.form.last_name)
        formData.append('phone_number', digits(this.form.phone_number, 'en'))
      } else {
        formData.append('am_i', 1)
        formData.append('first_name', this.userDetail?.first_name)
        formData.append('last_name', this.userDetail?.last_name)
        formData.append('phone_number', digits(this.userDetail?.phone_number, 'en'))
      }
      if (this.edit) endPoint = `/user/profile/address/update/${this.address.id}`
      else endPoint = `/user/profile/address/add`
      this.addAddress(formData, endPoint)
    },

    /**
     * Add address
     * @param {*} form
     * @param {*} endPoint
     */
    addAddress(form, endPoint) {
      this.loading = true
      axios
          .post(this.runtimeConfig.public.apiBase + endPoint, form, {
            headers: {
              Authorization: `Bearer ${this.userToken}`,
            },
          })
          .then((response) => {
            this.dialog = false;
            this.$store.commit('set_snackBar', {
              show:true , text:'آدرس شما با موفقیت ایجاد شد.' , status:'success'
            })
          })
          .catch((err) => {
            auth.checkAuthorization(err.response)
            this.$store.commit('set_snackBar', {
              show:true , text:err.response.data.message , status:'error'
            })
          }).finally(() => {
        this.loading = false
        this.getUserAddress()
      });
    },

    /**
     * Marker in map
     * @param {*} point
     */
    markersIconCallback(point) {
      setTimeout(() => {
        this.form.address = this.$refs.myMap.state.reverseResult.formatted_address
        this.isDisable = false
      }, 1000)

      return {
        src: "https://img.icons8.com/fluency/344/find-clinic.png",
        iconScale: 0.09
      }
    },

    /**
     * Open modal
     */
    openModal() {
      if ((this.userDetail?.first_name === null || this.userDetail?.first_name === '') && (this.userDetail?.last_name === null || this.userDetail?.last_name === '')) {
        this.$refs.profileModal.dialog = true
      } else {
        this.dialog = true;
        this.setAddressForm();
        this.editMode();
      }
    },

    openAddressModal() {
      this.dialog = true;
    },

    /**
     * Close modal
     */
    closeModal() {
      this.dialog = false;
      this.isDisable = true;
      this.form = {
        address: '',
        postal_code: '',
        number: '',
        room_number: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        province: null,
        city: null
      },
          this.stateName = null;
      this.cityName = null;
    },

    /**
     * change number in address detail if modal edit
     */
    changeNumberAddress(){
      if (this.edit){
        let formAddress = this.form.address.split(',')
        formAddress[3] = ` پلاک${this.form.number}`
        this.form.address = ''
        formAddress.forEach(address => {
          this.form.address += `${address},`
        })
        this.form.address = this.form.address.substring(0, this.form.address.length - 1);
      }
    },

    /**
     * change number in address detail if modal edit
     */
    changeRoomNumberAddress(){
      if (this.edit){
        let formAddress = this.form.address.split(',')
        formAddress[4] = ` واحد${this.form.room_number}`
        this.form.address = ''
        formAddress.forEach(address => {
          this.form.address += `${address},`
        })
        this.form.address = this.form.address.substring(0, this.form.address.length - 1);
      }
    },

    /**
     * get cities after select province
     */
    getCitiesList() {

      this.form.city = null
      this.getCities(this.form.province)
      this.stateName = this.provinceList[this.form.province - 1].title
      if (this.edit) {
        let formAddress = this.form.address.split(',')
        formAddress[0] = ` استان ${this.provinceList[this.form.province - 1].title}`
        this.form.address = ''
        formAddress.forEach(address => {
          this.form.address += `${address},`
        })
        this.form.address = this.form.address.substring(0, this.form.address.length - 1);
      }
    },

    getCityName() {
      let city = null;
      city = this.cityList.find(item => item.value === this.form.city);
      this.cityName = city.title
      if (this.edit) {
        let formAddress = this.form.address.split(',')
        formAddress[1] = ` شهر ${city.title}`
        this.form.address = ''
        formAddress.forEach(address => {
          this.form.address += `${address},`
        })
        this.form.address = this.form.address.substring(0, this.form.address.length - 1);
      }
    },

    editMode() {
      if (this.edit) {
        this.isDisable = false
      }
    },

    /**
     * set address detail on form after monut modal
     */
    setAddressForm() {
      try {
        if (this.edit){

          let addressSplit = this.address.address.split(',')
          if (addressSplit.length > 4){
            this.form.address = this.address?.address
          }
          else {
            this.form.address = ` استان ${this.address?.state?.label} ,  شهر ${this.address?.city?.label}  , ${ this.address?.address} , پلاک  ${this.address?.number} , واحد  ${this.address?.unit}`
          }
        }
        else {
          this.form.address = this.address?.address
        }
        this.form.full_name = this.address?.receiver_full_name
        this.form.number = digits(this.address?.number, 'en')
        this.form.phone_number = digits(this.address?.phone_number, 'en')
        this.form.postal_code = digits(this.address?.postal_code, 'en')
        this.form.room_number = digits(this.address?.unit, 'en')
        this.form.province = this.address?.state?.id
        this.form.city = this.address?.city?.id
        if (this.edit) {
          if (this.address?.am_i === 1) this.newReceiver = false
          else {
            this.newReceiver = true;
            this.form.first_name = this.address?.first_name
            this.form.last_name = this.address?.last_name
          }
        }

      } catch (e) {

      }
    }

  },

  mounted() {

        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
  },

  watch: {
    dialog(val) {
      if (val === true && this.edit === true) {
        this.getCities(this.form.province)
        this.setAddressForm()
      }

    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.c-modal {
  .v-card {
    background: #fff !important;
  }

  &__header {
    border-bottom: 1px solid #E0E0E0;

    &__btn {
      min-width: auto !important;
    }
  }

  &--address {
    &__receiver {
      border-top: 1px solid #E0E0E0;
      padding-top: 5px;
    }
  }

  .map {
    border-radius: 8px !important;
    height: 420px;
    overflow: hidden;
  }
}
</style>
    