import React, { useReducer, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { start, stop, addLap, reset } from '../redux/actions'
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

    }
}))

// local useReducer. not to be confused with Redux reducer
function runtimeReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'RESET':
            return 0
        default:
            return state
    }
}

function StopWatch({ className = {} }) {
    const classes = useStyles()

    // Runtime is stored locally to avoid excessive dispatch calls to Redux by setInterval. useReducer HOOK not to be confused with Redux
    const [runtime, runtimeDispatch] = useReducer(runtimeReducer, 0)

    // Using Redux
    const [timer, laps] = useSelector(state => ([state.timer, state.laps]))
    const dispatch = useDispatch()

    /* 
        useEffect is called when ever timer state is changed. 
        As setInterval does not provide guaranteed timing, system date is used
        by offseting current epoch time against how long the time has been running.
        This allows the timer to maintain accurate time whenever timer is stoped or started.  
    */
    useEffect(() => {
        let id

        if (timer.isRunning) {
            /* 
                NOW is offest by how long time has been running, 
                this gives a relative start time from NOW and avoids timer from jumping ahead when restarted.
            */
            const startTime = Date.now() - runtime

            id = setInterval(() => {
                // new runtime (ms)
                // setRuntime(Date.now() - startTime)
                runtimeDispatch({ type: 'SET', payload: Date.now() - startTime })
            }, 10)
        }

        return () => {
            // clear interval when timer is stopped or unmounted
            clearInterval(id)
        }
    }, [timer, runtime])

    // memoized provides stable dependecy so can be called by useEffect 
    const resetTimer = useCallback(() => {
        dispatch(reset())
        runtimeDispatch({ type: 'RESET' })
    }, [dispatch])

    useEffect(() => {
        // clear laps list and stop timer when component is unmounted
        return () => {
            resetTimer()
        }
    }, [resetTimer])

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