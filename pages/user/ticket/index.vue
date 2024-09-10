<template>
<main class="v-ticket">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="text-sGrayDarken2 t14 w700">لیست تیکت‌ها</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>

            <div class="col-9 pa-4 mobile-pa-0">
                <v-card class="pa-8 mobile-pa-0 v-ticket__card">
                    <template v-if="ticketList && ticketList.data && ticketList.data.length">
                        <header class="d-flex align-center justify-space-between xs-hide card__header pt-6">
                            <span class="w700 t18 text-sGrayDarken2">لیست تیکت ها</span>
                            <v-btn href="/user/ticket/new" height="44" title=" ثبت تیکت" color="primary" prepend-icon="mdi-message-processing-outline" class="btn btn--submit">
                                ثبت تیکت
                            </v-btn>
                        </header>

                        <div class="px-3" :class="screenType === 'desktop' ? 'pb-5' : ''">
                            <GeneralTicketTab :class="screenType === 'desktop' ? 'pr-5' : ''" :scroll="screenType === 'desktop' ? true : false" :height="screenType === 'desktop' ? '500px' : 'auto'" :tabHeader="statusList" :items="categorizedTickets" showAll AllTitle="همه تیکت ها" componentName="generalTicketCard" emptyText=" با کلیک بر روی دکمه زیر می‌توانید یک تیکت جدید ارسال کنید." emptyTitle="تیکتی" emptyButtonLink="/user/ticket/new" emptyButtonText="ثبت تیکت"/>
                        </div>
                        <div class="w-100 d-flex justify-center px-4">
                            <v-btn v-if="screenType === 'mobile'" href="/user/ticket/new" height="44" block title=" ثبت تیکت" color="primary" prepend-icon="mdi-message-processing-outline" class="btn btn--submit br12 mb-5 mx-5 px-7">
                                ثبت تیکت
                            </v-btn>

                        </div>
                    </template>

                    <template v-else>
                        <div class="flex-grow-1 d-flex flex-column mb-8">
                            <div class="d-flex flex-column justify-center align-center pt-10">
                                <img src="~/assets/images/empty-ticket.png" class="ml-10" alt="ticket image" width="171" height="162">

                                <span class="t18 w700 text-sGrayDarken2 mt-2">هنوز تیکتی ثبت نکرده‌اید</span>

                                <p class="t12 w500 text-sGrayDarken1 mt-3 mb-6">
                                    تیکتی ثبت نشده است. با کلیک بر روی دکمه زیر می‌توانید یک تیکت جدید ارسال کنید.
                                </p>
                                <v-btn href="/user/ticket/new" height="44" title=" ثبت تیکت" color="primary" prepend-icon="mdi-message-processing-outline" class="btn btn--submit br12 px-7">
                                    ثبت تیکت
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
            screenType: 'desktop',
            statusList: [{
                    name: 'open',
                    label: 'باز',
                    icon: 'mdi-message-outline'
                },
                {
                    name: 'answered',
                    label: 'پاسخ داده شده',
                    icon: 'mdi-message-arrow-left-outline'
                },
                {
                    name: 'resolved',
                    label: 'بسته شده',
                    icon: 'mdi-message-off-outline'
                },
                {
                    name: 'postponed',
                    label: 'متوقف شده',
                    icon: 'mdi-message-text-lock-outline'
                },
                {
                    name: 'seen',
                    label: 'دیده شده',
                    icon: 'mdi-message-check-outline'
                },
                {
                    name: 'pending',
                    label: 'در انتظار پاسخ',
                    icon: 'mdi-message-arrow-right-outline'
                }
            ]
        }
    },

    computed: {
        formatTransaction() {
            const transactionArray = this.ticketList ?.data;

            const finalArray = transactionArray.reverse();
            return finalArray;
        },

        categorizedTickets() {
            if (this.ticketList ?.data && this.ticketList ?.data.length) {
                return this.ticketList.data.reduce((acc, ticket) => {
                    if (!acc[ticket.status]) {
                        acc[ticket.status] = [];
                    }
                    acc[ticket.status].push(ticket);
                    return acc;
                }, {});
            } else {
                return null;
            }
        },
    },

    setup() {
        const userToken = useCookie('userToken');

        const title = ref('فروشگاه اینترنتی شاواز | لیست تیکت های من')
        const description = ref("تماس با پشتیبانی- ارسال تیکت به پشتیبانی- ارسال درخواست جدید به پشتیبانی.");

        const {
            getUserTicketList,
            ticketList
        } = new User();

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        });

        return {
            userToken,
            getUserTicketList,
            ticketList
        };
    },

    beforeMount() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';

    },

    mounted() {
        this.getUserTicketList();
    },

}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/ticket.scss';
</style>
