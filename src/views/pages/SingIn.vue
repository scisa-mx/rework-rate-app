<template>
  <div class="flex flex-col md:flex-row h-screen">
    <!-- Left Section -->
    <div class="w-full md:w-1/2 flex flex-col justify-center items-center p-10">
      <h1 class="text-4xl font-bold text-royal-purple-700">Sign in to BankCo.</h1>
      <p class="text-gray-500 mt-2">Send, spend and save smarter</p>

      <div class="mt-6 w-full max-w-sm">
        <button
          class="w-full flex items-center justify-center bg-white border border-gray-300 py-2 rounded-lg shadow-2xs mb-3"
        >
          <!-- <img src="/google-icon.svg" alt="Google" class="w-5 h-5 mr-2" /> -->
          Sign In with Google
        </button>
        <button
          class="w-full flex items-center justify-center bg-white border border-gray-300 py-2 rounded-lg shadow-2xs"
        >
          <!-- <img src="/apple-icon.svg" alt="Apple" class="w-5 h-5 mr-2" /> -->
          Sign In with Apple
        </button>

        <div class="my-4 flex items-center">
          <hr class="grow border-gray-300" />
          <span class="mx-2 text-gray-400">Or continue with</span>
          <hr class="grow border-gray-300" />
        </div>

        <input
          type="text"
          placeholder="Username or email"
          class="w-full px-4 py-2 border rounded-lg mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border rounded-lg mb-3"
        />

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input type="checkbox" class="mr-2" />
            <span class="text-gray-500">Remember me</span>
          </label>
          <a href="#" class="text-royal-purple-600">Forgot Password?</a>
        </div>

        <button class="w-full bg-royal-purple-600 text-white py-2 rounded-lg mt-4">Sign In</button>
        <p class="text-gray-500 text-center mt-4">
          Don't have an account? <a href="#" class="text-royal-purple-600">Sign Up</a>
        </p>
      </div>
    </div>

    <!-- Right Section -->
    <div class="w-full md:w-1/2 bg-royal-purple-50 flex justify-center items-center p-6">
      <div class="text-center max-w-md">
        <!-- <img src="/illustration.png" alt="Illustration" class="w-full mb-6" /> -->
        <h2 class="text-2xl font-bold text-royal-purple-700">Speedy, Easy and Fast</h2>
        <p class="text-gray-500 mt-2">
          BankCo helps you set saving goals, earn cash back offers, and get paychecks up to two days
          early. Get a <span class="text-royal-purple-600">$20 bonus</span> when you receive
          qualifying direct deposits.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic needed for now
</script>
