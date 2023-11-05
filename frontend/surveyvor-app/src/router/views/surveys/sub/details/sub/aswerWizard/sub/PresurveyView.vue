<template>
  <span>
    <span v-if="iExecStatus == 0">
      <span v-if="!presurveyOk">
        <form id="presurvey-form" preventDefault="true">
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <h2 class="text-base font-semibold leading-7 text-gray-900">Pre-survey Form</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                Submit this form to check if you are eligible to the Survey.
                <br />
                Please be honest. Rember: You can submit this pre-survey once!
              </p>

              <div class="mt-10 space-y-10">
                <fieldset v-for="(question, i) in selectedSurvey.presurvey" :key="i">
                  <legend class="text-sm font-semibold leading-6 text-gray-900">{{ question.question }}</legend>
                  <p class="mt-1 text-sm leading-6 text-gray-600">{{ question.description }}</p>
                  <div class="mt-6 space-y-6">
                    <div v-for="(option, j) in question.options" :key="j" class="flex items-center gap-x-3">
                      <input
                        :id="question.key + '_' + j"
                        :name="question.key"
                        :value="option"
                        type="radio"
                        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <label :for="question.key + '_' + j" class="block text-sm font-medium leading-6 text-gray-900">{{ option }}</label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <div
              @click="submitPreSurvey"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Save
            </div>
          </div>
        </form>
      </span>
      <span v-else>
        <form id="survey-form" preventDefault="true">
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <h2 class="text-base font-semibold leading-7 text-gray-900">Survey Form</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">Ok, take your time to answer these questions.</p>

              <div class="sm:col-span-4 mt-12">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <p class="mt-1 text-sm leading-6 text-gray-600">Your email will be not shared with blablabla iExec!</p>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="mt-10 space-y-10">
                <fieldset v-for="(question, i) in selectedSurvey.survey" :key="i">
                  <legend class="text-sm font-semibold leading-6 text-gray-900">{{ question.question }}</legend>
                  <p class="mt-1 text-sm leading-6 text-gray-600">{{ question.description }}</p>
                  <div class="mt-6 space-y-6">
                    <div v-for="(option, j) in question.options" :key="j" class="flex items-center gap-x-3">
                      <input
                        :id="question.key + '_' + j"
                        :name="question.key"
                        :value="option"
                        type="radio"
                        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <label :for="question.key + '_' + j" class="block text-sm font-medium leading-6 text-gray-900">{{ option }}</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="mt-10 space-y-10">
                <fieldset>
                  <legend class="text-sm font-semibold leading-6 text-gray-900">Review this survey</legend>
                  <p class="mt-1 text-sm leading-6 text-gray-600">Leave a review about how blablabla</p>
                  <div class="mt-6 space-y-6">
                    <div class="flex items-center gap-x-3">
                      <input id="review_1" name="review" value="1" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <label :for="review_1" class="block text-sm font-medium leading-6 text-gray-900">1 Star</label>
                    </div>
                    <div class="flex items-center gap-x-3">
                      <input id="review_2" name="review" value="2" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <label :for="review_2" class="block text-sm font-medium leading-6 text-gray-900">2 Star</label>
                    </div>
                    <div class="flex items-center gap-x-3">
                      <input id="review_3" name="review" value="3" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <label :for="review_3" class="block text-sm font-medium leading-6 text-gray-900">3 Star</label>
                    </div>
                    <div class="flex items-center gap-x-3">
                      <input id="review_4" name="review" value="4" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <label :for="review_4" class="block text-sm font-medium leading-6 text-gray-900">4 Star</label>
                    </div>
                    <div class="flex items-center gap-x-3">
                      <input id="review_5" name="review" value="5" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                      <label :for="review_5" class="block text-sm font-medium leading-6 text-gray-900">5 Star</label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <div
              @click="submitSurvey"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Save
            </div>
          </div>
        </form>
      </span>
    </span>
    <div v-else class="fixed w-screen h-screen flex justify-center items-center filter backdrop-blur-sm bg-gray-400/30 top-0 left-0">
      <nav aria-label="Progress" class="bg-white rounded-2xl border border-gray-100 p-12 shadow-xl">
        <ol role="list" class="overflow-visible">
          <li v-for="(step, stepIdx) in steps" :key="step.name" :class="[stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative']">
            <template v-if="step.status === 'complete'">
              <div v-if="stepIdx !== steps.length - 1" class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600" aria-hidden="true" />
              <a class="group relative flex items-start">
                <span class="flex h-9 items-center">
                  <span class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon class="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </span>
                <span class="ml-4 flex min-w-0 flex-col">
                  <span class="text-sm font-medium">{{ step.name }}</span>
                  <span class="text-sm text-gray-500">{{ step.description }}</span>
                </span>
              </a>
            </template>
            <template v-else-if="step.status === 'current'">
              <div v-if="stepIdx !== steps.length - 1" class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
              <a class="group relative flex items-start" aria-current="step">
                <span class="flex h-9 items-center" aria-hidden="true">
                  <span class="animate-ping relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                    <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                  </span>
                </span>
                <span class="ml-4 flex min-w-0 flex-col">
                  <span class="text-sm font-medium text-indigo-600">{{ step.name }}</span>
                  <span class="text-sm text-gray-500">{{ step.description }}</span>
                </span>
              </a>
            </template>
            <template v-else>
              <div v-if="stepIdx !== steps.length - 1" class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
              <a class="group relative flex items-start">
                <span class="flex h-9 items-center" aria-hidden="true">
                  <span
                    class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                    <span class="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                  </span>
                </span>
                <span class="ml-4 flex min-w-0 flex-col">
                  <span class="text-sm font-medium text-gray-500">{{ step.name }}</span>
                  <span class="text-sm text-gray-500">{{ step.description }}</span>
                </span>
              </a>
            </template>
          </li>
        </ol>
      </nav>
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
  </span>
