<template>
<client-only>
    <main class="v-game">
        <h1 class="ov-h h-0">گردونه</h1>
        <generalGameHeader />

        <v-container class="parent-width">
            <v-row v-if="screenType === 'desktop'" class="h-100">

                <v-col cols="12" v-show="!isLogin">
                    <div class="d-flex flex-column">
                        <h2 class="game-title-mobile t34 w700 mb-2 text-white">
                            گردونه شانس تابستانه شاواز
                        </h2>

                        <div class="t14 w400 l26 text-white">
                            گردونه رو بچرخون و برنده کد تخفیف محصولات آرایشی و بهداشتی شاواز شو!
                        </div>
                    </div>
                </v-col>

                <v-col cols="12" class="d-flex justify-center v-game__lucky-wheel">
                    <div class="d-flex flex-column align-center" v-if="luckyWheel.length">
                        <generalGameFortuneWheel ref="generalGameFortuneWheel" @updateForm="updateList" @luckyBtnClicked="openLoginModal" :items="luckyWheel" :isLogin="isLogin" :limit="turnPerUser" :userUsed="voucherList?.length" />
                    </div>
                </v-col>

               <v-col cols="12"  class="" v-if="isLogin">
                   <div class="mx-auto voucherDesktop">
                       <generalGameVoucherCards :voucherList="voucherList" />
                   </div>
                </v-col>
<!-- footer -->
                <generalGameFooter />

            </v-row>


            <v-row v-else-if="screenType === 'mobile'" class="h-100">

                <v-col cols="12" v-show="!isLogin">
                    <div class="d-flex flex-column">
                        <div class="game-title-mobile t14 w700 mb-2 text-white">
                            گردونه شانس تابستانه شاواز
                        </div>

                        <div class="t11 w400 l26 text-white">
                            گردونه رو بچرخون و برنده کد تخفیف محصولات آرایشی و بهداشتی شاواز شو!
                        </div>
                    </div>
                </v-col>

                <v-col cols="12" md="7" class="d-flex justify-center v-game__lucky-wheel ">
                    <div class="d-flex flex-column align-center w-66" v-if="luckyWheel.length">
                        <generalGameFortuneWheel ref="generalGameFortuneWheel" @updateForm="updateList" @luckyBtnClicked="openLoginModal" :items="luckyWheel" :isLogin="isLogin" :limit="turnPerUser" :userUsed="voucherList?.length" />
                    </div>
                </v-col>


                <v-col v-if="isLogin === true" cols="12"  md="5" class="d-flex align-center justify-center">
                    <div class="d-flex flex-column w-100 ">
                        <generalGameVoucherCards :voucherList="voucherList" />
                    </div>
                </v-col>

            </v-row>

            <generalGameLoginModal ref="modalLoginRef" @logined="logined" :view="screenType === 'desktop' ? 'desktop' : 'mobile'"/>

        </v-container>

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
                    this.$refs.generalGameFortuneWheel.getUserPrize()
                }, 200)
            }
        },

        updateList(e) {
            if (e === true) {
                this.getUserVoucherList();
            }
        },

        openLoginModal() {
            if (this.screenType === 'desktop') {
                this.$refs.modalLoginRef.modalLogin = true;
            } else {
                this.$refs.modalLoginRef.modalSheet = true;
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

    .voucherDesktop {
        width: 600px;
        @include gbp(0, 768) {
            width: 320px;
        }
    }
</style>
