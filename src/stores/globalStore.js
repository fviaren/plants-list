import {writable} from 'svelte/store';

const globalStore = writable({
    plantForm: false,
    isEditing: false,
});

const store = {
    subscribe:  globalStore.subscribe,
    updateState: (state, value) => {
        globalStore.update(storeValues => {
            return {...storeValues, [state]: value}
        })
    }
};

// global functions

// local storage

export default store