<template>
<header v-if="content" class="ticket-info-card d-flex justify-space-between align-center bg-grey-lighten-4 pa-5">
    <div>
        <div class="mb-2">
            <span class="t12 w400 text-grey-darken-2 ml-2">موضوع:</span>
            <span v-if="content.parent_topic || content.topic_title" class="t14 w500 text-grey-darken-3">{{content.parent_topic}} - {{content.topic_title}}</span>
        </div>

        <div class="mb-2">
            <span class="t12 w400 text-grey-darken-2 ml-2">شماره تیکت: </span>
            <span v-if="content.id" class="t12 w400 text-grey-darken-3 number-font">{{content.id}}</span>
        </div>

        <div>
            <span class="t12 w400 text-grey-darken-2 ml-2">اولویت:</span>
            <span v-if="content.priority" class="t12 w400 text-grey-darken-3">{{getPriorityText(content.priority)}}</span>
        </div>
    </div>

    <div>
        <div class="mb-2 text-left">
            <span class="t12 w400 text-grey-darken-2 ml-2">وضعیت:</span>
            <span v-if="content.status" class="t12 w400 text-grey-darken-3">{{getStatusText(content.status)}}</span>
        </div>

        <div class="mb-2 text-left">
            <span class="t12 w400 text-grey-darken-2 ml-2">تاریخ ارسال: </span>
            <span v-if="content.created_at_fa" class="t12 w400 text-grey-darken-3 number-font">{{content.created_at_fa}}</span>
        </div>

        <div class="text-left">
            <span class="t12 w400 text-grey-darken-2 ml-2">آخرین برزورسانی: </span>
            <span v-if="content.updated_at_fa" class="t12 w400 text-grey-darken-3 number-font">{{content.updated_at_fa}}</span>
        </div>
    </div>
</header>
</template>

<script>
export default {
    props: {
        /**
         * content
         */
        content: Object
    },

    methods: {
        /**
         * Get priority text
         */
        getPriorityText(priority) {
            const text = '';

            if (priority == 'urgent') {
                return 'ضروری';
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
                return 'باز';
            }
            if (status == 'answered') {
                return 'پاسخ داده شده';
            }
            if (status == 'resolved') {
                return 'بسته شده';
            }
            if (status == 'postponed') {
                return 'متوقف شده';
            }
            if (status == 'seen') {
                return 'دیده شده';
            }

            return 'نامعلوم';
        },
    },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

.ticket-info-card {
    border-radius: 5px !important;

    @include gbp(0, 768) {
        justify-content: flex-start !important;
        flex-direction: column !important;
        align-items: flex-start !important;

        >div > div{
            margin-bottom: 5px !important;
        }

        >div:nth-child(2) div {
            text-align: right !important;
        }
    }
}
</style>
