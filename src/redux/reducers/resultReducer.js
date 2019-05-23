const initialState = {
    didWikiMiss: 0,
    didBarcodeMiss: 0,
}

const wikiReducer = (state=initialState.didWikiMiss, action) => {
    switch (action.type) {
        case ("RENDER_WIKIMISS_SCREEN"):
            return 1

        default:
            return state
    }
}

const barcodeReducer = (state=initialState.didBarcodeMiss, action) => {
    switch (action.type) {
        case "RENDER_BARCODEMISS_SCREEN":
            return 1
        
        default:
            return state
    }
}

const ResultReducer = (state=initialState, action) => {
    switch(action.type) {
        case "RENDER_WIKIMISS_SCREEN":
            return {...state, didWikiMiss: wikiReducer(state.didWikiMiss, action)}
        
        case "RENDER_BARCODEMISSSCREEN":
            return{...state, didBarcodeMiss: barcodeReducer(state.didBarcodeMiss, action)}

        default:
            return state
    }
}

export default ResultReducer