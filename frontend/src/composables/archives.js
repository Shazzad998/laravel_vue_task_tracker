import axiosClient from "@/axios";
import { ref } from "vue";

export default function useArchives() {
  const archives = ref([]);

  const errors = ref([]);

  const getArchives = async () => {
    errors.value = [];
    try {
      await axiosClient.get("/archives").then((res) => {
        archives.value = res.data.data;
      });
    } catch (e) {
      errors.value = e.response.data.errors;
      console.log(errors.value);
    }
  };

  return {
    archives,
    errors,
    getArchives,
  };
}
