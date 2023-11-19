<template lang="">
<section class="tab-slider1 tab-slider1--desktop mb-4">
    <header v-if="title" class="text-right t20 text-grey-darken-1 py-4">
        {{title}}
    </header>

    <div>
        <nav class="tab-slider1__header">
            <ul class="ma-0 pa-0 d-flex flex-column">
                <li
                    v-for="(tab, index) in tabHeader"
                    @click="activeTab(tab.id)"
                    :id="`tab-header-${tab.id}`"
                    :class="index == 0 ? 'active' : ''">
                    {{tab.label}}
                    <v-icon icon="mdi-chevron-left" color="grey" />
                </li>
            </ul>
        </nav>
        <div class="tab-slider1__contents">
            <div
                v-for="(item, index) in items"
                class="tab-slider1__content d-flex"
                :class="index == 0 ? 'active' : ''"
                :key="`tab-content-${item.id}`"
                :id="`tab-content-${item.id}`">

                <generalProductCard
                    v-for="sku in item.skus"
                    :key="`tab-skus-${sku.id}`"
                    :content="sku"
                    hideInfo />
            </div>
        </div>
    </div>
</section>
</template>

<script>
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
    },

    computed: {
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
    },

    methods: {
        /**
         * Active tabs by click
         */
        activeTab(id) {
            const slider = document.querySelector('.tab-slider1');
            const liItems = slider.querySelectorAll('li');

            const tabContents = slider.querySelectorAll('div.tab-slider1__content');

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
@import '~/assets/scss/components/desktop/home/tab-slider1.scss';
</style>
