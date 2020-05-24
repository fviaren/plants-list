import {writable} from 'svelte/store';
import store from '../../../razors/src/stores/globalStore';

const reminders = writable(getStorageReminders())

const remindersStore = {
    subscribe:  reminders.subscribe,
    updateState: (item, value) => {
        reminders.update(storeValues => {
            return {...storeValues, [item]: value}
        })
    }
};



// local storage
function getStorageReminders() {
    return localStorage.getItem('reminders')?JSON.parse(localStorage.getItem('reminders')):{
        remindersOn: false,
        permission: false,
        lastNotificationDate: false,
    };
}
export function setStorageReminders(reminders){
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

export default remindersStore