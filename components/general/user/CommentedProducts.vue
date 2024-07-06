<template>
<div class="product-comments">
    <v-row class="ma-0">
        <v-col
            cols="4"
            md="3"
            lg="2"
            class="pa-0">
            <div v-if="content?.sku?.image && content?.sku.image.image_url" class="product-card__image d-flex justify-center align-center ml-10">
                <img :src="content?.sku.image?.image_url " :title="content?.sku?.label" :alt="content?.sku.label" width="136" height="136" />
            </div>
        </v-col>

        <v-col
            cols="8"
            md="9"
            lg="10"
            class="pa-0 pos-r">
<!--            <div class="product-comments__status mb-5 t12 w400 d-inline-block mt-5" :class=" ? 'product-comments__status&#45;&#45;accept' : 'product-comments__status&#45;&#45;reject'">{{getStatus(content.status)}}</div>-->
            <div v-if="content.status === 'approved'" class="product-comments__status mb-5 t12 w400 d-inline-block mt-5 product-comments__status--accept">{{getStatus(content.status)}}</div>
            <div v-else-if="content.status === 'rejected'" class="product-comments__status mb-5 t12 w400 d-inline-block mt-5 product-comments__status--reject">{{getStatus(content.status)}}</div>
            <div v-else-if="content.status === 'waiting'" class="product-comments__status mb-5 t12 w400 d-inline-block mt-5 product-comments__status--waiting">{{getStatus(content.status)}}</div>

            <h3 v-if="content.comment" class="t12 w400 text-grey-darken-1 mb-2 xs-hide">
                {{content.comment}}
            </h3>

            <!-- <div class="mobile-drop-down">
                <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <v-icon
                            icon="mdi-dots-vertical"
                            color="grey"
                            v-bind="props" />
                        <v-icon
                            icon="mdi-dots-vertical"
                            color="grey-darken-1"
                            v-bind="props" />
                    </template>

                    <v-list>
                        <v-list-item>
                            <a class="text-grey t14 d-flex align-center py-1" :href="editLink">
                                <v-icon
                                    icon="mdi-pen"
                                    class="ml-2"
                                    size="small"
                                    color="grey" />
                                <span class="text-grey t14">ویرایش نظر</span>
                            </a>
                        </v-list-item>

                        <v-list-item>
                            <generalModalsDelete
                                :getUserAddress="getUserAddress"
                                title="حذف نظر"
                                text="آیا از حذف نظر خود مطمئن هستید؟"
                                submitText="حذف نظر"
                                buttonType="mobile"
                                @removeProduct="removeComment(content)" />
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div> -->
        </v-col>
    </v-row>

    <h3 v-if="content.label" class="t12 w400 text-grey mb-2 xs-show">
        {{content.comment}}
    </h3>
</div>
</template>

<script>
export default {
    data() {
        return {
            screenType: null
        }
    },

    props: {
        /**
         * product object
         */
        content: Object,

        /**
         * Edit link
         */
        editLink: String,
    },

    methods: {

        /**
         * Get status persian 
         * @param {*} status 
         */
        getStatus(status) {
            if (status === 'approved') return 'تایید شده';
           else if (status === 'rejected') return 'رد شده';
            else return 'در انتظار';
        },

        /**
         * Remove comment
         */
        removeComment() {
            //TODO: Add remove comment Api and then Emit blow line for refresh product list
            this.$emit('refreshProducts');
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },
}
</script>

<style lang="scss" scoped>
.product-comments {
    &__status {
        border: 1px solid transparent;
        border-radius: 10px;
        padding: 0 6px;

        &--accept {
            border-color: #4CAF50;
            color: #4CAF50;
        }
      &--waiting {
        border-color: #a2a2077a;
        color: #a2a2077a;
      }

        &--reject {
            border-color: #D32F2F;
            color: #D32F2F;
        }
    }
}

.mobile-drop-down {
    position: absolute;
    top: 10px;
    left: 0;
}
</style>
