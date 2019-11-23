import { combineReducers } from 'redux'
import lapsReducer from './lapsReducer'
import timerReducer from './timerReducer'

export default combineReducers({
    laps: lapsReducer,
    timer: timerReducer
})