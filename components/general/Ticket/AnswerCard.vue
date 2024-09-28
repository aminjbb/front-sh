<template>
<div v-if="content" class="ticket-answer pa-3">
    <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center py-1">
            <template v-if="status === 'user'">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-2">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0H20C24.4183 0 28 3.58172 28 8V20C28 24.4183 24.4183 28 20 28H8C3.58172 28 0 24.4183 0 20V8Z" fill="#FBE9F3" />
                    <path d="M22.3327 14C22.3327 9.40829 18.591 5.66663 13.9993 5.66663C9.40768 5.66663 5.66602 9.40829 5.66602 14C5.66602 16.4166 6.70768 18.5916 8.35768 20.1166C8.35768 20.125 8.35768 20.125 8.34935 20.1333C8.43268 20.2166 8.53268 20.2833 8.61602 20.3583C8.66602 20.4 8.70768 20.4416 8.75768 20.475C8.90768 20.6 9.07435 20.7166 9.23268 20.8333C9.29102 20.875 9.34102 20.9083 9.39935 20.95C9.55768 21.0583 9.72435 21.1583 9.89935 21.25C9.95768 21.2833 10.0243 21.325 10.0827 21.3583C10.2493 21.45 10.4243 21.5333 10.6077 21.6083C10.6743 21.6416 10.741 21.675 10.8077 21.7C10.991 21.775 11.1743 21.8416 11.3577 21.9C11.4243 21.925 11.491 21.95 11.5577 21.9666C11.7577 22.025 11.9577 22.075 12.1577 22.125C12.216 22.1416 12.2743 22.1583 12.341 22.1666C12.5743 22.2166 12.8077 22.25 13.0493 22.275C13.0827 22.275 13.116 22.2833 13.1493 22.2916C13.4327 22.3166 13.716 22.3333 13.9993 22.3333C14.2827 22.3333 14.566 22.3166 14.841 22.2916C14.8743 22.2916 14.9077 22.2833 14.941 22.275C15.1827 22.25 15.416 22.2166 15.6493 22.1666C15.7077 22.1583 15.766 22.1333 15.8327 22.125C16.0327 22.075 16.241 22.0333 16.4327 21.9666C16.4993 21.9416 16.566 21.9166 16.6327 21.9C16.816 21.8333 17.0077 21.775 17.1827 21.7C17.2493 21.675 17.316 21.6416 17.3827 21.6083C17.5577 21.5333 17.7327 21.45 17.9077 21.3583C17.9743 21.325 18.0327 21.2833 18.091 21.25C18.2577 21.15 18.4243 21.0583 18.591 20.95C18.6494 20.9166 18.6993 20.875 18.7577 20.8333C18.9243 20.7166 19.0827 20.6 19.2327 20.475C19.2827 20.4333 19.3244 20.3916 19.3744 20.3583C19.466 20.2833 19.5577 20.2083 19.641 20.1333C19.641 20.125 19.641 20.125 19.6327 20.1166C21.291 18.5916 22.3327 16.4166 22.3327 14ZM18.116 18.1416C15.8577 16.625 12.1577 16.625 9.88268 18.1416C9.51602 18.3833 9.21602 18.6666 8.96602 18.975C7.69935 17.6916 6.91602 15.9333 6.91602 14C6.91602 10.0916 10.091 6.91663 13.9993 6.91663C17.9077 6.91663 21.0827 10.0916 21.0827 14C21.0827 15.9333 20.2994 17.6916 19.0327 18.975C18.791 18.6666 18.4827 18.3833 18.116 18.1416Z" fill="#D72685" />
                    <path d="M14 9.77502C12.275 9.77502 10.875 11.175 10.875 12.9C10.875 14.5917 12.2 15.9667 13.9583 16.0167C13.9833 16.0167 14.0167 16.0167 14.0333 16.0167C14.05 16.0167 14.075 16.0167 14.0917 16.0167C14.1 16.0167 14.1083 16.0167 14.1083 16.0167C15.7917 15.9584 17.1167 14.5917 17.125 12.9C17.125 11.175 15.725 9.77502 14 9.77502Z" fill="#D72685" />
                </svg>
            </template>
            <template v-if="status === 'admin'">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-2">
                    <path d="M0 8C0 3.58172 3.58172 0 8 0H20C24.4183 0 28 3.58172 28 8V20C28 24.4183 24.4183 28 20 28H8C3.58172 28 0 24.4183 0 20V8Z" fill="#FBE9F3" />
                    <g clip-path="url(#clip0_6608_67863)">
                        <path d="M22.0012 13.8669V16.0791C22.0012 17.2619 21.2922 18.2302 20.4268 18.2302H19.9539V18.9878C19.9539 20.2849 18.851 21.3396 17.4962 21.3396H16.7796C16.6812 21.718 16.3225 22 15.8985 22H14.2211C13.7219 22 13.3129 21.6086 13.3129 21.1302V20.7662C13.3129 20.2885 13.7219 19.8971 14.2211 19.8971H15.8985C16.321 19.8971 16.6781 20.177 16.7789 20.5518H17.4969C18.3984 20.5518 19.1314 19.8504 19.1314 18.9878V18.2302H18.3713C18.1149 18.2302 17.9067 17.946 17.9067 17.5964V12.3504C17.9067 12 18.1149 11.7158 18.3713 11.7158H18.4841V11.4302C18.4841 9.40216 16.7601 7.75252 14.6406 7.75252H13.4377C11.3182 7.75252 9.59427 9.40216 9.59427 11.4302V11.7158H9.63261C9.88899 11.7158 10.0965 12 10.0965 12.3504V17.5964C10.0965 17.9468 9.88899 18.2302 9.63261 18.2302H7.57632C6.71019 18.2302 6.00195 17.2619 6.00195 16.0791V13.8669C6.00195 12.6842 6.71094 11.7151 7.57632 11.7151H7.76352V11.4295C7.76352 8.43597 10.3085 6 13.4377 6H14.6406C17.7691 6 20.3148 8.43597 20.3148 11.4295V11.7151H20.4268C21.293 11.7151 22.0012 12.6835 22.0012 13.8669Z" fill="#D72685" />
                    </g>
                    <defs>
                        <clipPath id="clip0_6608_67863">
                            <rect width="16" height="16" fill="white" transform="translate(6 6)" />
                        </clipPath>
                    </defs>
                </svg>

            </template>

            <span class="t14 w700 text-sGrayDarken2">
                <template v-if="status === 'user'">
                    کاربر شاواز
                </template>
                <template v-else>
                    پاسخ پشتیبان {{ content?.creator_first_name }} {{ content?.creator_last_name }}
                </template>
            </span>
        </div>

        <div class="d-flex flex-column justify-end align-end">
            <div class="d-flex align-center">
                <v-icon icon="mdi-clock-outline" class="ml-1" color="sGray" size="x-small" />
                <span v-if="content.time" class="text-sGray t10 w400 number-font">{{ content.time }}</span>
            </div>
            <div v-if="content.rate !== null && content.rate !== 0" class="d-flex align-center ltr">
                <v-rating
                    v-model="content.rate"
                    class="ltr ml-0"
                    :length="5"
                    :size="20"
                    half-increments
                    readonly
                    color="grey-lighten-2"
                    active-color="orange-lighten-2"
                ></v-rating>
            </div>
        </div>
    </div>

    <p v-if="content.content" :id="`text${content.id}`" class="ticket-answer__content t12 w500 mb-2 l23" :class="[ status === 'user' ? 'text-sGray':'text-sGrayDarken2', showMoreBtn === true ? 'hide-text' : '', show === true ? 'show-text' : '']" v-html="content.content"/>

    <div v-if="showMoreBtn === true" class="t12 w500 text-primary cur-p" :id="`show-more-span${content?.id}`" @click="showMoreData()">مشاهده بیشتر</div>

    <div v-if="content.files && content.files.length > 0" class="pb-3 pt-2">
        <div class="scroll--x">
            <div class="d-flex align-center">
                <div v-for="(image, index) in content?.files" :key="`image_${index}`" class="ticket-answer__image br8 s-border s-border--medium s-border--gray ml-2 ov-h">
                    <img :src="image?.url" width="128" height="96" />
                </div>
            </div>
        </div>
    </div>

    <div v-if="status === 'admin'" class="d-flex align-center justify-end">
        <v-btn
            v-if="lastThread"
            @click="openAnswerModal()"
            height="44"
            title="پاسخ دادن"
            color="primary"
            prepend-icon="mdi-message-processing-outline"
            class="ticket-answer__btn ticket-answer__btn--submit">
            پاسخ دادن
        </v-btn>

        <v-btn
            v-if="content.rate === null"
            @click="openRatingModal()"
            height="44"
            title="امتیازدهی"
            color="sGray"
            class="ticket-answer__btn ticket-answer__btn--cancel">
            امتیازدهی
        </v-btn>
    </div>

    <generalTicketAnswerModal ref="answerModal" title=" پاسخ به پشتیانی" text="عنوان" buttonText=" تایید پاسخ" />
    <generalTicketAnswerBottomSheet ref="answerBottomSheet" title=" پاسخ به پشتیانی" text="عنوان" buttonText=" تایید پاسخ" />

    <generalTicketRatingModal v-if="status === 'admin'" ref="ratingModal" :itemId="content.id" :title="` امتیازدهی به ${content?.creator_first_name} ${content?.creator_last_name}`" text="عنوان" buttonText="ارسال امتیاز" />
    <generalTicketRatingBottomSheet v-if="status === 'admin'" ref="ratingBottomSheet" :itemId="content.id" :title="` امتیازدهی به ${content?.creator_first_name} ${content?.creator_last_name}`" text="عنوان" buttonText="ارسال امتیاز" />
