import axios from 'axios';

export function retreiveData(url) {
    return (dispatch, getState) => {
        const { data } = getState();
        axios.get(url)
            .then(response => {
                isLoading(false);
                return dispatch(addData(response));
            })
            .catch(error => dispatch(errorFound(error)))
    }
}

function addData(data) {
    return {
        type: "ADD_DATA",
        data,
    }
}

function errorFound(error) {
    return {
        type: "ERROR",
        error
    }
}

export function isLoading(boolean) {
    return {
        type: "LOADING",
        loading: boolean
    }
}