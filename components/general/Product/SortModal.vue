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

    <v-bottom-sheet v-if="sheet" v-model="sheet" color="white" height="auto">
        <div class="pt-4 pb-5 c-modal--sort bg-white px-3">
            <header class="d-flex justify-space-between align-center pb-1 pr-1">
                <span class="t16 w700 mb-1 text-sGrayDarken2">
                    مرتب سازی
                </span>

                <v-btn class="c-modal--sort__header__btn pa-0 text-none" @click="closeModal()" width="25" color="grey-darken-3" size="large" variant="icon">
                    <v-icon color="sGrayLighten1">mdi-close</v-icon>
                </v-btn>
            </header>

            <div class="d-flex flex-column">
                <template  v-for="(item, index) in sortItems" :key="`sort${index}`">
                    <div class="d-flex align-center c-modal--sort__items py-4" @click="selectSort(item)">
                        <v-icon v-if="sortModal === item.valueByType" icon="mdi-checkbox-outline" color="primary" class="ml-1"/>
                        <h3 class="t12 w700 flex-grow-1" :class="sortModal === item.valueByType ? 'text-primary' : 'text-sGrayDarken2'">{{ item.label }}</h3>
                    </div>
                </template>
            </div>
        </div>
    </v-bottom-sheet>
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
            sheet: false,
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
            this.sortModal = item.valueByType
            this.$emit('selectSort', item);
            this.closeModal();
        },

        openModal() {
            this.sheet = true;
        },

        closeModal() {
            this.sheet = false;
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

.c-modal--sort{
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;

    &__header {
        background: var(--Shade-white, #FFF);
        box-shadow: 0px 6px 6px -3px rgba(126, 126, 126, 0.20);

        &__btn {
            width: 25px !important;
            height: 25px !important;
            min-width: auto;
            background: #ececec;
            border-radius: 50%;
            margin: 10px;
        }
    }

    &__items{
        border-bottom: 1px solid #E8E8E8;

        &:last-child{
            border-bottom: 0 !important
        }

        h3{
            padding: 2px 0;
        }
    }
}
</style>
