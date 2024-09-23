<template>
  <div class="text-center ma-2">
    <v-snackbar
        location="top"
        v-model="snackBarShow"
        :color="snackBarColor"
    >
      <div class="d-flex align-center">
        <div class="ml-2">
          <v-icon :color="snackBarIconColor">
            mdi-information-outline
          </v-icon>
        </div>
        <div class="t14 w500" :class="snackBarTextColor">
          <template v-if="snackBarType === 'array'">
            <p v-for="text in snackBarText">
              {{ text }}
            </p>
          </template>
          <template v-else>
            {{ snackBarText }}
          </template>

        </div>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    snackBar() {
      return this.$store.getters['get_snackBar']
    },

    snackBarShow() {
      return this.snackBar.show
    },

    snackBarText() {
      return this.snackBar.text
    },
    snackBarStatus() {
      return this.snackBar.status
    },
    snackBarType() {
      return this.snackBar.type
    },
    snackBarColor() {
      if (this.snackBarStatus === 'success') return 'sSuccessLighten2'
      else if (this.snackBarStatus === 'error') return 'sErrorLighten2'
      else if (this.snackBarStatus === 'warning') return 'sWarningLighten2'
      else if (this.snackBarStatus === 'white') return 'surface'
    },
    snackBarTextColor() {
      if (this.snackBarStatus === 'success') return 'text-sSuccess'
      else if (this.snackBarStatus === 'error') return 'text-sError'
      else if (this.snackBarStatus === 'warning') return 'text-sWarning'
      else if (this.snackBarStatus === 'white') return 'text-sGrayDarken2'
    },
    snackBarIconColor() {
      if (this.snackBarStatus === 'success') return 'sSuccess'
      else if (this.snackBarStatus === 'error') return 'sError'
      else if (this.snackBarStatus === 'warning') return 'sWarning'
      else if (this.snackBarStatus === 'white') return 'sGrayDarken2'
    },
  },

  methods: {
    closeSnackBar() {
      this.$store.commit('set_snackBar', {
        show: false,
        text: '',
        status: '',
        type: 'text'
      })
    },

  },

  watch: {
    snackBarShow(val) {
      if (val) {
        setTimeout(() => {
          this.closeSnackBar()
        }, 4000)
      }
    }
  }
}
</script>