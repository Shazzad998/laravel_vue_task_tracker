import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import NotFound from "./views/NotFound.vue";
import Category from "./views/categories/Category.vue";
import CategoryCreate from "./views/categories/CategoryCreate.vue";
import CategoryEdit from "./views/categories/CategoryEdit.vue";
import TaskIndex from "./views/tasks/TaskIndex.vue";
import TaskIndex2 from "./views/tasks/TaskIndex2.vue";
import TaskCreate from "./views/tasks/TaskCreate.vue";
import TaskEdit from "./views/tasks/TaskEdit.vue";
import Archives from "./views/archives/Archives.vue";
import PendingTasks from "./views/pending_tasks/PendingTasks.vue";
import DefaultLayout from "./components/layouts/DefaultLayout.vue";
import AuthLayout from "./components/layouts/AuthLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
        name: "dashboard",
      },

      {
        path: "/category",
        component: Category,
        name: "category.index",
      },

      {
        path: "/category/create",
        component: CategoryCreate,
        name: "category.create",
      },

      {
        path: "/category/:id",
        component: CategoryEdit,
        name: "category.edit",
      },

      {
        path: "/archives",
        component: Archives,
        name: "archives",
      },

      {
        path: "/tasks/:date",
        component: TaskIndex,
        name: "task.index",
      },

      {
        path: "/tasks/:date",
        component: TaskIndex2,
        name: "task.index.today",
      },

      {
        path: "/task/create",
        component: TaskCreate,
        name: "task.create",
      },

      {
        path: "/task/:id",
        component: TaskEdit,
        name: "task.edit",
      },

      {
        path: "/pending-tasks",
        component: PendingTasks,
        name: "pending_tasks",
      },
    ],
  },

  {
    path: "/auth",
    component: AuthLayout,
    redirect: "/login",
    name: "Auth",
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        component: Login,
        name: "login",
      },

      {
        path: "/register",
        component: Register,
        name: "register",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
