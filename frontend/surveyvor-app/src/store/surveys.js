// store/survey.js

import axios from 'axios';

export const state = () => ({
    surveys: [],
    lastSurveysUpdate: new Date(),
    selectedSurvey: null,
});

export const mutations = {
    setSurveys(state, surveys) {
        state.surveys = surveys;
        state.lastSurveysUpdate = new Date();
    },
    setSelectedSurvey(state, survey) {
        state.selectedSurvey = survey;
    },
};

export const actions = {
    fetchSurveys({ commit }) {
        axios.get(process.env.VUE_APP_API_URL + '/api/surveys')
            .then((response) => {
                commit('setSurveys', response.data);
            });
    },
    fetchSurvey({ commit }, surveyId) {
        axios.get(process.env.VUE_APP_API_URL + '/api/surveys/' + surveyId)
            .then((response) => {
                commit('setSelectedSurvey', response.data);
            });
    },
};

export const getters = {
    getAllSurveys: (state) => state.surveys,
    getSelectedSurvey: (state) => state.selectedSurvey,
    getLastSurveysUpdate: (state) => state.lastSurveysUpdate,
};
