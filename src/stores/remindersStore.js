import {writable} from 'svelte/store';
import store from '../../../razors/src/stores/globalStore';

const reminders = writable(() => {
    if( !getStorageReminders() ) {
        return {
            remindersOn: false,
            permission: 'no',
            lastNotificationDate: null,
        };
    }
    else {
        return getStorageReminders();
    };
});

const RemindersStore = {
    subscribe:  globalStore.subscribe,
    updateState: (item, value) => {
        reminders.update(storeValues => {
            return {...storeValues, [item]: value}
        })
    }
};



// local storage
function getStorageReminders() {
    return localStorage.getItem('reminders')?JSON.parse(localStorage.getItem('reminders')):false;
}
export function setStorageReminders(reminders){
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

export default reminders