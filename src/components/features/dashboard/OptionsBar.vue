<template>
  <div class="flex flex-row-reverse bg-white p-2 gap-2 mb-4 shadow rounded">
    <DashButton @click="handlerModifyDashboard" size="md" variant="secondary">
      <span class="flex items-center gap-1">
        <vue-feather size="18" type="edit" />
        Editar dashboard
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
          class="min-w-[220px] shadow outline-none bg-white rounded-md p-[5px] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          :side-offset="5"
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              value="more toolsz"
              class="group w-full text-[13px] cursor-pointer leading-none text-royal-gray-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-royal-purple-50 data-[state=open]:text-royal-purple-500 data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-royal-purple-50 data-[highlighted]:text-royal-purple-500 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1"
            >
              <span class="flex gap-1 items-center"> Agregar widget </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                :side-offset="2"
                :align-offset="-5"
              >
                <DropdownMenuItem
                  v-for="widgettype in WIDGETS"
                  @click="addWidget(widgettype.widgetType)"
                  class="group text-[13px] leading-none rounded flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-gray-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-royal-purple-50 data-[highlighted]:text-royal-purple-500 cursor-pointer"
                >
                  {{ widgettype.name }}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'radix-vue'

const toggleState: Ref<boolean> = ref(false)
import DashButton from '@/components/buttons/DashButton.vue'

import { TYPE_WIDGET } from '@/types/widgets/widgets'

const WIDGETS = [
  {
    id: 'historical',
    name: 'Historico',
    widgetType: TYPE_WIDGET.HISTORICAL,
  },
  {
    id: 'media',
    name: 'Mediana y Media',
    widgetType: TYPE_WIDGET.MEDIA,
  },
]

const addWidget = (widgetType: TYPE_WIDGET) => {
  toggleState.value = false
  alert('Agregando widget: ' + widgetType)
}

const handlerModifyDashboard = () => {
  alert('Modificar dashboard')
}
</script>
