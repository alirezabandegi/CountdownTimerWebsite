document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete"){
        initApp();
    }
})

const initApp = () => {
    const timeDisplayer =document.querySelector("#timeDisplayer");
    const startTime = document.querySelector(".startTime");
    const pauseTime = document.querySelector(".pauseTime");
    const userSetTimeBtn = document.querySelector("#userSetTimeBtn");
    const setTimeInput = document.querySelector("#setTimeInput");
    
    const firstNumForSecUpArrow = document.querySelector("#firstNumForSecUpArrow");
    const secondNumForSecUpArrow = document.querySelector("#secondNumForSecUpArrow");
    const firstNumForMinUpArrow = document.querySelector("#firstNumForMinUpArrow");
    const secondNumForMinUpArrow = document.querySelector("#secondNumForMinUpArrow");

    const firstNumForSecUpDown = document.querySelector("#firstNumForSecUpDown");
    const secondNumForSecDownArrow = document.querySelector("#secondNumForSecDownArrow");
    const firstNumForMinDownArrow = document.querySelector("#firstNumForMinDownArrow");
    const secondNumForMinDownArrow = document.querySelector("#secondNumForMinDownArrow");
    
    const timeInputNumber = document.querySelectorAll(".timeInputNumber");
    
    let isTimeStarted = false;
    let currentPauseTimeMin = 0;
    let currentPauseTimeSec = 0;
    let getTime;
    let timeMin;
    let timeSec;
    
    class setTime{
        constructor(secNumOne, secNumTwo, minNumOne, minNumTwo){
            this.secNumOne = secNumOne;
            this.secNumTwo = secNumTwo;
            this.minNumOne = minNumOne;
            this.minNumTwo = minNumTwo;
        }
        calculateSec(){
            let paste = [this.secNumTwo, this.secNumOne].join("");
            return Number(paste);
        }
        calculateMin(){
            let paste = [this.minNumTwo, this.minNumOne].join("");
            return Number(paste);
        }
    }
    
    userSetTimeBtn.addEventListener("click", () => {
        setTimeInput.style.display = "flex";
    });
    
    firstNumForSecUpArrow.addEventListener("click", () => {
        if(Number(timeInputNumber[3].textContent) === 9){
            timeInputNumber[3].textContent = "0";
        }
        else{
            timeInputNumber[3].textContent = Number(timeInputNumber[3].textContent) + 1;
        }
    });
    
    secondNumForSecUpArrow.addEventListener("click", () => {
        if(Number(timeInputNumber[2].textContent) === 5){
            timeInputNumber[2].textContent = "0";
        }
        else{
            timeInputNumber[2].textContent = Number(timeInputNumber[2].textContent) + 1;
        }
    });
    
    firstNumForMinUpArrow.addEventListener("click", () => {
        if(Number(timeInputNumber[1].textContent) === 9){
            timeInputNumber[1].textContent = "0";
        }
        else{
            
            timeInputNumber[1].textContent = Number(timeInputNumber[1].textContent) + 1;
        }
    });
    
    secondNumForMinUpArrow.addEventListener("click", () => {
        if(Number(timeInputNumber[0].textContent) === 5){
            timeInputNumber[0].textContent = "0";
        }
        else{
            timeInputNumber[0].textContent = Number(timeInputNumber[0].textContent) + 1;
        }
    });

    firstNumForSecUpDown.addEventListener("click", () => {
        if(Number(timeInputNumber[3].textContent) === 0){
            timeInputNumber[3].textContent = "9";
        }
        else{
            timeInputNumber[3].textContent = Number(timeInputNumber[3].textContent) - 1;
        }
    });
    
    secondNumForSecDownArrow.addEventListener("click", () => {
        if(Number(timeInputNumber[2].textContent) === 0){
            timeInputNumber[2].textContent = "5";
        }
        else{
            timeInputNumber[2].textContent = Number(timeInputNumber[2].textContent) - 1;
        }
    });
    
    firstNumForMinDownArrow.addEventListener("click", () => {
        if(Number(timeInputNumber[1].textContent) === 0){
            timeInputNumber[1].textContent = "9";
        }
        else{
            
            timeInputNumber[1].textContent = Number(timeInputNumber[1].textContent) - 1;
        }
    });
    
    secondNumForMinDownArrow.addEventListener("click", () => {
        if(Number(timeInputNumber[0].textContent) === 0){
            timeInputNumber[0].textContent = "5";
        }
        else{
            timeInputNumber[0].textContent = Number(timeInputNumber[0].textContent) - 1;
        }
    });

    pauseTime.addEventListener("click", () => {
        pauseTime.style.display = "none";
        startTime.style.display = "flex";
    });
    
    startTime.addEventListener("click", () => {
        if (setTimeInput.style.display === "none"){
            timeMin = currentPauseTimeMin;
            timeSec = currentPauseTimeSec;
        }
        if(setTimeInput.style.display === "flex"){
            getTime = new setTime(timeInputNumber[3].textContent, timeInputNumber[2].textContent, timeInputNumber[1].textContent, timeInputNumber[0].textContent);
            timeMin = getTime.calculateMin();
            timeSec = getTime.calculateSec();
            setTimeInput.style.display = "none";
        }

        if(!isTimeStarted){
            isTimeStarted = true;
            startTime.style.display = "none";
            pauseTime.style.display = "flex";
            let time = setInterval(() => {
                if(pauseTime.style.display === "none"){
                    currentPauseTimeMin = timeMin;
                    currentPauseTimeSec = timeSec;
                    pauseTime.style.display = "none";
                    startTime.style.display = "flex";
                    isTimeStarted = false;
                    clearInterval(time);
                }
                else if(timeMin === 0 && timeSec === 0){
                    timeDisplayer.textContent = `0${timeMin}:0${timeSec}`;
                    startTime.style.display = "flex";
                    pauseTime.style.display = "none";
                    alert("TIME IS OVER!");
                    isTimeStarted = false;
                    clearInterval(time);
                }
                else if(timeMin !== 0 && timeSec === 0){
                    timeDisplayer.textContent = `${timeMin}:0${timeSec}`;
                    timeMin--;
                    timeSec = 59;
                }
                else if(timeMin < 10 && timeSec < 10){
                    timeDisplayer.textContent = `0${timeMin}:0${timeSec}`;
                    timeSec--;
                }
                else if(timeSec < 10){
                    timeDisplayer.textContent = `${timeMin}:0${timeSec}`;
                    timeSec--;
                }
                else if(timeMin < 10){
                    timeDisplayer.textContent = `0${timeMin}:${timeSec}`;
                    timeSec--;
                }
                else{
                    timeDisplayer.textContent = `${timeMin}:${timeSec}`;
                    timeSec--;
                }
            },1000);
        }
    });
}

