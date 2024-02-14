<template>
<main class="v-user v-user--profile">
    <h1 class="ov-h h-0">اطلاعات حساب کاربری</h1>

    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">اطلاعات حساب کاربری</span>
    </header>

    <v-container class="pt-0">
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4">
                <v-form ref="editUser" v-model="valid">
                    <v-card class="pa-8 mobile-pa-0 mobile-no-border ov-v">
                        <v-row class="pa-5">
                            <v-col cols="12" md="6">
                                <v-text-field
                                    :rules="persianRule"
                                    density="compact"
                                    variant="outlined"
                                    label="نام"
                                    :append-inner-icon="rules ? 'mdi-check' : ''"
                                    v-model="form.name" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    :rules="persianRule"
                                    density="compact"
                                    variant="outlined"
                                    label="نام خانوادگی"
                                    v-model="form.family_name" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    :rules="mobileRule"
                                    density="compact"
                                    variant="outlined"
                                    label="شماره تماس"
                                    v-model="form.mobile" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    :rules="emailRule"
                                    density="compact"
                                    variant="outlined"
                                    label="ایمیل"
                                    v-model="form.email" />
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    :rules="nationalCodeRule"
                                    density="compact"
                                    variant="outlined"
                                    label="کد ملی"
                                    v-model="form.national_code" />
                            </v-col>

                            <v-col cols="12" md="6" class="form-date">
                                <v-text-field
                                    density="compact"
                                    label="تاریخ تولد"
                                    variant="outlined"
                                    v-model="form.birth_date" />

                                <client-only>
                                    <date-picker v-model="form.birth_date" :column="1" mode="single" :placeholder="form.birth_date ? form.birth_date : ''"></date-picker>
                                </client-only>
                            </v-col>
                        </v-row>

                        <div class="d-flex align-center justify-end">
                            <v-btn
                                @click="cancelForm()"
                                height="50"
                                title="انصراف"
                                class="btn btn--cancel ml-1">
                                انصراف
                            </v-btn>
                            <v-btn
                                :loading="loading"
                                @click="validate()"
                                height="50"
                                title="ثبت مشخصات"
                                class="btn btn--submit ml-4">
                                ثبت مشخصات
                            </v-btn>
                        </div>
                    </v-card>
                </v-form>

            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
import auth from '@/middleware/auth';
import axios from "axios";

//component
import DatePicker from '@alireza-ab/vue3-persian-datepicker';

export default {

    data() {
        return {
            loading: false,
            valid: true,
            user: null,
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
            emailRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    v
                ) || " ایمیل معتبر نیست",
            ],
            nationalCodeRule: [
                (v) => !!v || "این فیلد الزامی است",
                (v) => /^[0-9]{10}$/.test(v) || "کد ملی معتبر وارد کنید",
            ],
            form: {
                name: '',
                family_name: '',
                mobile: '',
                email: '',
                national_code: '',
                birth_date: '',
            }
        }
    },

    setup() {
        const userToken = useCookie('userToken')
        const userDetail = ref(null)
        const title = ref('فروشگاه اینترنتی شاواز | پروفایل کاربری')
        const description = ref("پروفایل کاربری")

        const runtimeConfig = useRuntimeConfig()

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })

        return {
            userToken,
            userDetail,
            runtimeConfig
        };
    },

    components: {
        DatePicker
    },

    methods: {
        /**
         * Validate form
         */
        validate() {
            this.$refs.editUser.validate()
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
                phone_number: this.form.mobile,
                email: this.form.email,
                birth_date: this.form.birth_date,
                first_name: this.form.name,
                last_name: this.form.family_name,
                national_code: this.form.national_code,
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
                this.userDetail = response.data;
                this.setUserDetailForm()
            } catch (error) {
                // Handle errors
            }
        },

        setUserDetailForm() {
            try {
                this.form.name = this.userDetail ?.data ?.first_name
                this.form.family_name = this.userDetail ?.data ?.last_name
                this.form.mobile = this.userDetail ?.data ?.phone_number
                this.form.email = this.userDetail ?.data ?.email
                this.form.national_code = this.userDetail ?.data ?.national_code
                this.form.birth_date = convertDateToJalai(this.userDetail ?.data ?.birth_date, '-', false)
            } catch (e) {

            }
        },

        /**
         * Cancel form
         */
        cancelForm() {
            this.$router.push('/user/dashboard')
        }
    },

    mounted() {
        this.fetchUserProfile();
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
</style>
