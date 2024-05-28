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
                            <h2 class="t34 w700 mb-2 text-white">
                                گردونه شانس تابستانه شاواز
                            </h2>

                            <div class="t14 w400 l26 text-white mb-8">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها .
                            </div>

                            <generalGameVoucherCards />
                        </div>
                    </template>
                    <template v-else>
                        <generalGameAuth class="pl-15" @logined="logined" />
                    </template>
                </v-col>
                <v-col md="7" class="d-flex align-center justify-center v-game__lucky-wheel">
                    <div class="d-flex justify-center flex-column align-center">
                        <generalGameFortuneWheel :items="wheelItems" :isLogin="isLogin" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </main>
</client-only>
</template>

<script>
import auth from '@/middleware/auth';

export default {
    data() {
        return {
            isLogin: false,
            userData: null,
            wheelItems: [{
                    title: 'wheel1',
                    image: 'wheel1.png'
                },
                {
                    title: 'wheel2',
                    image: 'wheel2.png'
                },
                {
                    title: 'wheel3',
                    image: 'wheel3.png'
                },
                {
                    title: 'wheel4',
                    image: 'wheel4.png'
                },
                {
                    title: 'wheel5',
                    image: 'wheel5.png'
                },
                {
                    title: 'wheel6',
                    image: 'wheel6.png'
                }
            ]
        }
    },

    setup() {
        const userToken = useCookie('userToken');

        return {
            userToken
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
                    this.$store.commit('set_userData', response.data.data)
                    this.userData = response.data.data
                }
            } catch (error) {
                this.isLogin = false;
                // Handle errors
            }
        },

        logined(e) {
            if (e === true) {
                this.fetchUserProfile();
            }
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/game.scss';
</style>
