<?php
    if(isset($_COOKIE["phone"])){
        //header("Location:http://192.168.137.1:3000");
    }
?>
<html>
    <head><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            :root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none),
(-ms-high-contrast: active) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
        </style>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <link href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" rel="stylesheet" id="bootstrap-css1">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js"></script>
        <!------ Include the above in your HEAD tag ---------->
        <title>
            Login
        </title>
    </head>
    <body>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Login</h5>
            <form class="form-signin" action="validate.php" method="post">
              <div class="form-group">
              <!-- <label for="inputTel">Phone</label> -->
                <input type="tel" id="phone" class="form-control" placeholder="Phone number" required name="phone" style="height:53px;border-radius:25px" autofocus>
                
              </div>

              <div class="form-group">
              <!-- <label for="inputPassword">Password</label> -->
                <input type="password" id="pass" class="form-control" placeholder="Password" required name="password" style="height:53px;border-radius:25px">
                
              </div>

              <!-- <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div> -->
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
              <hr class="my-4">
              <center><a href="#signup.html" onclick="window.location.replace('signup.html')">New user?</a></center>
              <span id="error"></span>
              <!-- <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
              <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>

<script>
function validate() {
  var xhttp = new XMLHttpRequest();
  var phone=document.getElementById('phone');
  var pass=document.getElementById('pass');
  if(phone.value!=''&&pass.value!=''){
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      document.getElementById("error").innerHTML =
      
      this.responseText;
    }
  };
  xhttp.open("POST", "validate.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("phone="+phone.value+"&pass="+pass.value);}
}
</script>