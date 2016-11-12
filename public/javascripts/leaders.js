$(document).ready(function() {
  //front-end and back-end js integration when?
  getUsers();
  //highlightUser();
})

function getUsers() {
  var leaderList = document.getElementById("leaders");
  $.post('/leaderboard/getleaders', {}, function(data) {
    console.log(data);
    //create the list item that we stick everything
    for (var i=0;i<data.length;i++) {
      //console.log(data[i]);
      leaderList.appendChild(createli(data[i]));
    }
  });
}

function createli(userinfo) {
  var
    li = document.createElement("li"),
    headerDiv = document.createElement('div'),
    bodyDiv = document.createElement('div'),
    expPara = document.createElement('p'),
    healthPara = document.createElement('p'),
    hiddenSpan = document.createElement('span'),
    userId = userinfo.user_id,
    userHealth = userinfo.user_health,
    userExp = userinfo.user_exp,
    userName = userinfo.user_name
  ;

  if (userId == localStorage.userid) {
    headerDiv.classList = "collapsible-header blue-grey lighten-5";
  } else {
    headerDiv.classList = "collapsible-header";
  }
  headerDiv.textContent = "User: " + userName;

  bodyDiv.classList = "collapsible-body";

  expPara.textContent = "Experience: " + userExp;

  healthPara.textContent = "Health: " + userHealth;

  hiddenSpan.classList = "hidden";
  hiddenSpan.textcontent = userId;

  bodyDiv.appendChild(expPara);
  bodyDiv.appendChild(healthPara);
  bodyDiv.appendChild(hiddenSpan);

  li.appendChild(headerDiv);
  li.appendChild(bodyDiv);

  return li;
}

function highlightUser() {
  //firstly, we get the container that holds the list of leaders
  var leaderboard = document.getElementById("leaders");
  //we want to find the list item with an id that's the same as our user id (localStorage)
  var leaders = leaderboard.children;
  //create a temporary store for the currently selected leader user id
  var curLeader;
  //iterate through and find our hacky identifier for the user if
  // woo! O(n)!
  for (var i=0;i<leaders.length;i++) {
    //so uh... um... This works because we know that the structure of the list will alawys appear like This
    //if I could access localStorage from node, this would be so much nicer.
    curLeader = leaders[i].children[1].children[2].textContent;
    if (curLeader == localStorage.userid) {
      //applying the classes to leaders[i] causes the second div to change color, not the first div
      leaders[i].children[0].classList += " blue-grey lighten-5";
      console.log(leaders[i].children[0]);
    }
  }
}
