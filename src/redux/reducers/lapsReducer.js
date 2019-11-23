const initState = []

export default function (state = initState, { type, payload }) {
    switch (type) {
        case 'ADD_LAP':
            return [
                ...state,
                payload
            ]
        case 'RESET':
            return initState
        default:
            return state
    }
}