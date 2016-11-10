var hideBtn = document.getElementById("hide-default");
hideBtn.addEventListener("click", hideDefault);

function hideDefault() {
  var hiddenCard = document.getElementById("default-todo");
  hiddenCard.classList.toggle('hidden');
  //save to local storage. remember to create a global function to log out and clear LS.
  //can therefore utilise a document.ready to hide on default if the user has set and logged in
}

function removeTodo(e) {
  var cont = e.parentNode.nextSibling;
  //ok, so this doesn't look good... The hidden <span> will ALWAYS be the third child.
  var todoId = cont.children[3].textContent;
  console.log(cont);
  console.log(todoId);
  //plan: drop the query from the database with a post request
  //update char with the new health and exp
  $.post('/todo/del',
    {
      todoId: todoId
    },
  function(data) {
    if (data) {
      console.log(data);
      updatePlayer(cont);
      //location.reload(true);
    };
  });
}

function updatePlayer(con) {
  var
    attrs = con.children,
    health = parseInt(stripNonNum(attrs[1].textContent)),
    exp = parseInt(stripNonNum(attrs[2].textContent)),
    userid = localStorage.userid,
    newExp = localStorage.userExp + exp,
    newHealth = localStorage.userHealth + health
  ;
  console.log(newHealth);
  console.log(health);
  console.log(newExp);
  console.log(userid);

  $.post('/create/updateAtrs',
    {
      health: newHealth,
      exp: newExp,
      userid: userid
    },
    function(data) {
      if (data) {
        localStorage.userExp = newExp;
        localStorage.userHealth = newHealth;
      }
    })

}

function stripNonNum(itm) {
  itm = itm.replace(/\D/g,'');
  return itm;
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
            id      = data[i].todo_id
            title   = data[i].todo_title,
            text    = data[i].todo_text,
            exp     = data[i].todo_healthgain,
            health  = data[i].todo_expgain
          ;

          addTodo(id, title, text, health, exp, i);

        }
      }
    });
}

function addTodo(id, title, text, health, exp, todoNum) {
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
    healthPara  = document.createElement("p"),
    tickInput   = document.createElement("input"),
    tickLabel   = document.createElement("label"),
    hiddenInfo  = document.createElement("span")
  ;

  //initialise the input
  tickInput.type      = "checkbox";
  tickInput.id        = "task-" + todoNum;
  tickInput.classList = "tickoff";
  //initialise the label
  tickLabel.classList   = "tickoff";
  tickLabel.htmlFor     = "task-" + todoNum;
  tickLabel.textContent = "Done";
  tickLabel.onclick     = function() { removeTodo(this) };
  //hacky handlinf of onclick
  //but it would invoke automaticallf if the function(){} wasn't there.


  divHead.classList    = "collapsible-header";
  divContent.classList = "collapsible-body white";
  expPara.classList    = "exp";
  healthPara.classList = "health";
  hiddenInfo.classList = "hidden";

  divHead.textContent    = title;
  textPara.textContent   = text;
  expPara.textContent    = exp;
  healthPara.textContent = health;
  hiddenInfo.textContent = id;

  divHead.appendChild(tickInput);
  divHead.appendChild(tickLabel);

  divContent.appendChild(textPara);
  divContent.appendChild(expPara);
  divContent.appendChild(healthPara);
  divContent.appendChild(hiddenInfo);

  li.appendChild(divHead);
  li.appendChild(divContent);

  entryPoint.appendChild(li);
}

$(document).ready(function() {
  //something something auto hide card

  //we check to see if the user's logged in, with their little token. if they are, we load their todos.
  if (localStorage.userid) {
    getTodo(localStorage.userid);
    // go on to add event listener to ALL of the check boxes
  }

});
