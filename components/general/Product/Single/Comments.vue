<template>
  <div id="comments" class="product-comment">
    <header class="d-flex align-center justify-space-between mb-2">
      <div class="d-flex align-center">
        <v-icon
            icon="mdi-comment-outline"
            color="grey"
            class="ml-2 xs-show"/>
        <h3 class="t20 w400 text-grey-darken-1 my-5 product-section-header">دیدگاه مخاطبان</h3>

        <div class="v-product__filter d-flex pt-1 align-center justify-space-between mr-10">
          <nav class="d-flex align-center flex-grow-1">
            <div class="pl-4">
              <v-icon icon="mdi-sort-ascending" color="grey-darken-1"/>
              <span class="t11 w400 text-grey-darken-1 mr-2">مرتب‌سازی بر اساس:</span>
            </div>

            <ul class="v-product__filter__items d-flex align-center">
              <li
                  class="t11 w400  px-3"
                  :class="(orderType === 'desc') ? 'text-primary' : 'text-grey'"
                  @click="sort('desc')">جدیدترین
              </li>
              <li
                  class="t11 w400  px-3"
                  :class="(orderType === 'asc') ? 'text-primary' : 'text-grey'"
                  @click="sort('asc')">قدیمی‌ترین
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <generalProductSingleAddCommentModal :productSelectedSeller="productSelectedSeller" :getSecondaryData="getSecondaryData"/>
    </header>

    <div v-if="comments && comments.length" class="product-comment__list">
      <div
          class="product-comment__card"
          v-for="(comment, index) in comments.slice(0, sliceLength)"
          :key="`comment${index}`">
        <header class="product-comment__card__header mb-3">
          <div class="d-flex align-center ml-8">
            <v-icon
                icon="mdi-account-circle-outline"
                color="grey-darken-1"
                class="ml-2"/>

            <span
                v-if="comment.user"
                class="t13 w400 text-grey-darken-1 product-comment__card__author">
                      {{ comment.user?.first_name }} {{ comment.user?.last_name }}
            </span>

            <span
                v-if="comment?.order"
                style="background: #e9ddf4"
                class="rounded-lg px-2 t10 text-detail mr-2">خریدار</span>

            <span
                v-if="comment?.created_at_fa"
                class="t10 w400 text-grey-darken-1 product-comment__card__author product-card__price-info__price mr-10">{{ comment?.created_at_fa }}</span>
          </div>
          <div class="d-flex align-center justify-center">
            <v-rating model-value="3" :length="1" size="small" color="orange-lighten-2" active-color="orange-darken-1" readonly/>
            <span class="t11 w400 text-grey-lighten-1">{{ comment.score }}</span>
          </div>
        </header>

        <p v-if="comment.comment" class="t14 w400 l25 text-grey-darken-2 product-comment__card__msg">
          {{ comment.comment }}</p>

        <div class="d-flex justify-start ga-10 mt-2">
          <div v-if="comment?.order?.seller_name">
            <v-icon
                icon="mdi-account-star-outline"
                color="grey-darken-1"
                class="ml-2"/>
            <span class="t11 w400 text-grey-darken-1 product-comment__card__author">{{
                comment?.order?.seller_name
              }}</span>
          </div>

          <div class="d-flex align-center">
            <div
                style="width: 16px; height: 16px; border-radius: 50px;padding: 2px"
                :style="comment?.order?.color_value ? { background: comment?.order?.color_value} : {} "/>

            <span
                v-if="comment?.order?.color_label"
                class="t11 w400 text-grey-darken-1 product-comment__card__author mr-2">
                  {{ comment?.order?.color_label }}
                </span>
          </div>
        </div>

        <v-divider
            v-if="index + 1 < comments.length || comment?.answers.length > 0"
            :class="comment?.answers.length > 0 ? 'mx-5' : ''"
            color="grey-lighten-1"
            class="my-4"/>

        <!-- admin comments -->
        <div v-if="comment?.answers" class="product-comment__list">
          <div
              v-for="(answer, index) in comment?.answers"
              :key="index"
              class="product-comment__card">
            <header class="product-comment__card__header mb-3">
              <div class="d-flex align-center ml-8">
                <v-icon
                    icon="mdi-face-agent"
                    color="grey-darken-1"
                    class="ml-2"/>

                <span class="t13 w400 text-grey-darken-1 product-comment__card__author">ادمین سایت</span>
              </div>
            </header>

            <p v-if="answer.comment" class="t14 w400 l25 text-grey-darken-2 product-comment__card__msg">
              {{ answer.comment }}</p>

            <v-divider
                color="grey-lighten-1"
                class="my-4"/>
          </div>
        </div>
      </div>


      <span class="d-flex align-center t12 w400 text-primary cur-p mt-5" id="show-more-comments"
            @click="showAllComment()">
            <span>مشاهده نظرات بیشتر</span>

            <v-icon
                class="mr-1"
                icon="mdi-chevron-left"
                size="x-small"
                color="primary"/>
        </span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      sliceLength: 3,
      orderType: 'desc',
    }
  },

  props: {
    /**
     * Comment list
     */
    comments: Array,

    /*
    * Product Selected Seller for add comment
    **/
    productSelectedSeller: Object,

    /*
    * Method for get SecondaryData after add comment
    **/
    getSecondaryData: Function
  },


  methods: {
    addCommentsToCommentList() {
      if (this.comments && this.comments.length > 0) {
        if (this.comments[0]) {
          this.commentList.push(this.comments[0]);
        }

        if (this.comments[1]) {
          this.commentList.push(this.comments[1]);
        }

        if (this.comments[1]) {
          this.commentList.push(this.comments[1]);
        }
      }
    },

    showAllComment() {
      document.getElementById('show-more-comments').classList.add('hide');
      const commentsLength = this.comments?.length;
      this.sliceLength = commentsLength
    },

    sort(orderType) {
      this.orderType = orderType
      this.$emit('sortCommentList' , orderType)
    }
  },

  mounted() {
    this.addCommentsToCommentList();
  }

}
</script>

<style lang="scss">
@import '~/assets/scss/components/general/products/comments.scss';
</style>
