const initialState = {
    barcodeData: "12345",
    loadingResults: 0
}

const barcodeReducer = (state=initialState.barcodeData, action) => {
    switch(action.type) {
        case "UPDATE_BARCODE_DATA":
            return("Recieved update barcodeData")

        default:
            return state
    }
}

const loadingReducer = (state=initialState.loadingResults, action) => {
    switch(action.type) {
        case "LOADING_RESULTS":
            return 1
        default: 
            return state
    }
}

const ScannerReducer = (state=initialState, action) => {
    switch(action.type) {
        case "UPDATE_BARCODE_DATA":
            return {...state, barcodeData: barcodeReducer(state.barcodeData, action)}
        
        case "LOADING_RESULTS":
            return {...state, loadingResults: loadingReducer(state.loadingResults, action)}

        default:
            return state
    }

}

export default ScannerReducer