</div>
</template>

<script>
export default {
    data() {
        return {
            showMoreBtn:false,
            show: false
        }
    },

    props: {
        /**
         * Content
         */
        content: Object,

        /**
         * Status
         * 'user', 'admin'
         */
        status: {
            type: String,
            default: 'user'
        },

        lastThread: Boolean,
    },

    methods:{
        openAnswerModal(){
            if( window.innerWidth < 769){
                this.$refs.answerBottomSheet.sheet = true;
            }else{
                this.$refs.answerModal.dialog = true;
            }
        },

        openRatingModal(){
            if( window.innerWidth < 769){
                this.$refs.ratingBottomSheet.sheet = true;
            }else{
                this.$refs.ratingModal.dialog = true;
            }
        },

        /**
         * show more button
         */
         showMoreData() {
            this.show = !this.show;
            if (this.show === true) {
                document.getElementById(`show-more-span${this.content?.id}`).innerHTML = 'مشاهده کمتر';
            }
            if (this.show === false) {
                document.getElementById(`show-more-span${this.content?.id}`).innerHTML = 'مشاهده بیشتر';
            }

        },
    },

    mounted(){
        const findContent = document.getElementById(`text${this.content?.id}`)

        if(findContent){
            const height = findContent.clientHeight;

            const defaultHeight = window.innerWidth < 769 ? 75 : 25 ;

            if(height > defaultHeight){
                this.showMoreBtn = true
            }else{
                this.showMoreBtn = false
            }
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.ticket-answer {
    border-radius: 16px;
    background: #FFF;
    box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10);

    @include gbp (0, 768) {
        border-radius: var(--Space_16, 16px) !important;
        background: var(--White-White, #FFF) !important;
        box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10) !important;
        padding-bottom: 12px !important;
    }

    &:nth-child(2){
        @include gbp (0, 768) {
            margin-top: 24px !important;
        }
    }

    &:last-child{
        @include gbp (0, 768) {
            margin-bottom: 0 !important;
        }
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

    &__content{
        overflow: hidden;

        &.hide-text{
            height: 23px;

            @include gbp (0, 768) {
               height : 69px;
            }

            &.show-text{
                height: auto !important;
            }
        }
    }

    .v-rating__item{
        .v-icon{
            font-size: 20px !important;
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

    &__btn{
        background: transparent !important;
        box-shadow: none !important;

        .v-btn__content{
            font-variation-settings: "wght" 700;
            font-size: 12px !important
        }

        &--submit{
            .v-btn__content{
                color:#D72685 !important;
            }

            .v-icon{
                color:#D72685 !important;
            }

            .v-btn__prepend{
                margin-left: 4px !important;
            }
        }

        &--cancel{
            .v-btn__content{
                color:#6A6A6A !important;
            }
        }
    }
}
</style>
