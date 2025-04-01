<template>
  <span>
    <a
      :href="props.href"
      :target="props.target"
      :rel="props.rel"
      :class="[Styles[props.style], 'flex items-center gap-1']"
    >
      <vue-feather
        size="15"
        v-if="props.icon && props.iconPosition === 'left'"
        :type="props.iconType"
      ></vue-feather>
      {{ props.text }}
      <vue-feather
        size="15"
        v-if="props.icon && props.iconPosition === 'right'"
        :type="props.iconType"
      ></vue-feather>
    </a>
  </span>
</template>

<script setup lang="ts">
type LinkStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
type Targets = '_self' | '_blank' | '_parent' | '_top'
type IconType = 'link' | 'arrow-right' | 'download'

type DashLinkProps = {
  href?: string
  target?: Targets
  rel?: string
  style?: LinkStyle
  icon?: boolean
  iconPosition?: 'left' | 'right'
  text?: string
  iconType?: IconType
}

const props = withDefaults(defineProps<DashLinkProps>(), {
  target: '_self',
  rel: 'noopener noreferrer',
  style: 'primary',
  iconPosition: 'left',
  iconType: 'link',
  text: '',
  href: '#',
  icon: true,
})

const Styles = {
  primary: 'text-royal-purple-500 hover:text-purple-700',
  secondary: 'text-gray-500 hover:text-gray-700',
  success: 'text-green-500 hover:text-green-700',
  danger: 'text-red-500 hover:text-red-700',
  warning: 'text-yellow-500 hover:text-yellow-700',
  info: 'text-teal-500 hover:text-teal-700',
}
</script>
