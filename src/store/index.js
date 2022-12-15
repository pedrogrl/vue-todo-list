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
    },
    storeTodo(state, data){
      state.todos.unshift(data)
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
    },

    addTodo({commit}, data){
      return axios.post('todos', data)
        .then(res => commit('storeTodo', res.data))
    },

    updateTodo(ctx, {id, info}){
      return axios.put(`todos/${id}`, info)
    }
  },
  modules: {
  }
})
