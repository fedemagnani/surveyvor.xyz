<template>
  <div class="relative bg-white rounded-xl">
    <div v-if="selectedSurvey" class="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="relative lg:grid lg:grid-cols-4 lg:items-start lg:gap-x-8">
        <!-- Cover Image -->
        <div class="flex flex-col items-center justify-start">
          <div
            class="mx-auto relative h-48 w-48 bg-gray-300 p-16 rounded-3xl shadow-xl transform transition duration-300 ease-in-out flex flex-cols justify-start items-center"
            :class="{ 'shadow-none': selectedSurvey.closed, 'hover:scale-105 ': !selectedSurvey.closed }"
            :style="{ 'background-color': selectedSurvey.closed ? '#eeeeee' : selectedSurvey.background }">
            <div
              v-if="selectedSurvey.closed"
              class="absolute bottom-0 left-0 z-10 rounded-b-3xl h-min w-full bg-red-500 flex justify-center items-center text-white font-bold">
              Closed
            </div>
            <div v-else class="absolute top-0 left-0 z-10 rounded-3xl h-full w-full bg-gradient-to-t from-gray-900/60 to-transparent"></div>

            <img :src="selectedSurvey.image" :alt="selectedSurvey.title" class="relative z-20 h-full w-full object-cover object-center" />
          </div>

          <!-- Reviews -->
          <div class="mt-3">
            <div class="flex items-center">
              <div class="flex items-center">
                <StarIcon
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[selectedSurvey.rating > rating ? 'text-indigo-500' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                  aria-hidden="true" />
              </div>
            </div>
          </div>

          <p class="text-xs text-gray-600 mt-1">
            <text class="text-bold text-gray-900">{{ selectedSurvey.rating }}</text>
            / 5 stars
          </p>
        </div>

        <!-- Buttons -->
        <div class="absolute flex right-0 top-0 pr-6">
          <router-link
            type="submit"
            :to="{ name: 'SurveyPreviewView', params: { id: selectedSurvey._id } }"
            class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
            Cancel and lose
            <text class="font-bold ml-1">{{ selectedSurvey.reward }} {{ selectedSurvey.currency }}</text>
          </router-link>
        </div>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-3">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ selectedSurvey.title }}</h1>

          <div class="mt-0">
            <p class="text-xl tracking-tight text-gray-400">
              <text class="text-gray-900 font-semibold">{{ selectedSurvey.respondentsLeft }} left</text>
              / {{ selectedSurvey.maximumRespondentsNumber }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="py-12">
      <router-view />
    </div>
  </div>
</template>

<script setup>
  import { StarIcon } from '@heroicons/vue/20/solid';

  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import { computed, onMounted } from 'vue';

  const store = useStore(); // get store
  const selectedSurvey = computed(() => store.getters.getSelectedSurvey); // get selected survey from store
  const route = useRoute(); // get route parameters
  const fetchSurvey = () => store.dispatch('fetchSurvey', route.params.id); // fetch survey function
  onMounted(fetchSurvey); // fetch survey on mount
</script>
