<template>
  <fieldset :name="props.name" class="relative">
    {{ currentValue }}
    <label v-if="props.label" :for="`${props.name}-input`" class="text-slate-700">
      {{ props.label }}
    </label>

    <input
      type="text"
      :id="`${props.name}-input`"
      class="inline-flex w-full items-center border border-gray-400 data-[valid=false]:border-red-500 data-[valid=false]:border-2 data-[valid=false]:ring-red justify-between rounded-sm px-[15px] text-[13px] leading-none h-[35px] gap-[5px] focus:ring-2 focus:ring-royal-purple-500 bg-white text-slate-800 shadow-2sm shadow-black/10 hover:bg-royal-purple-50 focus:shadow-[0_0_0_2px] focus:royal-purple-800 data-placeholder:text-slate-700 outline-hidden"
      placeholder="Buscar repositorio..."
      v-model="currentValue"
      autocomplete="off"
      :data-valid="true"
      @focus="handleFocus"
      ref="inputEl"
    />

    <teleport to="body">
      <div v-if="isFocused" ref="dropdownEl" :style="dropdownStyles">
        <DashListBox @update:model-value="onChange" :options="props.options" />
      </div>
    </teleport>
  </fieldset>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import DashListBox from '@/components/inputs/DashListBox.vue'
import { type DashSearchProps } from '@/types'

let debounceTimeout: ReturnType<typeof setTimeout> | undefined

const props = defineProps<DashSearchProps>()

const currentValue = ref('')
const isFocused = ref(false)

const inputEl = ref<HTMLElement | null>(null)
const dropdownEl = ref<HTMLElement | null>(null)
const dropdownStyles = ref<Record<string, string>>({})

const onChange = (value: string) => {
  currentValue.value = value.split('/').pop() ?? ''
}

watch(currentValue, (newValue) => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    props.callback?.(newValue)
  }, 300)
})

const updateDropdownPosition = () => {
  if (!inputEl.value) return
  const rect = inputEl.value.getBoundingClientRect()
  dropdownStyles.value = {
    top: `${rect.bottom + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
    width: `${rect.width}px`,
    position: 'absolute',
    zIndex: '9999',
  }
}

const handleFocus = async () => {
  isFocused.value = true
  await nextTick()
  updateDropdownPosition()
}

// Esta funcion se activa cuando se pierde el foco del input, funciona para cerrar el dropdown
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  const clickedOutside =
    inputEl.value &&
    !inputEl.value.contains(target) &&
    dropdownEl.value &&
    !dropdownEl.value.contains(target)

  if (clickedOutside) {
    isFocused.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', updateDropdownPosition, true)
  window.addEventListener('resize', updateDropdownPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updateDropdownPosition, true)
  window.removeEventListener('resize', updateDropdownPosition)
})


</script>
