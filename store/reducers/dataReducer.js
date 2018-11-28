const initialState = {
    loading: true,
    data: {},
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "ADD_DATA":
            return {
                ...state,
                data: action.data,
                loading: false,
                error: null
            }

        case "ERROR":
            return {
                ...state,
                error: action.error,
                loading: false,
                data: {}
            }
        
        case "LOADING":
            return {
                ...state,
                loading: true,
            }
        default: return state
    }
}