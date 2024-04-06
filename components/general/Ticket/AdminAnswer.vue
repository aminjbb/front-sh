<template>
<div v-if="content" class="ticket-answer ticket-answer--admin d-flex align-start justify-end ltr mt-5 l23">
    <v-icon
        icon="mdi-face-agent"
        color="green-darken-2"
        class="mr-2" />

    <div class="ticket-answer__content d-flex flex-grow-1 justify-end">
        <div class="py-2 px-3">
            <p
                v-if="content"
                class="t12 w400 text-grey-darken-1 pb-2"
                v-html="content" />

            <div class="ticket-answer__images d-flex align-center">
                <template v-for="file in fileList" :key="`file${file.id}`">
                    <a :href="file.url" target="_blank" class="ml-2">
                        <img :src="file.url" :title="file.name" :alt="file.name" width="32" height="32" />
                    </a>
                </template>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Answer
         */
        content: String,

        /**
         * file list
         */
        fileList: Array,
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

$parent:'ticket-answer';

.#{$parent} {
    &--admin {
        .#{$parent} {
            &__content {
                >div {
                    max-width: 60%;
                    background-color: rgba(#E8F5E9, 0.8);
                    border-radius: 6px !important;

                    @include gbp(0, 768) {
                        max-width: 100% !important;
                    }
                }
            }

            &__images {
                a {
                    overflow: hidden;
                    display: flex;
                    border-radius: 4px !important;
                }
            }
        }
    }
}
</style>
