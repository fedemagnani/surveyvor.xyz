<template>
  <div>
    <router-view />
    <div class="absolute right-0 bottom-0">
      <UserStatus />
    </div>
  </div>
</template>

<script>
  import UserStatus from '@/components/UserStatus.vue';
  export default {
    name: 'App',
    components: {
      UserStatus,
    },
  };
</script>
