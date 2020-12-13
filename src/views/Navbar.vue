<template>
  <div>
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <b style="font-size: 20px"><router-link class="nav-link" to="/">Home</router-link> </b>
          <!--</li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>-->
          </li>
          
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <router-link to="/login"><a href="/login"><span class="nav-link" v-if="isLogged === false">Login</span></a></router-link>
          <!-- <router-link v-if="!checkIfUserLogged" class="nav-link" to="/Login">Login</router-link>  -->
          
          <span class="btn btn-outline-success my-2 my-sm-0" v-if="isLogged === true" @click="logout()">Logout</span>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import { EventBus } from './event-bus';
export default {
  template: 'navbar',
  name: 'navbar',
  data () {
    return {
      isLogged: false
    }
  },
  created () {
    EventBus.$on('logged', value => {
      console.log(value)
      this.isLogged = this.checkIfIsLogged()
    })
  },
  methods: {
    logout () {
      localStorage.removeItem('username')
      this.isLogged = this.checkIfIsLogged()
      this.$router.push('login')
    },
    checkIfIsLogged () {
      let token = localStorage.getItem('username')
      if (token) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>