<template lang="">
<div v-if="answer" class="ticket-answer ticket-answer--user d-flex align-start mt-5 l23">
    <v-icon
        icon="mdi-account-circle-outline"
        color="primary"
        class="ml-2" />

    <div class="ticket-answer__content d-flex flex-grow-1">
        <p
            v-if="answer.content"
            class="t12 w400 text-grey-darken-1 py-2 px-3"
            v-html="answer.content" />
    </div>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Answer
         */
        answer: String,
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

$parent:'ticket-answer';

.#{$parent} {
    &--user {
        .#{$parent} {
            &__content {
                p {
                    max-width: 60%;
                    background-color: rgba(#FBE9F3, 0.6);
                    border-radius: 6px !important;

                    @include gbp(0, 768) {
                        max-width: 100% !important;
                    }
                }
            }
        }
    }
}
</style>
