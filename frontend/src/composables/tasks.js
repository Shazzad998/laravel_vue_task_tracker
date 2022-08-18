import axiosClient from "@/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default function useTasks() {
  const router = useRouter();
  const tasks = ref({});

  const task = ref([]);

  const errors = ref([]);

  const getTasks = async (date) => {
    console.log(date);
    let current_page = tasks.value.meta ? tasks.value.meta.current_page : null;
    let pageNum = current_page ? current_page : 1;
    errors.value = [];
    try {
      tasks.loading = true;
      await axiosClient
        .get(`/tasks/tasks_by_date/${date}?page=${pageNum}`)
        .then((res) => {
          tasks.value = res.data;
        });
    } catch (e) {
      errors.value = e.response.data.errors;
      console.log(errors.value);
    }
  };

  const getTask = async (id) => {
    errors.value = [];
    try {
      task.loading = true;
      await axiosClient.get("/tasks/" + id).then((res) => {
        task.value = res.data.data;
      });
    } catch (e) {
      errors.value = e.response.data.errors;
      console.log(errors.value);
    }
  };

  const storeTask = async (data) => {
    errors.value = [];
    try {
      await axiosClient.post("/tasks", data);
      await router.push({ name: "task.index", params: { date: "today" } });
    } catch (e) {
      if (e.response.status === 422) {
        errors.value = e.response.data.errors;
      }
    }
  };

  const updateTask = async (id) => {
    errors.value = [];
    try {
      await axiosClient.put("/tasks/" + id, task.value);
      await router.push({ name: "task.index", params: { date: "today" } });
    } catch (e) {
      if (e.response.status === 422) {
        errors.value = e.response.data.errors;
      }
    }
  };

  const updateTaskStatus = async (id, data) => {
    errors.value = [];
    console.log(data);
    try {
      await axiosClient.put("/tasks/status/" + id, { completed: !data });
    } catch (e) {
      if (e.response.status === 422) {
        errors.value = e.response.data.errors;
      }
    }
  };

  const destroyTask = async (id) => {
    errors.value = [];
    try {
      await axiosClient.delete("/tasks/" + id);
    } catch (e) {
      errors.value = e.response.data.errors;
    }
  };

  return {
    tasks,
    task,
    errors,
    getTasks,
    getTask,
    storeTask,
    updateTask,
    updateTaskStatus,
    destroyTask,
  };
}
