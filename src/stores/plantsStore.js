import {writable, derived} from 'svelte/store';
import moment from 'moment'

//plants
const plants = writable(getStoragePlants());

//plants today -> derived store
export const plantsToday = derived(plants, $plants => {
    let today = moment();
    let plantsToWaterToday = $plants.filter(item => moment(item.nextWaterDate).isSameOrBefore(today, 'day'))
    return plantsToWaterToday
})
// local functions
const getWateringDates = plant => {
    let newLastWaterDate = moment();
    let newNextWaterDate = moment(newLastWaterDate).add(plant.wateringFrequency, 'days');
    return { newLastWaterDate, newNextWaterDate }
}

const getNextWaterDate = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
} // can't find it used anywhere

const remove = (id, storeValue) => {
    return storeValue.filter(item => item.id !== id);
}

// global functions
export const addPlant = plant => {
    plants.update(storeValue => {
        const {id, name, wateringFrequency, wateringAmount} = plant;
        const { newLastWaterDate: lastWaterDate, newNextWaterDate: nextWaterDate } = getWateringDates(plant); 
        let newPlant = {id, name, wateringFrequency, wateringAmount, lastWaterDate, nextWaterDate};
        return [...storeValue, newPlant];
    })
}

export const editPlant = ({id, name, wateringFrequency, wateringAmount}) => {
    plants.update(storeValue => {
        let plants;
        plants = storeValue.map(item => {
            return item.id === id?{...item, name, wateringFrequency, wateringAmount}:{...item}
        });
        return [...plants]
    })
}

export const removePlant = id => {
    plants.update(storeValue => {
        return remove(id, storeValue);
    });
};

export const resetWaterDate = plant => {
    plants.update(storeValue => {
        return storeValue.map(item => {
            if(item.id === plant.id) {
                const { newLastWaterDate: lastWaterDate, newNextWaterDate: nextWaterDate } = getWateringDates(item); 
                item = { ...item, lastWaterDate, nextWaterDate };

            }
            return item;
        });
    });
}

export const plantsNames = plants => {
    return plants.map(plant => plant.name).join(', ');
}
// local storage
function getStoragePlants() {
    return localStorage.getItem('plants')?JSON.parse(localStorage.getItem('plants')):[];
}
export function setStoragePlants(plants){
    localStorage.setItem('plants', JSON.stringify(plants));
}


export default plants;