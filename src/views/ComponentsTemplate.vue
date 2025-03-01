<template>
  <main class="flex flex-col gap-5">
    <section>
      <DashGrid name="grid-system" :rows="3" :cols="4" :gap="4">
        <DashPanel :padding="4" :row-span="3" :col-span="2"> 1 </DashPanel>
        <DashPanel :padding="4" :row-span="2" :col-span="3"> 2 </DashPanel>
        <DashPanel :padding="4" :row-span="5" :col-span="3"> 3</DashPanel>
      </DashGrid>
    </section>
    <section>
      <DashGrid name="toast" :rows="1" :cols="1" :gap="4">
        <DashPanel :padding="4" :row-span="1" :col-span="1">
          <h3>Toast</h3>
          <button @click="notify">Mostrar Notificación</button>
        </DashPanel>
      </DashGrid>
    </section>
  </main>
</template>

<script setup lang="ts">
import DashPanel from '@/components/grids/DashPanel.vue'
import DashGrid from '@/components/grids/DashGrid.vue'

import { useToast } from '@/@core/toast/useToast'

const { showToast } = useToast()

function notify() {
  showToast({
    title: '¡Operación exitosa!',
    description: 'Tu acción se ha completado correctamente.',
    type: 'foreground',
    duration: 3000,
    variant: 'INFO',
  })
}
</script>
