var
  yesBtn = document.getElementById("btnYes"),
  noBtn = document.getElementById("btnNo"),
  logForm = document.getElementById("loginForm"),
  subBtn = document.getElementById("btnSub"),
  errBtn = document.getElementById("errorHide"),
  userName,
  userPass
;

yesBtn.addEventListener("click", goLogin);
noBtn.addEventListener("click", createAcct);
subBtn.addEventListener("click", submit);
errBtn.addEventListener("click", hideError);


function goLogin() {
  logForm.classList.toggle("hidden");
  subBtn.textContent = "Login";
  //should hide the buttons at some point
}

function createAcct() {
  logForm.classList.toggle("hidden");
  subBtn.textContent = "Sign Up!";
}

function hideError() {
  var errCard = document.getElementById("errorbox");
  errCard.classList.toggle("hidden");
}

function submit() {
  var isCreate;
  userName = document.getElementById("user_name").value;
  userPass = document.getElementById("pass").value;
  if (subBtn.textContent == "Login") {
    console.log("logging in");
    isCreate = "login";
    $.post('/create/login',
      {
        uName: userName,
        uPass: userPass,
        type:  isCreate
      },
      function(data){
        //location.reload(true);  //reload the page from server (not cache)
        console.log(data);
        //var arr = [1,2,3];
        console.log(data[0]);
        if (data.length != 1) {
          window.errorbox.classList.toggle("hidden");
          window.error.textContent = "There's been an error! User doesn't exist!";
          window.errorDebug.textContent = data;
        } else {
          var
            username = data[0].user_name,
            userid = data[0].user_id,
            exp = data[0].user_exp,
            health = data[0].user_health
          ;
          console.log(userid);
          localStorage.setItem("username", username);
          localStorage.setItem("userid", userid);
          localStorage.setItem("userExp", exp);
          localStorage.setItem("userHealth", health);
        window.location = "/create";
        }
      });
  } else {
    isCreate = "signup"; //not really necessary as an empty var == false
    $.post('/insert/create',
      {
        uName: userName,
        uPass: userPass,
        type:  isCreate
      }, function(data){
        //location.reload(true);  //reload the page from server (not cache)
        console.log(data);
        //window.errorBox.classList.toggle("hidden");
        welcome(userName);
      }
    );
  }
}

function welcome(user) {
  if (window.errorbox.classList[1]) {
    window.statCard.classList = "card blue-grey lighten-1";
    window.errorbox.classList = "card";
    window.statTitle.textContent = "Welcome!";
    window.error.textContent = "Welcome, " + user;
    window.errorDebug.textContent = "Click login to continue to login!";
    window.loginForm.classList.toggle("hidden");
  }
}
