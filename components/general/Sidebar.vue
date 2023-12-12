<template lang="">
<div class="v-user__sidebar">
    <v-card class="pa-5">
        <div class="d-flex align-center">
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
    </v-card>
    <nav class="card px-5">
        <ul class="user-nav">
            <li class="d-flex align-center user-nav__item">
                <v-icon
                    icon="mdi-cart-outline"
                    color="grey"
                    class="ml-3" />
                <span class="t13 text-grey">لیست سفارشات</span>
            </li>

            <li class="d-flex align-center user-nav__item">
                <v-icon
                    icon="mdi-map-marker-outline"
                    color="grey"
                    class="ml-3" />
                <span class="t13 text-grey">آدرس‌ها</span>
            </li>

            <li class="d-flex align-center user-nav__item">
                <v-icon
                    icon="mdi-wallet-bifold-outline"
                    color="grey"
                    class="ml-3" />
                <span class="t13 text-grey">کیف پول</span>
            </li>

            <li class="d-flex align-center user-nav__item">
                <v-icon
                    icon="mdi-heart-outline"
                    color="grey"
                    class="ml-3" />
                <span class="t13 text-grey">علاقمندی‌ها</span>
            </li>

            <li class="d-flex align-center user-nav__item">
                <v-icon
                    icon="mdi-lock-outline"
                    color="grey"
                    class="ml-3" />
                <span class="t13 text-grey">رمز عبور</span>
            </li>

            <li class="d-flex align-center user-nav__item">
                <v-icon
                    icon="mdi-comment-outline"
                    color="grey"
                    class="ml-3" />
                <span class="t13 text-grey">نظرات</span>
            </li>

            <li class="d-flex align-center user-nav__item">
                <v-icon
                    icon="mdi-chat-processing-outline"
                    color="grey"
                    class="ml-3" />
                <span class="t13 text-grey">تیکت</span>
            </li>

            <li class="d-flex align-center user-nav__item">
                <v-icon
                    icon="mdi-exit-to-app"
                    color="grey"
                    class="ml-3" />
                <span class="t13 text-grey">خروج</span>
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
}
</script>
