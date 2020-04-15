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
        plants = [ ...plants, plant];
        closeNewPlantForm();
        plantsChangedCallback(plants);
    }
</script>

<div>
    <ul class="PlantsList">
        {#each plants as plant}
            <li>
                <Plant plant={plant}></Plant>
            </li>
        {:else}
            <h3>No plants yet</h3>
        {/each}
    </ul>
    {#if inputPlantVisible}
        <NewPlantForm saveCallback={onSavePlant} cancelCallback={closeNewPlantForm}/>
    {/if}
    <center>
        <button on:click={openNewPlantForm}>Add plant</button>
    </center>
</div>


<style>
.PlantsList {
    margin: 1em 0;
    padding: 0;
    list-style: none;
    width: 300px;
}
</style>