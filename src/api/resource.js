import HttpError from "./http-error";
import Toast from '../helpers/toast';
import config from 'config';

class Resource {

    fetch(url, requestConfig) {
        let fullUrl = config.apiRoot + url;
        return this.fetchExternal(fullUrl, requestConfig);
    }

    fetchExternal(url, requestConfig) {
        let that = this;
        return fetch(url, requestConfig).then((response) => {
            if (that.isJson(response)) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new HttpError(response);
                }
            } else {
                throw new Error("Oops, a resposta do servidor não veio como experado!");
            }
        }).catch(this.onError);
    }

    onError(error) {
        if (error.response) {
            error.response.json().then((responseError) => {
                let message;
                if (responseError.message) {
                    message = responseError.message;
                } else {
                    message = 'Ocorreu uma falha:' + JSON.stringify(responseError);
                }

                Toast.info(message);
            });
        } else {
            Toast.info('Ocorreu um problema inesperado: ' + error.message);
        }
        throw error;
    }

    isJson(response) {
        let contentType = response.headers.get("content-type");
        return contentType && contentType.indexOf("application/json") !== -1;
    }
}

export default Resource;
