// store/survey.js
export const state = () => ({
    loggedin: false,
    userType: null,
});


export const mutations = {
    setLoggedin(state, loggedin) {
        state.loggedin = loggedin;
    },
    setUserType(state, userType) {
        state.userType = userType;
    },
    setPath(_, path) {
        this.$router.push(path);
    }
};

export const actions = {
    login({ commit }, userType) {
        commit('setLoggedin', true);
        commit('setUserType', userType);
    },
    logout({ commit }) {
        commit('setLoggedin', false);
        commit('setUserType', null);
    },
    goTo({ commit }, path) {
        commit('setPath', path);
    }
};