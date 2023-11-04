<template lang="">
<div class="user__side-bar vh-100">
    <v-list-item
        lines="two"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        title="user name" />

    <v-divider />

    <v-list density="compact" nav>
        <v-list-item
            v-for="([title, to, icon], i) in sideBarMenu"
            v-bind="props"
            :key="i"
            :value="title"
            :to="to"
            active-class="bg-active"
            style="padding-right:16px !important">
            <template v-slot:prepend>
                <v-icon size="x-small">{{icon}}</v-icon>
            </template>

            <span class="t14500">
                {{title}}
            </span>
        </v-list-item>
    </v-list>
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
