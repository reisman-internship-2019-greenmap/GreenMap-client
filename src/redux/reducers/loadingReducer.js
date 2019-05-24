const initialState = {
    fontsAreLoaded: false
}

const fontsReducer = (state=initialState.fontsAreLoaded, action) => {
    switch(action.type) {
        case "FONTS_HAVE_LOADED":
            return true

        default:
            return state
    }
}

const loadingReducer = (state, action) => {
    switch(action.type) {
        case "FONTS_HAVE_LOADED":
            return{...state, fontsAreLoaded: fontsReducer(state.fontsAreLoaded, action)}
        
        default:
            return state
    }
}