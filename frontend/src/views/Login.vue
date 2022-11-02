<template>
  <div class="mb-12">
    <h1 class="mb-2 text-4xl font-medium">Login</h1>
    <p class="w-full text-xs">See your growth and get consulting support</p>
  </div>

  <form action="#">
    <div class="mb-3 flex flex-col">
      <label for="email" class="text-sm font-semibold text-gray-800"
        >Email</label
      >
      <input
        class="rounded-[4px] border-none shadow-md placeholder:text-sm focus:ring-gray-800"
        type="email"
        id="email"
        placeholder="Enter Email"
        v-model="user.email"
      />
      <div v-if="store.state.errors.email" class="mt-1 text-xs text-red-600">
        {{ store.state.errors.email[0] }}
      </div>
    </div>

    <div class="mb-3 flex flex-col">
      <label for="password" class="text-sm font-semibold text-gray-800"
        >Password</label
      >
      <input
        class="rounded-[4px] border-none shadow-md placeholder:text-sm focus:ring-gray-800"
        type="password"
        id="password"
        placeholder="Enter Password"
        v-model="user.password"
      />

      <div v-if="store.state.errors.password" class="mt-1 text-xs text-red-600">
        {{ store.state.errors.password[0] }}
      </div>
    </div>

    <div class="mb-3 flex items-center">
      <input
        class="appearance-none rounded-[4px] border-2 border-gray-900 text-gray-900 shadow-md ring-1 ring-gray-900 placeholder:text-sm focus:ring-gray-800"
        type="checkbox"
        id="remember-me"
        v-model="user.remember"
      />
      <label for="remember-me" class="ml-2 text-sm font-semibold text-gray-800"
        >Remember me</label
      >
    </div>

    <div class="mt-8">
      <button
        @click.prevent="login"
        class="flex w-full items-center justify-center rounded-[4px] bg-gray-900 py-3 text-xs font-medium text-gray-100"
      >
        Login
      </button>
    </div>
    <span class="text-xs"
      >Not registered yet?
      <router-link :to="{ name: 'register' }" class="ml-1 text-sm font-semibold"
        >Create an account</router-link
      ></span
    >
  </form>
</template>

<script>
import store from "@/store";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = {
      email: "",
      password: "",
      remember: false,
    };

    const router = useRouter();

    function login() {
      store
        .dispatch("login", user)
        .then(({ data }) => {
          router.push("dashboard");
        })
        .catch(() => {
          console.log(store.state.errors);
        });
    }

    return { user, store, login };
  },
};
</script>
