<template lang="">
<div id="comments" class="product-comment">
    <header class="d-flex align-center justify-space-between mb-2">
        <div class="d-flex align-center">
            <v-icon
                icon="mdi-comment-outline"
                color="grey"
                class="ml-2 xs-show" />
            <h3 class="t20 w400 text-grey-darken-1 my-5 product-section-header">دیدگاه مخاطبان</h3>
        </div>

       <generalProductSingleAddCommentModal />
    </header>

    <div v-if="commentList && commentList.length" class="product-comment__list">
        <div
            class="product-comment__card"
            v-for="(comment, index) in commentList"
            :key="`comment${index}`">
            <header class="product-comment__card__header mb-3">
                <div class="d-flex align-center ml-8">
                    <v-icon
                        icon="mdi-account-circle-outline"
                        color="grey-darken-1"
                        class="ml-2" />

                    <span v-if="comment.author" class="t13 w400 text-grey-darken-1 product-comment__card__author">{{comment.author}}</span>
                </div>

                <span v-if="comment.date" class="t11 w400 text-grey-lighten-1">{{comment.date}}</span>
            </header>

            <p v-if="comment.message" class="t14 w400 l25 text-grey-darken-2 product-comment__card__msg">{{comment.message}}</p>

            <v-divider
                v-if="index + 1 < comments.length"
                color="grey-lighten-1"
                class="my-4" />
        </div>

        <span class="d-flex align-center t12 w400 text-primary cur-p" id="show-more-comments" @click="showAllComment()">
            <span>مشاهده نظرات بیشتر</span>

            <v-icon
                class="mr-1"
                icon="mdi-chevron-left"
                size="x-small"
                color="primary" />
        </span>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            commentList: []
        }
    },

    props: {
        comments: Array,
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
            this.commentList = [];
            this.commentList = this.comments
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
