<template>
<section class="s-tab mb-4" :class="getDynamicClasses" :ref="setRef">
    <div>
        <nav class="s-tab__header">
            <ul class="ma-0 pa-0">
                <li v-if="showAll" :class="{ active: selectedTab === 'all' }" @click="activeTab('all')" id="tab-header-all" class="s-tab__header__item">
                    <v-icon icon="mdi-message-processing-outline" class="ml-1"/>
                    <span>{{AllTitle}}</span>
                </li>

                <li v-for="(tab, index) in tabHeader" :key="`s-tab__${index}`"  :class="{ 'active': selectedTab === tab.name }" @click="activeTab(tab.name)" :id="`tab-header-${tab.name}`" class="s-tab__header__item">
                    <v-icon v-if="tab.icon" :icon="tab.icon" class="ml-1"/>
                    <span>{{tab.label}}</span>
                </li>
            </ul>
        </nav>
        <div class="s-tab__contents py-2" :class="{'active-scroll pl-5' : scroll}" :style="{height : `${height}`}">
            <div  class="s-tab__content">
                <component v-for="(item, index) in filteredData" :key="`tab-content-${index}`" :is="component" :content="item" />
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
            sortedTickets:[],
            selectedTab:'all',
            screenType:'desktop'
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
        showAll:Boolean,

        /**
         * get all Items
         */
        AllItems:Array,

         /**
         * All title for tab
         */
         AllTitle: String,

        /**
         * Get child component name
         */
        componentName: {
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
        scroll:Boolean,

        /**
         * Gey height for scroll with 'px'
         */
        height:{
            type:String,
            default: auth
        },
    },

    setup(props) {
        const {
            componentName
        } = props;
        const component = resolveComponent(componentName);

        return {
            component,
        };
    },

    computed: {
        filteredData() {
            if (this.selectedTab === 'all') {
                // Combine all ticket arrays into a single array
                return Object.values(this.items).flat();
            }

            return this.items[this.selectedTab]
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
        activeTab(status) {
            this.selectedTab = status;
        }
    },
}
</script>
    
<style>
@import '~/assets/scss/components/general/s-tab.scss';
</style>
