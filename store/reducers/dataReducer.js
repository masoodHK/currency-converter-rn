export default (state = [], action) => {
    switch(action.type) {
        case "ADD_DATA":
            return {
                ...state,
                data: action.data
            }
        case "UPDATE_DATA":
            return {
                ...state,
                data: action.data
            }
        case "REMOVE_DATA":
            return {
                ...state,
                data: {}
            }
        default: return state
    }
}