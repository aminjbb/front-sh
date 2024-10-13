<template>
<div class="v-user__sidebar v-user__sidebar--mobile">
    <div class="d-flex align-center justify-space-between v-user__sidebar__top-section">
        <div class="d-flex flex-column justify-center align-center flex-grow-1">
            <div class="v-user__sidebar__image">
                <span class="d-block">
                    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M82.5 45C82.5 24.3375 65.6625 7.5 45 7.5C24.3375 7.5 7.5 24.3375 7.5 45C7.5 55.875 12.1875 65.6625 19.6125 72.525C19.6125 72.5625 19.6125 72.5625 19.575 72.6C19.95 72.975 20.4 73.275 20.775 73.6125C21 73.8 21.1875 73.9875 21.4125 74.1375C22.0875 74.7 22.8375 75.225 23.55 75.75C23.8125 75.9375 24.0375 76.0875 24.3 76.275C25.0125 76.7625 25.7625 77.2125 26.55 77.625C26.8125 77.775 27.1125 77.9625 27.375 78.1125C28.125 78.525 28.9125 78.9 29.7375 79.2375C30.0375 79.3875 30.3375 79.5375 30.6375 79.65C31.4625 79.9875 32.2875 80.2875 33.1125 80.55C33.4125 80.6625 33.7125 80.775 34.0125 80.85C34.9125 81.1125 35.8125 81.3375 36.7125 81.5625C36.975 81.6375 37.2375 81.7125 37.5375 81.75C38.5875 81.975 39.6375 82.125 40.725 82.2375C40.875 82.2375 41.025 82.275 41.175 82.3125C42.45 82.425 43.725 82.5 45 82.5C46.275 82.5 47.55 82.425 48.7875 82.3125C48.9375 82.3125 49.0875 82.275 49.2375 82.2375C50.325 82.125 51.375 81.975 52.425 81.75C52.6875 81.7125 52.95 81.6 53.25 81.5625C54.15 81.3375 55.0875 81.15 55.95 80.85C56.25 80.7375 56.55 80.625 56.85 80.55C57.675 80.25 58.5375 79.9875 59.325 79.65C59.625 79.5375 59.925 79.3875 60.225 79.2375C61.0125 78.9 61.8 78.525 62.5875 78.1125C62.8875 77.9625 63.15 77.775 63.4125 77.625C64.1625 77.175 64.9125 76.7625 65.6625 76.275C65.925 76.125 66.15 75.9375 66.4125 75.75C67.1625 75.225 67.875 74.7 68.55 74.1375C68.775 73.95 68.9625 73.7625 69.1875 73.6125C69.6 73.275 70.0125 72.9375 70.3875 72.6C70.3875 72.5625 70.3875 72.5625 70.35 72.525C77.8125 65.6625 82.5 55.875 82.5 45ZM63.525 63.6375C53.3625 56.8125 36.7125 56.8125 26.475 63.6375C24.825 64.725 23.475 66 22.35 67.3875C16.65 61.6125 13.125 53.7 13.125 45C13.125 27.4125 27.4125 13.125 45 13.125C62.5875 13.125 76.875 27.4125 76.875 45C76.875 53.7 73.35 61.6125 67.65 67.3875C66.5625 66 65.175 64.725 63.525 63.6375Z" fill="#D72685"/>
                        <path d="M45 25.9875C37.2375 25.9875 30.9375 32.2875 30.9375 40.05C30.9375 47.6625 36.9 53.85 44.8125 54.075C44.925 54.075 45.075 54.075 45.15 54.075C45.225 54.075 45.3375 54.075 45.4125 54.075C45.45 54.075 45.4875 54.075 45.4875 54.075C53.0625 53.8125 59.025 47.6625 59.0625 40.05C59.0625 32.2875 52.7625 25.9875 45 25.9875Z" fill="#D72685"/>
                    </svg>
                </span>

                <a class="v-user__sidebar__edit-button" href="/user/profile">
                    <v-icon icon="mdi-square-edit-outline" color="primary" />
                </a>
            </div>

            <template v-if="userData">
                <div class="d-flex flex-column align-center justify-center mt-3">
                    <span v-if="userData.first_name && userData.last_name" class="t16 w700 text-sGrayDarken2 mt-1">{{userData.first_name}} {{userData.last_name}}</span>
                    <span v-if="userData && userData.phone_number" class="t12 w500 text-sGrayLighten2 number-font" style="margin-top: 2px;">{{userData.phone_number}}</span>
                </div>
            </template>
            <template v-else>
                <span v-if="userData && userData.phone_number" class="t12 w500 text-sGrayLighten2 number-font">{{userData.phone_number}}</span>
            </template>
        </div>
    </div>

    <GeneralUserDashboardOrder class="mb-3 mt-3"/>

    <nav class="pb-10">
        <ul class="user-nav px-4">
            <li class="user-nav__item d-flex align-center justify-between" :class="{ active: isActive('/user/order') }">
                <a class="d-flex align-center flex-grow-1" href="/user/order">
                    <v-icon
                        icon="mdi-cart-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t12 w700 text-sGray">لیست سفارشات</div>
                </a>

                <v-icon icon="mdi-chevron-left" size="small" color="sGrayLighten2" />
            </li>

            <li class="user-nav__item d-flex align-center justify-between" :class="{ active: isActive('/user/address') }">
               <a class="d-flex align-center flex-grow-1" href="/user/address">
                    <v-icon
                        icon="mdi-map-marker-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t12 w700 text-sGray">لیست آدرس‌ها</div>
               </a>

               <v-icon icon="mdi-chevron-left" size="small" color="sGrayLighten2" />
            </li>

            <li class="user-nav__item d-flex align-center justify-between" :class="{ active: isActive('/user/wallet') }">
                <a class="d-flex align-center flex-grow-1" href="/user/wallet">
                    <v-icon
                        icon="mdi-wallet-bifold-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t12 w700 text-sGray">کیف پول</div>
                </a>

                <v-icon icon="mdi-chevron-left" size="small" color="sGrayLighten2" />
            </li>

            <li class="user-nav__item d-flex align-center justify-between" :class="{ active: isActive('/user/favorite-list') }">
                <a class="d-flex align-center flex-grow-1" href="/user/favorite-list">
                    <v-icon
                        icon="mdi-heart-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t12 w700 text-sGray">علاقمندی‌ها</div>
                </a>

                <v-icon icon="mdi-chevron-left" size="small" color="sGrayLighten2" />
            </li>

            <li class=" user-nav__item d-flex align-center justify-between" :class="{ active: isActive('/user/password') }">
                <a class="d-flex align-center flex-grow-1" href="/user/password">
                        <v-icon
                        icon="mdi-lock-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t12 w700 text-sGray">رمز عبور</div>
                </a>

                <v-icon icon="mdi-chevron-left" size="small" color="sGrayLighten2" />
            </li>

            <li class="user-nav__item d-flex align-center justify-between" :class="{ active: isActive('/user/comments') }">
                <a class="d-flex align-center flex-grow-1" href="/user/comments">
                    <v-icon
                        icon="mdi-comment-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t12 w700 text-sGray">نظرات</div>
                </a>

                <v-icon icon="mdi-chevron-left" size="small" color="sGrayLighten2" />
            </li>

            <li class="user-nav__item d-flex align-center justify-between" :class="{ active: isActive('/user/ticket') }">
                <a class="d-flex align-center flex-grow-1" href="/user/ticket">
                    <v-icon
                        icon="mdi-chat-processing-outline"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t12 w700 text-sGray">تیکت</div>
                </a>

                <v-icon icon="mdi-chevron-left" size="small" color="sGrayLighten2" />
            </li>

            <li class="user-nav__item cur-p pb-0 d-flex align-center justify-between" @click="openModal()">
                <a class="d-flex align-center flex-grow-1">
                    <v-icon
                        icon="mdi-exit-to-app"
                        color="sGrayLighten2"
                        class="ml-3" />
                    <div class="t12 w700 text-sGray">خروج</div>
                </a>

                <v-icon icon="mdi-chevron-left" size="small" color="sGrayLighten2" />
            </li>
        </ul>
    </nav>
</div>

  <!--<v-bottom-sheet-->
  <generalSheetsDelete
      ref="logOutSheet"
      title="خروج از حساب کاربری"
      text="آیا از خروج اطمینان دارید؟"
      submitText="خروج از حساب"
      @removeProduct="logout" />
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
            sheet: false,
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
          this.$refs.logOutSheet.sheet = true
        },

        closeModal() {
            this.sheet = false;
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
