var hideBtn = document.getElementById("hide-default");
hideBtn.addEventListener("click", hideDefault);

function hideDefault() {
  var hiddenCard = document.getElementById("default-todo");
  hiddenCard.classList.toggle('hidden');
  //save to local storage. remember to create a global function to log out and clear LS.
  //can therefore utilise a document.ready to hide on default if the user has set and logged in
}


function getTodo(id) {
  console.log(id);
  //I'm so sorry for the spaghetti code you're about to witness
  //we want to run a select command, so we post to /todo/gettodo, which is handled by a route that's been set up
  $.post('/todo/gettodo',
    {
      userId: id
    },
    function(data) {
      if (data) {
        console.log(data);
        for (var i = 0; i<data.length;i++) {
          var
            title   = data[i].todo_title,
            text    = data[i].todo_text,
            exp     = data[i].todo_healthgain,
            health  = data[i].todo_expgain
          ;

          addTodo(title, text, health, exp);

        }
      }
    });
}

function addTodo(title, text, health, exp) {
  //one list item
    // div class collapsible header $title
    // div class collapsible body white
      // p with $text
      // p class exp $exp
      // p class health $health
  var
    entryPoint  = document.getElementById("todo-list"),
    li          = document.createElement("li"),
    divHead     = document.createElement("div"),
    divContent  = document.createElement("div"),
    textPara    = document.createElement("p"),
    expPara     = document.createElement("p"),
    healthPara  = document.createElement("p")
  ;

  divHead.classList     = "collapsible-header";
  divContent.classList  = "collapsible-body white";
  expPara.classList     = "exp";
  healthPara.classList  = "health";

  divHead.textContent     = title;
  textPara.textContent    = text;
  expPara.textContent     = exp;
  healthPara.textContent  = health;

  divContent.appendChild(textPara);
  divContent.appendChild(expPara);
  divContent.appendChild(healthPara);

  li.appendChild(divHead);
  li.appendChild(divContent);

  entryPoint.appendChild(li);
}

$(document).ready(function() {
  var todos;
  //something something auto hide card

  //we check to see if the user's logged in, with their little token. if they are, we load their todos.
  if (localStorage.userid) {
    todos = getTodo(localStorage.userid);
    //console.log(todos);
  }

});
