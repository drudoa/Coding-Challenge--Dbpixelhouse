import React from 'react'
import thunk from 'redux-thunk'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import reducers from '../src/redux/reducers'

const composeEnhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(
    reducers,
    null,
    composeEnhancer,
)

export default function Provider({ children }) {
    return (
        <ReduxProvider store={store}>
            {children}
        </ReduxProvider>
    )
}