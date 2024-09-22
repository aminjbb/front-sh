<template>
<div class="c-modal">
    <div class="product-mobile-control d-flex justify-end align-center" @click="openModal()">
        <v-icon icon="mdi-sort-ascending" color="grey-darken-2" class="ml-2" />

        <span class=" t12 w700">
            <template v-if="sortTypeLabel !== null">{{ sortTypeLabel }}</template>
            <template v-else-if="sortModal && sortModal.label">{{ sortModal.label }}</template>
            <template v-else>جدیدترین</template>
        </span>
    </div>

    <v-dialog v-if="dialog" v-model="dialog" color="white" fullscreen>
        <v-card class="pt-2 pb-5 c-modal--comment">
            <header class="c-modal--comment__header d-flex justify-space-between align-center pb-1 pr-6 pl-2">
                <div class="d-flex flex-column c-modal--comment__header__title">
                    <span class="t16 w400 mb-1">
                        مرتب سازی براساس
                    </span>
                </div>

                <v-btn class="c-modal--comment__header__btn pa-0 text-none" @click="closeModal()" width="25" color="grey-darken-3" size="large" variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div class="d-flex flex-column">


                <template  v-for="(item, index) in sortItems" :key="`sort${index}`">
                    <div class="d-flex align-center">
                        <v-checkbox class="sort-checkbox" v-model="sortModal" @change="selectSort(item)" hide-details :value="item.valueByType" />
                        <h3 class="t15 w400 text-grey-darken-2 flex-grow-1">{{ item.label }}</h3>
                    </div>
                </template>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    props:{
        sortItems: {
            type: Array,
            default: null
        },
        sortType : null,
        orderType: null
    },

    data() {
        return {
            dialog: false,
            sortModal: null,
            sortTypeLabel: null,
        }
    },
    watch: {
        $route(newVal){
            if(newVal ?.query?.order_type && newVal ?.query?.order){
                this.sortModal = newVal ?.query?.order;

                if( newVal ?.query?.order === 'seen_count'){
                        this.sortTypeLabel = 'محبوب ترین '
                }
                if( newVal ?.query?.order === 'created_at'){
                        this.sortTypeLabel = 'جدیدترین'
                }
                if( newVal ?.query?.order === 'site_price' && newVal ?.query?.order_type === 'asc'){
                        this.sortTypeLabel = 'ارزان‌ترین',
                        this.sortModal = 'site_price_asc';
                }
                if( newVal ?.query?.order === 'site_price' && newVal ?.query?.order_type === 'desc'){
                        this.sortTypeLabel = 'گران‌ترین',
                        this.sortModal = 'site_price_desc';
                }
                if( newVal ?.query?.order === 'discount'){
                        this.sortTypeLabel = 'بیشترین تخفیف'
                }
            }
        },
    },

    methods: {
        /**
         * Emit sort Data for sorting page
         */
        selectSort(item) {
            this.$emit('selectSort', item);
            this.closeModal();
        },

        openModal() {
            this.dialog = true;
        },

        closeModal() {
            this.dialog = false;
        },
    },

    mounted(){
        if(this.sortType !== null){
            this.sortModal = this.sortType;

           if( this.sortType === 'seen_count'){
                this.sortTypeLabel = 'محبوب ترین '
           }
           if( this.sortType === 'created_at'){
                this.sortTypeLabel = 'جدیدترین'
           }
           if( this.sortType === 'site_price' && this.orderType === 'asc'){
                this.sortTypeLabel = 'ارزان‌ترین'
                this.sortModal = 'site_price_asc';
           }
           if( this.sortType === 'site_price' && this.orderType === 'desc'){
                this.sortTypeLabel = 'گران‌ترین'
                this.sortModal = 'site_price_desc';
           }
           if( this.sortType === 'discount'){
                this.sortTypeLabel = 'بیشترین تخفیف'
           }
        }
    }
}
</script>

<style lang="scss" scoped>
.sort-checkbox {
    width: 50px;
    flex: 0 0 50px;
}

.c-modal--comment__header {
    background: var(--Shade-white, #FFF);
    box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.20);
}

.c-modal--comment__header__btn {
    width: 25px !important;
    height: 25px !important;
    min-width: auto;
    background: #ececec;
    border-radius: 50%;
    margin: 10px;
}
</style>
