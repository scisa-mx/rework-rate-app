<template>
    <fieldset :name="props.name" ref="rootEl" class="relative w-full">
        <label v-if="props.label" class="text-slate-700" :for="`${props.name}-input`">{{ props.label }}</label>
        <!-- w-[100%] items-center border border-gray-400 data-[valid=false]:border-red-500 data-[valid=false]:border-2 data-[valid=false]:ring-red justify-between rounded-sm px-[15px] text-[13px] leading-none h-[35px] gap-[5px] focus:ring-2 focus:ring-royal-purple-500 bg-white text-slate-800 shadow-2sm shadow-black/10 hover:bg-royal-purple-50 focus:shadow-[0_0_0_2px] focus:royal-purple-800 data-placeholder:text-slate-700 outline-hidden -->
        <!-- Selected tags (chips) + input -->
        <div class="relative flex flex-wrap items-center gap-1 border border-gray-400 rounded-sm px-2 bg-white min-h-[35px]"
            @click="focusInput">
            <template :key="t.id ?? `new-${i}`" v-for="(t, i) in internalValue">
                <div
                    class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-royal-purple-50 text-royal-purple-800 text-sm">
                    <span>{{ t.name }}</span>
                    <button type="button" @click.stop="removeTag(t)"
                        class="w-4 h-4 cursor-pointer flex items-center justify-center rounded-full hover:bg-royal-purple-100"
                        aria-label="remove tag">
                        ×
                    </button>
                </div>
            </template>

            <input ref="inputEl" v-model="internalInput" :placeholder="props.placeholder" @focus="openList"
                @keydown.enter.prevent="onEnter"
                class="flex-1 min-w-[120px] text-sm outline-none py-1 px-1 bg-transparent" aria-autocomplete="list"
                aria-expanded="true" />
        </div>

        <!-- Dropdown list -->
        <!-- Dropdown list -->
        <transition enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
            <ListboxRoot v-model="internalValue" :multiple="true" v-if="isOpen"
                class="absolute top-full left-0 mt-2 w-full z-50 flex flex-col rounded-lg shadow-lg border border-gray-300 overflow-hidden bg-white text-slate-800">
                <ListboxContent class="relative p-1 max-h-60 overflow-auto">
                    <!-- Opciones -->
                    <ListboxGroup class="w-full">
                        <ListboxItem v-for="(item, index) in filteredOptions" :key="item.id ?? index" :value="item"
                            class="w-full cursor-pointer flex items-center justify-between px-3 py-2 text-sm rounded hover:bg-royal-purple-100
                 data-[state=checked]:bg-royal-purple-100
                 data-[state=checked]:text-royal-purple-800">
                            <div class="flex items-center gap-2">
                                <span>{{ item.name }}</span>
                            </div>
                            <span class="ml-2" v-if="$slots.after">
                                <slot name="after" :item="item" />
                            </span>
                        </ListboxItem>
                    </ListboxGroup>
                </ListboxContent>
            </ListboxRoot>
        </transition>

    </fieldset>
</template>

<script setup lang="ts">
/**
 * TagsInput.vue
 *
 * Props:
 * - options: Tag[]  -> lista de tags disponibles (sugerencias)
 * - modelValue: Tag[] -> tags seleccionados (v-model)
 * - isLoading: boolean -> muestra overlay cargando
 * - placeholder, label, name
 *
 * Emits:
 * - update:modelValue (nuevo array de tags)
 * - onSearch (query string | null)
 * - onCreateTag (name: string) -> pedir al padre que cree la tag (puede retornar la tag creada)
 */

import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import {
    ListboxContent,
    ListboxGroup,
    ListboxItem,
    ListboxRoot,
} from 'radix-vue'
import { useDebounce } from '@/composables/useDebounce'

import type { Tag } from '@/types/benchmarks/tags'

/* ---------- Types ---------- */


interface Props {
    options: Tag[]
    modelValue?: Tag[]
    isLoading?: boolean
    label?: string
    name?: string
    placeholder?: string
    createIfNotExists?: boolean // si true, permitir crear tag con Enter
}

/* ---------- Props & Emits ---------- */
const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [Tag[]],
    'onSearch': [string | null],
    'onCreateTag': [string],
    'onRemove': [Tag]
}>()

