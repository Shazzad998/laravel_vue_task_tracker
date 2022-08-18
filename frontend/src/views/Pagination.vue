<template>
  <div
    class="mt-4 flex flex-col justify-center dark:text-zinc-200 md:flex-row md:justify-between lg:mt-8"
  >
    <div class="font-medium text-zinc-700 dark:text-zinc-400">
      Showing {{ pagination.from }} to {{ pagination.to }} out of
      {{ pagination.total }} Results
    </div>
    <div class="flex gap-2">
      <button
        :disabled="pagination.current_page <= 1"
        class="flex h-8 items-center justify-center rounded-md bg-zinc-100 px-4 text-zinc-800 shadow-md disabled:bg-zinc-200 disabled:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 disabled:dark:text-zinc-500"
        @click.prevent="change(1)"
      >
        <i class="fa-solid fa-angles-left"></i>
      </button>

      <button
        :disabled="pagination.current_page <= 1"
        class="flex h-8 items-center justify-center rounded-md bg-zinc-100 px-4 text-zinc-800 shadow-md disabled:bg-zinc-200 disabled:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 disabled:dark:text-zinc-500"
        @click.prevent="change(pagination.current_page - 1)"
      >
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <button
        v-for="page in pages"
        :key="page"
        class="flex h-8 w-8 items-center justify-center rounded-md text-zinc-800 shadow-md dark:bg-zinc-800 dark:text-zinc-200"
        :class="[
          page == pagination.current_page
            ? 'bg-zinc-800 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-800'
            : 'bg-zinc-100',
        ]"
        @click.stop="change(page)"
      >
        {{ page }}
      </button>

      <button
        class="flex h-8 items-center justify-center rounded-md bg-zinc-100 px-4 text-zinc-800 shadow-md disabled:bg-zinc-200 disabled:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 disabled:dark:text-zinc-500"
        :disabled="pagination.current_page >= pagination.last_page"
        @click.prevent="change(pagination.current_page + 1)"
      >
        <i class="fa-solid fa-angle-right"></i>
      </button>

      <button
        class="flex h-8 items-center justify-center rounded-md bg-zinc-100 px-4 text-zinc-800 shadow-md disabled:bg-zinc-200 disabled:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-200 disabled:dark:text-zinc-500"
        :disabled="pagination.current_page >= pagination.last_page"
        @click.prevent="change(pagination.last_page)"
      >
        <i class="fa-solid fa-angles-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    offset: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    pages() {
      if (!this.pagination.to) {
        return null;
      }
      let from = this.pagination.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset * 2;
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      let pages = [];
      for (let page = from; page <= to; page++) {
        pages.push(page);
      }
      return pages;
    },
  },
  methods: {
    change: function (page) {
      this.pagination.current_page = page;
      this.$emit("paginate");
    },
  },
};
</script>
