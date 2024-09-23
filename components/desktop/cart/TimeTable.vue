<template>
<div class="cart-way-calendar d-flex align-center w-100 mt-3" :ref="`nafisRef-${index}`">
    <template v-for="(item, index) in calendar.slice(0,6)" :key="`day${index}`">
        <div class="flex-grow-1 cart-way-calendar__item" :id="`cart-way-calendar__item-${index}`">
            <div class="cart-way-calendar__item__day-name d-flex align-center justify-center flex-column">
                <span class="t14 w400 text-grey mb-2" :class="!item.have_space_morning  && !item.have_space_evening ? 'text-grey-lighten-2' :''">
                    {{item.day}}
                </span>

                <span class="t11 w400 text-grey" :class="!item.have_space_morning  && !item.have_space_evening ? 'text-grey-lighten-2' : ''">
                    {{item.date}}
                </span>
            </div>

            <div class="d-flex align-center cart-way-calendar__item__time">
                <div
                    class="t12 w400 flex-grow-1 text-center py-2 cur-p"
                    :id="`morning${index}`"
                    :class="item.have_space_morning ? 'text-grey' : 'text-grey-lighten-2'"
                    @click="selectTime(index,item,'morning')">
                    صبح
                </div>

                <div
                    class="t12 w400 flex-grow-1 text-center py-2 cur-p"
                    :id="`evening${index}`"
                    :class="item.have_space_evening ? 'text-grey' : 'text-grey-lighten-2'"
                    @click="selectTime(index,item,'evening')">
                    عصر
                </div>
            </div>
        </div>
    </template>
</div>
<div v-if="showSelectedTime" class="mt-3">
    <p class="number-font t12 w400 text-grey-darken-1">زمان ارسال {{selectedItem.day}} {{selectedItem.date}} ماه - 
        <template v-if="selectedTime === 'evening'"> عصر ساعت 15 الی 21</template>
        <template v-else> صبح ساعت 9 الی 15</template>
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
         * index
         * Should use this when you have more than 1 in a page
         */
        index: {
            type: String,
            default: '0',
        },
    },

    methods: {
        selectTime(index, item, status) {
            // If time is full
            if (!item.have_space_evening, !item.have_space_morning) {
              this.$store.commit('set_snackBar', {
                show:true , text:'روز مورد نظر شما قابل انتخاب نمی باشد.' , status:'error'
              })
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
                const element = document.getElementById(`${status}${index}`);
                if (element) {
                    element.classList.add('active-time');
                }

                this.showSelectedTime = true;
                this.selectedTime = status;
                this.selectedItem = item;
                const emitDate = [
                    [item], status
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
