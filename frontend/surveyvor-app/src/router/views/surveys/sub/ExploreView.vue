<template>
  <div>
    <template v-if="filter == 'history'">
      <div>
        <h3 class="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
        <dl class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
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
      <div>
        <h3 class="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
        <dl class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
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
</script>
