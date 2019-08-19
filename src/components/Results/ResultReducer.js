//TODO: barcodeMiss and wikiMiss should be one screen

const initialState = {
    statusCode: null,
    result: null
}


const serverResponseReducer = (state=initialState.result, action) => {
    switch (action.type) {
        case "UPDATE_RESULT":
            //returns the contents of "doc" from the server
            return action.result

        case "RESULT_ERROR":
            // returns a string indicating to the Results component
            // that there was an error
            return ({
                name: "undefined",
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