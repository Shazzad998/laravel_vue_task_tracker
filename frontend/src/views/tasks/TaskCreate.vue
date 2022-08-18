<template>
  <main class="mt-12 px-4 md:px-6 xl:px-8">
    <header class="text-center text-4xl font-semibold dark:text-zinc-400">
      Task Create
    </header>

    <!-- TOP BUTTONS  -->

    <div class="mt-4 flex items-center justify-end">
      <router-link
        :to="{ name: 'task.index', params: { date: 'today' } }"
        class="rounded-md bg-zinc-900 py-2 px-4 text-sm text-zinc-200 dark:bg-zinc-200 dark:text-zinc-900 lg:text-base"
      >
        <i class="fa-solid fa-eye mr-1"></i>
        View All Tasks
      </router-link>
    </div>

    <!-- FORM -->
    <form class="mt-6 lg:px-8 xl:px-16 2xl:px-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4">
        <div class="mb-6 flex flex-col dark:text-zinc-200">
          <label class="text-lg font-medium" for="category-name"
            >Task Title</label
          >
          <input
            type="text"
            id="category-name"
            v-model="formData.title"
            class="mt-2 rounded-md border-none focus:ring-zinc-900 dark:bg-zinc-800 dark:focus:ring-zinc-200"
          />
        </div>

        <div class="mb-6 flex flex-col dark:text-zinc-200">
          <label class="text-lg font-medium" for="task-category"
            >Task Category</label
          >
          <select
            id="task-category"
            v-model="formData.category_id"
            class="mt-2 rounded-md border-none focus:ring-zinc-900 dark:bg-zinc-800 dark:focus:ring-zinc-200"
          >
            <option
              :value="category.id"
              v-for="category in categories.data"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="mb-6 flex flex-col dark:text-zinc-200">
        <label class="text-lg font-medium" for="task-description"
          >Task Description</label
        >
        <textarea
          id="task-description"
          rows="2"
          v-model="formData.description"
          class="mt-2 rounded-md border-none focus:ring-zinc-900 dark:bg-zinc-800 dark:focus:ring-zinc-200"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4">
        <div class="mb-6 flex flex-col dark:text-zinc-200 lg:order-2">
          <label class="text-lg font-medium" for="deadline">Deadline</label>
          <input
            type="datetime-local"
            id="deadline"
            v-model="formData.deadline"
            class="mt-2 rounded-md border-none focus:ring-zinc-900 dark:bg-zinc-800 dark:focus:ring-zinc-200"
          />
        </div>

        <div class="mb-6 flex flex-col dark:text-zinc-200 lg:order-1">
          <label class="text-lg font-medium" for="task-description"
            >Task Priority</label
          >

          <div class="mt-2 flex gap-x-4 dark:text-zinc-200">
            <div class="flex items-center gap-x-1">
              <input
                type="radio"
                class="text-zinc-800 focus:ring-zinc-800 dark:text-zinc-600"
                name="priority"
                value="1"
                id="high"
                v-model="formData.priority"
              />
              <label class="inline-block" for="high">High</label>
            </div>

            <div class="flex items-center gap-x-1">
              <input
                type="radio"
                class="text-zinc-800 focus:ring-zinc-800 dark:text-zinc-600"
                name="priority"
                value="2"
                id="medium"
                v-model="formData.priority"
              />

              <label class="inline-block" for="medium">Medium</label>
            </div>

            <div class="flex items-center gap-x-1">
              <input
                type="radio"
                class="text-zinc-800 focus:ring-zinc-800 dark:text-zinc-600"
                name="priority"
                value="3"
                id="low"
                v-model="formData.priority"
              />

              <label class="inline-block" for="low">Low</label>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          @click.prevent="saveTask"
          class="rounded-md bg-zinc-200 py-1 px-6 font-medium shadow-md dark:bg-zinc-700 dark:text-zinc-200"
        >
          Save
        </button>
      </div>
    </form>
  </main>
</template>

<script>
import useCategories from "@/composables/categories";
import useTasks from "@/composables/tasks";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const { categories, getCategories } = useCategories();
    const { errors, storeTask } = useTasks();

    onMounted(getCategories);

    const formData = ref({
      title: "",
      description: "",
      category_id: "",
      priority: null,
      deadline: "",
    });

    function saveTask() {
      storeTask(formData.value);
    }

    return {
      categories,
      formData,
      errors,
      saveTask,
    };
  },
};
</script>
