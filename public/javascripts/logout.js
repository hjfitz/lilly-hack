var btnYes = document.getElementById("btnYes");

btnYes.addEventListener("click", logout);

function logout() {
  localStorage.clear();
  window.location = "/";
}
