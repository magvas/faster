function randomPosition(params) {
    var button = document.getElementById("tapMe");
    var leftPos = button.style.left;
    var topPos = button.style.top;

    var newLeftPos;
    
    if(leftPos === ""){
       newLeftPos = (leftPos* 1)+10;
    }
    else{
        newLeftPos = ((leftPos.slice(0,leftPos.length - 2)) * 1) + 10;
    }

    document.getElementById("tapMe").style.left = newLeftPos + "px";

    var newTopPos;

    if(topPos === ""){
        newTopPos = (topPos* 1)+10;
     }
     else{
        newTopPos = ((topPos.slice(0,topPos.length - 2)) * 1) + 10;
     }
 
     document.getElementById("tapMe").style.top = newTopPos + "px";
 

    document.getElementById("status").innerText = "Horizontal: " + newLeftPos + " | Vertical: " + newTopPos;
}