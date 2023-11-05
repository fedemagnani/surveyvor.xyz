// store/index.js
import { createStore } from 'vuex';
import * as surveys from './surveys';

export default createStore({
    modules: {
        surveys,
    },
});
