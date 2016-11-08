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
  userName = document.getElementById("user_name").value;
  userPass = document.getElementById("pass").value;
  console.log(userName);
}
