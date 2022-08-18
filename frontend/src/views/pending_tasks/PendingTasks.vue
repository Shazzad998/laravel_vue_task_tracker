<template>
  <main class="mt-12 px-4 md:px-6 xl:px-8">
    <header class="text-center text-4xl font-semibold dark:text-zinc-400">
      Pending Tasks
    </header>

    <div class="mt-8 grid grid-cols-1 gap-4">
      <div
        v-for="(task, index) in pendingTasks"
        :key="index"
        class="flex items-start gap-4 rounded-md bg-zinc-100 p-6 shadow-xl dark:bg-zinc-800 dark:text-zinc-200 sm:p-8"
      >
        <div>
          <input
            type="checkbox"
            @change="changeStatus(task.id, task.completed)"
            class="rounded border-none text-zinc-900 ring-2 ring-zinc-900 focus:ring-zinc-900 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-200 dark:focus:ring-zinc-200"
          />
        </div>
        <div class="flex w-full justify-between">
          <div>
            <div class="flex items-center">
              <h1
                class="text-sm font-semibold sm:text-lg lg:text-2xl lg:font-medium"
              >
                <span
                  class="text-xs font-normal text-zinc-700 dark:text-zinc-400 sm:text-base lg:text-lg"
                  >[ {{ task.category_name }} ]</span
                >
                {{ task.title }}
              </h1>
            </div>
            <div
              class="mt-2 text-xs text-zinc-700 dark:text-zinc-300 sm:text-base lg:flex lg:items-center lg:gap-4"
            >
              <div class="flex items-center gap-x-2">
                <div class="h-3 w-3 rounded bg-red-500"></div>
                <span>High Priority</span>
              </div>

              <div class="flex items-center gap-x-2">
                <div class="flex h-3 w-3 items-center justify-center">
                  <i class="fa-solid fa-stopwatch"></i>
                </div>
                <span>Pending Since {{ task.created_at }} </span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col justify-between justify-items-start sm:flex-row sm:gap-x-4"
          >
            <div class="flex items-start justify-center sm:items-center">
              <span
                class="mt-1 rounded-full bg-red-300 px-3 py-px text-[0.5rem] text-red-700 dark:text-red-900 sm:mt-0 sm:py-1 sm:text-sm"
              >
                Pending
              </span>
            </div>

            <div class="flex items-center justify-center gap-2">
              <button @click.prevent="deleteTask(task.id)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
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
import usePendingTasks from "@/composables/pendingTasks";
import useTasks from "@/composables/tasks";
import { onMounted } from "vue";

export default {
  setup() {
    const { pendingTasks, errors, getPendingTasks } = usePendingTasks();
    const { destroyTask } = useTasks();
    onMounted(getPendingTasks);

    const deleteTask = async (id) => {
      if (!window.confirm("Are you sure?")) {
        return;
      }
      await destroyTask(id);
      getPendingTasks();
    };

    return {
      pendingTasks,
      errors,
      deleteTask,
    };
  },
};
</script>
