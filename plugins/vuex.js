import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      loadingModal:false,
    };
  },
  mutations: {
    set_loadingModal(state , bool){
      state.loadingModal = bool
    },
    increment(state) {
      state.count++;
    },
  },
  getters:{
    get_loadingModal(state){
     return  state.loadingModal
    },
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});