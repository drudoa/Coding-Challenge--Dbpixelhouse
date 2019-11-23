import React from 'react'
import TimerDisplay from '../TimerDisplay'

export default { title: 'StopWatch|Components/Timer' }

export const Static = () => <TimerDisplay epochTime={new Date().getTime()} />
export const running = () => <TimerDisplay />