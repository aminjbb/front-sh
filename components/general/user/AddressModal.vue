<template>
    <div class="c-modal c-modal--address">
        <template v-if="buttonType == 'icon'">
            <v-icon
                class="cur-p"
                @click="openModal()"
                icon="mdi-square-edit-outline"
                size="small"
                color="grey" />
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
                    color="grey" />
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
                    <div class="mb-10">
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            label="آدرس پستی *"
                            hide-details
                            :rules="rule"
                            :append-inner-icon="rules ? 'mdi-check' : ''"
                            v-model="form.address" />

<!--                        <span class="t11 w400 text-grey mt-2 d-block">-->
<!--                            آدرس پستی پیشفرض بر اساس موقعیت مکانی انتخابی شما وارد شده است و قابلیت ویرایش دارد.-->
<!--                        </span>-->
                    </div>

<!--                    <a @click="showMap" class="d-flex align-center mt-5 mb-7 cur-p">-->
<!--                        <span class="t13 w500 l30 text-deep-purple">تغییر موقعیت مکانی روی نقشه</span>-->
<!--                        <v-icon-->
<!--                            icon="mdi-chevron-left"-->
<!--                            color="deep-purple"-->
<!--                            class="mr-2 t16" />-->
<!--                    </a>-->

                    <v-row>
                        <v-col cols="12" md="6">

                            <v-autocomplete
                                :items="provinceList"
                                density="compact"
                                variant="outlined"
                                :rules="rule"
                                label="استان *"
                                v-model="form.province"
                                @update:modelValue="getCitiesList()" />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-autocomplete
                                :items="cityList"
                                density="compact"
                                variant="outlined"
                                :rules="rule"
                                label="شهر *"
                                v-model="form.city" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                label="کد پستی *"
                                :rules="postalCodeRule"
                                :append-inner-icon="rules ? 'mdi-check' : ''"
                                v-model="form.postal_code" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                label="پلاک *"
                                :rules="rule"
                                :append-inner-icon="rules ? 'mdi-check' : ''"
                                v-model="form.number" />
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field
                                density="compact"
                                variant="outlined"
                                label="واحد"
                                :rules="rule"
                                :append-inner-icon="rules ? 'mdi-check' : ''"
                                v-model="form.room_number" />
                        </v-col>
                    </v-row>

                    <div class="c-modal--address__receiver">
                        <v-checkbox
                            label="گیرنده سفارش خودم نیستم"
                            hide-details
                            v-model="newReceiver" />

                        <template v-if="newReceiver">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        density="compact"
                                        variant="outlined"
                                        label="نام گیرنده *"
                                        :rules="persianRule"
                                        :append-inner-icon="rules ? 'mdi-check' : ''"
                                        v-model="form.first_name" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field
                                        density="compact"
                                        variant="outlined"
                                        label=" نام خانوادگی گیرنده *"
                                        :rules="persianRule"
                                        :append-inner-icon="rules ? 'mdi-check' : ''"
                                        v-model="form.last_name" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field
                                        density="compact"
                                        variant="outlined"
                                        label="شماره تماس گیرنده *"
                                        :rules="mobileRule"
                                        :append-inner-icon="rules ? 'mdi-check' : ''"
                                        v-model="form.phone_number" />
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
    
        <generalUserProfileModal ref="profileModal" :phoneNumber="userDetail ?.phone_number" @profileSubmitted="openAddressModal()"/>
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
            isDisable : true,
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

            formData.append('address', this.form.address)
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
                formData.append('first_name', this.userDetail ?.first_name)
                formData.append('last_name', this.userDetail ?.last_name)
                formData.append('phone_number', digits(this.userDetail ?.phone_number, 'en'))
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
                    useNuxtApp().$toast.success('آدرس شما با موفقیت ایجاد شد.', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                })
                .catch((err) => {
                    auth.checkAuthorization(err.response)
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
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
            if((this.userDetail?.first_name === null || this.userDetail?.first_name === '') && (this.userDetail?.last_name === null || this.userDetail?.last_name === '')){
                this.$refs.profileModal.dialog = true
            } else{
                this.dialog = true;
                this.setAddressForm();
                this.editMode();
            }
        },

        openAddressModal(){
            this.dialog = true;
        },

        /**
         * Close modal
         */
        closeModal() {
            this.dialog = false;
            this.isDisable= true;
            this.form= {
                address: '',
                postal_code: '',
                number: '',
                room_number: '',
                first_name: '',
                last_name: '',
                phone_number: '',
                province: null,
                city: null
            }
        },

        /**
         * get cities after select province
         */
        getCitiesList() {
            this.form.city = null
            this.getCities(this.form.province)
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
                this.form.address = this.address ?.address
                this.form.full_name = this.address ?.receiver_full_name
                this.form.number =  digits(this.address ?.number, 'en')
                this.form.phone_number = digits(this.address ?.phone_number, 'en')
                this.form.postal_code = digits(this.address ?.postal_code, 'en')
                this.form.room_number =  digits(this.address ?.unit, 'en')
                this.form.province = this.address ?.state ?.id
                this.form.city = this.address ?.city ?.id
                if(this.edit){
                    if (this.address ?.am_i === 1 ) this.newReceiver = false
                    else {
                        this.newReceiver = true;
                        this.form.first_name = this.address ?.first_name
                        this.form.last_name = this.address ?.last_name
                    }
                }

            } catch (e) {

            }
        }
            
    },

    mounted() {
        this.setAddressForm(),
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

  watch:{
    dialog(val){
      if (val === true && this.edit === true){
        this.getCities(this.form.province)
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
    