// router.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'HomeView',
        path: '/',
        component: () => import('./views/HomeView.vue'),
    },
    {
        name: 'LoginView',
        path: '/login',
        component: () => import('./views/LoginView.vue'),
    },


    {
        name: 'SurveysView',
        path: '/surveys',
        component: () => import('./views/surveys/ContainerView.vue'),
        children: [

            // Common
            {
                name: 'SurveysExploreView',
                path: ':filter',
                alias: '',
                component: () => import('./views/surveys/sub/ExploreView.vue'),
            },
            /* 
                      {
                           name: 'SurveyDetailsContainerView',
                           path: ':id',
                           component: () => import('./views/surveys/sub/details/ContainerView.vue'),
                           children: [
           
                               // Common
                               {
                                   name: 'SurveyPreviewView',
                                   path: 'preview',
                                   component: () => import('./views/surveys/sub/details/sub/PreviewView.vue'),
                               },
                               {
                                   name: 'SurveyTopupView',
                                   path: 'topup',
                                   component: () => import('./views/surveys/sub/details/sub/TopupView.vue'),
                               },
           
                               // Consumer
                               {
                                   path: 'answer/wizard',
                                   component: () => import('./views/surveys/sub/details/sub/aswerWizard/ContainerView.vue'),
                                   children: [
                                       {
                                           path: 'presurvey',
                                           component: () => import('./views/surveys/sub/details/sub/aswerWizard/sub/PresurveyView.vue'),
                                       },
                                       {
                                           path: 'survey',
                                           component: () => import('./views/surveys/sub/details/sub/aswerWizard/sub/SurveyView.vue'),
                                       },
                                       {
                                           path: 'result',
                                           component: () => import('./views/surveys/sub/details/sub/aswerWizard/sub/ResultView.vue'),
                                       },
                                   ]
                               },
           
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
                                   name: 'ProducerCreateSurveyWizard',
                                   path: 'create/wizard',
                                   component: () => import('./views/surveys/sub/details/sub/createWizard/ContainerView.vue'),
                                   children: [
                                       {
                                           name: 'ProducerCreateSurveyWizardGeneral',
                                           path: 'general',
                                           component: () => import('./views/surveys/sub/details/sub/createWizard/sub/GeneralView.vue'),
                                       },
                                       {
                                           name: 'ProducerCreateSurveyWizardLicenseType',
                                           path: 'licensetype',
                                           component: () => import('./views/surveys/sub/details/sub/createWizard/sub/LicenseTypeView.vue'),
                                       },
                                       {
                                           name: 'ProducerCreateSurveyWizardBudget',
                                           path: 'budget',
                                           component: () => import('./views/surveys/sub/details/sub/createWizard/sub/BudgetView.vue'),
                                       },
                                       {
                                           name: 'ProducerCreateSurveyWizardOpenCampaign',
                                           path: 'opencampaign',
                                           component: () => import('./views/surveys/sub/details/sub/createWizard/sub/OpenCampaignView.vue'),
                                       },
                                   ]
                               }
           
                           ],
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