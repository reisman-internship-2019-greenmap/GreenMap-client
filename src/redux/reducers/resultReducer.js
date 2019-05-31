//TODO: barcodeMiss and wikiMiss should be one screen

const initialState = {
    didWikiMiss: 0,
    didBarcodeMiss: 0,
    statusCode: null,
    result: null,
}


const serverResponseReducer = (state=initialState.result, action) => {
    switch (action.type) {
        case "UPDATE_RESULT":
            console.log("Update result action was dispatched");
            obj = JSON.stringify(action.result)
            console.log(`setting result to ${obj}`);
            return action.result

        case "RESULT_ERROR":
            console.log("Result error was dispatched");
            return ({
                name: "No results to show",
                barcode: "nope"
            })
        
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

        case "RESULT_ERROR":
            return{...state, result: serverResponseReducer(state.result, action)}

        default:
            return state
    }
}

export default ResultReducer