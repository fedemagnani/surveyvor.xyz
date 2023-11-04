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
        <div v-if="!selectedSurvey.closed" class="absolute flex right-0 top-0 pr-6">
          <button
            v-if="ownership"
            type="submit"
            class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
            Close Survey
          </button>
          <router-link
            v-else
            type="submit"
            :to="{ name: 'answerWizardPresurveyView', params: { id: selectedSurvey._id } }"
            class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
            Answer Survey for
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

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6 text-base text-gray-700" v-html="selectedSurvey.description" />
          </div>

          <form class="mt-6">
            <!-- Ranking Tiers -->
            <div class="border-gray-200 border-t border-b-0">
              <h3 class="mt-6 font-semibold text-base text-gray-600">
                You must be
                <text class="text-indigo-500">Tier {{ selectedSurvey.minRankingTier }}</text>
                or higher to answer this survey
              </h3>

              <RadioGroup v-model="selectedColor" class="mt-2 py-3">
                <span class="flex items-center space-x-3">
                  <RadioGroupOption as="template" v-for="tier in tiers" :key="tier.name" :value="tier">
                    <div
                      :class="[
                        tier.tier >= selectedSurvey.minRankingTier ? tier.selectedColor : 'ring-transparent bg-gray-100',
                        tier.tier >= selectedSurvey.minRankingTier ? 'ring-2' : '',
                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                      ]">
                      <span
                        aria-hidden="true"
                        class="flex justify-center items-center text-white font-bold"
                        :class="[
                          tier.tier >= selectedSurvey.minRankingTier ? tier.bgColor : 'ring-transparent  bg-gray-100',
                          'h-8 w-8 rounded-full border border-black border-opacity-10',
                        ]">
                        {{ tier.tier }}
                      </span>
                    </div>
                  </RadioGroupOption>
                </span>
              </RadioGroup>
            </div>
          </form>

          <section aria-labelledby="details-heading" class="mt-6">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="divide-y divide-gray-200 border-t">
              <Disclosure as="div" v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left">
                    <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">Pre-survey questions</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="prose prose-sm pb-6">
                  <ul role="list">
                    <li v-for="item in selectedSurvey.preSurveyQuestions" :key="item">{{ item.question }}</li>
                  </ul>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Disclosure, DisclosureButton, DisclosurePanel, RadioGroup, RadioGroupOption } from '@headlessui/vue';
  import { StarIcon } from '@heroicons/vue/20/solid';
  import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';
  const tiers = [
    { name: 'Tier 1', bgColor: 'bg-indigo-200', selectedColor: 'ring-gray-300', tier: 1 },
    { name: 'Tier 2', bgColor: 'bg-indigo-300', selectedColor: 'ring-gray-300', tier: 2 },
    { name: 'Tier 3', bgColor: 'bg-indigo-400', selectedColor: 'ring-gray-300', tier: 3 },
    { name: 'Tier 4', bgColor: 'bg-indigo-500', selectedColor: 'ring-gray-300', tier: 4 },
    { name: 'Tier 5', bgColor: 'bg-indigo-600', selectedColor: 'ring-gray-300', tier: 5 },
  ];

  const selectedColor = ref(tiers[0]);

  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import { computed, onMounted } from 'vue';

  const store = useStore(); // get store
  const selectedSurvey = computed(() => store.getters.getSelectedSurvey); // get selected survey from store
  const route = useRoute(); // get route parameters
  const fetchSurvey = () => store.dispatch('fetchSurvey', route.params.id); // fetch survey function
  onMounted(fetchSurvey); // fetch survey on mount
</script>
