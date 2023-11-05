<template>
  <div>
    <template v-if="filter == 'history'">
      <div class="my-6">
        <dl class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
          <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6">
            <dt class="text-base font-normal text-gray-900">{{ item.name }}</dt>
            <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
                {{ item.stat }}
                <span class="ml-2 text-sm font-medium text-gray-500">from {{ item.previousStat }}</span>
              </div>

              <div
                :class="[
                  item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
                ]">
                <ArrowUpIcon v-if="item.changeType === 'increase'" class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                <ArrowDownIcon v-else class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                <span class="sr-only">{{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by</span>
                {{ item.change }}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </template>
    <template v-if="filter == 'mySurveys'">
      <div class="my-6">
        <dl class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
          <div v-for="item in myStats" :key="item.name" class="px-4 py-5 sm:p-6">
            <dt class="text-base font-normal text-gray-900">{{ item.name }}</dt>
            <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
                {{ item.stat }}
                <span class="ml-2 text-sm font-medium text-gray-500">from {{ item.previousStat }}</span>
              </div>

              <div
                :class="[
                  item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0',
                ]">
                <ArrowUpIcon v-if="item.changeType === 'increase'" class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                <ArrowDownIcon v-else class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                <span class="sr-only">{{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by</span>
                {{ item.change }}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </template>

    <div>
      <div class="bg-white rounded-2xl">
        <div class="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <div class="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="survey in surveys"
              :key="survey.id"
              class="group relative p-6 pt-12 my-12 sm:p-6 flex flex-col justify-center items-center rounded-2xl transform transition duration-300 ease-in-out overflow-visible"
              :class="{ 'hover:bg-gray-100 hover:scale-110': !survey.closed }">
              <div
                class="relative h-48 w-48 bg-gray-300 p-16 rounded-3xl shadow-xl transform transition duration-300 ease-in-out"
                :class="{ 'shadow-none': survey.closed, 'hover:scale-105 ': !survey.closed }"
                :style="{ 'background-color': survey.closed ? '#eeeeee' : survey.background }">
                <div
                  v-if="survey.closed"
                  class="absolute bottom-0 left-0 z-10 rounded-b-3xl h-min w-full bg-red-500 flex justify-center items-center text-white font-bold">
                  Closed
                </div>
                <div v-else class="absolute top-0 left-0 z-10 rounded-3xl h-full w-full bg-gradient-to-t from-gray-900/60 to-transparent"></div>

                <img :src="survey.image" :alt="survey.title" class="relative z-20 h-full w-full object-cover object-center" />
              </div>

              <div class="pb-2 py-5 text-center" :class="{ 'opacity-30': survey.closed }">
                <h3 class="text-sm font-medium text-gray-900">
                  <router-link :to="{ path: `/surveys/d/${survey._id}`, params: { id: survey._id } }">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ survey.title }}
                  </router-link>
                </h3>
                <div class="flex items-center justify-center">
                  <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[survey.rating > rating ? 'text-indigo-500' : 'text-gray-200', 'h-4 w-4 flex-shrink-0']"
                    aria-hidden="true" />
                </div>
                <p class="mt-3 text-3xl text-indigo-500 font-semibold">
                  {{ survey.reward }}
                  <text class="text-gray-400 text-lg">{{ survey.currency }}</text>
                </p>
                <div class="flex flex-col items-center">
                  <p class="text-sm tracking-tight text-gray-500">
                    <text class="text-gray-900 font-semibold">{{ survey.respondentsLeft }} left</text>
                    / {{ survey.maximumRespondentsNumber }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid';

  const stats = [
    { name: 'Total revenue', stat: '4,323 ETH', previousStat: '3,001 ETH', change: '0,322 ETH', changeType: 'increase' },
    { name: 'Eligibility rate', stat: '75.16%', previousStat: '55%', change: '20.16%', changeType: 'increase' },
    { name: 'Avg. Time for question', stat: '43s', previousStat: '45s', change: '2s', changeType: 'decrease' },
  ];

  const myStats = [
    { name: 'Created', stat: '3', previousStat: '4', change: '1', changeType: 'decrease' },
    { name: 'Fullfilling rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
    { name: 'Avg. per user cost', stat: '4,323 ETH', previousStat: '3,001 ETH', change: '0,322 ETH', changeType: 'increase' },
  ];
  // Get route parameters
  import { useRoute } from 'vue-router';
  const route = useRoute();

  import { computed } from 'vue';
  const filter = computed(() => {
    const { filter: f = 'explore' } = route.params;
    return f;
  });

  // SURVEYS

  // Get surveys from store
  import { useStore } from 'vuex';
  const store = useStore();

  // Refresh surveys function
  const fetchSurveys = () => store.dispatch('fetchSurveys');
  // Refresh surveys on mount
  import { onMounted } from 'vue';
  onMounted(fetchSurveys);

  const surveys = computed(() => {
    return store.getters.getAllSurveys.filter((survey) => {
      switch (filter.value) {
        case 'history':
          return survey.closed;
        case 'mySurveys':
          return survey.owner === '';
        case 'answer':
          return !survey.closed;
        default:
          return true;
      }
    });
  });

  // Surveys Card
  import { StarIcon } from '@heroicons/vue/20/solid';
</script>
