<template>
  <div class="relative bg-white rounded-xl">
    <div v-if="selectedSurvey">
      <div v-if="selectedSurvey.owned && viewList">
        <div class="relative w-full flex justify-between itesm-center my-8">
          <button
            @click="viewList = false"
            class="flex max-w-xs flex-1 items-center justify-center rounded-md border bg-white px-8 py-2 text-base border-gray-300 font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
            ← Back to details
          </button>
          <h2>
            found
            <b>{{ projects.length }}</b>
            new respondents
          </h2>
        </div>
        <ul role="list" class="divide-y divide-gray-100">
          <li
            v-for="project in projects"
            @click="sendMail(project.createdBy, project.dueDateTime, project.name)"
            :key="project.id"
            class="flex items-center justify-between gap-x-6 py-5">
            <div class="min-w-0">
              <div class="flex items-start gap-x-3">
                <p class="text-sm font-semibold leading-6 text-gray-900">{{ project.name }}</p>
                <p :class="[statuses[project.status], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset']">
                  {{ project.status }}
                </p>
              </div>
              <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p class="whitespace-nowrap">
                  submitted on
                  <time class="font-bold text-gray-900" :datetime="project.dueDateTime">{{ project.dueDate }}</time>
                </p>
                <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <p class="truncate">
                  Created by
                  <text class="text-indigo-500 font-bold">{{ project.createdBy }}</text>
                </p>
              </div>
            </div>
            <div class="flex flex-none items-center gap-x-4">
              <a
                :href="project.href"
                class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
                Send mail
                <span class="sr-only">, {{ project.name }}</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
              v-if="selectedSurvey.owned"
              @click="viewList = true"
              class="flex max-w-xs flex-1 items-center justify-center rounded-md border bg-white px-8 py-2 text-base border-gray-300 font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
              View submissions →
            </button>
            <router-link
              v-else
              type="submit"
              :to="{ name: 'answerWizardPresurveyView', params: { id: selectedSurvey._id } }"
              class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
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
                      <li v-for="item in selectedSurvey.presurvey" :key="item">{{ item.question }}</li>
                    </ul>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="vueAlert && vueAlert.open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div v-if="vueAlert.ok" class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div v-else class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <NoSymbolIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ vueAlert.title }}</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500" v-html="vueAlert.body"></p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <div
                    class="cursor-pointer select-none inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click="
                      vueAlert.open = false;
                      vueAlert.callback();
                    ">
                    {{ vueAlert.button }}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
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
  import { computed, onMounted, watch } from 'vue';

  const store = useStore(); // get store
  const selectedSurvey = computed(() => store.getters.getSelectedSurvey); // get selected survey from store
  const route = useRoute(); // get route parameters
  const fetchSurvey = () => store.dispatch('fetchSurvey', route.params.id); // fetch survey function
  onMounted(fetchSurvey); // fetch survey on mount
  const address = computed(() => store.getters.getConnectionStatus.address);
  watch(address, (newVal) => {
    console.log('address changed', newVal);
    if (newVal) fetchSurvey();
  });

  // View List

  const viewList = ref(false);

  const statuses = {
    Complete: 'text-green-700 bg-green-50 ring-green-600/20',
    'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
  };

  import { IExecWeb3mail } from '@iexec/web3mail';
  import { getAccount } from '@wagmi/core';

  const cnt = ref([]);
  const projects = computed(() => {
    return cnt.value.map((contact) => {
      return {
        id: contact.address,
        name: contact.address,
        href: '#',
        status: 'Complete',
        createdBy: contact.owner,
        dueDate: new Date(contact.accessGrantTimestamp).toLocaleDateString(),
        dueDateTime: new Date(contact.accessGrantTimestamp).toISOString(),
      };
    });
  });

  //fetch my contacts by calling fetchMyContacts method from @iexec/web3mail
  const fetchMyContacts = async () => {
    cnt.value = [];
    try {
      const account = getAccount();
      const provider = await account.connector?.getProvider();
      const web3mail = new IExecWeb3mail(provider);
      const contacts = await web3mail.fetchMyContacts();
      console.log(contacts);
      cnt.value = contacts;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  };

  watch(viewList, (newVal) => {
    if (newVal) fetchMyContacts();
    else cnt.value = [];
  });

  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
  import { CheckIcon, NoSymbolIcon } from '@heroicons/vue/24/outline';
  // Vue Alert
  const vueAlert = ref({
    open: false,
    callback: () => {},
    ok: true,
    title: '',
    body: '',
    button: '',
  });
  const openAlert = ({ title, body, button }, ok, callback) => {
    vueAlert.value = { open: true, ok, callback, title, body, button };
  };

  const sendMail = async (owner, date, protectedData) => {
    const mailObject = `Updates about your survey!`;
    const mailContent = `Hi ${owner},\n\nYour answer to the survey from ${date} has been received.\n\nThank You for your participation!`;
    const senderName = 'Surveyvor';

    try {
      const account = getAccount();
      const provider = await account.connector?.getProvider();
      const web3mail = new IExecWeb3mail(provider);
      const txHash = await web3mail.sendEmail({
        emailSubject: mailObject,
        emailContent: mailContent,
        protectedData,
        senderName,
      });
      console.log('txHash:', txHash);
      openAlert(
        {
          title: 'Congratulations!',
          body: `Mail sent correctly!<br/><a target="_blank" class="font-semibold text-indigo-500 underline" href="https://explorer.iex.ec/bellecour/task/${txHash?.taskId}">View transaction</a>`,
          button: 'Awesome!',
        },
        true,
        fetchMyContacts,
      );
      return txHash;
    } catch (error) {
      console.error('Error sending web3 mail:', error);
      throw error;
    }
  };
</script>
