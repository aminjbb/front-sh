<template>
<div class="notification d-flex align-center justify-space-between px-3 py-2" :class='`bg-${color}-lighten-5`' :style="{border: `1px solid #${borderColorCode}`}">
    <div class="d-flex align-center flex-grow-1">
        <v-icon :icon="icon" :color="color" class="ml-1" />
        <span :class="`text-${color}`" class="t13 w400 number-font">{{ text }}</span>
    </div>

    <div v-if="showButton" class="notification__btn">
        <v-btn :href="buttonLink" :title="buttonText" class="w-100" :color="color" height="32px">
            {{buttonText}}
        </v-btn>
    </div>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Notification color
         */
        color: {
            type: String,
            default: 'warning'
        },

        /**
         * Border color code
         */
        borderColorCode:String,

        /**
         * Notification icon
         */
        icon: {
            type: String,
            default: 'mdi-alert-remove-outline'
        },

        /**
         * Notification text
         */
        text: String,

        /**
         * Show button
         */
        showButton:Boolean,

        /**
         * Notification button text
         */
         buttonText: String,

         /**
         * Notification button link
         */
         buttonLink: String,
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

    .notification{
        border-radius: 8px;
        min-height: 48px;

        @include gbp(0, 768px) {
            
            flex-direction: column;
            align-items: flex-start !important;

            > div:first-child{
                margin-bottom: 10px;
            }
        }

        &__btn{
            height: 32px;
            padding: 0 12px;

            .v-btn__content{
                font-size: 12px !important;
            }
        }
    }
</style>
