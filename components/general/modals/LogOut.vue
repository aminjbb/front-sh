<template>
  <div class="c-modal">
    <template v-if="buttonType == 'icon'">
      <v-icon
          @click="openModal()"
          class="cur-p"
          icon="mdi-delete-outline"
          size="small"
          color="red" />
    </template>

    <template v-if="buttonType == 'mobile'">
      <div @click="openModal()" class="text-grey t14 d-flex align-center py-1 cur-p">
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
        class="br16"
        width="500px">
      <v-card class="pt-3 br16 px-6 pb-5" width="438">
        <header class="c-modal__header d-flex justify-space-between align-center mt-4">
          <span class="t18 w700 text-sGrayDarken2">{{title}}</span>

          <v-icon @click="closeModal()" color="sGrayDarken1">mdi-close</v-icon>
        </header>
        <div>
          <p class="t14 w500 my-9 text-sGray">{{text}}</p>

          <div class="d-flex align-center justify-space-between mt-2 mobile-pa-0 w-100">


            <v-btn
                @click="closeModal()"
                height="44"
                title="انصراف"
                width="49%"
                class="btn btn--cancel ov-h br12">
              <span class="w700">انصراف</span>
            </v-btn>

            <v-btn
                :loading="loading"
                @click="removeProduct()"
                height="44"
                :title="submitText"
                width="49%"
                class="btn btn--submit br12 ov-h" >
              <span class="w700">{{submitText}}</span>
            </v-btn>
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
      dialog: false,
      loading:false,
    }
  },

  props: {
    /**Modal title */
    title: String,

    /**Modal text */
    text: String,

    /**Modal submit button text */
    submitText: String,

    /**
     * Button Type
     * Can be : icon - Text - mobile
     */
    buttonType: String,
  },

  methods: {
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
}
</script>

<style lang="scss">

.c-modal {
  .v-card {
    background: #fff !important;
    &.card{
      border-radius: 16px!important;

    }
  }

  &__header {

    &__btn {
      min-width: auto !important;

      .v-btn__content{
        background: #ddd;
        border-radius:50% ;
      }
    }
  }
}
</style>
