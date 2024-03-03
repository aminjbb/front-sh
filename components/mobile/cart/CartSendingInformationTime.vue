<template lang="">
<v-card class="pa-5 mobile-pa-0 mobile-no-border ov-v">
    <header class="d-flex align-center mb-5 xs-hide">
        <v-icon
            icon="mdi-truck-outline"
            color="primary"
            size="small"
            class="ml-2" />
        <span class="t16 w400 text-grey-darken-3">نحوه ارسال</span>
    </header>

    <div>
        <template v-for="(way , index) in waysMoc" :key="`way${index}`">
            <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                    <v-checkbox
                        class="way-checkbox"
                        v-model="waysModal"
                        @change="selectedWay()"
                        hide-details
                        :value="way.type" />

                    <h3 class="t16 w400 text-grey-darken-1">{{way.title}}</h3>
                </div>
                <div class="t14 w400 text-grey-darken-1 number-font">
                    {{ splitChar(Number(String(way.price).slice(0, -1))) }} <span class="t12">تومان</span>
                </div>
            </div>

            <p class="t12 w400 text-grey">{{way.desc}}</p>

            <template v-if="waysModal === 'nafis' && index === 0">
                <mobileCartTimeTableModal
                    :calendar="calendarMoc"
                    :index="index"
                    @selectedDate="selectedDate" />

                <div v-if="showSelectedTime" class="mt-3">
                    <p class="number-font t12 w400 text-grey-darken-1">زمان ارسال {{showSelectedTime[0].day}} {{showSelectedTime[0].date}} ماه -
                        <template v-if="showSelectedTime[1] === 'evening'"> عصر ساعت 15 الی 21</template>
                        <template v-else> صبح ساعت 9 الی 15</template>
                    </p>
                </div>
            </template>

            <v-divider
                v-if="index+1 < waysMoc.length"
                color="grey-lighten-1"
                class="my-3" />
        </template>
    </div>
</v-card>
</template>

<script>
import User from '@/composables/User.js'
import Public from '@/composables/Public.js'

export default {
    data() {
        return {
            waysModal: null,
            showSelectedTime: null,
            ways: [],
            waysMoc: [
                /* {
                    title: 'نفیس اکسپرس',
                    type: 'nafis',
                    desc: 'انتخاب زمان ارسال. بازه زمانی صبح ساعت ۹ الی ۱۵ و بازه زمانی عصر ۱۵ الی  ۲۱ می‌باشد. ',
                    price: 35000
                },
                {
                    title: 'پست پیشتاز',
                    type: 'fast-post',
                    desc: 'زمان تقریبی تحویل سفارش ۲ الی ۳ روز کاری می‌باشد. (تحویل در بازه ساعات کاری)',
                    price: 51000
                }, */
                {
                    title: 'پست',
                    type: 'post',
                    desc: 'زمان تقریبی تحویل سفارش ۷ الی 10 روز کاری می‌باشد. (تحویل در بازه ساعات کاری)',
                    price: 350000
                },
                {
                    title: 'تیپاکس',
                    type: 'tipax',
                    desc: 'زمان تقریبی تحویل سفارش ۵ الی 8 روز کاری می‌باشد.',
                    price: 350000
                }
            ],
            calendar: [],
            calendarMoc: [{
                    day: 'پنج‌شنبه',
                    date: '۷ دی',
                    have_space_morning: true,
                    have_space_evening: true,
                },
                {
                    day: 'شنبه',
                    date: '۹ دی',
                    have_space_morning: true,
                    have_space_evening: false,
                },
                {
                    day: 'یک‌شنبه',
                    date: '10 دی',
                    have_space_morning: false,
                    have_space_evening: false,
                },
                {
                    day: 'دو‌شنبه',
                    date: '۱۱ دی',
                    have_space_morning: true,
                    have_space_evening: true,
                },
                {
                    day: 'سه‌شنبه',
                    date: '12 دی',
                    have_space_morning: true,
                    have_space_evening: true,
                },
                {
                    day: 'چهار‌شنبه',
                    date: '13 دی',
                    have_space_morning: true,
                    have_space_evening: true,
                },
                {
                    day: 'پنج‌شنبه',
                    date: '14 دی',
                    have_space_morning: true,
                    have_space_evening: true,
                }
            ]
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | آدرس های من')
        const description = ref("آدرس های من")
        const userToken = useCookie('userToken');
        const {
            getUserAddress,
            userAddress
        } = new User()
        const {
            getProvince,
            provinces
        } = new Public()
        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
        return {
            getUserAddress,
            userAddress,
            getProvince,
            provinces,
            userToken
        }
    },

    methods: {
        /**
         * Selected time from TimeTable component
         * @param {*} arr 
         */
        selectedDate(arr) {
            this.$emit('selectedDate', arr);
            this.showSelectedTime = arr;
        },

        /**
         * Selected way for send package to customer
         */
        selectedWay() {
            this.$emit('selectedWay', this.waysModal);

        }
    },

    beforeMount() {
        this.getUserAddress()
        this.getProvince()
    }
}
</script>

<style lang="scss">
.way-checkbox {
    width: 50px;
    flex: 0 0 50px;
}

.way-card {
    border-bottom: 0 !important;
}
</style>
