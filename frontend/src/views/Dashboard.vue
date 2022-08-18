<template>
  <main class="mt-16 px-4 md:px-6 xl:px-8">
    <!-- INSIGHTS -->
    <h1 class="text-2xl font-semibold uppercase dark:text-zinc-200">
      Dashboard
    </h1>

    <div class="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
      <div
        class="rounded-md bg-zinc-50 p-8 shadow-2xl duration-300 ease-in-out hover:shadow-lg dark:bg-zinc-800 dark:text-zinc-200"
        v-for="stat in stats"
        :key="stat.id"
      >
        <div class="">
          <div class="flex items-center justify-between">
            <h3
              class="text-lg font-medium text-zinc-700 dark:text-zinc-400 sm:text-xl"
            >
              {{ stat.name }} Task
            </h3>
            <span class="rounded-full bg-zinc-900 py-2 px-3 text-zinc-50"
              ><i class="fa-solid fa-chart-line"></i
            ></span>
          </div>
          <div class="mt-2 flex items-end">
            <h1 class="text-6xl font-bold">{{ stat.total_completed }}</h1>
            <span
              class="ml-1 text-lg font-semibold text-zinc-700 dark:text-zinc-400 sm:text-xl"
              >Completed</span
            >
          </div>
        </div>
        <small
          class="mt-2 flex items-center justify-between text-xs sm:text-base"
        >
          <span
            >Out of
            <span class="text-sm font-semibold sm:text-lg">
              {{ stat.total_task }}
            </span>
            Tasks</span
          >
          <span
            >Completion Rate
            <span class="text-sm font-semibold sm:text-lg"
              >{{ stat.completion_rate }}%</span
            ></span
          >
        </small>
      </div>
    </div>

    <!-- PENDING TASKS -->

    <div class="mt-16">
      <h1 class="text-2xl font-semibold uppercase dark:text-zinc-200">
        Pending Tasks
      </h1>
      <div class="mt-6 grid grid-cols-1 gap-4">
        <div
          v-for="task in pendingTasks"
          :key="task.id"
          class="flex items-start gap-4 rounded-md bg-zinc-100 p-6 shadow-xl dark:bg-zinc-800 dark:text-zinc-200 sm:p-8"
          :class="[task.completed ? 'bg-zinc-200 shadow-none' : '']"
        >
          <div>
            <input
              :checked="task.completed"
              @change="changeStatus(task.id, task.completed)"
              type="checkbox"
              class="rounded border-none text-zinc-900 ring-2 ring-zinc-900 focus:ring-zinc-900 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-200 dark:focus:ring-zinc-200"
            />
          </div>
          <div
            class="flex w-full justify-between gap-x-4 lg:gap-x-8 2xl:gap-x-20"
          >
            <div>
              <div
                class="flex items-center"
                :class="[task.completed ? ' text-zinc-500 line-through' : '']"
              >
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
              <div>
                <p
                  class="text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm lg:text-lg"
                  :class="[
                    task.completed
                      ? ' text-zinc-500 line-through dark:text-zinc-500'
                      : '',
                  ]"
                >
                  {{ task.description }}
                </p>
              </div>
              <div
                class="mt-2 text-xs text-zinc-700 dark:text-zinc-300 sm:text-base lg:flex lg:items-center lg:gap-4"
              >
                <div
                  v-if="parseInt(task.priority) === 1"
                  class="flex items-center gap-x-2"
                >
                  <div class="h-3 w-3 rounded bg-red-500"></div>
                  <span>High Priority</span>
                </div>
                <div
                  v-else-if="parseInt(task.priority) === 2"
                  class="flex items-center gap-x-2"
                >
                  <div class="h-3 w-3 rounded bg-orange-500"></div>
                  <span>Medium Priority</span>
                </div>
                <div v-else class="flex items-center gap-x-2">
                  <div class="h-3 w-3 rounded bg-yellow-500"></div>
                  <span>Low Priority</span>
                </div>

                <div v-if="task.created_at" class="flex items-center gap-x-2">
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
    </div>
  </main>
</template>

<script>
import useDashboard from "@/composables/dashboard";
import useTasks from "@/composables/tasks";
import { onMounted } from "vue";

export default {
  setup() {
    const { stats, pendingTasks, getStats, getPendingTasks } = useDashboard();

    const { updateTaskStatus, destroyTask } = useTasks();

    onMounted(getStats);
    onMounted(getPendingTasks);

    const changeStatus = async (id, data) => {
      await updateTaskStatus(id, data);
      await getPendingTasks();
    };

    const deleteTask = async (id) => {
      if (!window.confirm("Are you sure?")) {
        return;
      }
      await destroyTask(id);
      getPendingTasks();
    };

    return {
      pendingTasks,
      stats,
      changeStatus,
      deleteTask,
    };
  },
};
</script>
