<template>
  <div class="grid grid-cols-1 bg-zinc-300 dark:bg-zinc-900">
    <!-- SIDEBAR -->
    <aside
      class="fixed left-0 z-50 h-screen w-[70vw] bg-zinc-200 shadow-2xl duration-300 ease-in-out dark:bg-zinc-800 dark:text-zinc-200 sm:w-[50vw] md:w-[30vw] lg:w-[25vw] xl:w-[18vw] 2xl:w-[15vw]"
      :class="[navClosed ? '-translate-x-full md:translate-x-0' : '']"
    >
      <div class="mt-14 flex items-center justify-between px-6">
        <div class="flex items-center gap-2 text-2xl font-bold sm:text-4xl">
          <img src="/images/logo.png" alt="" />
          <h1>PROD</h1>
        </div>
        <div class="md:hidden">
          <button
            @click.prevent="navClosed = true"
            class="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-50 shadow-lg dark:bg-zinc-900"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <div
        class="relative mt-8 flex h-[80vh] flex-col gap-2 px-4 font-semibold sm:mt-10"
      >
        <router-link
          v-for="(item, index) in navItems"
          :key="index"
          @click.prevent="navClosed = true"
          :to="item.to"
          class="flex h-10 items-center gap-4 rounded-md px-4 text-sm duration-300 ease-in-out hover:pl-6 lg:h-12 lg:text-base"
        >
          <i :class="item.icon" class="text-xl"></i>
          {{ item.label }}</router-link
        >
        <button
          class="absolute left-4 right-4 bottom-6 flex h-10 items-center gap-4 rounded-md bg-zinc-300 px-4 text-sm font-semibold duration-300 ease-in-out hover:pl-6 dark:bg-zinc-900 lg:h-12 lg:text-base"
          @click.prevent="logout"
        >
          Logout
        </button>
      </div>
    </aside>

    <div class="fixed top-4 right-4">
      <button
        class="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 shadow-lg duration-500 ease-in-out dark:bg-zinc-800 dark:text-zinc-200"
        @click.prevent="toggleDarkMode"
      >
        <i v-if="darkMode" class="fa-solid fa-sun"></i>
        <i v-if="!darkMode" class="fa-solid fa-moon"></i>
      </button>
    </div>

    <div class="fixed top-4 left-4">
      <button
        @click.prevent="navClosed = false"
        class="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 shadow-lg dark:bg-zinc-800 dark:text-zinc-100"
      >
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>

    <main>
      <div class="flex">
        <div
          class="hidden max-w-2xl md:block md:w-[30vw] lg:w-[25vw] xl:w-[18vw] 2xl:w-[15vw]"
        ></div>
        <div
          class="flex min-h-screen w-full flex-col justify-between dark:bg-zinc-900 md:w-[70vw] lg:w-[75vw] xl:w-[82vw] 2xl:w-[85vw]"
        >
          <router-view></router-view>

          <!-- FOOTER -->
          <footer
            class="bottom-0 mt-28 mb-10 text-center text-xs dark:text-zinc-200 lg:text-sm"
          >
            &copy;
            <a
              href="https://shazzadulislam.netlify.app/"
              class="font-medium uppercase"
            >
              md <span class="mr-px text-lg font-semibold">shazzad</span>ul
              islam</a
            >
            . All Rights Reserved
          </footer>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import store from "@/store";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const navClosed = ref(true);
    const navItems = [
      {
        label: "Dashboard",
        icon: "fa-solid fa-table-columns",
        to: { name: "dashboard" },
      },

      {
        label: "Tasks",
        icon: "fa-solid fa-calendar-day",
        to: { name: "task.index.today", params: { date: "today" } },
      },

      {
        label: "Archives",
        icon: "fa-solid fa-box-archive",
        to: { name: "archives" },
      },

      {
        label: "Category",
        icon: "fa-solid fa-bars-progress",
        to: { name: "category.index" },
      },

      {
        label: "Pending Tasks",
        icon: "fa-solid fa-list-check",
        to: { name: "pending_tasks" },
      },
    ];
    const darkMode = ref(document.documentElement.classList.contains("dark"));
    const router = useRouter();

    function toggleDarkMode() {
      if (darkMode.value) {
        document.documentElement.classList.remove("dark");
        darkMode.value = false;
      } else {
        document.documentElement.classList.add("dark");
        darkMode.value = true;
      }

      console.log(darkMode.value ? "Dark Mode" : "Light Mode");
    }

    function logout() {
      store
        .dispatch("logout")
        .then((result) => {
          router.push({
            name: "login",
          });
        })
        .catch((err) => {});
    }

    return {
      navClosed,
      navItems,
      darkMode,
      toggleDarkMode,
      logout,
    };
  },
};
</script>

<style>
.router-link-exact-active {
  background-color: #18181b;
  padding-left: 1.5rem;
  color: #f4f4f5;
}
</style>
