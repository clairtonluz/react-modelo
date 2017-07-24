class HttpError extends Error {
    constructor(response) {
        super(response.statusText, response.status);
        this.response = response.clone();
    }
}

export default HttpError;
