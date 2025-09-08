<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import {
    ListboxContent,
    ListboxGroup,
    ListboxItem,
    ListboxRoot,
} from 'radix-vue'

import { useDebounce } from '@/composables/useDebounce'
import { type DashSmartSelect } from '@/types'

const props = defineProps<DashSmartSelect & { isLoading: boolean }>()
const emit = defineEmits(['update:modelValue', 'onSearch'])

const isFocus = ref(false)
const isMultiple = props.multiple ?? false

// Estado interno
const internalValue = ref<any | any[]>(props.modelValue ?? (isMultiple ? [] : null))
const internalInput = ref("")

// Debounce para búsqueda
const { debounce } = useDebounce({ timeDebounce: 400 })

// Flag para diferenciar selección vs escritura
const isSelecting = ref(false)

// Cuando selecciono un item
watch(
    () => internalValue.value,
    (newValue) => {
        if (isMultiple) {
            internalInput.value = (newValue ?? []).map((x: any) => x.label).join(', ')
        } else {
            internalInput.value = newValue?.label ?? ""
        }

        emit('update:modelValue', props.reduce ? props.reduce(newValue) : newValue)

        // forzar reset de búsqueda
        isSelecting.value = true
        emit('onSearch', null)
    }
)

// Cuando escribo en el input
watch(
    () => internalInput.value,
    (newValue) => {
        debounce(() => {
            // Si el cambio vino de una selección → no dispares búsqueda con el label
            if (isSelecting.value) {
                isSelecting.value = false
                return
            }
            emit('onSearch', newValue === "" ? null : newValue)
        })
    }
)

// Detectar click fuera para cerrar
const rootEl = ref<HTMLElement | null>(null)
const onClickOutside = (e: MouseEvent) => {
    if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
        isFocus.value = false
    }
}

onMounted(() => {
    document.addEventListener('mousedown', onClickOutside)
})
onBeforeUnmount(() => {
    document.removeEventListener('mousedown', onClickOutside)
})
</script>

<template>
    <fieldset :name="props.name" ref="rootEl" class="relative w-full">
        <label class="text-slate-700" v-if="props.label" :for="`${props.name}-input`">
            {{ props.label }}
        </label>

        <!-- Input -->
        <input v-model="internalInput" type="text"
            class="inline-flex w-[100%] items-center border border-gray-400 data-[valid=false]:border-red-500 data-[valid=false]:border-2 data-[valid=false]:ring-red justify-between rounded-sm px-[15px] text-[13px] leading-none h-[35px] gap-[5px] focus:ring-2 focus:ring-royal-purple-500 bg-white text-slate-800 shadow-2sm shadow-black/10 hover:bg-royal-purple-50 focus:shadow-[0_0_0_2px] focus:royal-purple-800 data-placeholder:text-slate-700 outline-hidden"
            @focus="isFocus = true" />

        <!-- Dropdown -->
        <transition enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
            <ListboxRoot :multiple="isMultiple" v-model="internalValue" v-if="isFocus" class="absolute top-full left-0 mt-2 w-full z-50
                       flex flex-col rounded-lg shadow-lg border
                       border-gray-300
                       dark:border-stone-900 overflow-hidden
                       bg-white text-slate-800">
                <ListboxContent class="relative p-1 max-h-60 overflow-auto min-h-8">
                    <!-- Overlay de carga -->
                    <div v-if="props.isLoading"
                        class="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div
                            class="h-5 w-5 border-2 border-royal-purple-500 border-t-transparent animate-spin rounded-full">
                        </div>
                    </div>

                    <ListboxGroup class="w-full">
                        <!-- Custom slot -->
                        <template v-if="$slots.item">
                            <slot v-for="(item, index) in props.options" :key="index" name="item" :item="item" />
                        </template>

                        <!-- Default rendering -->
                        <ListboxItem v-if="!$slots.item" v-for="(item, index) in props.options" :key="index"
                            :value="item" class="w-full cursor-pointer flex items-center px-3 py-1 text-sm
                                   rounded hover:bg-royal-purple-100
                                   data-[highlighted]:bg-royal-purple-200
                                   data-[state=checked]:bg-royal-purple-100
                                   data-[state=checked]:text-royal-purple-800
                                    focus:ring-2 focus:ring-royal-purple-500
                                    focus-visible:ring-2 focus-visible:ring-royal-purple-500
                                    data-[disabled]:opacity-50">
                            <span>{{ item.label }}</span>
                            <slot name="before" :item="item" />
                        </ListboxItem>

                        <!-- Mensaje si no hay items -->
                        <template v-if="props.options.length === 0 && !props.isLoading">
                            <ListboxItem disabled :value="''" class="w-full cursor-pointer flex items-center px-3 py-1 text-sm
                                       rounded hover:bg-royal-purple-100
                                       data-[highlighted]:bg-royal-purple-200
                                       data-[state=checked]:bg-royal-purple-100
                                       data-[state=checked]:text-royal-purple-800
                                       focus:ring-2 focus:ring-royal-purple-500
                                       focus-visible:ring-2 focus-visible:ring-royal-purple-500
                                       data-[disabled]:opacity-50">
                                <span>{{ $t('errorMessages.itemsNotFound') }}</span>
                            </ListboxItem>
                        </template>
                    </ListboxGroup>
                </ListboxContent>
            </ListboxRoot>
        </transition>
    </fieldset>
</template>
