<template>
  <span class="isolate inline-flex rounded-md shadow-sm">
    <button
      type="button"
      @click="updateStatus"
      class="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
      <span v-if="connectionStatus.connected && connectionStatus.address">
        <text class="text-green-400">Connected</text>
        as {{ connectionStatus.address }}
      </span>
      <span v-else>Not Connected</span>
    </button>

    <button
      v-if="connectionStatus.connected"
      type="button"
      @click="switchNetwork"
      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
      Change Network
    </button>
    <button
      type="button"
      @click="openModal"
      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
      {{ connectionStatus.connected ? 'Disconnect' : 'Connect' }}
    </button>
    <button
      type="button"
      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
      {{ connectionStatus }}
    </button>
  </span>
</template>

<script setup>
  import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/vue';

  // 1. Get projectId
  const projectId = process.env.VUE_APP_VITE_PROJECT_ID;

  // 2. Set chains
  const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/7356919a42b14ea8b4965ebdf6b1873b',
  };

  // 3. Create modal
  const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com',
    icons: ['https://avatars.mywebsite.com/'],
  };

  const modal = createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId,
  });

  const { useStore } = require('vuex');

  const store = useStore();
  store.dispatch('setWeb3Modal', modal);

  import { computed } from 'vue';
  const connectionStatus = computed(() => store.getters.getConnectionStatus);
  const updateStatus = () => store.dispatch('setConnectionState');
  const openModal = () => modal.open();
  const switchNetwork = () => modal.open({ view: 'Networks' });
</script>
