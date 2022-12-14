import { createStore } from 'vuex'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000";

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    storeTodos(state, data){
      state.todos = data
    }
  },
  actions: {
    getTodos({commit}){
      return new Promise((resolve => {
        setTimeout(() => {
          return axios
          .get("todos")
          .then((response) => {
            commit("storeTodos", response.data)
            resolve()
          })
        }, 500);
      }))
    }
  },
  modules: {
  }
})
