$(document).ready(function() {
  //front-end and back-end js integration when?
  highlightUser();
})

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
