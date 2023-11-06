<template>
  <span>
    <form preventDefault="true">
      <div class="space-y-12">
        <section>
          <!-- DIVIDER 1 -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-start">
              <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">Step 1</span>
            </div>
          </div>
          <h2 class="text-4xl font-semibold leading-7 text-gray-900">
            <text class="text-indigo-500">1.</text>
            General information
          </h2>
          <p class="mt-3 text-xl leading-6 text-gray-600">This survey will be publish and the data will be collected on the Chain.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label class="block text-sm font-medium leading-6 text-gray-900">Title</label>
              <div class="mt-2">
                <div
                  class="flex pl-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    v-model="title"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Surveyvor feedback survey" />
                </div>
              </div>
            </div>

            <div class="sm:col-span-4">
              <label class="block text-sm font-medium leading-6 text-gray-900">Background color (HEX)</label>
              <div class="mt-2">
                <div
                  class="flex pl-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    v-model="background"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="#ffffff" />
                </div>
              </div>
            </div>

            <div class="sm:col-span-4">
              <label class="block text-sm font-medium leading-6 text-gray-900">Minimum responder level</label>
              <div class="mt-2">
                <div
                  class="flex pl-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    v-model="minRankingTier"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="1-5" />
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label class="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div class="mt-2">
                <textarea
                  v-model="description"
                  rows="3"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">Tell the web what are you looking for.</p>
            </div>

            <div class="hidden col-span-full">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div class="text-center">
                  <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  <p class="text-xs leading-5 text-gray-600">
                    Suggested size
                    <b>1024x1024</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <!-- DIVIDER 2 -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-start">
              <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">Step 2</span>
            </div>
          </div>
          <h2 class="text-4xl font-semibold leading-7 text-gray-900">
            <text class="text-indigo-500">2.</text>
            What's the purpose of your survey?
          </h2>
          <p class="mt-3 text-xl leading-6 text-gray-600">The purpose of your survey is to collect data for:</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Purpose</label>
              <div class="mt-2">
                <select
                  v-model="purpose"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option v-for="purpose in purposes" :key="purpose">{{ purpose }}</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <!-- SURVEYS -->
        <section v-for="(currentSurvey, index) in surveys" :key="index" class="sm:col-span-full border-t border-gray-200 pt-12 mt-12">
          <!-- DIVIDER 3,4 -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-start">
              <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">Step {{ currentSurvey.step }}</span>
            </div>
          </div>
          <h2 class="text-4xl font-semibold leading-7 text-gray-900">
            <text class="text-indigo-500">{{ currentSurvey.step }}.</text>
            {{ currentSurvey.title }}
          </h2>
          <p class="mt-3 text-xl leading-6 text-gray-600">
            {{ currentSurvey.description }}
          </p>

          <div class="grid grid-cols-2">
            <div class="col-span-1">
              <h3 class="text-gray-900 text-lg font-bold mt-12">Preview of your presurvey</h3>
              <template v-if="currentSurvey.questions && currentSurvey.questions.length">
                <form id="survey-form" preventDefault="true">
                  <div class="mt- 2justify-center rounded-lg border-none py-12 border-indigo-900/25 pr-8 flex flex-col">
                    <div v-for="(q, i) in currentSurvey.questions" :key="i" class="mb-10">
                      <label class="text-base font-semibold text-gray-900">{{ q.question }}</label>
                      <p class="text-sm text-gray-500">{{ q.description }}</p>
                      <fieldset class="mt-4">
                        <div class="space-y-4 sm:flex sm:items-center sm:space-x-6 sm:space-y-0">
                          <div v-for="(opt, j) in q.options" :key="j" class="flex items-center">
                            <input
                              name="notification-method"
                              type="radio"
                              :checked="opt === q.response"
                              disabled
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                            <label class="ml-3 block text-sm font-medium leading-6 text-gray-900">{{ opt }}</label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </template>
              <div v-else class="text-base text-indigo-500 py-6">
                <p>There are no questions yet.</p>
              </div>
            </div>
            <div class="col-span-1">
              <h3 class="text-gray-900 text-lg font-bold mt-12">Insert new pre-survey field</h3>
              <div class="mt-8 justify-center rounded-lg border-none bg-white shadow-xl py-12 border-indigo-900/25 px-8 grid grid-cols-3 space-y-3">
                <!-- QUESTION -->
                <div class="col-span-full">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Question</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      v-model="currentSurvey.newField.question"
                      placeholder="What is your favorite color?"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <!-- DESCRIPTION -->
                <div class="col-span-full">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      placeholder="This will help us to know you better"
                      v-model="currentSurvey.newField.description"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <!-- KEY -->
                <div class="col-span-full">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Key</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      placeholder="favorite-color"
                      v-model="currentSurvey.newField.key"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <!-- OPTIONS -->
                <div class="col-span-3" v-for="(option, i) in currentSurvey.newField.options" :key="i">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Option #{{ i + 1 }}</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      v-model="currentSurvey.newField.options[i]"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <!-- ADD OPTION -->
                <div class="col-span-full pt-4" :key="i">
                  <div
                    @click="addOption(currentSurvey)"
                    class="cursor-pointer select-none flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                    Add another option
                  </div>
                </div>

                <div v-if="currentSurvey.response" class="sm:col-span-1">
                  <label class="block text-sm font-medium leading-6 text-gray-900">Response</label>
                  <div class="mt-2">
                    <input
                      type="text"
                      v-model="currentSurvey.newField.response"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div class="col-span-full pt-4">
                  <div
                    @click="addPreSurveyField(currentSurvey)"
                    class="cursor-pointer select-none flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Add pre survey field
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- STEP 5 -->
        <div>
          <!-- DIVIDER 5 -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-start">
              <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">Step 5</span>
            </div>
          </div>

          <h2 class="text-4xl font-semibold leading-7 text-gray-900">
            <text class="text-indigo-500">5.</text>
            Pricing
          </h2>
          <p class="mt-3 text-xl leading-6 text-gray-600">Choose the budget and the reward for the respondents.</p>

          <div class="grid grid-cols-6 my-10">
            <div class="space-y-10 col-span-2">
              <Listbox as="div" v-model="currency">
                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Currency</ListboxLabel>
                <div class="relative mt-2">
                  <ListboxButton
                    class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span class="flex items-center">
                      <img :src="currency.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
                      <span class="ml-3 block truncate">{{ currency.name }}</span>
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </ListboxButton>

                  <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <ListboxOptions
                      class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <ListboxOption as="template" v-for="cur in currencies" :key="cur.id" :value="cur" v-slot="{ active, currency }">
                        <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                          <div class="flex items-center">
                            <img :src="cur.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
                            <span :class="[currency ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ cur.name }}</span>
                          </div>

                          <span v-if="currency" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                            <CheckIcon20 class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">Currency that will be used to pay the respondents.</p>
              </Listbox>
            </div>
            <div class="col-span-2 pl-4">
              <label class="block text-sm font-medium leading-6 text-gray-900">Budget</label>
              <div class="mt-2">
                <div
                  class="flex pl-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{{ currency.name }}</span>
                  <input
                    type="number"
                    v-model="budget"
                    class="pr-4 text-right block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="0" />
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">{{ currency.name }} that will be sent to the Chain.</p>
              </div>
            </div>
            <div class="col-span-2 pl-4">
              <label class="block text-sm font-medium leading-6 text-gray-900">Respondent Reward</label>
              <div class="mt-2">
                <div
                  class="flex pl-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{{ currency.name }}</span>
                  <input
                    type="number"
                    v-model="reward"
                    class="pr-6 text-right block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="0" />
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">{{ currency.name }} that will be sent to each respondent.</p>
              </div>
            </div>
            <div class="col-span-full mt-10">
              With this budget the estimation is that you will be able to collect up to
              <b>{{ seats }} responses</b>
              .
            </div>
          </div>
        </div>

        <div>
          <!-- DIVIDER 6 -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-start">
              <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">Review</span>
            </div>
          </div>

          <h2 class="text-4xl font-semibold leading-7 text-gray-900">
            <text class="text-indigo-500">6.</text>
            Review
          </h2>
          <p class="mt-3 text-xl leading-6 text-gray-600">Please review your survey before publishing it.</p>

          <div>
            <div class="px-4 sm:px-0">
              <h3 class="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
            </div>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Title</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ title }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Description</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ description }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Purpose</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ purpose }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Presurvey</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ surveys[0].questions.length }} questions</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Survey</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ surveys[1].questions.length }} questions</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Budget</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ budget }} {{ currency.name }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Reward</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ reward }} {{ currency.name }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">Estimated responses</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ seats }} responses</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 mb-64 flex items-center justify-end gap-x-6">
        <div
          @click="submitSurvey"
          class="cursor-pointer rounded-md bg-indigo-600 px-16 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </div>
      </div>
    </form>

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
                      <p class="text-sm text-gray-500">{{ vueAlert.body }}</p>
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
  import { PhotoIcon } from '@heroicons/vue/24/solid';
  import { ref } from 'vue';

  // Alert management
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
  import { CheckIcon, NoSymbolIcon } from '@heroicons/vue/24/outline';
  import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
  import { CheckIcon as CheckIcon20, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
  import { computed } from 'vue';
  // import { prepareWriteContract, writeContract} from '@wagmi/core';
  import { writeContract } from '@wagmi/core';

  import { ethers } from 'ethers';

  // We import also the json file
  import foundry_build_contract from '../../../../../../../../../../utils/other_abis/Surveyvor.json';

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
  const currencies = [
    { name: 'ETH', id: '0xc8A1F9461115EF3C1E84Da6515A88Ea49CA97660', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'USDT', id: '0x0bd446021Ab95a2ABd638813f9bDE4fED3a5779a', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png' },
    { name: 'GNO', id: '0x19C653Da7c37c66208fbfbE8908A5051B57b4C70', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1659.png' },
    { name: 'BNB', id: '0x26EE3E8b618227C1B735D8D884d52A852410019f', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' },
    { name: 'USDC', id: '0x1173da1811a311234e7Ab0A33B4B7B646Ff42aEC', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png' },
    { name: 'SOL', id: '0x4D1e6f39bbfcce8b471171b8431609b83f3a096D', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png' },
    { name: 'MATIC', id: '0xa48c56e48A71966676d0D113EAEbe6BE61661F18', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png' },
    { name: 'WBTC', id: '0xA7226d85CE5F0DE97DCcBDBfD38634D6391d0584', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png' },
    { name: 'LINK', id: '0xecB89B57A60ac44E06ab1B767947c19b236760c3', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png' },
    { name: 'DAI', id: '0xa7aA6a860D17A89810dE6e6278c58EB21Fa00fc4', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png' } /*
    { name: 'BTC', id: '0x4B5aBFC0Fe78233b97C80b8410681765ED9fC29c', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
    { name: 'ETH_BTC', id: '0x1804969b296E89C1ddB1712fA99816446956637e', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'SELF_KISSER', id: '0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'AAVE', id: '0xa38C2B5408Eb1DCeeDBEC5d61BeD580589C6e717', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'ARB', id: '0x579BfD0581beD0d18fBb0Ebab099328d451552DD', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'AVAX', id: '0x78C8260AF7C8D0d17Cf3BA91F251E9375A389688', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'CRV', id: '0xf29a932ae56bB96CcACF8d1f2Da9028B01c8F030', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'IBTA', id: '0x07487b0Bf28801ECD15BF09C13e32FBc87572e81', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'LDO', id: '0xa53dc5B100f0e4aB593f2D8EcD3c5932EE38215E', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'MKR', id: '0x67ffF0C6abD2a36272870B1E8FE42CC8E8D5ec4d', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'OP', id: '0xfadF055f6333a4ab435D2D248aEe6617345A4782', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'RETH', id: '0xEE02370baC10b3AC3f2e9eebBf8f3feA1228D263', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'SDAI_DAI', id: '0xD93c56Aa71923228cDbE2be3bf5a83bF25B0C491', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'SNX', id: '0xD20f1eC72bA46b6126F96c5a91b6D3372242cE98', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'UNI', id: '0x2aFF768F5d6FC63fA456B062e02f2049712a1ED5', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'WSTETH', id: '0xc9Bb81d3668f03ec9109bBca77d32423DeccF9Ab', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
    { name: 'YFI', id: '0x0893EcE705639112C1871DcE88D87D81540D0199', avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' }, */,
  ];

  const title = ref('iExec for ETH Lisbon');
  const description = ref('This is a cool survey for ETH Lisbon');
  const budget = ref(0.00001);
  const reward = ref(0.0000003);
  const seats = computed(() => {
    if (!reward.value) return 'Infinity';
    if (!budget.value) return 0;
    return Math.floor(budget.value / reward.value);
  });
  const purposes = ['Education', 'Research', 'Marketing', 'Commercial', 'No profit', 'Open Source'];
  const purpose = ref(purposes[0]);

  const currency = ref(currencies[2]);

  const surveys = ref([
    {
      step: 3,
      name: 'Presurvey',
      title: 'Configure your Presurvey',
      response: true,
      description: 'The Presurvey is the survey to be answered before the main survey and discrims the respondents.',
      newField: {
        question: '',
        description: '',
        key: '',
        options: ['', ''],
        response: '',
      },
      questions: [
        {
          question: 'How long is your experience with our products?',
          description: 'This will help us to know you better',
          key: 'experience',
          options: ['Less then a year', '1+ years', '5+ years'],
          response: 'Less then a year',
        },
        {
          question: 'How old are you?',
          description: 'This will help us to know you better',
          key: 'age',
          options: ['Less then 18', '18-25', '25-35', '35-50', '50+'],
          response: '50+',
        },
        {
          question: 'Where did you hear about us?',
          description: 'This will help us to know you better',
          key: 'engagement',
          options: ['Social', 'Newspaper', 'Friends', 'Other'],
          response: 'Newspaper',
        },
      ],
    },
    {
      step: 4,
      name: 'Main survey',
      title: 'Configure your Survey',
      response: false,
      description: 'The Survey is the main survey to be answered by the respondents.',
      newField: {
        question: '',
        description: '',
        key: '',
        options: ['', ''],
        response: '',
      },
      questions: [
        {
          question: 'What is your favorite color?',
          description: 'This will help us to know you better',
          key: 'favorite-color',
          options: ['Red', 'Blue', 'Green', 'Yellow'],
        },
        {
          question: 'What is your favorite animal?',
          description: 'This will help us to know you better',
          key: 'favorite-animal',
          options: ['Dog', 'Cat', 'Bird', 'Fish'],
        },
        {
          question: 'What is your favorite food?',
          description: 'This will help us to know you better',
          key: 'favorite-food',
          options: ['Pizza', 'Pasta', 'Sushi', 'Burger'],
        },
      ],
    },
  ]);

  const addOption = (currentSurvey) => {
    currentSurvey.newField.options.push('');
  };

  const addPreSurveyField = (currentSurvey) => {
    let { question = '', description = '', key = '', options = '', response = '' } = currentSurvey.newField;
    key = key.replace(/\s/g, '-').toLowerCase();
    if (!question || !description || !options || (currentSurvey.response && !response) || !key)
      return openAlert({ title: 'Error', body: 'All fields are required', button: 'Ok' }, false, () => {});

    for (let i = 0; i < options.length; i++)
      if (!options[i]) return openAlert({ title: 'Error', body: 'All options are required', button: 'Ok' }, false, () => {});

    // check if key already exists
    for (let i = 0; i < currentSurvey.questions.length; i++)
      if (currentSurvey.questions[i].key === key) return openAlert({ title: 'Error', body: 'Key already exists', button: 'Ok' }, false, () => {});

    // check if response is in options
    if (currentSurvey.response && !options.includes(response))
      return openAlert({ title: 'Error', body: 'Response must be one of the options', button: 'Ok' }, false, () => {});
    const toAdd = { question, description, key, options, response };
    currentSurvey.questions.push(toAdd);
  };

  import { useStore } from 'vuex';
  const store = useStore();

  const background = ref('');
  const minRankingTier = ref('3');

  import axios from 'axios';
  async function submitSurvey() {
    const { address, chainId } = store.getters.getConnectionStatus;
    const survey = {
      title: title.value,
      description: description.value,
      budget: budget.value,
      reward: reward.value,
      currency: currency.value.id,
      purpose: purpose.value,
      surveys: surveys.value,
      presurvey: surveys.value[0].questions,
      survey: surveys.value[1].questions,
      owner: address,
      image: 'http://localhost:3000/cdn/logos/iExec.png',
      background: background.value || '#fdd154',
      minRankingTier: minRankingTier.value,
    };

    console.log('Submit:', survey);

    const { hash } = await writeContract({
      address: '0x6BB72b7038Aaa132850b005F4008d724df98f4f9',
      abi: foundry_build_contract.abi,
      functionName: 'create_survey',
      args: [
        ethers.BigNumber.from(survey.reward * 1e18).toString(),
        survey.currency.toString(),
        ethers.BigNumber.from(survey.budget * 1e18).toString(),
        'default',
      ],
    });

    console.log('Save on chain:', hash);

    const res = axios
      .request({
        method: 'post',
        url: process.env.VUE_APP_API_URL + '/api/surveys',
        data: { ...survey },
        headers: {
          'Content-Type': 'application/json',
          AddressId: address,
          ChainId: chainId,
        },
      })
      .then(() => {
        console.log('survey saved');
      })
      .catch((e) => {
        console.log(e);
      });

    console.log('Salvato:', res);
  }
</script>
