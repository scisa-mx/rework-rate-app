<template>
  <fieldset :name="props.name" ref="rootEl" class="relative w-full">
    <label v-if="props.label" class="text-slate-700" :for="`${props.name}-input`">
      {{ props.label }}
    </label>

    <!-- Selected tags (chips) + input -->
    <div
      class="relative flex flex-wrap items-center gap-1 border border-gray-400 rounded-sm px-2 bg-white min-h-[35px]"
      @click="focusInput"
    >
      <template v-for="(t, i) in model" :key="t.id ?? `new-${i}`">
        <div class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-royal-purple-50 text-royal-purple-800 text-sm">
          <span>{{ t.name }}</span>
          <button
            type="button"
            @click.stop="removeTag(t)"
            class="w-4 h-4 cursor-pointer flex items-center justify-center rounded-full hover:bg-royal-purple-100"
            aria-label="remove tag"
          >
            ×
          </button>
        </div>
      </template>

      <input
        ref="inputEl"
        v-model="internalInput"
        :placeholder="props.placeholder"
        @focus="openList"
        @keydown.enter.prevent="onEnter"
        @keydown.backspace="onBackspace"
        class="flex-1 min-w-[120px] text-sm outline-none py-1 px-1 bg-transparent"
        aria-autocomplete="list"
        aria-expanded="true"
      />
    </div>

    <!-- Dropdown list -->
    <transition enter-active-class="animate-fade-in" leave-active-class="animate-fade-out">
      <ListboxRoot v-model="model" :multiple="true" v-if="isOpen"
        class="absolute top-full left-0 mt-2 w-full z-50 flex flex-col rounded-lg shadow-lg border border-gray-300 overflow-hidden bg-white text-slate-800">
        <ListboxContent class="relative p-1 max-h-60 overflow-auto">
          <!-- Loading overlay (if provided) -->
          <div v-if="props.isLoading" class="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div class="h-5 w-5 border-2 border-royal-purple-500 border-t-transparent animate-spin rounded-full"></div>
          </div>

          <ListboxGroup class="w-full">
            <!-- Option to create new tag -->
            <div v-if="canCreate" class="px-3 py-2 border-b mb-1 border-slate-400">
              <button
                class="text-slate-600 px-1 w-full text-left text-sm py-1 rounded cursor-pointer hover:bg-royal-purple-50"
                @click="createTagFromInput"
                type="button"
              >
                {{ $t ? $t('createTag') : 'Create tag' }} "<strong>{{ internalInput }}</strong>"
              </button>
            </div>

            <!-- Items (Radix will manage selection via v-model="model") -->
            <ListboxItem
              v-for="(item, index) in filteredOptions"
              :key="item.id ?? index"
              :value="item"
              class="w-full cursor-pointer flex items-center justify-between px-3 py-2 text-sm rounded hover:bg-royal-purple-100
                 data-[state=checked]:bg-royal-purple-100
                 data-[state=checked]:text-royal-purple-800"
            >
              <div class="flex items-center gap-2">
                <span>{{ item.name }}</span>
              </div>
              <span class="ml-2" v-if="$slots.after">
                <slot name="after" :item="item" />
              </span>
            </ListboxItem>

            <!-- No results -->
            <template v-if="filteredOptions.length === 0 && !props.isLoading">
              <div class="px-3 py-2 text-sm text-slate-500">
                {{ $t ? $t('errorMessages.itemsNotFound') : 'No tags found' }}
              </div>
            </template>
          </ListboxGroup>
        </ListboxContent>
      </ListboxRoot>
    </transition>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { ListboxContent, ListboxGroup, ListboxItem, ListboxRoot } from 'radix-vue'
import { useDebounce } from '@/composables/useDebounce'

/* ---------- Types ---------- */
export interface Tag {
  id?: string | null
  name: string
  color?: string
  [k: string]: any
}

interface Props {
  options: Tag[]
  modelValue?: Tag[]
  isLoading?: boolean
  label?: string
  name?: string
  placeholder?: string
  createIfNotExists?: boolean
}

/* ---------- Props & Emits ---------- */
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: Tag[]): void
  (e: 'onSearch', value: string | null): void
  (e: 'onCreateTag', name: string): void
  (e: 'onRemove', tag: Tag): void
  (e: 'onAssign', tag: Tag): void
}>()

