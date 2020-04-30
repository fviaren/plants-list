<script>
    import Plant from './Plant.svelte';
    import PlantForm from './PlantForm.svelte'
    import moment from 'moment'
    import {afterUpdate} from 'svelte';
    export let plants;
    export let plantsChangedCallback;
    export let getPlantsToWaterToday;

    let inputPlantVisible = false;
    // set editing variables
	let setPlantName = '';
    let setWateringFrequency = null;
    let setWateringAmount = '';
    let setId = '';
    $: isEditing = setId?true:false;

    // functions
    function openPlantForm() {
        inputPlantVisible = true;
        window.scrollTo(0, 0)
    }

    function closePlantForm() {
        inputPlantVisible = false;
        setPlantName = '';
        setWateringFrequency = null;
        setWateringAmount = '';
        setId = '';
    }

    function onSavePlant(plant) {
        setWateringDates(plant)
        plants = [ ...plants, plant];

    }

    function removePlant(id) {
        plants = plants.filter(item => item.id !== id);
    }

    function getNextWaterDate(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function resetWaterDate(plant) {
        plants = plants.map(item => {
            if(item.id === plant.id) {
                setWateringDates(item)
            }
            return item
        });
    }

    function setWateringDates(plant) {
        let newLastWaterDate = moment();
        let newNextWaterDate = moment(newLastWaterDate).add(plant.wateringFrequency, 'days');
        plant.lastWaterDate = newLastWaterDate;
        plant.nextWaterDate = newNextWaterDate;
    }

    function setModifiedPlant(id) {
        let plant = plants.find(item => item.id === id);
        setId = plant.id;
        setPlantName = plant.name;
        setWateringFrequency = plant.wateringFrequency;
        setWateringAmount = plant.wateringAmount;
        openPlantForm();
    }
    
	function editPlant({name, wateringFrequency, wateringAmount}) {
        plants = plants.map(item => {
            return item.id === setId?{...item, name:name, wateringFrequency:wateringFrequency, wateringAmount:wateringAmount}:{...item}
		});
    }
    function resetWaterDatesToday(plants) {
        let today = moment();
        let plantsToWaterToday = plants.filter(item => moment(item.nextWaterDate).isSameOrBefore(today, 'day'));
        if(plantsToWaterToday.length === 0) {
            alert("You have no plants to water today.\nIf you are waterning plants anyway, please reset each one separately.")
        }
        else {
            const plantsNames = plantsToWaterToday.map(plant => plant.name).join(', ');
            if(confirm(`Are you sure?\nYou are about to reset the next watering date of:\n${plantsNames}`)) {
                resetWaterDate(plantsToWaterToday);
            }
        }
        
    }

    afterUpdate(()=>{
        plantsChangedCallback(plants);
    })

</script>

<div>
    {#if inputPlantVisible}
        <PlantForm name={setPlantName} wateringFrequency={setWateringFrequency} wateringAmount={setWateringAmount} {isEditing} {editPlant} saveCallback={onSavePlant} cancelCallback={closePlantForm} {closePlantForm}/>
    {:else}
        <center>
            <button on:click={openPlantForm}>Add plant</button>
        </center>
    {/if}
    {#if plants.length > 0}    
        <center>
            <button on:click={resetWaterDatesToday(plants)}>Watered all plants</button>
            <ul class="PlantsList">
                {#each plants as plant}
                    <li class="PlantsList__item">
                        <Plant plant={plant}></Plant>
                        <button class="button-plant-action" on:click={resetWaterDate(plant)}><img src="/assets/watering-can.png" height="40" alt="watering can" title="Mark plant as watered"/></button>
                        <button class="button-plant-action" on:click={setModifiedPlant(plant.id)}><img src="/assets/pencil.png" height="40" alt="edit" title="Edit plant"/></button>
                        <button class="button-plant-action" on:click={removePlant(plant.id)}><img src="/assets/trash.png" height="40" alt="trash" title="Remove plant"/></button>
                        
                    </li>
                {/each}
            </ul>
        </center>
    {:else}
        <h3>No plants yet</h3>
    {/if} 
</div>


<style>
.PlantsList {
    margin: 1em 0;
    padding: 0;
    list-style: none;
    width: 400px;
}
.PlantsList__item {
    border: solid;
    border-color: grey;
    padding: 1em 0;
    box-shadow: 5px 5px #cccccc;
    margin: 1em 0;
}
.button-plant-action {
    background-color: transparent;
    border: none;
    cursor: pointer;
    vertical-align: middle;
    transition: transform .2s ease-in;
}
.button-plant-action:hover :hover {
          transform: scale3d(1.4, 1.4, 1);  
        }
</style>