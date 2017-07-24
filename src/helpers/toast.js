class Toast {

    static info(message, timeout = 4000) {
        var $toastContent = $('<div><span class="fa fa-info-circle"></span> ' + message + '</div>');
        Materialize.toast($toastContent, timeout);
    }

}

export default Toast;
