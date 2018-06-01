import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        safelyStoredNumber: 99
    },
    mutations: {
        setNewGeolocationData (state, value) {
            // mutate state
            state.safelyStoredNumber = value;
        }
    }
});

export default store