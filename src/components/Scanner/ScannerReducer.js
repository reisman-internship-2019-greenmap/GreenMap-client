//anything related to the scanner goes here
const initialState = {
    onScanCalls: 0,
    barcodeData: null,
    permissions: null,
}

//keeps track of currently read barcode data
const barcodeDataTracker = (state=initialState.barcodeData, action) => {
    switch(action.type) {
        case "UPDATE_BARCODE_DATA":
            return action.data
        
            default:
            return state
    }
}

//call tracker for validation process
const callTracker = (state=initialState.onScanCalls, action) => {
    switch(action.type) {
        case "UPDATE_CALL_TRACKER":
            return state + 1

        case "RESET_CALL_TRACKER":
            return 0

        default:
            return state
    }
}

//keeps track of permission statuses
const permissionsTracker = (state=initialState.permissions, action) => {
    switch(action.type) {
        case "UPDATE_CAMERA_PERMISSIONS":
            return action.status
        
        default:
            return state
    }
}

//combines all above reducers
const ScannerReducer = (state=initialState, action) => {
    switch(action.type) {
        case "UPDATE_CALL_TRACKER":
            return {...state, onScanCalls: callTracker(state.onScanCalls, action)}

        case "RESET_CALL_TRACKER":
            return {...state, onScanCalls: callTracker(state.onScanCalls, action)}

        case "UPDATE_BARCODE_DATA":
            return {...state, barcodeData: barcodeDataTracker(state.barcodeData, action)}

        case "UPDATE_CAMERA_PERMISSIONS":
            return {...state, permissions: permissionsTracker(state.permissions, action)}

        default:
            return state
    }

}

export default ScannerReducer