<template>
  <div class="mb-12">
    <h1 class="mb-2 text-4xl font-medium">Register</h1>
    <p class="text-xs">
      Let's get you all set up so you can verify your personal account and start
      managing your daily tasks
    </p>
  </div>

  <form action="#">
    <div class="mb-3 flex flex-col">
      <label for="full-name" class="text-sm font-semibold text-gray-800"
        >Full Name</label
      >
      <input
        class="rounded-[4px] border-none shadow-md placeholder:text-sm focus:ring-gray-800"
        type="text"
        id="full-name"
        placeholder="Enter Full Name"
        v-model="user.name"
      />
    </div>

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
    </div>

    <div class="mb-3 flex flex-col">
      <label
        for="password-confirmation"
        class="text-sm font-semibold text-gray-800"
        >Confirm Password</label
      >
      <input
        type="password"
        class="rounded-[4px] border-none shadow-md placeholder:text-sm focus:ring-gray-800"
        id="password-confirmation"
        name="password_confirmation"
        placeholder="Enter Confirm Password"
        v-model="user.password_confirmation"
      />
    </div>

    <div class="mt-8">
      <button
        @click.prevent="register"
        class="flex w-full items-center justify-center rounded-[4px] bg-gray-900 py-3 text-xs font-medium text-gray-100"
      >
        Register
      </button>
    </div>
    <span class="text-xs"
      >Already have an account?
      <router-link :to="{ name: 'login' }" class="ml-1 text-sm font-semibold"
        >Login</router-link
      ></span
    >
  </form>
</template>

<script>
import store from "@/store";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const user = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };

    function register() {
      store.dispatch("register", user).then(() => {
        router.push({
          name: "dashboard",
        });
      });
    }

    return {
      user,
      register,
    };
  },
};
</script>
