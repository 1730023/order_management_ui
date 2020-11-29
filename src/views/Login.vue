<template>
  <div class="container">
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
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />

              <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            <!--<div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>-->
            <button type="submit" class="btn btn-secondary w-25 float-right">sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped >
#rcorners1 {
  border-radius: 12px;
  background: #66cc00;
  padding: 10px;
  width: 450px;
  height: 55px;
}
.div2 {
  background: url("../assets/image1.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.form label{
		float: left;
    }
</style>