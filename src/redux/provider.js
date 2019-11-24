import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { Provider as ReduxProvider } from 'react-redux'

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