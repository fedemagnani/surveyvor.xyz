// store/index.js
import { createStore } from 'vuex';
import * as surveys from './surveys';
import * as router from './router';
import * as web3Modal from './web3Modal';

export default createStore({
    modules: {
        surveys,
        router,
        web3Modal,
    },
});
