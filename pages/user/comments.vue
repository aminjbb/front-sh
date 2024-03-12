<template>
<main class="v-user v-user--commenting">
    <h1 class="ov-h h-0">نظرات</h1>

    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">نظرات</span>
    </header>

    <v-container class="pt-0">
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4">
                <v-card class="pa-8 mobile-pa-0 has-header mobile-no-border">
                    <header class="card__header">نظرات</header>

                    <div class="pa-5 mobile-pa-0" id="user-commenting__tab">
                        <nav class="user-commenting__tab ov-h mb-5">
                            <ul class="d-flex align-center justify-space-between">
                                <li class="flex-grow-1 d-flex justify-center align-center text-grey-darken-1 t13 w500 active" id="user-commenting__tab--1" @click="changeTab(1)">
                                    <img :src="tabImage === 1 ? imageAddress('commenting1-active.png') : imageAddress('commenting1.png')" class="ml-2" alt="shavaz" width="30" height="30" title="shavaz" />

                                    در انتظار ثبت
                                </li>

                                <li class="flex-grow-1 d-flex justify-center align-center text-grey-darken-1 t13 w500" id="user-commenting__tab--2" @click="changeTab(2)">
                                    <img :src="tabImage === 2 ? imageAddress('commenting2-active.png') : imageAddress('commenting2.png')" class="ml-2" alt="shavaz" width="30" height="30" title="shavaz" />

                                    ثبت شده
                                </li>
                            </ul>
                        </nav>

                        <div class="user-commenting__contents">
                            <div class="user-commenting__content active" id="user-commenting__content--1">
                                <template v-if="approvedRejectedComment && approvedRejectedComment.length">
                                  <template v-for="(product, index) in approvedRejectedComment" :key="`product${index}`">
                                    <v-col cols="12" md="6" :class="screenType === 'desktop' ? 'px-10' : ''">
                                      <generalUserAwaitingProductComments :content="product" />
                                      <v-divider color="grey" class="my-2" />
                                    </v-col>
                                  </template>
                                </template>

                                <template v-else>
                                    <div class="d-flex align-center justify-center flex-column py-15 px-2">
                                        <img src="~/assets/images/no-comment.jpg" class="ml-2 mt-10" alt="shavaz" width="168" height="86" title="shavaz" />

                                        <span class="t14 w500 text-grey-darken-1 mt-8 mb-10">نظر در انتظار ثبتی وجود ندارد!</span>
                                    </div>
                                </template>
                            </div>

                            <div class="user-commenting__content" id="user-commenting__content--2">
                                <v-row>
                                  <template v-for="(product, index) in waitingComment" :key="`product-${index}`">
                                    <v-col cols="12" md="6" :class="screenType === 'desktop' ? 'px-10' : ''">
                                    <generalUserCommentedProducts :content="product" @refreshProducts="refreshProducts" />
                                    </v-col>
                                    <v-divider color="grey" class="my-2" />
                                  </template>
                                </v-row>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
import axios from "axios";
export default {

    data() {
        return {
            loading: false,
            user: null,
            screenType: null,
            tabImage: 1,
            commentedProducts: null,
            userComments: [],
        }
    },

    setup() {
        const userToken = useCookie('userToken');
        const runtimeConfig = useRuntimeConfig()
        const title = ref('فروشگاه اینترنتی شاواز | کامنت های من')
        const description = ref("کامنت های ثبت شده ، کامنت های در انتظار تایید، ارسال کامنت برای کالای های خریداری شده.")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })

        return {
            userToken,
            runtimeConfig
        };
    },

    methods: {
        /**
         * Active tabs by click
         */
        changeTab(id) {
            //**out of your component should set ref**
            const tab = document.getElementById('user-commenting__tab');

            const liItems = tab.querySelectorAll('li');
            const tabContents = tab.querySelectorAll('div.user-commenting__content');

            liItems.forEach(item => {
                item.classList.remove('active');
                tab.querySelector(`#user-commenting__tab--${id}`).classList.add('active');
                this.tabImage = id;
            });

            tabContents.forEach(item => {
                item.classList.remove('active');
                tab.querySelector(`#user-commenting__content--${id}`).classList.add('active');
            });
        },

        refreshProducts() {
            //TODO: get commented products again
        },

        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/' + path]
        },

        getUserComment() {
            axios
                .get(this.runtimeConfig.public.apiBase + `/user/comment/index?per_page=100000`, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    this.userComments = response.data.data.data
                })
                .catch((err) => {

                });
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
        this.getUserComment()
    },
    computed: {
        waitingComment() {
            try {
                const waitingComment = this.userComments.filter(comment => comment.status === 'waiting')
                return waitingComment
            } catch (e) {

            }
        },
        approvedRejectedComment() {
            try {
                const approvedRejectedComment = this.userComments.filter(comment => comment.status === 'approved' || comment.status === 'rejected')
                return approvedRejectedComment
            } catch (e) {

            }
        }
    }

}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';

.user-commenting {
    &__tab {
        border: 1px solid #e0e0e0;
        border-radius: 10px;

        >ul>li:first-child {
            border-left: 1px solid #e0e0e0;
        }

        li {
            padding: 15px;

            &.active {
                background: #FBE9F3;
                color: #7c0d4a !important
            }
        }
    }

    &__content {
        display: none;

        &.active {
            display: block;
        }
    }
}
</style>
