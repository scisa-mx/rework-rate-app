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
        <div class="flex flex-row gap-3 flex-wrap">
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
    <DashGrid name="alerts" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="1" :col-span="1">
        <section class="flex flex-col gap-3">
          <DashTypography variant="h3">Alertas</DashTypography>
          <DashAlert type="success">
            <DashTypography variant="h5">Alertas</DashTypography>
            <DashTypography class="text-gray-500" variant="body">
              Las alertas son mensajes que se muestran en la interfaz para informar al usuario sobre
              el estado de una acción.
            </DashTypography>
          </DashAlert>
          <DashAlert type="error">
            <DashTypography variant="h5">Alertas</DashTypography>
            <DashTypography variant="body">
              Las alertas son mensajes que se muestran en la interfaz para informar al usuario sobre
              el estado de una acción.
            </DashTypography>
          </DashAlert>
          <DashAlert type="primary">
            <DashTypography variant="h5">Alertas</DashTypography>
            <DashTypography variant="body">
              Las alertas son mensajes que se muestran en la interfaz para informar al usuario sobre
              el estado de una acción.
            </DashTypography>
          </DashAlert>
          <DashAlert type="secondary">
            <DashTypography variant="h5">Alertas</DashTypography>
            <DashTypography variant="body">
              Las alertas son mensajes que se muestran en la interfaz para informar al usuario sobre
              el estado de una acción.
            </DashTypography>
          </DashAlert>
          <DashAlert type="info">
            <DashTypography variant="h5">Alertas</DashTypography>
            <DashTypography variant="body">
              Las alertas son mensajes que se muestran en la interfaz para informar al usuario sobre
              el estado de una acción.
            </DashTypography>
          </DashAlert>
        </section>
      </DashPanel>
    </DashGrid>
    <DashGrid name="tooltips" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="1" :col-span="1">
        <DashTypography variant="h3">Tooltips</DashTypography>
        <section class="flex flex-row gap-3">
          <DashTooltip variant="dark" side="top" :offset="10" content="Tooltip">
            <template #trigger>
              <DashButton size="md" variant="primary">Tooltip top</DashButton>
            </template>
            <template #content>Hola soy un tooltip!</template>
          </DashTooltip>
          <DashTooltip variant="dark" side="bottom" :offset="10" content="Tooltip">
            <template #trigger>
              <DashButton size="md" variant="primary">Tooltip bottom</DashButton>
            </template>
            <template #content>Hola soy un tooltip!</template>
          </DashTooltip>
          <DashTooltip variant="dark" side="left" :offset="10" content="Tooltip">
            <template #trigger>
              <DashButton size="md" variant="primary">Tooltip left</DashButton>
            </template>
            <template #content>Hola soy un tooltip!</template>
          </DashTooltip>
          <DashTooltip variant="dark" side="right" :offset="10" content="Tooltip">
            <template #trigger>
              <DashButton size="md" variant="primary">Tooltip rigth</DashButton>
            </template>
            <template #content>Hola soy un tooltip!</template>
          </DashTooltip>
          <DashTooltip variant="default" side="top" :offset="10" content="Tooltip">
            <template #trigger>
              <DashButton size="md" variant="primary">Tooltip default</DashButton>
            </template>
            <template #content>Hola soy un tooltip!</template>
          </DashTooltip>
        </section>
      </DashPanel>
    </DashGrid>
    <DashGrid name="tabs" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="1" :col-span="1">
        <DashTypography variant="h3">Tabs</DashTypography>
        <DashTabs :triggers="triggers">
          <DashTab value="overview">
            <h3 class="font-semibold text-gray-800 mb-2">Overview</h3>
            <p>Contenido de la pestaña "Overview".</p>
          </DashTab>
          <DashTab value="notification">
            <h3 class="font-semibold text-gray-800 mb-2">Notification</h3>
            <p>Contenido de la pestaña "Notification".</p>
          </DashTab>
          <DashTab value="other">
            <h3 class="font-semibold text-gray-800 mb-2">Other</h3>
            <p>Contenido de la pestaña "Other".</p>
          </DashTab>
        </DashTabs>
      </DashPanel>
    </DashGrid>

    <DashGrid name="ribbon" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="2" :col-span="2">
        <DashTypography variant="h3">Ribbon</DashTypography>
        <section class="grid grid-cols-2 gap-4">
          <DashRibbon variant="primary" position="top-right">
            <template #ribbon> New </template>
            <div class="p-4 border rounded shadow-sm w-100">
              <h2 class="text-lg font-semibold">Mi Producto</h2>
              <p class="text-gray-700">Descripción del producto...</p>
            </div>
          </DashRibbon>
          <DashRibbon variant="primary" position="top-left">
            <template #ribbon> New </template>
            <div class="p-4 border rounded shadow-sm w-100 text-end">
              <h2 class="text-lg font-semibold">Mi Producto</h2>
              <p class="text-gray-700">Descripción del producto...</p>
            </div>
          </DashRibbon>
          <DashRibbon variant="primary" position="bottom-right">
            <template #ribbon> New </template>
            <div class="p-4 border rounded shadow-sm w-100">
              <h2 class="text-lg font-semibold">Mi Producto</h2>
              <p class="text-gray-700">Descripción del producto...</p>
            </div>
          </DashRibbon>
          <DashRibbon :reveal-on-hover="true" icon="star" variant="primary" position="top-right">
            <template #ribbon> New </template>
            <div class="p-4 border rounded shadow-sm w-100">
              <h2 class="text-lg font-semibold">Ribbon in Hover</h2>
              <p class="text-gray-700">Descripción del producto...</p>
            </div>
          </DashRibbon>
        </section>
      </DashPanel>
    </DashGrid>
    <DashGrid name="progress-bar" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="1" :col-span="1">
        <DashTypography variant="h3">Progress Bar</DashTypography>
        <section class="flex flex-col gap-3">
          <section class="flex flex-col w-100 gap-3">
            <DashTypography variant="h4">Tamaños md</DashTypography>
            <DashProgressBar :value="75" variant="primary" />
            <DashProgressBar :value="20" variant="info" />
            <DashProgressBar :value="30" variant="success" />
            <DashProgressBar :value="40" variant="warning" />
            <DashProgressBar :value="60" variant="error" />
          </section>
          <section class="flex flex-col w-100 gap-3">
            <DashTypography variant="h4">Tamaños lg</DashTypography>
            <DashProgressBar size="lg" :value="75" variant="primary" />
            <DashProgressBar size="lg" :value="20" variant="info" />
            <DashProgressBar size="lg" :value="30" variant="success" />
            <DashProgressBar size="lg" :value="40" variant="warning" />
            <DashProgressBar size="lg" :value="60" variant="error" />
          </section>
          <section class="flex flex-col w-100 gap-3">
            <DashTypography variant="h4">Tamaños sm</DashTypography>
            <DashProgressBar size="sm" :value="75" variant="primary" />
            <DashProgressBar size="sm" :value="20" variant="info" />
            <DashProgressBar size="sm" :value="30" variant="success" />
            <DashProgressBar size="sm" :value="40" variant="warning" />
            <DashProgressBar size="sm" :value="60" variant="error" />
          </section>
        </section>
      </DashPanel>
    </DashGrid>
    <DashGrid name="popover" :rows="1" :cols="1" :gap="4">
      <DashPanel :padding="4" :row-span="1" :col-span="1">
        <DashTypography variant="h3">Popover</DashTypography>
        <section class="flex flex-row gap-5">
          <DashPopover side="top">
            <template #trigger>
              <DashButton size="md" variant="primary">Popover</DashButton>
            </template>
            <template #content>
              <div class="flex flex-col gap-5">
                <DashTypography variant="h4">Contenido del Popover</DashTypography>
                <DashTypography variant="body">
                  Los popovers son ventanas emergentes que se muestran al hacer clic en un botón o
                  elemento de la interfaz.
                </DashTypography>
              </div>
            </template>
          </DashPopover>
          <DashPopover side="left">
            <template #trigger>
              <DashButton size="md" variant="primary">Popover</DashButton>
            </template>
            <template #content>
              <div class="flex flex-col gap-3">
                <DashTypography variant="h4">Contenido del Popover</DashTypography>
                <DashTypography variant="body">
                  Los popovers son ventanas emergentes que se muestran al hacer clic en un botón o
                  elemento de la interfaz.
                </DashTypography>
              </div>
            </template>
          </DashPopover>
          <DashPopover side="right">
            <template #trigger>
              <DashButton size="md" variant="primary">Popover</DashButton>
            </template>
            <template #content>
              <div class="flex flex-col gap-3">
                <DashTypography variant="h4">Contenido del Popover</DashTypography>
                <DashTypography variant="body">
                  Los popovers son ventanas emergentes que se muestran al hacer clic en un botón o
                  elemento de la interfaz.
                </DashTypography>
              </div>
            </template>
          </DashPopover>
          <DashPopover side="bottom">
            <template #trigger>
              <DashButton size="md" variant="primary">Popover</DashButton>
            </template>
            <template #content>
              <div class="flex flex-col gap-3">
                <DashTypography variant="h4">Contenido del Popover</DashTypography>
                <DashTypography variant="body">
                  Los popovers son ventanas emergentes que se muestran al hacer clic en un botón o
                  elemento de la interfaz.
                </DashTypography>
              </div>
            </template>
          </DashPopover>
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
import DashAlert from '@/components/alerts/DashAlert.vue'
import DashTooltip from '@/components/tooltip/DashTooltip.vue'
import DashTabs from '@/components/tabs/DashTabs.vue'
import DashTab from '@/components/tabs/DashTab.vue'
import DashRibbon from '@/components/ribbon/DashRibbon.vue'
import DashProgressBar from '@/components/progressBar/DashProgressBar.vue'
import DashPopover from '@/components/popover/DashPopover.vue'

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

const triggers = [
  { title: 'overview', disabled: false, notifications: '1' },
  { title: 'notification', disabled: false },
  { title: 'other', disabled: false },
]
</script>
