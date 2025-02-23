// function to resize nav bar on smaller screens
function resizeNavBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}
  

// Function to download data to a file
var chatoutput = document.getElementById('conversation');
var linksoutput = document.getElementById('download');
download.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(VALUE));
download.setAttribute('download', 'filename.csv');
