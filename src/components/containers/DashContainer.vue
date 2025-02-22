<template>
  <section class="bg-white w-[100%] min-h-[50px] rounded shadow-sm my-2">
    <section v-if="$slots.header">
      <div class="px-2">
        <slot name="header"></slot>
      </div>
      <hr />
    </section>
    <div class="p-2">
      <slot name="main"></slot>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
