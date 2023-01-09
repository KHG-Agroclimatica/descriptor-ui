import Notify from 'devextreme/ui/notify';

const NotifyWarning = (message: string = 'Error when saving') => {
    Notify({
        message,
        // height: 45,
        width: 'auto',
        // minWidth: 150,
        type: 'error',
        displayTime: 3500,
        animation: {
          show: {
            type: 'fade', duration: 400, from: 0, to: 1,
          },
          hide: { type: 'fade', duration: 40, to: 0 },
        },
      }, {
        direction: 'up-push',
        position: 'top right'
      });
}

export default NotifyWarning