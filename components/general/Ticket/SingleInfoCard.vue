<template>
<section v-if="content" class="ticket-info-card" :class="[{'show': show}, {'show-more' : more}]">
    <div v-if="content.topic_title" class="ticket-info-card__item d-flex align-center justify-space-between py-5">
        <div class="t12 w700 text-sGrayLighten2 text-right">زیر موضوع : </div>
        <div class="t12 w700 text-sGrayDarken2 text-left">{{ content?.topic_title }}</div>
    </div>

    <div v-if="content.created_at_fa" class="ticket-info-card__item d-flex align-center justify-space-between py-5">
        <div class="t12 w700 text-sGrayLighten2 text-right">تاریخ ثبت تیکت : </div>
        <div class="t12 w700 text-sGrayDarken2 text-left number-font">{{ content?.created_at_fa }}</div>
    </div>

    <div v-if="content.id" class="ticket-info-card__item d-flex align-center justify-space-between py-5">
        <div class="t12 w700 text-sGrayLighten2 text-right">شناسه تیکت : </div>
        <div class="t12 w700 text-sGrayDarken2 text-left number-font">{{ content?.id }}</div>
    </div>

    <div v-if="content.priority" class="ticket-info-card__item d-flex align-center justify-space-between py-5">
        <div class="t12 w700 text-sGrayLighten2 text-right">اولویت : </div>
        <div class="t12 w700 text-sGrayDarken2 text-left">{{getPriorityText(content?.priority)}}</div>
    </div>

    <div v-if="content.status" class="ticket-info-card__item d-flex align-center justify-space-between py-5">
        <div class="t12 w700 text-sGrayLighten2 text-right">وضعیت : </div>
        <div class="t12 w700 text-left ticket-info-card__item__status" :class="[getStatusBg(content?.status), getStatusColor(content?.status)]">{{getStatusText(content?.status)}}</div>
    </div>

    <div v-if="content.content" class="ticket-info-card__item py-5">
        <div class="t14 w700 text-sGrayLighten2 text-right">توضیحات تیکت</div>
        <div class="t12 w500 text-right mt-2">{{content?.content}}</div>
    </div>

    <div v-if="content.files && content.files.length" class="py-5">
        <div class="t14 w700 text-sGrayLighten2 text-right my-1"> فایل‌های پیوست شده</div>

        <div class="scroll--x">
            <div class="mt-2 d-flex align-center">
                <div v-for="(image, index) in content?.files" :key="`image_${index}`" class="ticket-info-card__item__image br8 s-border s-border--medium s-border--gray ml-2 ov-h">
                    <img :src="image.url" width="128" height="96" />
                </div>
            </div>
        </div>
    </div>
</section>

<span v-if="more" class="d-flex align-center text-primary cur-p justify-center mb-3" id="show-more" @click="showMore()">
    <span class="t12 w700" id="show-more-span">جزئیات بیشتر تیکت</span>

    <v-icon id="show-more-icon" class="mr-1" icon="mdi-chevron-down" color="primary" />
</span>

</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
    props: {
        /**
         * content
         */
        content: Object,
        more: {
            type: Boolean,
            default: false,
        }
    },

    methods: {
        /**
         * show more button
         */
        showMore() {
            this.show = !this.show;
            if (this.show === true) {
                document.getElementById('show-more-icon').classList.remove('mdi-chevron-down')
                document.getElementById('show-more-icon').classList.add('mdi-chevron-up');
                document.getElementById('show-more-span').innerHTML = 'جزئیات کمتر تیکت';
            }
            if (this.show === false) {
                document.getElementById('show-more-icon').classList.remove('mdi-chevron-up');
                document.getElementById('show-more-icon').classList.add('mdi-chevron-down');
                document.getElementById('show-more-span').innerHTML = 'جزئیات بیشتر تیکت';
            }

        },

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

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

.ticket-info-card {
    padding: 0 16px;
    @include gbp (0, 768) {
        padding: 0 12px !important;
    }

    &.show-more {
        height: 220px;
        overflow: hidden;
        position: relative;

        &::after {
            content: "";
            height: 100px;
            width: 100%;
            background: rgb(255, 255, 255);
            background: linear-gradient(0deg, #fff 31%, rgba(253, 187, 45, 0) 100%);
            position: absolute;
            bottom: 0;
            right: 0;

            @include gbp (0, 768) {
                background: #fafafa;
                background: linear-gradient(0deg, #fafafa 31%, rgba(253, 187, 45, 0) 100%);
            }
        }
    }

    &.show {
        height: auto !important;
        overflow: visible !important;

        &::after {
            display: none;
        }
    }

    &__item {
        border-bottom: 1px solid #E8E8E8;

        .number-font {
            font-weight: 700 !important;
        }

        &__status {
            padding: 6px 9px;
            border-radius: 6px;
        }

        &__image {
            position: relative;
            width: 128px;
            flex: 0 0 128px;
            overflow: hidden;
            height: 96px;

            img {
                width: 100%;
                min-height: 100%;
                display: block;
            }
        }
    }

    .scroll--x {
        padding: 10px;

        @include gbp (0, 768) {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }

        &::-webkit-scrollbar-track {
            background-color: #F5F5F5;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #EFA8CE;
        }
    }
}
</style>
