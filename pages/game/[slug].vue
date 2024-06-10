<template>
<client-only>
    <main class="v-game">
        <h1 class="ov-h h-0">گردونه</h1>
        <generalGameHeader />

        <v-container class="parent-width">
            <v-row v-if="screenType === 'desktop'" class="h-100">
                <v-col cols="12" md="5" class="d-flex align-center justify-center">
                    <template v-if="isLogin">
                        <div class="d-flex flex-column">
                            <h2 class="game-title-mobile t34 w700 mb-2 text-white">
                                گردونه شانس شاواز
                            </h2>

                            <div class="t14 w400 l26 text-white mb-8">
                                گردونه رو بچرخون و برنده کد تخفیف محصولات آرایشی و بهداشتی شاواز شو!
                            </div>

                            <generalGameVoucherCards :voucherList="voucherList" />
                        </div>
                    </template>

                    <template v-else>
                        <generalGameAuth class="pl-15" @logined="logined" />
                    </template>
                </v-col>

                <v-col cols="12" md="7" class="d-flex justify-center v-game__lucky-wheel">
                    <div class="d-flex flex-column align-center" v-if="luckyWheel.length">
                        <generalGameFortuneWheel @updateForm="updateList" :items="luckyWheel" :isLogin="isLogin" :limit="turnPerUser" :userUsed="voucherList?.length" />
                    </div>
                </v-col>
            </v-row>

            <v-row v-else-if="screenType === 'mobile'" class="h-100">

                <v-col  v-if="isLogin === false" cols="12" md="5" class="d-flex align-center justify-center">
                    <generalGameAuth class="w-100 mb-5" @logined="logined" />
                </v-col>

                <v-col cols="12" md="7" class="d-flex justify-center v-game__lucky-wheel">
                    <div class="d-flex flex-column align-center w-100" v-if="luckyWheel.length">
                        <generalGameFortuneWheel @updateForm="updateList" :items="luckyWheel" :isLogin="isLogin" :limit="turnPerUser" :userUsed="voucherList?.length" />
                    </div>
                </v-col>

                <v-col v-if="isLogin === true" cols="12"  md="5" class="d-flex align-center justify-center">
                    <div class="d-flex flex-column w-100">
                        <h2 class="game-title-mobile t34 w700 mb-2 text-white xs-hide">
                            گردونه شانس شاواز
                        </h2>

                        <div class="t14 w400 l26 text-white mb-8 xs-hide">
                            گردونه رو بچرخون و برنده کد تخفیف محصولات آرایشی و بهداشتی شاواز شو!
                        </div>

                        <generalGameVoucherCards :voucherList="voucherList" />
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <generalGameFooter />
    </main>
</client-only>
</template>

<script>
import auth from '@/middleware/auth';
import Game from '@/composables/Game.js';

export default {
    data() {
        return {
            isLogin: false,
            screenType: null,
        }
    },

    setup() {
        const userToken = useCookie('userToken');
        const {
            getUserVoucherList,
            voucherList,
            getLuckyWheel,
            luckyWheel,
            turnPerUser
        } = new Game()

        return {
            userToken,
            getUserVoucherList,
            voucherList,
            getLuckyWheel,
            luckyWheel,
            turnPerUser
        }
    },

    created() {
        this.fetchUserProfile();
    },

    methods: {
        /**
         * fetch user data
         */
        async fetchUserProfile() {
            try {
                const response = await auth.getUserProfile(this.userToken)
                if (response.data.data) {
                    this.isLogin = true;

                }
            } catch (error) {
                this.isLogin = false;
            }
        },

        logined(e) {
            if (e === true) {
                this.isLogin = true;
                setTimeout(() => {
                    this.getUserVoucherList();
                }, 200)
            }
        },

        updateList(e){
          if(e === true ){
            this.getUserVoucherList();
          }
        }
    },

    mounted() {
        this.getLuckyWheel();
        this.getUserVoucherList();
        /**
         * Check screen size
         */
         window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/game.scss';
</style>
