<template>
  <client-only>
    <div class="header__search-box" id="header__search-box">
      <div v-if="buttonType === 'form'" class="header__search-box__inner header__search-box__inner--show d-flex align-center w-100 px-2" @click="openModal()">
        <v-icon
            icon="mdi-magnify"
            color="sGrayDarken1"
            class="ml-1" />
          <span class="header__search-box__brand-name">شاواز</span>
        <input placeholder="جستجو در " id="inputSearchMobile"/>
      </div>

      <div v-if="buttonType === 'icon'" @click="openModal()">
        <v-icon
            icon="mdi-magnify"
            color="sGrayDarken1"
            class="icon-mode ml-1" />
      </div>

      <v-dialog
          v-if="dialog"
          v-model="dialog"
          color="white"
          class="z-infinite"
          fullscreen>
        <div class="header__search-box active bg-white">
          <div class="header__search-box__inner d-flex align-center w-100 px-2">
            <v-icon
                icon="mdi-arrow-right"
                color="sGrayDarken1"
                @click="closeModal"
                class="ml-2" />

           <client-only>
             <form @submit.prevent="showResultPlp" class="flex-grow-1">
               <input placeholder="جستجو در شاواز " class="w-100" v-model="search" @keyup="searchInSite()" >
             </form>
           </client-only>
          </div>

          <div class="search-result" id="search-result">
            <v-divider color="primary" />
            <swiper
                v-if="searchResult && searchResult.skus && searchResult.skus.length"
                dir="rtl"
                :slidesPerView="3.2"
                :spaceBetween="8"
                :modules="modules"
                :navigation="true"
                :breakpoints="{
                        '0': {
                            slidesPerView: 1.3,
                        },
                        '480': {
                            slidesPerView: 1.8,
                        },
                        '768': {
                            slidesPerView: 3.2,
                        },
                        '991': {
                            slidesPerView: 3.2,
                        }
                    }"
                    class="mySwiper search-result__sku">
                    <swiper-slide v-for="(item, index) in searchResult.skus.slice(0,10)" :key="`sku-search-${index}`">
                        <a class="d-flex align-center search-result__sku__item pa-2 py-1 bg-grey-lighten-3" :href="`/sku/${item.slug}`">
                            <div v-if="item.image" class="search-result__sku__image">
                                <img data-not-lazy :src="item.image?.image_url" :title="item.label" :alt="item.label" width="48" height="48" />
                            </div>

                  <h3 v-if="item.label" class="t11 w400 text-grey-darken-1">
                    {{item.label}}
                  </h3>
                </a>
              </swiper-slide>
            </swiper>

            <v-divider v-if="(searchResult && searchResult.categories && searchResult.categories.length) || (searchResult && searchResult.brands && searchResult.brands.length)" color="grey-lighten-3" />

            <v-row class="ma-0">
              <v-col
                  cols="12"
                  sm="6"
                  class="pa-0">
                <div
                    v-if="searchResult && searchResult.categories && searchResult.categories.length"
                    class="search-result__list search-result__list--border pa-3 pb-1">
                  <header>
                    <h2 class="t14 w400 text-grey-darken-4 mb-2">دسته‌بندی‌های مرتبط</h2>
                  </header>

                  <nav>
                    <ul class="ma-0">
                      <li
                          class="mb-2"
                          v-for="(item, index) in searchResult.categories.slice(0,5)"
                          :key="`category-search-${index}`">
                        <a class="t13 w400 text-grey-darken-2" :href="`/category/${item.slug}`">
                          {{item.label}}
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  class="pa-0">
                <div
                    v-if="searchResult && searchResult.brands && searchResult.brands.length"
                    class="search-result__list pa-3 pb-1">
                  <header>
                    <h2 class="t14 w400 text-grey-darken-4 mb-2">برندهای مرتبط</h2>
                  </header>

                  <nav>
                    <ul class="ma-0">
                      <li
                          class="mb-2"
                          v-for="(item, index) in searchResult.brands.slice(0,5)"
                          :key="`category-search-${index}`">
                        <a class="t13 w400 text-grey-darken-2" :href="`/brand/${item.slug}`">
                          {{item.label}}
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </v-col>
            </v-row>

            <v-divider v-if="filteredWords && filteredWords.length" color="grey-lighten-3" />

            <nav v-if="filteredWords && filteredWords.length" class="search-result__list py-3">
              <ul class="ma-0">
                <li
                    class="mb-2"
                    v-for="(item, index) in filteredWords.slice(0,5)"
                    :key="`category-search-${index}`">
                  <a class="d-flex align-center cur-p pos-r" @click="setModel(item)">
                    <v-icon
                        icon="mdi-magnify"
                        size="x-small"
                        color="grey-lighten-1"
                        class="ml-2" />
                    <span class="t13 w400 text-grey-darken-2" v-html="highlightWord(item)"></span>
                  </a>
                </li>
              </ul>
            </nav>

            <v-divider color="grey-lighten-3" />

            <div class="search-result__most-search">
              <p class="t13 w400 text-grey-darken-3 mb-1 mt-5">بیشترین جستجوهای اخیر</p>

              <swiper
                  v-if="mostSearchItems && mostSearchItems.data && mostSearchItems.data.length"
                  dir="rtl"
                  :slidesPerView="'auto'"
                  :spaceBetween="8"
                  :modules="modules"
                  :navigation="true"
                  class="mySwiper">
                <swiper-slide v-for="(item, index) in mostSearchItems.data.slice(0,15)" :key="`most-search-${index}`">
                  <a class="search-result__most-search__item t12 w400 px-3 py-1 bg-grey-lighten-3 text-grey-darken-2 cur-p" @click="SearchMostSearchItem(item.needle)">
                    {{item.needle}}
                  </a>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </v-dialog>
    </div>

  </client-only>
