import React from 'react'
import Buttons from '../Buttons'

export default { title: 'StopWatch|Components/Buttons' }

export const notRunning = () => <Buttons />
export const Running = () => <Buttons isRunning={true} />