<template>
<div class="cart-way-calendar d-flex align-center w-100 mt-3" :ref="`nafisRef-${index}`">

    <template v-for="(item, index) in items.slice(0,6)" :key="`day${index}`">
        <div class="flex-grow-1 cart-way-calendar__item" :id="`cart-way-calendar__item-${index}`">
            <div class="cart-way-calendar__item__day-name d-flex align-center justify-center flex-column">
                <span class="t14 w400 text-grey mb-2"   :class="item.totalCapacity == 0  ? 'text-grey-lighten-2' :''">
                    {{item.dayTitle}}
                </span>
                <span class="t11 w400 text-grey number-font"   :class="item.totalCapacity == 0  ? 'text-grey-lighten-2' :''">
                    {{fixDateLabel(item.date)}}
                </span>
            </div>

            <div class="d-flex align-center cart-way-calendar__item__time">
                <div
                    v-for="(workShift , workShiftIndex) in item.workShifts"
                    class="t12 w400 flex-grow-1 text-center py-2 cur-p"
                    :id="`workShift${workShift?.id}`"
                    :class="workShift.capacity> 0 ? 'text-grey' : 'text-grey-lighten-2'"
                    @click="selectTime(index,item,workShift)">
                  <div>
                    {{ workShift?.label }}
                  </div>
<!--                  <div class="number-font">-->
<!--                 {{ workShift?.startTo }} - {{ workShift?.startFrom }}-->
<!--                  </div>-->
                </div>

            </div>
        </div>
    </template>
</div>
<div v-if="showSelectedTime" class="mt-3">
    <p class="number-font t12 w400 text-grey-darken-1">زمان ارسال {{selectedItem.dayTitle}}  {{fixDateLabel(selectedItem.date)}}
      - {{ selectedTime?.label }}  ساعت {{ selectedTime?.startFrom }} الی {{ selectedTime?.startTo }}
    </p>
</div>
</template>

<script>
export default {
    data() {
        return {
            showSelectedTime: false,
            selectedItem:null,
            selectedTime:null,
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
         * index
         * Should use this when you have more than 1 in a page
         */
        index: {
            type: String,
            default: '0',
        },
    },

    methods: {
      fixDateLabel(date){
        try {
          const splitDate = date.split('-')
          const month = this.monthToString(date[1])
          return splitDate[2] + ' ' + month
        }
        catch (e) {

        }
      },
      monthToString(month){
        switch (month){
          case '1' : return  'فرودین'
          case '2' : return  'اردیبهشت'
          case '3' : return  'خرداد'
          case '4' : return  'تیر'
          case '5' : return  'مرداد'
          case '6' : return  'شهریور'
          case '7' : return  'مهر'
          case '8' : return  'آبان'
          case '9' : return  'آذر'
          case '10' : return  'دی'
          case '11' : return  'بهمن'
          case '12' : return  'اسنفد'
        }
      },
        selectTime(index, item, status) {
            // If time is full
            if (status.capacity == 0) {
                useNuxtApp().$toast.error('بازه زمانی مورد نظر شما قابل انتخاب نمی باشد.' , {
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
                    selectedClass.classList.remove('active-time');
                })

                // set active classes to day and time
                document.getElementById(`cart-way-calendar__item-${index}`).classList.add('active-day');
                const element = document.getElementById(`workShift${status?.id}`);
                if (element) {
                    element.classList.add('active-time');
                }

                this.showSelectedTime = true;
                this.selectedTime = status;
                this.selectedItem = item;
                const emitDate = [
                    'nafis', status?.id
                ]

                //Emit item and status(morning or evening) to parent
                this.$emit('selectedDate', emitDate);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$parent:'cart-way-calendar';

.#{$parent} {
    border-radius: 4px;
    border: 1px solid var(--grey-grey-lighten-3, #EEE);

    &__item {
        &:not(:last-child) {
            border-left: 1px solid var(--grey-grey-lighten-3, #EEE);
        }

        &__day-name {
            padding: 8px 0;
            border-bottom: 1px solid var(--grey-grey-lighten-3, #EEE);
        }

        &__time {
            >div:first-child {
                border-left: 1px solid var(--grey-grey-lighten-3, #EEE);
            }
        }

        &.active-day {
            .#{$parent}__item__day-name {
                span {
                    color: #D72685 !important
                }
            }
        }

        .active-time {
            color: #D72685 !important
        }
    }
}
</style>
