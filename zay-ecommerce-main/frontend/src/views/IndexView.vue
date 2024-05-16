<script setup>
import FrontPageLayout from '@/layouts/FrontPageLayout.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import FrontPageCategories from '@/components/FrontPageCategories.vue';
import FrontPageFeaturedProducts from '@/components/FrontPageFeaturedProducts.vue';
</script>

<template>
  <FrontPageLayout>
    <HeroBanner />
    <FrontPageCategories />
    <FrontPageFeaturedProducts />
  </FrontPageLayout>
</template>
