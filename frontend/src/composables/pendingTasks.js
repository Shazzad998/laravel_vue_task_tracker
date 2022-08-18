import axiosClient from "@/axios";
import { ref } from "vue";

export default function usePendingTasks() {
  const pendingTasks = ref([]);

  const errors = ref([]);

  const getPendingTasks = async () => {
    errors.value = [];
    try {
      await axiosClient.get("/pending-tasks").then((res) => {
        pendingTasks.value = res.data.data;
      });
    } catch (e) {
      errors.value = e.response.data.errors;
    }
  };

  return {
    pendingTasks,
    errors,
    getPendingTasks,
  };
}
