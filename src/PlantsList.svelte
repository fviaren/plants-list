<script>
    import Plant from './Plant.svelte';
    import PlantForm from './PlantForm.svelte'
    import moment from 'moment'
    import {afterUpdate} from 'svelte';
    export let plants;
    export let plantsChangedCallback;

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
            <ul class="PlantsList">
                {#each plants as plant}
                    <li class="PlantsList__item">
                        <Plant plant={plant}></Plant>
                        <button on:click={resetWaterDate(plant)}>Reset</button>
                        <button on:click={setModifiedPlant(plant.id)}>Edit</button>
                        <button on:click={removePlant(plant.id)}>Trash</button>
                        
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
    width: 300px;
}
.PlantsList__item {
    border: solid;
    border-color: grey;
    padding: 1em 0;
    box-shadow: 5px 5px #cccccc;
    margin: 1em 0;
}
</style>