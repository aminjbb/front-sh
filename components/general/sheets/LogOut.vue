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

    <v-bottom-sheet
        v-if="sheet"
        v-model="sheet"
        color="white"
        width="500px"
    height="218">
      <v-card  class="pt-3 px-6 pb-5" height="218">
        <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                <span class="t16 w700 text-sGrayDarken2">
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
          <p class="t14 w500 my-5 text-sGray">{{text}}</p>

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
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {

  data() {
    return {
      sheet: false,
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
      this.sheet = true;
    },

    closeModal() {
      this.sheet = false;
    },

    async removeProduct() {
      this.loading = true
      this.$emit('removeProduct');

    },
  },
}
</script>

<style lang="scss">

.c-modal {
  .v-card {
    background: #fff !important;
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
