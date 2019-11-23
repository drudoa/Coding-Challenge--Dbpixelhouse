import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Divider } from '@material-ui/core'
import TimerDisplay from './TimerDisplay'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    list: {
        listStyle: 'none',
        padding: 0,
        width: '100%'
    },
    listEl: {
        display: 'flex',
        fontSize: 18,
        justifyContent: 'space-between'
    }
}))

/*
    Returns list of formated lap times in descending order,
    fasted and slowest times are highlighted
*/
const Laps = ({ laps }) => {
    const classes = useStyles()

    // only iterate list and apply conditional style if ther is more than one lap time
    if (laps.length > 1) {
        // find fastest and slowest lap times
        const times = laps.map(lap => (lap.time))
        const min = Math.min(...times)
        const max = Math.max(...times)

        return laps.slice(0).reverse().map((lap) => (
            < li key={lap.num} className={classes.listEl} style={(max === lap.time) ? { color: 'red' } : ((min === lap.time) ? { color: 'green' } : {})}>
                <span>#{lap.num}</span>
                <TimerDisplay fontSize={18} epochTime={lap.time} />
            </li >
        )
        )
    } else {
        return (
            <li key={laps.num} className={classes.listEl}>
                <span>#{laps[0].num}</span>
                <TimerDisplay fontSize={18} epochTime={laps[0].time} />
            </li>
        )
    }
}

/*
    expected laps format:
    [
        {num, time}
    ]
*/
const LapsTable = ({ laps = [], className = {} }) => {
    const classes = useStyles()

    return (
        <div className={[classes.root, className].join(" ")} >
            <Typography component="ul" className={classes.list}>
                {laps.length > 0 && (
                    <Laps laps={laps} />
                )}
            </Typography>
        </div>
    )
}

export default LapsTable