<template>
  <span class="isolate inline-flex rounded-md shadow-sm">
    <div class="hidden">{{ connectionStatus }}</div>
    <w3m-button size="sm" balance="hide" label="Connect to the Chain" />
  </span>
</template>

<script setup>
  import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue';
  import { mainnet, gnosisChiado } from '@wagmi/core/chains';

  const iExec = {
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

  // 1. Get projectId
  const projectId = process.env.VUE_APP_VITE_PROJECT_ID;

  // 2. Create wagmiConfig
  const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  };

  const chains = [mainnet, gnosisChiado, iExec];
  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

  createWeb3Modal({ wagmiConfig, projectId, chains });

  const { useStore } = require('vuex');
  const store = useStore();
  import { computed } from 'vue';
  const connectionStatus = computed(() => store.getters.getConnectionStatus);

  import { getAccount } from '@wagmi/core';
  const updateStatus = async () => {
    const connector = getAccount()?.connector;
    const address = await connector?.getAccount();
    const chainId = await connector?.getChainId();
    store.dispatch('setConnectionState', { address, chainId, connected: !!address });
  };
  setInterval(updateStatus, 1000);
</script>

<style>
  wui-text {
    color: white !important;
  }
  w3m-button {
    background-color: transparent !important;
  }
</style>
