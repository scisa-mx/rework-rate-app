<template>
  <section class="" name="dashboard-table">
    <OptionsBar></OptionsBar>
    <WidgetBoard></WidgetBoard> 
    <!-- <HistoricalWidget></HistoricalWidget> -->
  </section>
</template>

<script lang="ts" setup>
import OptionsBar from '@/components/features/dashboard/OptionsBar.vue'
import WidgetBoard from './widgets/WidgetBoard.vue'
import HistoricalWidget from './widgets/HistoricalWidget.vue';
</script>
