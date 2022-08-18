<template>
  <main class="mt-12 px-4 md:px-6 xl:px-8">
    <header class="text-center text-4xl font-semibold dark:text-zinc-400">
      Archives
    </header>

    <div
      class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:mt-8 lg:grid-cols-2 xl:grid-cols-3"
    >
      <router-link
        v-for="(archive, index) in archives"
        :key="index"
        :to="{ name: 'task.index', params: { date: index } }"
        class="flex flex-col gap-1 rounded-md bg-zinc-100 p-6 shadow-xl dark:bg-zinc-800 dark:text-zinc-200 sm:p-8"
      >
        <h1 class="text-2xl font-semibold">{{ index }}</h1>
        <div
          class="flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-200 sm:text-xs md:text-lg lg:text-xs 2xl:text-base"
        >
          <h3 class="font-medium">
            Total Tasks :
            <span
              class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-base md:text-xl lg:text-base 2xl:text-xl"
              >{{ archive.total_task }}</span
            >
          </h3>
          <h3 class="font-medium">
            Total Completed :
            <span
              class="text-lg font-semibold text-green-600 sm:text-base md:text-xl lg:text-base 2xl:text-xl"
              >{{ archive.total_completed }}</span
            >
          </h3>
          <h3 class="font-medium">
            Total Pending :
            <span
              class="text-lg font-semibold text-red-600 sm:text-base md:text-xl lg:text-base 2xl:text-xl"
            >
              {{ archive.total_pending }}
            </span>
          </h3>
        </div>
      </router-link>
    </div>

    <div class="mt-6 flex justify-end dark:text-zinc-200 lg:mt-8">
      <div class="flex gap-2">
        <button
          disabled
          class="flex h-8 items-center justify-center rounded-md bg-zinc-100 px-4 text-zinc-800 shadow-md dark:bg-zinc-800 dark:text-zinc-200 disabled:dark:text-zinc-500"
        >
          Previous
        </button>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-200 text-zinc-800 shadow-md dark:bg-zinc-800 dark:text-zinc-200"
        >
          1
        </button>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-800 shadow-md dark:bg-zinc-800 dark:text-zinc-200"
        >
          2
        </button>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-800 shadow-md dark:bg-zinc-800 dark:text-zinc-200"
        >
          3
        </button>
        <button
          class="flex h-8 items-center justify-center rounded-md bg-zinc-100 px-4 text-zinc-800 shadow-md dark:bg-zinc-800 dark:text-zinc-200 disabled:dark:text-zinc-500"
        >
          Next
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import useArchives from "@/composables/archives";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const { archives, errors, getArchives } = useArchives();

    onMounted(getArchives);

    return {
      archives,
      errors,
    };
  },
};
</script>
