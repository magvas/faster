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
var tapMe;
var menu;
var positionbar;
var closesettingsdialogbutton;
var applysettingsdialogbutton;
var closefinaldialogbutton;
var actualTimerValue;
var resultseen;

const HITCOUNTINITVALUE = 0;
const COUNTDOWNDEFAULTVALUE = 60;
const COUNTDOWNFINALVALUE = 0;

function init(){
    bindControls();
    registerEventHandler();
    if (countdowninitvalue == undefined) {
        countdowninitvalue = COUNTDOWNDEFAULTVALUE;    
    }
    
    resetHitCount();  
    resetCountdown();
    
    setRandomPosition();    
    timerStarted = false;      
}

function bindControls() {
    hitcountelement = document.getElementById("hitcount");
    countdownelement = document.getElementById("countdown");
    finaldialog = document.getElementById("finaldialog");
    scoreelement = document.getElementById("score");
    settingsDialog = document.getElementById("settingsdialog");
    countdowninit = document.getElementById("countdowninit");
    menu = document.getElementById("menu");
    tapMe = document.getElementById("tapMe");
    closefinaldialogbutton = document.getElementById("closeFinalDialog");
    closesettingsdialogbutton = document.getElementById("closesettingsdialogbutton");
    applysettingsdialogbutton = document.getElementById("applysettingsdialogbutton");
    positionbar = document.getElementById("positionbar");
    resultseen = document.getElementById("resultseen");
}

function registerEventHandler(){
    
    menu.onclick = () => {
        showSettingsDialog();   
    }    
    
    tapMe.onclick = () => {
        hitSuccess();
    }
    
    closefinaldialogbutton.onclick = () => {
        closeFinalDialogAndInit();
    }
    
    closesettingsdialogbutton.onclick = () => {        
        closeSettingsDialog();
        resumeTimer();
    }
    
    applysettingsdialogbutton.onclick = () => {
        applySettings();
        closeSettingsDialog();
    }

    resultseen.onchange = () => {
        if (resultseen.checked) {
            closefinaldialogbutton.disabled = false;
        }
    }
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

function resumeTimer() {
    if (actualTimerValue != undefined) {
        countdown = actualTimerValue;
        runTimer();
    }    
}

function stopTimer(actualtimer) {
    if (actualtimer != undefined) {
        clearTimeout(actualtimer);
        timerStarted = false;
    }
}

function showFinalDialog(count) {
    resultseen.checked = false;
    closefinaldialogbutton.disabled = true;
    scoreelement.innerText = count + " hits in " + countdowninitvalue + " seconds!";
    finaldialog.style.display = "block";
}

function closeFinalDialogAndInit() {
    finaldialog.style.display = "none";    
    init();
}

function closeSettingsDialog() {
    settingsDialog.style.display = "none";    
}

function applySettings() {
    clearTimeout(timer);
    countdowninitvalue = countdowninit.value;
    init();
}

function stopTimer(actualtimer){
    if (actualtimer != undefined) {
        clearTimeout(actualtimer);
        actualTimerValue = countdown;
    }
}

function setHitCountElement(counter){
    hitcountelement.innerText = counter;
}

function setCountdownElement(counter){
    countdownelement.innerText = counter;
}

function showSettingsDialog(){    
    stopTimer(timer);
    countdowninit.value = countdowninitvalue;
    settingsDialog.style.display = "block";
}

function setRandomPosition() {    
    var leftPos = tapMe.style.left;
    var topPos = tapMe.style.top;

    var headerHeight = document.getElementById("header").clientHeight;
    var footerHeight = document.getElementById("footer").clientHeight;

    var newLeftPos = getRndInteger(0,document.documentElement.clientWidth - tapMe.clientWidth);

    tapMe.style.left = newLeftPos + "px";

    var newTopPos = getRndInteger(0,window.innerHeight - headerHeight - footerHeight - tapMe.clientHeight);
 
    tapMe.style.top = newTopPos + "px";
 

    positionbar.innerText = "H: " + newLeftPos + " | V: " + newTopPos;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

window.addEventListener("orientationchange", function() {
    setRandomPosition();
});

window.onload = function() {
    init();    
  };

