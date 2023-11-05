// store/survey.js

import axios from 'axios';

export const state = () => ({
    connectionState: {
        address: null,
        connected: false,
        chainId: null,
    },
    surveys: [],
    lastSurveysUpdate: new Date(),
    selectedSurvey: null,
});

export const mutations = {
    setConnectionState(state, connectionState) {
        state.connectionState = connectionState;
    },
    setSurveys(state, surveys) {
        state.surveys = surveys;
        state.lastSurveysUpdate = new Date();
    },
    setSelectedSurvey(state, survey) {
        state.selectedSurvey = survey;
    },
};

export const actions = {
    setConnectionState({ commit }, connection) {
        commit('setConnectionState', connection);
    },
    async fetchSurveys({ state, commit }) {
        const { address, chainId } = state.connectionState;
        if (!address || !chainId) return;
        commit('setSurveys', []);
        axios.request({
            url: process.env.VUE_APP_API_URL + '/api/surveys',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'AddressId': address,
                'ChainId': chainId
            },
        })
            .then((response) => {
                commit('setSurveys', response.data);
            });
    },
    async fetchSurvey({ state, commit }, surveyId) {
        const { address, chainId } = state.connectionState;
        if (!address || !chainId) return;
        // commit('setSelectedSurvey', null);
        axios.request({
            url: process.env.VUE_APP_API_URL + '/api/surveys/' + surveyId,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'AddressId': address,
                'ChainId': chainId
            },
        }).then((response) => {
            commit('setSelectedSurvey', response.data);
        });
    },
};

export const getters = {
    getConnectionStatus: (state) => state.connectionState,
    getAllSurveys: (state) => state.surveys,
    getSelectedSurvey: (state) => state.selectedSurvey,
    getLastSurveysUpdate: (state) => state.lastSurveysUpdate,
};
