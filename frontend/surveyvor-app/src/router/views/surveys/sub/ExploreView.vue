<template>
  <div>
    <div>
      <div class="bg-white rounded-2xl">
        <div class="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <div v-if="surveys && surveys.length" class="-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="survey in surveys"
              :key="survey.id"
              class="group relative p-6 pt-12 my-12 mb-6 sm:p-6 flex flex-col justify-center items-center rounded-2xl transform transition duration-300 ease-in-out overflow-visible"
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

          <div v-else class="animate-pulse -mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="survey in ['opacity-70', 'opacity-60', 'opacity-50', 'opacity-40', 'opacity-30', 'opacity-20', 'opacity-10', 'opacity-5']"
              :key="survey.id"
              :class="[survey]"
              class="group relative p-6 pt-12 my-12 mb-6 sm:p-6 flex flex-col justify-center items-center rounded-2xl transform transition duration-300 ease-in-out overflow-visible">
              <div class="animate pulse opacity/60 relative h-48 w-48 bg-gray-300 p-16 rounded-3xl shadow-xl transform transition duration-300 ease-in-out">
                <div class="absolute top-0 left-0 z-10 rounded-3xl h-full w-full bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              </div>

              <div class="pb-2 py-5 text-center">
                <h3 class="text-sm font-medium text-gray-900">
                  <span>
                    <span aria-hidden="true" class="absolute inset-0" />
                    <div class="bg-gray-200 h-4 w-32 rounded"></div>
                  </span>
                </h3>
                <div class="flex items-center justify-center">
                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="['text-gray-200', 'h-4 w-4 flex-shrink-0']" aria-hidden="true" />
                </div>
                <p class="mt-3 text-3xl text-gray-500 font-semibold bg-gray-500">
                  reward
                  <text class="text-gray-400 bg-gray-400 text-lg">GNO</text>
                </p>
                <div class="flex flex-col items-center">
                  <p class="text-sm tracking-tight text-gray-500 bg-gray-500">0 left / 0</p>
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
          return survey.owned;
        case 'answer':
          return !survey.closed && !survey.owned;
        default:
          return true;
      }
    });
  });

  // Surveys Card
  import { StarIcon } from '@heroicons/vue/20/solid';
</script>
