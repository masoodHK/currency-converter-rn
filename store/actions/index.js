import axios from 'axios';

export function retreiveData(url) {
    return (dispatch, getState) => {
        const { data } = getState();

        if(data.length === 0) {
            axios.get(url).then(data => dispatch({
                type: "ADD_DATA",
                data: data
            }))
        }
        else {
            
        }
    }
}