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

                <template v-if="name">
                    <div class="d-flex flex-column">
                        <span class="user-phone t16">نگین اسدی</span>
                        <span class="user-phone t13 text-grey mt-2">۰۹۳۰۳۷۴۴۱۲۱</span>
                    </div>
                </template>
                <template v-else>
                    <span class="user-phone t16">۰۹۳۰۳۷۴۴۱۲۱</span>
                </template>
            </div>
            <a href="/user/profile">
                <v-icon icon="mdi-account-edit" color="primary"/>
            </a>
        </div>
    </v-card>
    <nav class="card px-5">
        <ul class="user-nav">
            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/') }">
                <v-icon
                    icon="mdi-cart-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey">لیست سفارشات</a>
            </li>

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/user/address') }">
                <v-icon
                    icon="mdi-map-marker-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey" href="/user/address">آدرس‌ها</a>
            </li>

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/') }">
                <v-icon
                    icon="mdi-wallet-bifold-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey">کیف پول</a>
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

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/') }">
                <v-icon
                    icon="mdi-comment-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey">نظرات</a>
            </li>

            <li class="d-flex align-center user-nav__item" :class="{ active: isActive('/') }">
                <v-icon
                    icon="mdi-chat-processing-outline"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey">تیکت</a>
            </li>

            <li class="d-flex align-center user-nav__item">
                <v-icon
                    icon="mdi-exit-to-app"
                    color="grey"
                    class="ml-3" />
                <a class="t13 text-grey">خروج</a>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
export default {
    name: "Sidebar",

    data() {
        return {
            sideBarMenu: [
                ['داشبورد', '/user/dashboard', 'mdi-home-city'],
                ['پروفایل من', '/user/profile', 'mdi-account'],
                ['آدرس‌های من', '/user/address', 'mdi-forum'],
                ['سفارش‌های من', '/user/orders', 'mdi-chat'],
            ]
        }
    },

    methods: {
        isActive(route) {
            return this.$route.path === route;
        }
    },
}
</script>
