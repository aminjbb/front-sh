<template>
<client-only>
    <main class="v-game">
        <h1 class="ov-h h-0">گردونه</h1>
        <generalGameHeader />
        <v-container class="parent-width">
            <v-row class="h-100">
                <v-col md="5" class="d-flex align-center justify-center">
                    <template v-if="isLogin">
                        <div class="d-flex flex-column">
                            <h2 class="game-title-mobile t34 w700 mb-2 text-white">
                                گردونه شانس شاواز
                            </h2>

                            <div class="t14 w400 l26 text-white mb-8">
                                گردونه رو بچرخون و برنده کد تخفیف محصولات آرایشی و بهداشتی شاواز شو!
                            </div>

                            <generalGameVoucherCards :voucherList="voucherList"/>
                        </div>
                    </template>
                    <template v-else>
                        <generalGameAuth class="pl-15" @logined="logined" />
                    </template>
                </v-col>
                <v-col md="7" class="d-flex justify-center v-game__lucky-wheel game-mobile-order">
                    <div class="d-flex flex-column align-center">
                        <generalGameFortuneWheel :items="wheelItemsMoc" :isLogin="isLogin" :limit="turn_per_user"/>
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
            turn_per_user:3,
            wheelItemsMoc: [{
                    label: 'wheel1',
                    desktop_image_url: 'wheel1.png'
                },
                {
                    label: 'wheel2',
                    desktop_image_url: 'wheel2.png'
                },
                {
                    label: 'wheel3',
                    desktop_image_url: 'wheel3.png'
                },
                {
                    label: 'wheel4',
                    desktop_image_url: 'wheel4.png'
                },
                {
                    label: 'wheel5',
                    desktop_image_url: 'wheel5.png'
                },
                {
                    label: 'wheel6',
                    desktop_image_url: 'wheel6.png'
                }
            ],
            voucherList:[{
                label:'کد تخفیف ۵۰ درصدی  کرم',
                code:'MPN25-NLOW1',
                deadline_for_use:'24:30:12',
                desktop_image_url: "http://localhost:8000/storage/shavaz/brand/image/2023-08-26/cosmetics-logo.png",
                mobile_image_url: "http://localhost:8000/storage/shavaz/brand/image/2023-08-26/mac-logo.png"
            },
            {
                label:'کد تخفیف ۵۰ درصدی  کرم',
                code:'MPN25-NLOW1',
                deadline_for_use:'24:30:12',
                desktop_image_url: "http://localhost:8000/storage/shavaz/brand/image/2023-08-26/cosmetics-logo.png",
                mobile_image_url: "http://localhost:8000/storage/shavaz/brand/image/2023-08-26/mac-logo.png"
            },
            {
                label:'کد تخفیف ۵۰ درصدی  کرم',
                code:'MPN25-NLOW1',
                deadline_for_use:'24:30:12',
                desktop_image_url: "http://localhost:8000/storage/shavaz/brand/image/2023-08-26/cosmetics-logo.png",
                mobile_image_url: "http://localhost:8000/storage/shavaz/brand/image/2023-08-26/mac-logo.png"
            }
            ],
        }
    },

    setup() {
        const userToken = useCookie('userToken');
        const {
            getUserVoucherList,
            voucherList,
            getLuckyWheel,
            luckyWheel
            } = new Game()

        return {
            userToken,
            getUserVoucherList,
            voucherList,
            getLuckyWheel,
            luckyWheel
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
                    //this.getUserVoucherList();

                }
            } catch (error) {
                this.isLogin = false;
            }
        },

        logined(e) {
            if (e === true) {
                this.isLogin = true;
                //this.getUserVoucherList();
            }
        }
    },

    mounted(){
        this.getLuckyWheel();
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/game.scss';
</style>
