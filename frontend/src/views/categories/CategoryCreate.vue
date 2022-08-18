<template>
  <main class="mt-12 px-4 md:px-6 xl:px-8">
    <header class="text-center text-4xl font-semibold dark:text-zinc-400">
      Category Create
    </header>

    <!-- TOP BUTTONS  -->

    <div class="mt-4 flex items-center justify-end">
      <router-link
        to="/category"
        class="rounded-md bg-zinc-900 py-2 px-4 text-sm text-zinc-200 dark:bg-zinc-200 dark:text-zinc-900 lg:text-base"
      >
        <i class="fa-solid fa-eye mr-1"></i>
        View All Categories
      </router-link>
    </div>

    <!-- FORM -->
    <form action="" class="mt-6 lg:px-8 xl:px-16 2xl:px-20">
      <div class="mb-6 flex flex-col dark:text-zinc-200">
        <label class="text-lg font-medium" for="category-name"
          >Category Name</label
        >
        <input
          type="text"
          v-model="formData.name"
          id="category-name"
          :class="[errors.name ? ' ring-1 ' : ' ring-0']"
          class="mt-2 rounded-md border-none ring-red-500 focus:ring-zinc-900 dark:bg-zinc-800 dark:focus:ring-zinc-200"
        />
        <small v-if="errors.name" class="text-red-500">{{
          errors.name[0]
        }}</small>
      </div>

      <div class="mb-6 flex flex-col dark:text-zinc-200">
        <label class="text-lg font-medium" for="category-description"
          >Category Description</label
        >
        <textarea
          id="category-description"
          rows="2"
          v-model="formData.description"
          :class="[errors.description ? 'ring-1' : 'ring-0']"
          class="mt-2 rounded-md border-none ring-red-500 focus:ring-zinc-900 dark:bg-zinc-800 dark:focus:ring-zinc-200"
        ></textarea>
        <small v-if="errors.description" class="text-red-500">{{
          errors.description[0]
        }}</small>
      </div>

      <div class="mb-6 flex flex-col dark:text-zinc-200">
        <div>
          <label class="inline-block text-lg font-medium" for="status"
            >Status</label
          >
        </div>

        <div
          class="relative mr-2 mt-2 inline-block w-10 select-none align-middle"
        >
          <input
            type="checkbox"
            id="status"
            v-model="formData.status"
            class="peer absolute mx-1 mt-1 flex h-4 w-4 cursor-pointer appearance-none items-center rounded-full border-none bg-zinc-900 text-zinc-900 ring-0 duration-300 ease-in-out checked:right-0 focus:border-0 focus:border-none focus:ring-0"
          />
          <label
            for="status"
            class="block h-6 cursor-pointer overflow-hidden rounded-full bg-zinc-100 duration-300 ease-in-out peer-checked:bg-zinc-700 dark:bg-zinc-700 dark:peer-checked:bg-zinc-200"
          ></label>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          @click.prevent="saveCategory"
          class="rounded-md bg-zinc-200 py-1 px-6 font-medium shadow-md"
        >
          Save
        </button>
      </div>
    </form>
  </main>
</template>

<script>
import useCategories from "@/composables/categories";
import { ref } from "vue";

export default {
  setup() {
    const formData = ref({
      name: "",
      description: "",
      status: true,
    });

    const { errors, storeCategory } = useCategories();

    const saveCategory = () => {
      storeCategory(formData.value);
    };

    return {
      formData,
      errors,
      saveCategory,
    };
  },
};
</script>
