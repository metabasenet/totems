<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods: {
    reload () {
      console.log("Refresh");
      this.isRouterAlive = false
      this.$nextTick(function() {
         this.isRouterAlive = true
      })
    }
  },
  provide()
  {
    return {
      reload:this.reload
    }
  }
}
</script>

<style>

</style>
