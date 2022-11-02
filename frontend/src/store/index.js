import { createStore } from "vuex";
import axiosClient from "@/axios";

const tempTasks = [
  {
    id: "1",
    title: " Read 5 Pages of a book",
    description:
      " Read at least 5 pages of a book that improves my productivity",
    category: "Personal",
    priority: 1,
    completed: false,
    deadline: "22-03-2022-12:43:32",
    created_date: "22-03-2022",
    created_at: "22-03-2022-12:43:32",
  },

  {
    id: "2",
    title: " Read 5 Pages of a book",
    description:
      " Read at least 5 pages of a book that improves my productivity",
    category: "Personal",
    priority: 2,
    completed: false,
    deadline: "22-03-2022-12:43:32",
    created_date: "22-03-2022",
    created_at: "22-03-2022-12:43:32",
  },

  {
    id: "3",
    title: " Read 5 Pages of a book",
    description:
      " Read at least 5 pages of a book that improves my productivity",
    category: "Personal",
    priority: 3,
    completed: false,
    deadline: "",
    created_date: "22-03-2022",
    created_at: "22-03-2022-12:43:32",
  },
];

const store = createStore({
  state: {
    user: {
      data: {
        name: "",
        email: "",
      },
      token: sessionStorage.getItem("TOKEN"),
    },

    errors: [],

    tasks: [...tempTasks],
  },
  getters: {},

  actions: {
    logout({ commit }) {
      return axiosClient.post("/logout").then(() => {
        commit("logout");
      });
    },
    register({ commit }, user) {
      return axiosClient
        .post("/register", user)
        .then(({ data }) => {
          commit("setUser", data);
          return data;
        })
        .catch((e) => {
          commit("setError", e);
          throw e;
        });
    },

    login({ commit }, user) {
      return axiosClient
        .post("/login", user)
        .then(({ data }) => {
          commit("setUser", data);
          return data;
        })
        .catch((e) => {
          commit("setError", e);
        });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },

    setUser: (state, userData) => {
      state.user.data = userData.data;
      state.user.token = userData.token;
      sessionStorage.setItem("TOKEN", userData.token);
    },

    setError: (state, errorData) => {
      state.errors = errorData.response.data.errors;
    },
  },

  modules: {},
});
export default store;
