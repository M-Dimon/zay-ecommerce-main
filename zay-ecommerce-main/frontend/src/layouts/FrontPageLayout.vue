<script setup>
import TopNav from '@/components/TopNav.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SearchModal from '@/components/SearchModal.vue';
import FooterBar from '@/components/FooterBar.vue';
</script>

<template>
  <TopNav />
  <HeaderBar />
  <SearchModal />
  <slot />
  <FooterBar />
</template>
