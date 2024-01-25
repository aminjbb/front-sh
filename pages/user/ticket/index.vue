<template lang="">
<main class="v-ticket">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">لیست سفارشات</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>

            <div class="col-9 pa-4 mobile-pa-0">
                <v-card v-if="ticketList && ticketList.length" class="py-3 px-10 d-flex justify-space-around align-center">
                    <img src="~/assets/images/ticket.png" class="ml-10" alt="ticket image" width="65" height="65">

                    <div class="flex-grow-1">
                        <h1 class="t15 w400 text-grey-darken-3 mb-2">آیا نیاز به پشتیبانی دارید؟</h1>
                        <p class="t12 w400 text-grey-darken-1">لطفا پیش از ثبت تیکت، ابتدا بخش <span class="text-blue">سوالات متداول</span> را مطالعه نمایید. </p>
                    </div>

                    <v-btn
                        href="/"
                        height="44"
                        title="ثبت تیکت جدید"
                        prepend-icon="mdi-plus"
                        class="btn--cancel px-5">
                        ثبت تیکت جدید
                    </v-btn>
                </v-card>

                <v-card class="pa-8 mobile-pa-0 mobile-no-border has-header">
                    <header class="d-flex align-center justify-space-between mb-5 xs-hide card__header">
                        <span>تیکت</span>
                    </header>

                    <template v-if="ticketList && ticketList.length">
                    </template>
                    <template v-else>
                        <div class="order-tab flex-grow-1 d-flex flex-column mb-8">
                            <div class="d-flex flex-column justify-center align-center pt-15">
                                <svgEmptyTicket />
                                <span class="t14 w400 text-grey-darken-1 mt-2">تا حالا تیکتی ثبت نکردی!</span>
                                <v-btn
                                    href="/"
                                    height="44"
                                    title="ثبت تیکت جدید"
                                    prepend-icon="mdi-plus"
                                    class="mt-5 btn--cancel">
                                    ثبت تیکت جدید
                                </v-btn>
                            </div>
                        </div>
                    </template>
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
export default {
    data() {
        return {
            tab: null,
            ticketList: [],
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | لیست تیکت های من')
        const description = ref("تماس با پشتیبانی- ارسال تیکت به پشتیبانی- ارسال درخواست جدید به پشتیبانی.");

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/ticket.scss';
</style>
