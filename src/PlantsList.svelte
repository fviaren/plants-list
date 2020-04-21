<script>
    import Plant from './Plant.svelte';
    import NewPlantForm from './NewPlantForm.svelte'
    export let plants;
    export let plantsChangedCallback;
    
    let inputPlantVisible = false;
    
    
    function openNewPlantForm() {
        inputPlantVisible = true;
    }
    function closeNewPlantForm() {
        inputPlantVisible = false;
    }
    function onSavePlant(plant) {
        plant['lastWaterDate'] = Date()
        plant['nextWaterDate'] = setNextWaterDate(Date(),plant.wateringFrequency)
        plants = [ ...plants, plant];
        closeNewPlantForm();
        plantsChangedCallback(plants);
    }

    function removePlant(id) {
        plants = plants.filter(item => item.id !== id);
        plantsChangedCallback(plants);
    }

    function setNextWaterDate(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function resetWaterDate(plant) {
        let newLastWaterDate = Date();
        let newNextWaterDate = setNextWaterDate(Date(),plant.wateringFrequency);
        let plantId = plant.id
        plants = plants.map(item => {
        	return item.id === plantId?{...item, lastWaterDate:newLastWaterDate, nextWaterDate: newNextWaterDate}:{...item}});
        plantId = null;
        newLastWaterDate = null;
        newNextWaterDate = null;
    }
</script>

<div>
    {#if inputPlantVisible}
        <NewPlantForm saveCallback={onSavePlant} cancelCallback={closeNewPlantForm}/>
    {:else}
        <center>
            <button on:click={openNewPlantForm}>Add plant</button>
        </center>
    {/if}
    <ul class="PlantsList">
        {#each plants as plant}
            <li>
                <Plant plant={plant}></Plant>
                <button on:click={removePlant(plant.id)}>Trash</button>
                <button on:click={resetWaterDate(plant)}>Reset</button>
            </li>
        {:else}
            <h3>No plants yet</h3>
        {/each}
    </ul>

    
</div>


<style>
.PlantsList {
    margin: 1em 0;
    padding: 0;
    list-style: none;
    width: 300px;
}
</style>