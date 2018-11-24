import axios from 'axios';

export function retreiveData(url) {
    return (dispatch, getState) => {
        const { data } = getState();
        if(data.length !== 0) {
            axios.get(url)
                .then(response => {
                    return dispatch(addData(response));
                })
                .catch(error => dispatch(errorFound(error)))
        }
        else return;
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