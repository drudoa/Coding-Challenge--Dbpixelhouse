import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Provider from './redux/provider'


ReactDOM.render(
    <Provider>
        <App />
    </Provider>
    , document.getElementById('root')
)