/* ---------- State ---------- */
const inputEl = ref<HTMLInputElement | null>(null)
const rootEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const internalInput = ref('')
const isSelecting = ref(false) // para distinguir selección vs escritura
// const currentTags = ref<Tag[]>([]) // para ListboxRoot (v-model)

const internalValue = ref<Tag[]>(props.modelValue ? [...props.modelValue] : [])

/* debounce hook (usar el tuyo) */
const { debounce } = useDebounce({ timeDebounce: 300 })

/* ---------- Computed ---------- */
// Filtra opciones según input (sin mutar props.options)
const filteredOptions = computed(() => {
    const q = internalInput.value?.trim().toLowerCase() ?? ''
    if (!q) return props.options ?? []
    return (props.options ?? []).filter((t) => (t.name ?? '').toLowerCase().includes(q))
})

// Si el input no está vacío y no hay coincidencias exactas, permitimos crear
const canCreate = computed(() => {
    const q = internalInput.value?.trim()
    if (!q) return false
    const exact = (props.options ?? []).some((t) => (t.name ?? '').toLowerCase() === q.toLowerCase())
    return !!props.createIfNotExists && !exact
})

/* ---------- Watchers ---------- */
// Watch para mantener sincronizado con v-model del padre
watch(
  () => props.modelValue,
  (nv) => {
    internalValue.value = nv ? [...nv] : []
  },
  { immediate: true }
)

// Watch inverso: cuando cambia el ListboxRoot, emitimos hacia el padre
watch(
  () => internalValue.value,
  (nv) => {
    emit('update:modelValue', nv)
  },
  { deep: true }
)


/* ---------- Methods ---------- */
function openList() {
    isOpen.value = true
}

function closeList() {
    isOpen.value = false
}

function focusInput() {
    inputEl.value?.focus()
    openList()
}

function isSelected(item: Tag) {
    return internalValue.value.some((t) => t.id !== undefined ? t.id === item.id : t.name === item.name)
}

function selectTag(item: Tag) {
    // Evitar duplicados
    if (!isSelected(item)) {
        internalValue.value = [...internalValue.value, item]
        emit('update:modelValue', internalValue.value)
    }
    // Anotar que fue selección y resetear búsqueda en el padre
    isSelecting.value = true
    emit('onSearch', null)
    // Mantener input con el label de la selección (pero no disparar búsqueda por eso)
    internalInput.value = ''
    // dejar la lista abierta para seguir seleccionando (opcional)
    openList()
    focusInput()
}

function removeTag(tag: Tag) {
    // Eliminar tag de internalValue
    internalValue.value = internalValue.value.filter((t) => !(t.id !== undefined ? t.id === tag.id : t.name === tag.name))

    emit('update:modelValue', internalValue.value)
    emit('onRemove', tag)
}

function createTagFromInput() {
    const name = internalInput.value?.trim()
    if (!name) return
    // Emitir que se quiere crear; el padre puede crear y actualizar options/modelValue
    emit('onCreateTag', name)
    // Limpiar input y cerrar/abrir según UX que quieras
    internalInput.value = ''
    // marcar selección para que no dispare onSearch al limpiar
    isSelecting.value = true
    emit('onSearch', null)
    focusInput()
}

function onEnter() {
    // Si hay una opción seleccionable (primer filtro), seleccionarla
    const first = filteredOptions.value[0]
    if (first && internalInput.value.trim() !== '' && (first.name ?? '').toLowerCase().startsWith(internalInput.value.trim().toLowerCase())) {
        selectTag(first)
        return
    }

    // Si permitimos creación y no hay coincidencia exacta -> crear
    if (canCreate.value) {
        createTagFromInput()
        return
    }
}

function onBackspace(e: KeyboardEvent) {
    // Si input vacío -> eliminar último tag
    if ((internalInput.value ?? '') === '') {
        if (internalValue.value.length > 0) {
            const last = internalValue.value[internalValue.value.length - 1]
            removeTag(last)
        }
    }
}

/* Click fuera para cerrar */
const onClickOutside = (e: MouseEvent) => {
    if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
        closeList()
    }
}

onMounted(() => {
    document.addEventListener('mousedown', onClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', onClickOutside)
})
</script>
