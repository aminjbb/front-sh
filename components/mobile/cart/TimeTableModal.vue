<template>
<div class="c-modal w-100">
    <div class="w-100 d-flex justify-start align-center mt-3" @click="openModal()">
        <span class="text-primary t12 w400">انتخاب زمان ارسال</span>
        <v-icon
            icon="mdi-chevron-left"
            color="primary"
            class="mr-1" />
    </div>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        fullscreen>
        <v-card class="pt-2 pb-5 c-modal--comment">
            <header class="c-modal--comment__header d-flex justify-space-between align-center pb-1 px-6 ">
                <div class="d-flex flex-column c-modal--comment__header__title">
                    <span class="t16 w400 mb-1">
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
                        <div class="d-flex align-center" style="width: 768px;">
                            <template v-for="(item, index) in calendar.slice(0,6)" :key="`day${index}`">
                                <div class="flex-grow-1 cart-way-calendar__item" :id="`cart-way-calendar__item-${index}${key}`">
                                    <div class="cart-way-calendar__item__day-name d-flex align-center justify-center flex-column" @click="selectDay(index,item)">
                                        <span class="t14 w400 text-grey mb-2" :class="!item.have_space_morning  && !item.have_space_evening ? 'text-grey-lighten-2' :''">
                                            {{item.day}}
                                        </span>

                                        <span class="t11 w400 text-grey" :class="!item.have_space_morning  && !item.have_space_evening ? 'text-grey-lighten-2' : ''">
                                            {{item.date}}
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>

                    <div v-if="selectedItem">
                        <v-checkbox
                            v-if="selectedItem.have_space_morning"
                            label="صبح"
                            hide-details
                            @change="selectTime('morning')" />

                        <v-checkbox
                            v-if="selectedItem.have_space_morning"
                            label="عصر"
                            hide-details
                            @change="selectTime('evening')" />
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
        }
    },

    props: {
        /**
         * Calendar array
         */
        calendar: Array,

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
        selectDay(index, item) {
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
                })

                // set active classes to day and time
                document.getElementById(`cart-way-calendar__item-${index}${this.key}`).classList.add('active-day');

                this.showSelectedTime = true;
                this.selectedItem = item;
            }
        },

        selectTime(status) {
            const emitDate = [
                this.selectedItem, status
            ]

            //Emit item and status(morning or evening) to parent
            this.$emit('selectedDate', emitDate);
            this.closeModal();
        },

        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        },
    },
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
