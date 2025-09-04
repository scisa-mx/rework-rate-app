<template>
    <WrapperWidget :title="'Historico Rework Rate'" :widget-id="props.layoutItem.i">
        <FiltersReworkRate></FiltersReworkRate>
    </WrapperWidget>
</template>

<script setup lang="ts">
import WrapperWidget from '@/components/features/dashboard/widgets/WrapperWidget.vue';
import FiltersReworkRate from '@/features/reworkRate/components/FiltersReworkRate.vue';


const props = defineProps<{
  layoutItem: { x: number; y: number; w: number; h: number; i: string }
}>()


</script>