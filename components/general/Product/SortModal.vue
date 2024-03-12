<template>
  <div class="c-modal w-100">
    <div class="w-100 d-flex justify-end align-center mt-3" @click="openModal()">
      <v-icon
          icon="mdi-sort-ascending"
          color="grey-darken-2"
          class="ml-2"/>

      <span class="text-primary t14 w400">
            <template v-if="sortModal && sortModal.label">{{ sortModal.label }}</template>
            <template v-else>جدیدترین</template>
        </span>
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
                        مرتب سازی براساس
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

        <div class="d-flex flex-column">
          <template v-for="(item, index) in sortItems" :key="`sort${index}`">
            <div class="d-flex align-center">
              <v-checkbox
                  class="sort-checkbox"
                  v-model="sortModal"
                  @change="selectSort()"
                  hide-details
                  :value="item"/>
              <h3 class="t15 w400 text-grey-darken-2 flex-grow-1">{{ item.label }}</h3>
            </div>
          </template>
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
      sortItems: [{
        label: 'پربازدیدترین',
        value: 'most_view'
      },
        {
          label: 'جدیدترین',
          value: 'created_at',
          type:'desc'
        },
        {
          label: 'ارزان‌ترین',
          value: 'site_price',
          type:'asc'
        },
        {
          label: 'گران‌ترین',
          value: 'site_price',
          type:'desc'
        },
        {
          label: 'بیشترین تخفیف',
          value: 'discount',
          type:'desc'
        }
      ],
      sortModal: null,
    }
  },
  watch: {
    sortModal(val){
      this.$emit('sort', val.value , val.type);
    }
  },
  methods: {
    /**
     * Sort Data
     */
    selectSort() {
      this.$emit('selectSort', this.sortModal);
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
.sort-checkbox {
  width: 50px;
  flex: 0 0 50px;
}

.c-modal--comment__header {
  background: var(--Shade-white, #FFF);
  box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.20);
}
</style>
