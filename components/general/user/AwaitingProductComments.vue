<template>
<div class="product-comments d-flex flex-column h-100">
    <v-row class="ma-0 flex-grow-1">
        <v-col
            cols="4"
            md="12"
            class="pa-0">
            <div v-if="content?.image " class="product-card__image mb-3 mt-4 d-flex justify-center align-center">
                <img :src=" content?.image" :title="content.label" :alt="content.label" width="136" height="136" />
            </div>
        </v-col>

        <v-col
            cols="8"
            md="12"
            class="d-flex align-center pa-0">
            <h3 v-if="content?.name" class="t13 w500 text-grey mb-2">
                {{content?.name}}
            </h3>
        </v-col>
    </v-row>
  <generalProductSingleAddCommentModal @getCommentList="getCommentList" :userProfileComment="true" :productSelectedSeller="productSelectedSeller" />


</div>
</template>

<script>
export default {
    props: {
        /**
         * product object
         */
        content: Object
    },
  methods:{
    getCommentList(){
      this.$emit('updateCommentList')
      this.$emit('updateUserComment')
    }
  },
  computed:{
    productSelectedSeller(){
      const form = {
        id: this.content.shps,
        sku_id: this.content.sku_id
      }
      return form
    }
  }
}
</script>