/* ---------- Refs & State ---------- */
const inputEl = ref<HTMLInputElement | null>(null)
const rootEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const internalInput = ref('')
const isSelecting = ref(false) // flag to ignore input-triggered searches immediately after a selection

/* ---------- Single source of truth (computed v-model) ---------- */
const model = computed<Tag[]>({
  get: () => (props.modelValue ? [...props.modelValue] : []),
  set: (val: Tag[]) => {
    // Emit new array to parent
    emit('update:modelValue', val)
  },
})

/* ---------- Debounce for search ---------- */
const { debounce } = useDebounce({ timeDebounce: 300 })

/* ---------- Helpers ---------- */
const eqTag = (a: Tag, b: Tag) => {
  if (a.id !== undefined && a.id !== null && b.id !== undefined && b.id !== null) return a.id === b.id
  return (a.name ?? '') === (b.name ?? '')
}

/* ---------- Computed ---------- */
const filteredOptions = computed(() => {
  const q = (internalInput.value ?? '').trim().toLowerCase()
  if (!q) return props.options ?? []
  return (props.options ?? []).filter((t) => (t.name ?? '').toLowerCase().includes(q))
})

const canCreate = computed(() => {
  const q = (internalInput.value ?? '').trim()
  if (!q) return false
  const exact = (props.options ?? []).some((t) => (t.name ?? '').toLowerCase() === q.toLowerCase())
  return !!props.createIfNotExists && !exact
})

/* ---------- Watchers ---------- */
// input -> debounced onSearch, but skip if selection just happened
watch(
  () => internalInput.value,
  (nv) => {
    debounce(() => {
      if (isSelecting.value) {
        // change caused by selection, ignore this search and clear flag
        isSelecting.value = false
        return
      }
      emit('onSearch', nv === '' ? null : nv)
    })
  }
)

// watch props.modelValue to detect added/removed tags and emit onAssign/onRemove accordingly
watch(
  () => props.modelValue,
  (newVal = [], oldVal = []) => {
    const newArr = newVal ?? []
    const oldArr = oldVal ?? []

    // find added items (in new but not in old)
    const added = newArr.filter((n) => !oldArr.some((o) => eqTag(o, n)))
    const removed = oldArr.filter((o) => !newArr.some((n) => eqTag(n, o)))

    if (added.length > 0) {
      // A selection happened: avoid firing search triggered by clearing input
      isSelecting.value = true
      internalInput.value = ''
    }

    // Emit assigns for items that have id (existing tags)
    for (const a of added) {
      if (a.id) emit('onAssign', a)
    }

    // Emit removes
    for (const r of removed) {
      emit('onRemove', r)
    }
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

function removeTag(tag: Tag) {
  // remove by identity (id or name) using model setter
  const next = (model.value ?? []).filter((t) => !eqTag(t, tag))
  model.value = next
  // onRemove will be emitted by the watcher on props.modelValue when parent updates modelValue
  // but in case parent doesn't update props.modelValue immediately, emit onRemove optimistically:
  // (emit will also come from the watcher once props change, duplicates are avoided because watcher runs after parent updates)
  emit('onRemove', tag)
}

function createTagFromInput() {
  const name = internalInput.value?.trim()
  if (!name) return
  emit('onCreateTag', name)
  internalInput.value = ''
  isSelecting.value = true
  emit('onSearch', null)
  focusInput()
}

function onEnter() {
  const q = internalInput.value.trim()
  const first = filteredOptions.value[0]

  // If matches first existing option -> select it programmatically
  if (first && q !== '' && (first.name ?? '').toLowerCase().startsWith(q.toLowerCase())) {
    // add if not already present
    if (!(model.value ?? []).some((t) => eqTag(t, first))) {
      model.value = [...(model.value ?? []), first]
    }
    // model watcher will emit onAssign for existing tag (if it has id)
    return
  }

  // If allowed, create new tag
  if (canCreate.value) {
    createTagFromInput()
    return
  }
}

function onBackspace() {
  // If input empty -> delete last tag
  if ((internalInput.value ?? '') === '') {
    const current = model.value ?? []
    if (current.length > 0) {
      const last = current[current.length - 1]
      removeTag(last)
    }
  }
}

/* Click outside to close */
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
