export default (state = {}, action) => {
    switch(action.type) {
        case "ADD_DATA":
            return {
                ...state,
                data: [...state.data, action.data]
            }

        case "LOADING":
            return {
                ...state,
                loading: action.loading
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