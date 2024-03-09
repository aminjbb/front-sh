<template>
<main class="v-user v-user--password">
    <h1 class="ov-h h-0">رمز عبور</h1>

    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">رمز عبور</span>
    </header>

    <v-container class="pt-0">
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4">
                <v-card class="pa-8 mobile-pa-0 mobile-no-border has-header">
                    <header class="card__header">رمز عبور</header>
                    <v-form v-model="valid" ref="changePassword">
                        <v-row class="pa-8 mobile-pa-0">
                            <v-col
                                v-if="hasPassword"
                                cols="12"
                                md="7">
                                <label class="d-block t14 text-grey-darken-3 mb-4">رمز عبور فعلی <span class="text-red-accent-4">*</span></label>

                                <v-text-field
                                    :rules="rule"
                                    :append-inner-icon="visibleNow ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                    :type="visibleNow ? 'text' : 'password'"
                                    density="compact"
                                    variant="outlined"
                                    v-model="form.previous_password"
                                    @click:append-inner="visibleNow = !visibleNow" />
                            </v-col>

                            <v-col cols="12" md="7">
                                <label class="d-block t14 text-grey-darken-3 mb-4">
                                    رمز عبور جدید
                                    <span class="text-red-accent-4">*</span>
                                </label>

                                <v-text-field
                                    :rules="rule"
                                    :append-inner-icon="visibleNew ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                    :type="visibleNew ? 'text' : 'password'"
                                    density="compact"
                                    variant="outlined"
                                    v-model="form.new_password"
                                    @click:append-inner="visibleNew = !visibleNew" />

                                <div class="t12 text-deep-purple">پسورد انتخابی شما باید حداقل دارای 8 کاراکتر باشد</div>

                            </v-col>

                            <v-col
                                cols="12"
                                md="7"
                                class="mt-10">
                                <label class="d-block t14 text-grey-darken-3 mb-4">
                                    تکرار رمز عبور
                                    <span class="text-red-accent-4">*</span>
                                </label>

                                <v-text-field
                                    :append-inner-icon="visibleConfirm ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                                    :type="visibleConfirm ? 'text' : 'password'"
                                    density="compact"
                                    variant="outlined"
                                    v-model="form.repetition_password"
                                    :rules="confirmPasswordRules"
                                    @click:append-inner="visibleConfirm = !visibleConfirm" />

                            </v-col>
                        </v-row>
                    </v-form>

                    <div class="d-flex align-center justify-end mb-8 pl-5 mobile-pa-0">
                        <v-btn
                            @click="cancelForm()"
                            height="44"
                            title="انصراف"
                            class="btn btn--cancel ml-1">
                            انصراف
                        </v-btn>
                        <v-btn
                            :loading="loading"
                            @click="validate()"
                            height="44"
                            title="تایید رمز عبور"
                            class="btn btn--submit ml-4">
                            تایید رمز عبور
                        </v-btn>
                    </div>
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
import auth from '@/middleware/auth';
import axios from "axios";
export default {

    data() {
        return {
            loading: false,
            hasPassword: false,
            user: null,
            password: null,
            visibleNow: false,
            visibleNew: false,
            visibleConfirm: false,
            form: {
                new_password: null,
                repetition_password: null,
                previous_password: null
            },
            rule: [v => !!v || 'این فیلد الزامی است'],
            /* passwordRule: [
                (value) => !!value || "این فیلد الزامی است",
                (value) => /^{8}$/.test(value) || "طول پسورد باید 8 کارکتر باشد.",
            ], */
            confirmPasswordRules: [
                (value) => !!value || "این فیلد الزامی است",
                (value) => value === this.form.new_password || "تکرار رمز صحیح نیست. لطفا مجدد رمز خود را وارد کنید.",
            ],
            valid: true,

        }
    },

    setup() {
        const userToken = useCookie('userToken');
        const runtimeConfig = useRuntimeConfig()
        const title = ref('فروشگاه اینترنتی شاواز | رمز عبور')
        const description = ref("رمز عبور کاربر")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })

        return {
            userToken,
            runtimeConfig
        };
    },

    methods: {
        /**
         * Fetch user 
         */
        async fetchUserHasPassword() {
            try {
                const response = await auth.getUserHasPassword(this.userToken);
                this.hasPassword = response.data
            } catch (error) {
                // Handle errors
            }
        },

        /**
         * validate change password form
         */
        validate() {
            this.$refs.changePassword.validate()
            setTimeout(() => {
                this.changePassword()
            }, 200)
        },

        /**
         * change Password with api
         */
        async changePassword() {
            this.loading = true
            const formData = new FormData()

            if (this.hasPassword) formData.append('old_password', this.form.previous_password)

            formData.append('password', this.form.new_password)
            formData.append('password_confirmation', this.form.repetition_password)

            await axios.post(`${this.runtimeConfig.public.apiBase}/user/profile/password/update`, formData, {
                headers: {
                    Authorization: `Bearer ${this.userToken}`,
                },
            }).then((response) => {
                useNuxtApp().$toast.success('رمز عبور با موفقیت تغییر کرد', {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            }).catch((error) => {
                useNuxtApp().$toast.error(error.response.data.message, {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            }).finally((response) => {
                this.loading = false
            })
        }
    },

    mounted() {
        this.fetchUserHasPassword();
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
</style>
