import Vue from 'vue'
import Vuex from 'vuex'

import {TRY_MUTATION} from './mutation-type.js'

Vue.use(Vuex);

let store=new Vuex.Store({
	state:{
		name:"myStore1 ",
		count:0,
		count2:0,
		todos:[
			{ id: 1, text: 'AA', done: true },
      { id: 2, text: 'BB', done: false },
      { id: 1, text: 'AA', done: true },
      { id: 1, text: 'AA', done: true },
      { id: 1, text: 'AA', done: false },
      { id: 1, text: 'AA', done: true },
		]
	},
	getters:{
		doneTodos:state=>{
			return state.todos.filter(todo=>todo.done)
		}
	},
	mutations:{
		increment(state,n){
			state.count+=n;
		},
		[TRY_MUTATION](state){
			state.count2+=2
		}
	}
})

export default store