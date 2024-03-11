<template>
<section class="complete-details mt-10">
    <nav class="xs-hide">
        <ul class="complete-details__tabs d-flex pa-0 ma-0 w-100" ref="detailsRef">
            <li
                v-if="description"
                class="pos-r flex-grow-1 py-3 active"
                @click="activeTab(1)"
                id="complete-details__tab--1">
                <a class="d-flex align-center justify-center w-100" href="#product-desc">
                    <v-icon
                        icon="mdi-note-text-outline"
                        color="grey"
                        class="ml-1" />

                    <span class="t14 w500 text-grey-darken-1">نقد و بررسی</span>
                </a>
            </li>

            <li
                v-if="instructions"
                class="pos-r flex-grow-1 py-3"
                @click="activeTab(2)"
                id="complete-details__tab--2">
                <a class="d-flex align-center justify-center" href="#product-info">
                    <v-icon
                        icon="mdi-list-status"
                        color="grey"
                        class="ml-1" />

                    <span class="t14 w500 text-grey-darken-1">مشخصات محصول</span>
                </a>
            </li>

            <li
                v-if="userUse"
                class="pos-r flex-grow-1 py-3"
                @click="activeTab(3)"
                id="complete-details__tab--3">
                <a class="d-flex align-center justify-center" href="#product-instructions">
                    <v-icon
                        icon="mdi-face-man-shimmer-outline"
                        color="grey"
                        class="ml-1" />

                    <span class="t14 w500 text-grey-darken-1">روش استفاده</span>
                </a>
            </li>

            <li
               v-if="advantages || disadvantages"
                class="pos-r flex-grow-1 py-3"
                @click="activeTab(4)"
                id="complete-details__tab--4">
                <a class="d-flex align-center justify-center" href="#product-adv">
                    <v-icon
                        icon="mdi-tag-check-outline"
                        color="grey"
                        class="ml-1" />

                    <span class="t14 w500 text-grey-darken-1">مزایا و معایب</span>
                </a>
            </li>

            <li
                class="pos-r flex-grow-1 py-3"
                @click="activeTab(5)"
                id="complete-details__tab--5">
                <a class="d-flex align-center justify-center" href="#comments">
                    <v-icon
                        icon="mdi-comment-outline"
                        color="grey"
                        class="ml-1" />
                    <span class="t14 w500 text-grey-darken-1">دیدگاه مخاطبان</span>
                </a>
            </li>
        </ul>
    </nav>

    <div>
        <div class="complete-details__desc" id="product-desc" v-if="description" >
            <header class="d-flex align-center">
                <v-icon
                    icon="mdi-note-text-outline"
                    color="grey"
                    class="ml-2 xs-show" />
                <h3 class="t20 w400 text-grey-darken-1 product-section-header my-5">نقد و بررسی</h3>
            </header>

            <p
                class="t14 w400 l25 text-grey"
                v-if="description"
                v-html="description"></p>
          <span class="d-flex align-center t12 w400 text-primary cur-p" id="show-more" @click="showMore()">
                    <span id="show-more-span">مشاهده بیشتر</span>

                    <v-icon
                        id="show-more-icon"
                        class="mr-1"
                        icon="mdi-plus"
                        size="x-small"
                        color="primary" />
                </span>
          <v-divider color="grey" class="mt-5" />
        </div>



        <div class="complete-details__product-info" id="product-info" v-if="instructions">
            <header class="d-flex align-center">
                <v-icon
                    icon="mdi-list-status"
                    color="grey"
                    class="ml-2 xs-show" />
                <h3 class="t20 w400 text-grey-darken-1 product-section-header my-5">مشخصات محصول</h3>
            </header>

            <div v-if="attrs" class="complete-details__product-info__table mt-2 mb-7">
                <div class="d-flex align-center w-100 pa-0" v-for="(attr, index) in attrs" :key="`tab1${index}`">
                    <div class="text-grey t13 w400 pr-2 pl-10 py-3">{{attr.attribute}}</div>
                    <div class="text-grey-darken-2 t14 w400 number-font pr-3 py-3 flex-grow-1">{{attr.value}}</div>
                </div>
            </div>
          <v-divider color="grey" class="mt-5" />
        </div>



        <div class="complete-details__product-instructions" id="product-instructions" v-if="userUse">
            <header class="d-flex align-center">
                <v-icon
                    icon="mdi-face-man-shimmer-outline"
                    color="grey"
                    class="ml-2 xs-show" />
                <h3 class="t20 w400 text-grey-darken-1 product-section-header my-5">روش استفاده</h3>
            </header>

            <template v-if="userUse">
                <p
                    class="t14 w400 text-grey l24"
                    v-html="instructions"/>

              <v-divider color="grey-lighten-1" class="my-2"/>
            </template>



            <header class="d-flex align-center">
                <v-icon
                    icon="mdi-face-man-shimmer-outline"
                    color="grey"
                    class="ml-2 xs-show" />
                <h3 class="t20 w400 text-grey-darken-1 product-section-header my-5">توضیحات</h3>
            </header>

            <p
                class="t14 w400 text-grey l24"
                v-html="userUse"/>
          <v-divider color="grey" class="mt-5" />
        </div>



        <div class="complete-details__product-adv" id="product-adv"  v-if="advantages || disadvantages">
            <header class="d-flex align-center">
                <v-icon
                    icon="mdi-tag-check-outline"
                    color="grey"
                    class="ml-2 xs-show" />

                <h3 class="t20 w400 text-grey-darken-1 product-section-header my-5">مزایا و معایب</h3>
            </header>

            <div v-if="advantages">
                <div class="d-flex align-center my-3">
                    <v-icon
                        color="success"
                        class="ml-2"
                        icon="mdi-thumb-up-outline" />

                    <span class="t16 w400 text-success">مزایا</span>
                </div>

                <p class="t12 w400 l20 text-grey" v-html="advantages" />
            </div>

            <div v-if="disadvantages">
                <div class="d-flex align-center my-3">
                    <v-icon
                        color="danger"
                        class="ml-2"
                        icon="mdi-thumb-down-outline" />

                    <span class="t16 w400 text-danger">معایب</span>
                </div>

                <p class="t12 w400 l20 text-grey" v-html="disadvantages" />

            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    props: {
        description: String,
        attrs: Array,
        instructions: String,
        advantages: String,
        disadvantages: String,
        userUse:String,
    },

    methods: {
        /**
         * show more button
         */
        showMore() {
            this.show = !this.show;
            if (this.show === true) {
                document.getElementById('show-more-icon').classList.remove('mdi-plus')
                document.getElementById('show-more-icon').classList.add('mdi-minus');
                document.getElementById('show-more-span').innerHTML = 'مشاهده کمتر';
            }
            if (this.show === false) {
                document.getElementById('show-more-icon').classList.remove('mdi-minus');
                document.getElementById('show-more-icon').classList.add('mdi-plus');
                document.getElementById('show-more-span').innerHTML = 'مشاهده بیشتر';
            }

        },

        /**
         * Active tab
         * @param {*} id 
         */
        activeTab(id) {
            const tab = this.$refs['detailsRef'];

            const liItems = tab.querySelectorAll('li');

            liItems.forEach(item => {
                item.classList.remove('active');
                tab.querySelector(`#complete-details__tab--${id}`).classList.add('active');
            });
        }
    },
}
</script>
