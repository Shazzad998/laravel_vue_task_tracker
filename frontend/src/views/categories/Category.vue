<template>
  <main class="mt-12 px-4 md:px-6 xl:px-8">
    <header class="text-center text-4xl font-semibold dark:text-zinc-400">
      Categories
    </header>

    <!-- TOP BUTTONS -->
    <div class="mt-4 flex items-center justify-between">
      <select
        name=""
        id=""
        class="rounded-md border-none text-sm dark:bg-zinc-800 dark:text-zinc-200 lg:text-base"
      >
        <option value="">All Categories</option>
        <option value="">Active</option>
        <option value="">Inactive</option>
      </select>

      <router-link
        to="/category/create"
        class="rounded-md bg-zinc-100 py-2 px-4 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 lg:text-base"
      >
        <i class="fa-solid fa-plus mr-1"></i>
        Create Category
      </router-link>
    </div>
    <!-- MAIN CONTENT -->

    <div class="mt-4 grid grid-cols-1 gap-4">
      <div v-if="categories.loading">
        <h1>Loading.......</h1>
      </div>
      <div
        v-else
        v-for="(category, index) in categories.data"
        :key="index"
        class="flex items-start gap-4 rounded-md bg-zinc-100 p-6 shadow-xl dark:bg-zinc-800 dark:text-zinc-200 sm:p-8"
      >
        <div class="flex w-full justify-between gap-x-4">
          <div class="w-full">
            <div class="flex items-center">
              <h1
                class="text-base font-semibold sm:text-lg lg:text-2xl lg:font-medium"
              >
                {{ category.name }}
              </h1>
            </div>
            <div>
              <p class="text-sm lg:text-base">
                {{ category.description }}
              </p>
            </div>
            <div
              class="mt-2 text-xs text-zinc-700 dark:text-zinc-300 sm:text-base lg:flex lg:items-center lg:gap-4"
            >
              <div v-if="category.status" class="flex items-center gap-x-2">
                <div class="h-3 w-3 rounded bg-green-500"></div>
                <span>Active</span>
              </div>

              <div v-else class="flex items-center gap-x-2">
                <div class="h-3 w-3 rounded bg-red-500"></div>
                <span>Inactive</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between sm:flex-row sm:gap-x-4">
            <div class="flex items-center justify-between gap-2 lg:gap-4">
              <router-link
                :to="{
                  name: 'category.edit',
                  params: { id: category.id },
                }"
                ><i class="fa-solid fa-pen-to-square"></i
              ></router-link>
              <button @click="deleteCategory(category.id)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 flex justify-end dark:text-zinc-200 lg:mt-8">
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
import useCategories from "@/composables/categories";
import { onMounted } from "vue";

export default {
  setup() {
    const { categories, errors, getCategories, destroyCategory } =
      useCategories();

    onMounted(getCategories);

    const deleteCategory = async (id) => {
      if (!window.confirm("Are you sure?")) {
        return;
      }
      await destroyCategory(id);
      await getCategories();
    };

    return {
      categories,
      errors,
      deleteCategory,
    };
  },
};
</script>
