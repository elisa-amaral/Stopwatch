function timerClock()
{
    // adds number of seconds to 00:00:00 and keeps the hh:mm:ss format 
    // number of seconds is the current timerClock count kept in 'seconds' variable
    function getTimeFromSeconds(seconds)
    {
    const date = new Date(seconds * 1000) // standard date on 01/01/1970 
    return date.toLocaleTimeString('pt-BR', { // 12AM = 00:00:00 in pt-BR format
        hour12: false, // no PM/AM next to the timer
        timeZone: 'UTC' // Universal Time Coordinated timeZone to set time to standard 00:00:00, otherwise it would add/remove the hour difference between UTC timeZone based on your country timeZone and mess the timer clock
    });
    
    }

    let seconds = 0 // keeps the timerClock count if not reseted (click Reset)
    let timeCount // is global to be called in 'pause' EventListener

    function startsTimerClock()
    {
        // keeps adding 1 second to timeCount
        timeCount = setInterval(function() {
            seconds++ 
            timerClock.innerHTML = getTimeFromSeconds(seconds) // formats time 
        }, 1000) 
    }

    const timerClock = document.querySelector('.timerClock')

    document.addEventListener('click', function(event) {
        const element = event.target  // clicked HTML element
        
        if(element.classList.contains('start'))
        {
            clearInterval(timeCount) // clears previous setInterval if any in the same session
            startsTimerClock()
            timerClock.classList.remove('waiting')
            timerClock.classList.remove('paused')
        }

        if(element.classList.contains('pause'))
        {
            timerClock.classList.add('paused')
            clearInterval(timeCount)
        }

        if(element.classList.contains('reset'))
        {
            clearInterval(timeCount)
            timerClock.innerHTML = '00:00:00'
            seconds = 0 // resets the variable that keeps the current timeClock count
            timerClock.classList.remove('paused')
            timerClock.classList.add('waiting')
        }

    });
}

timerClock()