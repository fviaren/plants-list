<script>
    import Plant from './Plant.svelte';
    import NewPlantForm from './NewPlantForm.svelte'
    import moment from 'moment'
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
        setWateringDates(plant)
        plants = [ ...plants, plant];
        closeNewPlantForm();
        plantsChangedCallback(plants);
    }

    function removePlant(id) {
        plants = plants.filter(item => item.id !== id);
        plantsChangedCallback(plants);
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
        plantsChangedCallback(plants);
    }

    function setWateringDates(plant) {
        let newLastWaterDate = moment();
        let newNextWaterDate = moment(newLastWaterDate).add(plant.wateringFrequency, 'days');
        plant.lastWaterDate = newLastWaterDate;
        plant.nextWaterDate = newNextWaterDate;
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
    {#if plants.length > 0}    
        <ul class="PlantsList">
            {#each plants as plant}
                <li>
                    <Plant plant={plant}></Plant>
                    <button on:click={removePlant(plant.id)}>Trash</button>
                    <button on:click={resetWaterDate(plant)}>Reset</button>
                </li>
            {/each}
        </ul>
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
</style>