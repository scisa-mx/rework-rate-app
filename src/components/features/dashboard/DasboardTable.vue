<template>
  <section class="" name="dashboard-table">
    <OptionsBar></OptionsBar>
    <section class="grid grid-cols-2 gap-4" name="rework-rate">
      <HistoricalWidget></HistoricalWidget>
      <article class="col-span-1">
      </article>
    </section>
  </section>
</template>

<script lang="ts" setup>
import HistoricalWidget from './widgets/HistoricalWidget.vue'
import OptionsBar from '@/components/features/dashboard/OptionsBar.vue';

</script>
