// store/survey.js
export const state = () => ({
    surveys: [],
    selectedSurvey: null,
});

export const mutations = {
    setSurveys(state, surveys) {
        state.surveys = surveys;
    },
    setSelectedSurvey(state, survey) {
        state.selectedSurvey = survey;
    },
};

export const actions = {
    fetchSurveys({ commit }) {
        commit('setSurveys',
            [
                {
                    id: 1,
                    name: 'Survey 1',
                    desciprtion: 'This is the first survey',
                    icon: 'https://picsum.photos/200',
                },
            ]
        );
    },
    selectSurvey({ commit }, survey) {
        commit('setSelectedSurvey', survey);
    },
};

export const getters = {
    getAllSurveys: (state) => state.surveys,
    getSelectedSurvey: (state) => state.selectedSurvey,
};
