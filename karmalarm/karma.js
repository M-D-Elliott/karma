// set times here
const clockTimes = 
              [
               "00:00",
               "1:00",
               "2:00",
               "3:00",
               "4:00",
               "5:00",
               "6:00"
              ];

//globals
const DELIMITER = ":";

const currentTimeDisplay = document.getElementById("currTime");
const nextDropDisplay = document.getElementById("nextDrop");
const soundContainer = document.getElementById("sound");

const dts = parseDateTimesAndRandomize(clockTimes);

let nextDropIndex = 0;

const nextDropTime = dts[nextDropIndex];
const finalDropTime = dts[dts.length - 1];

const tracks = new MusicLoader().run(soundContainer);

let button = null;

function init(btn){
    button = btn;
    button.disabled = true;

    while(new Date() > dts[nextDropIndex]){
        nextDropIndex++;
    }

    loop();
}

function loop(){

    const currentTime = new Date();

    setClockDisplay(currentTimeDisplay, currentTime, DELIMITER);

    const nextDrop = dts[nextDropIndex];
    setClockDisplay(nextDropDisplay, nextDrop, DELIMITER);

    if(currentTime > nextDrop){
        playSong();
        nextDropIndex++;
    }

    if(nextDropIndex < dts.length){
        return window.requestAnimationFrame(loop);
    } else {
        button.disabled = false;
    }
}

// app functions
function playSong(){
    tracks[0].play();
}

function parseDateTimesAndRandomize(times){

    const dateTimes = [];

    for(i=0;i<times.length;i++){
        dateTimes[i] = parseDateTime(times[i]);
        dateTimes[i] = addRandomMinutesAndSeconds(dateTimes[i]);
    }

    return dateTimes;
}

//helpers
function parseDateTime(timeAsString){
    const splitTime = timeAsString.split(DELIMITER);

    const hours = parseInt(splitTime[0]);
    const minutes = parseInt(splitTime[1]);

    const newDate = new Date();

    newDate.setHours(hours, minutes, 0);

    return newDate;
}

function addRandomMinutesAndSeconds(currT){
    const addedMinutes = getRandomNumberBetween(0, 59);
    const addedSeconds = getRandomNumberBetween(0, 59);
    currT.setHours(currT.getHours(),addedMinutes,addedSeconds);

    return currT;
}

function compareTime(t1, t2){
    return t1 >= t2;
}

function getRandomNumberBetween(start,end){
    return Math.floor(Math.random()*(end-start+1))+start;
}

function setClockDisplay(element, dateTime, delimiter){
    element.innerText = dateTime.getHours() + delimiter + appendZero(dateTime.getMinutes()) + delimiter + appendZero(dateTime.getSeconds());
}

function appendZero(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}

