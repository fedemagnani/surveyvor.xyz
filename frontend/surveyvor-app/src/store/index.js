// store/index.js
import { createStore } from 'vuex';
import * as surveys from './surveys';
import * as router from './router';

export default createStore({
    modules: {
        surveys,
        router,
    },
});
