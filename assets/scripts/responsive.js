// function to resize nav bar on smaller screens
function resizeNavBar() {
    var x = document.getElementById("navBar");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
  }
  