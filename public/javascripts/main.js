var
  yesBtn = document.getElementById("btnYes"),
  noBtn = document.getElementById("btnNo"),
  logForm = document.getElementById("loginForm"),
  subBtn = document.getElementById("btnSub"),
  userName,
  userPass
;

yesBtn.addEventListener("click", goLogin);
noBtn.addEventListener("click", createAcct);
subBtn.addEventListener("click", submit);

function goLogin() {
  logForm.classList.toggle("hidden");
  subBtn.textContent = "Login";
  //should hide the buttons at some point
}

function createAcct() {
  logForm.classList.toggle("hidden");
  subBtn.textContent = "Sign Up!";
}

function submit() {
  var isCreate;
  if (subBtn.textContent == "Login") {
    isCreate = true;
  } else {
    isCreate = false; //not really necessary as an empty var == false
  }
  userName = document.getElementById("user_name").value;
  userPass = document.getElementById("pass").value;
  console.log(userName);
  $.post('/insert',
    {
      uName: userName,
      uPass: userPass,
      type:  isCreate
    },
    function(){
      location.reload(true);  //reload the page from server (not cache)
    });
}
