// store/index.js
import { createStore } from 'vuex';
import * as survey from './survey';
import * as router from './router';

export default createStore({
    modules: {
        survey,
        router,
    },
});
