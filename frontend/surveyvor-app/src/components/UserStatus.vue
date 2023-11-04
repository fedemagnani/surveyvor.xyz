<template>
  <span class="isolate inline-flex rounded-md shadow-sm">
    <template>
      <button
        type="button"
        @click="updateStatus"
        class="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
        <span v-if="connectionStatus.connected && connectionStatus.address">
          <text class="text-green-400">Connected</text>
          as {{ connectionStatus.address.slice(0, 6) + '...' + connectionStatus.address.slice(-4) }}
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
    </template>
    <button class="p-3 bg-white text-black" @click="tryPd">Try PD</button>
    <w3m-button size="sm" balance="hide" label="Connect to the Chain" />
  </span>
</template>

<script setup>
  import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue';
  // import { mainnet, gnosisChiado } from '@wagmi/core/chains';

  const ie = {
    id: 0x86,
    name: 'iExec Sidechain',
    network: 'bellecour',
    nativeCurrency: {
      decimals: 18,
      name: 'xRLC',
      symbol: 'xRLC',
    },
    rpcUrls: {
      public: { http: ['https://bellecour.iex.ec'] },
      default: { http: ['https://bellecour.iex.ec'] },
    },
    blockExplorers: {
      etherscan: {
        name: 'Blockscout',
        url: 'https://blockscout-bellecour.iex.ec',
      },
      default: { name: 'Blockscout', url: 'https://blockscout-bellecour.iex.ec' },
    },
  };

  console.log('iexec:', ie);

  import { getAccount } from '@wagmi/core';

  // 1. Get projectId
  const projectId = process.env.VUE_APP_VITE_PROJECT_ID;

  // 2. Create wagmiConfig
  const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  };

  const chains = [ie];
  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

  const modal = createWeb3Modal({ wagmiConfig, projectId, chains });

  const { useStore } = require('vuex');

  const store = useStore();
  store.dispatch('setWeb3Modal', modal);

  // Data Protector iExec
  import { IExecDataProtector } from '@iexec/dataprotector';

  const protectDataFunc = async (data, name) => {
    const result = getAccount();
    const provider = await result.connector?.getProvider();
    console.log('provider:', provider);
    const dataProtector = new IExecDataProtector(provider);
    const protectedData = await dataProtector.protectData({ data, name });
    console.log('protectedData:', protectedData);
    return protectedData;
  };

  import { computed } from 'vue';
  const connectionStatus = computed(() => store.getters.getConnectionStatus);

  const updateStatus = () => store.dispatch('setConnectionState');
  const tryPd = async () => {
    setTimeout(async () => {
      console.log('connectionStatus:', connectionStatus);
      try {
        await protectDataFunc({ email: 'filippocarboni99@gmail.com' }, 'email');
      } catch (error) {
        console.log('error:', error);
      }
    }, 1000);
  };

  const openModal = () => modal.open();
  const switchNetwork = () => modal.open({ view: 'Networks' });
</script>

<style>
  wui-text {
    color: white !important;
  }
  w3m-button {
    background-color: transparent !important;
  }
</style>
