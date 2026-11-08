<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from '@/services/firebase'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      router.replace('/admin/ideas')
    }
  })
})

async function handleLogin() {
  if (!email.value.trim() || !password.value.trim()) {
    errorMessage.value = 'Please enter both email and password.'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    await signInWithEmailAndPassword(auth, email.value.trim(), password.value)
    router.replace('/admin/ideas')
  } catch (error: any) {
    console.error('Firebase Auth Error:', error)
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      errorMessage.value = 'Invalid email or password. Only registered administrator accounts can login.'
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage.value = 'Too many failed login attempts. Please wait a moment and try again.'
    } else {
      errorMessage.value = error.message || 'Login failed. Please check your credentials.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-950 selection:text-white flex flex-col justify-between">
    <!-- Top Bar -->
    <header class="w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
      <div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <RouterLink
          to="/"
          class="group inline-flex items-center gap-2.5 text-xs font-semibold text-neutral-500 hover:text-neutral-950 transition-colors uppercase tracking-[0.18em]"
        >
          <svg
            class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Return to Site</span>
        </RouterLink>

        <div class="text-xs font-mono uppercase tracking-widest text-neutral-400">
          CMS Control Panel
        </div>
      </div>
    </header>

    <!-- Center Card -->
    <main class="flex-1 flex items-center justify-center px-6 py-16">
      <div class="w-full max-w-md bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3">
            <span class="w-2 h-2 rounded-full bg-neutral-950"></span>
            <span>Administrator Access</span>
          </div>
          <h1 class="font-display text-3xl font-bold tracking-tight text-neutral-950">
            Sign In to CMS
          </h1>
          <p class="text-sm text-neutral-500 mt-2 leading-relaxed">
            Manage your personal essays and digital bookshelf reflections. Registration is disabled.
          </p>
        </div>

        <!-- Error notification -->
        <div
          v-if="errorMessage"
          class="mb-6 p-4 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-800 leading-relaxed font-mono"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="email" class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="admin@example.com"
              class="w-full px-4 py-3 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors"
            />
          </div>

          <div>
            <label for="password" class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="••••••••••••"
              class="w-full px-4 py-3 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-all disabled:opacity-50"
          >
            <span v-if="!isLoading">Authenticate &rarr;</span>
            <span v-else class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              Authenticating...
            </span>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p class="text-[11px] text-neutral-400">
            Protected with Firebase Authentication. Public user creation is closed.
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-neutral-200 py-6 text-center text-xs text-neutral-400">
      &copy; {{ new Date().getFullYear() }} Yasha Gozwan Shuhada. Admin Gateway.
    </footer>
  </div>
</template>

