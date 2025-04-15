<script setup lang="ts">
import { ref, defineProps, useSlots } from 'vue'
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

/**
 * Definir las propiedades que permiten la personalización:
 * - triggerClass: clases para el elemento que dispara el menú.
 * - contentClass: clases para el contenedor del dropdown.
 * - sideOffset y alignOffset: para posicionar el menú.
 * - otras props según necesidad.
 */
const props = defineProps({
  triggerClass: { type: String, default: 'rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-grass11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black' },
  contentClass: { type: String, default: 'min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]' },
  sideOffset: { type: Number, default: 5 },
  alignOffset: { type: Number, default: 0 }
})


const open = ref(false)

function handleClick() {
  // Personaliza acciones aquí (por ejemplo, emitir un evento personalizado)
  alert('Acción ejecutada')
}

// Accedemos a los slots para permitir inserción de contenido personalizado
const slots = useSlots()
</script>

<template>
  <!-- Componente raíz del Dropdown -->
  <DropdownMenuRoot v-model:open="open">
    <!-- Slot para el trigger o bien uso de la prop triggerClass -->
    <DropdownMenuTrigger :class="props.triggerClass" aria-label="Customise options">
      <!-- Si se define el slot trigger, lo usamos; de lo contrario, usamos un ejemplo con ícono -->
      <slot name="trigger">
        <span>☰</span>
      </slot>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <!-- Componente de contenido del Dropdown -->
      <DropdownMenuContent
        :class="props.contentClass"
        :side-offset="sideOffset"
        :align-offset="alignOffset"
      >
        <!-- Aquí se puede definir un slot 'default' para el contenido personalizado -->
        <slot>
          <!-- Ejemplo de contenido:
               Opciones básicas, se pueden usar más slots para ítems o submenús -->
          <DropdownMenuItem @click="handleClick"
            class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1">
            Nueva pestaña
            <div class="ml-auto pl-[20px] text-mauve11">⌘+T</div>
          </DropdownMenuItem>
          <!-- Se pueden agregar submenús utilizando componentes internos de Radix -->
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4"
            >
              Más herramientas
              <div class="ml-auto pl-[20px] text-mauve11">
                <!-- Puedes usar un slot anidado o un ícono predeterminado -->
                <slot name="subTriggerIcon">
                  <span>›</span>
                </slot>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                :class="props.contentClass"
                :side-offset="2"
                :align-offset="-5"
              >
                <DropdownMenuItem class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1">
                  Guardar página como…
                  <div class="ml-auto pl-[20px] text-mauve11">⌘+S</div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator class="h-[1px] bg-green6 m-[5px]" />

          <!-- Ejemplo con checkbox -->
          <DropdownMenuCheckboxItem v-model:checked="open"
            class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1">
            <DropdownMenuItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <slot name="checkboxIcon">
                <span>✓</span>
              </slot>
            </DropdownMenuItemIndicator>
            Mostrar opción
          </DropdownMenuCheckboxItem>

          <!-- Puedes seguir agregando más secciones: radio group, labels, etc. -->
          <DropdownMenuLabel class="pl-[25px] text-xs leading-[25px] text-mauve11">
            Personas
          </DropdownMenuLabel>
          <!-- Flecha del Dropdown -->
          <DropdownMenuArrow class="fill-white" />
        </slot>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
