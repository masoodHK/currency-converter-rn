function isLoading() {
    return {
        type: "LOADING"
    };
};

function errorFound(error) {
    return {
        type: "ERROR",
        error
    };
};

export {
    isLoading,
    errorFound
}