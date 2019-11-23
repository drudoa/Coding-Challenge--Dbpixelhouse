import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    progress: {

    },
    inner: {
        position: "absolute"
    },
    ring: {

    },
    ringCircle: {
        // transition: 'stroke - dashoffset 0.35s',
        transform: 'rotate(-90deg)',
        transformOrigin: '50% 50%'
    }
}))

const Progress = ({ className = {}, children, progress = 100, size = 200, thickness = 5, color = 'blue' }) => {
    const classes = useStyles()
    const radius = (size / 2) - (thickness * 2)
    const circumference = radius * 2 * Math.PI
    const percent = (isNaN(progress) ? 0 : progress)
    const offset = circumference - percent / 100 * circumference

    return (
        <div
            className={[classes.root, className].join(" ")}
            style={{
                width: size,
                height: size
            }}
        >
            <svg
                className={classes.ring}
                height={size}
                width={size}
            >
                <circle
                    className={classes.ringCircle}
                    shapeRendering='auto'
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    strokeWidth={thickness}
                    stroke={color}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className={classes.overlay}>
                {children}
            </div>
        </div>
    )
}

export default Progress