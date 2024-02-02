<template>
<section
    v-if="categories && categories.length"
    class="tab-slider mb-4"
    :class="getDynamicClasses"
    :ref="setRef">
    <header v-if="title" class="text-right t20 text-grey-darken-1 py-4 w500">
        {{title}}
    </header>

    <div>
        <nav class="tab-slider__header">
            <ul class="ma-0 pa-0">
                <li
                    v-for="(tab, index) in categories"
                    :key="`tab-slider__${index}`"
                    @click="activeTab(tab.id,setRef)"
                    :id="`tab-header-${tab.id}`"
                    :class="index == 0 ? 'active' : ''">
                    <span>{{tab.label}}</span>

                    <v-icon
                        v-if="columnHeader"
                        icon="mdi-chevron-left"
                        color="grey" />
                </li>
            </ul>
        </nav>
        <div class="tab-slider__contents">
            <div
                v-for="(item, index) in categories"
                class="tab-slider__content d-flex"
                :class="{ 'active': index === 0, 'flex-wrap': wrapContent }"
                :key="`tab-content-${item.id}`"
                :id="`tab-content-${item.id}`"
                :style="{ width: `${contentWidth}`, flex:`0 0 ${contentWidth}`}">

                <component
                    v-for="sku in item.skus.slice(0,limit)"
                    :key="`tab-skus-${sku.id}`"
                    :is="component"
                    v-bind=componentProps
                    :content="sku" />
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {
    resolveComponent
} from 'vue';
import {
    tr
} from "vuetify/locale";
export default {
    data() {
        return {
            headerItems: [],
            tabContents: null,
        }
    },

    props: {
        /**
         * List of item
         */
        items: Array,

        /**
         * section title
         */
        title: String,

        /**
         * Header be in an column near the content
         */
        columnHeader: {
            type: Boolean,
            default: false
        },

        /**
         * Content width for horizontal scroll
         */
        contentWidth: {
            type: String,
            default: '948px'
        },

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
         * Set flex wrap for `.tab-slider__content`
         */
        wrapContent: {
            type: Boolean,
            default: false
        },

        /**
         * Set limit for max of show content
         */
        limit: {
            type: Number,
            default: 5
        },

        setRef: {
            type: String,
            default: 'tab1'
        },
    },

    setup(props) {
        const {
            componentName
        } = props;
        const component = resolveComponent(componentName);

        return {
            component
        };
    },

    computed: {
        /**
         * Header for tab
         */
        tabHeader() {
            this.items.forEach(item => {
                const headerItem = {
                    label: item.title,
                    id: item.id
                }
                this.headerItems.push(headerItem)
            })
            return this.headerItems;
        },

        /**
         * Set dynamic class based my props
         */
        getDynamicClasses() {
            return {
                'column-header': this.columnHeader,
            };
        },
        categories() {
            try {
                return this.items.categories.slice(0, 6)
            } catch (e) {
                return []
            }
        }
    },

    methods: {
        /**
         * Active tabs by click
         */
        activeTab(id) {
            //**out of your component should set ref**
            const slider = this.$refs[this.setRef];

            const liItems = slider.querySelectorAll('li');
            const tabContents = slider.querySelectorAll('div.tab-slider__content');

            liItems.forEach(item => {
                item.classList.remove('active');
                slider.querySelector(`#tab-header-${id}`).classList.add('active');
            });

            tabContents.forEach(item => {
                item.classList.remove('active');
                slider.querySelector(`#tab-content-${id}`).classList.add('active');
            });
        }
    },

}
</script>

<style scoped>
@import '~/assets/scss/components/general/tab-slider.scss';
</style>
