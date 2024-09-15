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
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-checkbox
                class="way-checkbox"
                :disabled="!way?.availability"
                v-model="waysModal"
                @change="selectedWay(way)"
                hide-details
                :value="way.name"/>

            <h3 class="t16 w400 text-grey-darken-1">{{ way.title }}</h3>
          </div>
          <div class="t14 w400 text-grey-darken-1 number-font">
            {{ splitChar(Number(String(way.sending_price).slice(0, -1))) }} <span class="t12">تومان</span>
          </div>
        </div>

        <p class="t12 w400 text-grey">{{ way.desc }}</p>


        <v-divider
            v-if="index+1 < sendingMethods.length"
            color="grey-lighten-1"
            class="my-3"/>
      </template>
      <template v-if="waysModal === 'nafis'">
        <mobileCartTimeTableModal
            :items="timeSlot"
            :index="index"
            @selectedDate="selectedDate"/>

        <div v-if="showSelectedTime" class="mt-3">
          <p class="number-font t12 w400 text-grey-darken-1">زمان ارسال {{ showSelectedTime[2]?.dayTitle }}
            <span > {{ showSelectedTime[1]?.label }} ساعت {{ showSelectedTime[1]?.startFrom }} الی {{ showSelectedTime[1]?.startTo }}</span>
          </p>
        </div>
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
      showSelectedTime: null,
      ways: [],
      calendar: [],
      timeSlot: [],

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
    selectedWay(way) {
      this.timeSlot = way.time_slots
      this.$emit('selectedWay', this.waysModal);
      this.showSelectedTime = null

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
