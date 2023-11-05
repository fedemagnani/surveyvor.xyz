// router.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'HomeView',
        path: '/',
        component: () => import('./views/HomeView.vue'),
    },
    {
        name: 'SurveysView',
        path: '/surveys',
        component: () => import('./views/surveys/ContainerView.vue'),
        children: [

            // Common
            {
                name: 'SurveysExploreView',
                path: 'l/:filter',
                alias: '',
                component: () => import('./views/surveys/sub/ExploreView.vue'),
            },
            {
                name: 'SurveyDetailsContainerView',
                path: 'd/:id',
                component: () => import('./views/surveys/sub/details/ContainerView.vue'),
                children: [

                    // Common
                    {
                        name: 'SurveyPreviewView',
                        path: 'preview',
                        alias: '',
                        component: () => import('./views/surveys/sub/details/sub/PreviewView.vue'),
                    },
                    // Consumer
                    {
                        name: 'answerWizardView',
                        path: 'answer/wizard',
                        component: () => import('./views/surveys/sub/details/sub/aswerWizard/ContainerView.vue'),
                        children: [
                            {
                                name: 'answerWizardPresurveyView',
                                path: 'survey',
                                alias: '',
                                component: () => import('./views/surveys/sub/details/sub/aswerWizard/sub/PresurveyView.vue'),
                            },
                        ]
                    },
                ]
            },
            {
                name: 'ProducerCreateSurveyWizard',
                path: 'create/wizard',
                component: () => import('./views/surveys/sub/details/sub/createWizard/ContainerView.vue'),
            },
            /*                    
          
          
                              // Producer
                              {
                                  name: 'ProducerSurveyWithdraw',
                                  path: 'withdraw',
                                  component: () => import('./views/surveys/sub/details/sub/WithdrawView.vue'),
                              },
                              {
                                  name: 'ProducerSurveyData',
                                  path: 'data',
                                  component: () => import('./views/surveys/sub/details/sub/DataView.vue'),
                              },
                              
                              {
                                  name: 'SurveyTopupView',
                                  path: 'topup',
                                  component: () => import('./views/surveys/sub/details/sub/TopupView.vue'),
                              },
          */

        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