</template>

<script>
// Import Swiper Vue.js components
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import {
    Navigation
} from 'swiper/modules';

import Search from '@/composables/Search.js';

import axios from "axios";

export default {
    data() {
        return {
            search: null,
            dialog: false,
            searchResult:[],
            searchNew: null,
            timeDebounce:null,
        }
    },

    props:{
      buttonType:{
        type: String,
        default: 'form',
      }
    },

    computed: {
        filteredWords() {
            if(this.searchResult && this.searchResult.last_searches && this.searchResult.last_searches.length){
                return this.searchResult.last_searches.filter(word => word.includes(this.search));
            }else{
                return '';
            }
            
        }
    },

    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        const runtimeConfig = useRuntimeConfig()

        const {
            getMostSearch,
            mostSearchItems
        } = new Search()

        return {
            runtimeConfig,
            modules: [Navigation],
            getMostSearch,
            mostSearchItems
        };
    },

    methods: {
        openModal() {
          console.log('salammmm :D')
            this.dialog = true;
            if(this.buttonType === 'form'){
              document.getElementById('inputSearchMobile').blur();
            }
            this.getMostSearch();
        },

        closeModal() {
            this.dialog = false;
        },

        /**
         * Show Result in PLP search
         */
        showResultPlp(){
            window.location = `/search?needle=${this.search}`;
        },

        /**
         * Search
         */
        searchInSite(){
          clearTimeout(this.timeDebounce)
          this.timeDebounce = setTimeout(()=>{
            if(this.search !== null && this.search !== this.searchNew){
              this.searchNew = this.search;
              axios
                  .post(this.runtimeConfig.public.apiBase + `/search/general?needle=${this.search}`)
                  .then((response) => {
                    this.searchResult = response?.data?.data;
                  });
            }
          }, 200)

        },


        /**
         * Search By most search label
         */
        SearchMostSearchItem(label){
            this.search = label;

            axios
                .post(this.runtimeConfig.public.apiBase + `/search/general?needle=${label}`)
                .then((response) => {
                    this.searchResult = response?.data?.data;
                })
                .catch((err) => {
                }).finally(() => {
                });
        },

         /**
         * Search by clicking data
         */
         setModel(word){
            this.search = word;

            this.searchInSite()
        },

        /**
         * Highlight word when you search in search box
         */
         highlightWord(word) {
            const index = word.toLowerCase().indexOf(this.search.toLowerCase());
            if (index !== -1) {
                const highlightedWord = word.substring(0, index) + '<span class="text-primary">' + word.substring(index, index + this.search.length) + '</span>' + word.substring(index + this.search.length);
                return highlightedWord;
            } else {
                return word;
            }
        },
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.search-result {
    .swiper-button-prev,
    .swiper-button-next {
        background: var(--Shade-white, #FFF);
        border: 1px solid #9E9E9E;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        top: 28px;

        &::after {
            color: #D72685;
            font-size: 15px !important;
        }
    }

    .swiper-slide {
        display: flex;
    }

    &__sku {
        padding: 20px 0;

        &__item {
            border-radius: 4px;
            overflow: hidden;
        }

        &__image {
            width: 48px;
            flex: 0 0 48px;
            margin-left: 7px;
            height: 100%;
            height: 48px;

            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .swiper-button-prev,
        .swiper-button-next {
            top: 55%
        }
    }

    &__list {
        height: 100%;

        &--border {
            border-left: 1px solid #E0E0E0;

            @include gbp(0, 480) {
                border-left: 0 !important;
                border-bottom: 1px solid #E0E0E0
            }
        }

        li {
            list-style: none;
        }
    }

    &__most-search {
        .swiper {
            padding: 8px 0 !important;
        }

        .swiper-slide {
            width: auto !important;
        }

        &__item {
            border-radius: 4px;
        }
    }

    .search-cover{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
        background: transparent;
    }
}
</style>
