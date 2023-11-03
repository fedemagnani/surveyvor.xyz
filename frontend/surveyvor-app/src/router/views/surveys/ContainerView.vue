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
              <button
                type="button"
                class="hidden ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100">
                Create new Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between md:space-x-5">
          <div class="flex items-start space-x-5">
            <div class="pt-1.5">
              <h1 class="text-2xl font-bold text-gray-900">{{ currentSection }}</h1>
              <p class="text-sm font-medium text-gray-500">
                Last update on
                <time datetime="2023-11-03" class="text-gray-900">November 3, 2023</time>
              </p>
            </div>
          </div>
          <div
            class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Refresh
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Create new Survey
            </button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { Disclosure } from '@headlessui/vue';

  import { computed } from 'vue';

  // Get current route to set the current navigation item
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const filter = computed(() => {
    const { filter: f = 'explore' } = route.params;
    return f;
  });

  const navigation = computed(() => [
    { name: 'Explore', to: { path: '/surveys/explore', params: { filter: 'explore' } }, current: filter.value == 'explore' },
    { name: 'Answer', to: { path: '/surveys/answer', params: { filter: 'answer' } }, current: filter.value == 'answer' },
    { name: 'My surveys', to: { path: '/surveys/mySurveys', params: { filter: 'mySurveys' } }, current: filter.value == 'mySurveys' },
    { name: 'History', to: { path: '/surveys/history', params: { filter: 'history' } }, current: filter.value == 'history' },
  ]);

  const currentSection = computed(() => {
    return navigation.value.find((item) => item.current)?.name;
  });
</script>
