<template>
<v-dialog v-if="dialog" v-model="dialog" color="white" class="full full-button" width="633px">
    <v-card class="pt-3 px-6 pb-5">
        <header class="c-modal__header d-flex justify-space-between align-center pb-1 border-0">
            <span class="t15 w400">
                اطلاعات شخصی 
            </span>

            <v-btn class="c-modal__header__btn pa-0 text-none" @click="closeModal()" color="grey-darken-1" size="large" variant="icon">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </header>

        <p class="t12 w400 text-grey mb-8">ابتدا اطلاعات زیر را وارد نمایید.</p>
        <v-form ref="setProfile" v-model="valid">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field :rules="persianRule" density="compact" variant="outlined" label="نام" :append-inner-icon="rules ? 'mdi-check' : ''" v-model="form.name" />
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field :rules="persianRule" density="compact" variant="outlined" label="نام خانوادگی" v-model="form.family_name" />
                </v-col>
            </v-row>

            <div class="d-flex align-center justify-end">
                <v-btn :loading="loading" @click="validate()" height="50" title="ثبت مشخصات" class="btn btn--submit ml-4">
                    ثبت مشخصات
                </v-btn>
            </div>
        </v-form>
    </v-card>
</v-dialog>
</template>

<script>
import axios from "axios";
import auth from '@/middleware/auth';
export default {
    data() {
        return {
            loading: false,
            valid: true,
            user: null,
            dialog: false,
            persianRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/.test(v) ||
                "فقط حروف فارسی ",
            ],
            form: {
                name: '',
                family_name: '',
            }
        }
    },

     props:{
        phoneNumber:String,
    },

    setup() {
        const userToken = useCookie('userToken')

        const runtimeConfig = useRuntimeConfig()

        return {
            userToken,
            runtimeConfig
        };
    },

    methods: {
        /**
         * Validate form
         */
        validate() {
            this.$refs.setProfile.validate()
            setTimeout(() => {
                if (this.valid) this.updateUser()
            }, 200)
        },

        /**
         * Update user info
         */
        async updateUser() {
            this.loading = true
            await axios.post(`${this.runtimeConfig.public.apiBase}/user/profile/profile/update`, {
                first_name: this.form.name,
                last_name: this.form.family_name,
                phone_number: this.phoneNumber,
            }, {
                headers: {
                    Authorization: `Bearer ${this.userToken}`,
                },
            }).then((response) => {
                useNuxtApp().$toast.success('مشخصات با موفقیت ثبت شد', {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
                this.dialog = false;
                this.fetchUserProfile();
                this.$emit('profileSubmitted')
            }).catch((error) => {

            }).finally((response) => {
                this.loading = false
            })
        },

        /**
         * fetch user data
         */
         async fetchUserProfile() {
            try {
                const response = await auth.getUserProfile(this.userToken)
              if (response.data.data)
              {
                this.$store.commit('set_userData', response.data.data)
              }

            } catch (error) {
                // Handle errors
            }
        },

        /**
         * Close modal
         */
        closeModal(){
            this.dialog = false;
        }
    }
}
</script>

<style>

</style>
