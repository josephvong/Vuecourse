<template>
  <div class="">
    this is a seller+{{test}}
    <p>{{count}}</p>
    <p>{{countPlusLocalState}}</p>
		<p>{{doneTodos.length}}</p>
		<input type="button" value="click" v-on:click="addHandler"/><br/>
		<input type="button" v-bind:value="count2" v-on:click="tryHandler"/>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  name: 'seller',
  data(){
  	return {
  		localCount:2
  	}
  },
  computed:{
  	test(){
  		return "A"
  	},
  	/*done(){
  		return this.$store.getters.doneTodos[0].text
  	},*/
  	...mapState({
	  	name:state=>state.name,
	  	count:state=>state.count,
	  	count2:state=>state.count2,
	  	countPlusLocalState(state){
	  		return state.count+this.localCount
	  	}
	  }),
	  ...mapGetters([
	  	"doneTodos"
	  ])
  },
  methods:{
  	addHandler(){
  		this.$store.commit("increment",4)
  	},
  	tryHandler(){
  		this.$store.commit("TRY_MUTATION")
  	}
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>