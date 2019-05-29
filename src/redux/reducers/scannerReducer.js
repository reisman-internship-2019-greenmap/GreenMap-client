const initialState = {
    onScanCalls: 0
}

const callTracker = (state=initialState.onScanCalls, action) => {
    switch(action.type) {
        case "UPDATE_CALL_TRACKER":
            return state + 1

        default:
            return state
    }
}

const ScannerReducer = (state=initialState, action) => {
    switch(action.type) {
        case "UPDATE_CALL_TRACKER":
            return {...state, onScanCalls: callTracker(state.onScanCalls, action)}

        default:
            return state
    }

}

export default ScannerReducer