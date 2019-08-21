

//TODO: barcodeMiss and wikiMiss should be one screen

const initialState = {
    statusCode: null,
    result: "none recieved yet"
}


const serverResponseReducer = (state=initialState.result, action) => {
    switch (action.type) {
        case "UPDATE_RESULT":
            console.log("got a result")
            //returns the contents of "doc" from the server
            return action.result

        case "RESULT_ERROR":
            console.log("got a result error")
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
        case "UPDATE_RESULT":
            return{...state, result: serverResponseReducer(state.result, action)}

        case "RESULT_ERROR":
            return{...state, result: serverResponseReducer(state.result, action)}

        default:
            return state
    }
}

export default ResultReducer