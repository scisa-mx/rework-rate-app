<template>
  <main class="flex flex-col gap-5">
    <DashGrid name="grid-system" :rows="3" :cols="4" :gap="4">
      <DashPanel :padding="4" :row-span="3" :col-span="2"> 1 </DashPanel>
      <DashPanel :padding="4" :row-span="2" :col-span="3"> 2 </DashPanel>
      <DashPanel :padding="4" :row-span="5" :col-span="3"> 3</DashPanel>
    </DashGrid>

    <DashGrid name="toast" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="1" :col-span="1">
        <DashTypography variant="h3">Headings</DashTypography>
        <DashButton :size="'md'" :variant="'primary'" @click="notify"
          >Mostrar Notificación</DashButton
        >
      </DashPanel>
    </DashGrid>
    <DashGrid name="buttons-variants" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="1" :col-span="1">
        <DashTypography variant="h3">Variantes</DashTypography>
        <div class="flex flex-row gap-3">
          <DashButton size="sm" variant="primary">
            <span>Primario</span>
          </DashButton>
          <DashButton size="sm" variant="secondary">
            <span>Secundario</span>
          </DashButton>
          <DashButton size="sm" variant="success">
            <span>Exito</span>
          </DashButton>
          <DashButton size="sm" variant="danger">
            <span>Peligro</span>
          </DashButton>
          <DashButton size="sm" variant="warning">
            <span>Warning</span>
          </DashButton>
          <DashButton size="sm" variant="info">
            <span>Información</span>
          </DashButton>
        </div>
      </DashPanel>
    </DashGrid>
    <DashGrid name="buttons-sizes" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="1" :col-span="1">
        <DashTypography variant="h3">Tamaños</DashTypography>
        <section class="flex flex-col gap-3">
          <div class="flex flex-row gap-3">
            <DashButton size="sm" variant="primary">
              <span>Primario</span>
            </DashButton>
            <DashButton size="sm" variant="secondary">
              <span>Secundario</span>
            </DashButton>
          </div>
          <div class="flex flex-row gap-3">
            <DashButton size="md" variant="primary">
              <span>Primario</span>
            </DashButton>
            <DashButton size="md" variant="secondary">
              <span>Secundario</span>
            </DashButton>
          </div>
          <div class="flex flex-row gap-3">
            <DashButton size="lg" variant="primary">
              <span>Primario</span>
            </DashButton>
            <DashButton size="lg" variant="secondary">
              <span>Secundario</span>
            </DashButton>
          </div>
        </section>
      </DashPanel>
    </DashGrid>
    <DashGrid name="typography" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="1" :col-span="1">
        <DashTypography variant="h3">Headings</DashTypography>
        <section class="flex flex-col gap-3">
          <DashTypography variant="h1">Título Principal</DashTypography>
          <DashTypography variant="h2">Título Principal</DashTypography>
          <DashTypography variant="h3">Título Principal</DashTypography>
          <DashTypography variant="h4">Título Principal</DashTypography>
          <DashTypography variant="h5">Título Principal</DashTypography>
          <DashTypography variant="subtitle1">Subtítulo secundario</DashTypography>
          <DashTypography variant="subtitle2">Subtítulo secundario</DashTypography>
          <DashTypography variant="body">Texto del cuerpo</DashTypography>
          <DashTypography variant="overline">Texto del cuerpo</DashTypography>
          <DashTypography variant="caption">Texto de caption</DashTypography>
          <DashTypeWritter
            :speed="100"
            :pauseAfterTyping="1500"
            :backspace-count="10"
            :pause-after-deleting="500"
            text="Efecto máquina de escribir"
            class=""
          />
        </section>
      </DashPanel>
    </DashGrid>
  </main>
</template>

<script setup lang="ts">
import DashPanel from '@/components/grids/DashPanel.vue'
import DashGrid from '@/components/grids/DashGrid.vue'
import DashButton from '@/components/buttons/DashButton.vue'
import DashTypography from '@/components/typography/DashTypography.vue'
import DashTypeWritter from '@/components/typography/DashTypeWritter.vue'

import { useToast } from '@/@core/toast/useToast'

const { showToast } = useToast()

function notify() {
  showToast({
    title: '¡Operación exitosa!',
    description: 'Tu acción se ha completado correctamente.',
    type: 'foreground',
    duration: 3000,
    variant: 'SUCCESS',
  })
}
</script>
