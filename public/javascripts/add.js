var btnAdd = document.getElementById("btn-add");
btnAdd.addEventListener("click", submit);

function submit() {
  var canSubmit = validate();
  if (canSubmit && localStorage.userid) {
    $.post('/todo/add/new',
      {
        userId: localStorage.userid,
        titl: canSubmit.titl,
        health: canSubmit.health,
        exp: canSubmit.exp,
        cont: canSubmit.cont
      },
    function(data) {
      console.log(data);
    });
    location.reload(true);
  } else {
    console.log("error");
  }
}

function validate() {
  var todo = {}
  var titleVal = document.getElementById("task-title").value;
  var expVal = document.getElementById("todo-experience").value;
  var healthVal = document.getElementById("todo-health").value;
  var contentVal = document.getElementById("todo-text").value;
  // messy if statement incoming!
  if (titleVal && expVal && healthVal && contentVal) {
    todo.titl   = titleVal;
    todo.cont   = contentVal;
    todo.exp    = parseInt(expVal);
    todo.health = parseInt(healthVal);
    return todo;
  } else {
    return false;
  }
}
