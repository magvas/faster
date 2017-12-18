function setRandomPosition(params) {
    var button = document.getElementById("tapMe");
    var leftPos = button.style.left;
    var topPos = button.style.top;

    var headerHeight = document.getElementById("header").clientHeight;
    var footerHeight = document.getElementById("footer").clientHeight;

    var newLeftPos = getRndInteger(0,document.documentElement.clientWidth - button.clientWidth);

    document.getElementById("tapMe").style.left = newLeftPos + "px";

    var newTopPos = getRndInteger(0,window.innerHeight - headerHeight - footerHeight - button.clientHeight);
 
     document.getElementById("tapMe").style.top = newTopPos + "px";
 

    document.getElementById("status").innerText = "Horizontal: " + newLeftPos + " | Vertical: " + newTopPos;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}