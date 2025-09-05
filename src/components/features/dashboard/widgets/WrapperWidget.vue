<template>
    <article class="flex flex-col gap-4 px-1">
        <section name="widget-header" class="flex items-center justify-between">
            <div name="widget-title">
                <DashTypography variant="h6" class="text-slate-700 font-semibold">
                    {{ title }}
                </DashTypography>
            </div>
            <div class="flex items-center justify-center" name="widget-actions">
                <span @click="onDelete" class="cursor-pointer hover:text-gray-500">
                    <vue-feather size="18" type="x" />
                </span>
            </div>
        </section>
        <slot></slot>
    </article>
</template>


<script setup lang="ts">
import DashTypography from '@/components/typography/DashTypography.vue';
import { useDashboardStore } from '@/stores/dashboard'

type WrapperWidgetProps = {
    title: string
    widgetId: string
}

const dashboardStore = useDashboardStore()

const props = defineProps<WrapperWidgetProps>()

const onDelete = () => {
    dashboardStore.DELETE_WIDGET(props.widgetId)
}

</script>