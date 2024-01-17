<template>
  <div class="c-modal c-modal--address">
    <template v-if="buttonType == 'icon'">
      <v-icon
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
          class="btn btn--cancel ml-1">
        ثبت آدرس جدید
      </v-btn>
    </template>

    <template v-if="buttonType == 'mobile'">
      <div @click="openModal()" class="text-grey t14 d-flex align-center py-1">
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
        class="full full-button"
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

        <template v-if="step === '1'">
          <p class="t12 w400 text-grey mb-5">موقعیت مکانی آدرس را در نقشه زیر مشخص کنید.</p>

          <div class="map mb-5">
            <ClientOnly>
              <NeshanMap
                  height="420px"
                  ref="myMap"
                  mapKey="web.0bfff696f3a1488d972d6047de31ab48"
                  serviceKey="service.217a0b81087143108632348cba35fe9e"
                  :center="form.latLong"
                  :poi="false"
                  :traffic="false"
                  :markers-icon-callback="markersIconCallback"
                  :zoom="15"/>
            </ClientOnly>
          </div>

          <div class="d-flex justify-end">
            <v-btn
                class="btn btn--submit"
                @click="getLocation()"
                color="grey-darken-1">
              تایید موقعیت مکانی
            </v-btn>
          </div>
        </template>

        <template v-if="step === '2'">
          <p class="t12 w400 text-grey mb-8">جزئیات آدرس را تکمیل نمایید.</p>

          <div>
            <v-text-field
                density="compact"
                variant="outlined"
                label="آدرس پستی *"
                hide-details
                :rules="rule"
                :append-inner-icon="rules ? 'mdi-check' : ''"
                v-model="form.address"/>

            <span class="t11 w400 text-grey mt-2 d-block">
                        آدرس پستی پیشفرض بر اساس موقعیت مکانی انتخابی شما وارد شده است و قابلیت ویرایش دارد.
                    </span>
          </div>

          <a @click="showMap" class="d-flex align-center mt-5 mb-7 cur-p">
            <span class="t13 w500 l30 text-deep-purple">تغییر موقعیت مکانی روی نقشه</span>
            <v-icon
                icon="mdi-chevron-left"
                color="deep-purple"
                class="mr-2 t16"/>
          </a>

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
                  v-model="form.city"/>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                  density="compact"
                  variant="outlined"
                  label="کد پستی *"
                  :rules="rule"
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
                  v-model="form.number"/>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                  density="compact"
                  variant="outlined"
                  label="واحد"
                  :rules="rule"
                  :append-inner-icon="rules ? 'mdi-check' : ''"
                  v-model="form.room_number"/>
            </v-col>
          </v-row>

          <div class="c-modal--address__receiver">
            <v-checkbox
                label="گیرنده سفارش خودم نیستم"
                hide-details
                v-model="newReceiver"/>

            <template v-if="newReceiver">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                      density="compact"
                      variant="outlined"
                      label="نام و نام خانوادگی گیرنده *"
                      :rules="persianRule"
                      :append-inner-icon="rules ? 'mdi-check' : ''"
                      v-model="form.full_name"/>
                </v-col>

                <v-col cols="12" md="6">
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
                class="btn btn--submit"
                @click="addAddress()"
                color="grey-darken-1">
              ثبت آدرس
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NeshanMap from "@neshan-maps-platform/vue3-openlayers";
import Public from '@/composables/Public.js'
export default {
  setup(){
    const {cities ,getCities} = new Public()
    return {cities ,getCities}
  },

  components: {
    NeshanMap,
  },

  data() {
    return {
      dialog: false,
      step: '1',
      form: {
        address: '',
        latLong: {
          latitude: 35.745669792668494,
          longitude: 51.35438114404677
        },
        postal_code: '',
        number: '',
        room_number: '',
        full_name: '',
        phone_number: '',
        province:null,
        city:null
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
    }
  },

  props: {
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

  methods: {
    markersIconCallback(point) {
      setTimeout(() => {
        this.form.latLong.latitude = this.$refs.myMap.state.reverseResult.mapCoords[1]
        this.form.latLong.longitude = this.$refs.myMap.state.reverseResult.mapCoords[0]
        this.form.address = this.$refs.myMap.state.reverseResult.formatted_address
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
      this.dialog = true;
      this.editMode();
    },

    /**
     * Close modal
     */
    closeModal() {
      this.dialog = false;
    },

    /**
     * back 'step' to 1 for show map
     */
    showMap() {
      console.log(this.step);
      this.step = '1';
      console.log(this.step);
    },
    /**
     * get cities after select province
     */
    getCitiesList() {
      this.getCities(this.form.province)
    },

    editMode() {
      if (this.edit) {
        this.step = '2'
      }
    },
    /**
     * set address detail on form after monut modal
     */
    setAddressForm() {
      try {
        this.form.address = this.address?.address
        this.form.full_name = this.address?.receiver_full_name
        this.form.number = this.address?.number
        this.form.phone_number = this.address?.phone_number
        this.form.postal_code = this.address?.postal_code
        this.form.room_number = this.address?.unit
        this.form.province = this.address?.state?.id
        this.getCities(this.address?.state?.id)
        this.form.city = this.address?.city?.id
        if (this.address?.am_i)  this.newReceiver = false
        else this.newReceiver = true

      } catch (e) {

      }
    }
  },
  computed:{
    cityList(){
      try {
        let cityList = []
        this.cities.forEach(city => {
          const form = {
            title:city.label,
            value : city.id
          }
          cityList.push(form)
        })
        return cityList
      }
      catch (e){
        return  []
      }
    },
    provinceList(){
      try {
        let provinceList = []
        this.provinces.data.forEach(province => {
          const form = {
            title:province.label,
            value : province.id
          }
          provinceList.push(form)
        })
        return provinceList
      }
      catch (e){
        return  e
      }
    },
  },
  mounted() {
    this.setAddressForm()
  }
}
</script>

<style lang="scss">
@import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
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
