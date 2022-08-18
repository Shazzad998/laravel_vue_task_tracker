<template>
  <main class="mt-12 px-4 md:px-6 xl:px-8">
    <header
      class="text-center text-4xl font-semibold first-letter:uppercase dark:text-zinc-400"
    >
      {{ date }}
    </header>

    <div class="mt-4 flex items-center justify-between">
      <select
        name=""
        id=""
        class="rounded-md border-none text-sm dark:bg-zinc-800 dark:text-zinc-200 lg:text-base"
      >
        <option value="">All Tasks</option>
        <option value="">Completed</option>
        <option value="">Pending</option>
      </select>

      <router-link
        :to="{ name: 'task.create' }"
        class="rounded-md bg-zinc-100 py-2 px-4 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 lg:text-base"
      >
        <i class="fa-solid fa-plus mr-1"></i>
        Create Task
      </router-link>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-4">
      <div
        v-for="task in tasks.data"
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

              <div v-if="task.deadline" class="flex items-center gap-x-2">
                <div class="flex h-3 w-3 items-center justify-center">
                  <i class="fa-solid fa-stopwatch"></i>
                </div>
                <span>Deadline {{ task.deadline_formatted }} </span>
              </div>

              <div v-if="task.created_at" class="flex items-center gap-x-2">
                <div class="flex h-3 w-3 items-center justify-center">
                  <i class="fa-solid fa-stopwatch"></i>
                </div>
                <span>Created at {{ task.created_at }} </span>
              </div>
            </div>
          </div>
          <div class="flex text-center sm:flex-row sm:gap-x-4">
            <div class="flex items-center justify-between gap-2">
              <router-link :to="{ name: 'task.edit', params: { id: task.id } }"
                ><i class="fa-solid fa-pen-to-square"></i
              ></router-link>
              <button @click.prevent="deleteTask(task.id)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Pagination
      v-if="tasks.meta"
      :pagination="tasks.meta"
      @paginate="getTasks(date)"
      :offset="1"
    />
  </main>
</template>

<script>
import Pagination from "../Pagination.vue";
import useTasks from "@/composables/tasks";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Pagination: Pagination,
  },
  setup() {
    const route = useRoute();
    const { tasks, task, getTasks, updateTaskStatus, destroyTask } = useTasks();

    let date = route.params.date;

    onMounted(getTasks(date));

    const deleteTask = async (id) => {
      if (!window.confirm("Are you sure?")) {
        return;
      }
      await destroyTask(id);
      await getTasks(date);
    };

    const changeStatus = (id, data) => {
      updateTaskStatus(id, data);
      getTasks();
    };

    return {
      tasks,
      task,
      date,
      deleteTask,
      changeStatus,
      getTasks,
    };
  },
};
</script>
