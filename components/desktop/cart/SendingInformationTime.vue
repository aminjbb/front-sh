<template>
  <v-card class="pa-5 mobile-pa-0 mobile-no-border ov-v">
    <header class="d-flex align-center mb-5 xs-hide">
      <v-icon
          icon="mdi-truck-outline"
          color="primary"
          size="small"
          class="ml-2"/>
      <span class="t16 w400 text-grey-darken-3">نحوه ارسال</span>
    </header>

    <div>
      <template v-for="(way , index) in sendingMethods" :key="`way${index}`">
        <div v-if="way.availability">
          <div class="d-flex align-center"  >
            <v-checkbox
                class="way-checkbox"
                v-model="waysModal"

                @change="selectedWay(way)"
                hide-details
                :value="way.name"/>

            <h3 class="t16 w400 text-grey-darken-1">{{ way?.title }}</h3>
          </div>

          <div class="d-flex align-center justify-space-between">
            <p class="t12 w400 text-grey number-font">{{ way?.description }}</p>

            <div class="t14 w400 text-grey-darken-1 number-font">
              {{ splitChar(Number(String(way?.sending_price).slice(0, -1))) }} <span class="t12">تومان</span></div>
          </div>


          <v-divider
              v-if="index+1 < sendingMethods.length"
              color="grey-lighten-1"
              class="my-3"/>
        </div>
      </template>
      <template v-if="waysModal === 'nafis'">
        <desktopCartTimeTable :items="timeSlot" :calendar="calendarMoc" :index="index" @selectedDate="selectedDate"/>
      </template>
    </div>
  </v-card>
</template>

<script>
import User from '@/composables/User.js'
import Public from '@/composables/Public.js'

export default {
  props: {
    sendingMethods: Array
  },
  data() {
    return {
      waysModal: null,
      ways: [],
      calendar: [],
      timeSlot:[],
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
     * @param {*} workShift
     */
    selectedDate(workShift) {
      this.$emit('selectedDate', workShift);
    },

    /**
     * Selected way for send package to customer
     */
    selectedWay(way) {

      this.timeSlot = way?.time_slots

      this.$emit('selectedWay', this.waysModal);

    },
  },

  computed:{
    orderAddressId(){
      return this.$store.getters['get_orderAddress']
    }
  },
  watch:{
    orderAddressId(val){
      this.timeSlot = []
      this.waysModal = null
    },
  },
  beforeMount() {
    // todo: add get time table after backend fixed
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
