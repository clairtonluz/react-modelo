class Toast {

    static show(message, timeout = 4000) {
        var $toastContent = $('<div><span class="fa fa-show-circle"></span> ' + message + '</div>');
        Materialize.toast($toastContent, timeout);
    }

}

export default Toast;
