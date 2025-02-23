<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-6xl font-bold text-royal-purple-800">404</h1>
    <p class="text-xl text-gray-600 mt-2">{{ $t('errorMessages.pageNotFound') }}</p>
    <router-link
      to="/"
      class="mt-6 bg-royal-purple-800 text-white px-4 py-2 rounded-full hover:bg-royal-purple-600 transition"
    >
      {{ $t('backHome') }}
    </router-link>
  </div>
</template>
