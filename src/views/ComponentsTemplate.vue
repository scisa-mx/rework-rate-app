<template>
  <section>
    <DashGrid name="grid-system" :rows="10" :cols="4" :gap="4">
      <DashPanel :padding="4" :row-span="10" :col-span="2"> 1 </DashPanel>
      <DashPanel :padding="4" :row-span="5" :col-span="2"> 2 </DashPanel>
      <DashPanel :padding="4" :row-span="5" :col-span="2"> 3</DashPanel>
    </DashGrid>
  </section>
</template>

<script setup lang="ts">
import DashPanel from '@/components/grids/DashPanel.vue'
import DashGrid from '@/components/grids/DashGrid.vue'
</script>