</template>

<script setup>
  // Alert
  import { ref } from 'vue';
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
  import { CheckIcon, NoSymbolIcon } from '@heroicons/vue/24/outline';

  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import { computed, onMounted } from 'vue';
  import { getAccount } from '@wagmi/core';
  import { IExecDataProtector } from '@iexec/dataprotector';

  const store = useStore(); // get store
  const selectedSurvey = computed(() => store.getters.getSelectedSurvey); // get selected survey from store
  const route = useRoute(); // get route parameters
  const fetchSurvey = () => store.dispatch('fetchSurvey', route.params.id); // fetch survey function
  onMounted(fetchSurvey); // fetch survey on mount

  const vueAlert = ref({
    open: false,
    callback: () => {},
    ok: true,
    title: '',
    body: '',
    button: '',
  });

  const presurveyOk = ref(null);

  // Watch when presurveyOk changes
  const openAlert = ({ title, body, button }, ok, callback) => {
    vueAlert.value = { open: true, ok, callback, title, body, button };
  };

  // Submit PreSurvey
  const router = useRouter();
  const submitPreSurvey = () => {
    const preSurvey = document.querySelector('#presurvey-form');
    const preSurveyData = Object.fromEntries(new FormData(preSurvey).entries());
    console.log(preSurveyData);
    for (const index in selectedSurvey.value.presurvey) {
      const { name, response } = selectedSurvey.value.presurvey[index];
      if (preSurveyData[name] !== response) {
        openAlert({ title: 'Ooops', body: 'You are not eligible to this survey!', button: 'Back to the home' }, false, () =>
          router.push({ name: 'SurveysExploreView', params: { filter: 'explore' } }),
        );
        return;
      }
    }
    openAlert({ title: 'Yeah', body: 'You are eligible to this survey!', button: 'Go to the Survey!' }, true, () => (presurveyOk.value = true));
  };

  import axios from 'axios';

  const iExecStatus = ref(0);
  // Submit Survey
  const submitSurvey = async () => {
    const survey = document.querySelector('#survey-form');
    const surveyData = Object.fromEntries(new FormData(survey).entries());
    console.log(surveyData);

    iExecStatus.value = 2; // Sto salvando i dati su iExec
    let data = await protectDataFunc({ ...surveyData }); // TODO: verificare se è possibile usare surveyId
    iExecStatus.value = 3; // Sto autorizzando il surveyProducer a leggere i dati
    let res = await grantAccessFunc(data.address, 'web3mail.apps.iexec.eth', selectedSurvey.value.ownerAddress, 0, 1);
    console.log("Risposta all'autorizzazione del pischello:", res);
    iExecStatus.value = 4; // Sto salvando i dati sul server
    const { address, chainId } = store.getters.getConnectionStatus;
    let response = await axios.request({
      method: 'post',
      url: `${process.env.VUE_APP_API_URL}/api/surveys/${selectedSurvey.value.surveyId}`,
      headers: {
        'Content-Type': 'application/json',
        AddressId: address,
        ChainId: chainId,
      },
      data: {
        data: data.address,
        respondentAddress: store.getters.getConnectionStatus.address,
        review: surveyData.review,
      },
    });
    console.log('Risposta al salvataggio dei dati sul server:', response);
    iExecStatus.value = 5; // Ho finito
    openAlert(
      {
        title: 'Congratulations!',
        body: `You have completed the survey!</br>You have received <b>${
          selectedSurvey.value.reward + ' ' + selectedSurvey.value.currency
        }</b><br/><a target="_blank" class="font-semibold text-indigo-500 underline" href="https://gnosis-chiado.blockscout.com/tx/${
          response?.data?.hash
        }">View transaction</a>`,
        button: 'Awesome!',
      },
      true,
      () => router.push({ name: 'SurveysExploreView', params: { filter: 'explore' } }),
    );
  };

  const steps = computed(() => [
    { name: 'Start', description: 'Setting task.', href: '#', status: iExecStatus.value > 1 ? 'complete' : 'current' },
    {
      name: 'Save data on iExec',
      description: 'Using DataProtect to encrypt and secure your answers.',
      status: iExecStatus.value == 2 ? 'current' : iExecStatus.value > 2 ? 'complete' : 'upcoming',
    },
    {
      name: 'Whitelisting the survey producer',
      description: 'Only the Survey Producer would access your data.',
      status: iExecStatus.value == 3 ? 'current' : iExecStatus.value > 3 ? 'complete' : 'upcoming',
    },
    {
      name: 'Sending your reward',
      description: 'Interacting with GNOSIS contract and sending reward.',
      status: iExecStatus.value == 4 ? 'current' : iExecStatus.value > 4 ? 'complete' : 'upcoming',
    },
  ]);

  // Data Protector iExec
  const protectDataFunc = async (data) => {
    const result = getAccount();
    const provider = await result.connector?.getProvider();
    const dataProtector = new IExecDataProtector(provider);
    const protectedData = await dataProtector.protectData({ data, name: `${await result.connector?.getAccount()}:${selectedSurvey.value.surveyId}` });
    return protectedData;
  };

  const grantAccessFunc = async (protectedData, authorizedApp, authorizedUser, pricePerAccess, numberOfAccess) => {
    const result = getAccount();
    const provider = await result.connector?.getProvider();
    // Configure private data protector
    const dataProtector = new IExecDataProtector(provider);
    const hash = await dataProtector.grantAccess({
      protectedData,
      authorizedApp,
      authorizedUser,
      pricePerAccess,
      numberOfAccess,
    });
    return hash;
  };
</script>
