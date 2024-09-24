<template>
<div class="v-user__sidebar">
    <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center flex-grow-1">
            <v-icon
                icon="mdi-account-circle-outline"
                color="sGrayLighten2"
                class="ml-3" />

            <template v-if="userData">
                <div class="d-flex flex-column">
                    <span v-if="userData.first_name && userData.last_name" class="t16 w700 text-sGrayDarken2 mt-1">{{userData.first_name}} {{userData.last_name}}</span>
                    <span v-if="userData && userData.phone_number" class="t12 w500 text-sGrayLighten2 number-font" style="margin-top: 2px;">{{userData.phone_number}}</span>
                </div>
            </template>
            <template v-else>
                <span v-if="userData && userData.phone_number" class="t12 w500 text-sGrayLighten2 number-font">{{userData.phone_number}}</span>
            </template>
        </div>
        <a class="v-user__sidebar__edit-button" href="/user/profile">
            <v-icon icon="mdi-square-edit-outline" color="primary" />
        </a>
    </div>

    <nav class="">
        <ul class="user-nav">
            <li class="user-nav__item" :class="{ active: isActive('/user/order') }">
                <a class="d-flex align-center" href="/user/order">
                    <v-icon
                        icon="mdi-cart-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t14 w700 text-sGray">لیست سفارشات</div>
                </a>
            </li>

            <li class="user-nav__item" :class="{ active: isActive('/user/address') }">
               <a class="d-flex align-center" href="/user/address">
                    <v-icon
                        icon="mdi-map-marker-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t14 w700 text-sGray">لیست آدرس‌ها</div>
               </a>
            </li>

            <li class="user-nav__item" :class="{ active: isActive('/user/wallet') }">
                <a class="d-flex align-center" href="/user/wallet">
                    <v-icon
                        icon="mdi-wallet-bifold-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t14 w700 text-sGray">کیف پول</div>
                </a>
            </li>

            <li class="user-nav__item" :class="{ active: isActive('/user/favorite-list') }">
                <a class="d-flex align-center" href="/user/favorite-list">
                    <v-icon
                        icon="mdi-heart-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t14 w700 text-sGray">علاقمندی‌ها</div>
                </a>
            </li>

            <li class=" user-nav__item" :class="{ active: isActive('/user/password') }">
                <a class="d-flex align-center" href="/user/password">
                        <v-icon
                        icon="mdi-lock-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t14 w700 text-sGray">رمز عبور</div>
                </a>
            </li>

            <li class="user-nav__item" :class="{ active: isActive('/user/comments') }">
                <a class="d-flex align-center" href="/user/comments">
                    <v-icon
                        icon="mdi-comment-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t14 w700 text-sGray">نظرات</div>
                </a>
            </li>

            <li class="user-nav__item" :class="{ active: isActive('/user/ticket') }">
                <a class="d-flex align-center" href="/user/ticket">
                    <v-icon
                        icon="mdi-chat-processing-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t14 w700 text-sGray">تیکت</div>
                </a>
            </li>

            <li class="user-nav__item cur-p pb-0" @click="openModal()">
                <a class="d-flex align-center">
                    <v-icon
                        icon="mdi-exit-to-app"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t14 w700 text-sGray">خروج</div>
                </a>
            </li>
        </ul>
    </nav>
</div>

<v-dialog
    v-if="dialog"
    v-model="dialog"
    color="white"
    width="470px">
    <v-card class="pt-3 px-6 pb-5">
        <header class="c-modal__header d-flex justify-space-between align-center pb-1">
            <span class="t15 w400">
                خروج از حساب کاربری
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

        <div>
            <p class="t14 w400 my-8 text-center text-grey-darken-2">آیا از خروج از حساب اطمینان دارید؟ </p>

            <div class="d-flex align-center justify-center mt-2 mobile-pa-0 w-100">
                <v-btn
                    @click="closeModal()"
                    height="44"
                    title="انصراف"
                    class="btn btn--cancel ml-1">
                    انصراف
                </v-btn>

                <v-btn
                    @click="logout()"
                    height="44"
                    title="خروج از حساب"
                    class="btn btn--submit">
                    خروج از حساب
                </v-btn>
            </div>
        </div>
    </v-card>
</v-dialog>
</template>

<script>
import auth from '@/middleware/auth';
export default {
    name: "Sidebar",

    data() {
        return {
            sideBarMenu: [
                ['داشبورد', '/user/dashboard', 'mdi-home-city'],
                ['پروفایل من', '/user/profile', 'mdi-account'],
                ['آدرس‌های من', '/user/address', 'mdi-forum'],
                ['سفارش‌های من', '/user/orders', 'mdi-chat'],
            ],
            dialog: false,
            userData: null,
        }
    },

    setup() {
        const userToken = useCookie('userToken')
        return {
            userToken,
        }
    },

    methods: {
        isActive(route) {
            return this.$route.path === route;
        },

        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        },

        logout() {
            this.userToken = '';
            window.location = '/';
            this.closeModal();
        },

        /**
         * fetch user data
         */
        async fetchUserProfile() {
            try {
                const response = await auth.getUserProfile(this.userToken)
              if (response.data.data)
              {
                this.userData = response.data.data
              }


            } catch (error) {
                // Handle errors
            }
        },
    },

    created() {
        if (this.userToken) {
            this.fetchUserProfile();
        } 
    },
}
</script>
