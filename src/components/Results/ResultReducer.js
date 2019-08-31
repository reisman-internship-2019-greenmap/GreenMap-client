


//TODO: barcodeMiss and wikiMiss should be one screen

const initialState = {
    statusCode: null,
    result: "none recieved yet"
}

const hardCodedResult = {
    doc: {
        name: "Dell G7 Gaming Laptop 15 inch",
        esg: 1.75,
        topThree: [
            {
              id: "randomstring1",
              product: "Toshiba AbC 123",
              avTitle: "Ts",
              manufacturer: "Toshiba",
              esg: 9.87
            },
            {
              id: "randomstring2",
              product: "Acer D45 Pro",
              avTitle: "Ac",
              manufacturer: "Acer",
              esg: 6.54
            },
            {
              id: "randomstring3",
              product: "Macbook",
              avTitle: "Ap",
              manufacturer: "Apple",
              esg: 3.21
            },
            {
                id: "randomstring4",
                product: "Toshiba AbC 123",
                avTitle: "Ts",
                manufacturer: "Toshiba",
                esg: 9.87
              },
              {
                id: "randomstring5",
                product: "Acer D45 Pro",
                avTitle: "Ac",
                manufacturer: "Acer",
                esg: 6.54
            }
        ]
    }
}


const serverResponseReducer = (state=initialState.result, action) => {
    switch (action.type) {
        case "UPDATE_RESULT":
            console.log("got a result")
            console.log(`and that result is ${action.result}`)
            //returns the contents of "doc" from the server
            return action.result

        case "RESULT_ERROR":
            console.log(action.payload.message)
            console.log(typeof action.payload.message)
            return action.payload.message

        case "HARDCODE_SUCCESS":
            return hardCodedResult
        
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