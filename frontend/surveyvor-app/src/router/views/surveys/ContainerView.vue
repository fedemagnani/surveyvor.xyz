<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-indigo-600">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="-ml-2 flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="[
                    item.current ? 'bg-indigo-700 text-white' : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  ]"
                  :aria-current="item.current ? 'page' : undefined">
                  {{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <UserStatus />
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <header class="hidden bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between md:space-x-5">
          <div class="flex items-start space-x-5">
            <div class="pt-1.5">
              <h1 class="text-2xl font-bold text-gray-900">{{ currentSection }}</h1>
              <p class="text-sm font-medium text-gray-500">
                Last update on
                <time class="text-gray-900">{{ lastSurveyUpdate }}</time>
              </p>
            </div>
          </div>
          <div
            class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              @click="fetchSurveys"
              class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Refresh
            </button>
          </div>
        </div>
      </div>
    </header>
    <router-link
      :to="{ name: 'ProducerCreateSurveyWizard' }"
      type="button"
      class="fixed transform transition duration-300 ease-in-out right-16 bottom-8 items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-110 shadow-lg hover:shadow-2xl">
      Create new Survey
    </router-link>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { Disclosure } from '@headlessui/vue';

  import { computed, watch } from 'vue';

  // Get current route to set the current navigation item
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const filter = computed(() => {
    const { filter: f = 'explore' } = route.params;
    return f;
  });

  const navigation = computed(() => [
    { name: 'Explore', to: { path: '/surveys/l/explore', params: { filter: 'explore' } }, current: filter.value == 'explore' },
    { name: 'Answer', to: { path: '/surveys/l/answer', params: { filter: 'answer' } }, current: filter.value == 'answer' },
    { name: 'My surveys', to: { path: '/surveys/l/mySurveys', params: { filter: 'mySurveys' } }, current: filter.value == 'mySurveys' },
    { name: 'History', to: { path: '/surveys/l/history', params: { filter: 'history' } }, current: filter.value == 'history' },
  ]);

  // Refresh surveys function
  import { useStore } from 'vuex';
  const store = useStore();
  const fetchSurveys = () => store.dispatch('fetchSurveys');

  const address = computed(() => store.getters.getConnectionStatus.address);
  watch(address, (newVal) => {
    console.log('address changed', newVal);
    if (newVal) fetchSurveys();
  });

  const lastSurveyUpdate = computed(() => {
    const t = store.getters.getLastSurveysUpdate.toLocaleString();
    return t;
  });

  const currentSection = computed(() => {
    return navigation.value.find((item) => item.current)?.name;
  });

  import UserStatus from '@/components/UserStatus.vue';
</script>
