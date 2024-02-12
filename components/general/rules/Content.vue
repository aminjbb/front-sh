<template lang="">
<section class="rules-content">
    <header class="rules-content__title" v-if="title">
        <h1 class="t20 w500 text-grey-darken-2 mb-5">
            {{title}}
        </h1>
    </header>

    <p
        class="t14 w400 text-grey-darken-1 l32 number-font"
        v-if="content"
        v-html="content" />
</section>
</template>

<script>
export default {
    props: {
        /**
         * page title
         */
        title: String,

        /**
         * page content
         */
        content: String,
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

.rules-content {
    padding: 20px;

    @include gbp (0, 768) {
        padding: 0 !important;
    }
}
</style>
