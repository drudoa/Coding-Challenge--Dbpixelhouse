import React from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        // justifyContent: 'center'
    },
    text: {
        // width: 45,
        textAlign: 'center'
    }
}))

// add a leading zero to numbers
const pad = (value) => {
    if (value < 10)
        return '0' + value.toString()
    else
        return value
}

/*

*/
const TimerDisplay = ({ fontSize = 36, epochTime = 0, className = {} }) => {
    const timer = moment(epochTime)
    const classes = useStyles()
    const width = Math.floor(fontSize * 1.2)

    return (
        <Typography className={[classes.root, className].join(" ")} style={{ fontSize: fontSize }} component={"div"}>
            <span className={classes.text} style={{ width: width }}>
                {pad(timer.minute())}
            </span>:
            <span className={classes.text} style={{ width: width }}>
                {pad(timer.second())}
            </span>.
            <span className={classes.text} style={{ width: width }}>
                {pad(Math.floor(timer.millisecond() / 10))}
            </span>
        </Typography>
    )
}

export default TimerDisplay