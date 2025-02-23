<template>
  <section class="bg-white w-[100%] min-h-[50px] rounded shadow-sm my-2 p-3">
    <section v-if="$slots.header">
      <div class="px-2 py-3">
        <slot name="header"></slot>
      </div>
    </section>
    <div class="p-2">
      <slot name="main"></slot>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
