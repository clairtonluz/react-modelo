import firebase from 'firebase';
import Toast from '../helpers/toast'

export default {
    checkSubscribe: checkSubscribe,
    subscribeUser: subscribeUser,
    requestPermission: requestPermission
}

function requestPermission() {
    const messaging = firebase.messaging();
    messaging.requestPermission()
        .then(function () {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
        })
        .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
            Toast.show('As notificações estão desabilitadas');
        });
}

function checkSubscribe(registration) {
    console.log('[push notification]', 'Init.');
    if ('PushManager' in window) {
        console.log('[push notification]', 'has push.');
        registration.pushManager.getSubscription()
            .then(function (subscription) {
                const isSubscribed = !(subscription === null);

                if (isSubscribed) {
                    console.log('[push notification]', 'User IS subscribed.');
                } else {
                    console.log('[push notification]', 'User is NOT subscribed.');
                }
            });
    }
}

function subscribeUser(registration) {
    if ('PushManager' in window) {
        const applicationServerKey = 'applicationServerPublicKey';
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(function (subscription) {
                console.log('[push notification]', 'User is subscribed:', subscription);
            })
            .catch(function (err) {
                console.log('[push notification]', 'Failed to subscribe the user: ', err);
            });
    }
}