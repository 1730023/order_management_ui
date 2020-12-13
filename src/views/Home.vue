<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/hrc.jpg">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { EventBus } from './event-bus'
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  created() {
    this.checkUserLoggedIn();
  },
  methods: {
    checkUserLoggedIn(){
      let token = localStorage.getItem('username')
      if (token) {
        EventBus.$emit('logged', 'User logged')
        this.$router.push('dashboard')
      }
    }
  }
}
</script>
