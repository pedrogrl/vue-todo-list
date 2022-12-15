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
      const index = state.todos.findIndex(todo => todo.id === data.id)
      if(index > -1){
        state.todos.splice(index, 1, data)
      } else {
        state.todos.unshift(data)
      }
    },

    deleteTodo(state, id){
      const index = state.todos.findIndex(todo => todo.id === id)
      if(index > -1){
        state.todos.splice(index, 1)
      }
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

    updateTodo({commit}, {id, info}){
      return axios.put(`todos/${id}`, info)
        .then(res => commit('storeTodo', res.data))
    },

    deleteTodo({commit}, id){
      return axios.delete(`todos/${id}`)
        .then(() => commit('deleteTodo', id))
    },
  },
  modules: {
  }
})
