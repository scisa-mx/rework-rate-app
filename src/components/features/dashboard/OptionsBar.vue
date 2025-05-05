<template>
  <div class="flex flex-row-reverse bg-white p-2 gap-2 mb-4 shadow rounded">
    <DashButton @click="handlerModifyDashboard" size="md" variant="secondary">
      <span v-if="!stateBoard" class="flex items-center gap-1">
        <vue-feather size="18" type="edit" />
        Editar dashboard
      </span>
      <span v-else class="flex items-center gap-1">
        <vue-feather size="18" type="slash" />
        Congelar dashboard
      </span>
    </DashButton>

    <DropdownMenuRoot v-model:open="toggleState">
      <DropdownMenuTrigger>
        <DashButton variant="primary" size="md">
          <span class="flex items-center gap-1">
            Acciones
            <vue-feather size="18" type="chevron-down" />
          </span>
        </DashButton>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          :side="'bottom'"
          class="min-w-[220px] shadow outline-none bg-white rounded-md p-[5px]"
          :side-offset="5"
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              value="more tools"
              class="group w-full text-[13px] hover:bg-gray-100 hover:text-royal-purple-800 cursor-pointer leading-none text-royal-gray-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none"
            >
              <span class="flex gap-1 items-center"> Agregar widget </span>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent
                class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow"
                :side-offset="2"
                :align-offset="-5"
              >
                <DropdownMenuItem
                  v-for="widgettype in WIDGETS_LIST"
                  @click="addWidget(widgettype.widgetType)"
                  class="group text-[13px] hover:bg-gray-100 hover:text-royal-purple-800 cursor-pointer leading-none rounded flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none"
                >
                  {{ widgettype.name }}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'radix-vue'

const toggleState: Ref<boolean> = ref(false)
import DashButton from '@/components/buttons/DashButton.vue'
import { TYPE_WIDGET } from '@/types/widgets/widgets'
import { WIDGETS_LIST } from '@/types/widgets/widgets' 

import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()
const stateBoard = ref(false)

const addWidget = (widgetType: TYPE_WIDGET) => {
  dashboardStore.ADD_WIDGET(widgetType)
}

const handlerModifyDashboard = () => {
  dashboardStore.CHANGE_STATE_BOARD()
  stateBoard.value = !stateBoard.value
}

</script>
