<template>
  <div class="c-modal">
    <template v-if="buttonType == 'icon'">
      <v-icon
          @click="openModal()"
          icon="mdi-delete-outline"
          size="small"
          color="red" />
    </template>

    <template v-if="buttonType == 'mobile'">
      <div @click="openModal()" class="text-grey t14 d-flex align-center py-1">
        <v-icon
            icon="mdi-delete-outline"
            class="ml-2"
            size="small"
            color="grey" />
        <span class="text-grey t14">{{ title }}</span>
      </div>
    </template>

    <v-dialog
        v-if="dialog"
        v-model="dialog"
        color="white"
        width="500px">
      <v-card class="pt-3 px-6 pb-5">
        <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                <span class="t15 w400">
                    {{title}}
                </span>

          <v-btn
              class="c-modal__header__btn pa-0 text-none"
              @click="closeModal()"
              color="grey-darken-1"
              size="large"
              variant="icon">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>

        <div>
          <p class="t14 w400 my-8 text-center text-grey-darken-2">{{text}}</p>
          <div class="t14 w400 my-8 text-center text-grey-darken-2" v-for="(sku , index) in object">
            <p>
                {{sku?.sku.label}}
            </p>
            <div class="d-flex justify-center">
              <span class="dir-ltr mx-5 number-font">تعداد قدیم : {{sku.old}}</span>
              <span class="dir-ltr mx-5 number-font">تعداد جدید : {{sku.new}}</span>
            </div>
          </div>

          <div class="d-flex align-center justify-center mt-2 mobile-pa-0 w-100">
            <v-btn
                @click="closeModal()"
                height="44"
                title="انصراف"
                class="btn btn--cancel ml-1">
              انصراف
            </v-btn>

            <v-btn
                :loading="loading"
                @click="createOrderAgain()"
                height="44"
                :title="submitText"
                class="btn btn--submit">
              {{submitText}}
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Basket from '@/composables/Basket.js'
export default {
  setup(){
    const {
      createOrder,
    } = new Basket()
    return {
      createOrder,
    }
  },
  data() {
    return {
      loading:false,
    }
  },

  props: {
    /** orderAddressId for order*/
    orderSendingMethod: String,

    /**orderAddressId for order */
    orderAddressId: String,

    /**orderPaymentMethod   for order */
    orderPaymentMethod: String,
  },

  methods: {
    createOrderAgain(){
      this.createOrder(this.orderSendingMethod ,  '' ,this.orderAddressId  , this.orderPaymentMethod)
    },
    openModal() {
      this.dialog = true;
    },

    closeModal() {
      this.dialog = false;
    },

    async removeProduct() {
      this.loading =true
      this.$emit('removeProduct');

    },
  },

  computed:{
    orderErrorModal(){
      return this.$store.getters['get_orderModalError']
    },
    dialog(){
      return this.orderErrorModal.dialog
    },
    title(){
      return this.orderErrorModal.title
    },
    text(){
      return this.orderErrorModal.text
    },
    submitText(){
      return this.orderErrorModal.submitText
    },
    buttonType(){
      return this.orderErrorModal.buttonType
    },
    object(){
      return this.orderErrorModal.object
    },

  }
}
</script>

<style lang="scss">

.c-modal {
  .v-card {
    background: #fff !important;
  }

  &__header {
    border-bottom: 1px solid #E0E0E0;

    &__btn {
      min-width: auto !important;
    }
  }
}
</style>
