<template lang="">
<div class="v-user__sidebar">
    <v-card class="pa-5">
        <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center flex-grow-1">
                <v-icon
                    icon="mdi-account-circle-outline"
                    color="grey-darken-1"
                    size="x-large"
                    class="ml-3" />

                <template v-if="userData">
                    <div class="d-flex flex-column">
                        <span v-if="userData.first_name && userData.last_name" class="user-phone t16">{{userData.first_name}} {{userData.last_name}}</span>
                        <span v-if="userData && userData.phone_number" class="user-phone t13 text-grey mt-2 number-font">{{userData.phone_number}}</span>
                    </div>
                </template>
                <template v-else>
                    <span v-if="userData && userData.phone_number" class="user-phone t16 number-font">{{userData.phone_number}}</span>
                </template>
            </div>
            <a href="/user/profile">
                <v-icon icon="mdi-account-edit" color="primary" />
            </a>
        </div>
    </v-card>
    <nav class="card px-5">
        <ul class="user-nav">
            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/user/order') }">
                <v-icon
                    icon="mdi-cart-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey" href="/user/order">لیست سفارشات</a>
            </li>

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/user/address') }">
                <v-icon
                    icon="mdi-map-marker-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey" href="/user/address">آدرس‌ها</a>
            </li>

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/user/wallet') }">
                <v-icon
                    icon="mdi-wallet-bifold-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey" href="/user/wallet">کیف پول</a>
            </li>

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/user/favorite-list') }">
                <v-icon
                    icon="mdi-heart-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey" href="/user/favorite-list">علاقمندی‌ها</a>
            </li>

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/user/password') }">
                <v-icon
                    icon="mdi-lock-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey" href="/user/password">رمز عبور</a>
            </li>

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/user/comments') }">
                <v-icon
                    icon="mdi-comment-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey" href="/user/comments">نظرات</a>
            </li>

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/user/ticket') }">
                <v-icon
                    icon="mdi-chat-processing-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey" href="/user/ticket">تیکت</a>
            </li>

            <li class="d-flex align-center user-nav__item cur-p" @click="openModal()">
                <v-icon
                    icon="mdi-exit-to-app"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey">خروج</a>
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
                this.userData = response.data.data

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
