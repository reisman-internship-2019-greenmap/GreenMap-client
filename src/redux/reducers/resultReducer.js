//TODO: barcodeMiss and wikiMiss should be one screen

const initialState = {
    didWikiMiss: 0,
    didBarcodeMiss: 0,
    statusCode: null,
    result: {
        barcode: null,
        name: null,
        manufacturer: null,
        ESG: null,
    }
}

const statusCodeReducer = (state=initialState.statusCode, action) => {

}

const serverResponseReducer = (state=initialState.result, action) => {
    switch (action.type) {
        case "UPDATE_RESULT":
            console.log("Update result action was dispatched");
            return action.result
        
        default:
            return state
    }
}

const ResultReducer = (state=initialState, action) => {
    switch(action.type) {
        case "RENDER_WIKIMISS_SCREEN":
            return {...state, didWikiMiss: wikiReducer(state.didWikiMiss, action)}
        
        case "RENDER_BARCODEMISS_SCREEN":
            return{...state, didBarcodeMiss: barcodeReducer(state.didBarcodeMiss, action)}

        case "UPDATE_RESULT":
            return{...state, result: serverResponseReducer(state.result, action)}

        default:
            return state
    }
}

export default ResultReducer