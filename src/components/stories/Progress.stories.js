import React from 'react'
import { storiesOf } from '@storybook/react'
import Progress from '../Progress'
import TimerDisplay from '../TimerDisplay'

const date = Date.now()

storiesOf('StopWatch|Components/Progress', module)
    .add('default', () => (
        <Progress progress={50} >
            <TimerDisplay epochTime={date} />
        </Progress>
    ))