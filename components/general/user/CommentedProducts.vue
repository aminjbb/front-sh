<template lang="">
<div class="product-comments">
    <v-row class="ma-0">
        <v-col
            cols="4"
            md="3"
            lg="2"
            class="pa-0">
            <div v-if="content.image && content.image.image_url" class="product-card__image d-flex justify-center align-center">
                <img :src="/* content?.image?.image_url */imageAddress(content?.image?.image_url)" :title="content.label" :alt="content.label" width="136" height="136" />
            </div>
        </v-col>

        <v-col
            cols="8"
            md="9"
            lg="10"
            class="pa-0 pos-r">
            <div class="product-comments__status mb-5 t12 w400 d-inline-block mt-5" :class="content.status === 'accept' ? 'product-comments__status--accept' : 'product-comments__status--reject'">{{getStatus(content.status)}}</div>
            <h3 v-if="content.label" class="t12 w400 text-grey-darken-1 mb-2 xs-hide">
                {{content.comment}}
            </h3>

            <div class="mobile-drop-down">
                <v-icon
                    icon="mdi-dots-vertical"
                    color="grey-darken-1"
                    @click="openDropDown(content.id)" />

                <nav class="mobile-drop-down__items pos-a" :id="`mobile-drop-down__items-${content.id}`">
                    <ul class="ma-0">
                        <li class="mb-2">
                            <a class="text-grey t14 d-flex align-center py-1" :href="editLink">
                                <v-icon
                                    icon="mdi-pen"
                                    class="ml-2"
                                    size="small"
                                    color="grey" />
                                <span class="text-grey t14">ویرایش نظر</span>
                            </a>
                        </li>

                        <li class="d-flex align-center py-1">
                            <generalModalsDelete
                                :getUserAddress="getUserAddress"
                                title="حذف نظر"
                                text="آیا از حذف نظر خود مطمئن هستید؟"
                                submitText="حذف نظر"
                                buttonType="mobile"
                                @removeProduct="removeComment(content)" />
                        </li>
                    </ul>
                </nav>
            </div>
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
        //TODO: Should delete after add endpoint
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/should-delete/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/should-delete/' + path]
        },

        /**
         * Get status persian 
         * @param {*} status 
         */
        getStatus(status) {
            if (status === 'accept') return 'تایید شده';
            else return 'رد شده';
        },

        /**
         * Open menu
         * @param {*} id 
         */
        openDropDown(id) {
            const itemDropdown = document.getElementById(`mobile-drop-down__items-${id}`);
            itemDropdown.classList.toggle('show');
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
