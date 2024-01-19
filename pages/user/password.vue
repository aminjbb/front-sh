<template lang="">
<main class="v-user v-user--password">
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
                    <v-row class="pa-8 mobile-pa-0">
                        <template v-if="password">
                            <v-col
                                cols="12"
                                md="7">
                                <label class="d-block t14 text-grey-darken-3 mb-4">رمز عبور فعلی *</label>

                                <v-text-field
                                    :append-inner-icon="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                    :type="visible ? 'text' : 'password'"
                                    density="compact"
                                    variant="outlined"
                                    v-model="form.previous_password"
                                    @click:append-inner="visible = !visible" />
                            </v-col>

                            <v-col
                                cols="12"
                                md="7">
                                <label class="d-block t14 text-grey-darken-3 mb-4">
                                    رمز عبور جدید
                                    <span class="text-red-accent-4">*</span>
                                </label>

                                <v-text-field
                                    :append-inner-icon="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                    :type="visible ? 'text' : 'password'"
                                    density="compact"
                                    variant="outlined"
                                    v-model="form.new_password"
                                    @click:append-inner="visible = !visible" />

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
                                    :append-inner-icon="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                    :type="visible ? 'text' : 'password'"
                                    density="compact"
                                    variant="outlined"
                                    v-model="form.repetition_password"
                                    :rules="confirmPasswordRules"
                                    @click:append-inner="visible = !visible" />

                            </v-col>
                        </template>
                        <template v-else>
                            <v-col
                                cols="12"
                                md="7">
                                <label class="d-block t14 text-grey-darken-3 mb-4">رمز عبور</label>

                                <v-text-field
                                    :append-inner-icon="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                    :type="visible ? 'text' : 'password'"
                                    density="compact"
                                    variant="outlined"
                                    v-model="form.new_password"
                                    @click:append-inner="visible = !visible" />

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
                                    :append-inner-icon="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                    :type="visible ? 'text' : 'password'"
                                    :rules="confirmPasswordRules"
                                    density="compact"
                                    variant="outlined"
                                    v-model="form.repetition_password"
                                    @click:append-inner="visible = !visible" />

                            </v-col>
                        </template>
                    </v-row>

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
                            @click="submitForm()"
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
export default {

    data() {
        return {
            user: null,
            password: null,
            visible: false,
            form:{
                new_password:'',
                repetition_password:''
            },
            rule: [v => !!v || 'این فیلد الزامی است'],
            confirmPasswordRules: [
                (value) => !!value || "این فیلد الزامی است",
                (value) => value === this.password || "تکرار رمز صحیح نیست. لطفا مجدد رمز خود را وارد کنید.",
            ],
        }
    },

    setup() {
        const userToken = useCookie('userToken');

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
            userToken
        };
    },

    methods: {
        /**
         * Fetch user 
         */
        async fetchUserProfile() {
            try {
                const userProfile = await auth.getUserProfile(this.userToken)
                // Use the userProfile data as needed
                console.log('User Profile Data:', userProfile)
            } catch (error) {
                // Handle errors
            }
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

