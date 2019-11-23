import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import ReplayIcon from '@material-ui/icons/Replay'
import FlagIcon from '@material-ui/icons/Flag'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        padding: 0,
        width: 59
    },
    icon: {
        fontSize: 59
    }
}))

const Buttons = ({
    isRunning = false,
    className = {},
    onStart = () => { },
    onStop = () => { },
    onReset = () => { },
    onLap = () => { },
}) => {
    const [hasStarted, setHasStarted] = useState(false)
    const classes = useStyles()

    // following methods need some extra logic to disable lap button until timer has started
    function start() {
        setHasStarted(true)
        onStart()
    }

    function reset() {
        setHasStarted(false)
        onReset()
    }

    return (
        <div className={[classes.root, className].join(" ")}>
            {/* hide lap button if time has not started */}
            {(hasStarted && !isRunning) ? (
                <IconButton
                    aria-label="lap"
                    className={classes.button}
                    onClick={reset}
                >
                    <ReplayIcon style={{ fontSize: 40 }} />
                </IconButton>
            ) : (
                    <div className={classes.button}></div>
                )}

            {!isRunning ? (
                <>
                    <IconButton
                        aria-label="start"
                        className={classes.button}
                        onClick={start}
                    >
                        <PlayArrowIcon className={classes.icon} color={'primary'} />
                    </IconButton>
                    <div className={classes.button}></div>
                </>
            ) : (
                    <>
                        <IconButton
                            aria-label="stop"
                            className={classes.button}
                            onClick={onStop}
                        >
                            <StopIcon className={classes.icon} color={'secondary'} />
                        </IconButton>
                        <IconButton
                            aria-label="lap"
                            className={classes.button}
                            onClick={onLap}
                        >
                            <FlagIcon style={{ fontSize: 40 }} />
                        </IconButton>
                    </>
                )}
        </div>
    )
}

export default Buttons