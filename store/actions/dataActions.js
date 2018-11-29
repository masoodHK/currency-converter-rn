import { isLoading, errorFound } from './commonActions'

export default function retreiveData(url) {
    return (dispatch, getState) => {
        const { data } = getState();
        dispatch(isLoading());
        if(data === undefined) {
            fetch(url)
                .then(response => {
                    if(!response.ok) {
                        throw Error(response.statusText);
                    }

                    return response;

                }).then(res => res.json()).then(data => {
                    setTimeout(() => {
                        dispatch(addData(data));
                    }, 3500);
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
    };
};