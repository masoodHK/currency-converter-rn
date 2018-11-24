const initialState = {
    loading: true,
    data: [],
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "ADD_DATA":
            return {
                ...state,
                data: [...state.data, action.data],
                loading: false
            }

        case "ERROR":
            return {
                ...state,
                error: action.error,
                loading: false
            }
        
        case "FILTERED_DATA":
            return {
                ...state,
                data: action.data,
            }
        default: return state
    }
}