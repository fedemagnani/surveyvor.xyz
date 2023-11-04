// store/survey.js
const defaultState = {
    address: null,
    connected: false,
};

export const state = () => ({
    modal: null,
    connectionState: { ...defaultState },
});

export const mutations = {
    setModal(state, modal) {
        state.modal = modal;
    },
    setConnectionState(state, connectionState) {
        state.connectionState = connectionState;
    },
};

export const actions = {
    setWeb3Modal({ commit }, modal) {
        commit('setModal', modal);
    },
    setConnectionState({ state, commit }) {
        console.log('setConnectionState', state.modal.getAddress());
        if (state.modal)
            commit('setConnectionState', {
                address: state.modal.getAddress() || null,
                connected: state.modal.getIsConnected() || false,
            });
    },
};

export const getters = {
    getConnectionStatus(state) { return state.connectionState; },
};
