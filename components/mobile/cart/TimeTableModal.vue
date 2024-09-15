<template>
  <div class="c-modal w-100">
    <div class="w-100 d-flex justify-start align-center mt-3" @click="openModal()">
      <span class="text-primary t12 w400 mr-3">انتخاب زمان ارسال</span>
      <v-icon
          icon="mdi-chevron-left"
          color="primary"
          class="mr-1"/>
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        fullscreen>
      <v-card class="pt-2 pb-5 c-modal--comment">
        <header class="c-modal--comment__header d-flex justify-space-between align-center pb-1 px-6 ">
          <div class="d-flex flex-column c-modal--comment__header__title ">
                    <span class="t16 w400 mb-1 ">
                        انتخاب زمان ارسال
                    </span>
          </div>

          <v-btn
              class="c-modal--comment__header__btn pa-0 text-none"
              @click="closeModal()"
              width="50"
              color="grey-darken-3"
              size="large"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>

        <div class="px-6">
          <div class="cart-way-calendar  w-100 mt-3" :ref="`nafisRef-${key}`">
            <div class="scroll--x">
              <div class="d-flex align-center" style="width: 435px;">
                <template v-for="(item, index) in items.slice(0,6)" :key="`day${index}`">
                  <div class="flex-grow-1 cart-way-calendar__item" :id="`cart-way-calendar__item-${index}${key}`">
                    <div  class="cart-way-calendar__item__day-name d-flex align-center justify-center flex-column"
                         @click="selectDay(index,item)">
                                        <span class="t14 w400 text-grey mb-2"
                                              :class="item.totalCapacity == 0   ? 'text-grey-lighten-2' :''">
                                            {{ item.dayTitle }}
                                        </span>

                      <span class="t11 w400 text-grey number-font"
                            :class="item.totalCapacity == 0 ? 'text-grey-lighten-2' : ''">
                                            {{ fixDateLabel(item.date) }}
                                        </span>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <div v-if="showSelectedTime">
              <template v-for="(workShit , index) in workShitSelected">
                <v-checkbox
                    :label="`${workShit?.label} ${workShit?.startFrom} الی ${workShit?.startTo}`"
                    hide-details
                    :disabled="workShit?.capacity == 0"
                    @change="selectTime(workShit)"/>

              </template>


            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userDetail: null,
      dialog: false,
      selectedItem: null,
      showSelectedTime: false,
      workShitSelected: []
    }
  },

  props: {
    /**
     * Calendar array
     */
    calendar: Array,
    /**
     * Calendar array
     */
    items: Array,

    /**
     * key
     * Should use this when you have more than 1 in a page
     */
    key: {
      type: String,
      default: '0',
    },
  },

  methods: {
    fixDateLabel(date){
      try {
        const splitDate = date.split('-')
        const month = this.monthToString(splitDate[1])
        return splitDate[2] + ' ' + month
      }
      catch (e) {

      }
    },
    monthToString(month){
      switch (month){
        case '01' : return  'فرودین'
        case '02' : return  'اردیبهشت'
        case '03' : return  'خرداد'
        case '04' : return  'تیر'
        case '05' : return  'مرداد'
        case '06' : return  'شهریور'
        case '07' : return  'مهر'
        case '08' : return  'آبان'
        case '09' : return  'آذر'
        case '10' : return  'دی'
        case '11' : return  'بهمن'
        case '12' : return  'اسنفد'
      }
    },
    selectDay(index, item) {
      // If time is full
      if (item.totalCapacity == 0) {
        useNuxtApp().$toast.error('روز مورد نظر شما قابل انتخاب نمی باشد.', {
          rtl: true,
          position: 'top-center',
          theme: 'dark'
        });
      } else {

        // Remove active classes from all div
        const classes = document.getElementsByTagName('div');
        Object.keys(classes).forEach(key => {
          const selectedClass = classes[key];

          selectedClass.classList.remove('active-day');
        })

        // set active classes to day and time
        document.getElementById(`cart-way-calendar__item-${index}${this.key}`).classList.add('active-day');

        this.showSelectedTime = true;

        this.selectedItem = item;
        this.workShitSelected = item.workShifts
      }
    },

    selectTime(status) {
      const emitDate = [
        'nafis', status , this.selectedItem
      ]

      //Emit item and status(morning or evening) to parent
      this.$emit('selectedDate', emitDate);
      this.closeModal();
    },

    openModal() {
      this.dialog = true;
      this.showSelectedTime = true
      this.workShitSelected = this.items[0]?.workShifts
      this.selectedItem = this.items[0]
      setTimeout(()=>{
        document.getElementById(`cart-way-calendar__item-${0}${this.key}`).classList.add('active-day');

      } , 200)
    },

    closeModal() {
      this.dialog = false;
      this.workShitSelected =[]
    },
  },

  watch:{
  }
}
</script>

<style lang="scss" scoped>
.cart-way-calendar {
  &__item {
    border-bottom: 1px solid var(--grey-grey-lighten-3, #EEE);
    padding-bottom: 10px;

    &.active-day {
      .cart-way-calendar__item__day-name {
        span {
          color: #D72685 !important
        }
      }
    }
  }
}

.c-modal--comment__header {
  background: var(--Shade-white, #FFF);
  box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.20);
}
</style>
