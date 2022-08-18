import axiosClient from "@/axios";
import { ref } from "vue";

export default function useDashboard() {
  const stats = ref([]);
  const pendingTasks = ref([]);
  const errors = ref([]);

  const getStats = async () => {
    try {
      await axiosClient.get("/stats").then((res) => {
        stats.value = res.data.data;
      });
    } catch (e) {
      errors.value = e.response.data.errors;
    }
  };

  const getPendingTasks = async () => {
    try {
      await axiosClient.get("/dashboard-pending-tasks").then((res) => {
        pendingTasks.value = res.data.data;
      });
    } catch (e) {
      errors.value = e.response.data.errors;
    }
  };

  return {
    stats,
    pendingTasks,
    errors,
    getStats,
    getPendingTasks,
  };
}
