import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        vuexStoredGeoData: 99
    },
    mutations: {
        setNewGeolocationData (state, value) {
            // mutate state
            state.vuexStoredGeoData = value;
        }
    }
});

export default store