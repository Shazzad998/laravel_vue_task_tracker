import axiosClient from "@/axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default function useCategories() {
  const router = useRouter();
  const categories = reactive({
    loading: false,
    data: [],
  });

  const category = ref([]);

  const errors = ref([]);

  const getCategories = async () => {
    try {
      categories.loading = true;
      await axiosClient.get("/categories").then((res) => {
        categories.loading = false;
        categories.data = res.data.data;
      });
    } catch (e) {
      errors.value = e.response.data.errors;
      console.log(errors.value);
    }
  };

  const getCategory = async (id) => {
    errors.value = [];
    try {
      category.loading = true;
      await axiosClient.get("/categories/" + id).then((res) => {
        category.value = res.data.data;
      });
    } catch (e) {
      errors.value = e.response.data.errors;
      console.log(errors.value);
    }
  };

  const storeCategory = async (data) => {
    errors.value = [];
    try {
      await axiosClient.post("/categories", data);
      await router.push({ name: "category.index" });
    } catch (e) {
      if (e.response.status === 422) {
        errors.value = e.response.data.errors;
      }
    }
  };

  const updateCategory = async (id) => {
    errors.value = [];
    console.log(category.value);
    try {
      await axiosClient.put("/categories/" + id, category.value);
      await router.push({ name: "category.index" });
    } catch (e) {
      if (e.response.status === 422) {
        errors.value = e.response.data.errors;
      }
    }
  };

  const destroyCategory = async (id) => {
    errors.value = [];
    try {
      await axiosClient.delete("/categories/" + id);
    } catch (e) {
      errors.value = e.response.data.errors;
    }
  };

  return {
    categories,
    category,
    errors,
    getCategories,
    getCategory,
    storeCategory,
    updateCategory,
    destroyCategory,
  };
}
