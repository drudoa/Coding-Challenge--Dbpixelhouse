import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { start, stop } from '../redux/actions/timerActions'
import { addLap, reset } from '../redux/actions/lapsActions'
import { makeStyles } from '@material-ui/core/styles'
import LapsTable from './LapsTable'
import TimerDisplay from './TimerDisplay'
import Buttons from './Buttons'
import Progress from './Progress'

const useStyles = makeStyles(theme => ({
    root: {
        width: 360,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttons: {
        marginBottom: 40
    },
    timer: {
        margin: "40px 0 30px 0"
    },
    laps: {
        '& > ul': {
            margin: '0 10px'
        }
    }
}))

function StopWatch({ className = {} }) {
    const [runtime, setRuntime] = useState(0) // Runtime is stored locally to avoid excessive dispatch calls by setInterval.
    const [timer, laps] = useSelector(state => ([state.timer, state.laps]))
    const dispatch = useDispatch()
    const classes = useStyles()

    /* 
        useEffect is called when ever timer state is changed. 
    */
    useEffect(() => {
        let id

        if (timer.isRunning) {
            /*
                As setInterval does not provide guaranteed timing, system date is used
                by offseting current epoch time against how long the time has been running.
                This allows the timer to maintain accurate time whenever timer is stoped or started.  
            */

            // now is offest by how long time has been running
            const startTime = Date.now() - runtime

            id = setInterval(() => {
                // new runtime
                setRuntime(Date.now() - startTime)
            }, 10)
        }

        return () => {
            // clear interval when timer is stopped or unmounted
            clearInterval(id)
        }
    }, [timer])

    useEffect(() => {
        // clear laps list and stop timer when component is unmounted
        return () => {
            resetTimer()
        }
    }, [])

    function resetTimer() {
        dispatch(stop())
        dispatch(reset())
        setRuntime(0)
    }

    return (
        <div className={[classes.root, className].join(" ")}>
            <Progress
                className={classes.timer}
                progress={parseRuntime(runtime)}
                size={380}
                thickness={6}
            >
                <TimerDisplay epochTime={runtime} fontSize={80} />
            </Progress>
            <Buttons
                className={classes.buttons}
                isRunning={timer.isRunning}
                onStart={() => { dispatch(start()) }}
                onStop={() => { dispatch(stop()) }}
                onReset={resetTimer}
                onLap={() => { dispatch(addLap(runtime)) }}
            />
            <LapsTable
                className={classes.laps}
                laps={laps}
            />
        </div>
    )
}

// extract centisecons part from runtime
function parseRuntime(time) {
    let t = time.toString().split('').slice(-3, -1)
    return parseInt(t.join(''))
}

export default StopWatch