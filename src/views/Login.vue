<template>
  <div class="">
    <div class="div2">
      <div class="row">
        <div class="col-sm-4">
          <img src="../assets/hrc-logo.svg" />
        </div>
        <div class="col-sm-4"></div>
        <div class="w-100"></div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div class="col-sm-8">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p id="rcorners1">ORDER MANAGEMENT APPLICATION</p>
        </div>
        <div class="col-sm-4">
          <h3 style="text-align:left;">Sign in</h3>
          <form>
            <div>
              <label for="uname">
                <p
                  class="sansserif"
                  style="margin-left:-250px; color: #4d3e3e ;font-size: 20px">Username</p>
              </label>
              <input
                type="text"
                style="border:none; outline:none; border-bottom: 2px solid #FAB400; background-color: #e6ffff"
                name="uname"
                v-model="email"
                required
              />

              <label for="psw">
                <p
                  class="sansserif"
                  style="margin-left:-250px; color: #4d3e3e; font-size: 20px">Password</p>
              </label>
              <input
                v-model="password"
                type="password"
                style="border:none; outline:none; border-bottom: 2px solid #FAB400; background-color: #e6ffff"
                name="psw"
                required
              />
            </div>

            <button
              type="submit"
              @click="loginFun()" class="btn btn-secondary w-25 float-right">sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data(){
    return{
      email: "",
      password: "",
      baseUrl: "http://localhost:8088"
    }
  },
  created(){

  },
  computed: {

  },
  methods: {
    loginFun(){
      console.log(this.email);
      console.log(this.password);
      var _obj = this;
      return axios
        .post(`${this.baseUrl}/users`,{
          username: this.email,
          password: this.password,
        },{
          headers : {
              'Accept': 'application/json',
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        .then(response => {
          console.log("status", response.data.status)
          if (response.data.status){
             _obj.$router.push('dashboard');
             if(this.email === "David_Lee"){
               localStorage.setItem("username", this.email)
             }else if(this.email === "Laura_Smith"){
                localStorage.setItem("username", this.email)
             }else if(this.email === "Matthew_Vance"){
                localStorage.setItem("username", this.email)
             }

          }else{
            alert('Inavid username and password!')
          }
        })
        .catch(e => {
          console.log(e);
			});

      
    }
  }
};
</script>

<style scoped >
#rcorners1 {
  border-radius: 12px;
  background: #8fd163;
  padding: 10px;
  width: 450px;
  height: 55px;
}
.div2 {
  background: url("../assets/image1.png");
  background-size: contain;
  background-repeat: no-repeat;
}
/* .form label {
  float: left; */
  input[type=text], input[type=password] {
  width: 110%;
  padding: 12px;
  margin: 6px 0;
  }
  .sansserif {
  font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif;
  }
</style>