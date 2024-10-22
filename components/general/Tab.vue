<template>
<section class="s-tab mb-4" :class="getDynamicClasses" :ref="setRef">
    <div>
        <nav class="s-tab__header">
            <ul class="ma-0 pa-0">
                <li v-if="showAll" :class="{ active: selectedTab === 'all' }" @click="activeTab('all')" id="tab-header-all" class="s-tab__header__item">
                    <v-icon :icon="allIcon" class="ml-2" color="sGrayLighten2"/>
                    <span>{{ AllTitle }}</span>
                </li>

                <li v-for="(tab, index) in tabHeader" :key="`s-tab__${index}`" :class="{ 'active': selectedTab === tab.name }" @click="activeTab(tab.name , tab.label)" :id="`tab-header-${tab.name}`" class="s-tab__header__item">
                    <v-icon v-if="tab.icon" :icon="tab.icon" class="ml-2" color="sGrayLighten2"/>
                    <span>{{ tab.label }}</span>
                </li>
            </ul>
        </nav>
        <div class="s-tab__contents py-2" :class="{'active-scroll pl-4' : scroll}" :style="{height : `${height}`}">
            <div class="s-tab__content">
                <template v-if="filteredData?.length">
                    <template v-for="(item, index) in filteredData" :key="`tab-content-${index}`">
                        <component v-if="activeExtraComponent === true && item.is_gift" :is="extraComponent" :content="item" @updateList="updateList"/>
                        <component v-else  :is="component" :content="item" @updateList="updateList"/>
                    </template>
                </template>

                <div v-else class="flex-grow-1 d-flex flex-column mb-8">
                    <div class="d-flex flex-column justify-center align-center pt-10">
                        <img :src="imageAddress(emptyImage)" class="ml-10" alt="ticket image" width="171" height="162">

                        <span class="t18 w700 text-sGrayDarken2 mt-2">در این بخش {{ emptyTitle }} وجود ندارد</span>

                        <p class="t12 w500 text-sGrayDarken1 mt-3 mb-6">
                            {{ emptyText }}
                        </p>

                        <v-btn v-if="!hideButton" :href="emptyButtonLink" height="44" :title="emptyButtonText" color="primary" prepend-icon="mdi-message-processing-outline" class="btn btn--submit br12 px-7">
                            {{emptyButtonText}}
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
  
<script>
import {
    resolveComponent
} from 'vue';
import auth from '~/middleware/auth';

export default {
    data() {
        return {
            headerItems: [],
            tabContents: null,
            sortedTickets: [],
            selectedTab: 'all',
            selectedTabLabel: '',
            screenType: 'desktop'
        }
    },

    props: {
        /**
         * List of items that sort by 'x'
         */
        items: Object,

        /**
         * List of tab header items with 'name and label'
         */
        tabHeader: Array,

        /**
         * Active 'All' in tab
         */
        showAll: Boolean,

        /**
         * get all Items
         */
         allItems: Array,

        /**
         * All title for tab
         */
        AllTitle: String,

        /**
         * All icon for all tab
         */
        allIcon:{
            type: String,
            default:'mdi-message-processing-outline'
        },

        /**
         * Get child component name
         */
        componentName: {
            type: String,
            default: 'generalProductCard'
        },

        /**
         * Active extra component
         */
        activeExtraComponent:Boolean,

        /**
         * Extra component name
         */
        extraComponentName: {
            type: String,
            default: 'generalProductCard'
        },

        /**
         * Get child component props
         */
        componentProps: {
            type: Object,
            default: {},
        },

        /**
         * Active 'scroll'
         */
        scroll: Boolean,

        /**
         * Gey height for scroll with 'px'
         */
        height: {
            type: String,
            default: auth
        },


        emptyTitle: String,
        emptyText: String,
        hideButton:Boolean,
        emptyButtonText: String,
        emptyButtonLink: String,
        emptyImage: String,
    },

    setup(props) {
        const {
            componentName
        } = props;
        const component = resolveComponent(componentName);

        const {
            extraComponentName
        } = props;
        const extraComponent = resolveComponent(extraComponentName);

        return {
            component,
            extraComponent
        };
    },

    computed: {
        filteredData() {
            try {
                if (this.selectedTab === 'all') {
                    // Combine all ticket arrays into a single array
                    if(this.allItems && this.allItems.length){
                        return this.allItems
                    }else{
                        return Object.values(this.items).flat();
                    }
                }

                return this.items[this.selectedTab]
            } catch (e) {
                return []
            }
        }
    },

    beforeMount() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';

    },

    methods: {
        /**
         * Show tab data
         */
        activeTab(status, label) {
            this.selectedTab = status;
            this.selectedTabLabel = label;
        },

        /**
         * Image address
         * @param {*} path 
         */
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/' + path]
        },

        /**
         * Update form if card in tab has function
         * @param {*} value 
         */
        updateList(value){
            if(value === true){
                this.$emit('updateList', value)
            }
        }
    },
}
</script>
  
  
<style>
@import '~/assets/scss/components/general/s-tab.scss';
</style>
