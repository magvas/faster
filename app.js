var hitcount = 0;
var hitcountelement;
var countdownelement;
var timerStarted;
var countdown;
var finaldialog;
var scoreelement;
var settingsDialog;
var countdowninitvalue;
var countdowninit;
var timer;
const HITCOUNTINITVALUE = 0;
const COUNTDOWNDEFAULTVALUE = 60;
const COUNTDOWNFINALVALUE = 0;

function init(){
    hitcountelement = document.getElementById("hitcount");
    countdownelement = document.getElementById("countdown");
    finaldialog = document.getElementById("finaldialog");
    scoreelement = document.getElementById("score");
    settingsDialog = document.getElementById("settingsdialog");
    countdowninit = document.getElementById("countdowninit");

    if (countdowninitvalue == undefined) {
        countdowninitvalue = COUNTDOWNDEFAULTVALUE;    
    }
    
    resetHitCount();  
    resetCountdown();
    setRandomPosition();    
    timerStarted = false;      
}

function resetHitCount(){
    hitcount = HITCOUNTINITVALUE;
    setHitCountElement(hitcount);
}

function resetCountdown() {
    countdown = countdowninitvalue;
    setCountdownElement(countdown);
}

function hitSuccess(){
    if (!timerStarted) {        
        runTimer();
    } 
    setRandomPosition();
    hitcount++;
    setHitCountElement(hitcount);
}

function runTimer() {    
    timerStarted = true;
    if (countdown !== COUNTDOWNFINALVALUE) {
        timer = setTimeout(() => {
            countdown--;
            setCountdownElement(countdown);
            runTimer();
        }, 1000);    
    }
    else{    
        showFinalDialog(hitcount);
    }        
}

function showFinalDialog(count) {
    scoreelement.innerText = count + " hits in " + countdowninitvalue + " seconds!";
    finaldialog.style.display = "block";
}

function closeFinalDialogAndInit() {
    finaldialog.style.display = "none";
    init();
}

function closeSettingsDialog() {
    settingsDialog.style.display = "none";
    countdowninitvalue = countdowninit.value;
    init();
}

function setHitCountElement(counter){
    hitcountelement.innerText = counter;
}

function setCountdownElement(counter){
    countdownelement.innerText = counter;
}

function showSettingsDialog(){
    clearTimeout(timer);
    countdowninit.value = countdowninitvalue;
    settingsDialog.style.display = "block";
}

function setRandomPosition() {
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