<template>
  <a class="ticket-card pa-2 mb-4 s-shadow s-shadow--light bg-white d-block" :href="`/user/ticket/${content.id}`">
        <div class="d-flex justify-space-between align-start mb-2">
            <div>
                <h2 v-if="content && content.title !== null && content.title !== ''" class="t15 w700 text-sGrayDarken2">
                    <v-icon icon="mdi-chat-outline" color="text-sGrayDarken2" class="ml-1"></v-icon>
                    {{ content.title}}
                </h2>
                <h2 v-else-if="content.parent_topic" class="t15 w700 text-sGrayDarken2">
                    <v-icon icon="mdi-chat-outline" color="text-sGrayDarken2" class="ml-1"></v-icon>
                    {{content.parent_topic}}
                </h2>
                <span v-if="content.topic_title" class="t12 w500 text-sGray">{{content.topic_title}}</span>
            </div>

            <div v-if="content && content.status" class="ticket-card__status t10 w700" :class="[getStatusBg(content.status), getStatusColor(content.status)]">
                {{ getStatusText(content.status) }}
            </div>
        </div>

        <p v-if="content && content.content" class="t10 w400 text-sGray mb-1" v-html="content.content"></p>
 
        <div class="d-flex align-center ticket-card__info">
            <div v-if="content && content.id" class="d-flex align-center">
                <v-icon color="sGrayLighten2" class="t12" icon="mdi-clipboard-text-outline"></v-icon>
                <span class="t10 w400 text-sGrayLighten2 number-font">شناسه: {{ content.id }}</span>
            </div>
            <div v-if="content && content.priority" class="d-flex align-center">
                <v-icon color="sGrayLighten2" class="t12" icon="mdi-filter-variant"></v-icon>
                <span class="t10 w400 text-sGrayLighten2">اولویت: {{ getPriorityText(content.priority) }}</span>
            </div>
            <div v-if="content && content.created_at" class="d-flex align-center">
                <v-icon color="sGrayLighten2" class="t12" icon="mdi-calendar-month-outline"></v-icon>
                <span class="t10 w400 text-sGrayLighten2 number-font">{{ content.created_at_fa }}</span>
            </div>
        </div>

        <div v-if="content && content.id" class="d-flex justify-end">
            <v-btn
                :href="`/user/ticket/${content.id}`"
                height="44"
                title="جزئیات تیکت"
                color="primary"
                prepend-icon="mdi-information-slab-circle-outline"
                class="ticket-card__btn">
              جزئیات تیکت
            </v-btn>
        </div>
    </a>
</template>

<script>
export default {
    props:{
        content: Object
    },

    methods: {
        /**
         * Get priority text
         */
        getPriorityText(priority) {
            const text = '';

            if (priority == 'urgent') {
                return 'فوری';
            }
            if (priority == 'low') {
                return 'پایین';
            }
            if (priority == 'high') {
                return 'بالا';
            }
            if (priority == 'medium') {
                return 'متوسط';
            }

            return 'معمولی';
        },

        /**
         * Get status text
         */
         getStatusText(status) {
            const text = '';

            if (status == 'open') {
                return 'باز نشده';
            }
            if (status == 'answered') {
                return 'پاسخ داده شده';
            }
            if (status == 'resolved') {
                return 'بسته شده';
            }
            if (status == 'pending') {
                return 'در حال بررسی';
            }

            return '';
        },

        /**
         * Get status text
         */
         getStatusBg(status) {
            const text = '';

            if (status == 'open') {
                return 'bg-sWarningLighten2';
            }
            if (status == 'answered') {
                return 'bg-sYellowLighten2';
            }
            if (status == 'resolved') {
                return 'bg-sSuccessLighten2';
            }
            if (status == 'pending') {
                return 'bg-sInfoLighten2';
            }

            return 'text-sGreyLighten2';
        },

        /**
         * Get status text
         */
         getStatusColor(status) {
            const text = '';

            if (status == 'open') {
                return 'text-sWarning';
            }
            if (status == 'answered') {
                return 'text-sYellow';
            }
            if (status == 'resolved') {
                return 'text-sSuccess';
            }
            if (status == 'pending') {
                return 'text-sInfo';
            }

            return 'text-sGray';
        },
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.ticket-card{
    border-radius: 12px;

    box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10) !important;

    @include gbp (0, 768) {
        box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10) !important;
    }

    &__info{
        .v-icon{
            font-size: 13px !important;
            margin-left: 2px;
        }

        > div:not(:last-child){
            position: relative;
            padding-left: 6px;
            margin-left: 6px;

            &::after{
                content: '';
                width: 1px;
                height: 12px;
                left: 0;
                top: 2px;
                background: #E8E8E8 !important;
                position: absolute;
            }
        }
    }

    &__status{
        padding: 6px 9px;
        border-radius: 6px;
    }

    &__btn{
        background-color: transparent !important;
        color: rgb(var(--v-theme-primary)) !important;
        box-shadow: none !important;

        &:hover,:focus{
            background-color: transparent !important;
        }
        
        .v-btn__content{
            font-size: 13px;
            font-variation-settings: "wght" 700 !important;
        }
    }
}

</style>