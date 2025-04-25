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
          class="min-w-[220px] shadow outline-none bg-white rounded-md p-[5px]"
          :side-offset="5"
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              value="more tools"
              class="group w-full text-[13px] cursor-pointer leading-none text-royal-gray-800 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none"
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
                  v-for="widgettype in WIDGETS"
                  :key="widgettype.id"
                  @click="addWidget(widgettype.widgetType)"
                  class="group text-[13px] leading-none rounded flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none"
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
import { ref, onMounted } from 'vue'
import DashButton from '@/components/buttons/DashButton.vue'
import { TYPE_WIDGET } from '@/types/widgets/widgets'

const toggleState = ref(false)

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

const widgetsInLocalStorage = ref<any[]>([])

// Función para agregar widget
const addWidget = (widgetType: TYPE_WIDGET) => {
  toggleState.value = false

  // Guardamos el widget en el array
  const newWidget = {
    id: widgetType,
    type: widgetType,
    state: 'READY', // Estado inicial del widget
  }

  widgetsInLocalStorage.value.push(newWidget)
  saveWidgetsToLocalStorage()
  alert('Agregando widget: ' + widgetType)
}

// Función para guardar los widgets en el localStorage
const saveWidgetsToLocalStorage = () => {
  localStorage.setItem('widgets', JSON.stringify(widgetsInLocalStorage.value))
}

// Función para cargar los widgets desde localStorage
const loadWidgetsFromLocalStorage = () => {
  const storedWidgets = localStorage.getItem('widgets')
  if (storedWidgets) {
    widgetsInLocalStorage.value = JSON.parse(storedWidgets)
  }
}

// Al montar el componente, cargamos los widgets desde localStorage
onMounted(() => {
  loadWidgetsFromLocalStorage()
  fetchWidgetsData() // Hacemos la petición de los widgets cargados
})

// Función para hacer las peticiones de los widgets
const fetchWidgetsData = async () => {
  for (const widget of widgetsInLocalStorage.value) {
    if (widget.state === 'READY') {
      await fetchWidgetData(widget)
    }
  }
}

// Simulación de la función de petición de datos
const fetchWidgetData = async (widget: any) => {
  try {
    console.log(`Fetching data for widget ${widget.id}`)
    // Simular la actualización de datos y el cambio de estado
    widget.state = 'DATA_IMPLEMENTED'
    saveWidgetsToLocalStorage()
  } catch (error) {
    widget.state = 'ERROR'
    saveWidgetsToLocalStorage()
    console.error('Error fetching data for widget', error)
  }
}

const handlerModifyDashboard = () => {
  alert('Modificar dashboard')
}
</script>
