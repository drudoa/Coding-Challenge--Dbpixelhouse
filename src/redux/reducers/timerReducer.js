const initState = {
    isRunning: false
}

export default function (state = initState, { type }) {
    switch (type) {
        case 'START':
            return {
                ...state,
                isRunning: true
            }
        case 'STOP':
            return {
                ...state,
                isRunning: false,
            }
        case 'RESET':
            return initState
        default:
            return state
    }
}