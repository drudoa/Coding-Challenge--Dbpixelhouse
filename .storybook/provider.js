import React from 'react'
import thunk from 'redux-thunk'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import reducers from '../src/redux/reducers'
import testData from './testData'

const composeEnhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(
    reducers,
    testData,
    composeEnhancer,
)

export default function Provider({ story }) {
    return (
        <ReduxProvider store={store}>
            {story}
        </ReduxProvider>
    )
}