/*
    Add lap time
    Expects total runtime of timer in ms 
*/
export const addLap = (currentTime) => {
    return (dispatch, getState) => {
        const prevLaps = getState().laps
        let lapTime
        let n = prevLaps.length + 1

        if (prevLaps.length > 0) {
            // next lap is the current timer's total runtime - accumulated time of other laps
            lapTime = currentTime - prevLaps.reduce((total, lap) => total + lap.time, 0)
        } else {
            // first lap only
            lapTime = currentTime
        }

        return dispatch({
            type: 'ADD_LAP',
            payload: {
                num: n,
                time: lapTime
            }
        })
    }
}

// stop timer and reset lap times
export const reset = () => ({
    type: 'RESET'
})

// start timer
export const start = () => ({
    type: 'START'
})

// stop timer
export const stop = () => ({
    type: 'STOP'
})