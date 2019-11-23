import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import Provider from './provider'

addDecorator(story => <Provider story={story()} />)
configure(require.context('../src/components/stories', true, /\.stories\.js$/), module)