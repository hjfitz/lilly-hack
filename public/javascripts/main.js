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
        if (data.length != 1) {
          window.errorbox.classList.toggle("hidden");
          window.error.textContent = "There's been an error! User doesn't exist!";
          window.errorDebug.textContent = data;
        } else {
          localStorage.setItem("lillyUserInfo", data);
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
      },
      function(data){
        //location.reload(true);  //reload the page from server (not cache)
        console.log(data);

      });
  }


}
