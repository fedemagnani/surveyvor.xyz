<template>
  <div class="w-screen h-screen bg-gray-100/30 fle items-center justify-center">
    <h1>SurveyDetail for Survey: {{ surveyId }}</h1>
    <div class="flex flex-row space-x-12 items-center justify-center">
      <router-link v-for="link in links" :key="link.name" :to="link.to" class="text-blue-500 hover:underline">
        {{ link.name }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const surveyId = route.params.id; // Replace with your actual route parameter name

  const links = [
    { name: 'ProducerSurveyWithdraw', to: { name: 'ProducerSurveyWithdraw', params: { id: surveyId } } },
    { name: 'ProducerSurveyPreview', to: { name: 'ProducerSurveyPreview', params: { id: surveyId } } },
    { name: 'ProducerSurveyData', to: { name: 'ProducerSurveyData', params: { id: surveyId } } },
  ];
</script>
