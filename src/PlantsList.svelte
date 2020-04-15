<script>
    import Plant from './Plant.svelte';
    import NewPlantForm from './NewPlantForm.svelte'
    export let plants;
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
    }

</script>

<main>
    <ul>
        {#each plants as plant}
            <li>
                <Plant plant={plant}></Plant>
            </li>
        {/each}
    </ul>
    {#if inputPlantVisible}
    <NewPlantForm saveCallback={onSavePlant} cancelCallback={closeNewPlantForm}/>
    {/if}
    <button on:click={openNewPlantForm}>Add plant</button>
</main>


<style>
</style>