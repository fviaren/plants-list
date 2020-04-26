<script>
    import { v4 as uuidv4 } from 'uuid';
    export let name = '';
    export let wateringFrequency = null;
    export let wateringAmount = '';
    export let saveCallback;
    export let cancelCallback;
    export let editPlant;
    export let isEditing;
    
    $: isEmpty = !name || !wateringFrequency || !wateringAmount

    //const items = ['Very little', 'Little', 'Medium', 'Medium-high', 'High'];
    function onSave() {        
        if(isEditing) {
            editPlant({name, wateringFrequency, wateringAmount})
        }
        else {
            let plant = {id:uuidv4() , name, wateringFrequency, wateringAmount};
            saveCallback(plant);
        }
    }

</script>

<form class="NewPlantForm" on:submit|preventDefault={onSave}>
    <h3>New Plant</h3>
    <div class="NewPlantForm__inputGroup">
        <label for="name">Plant name</label>
        <input id="name" type="text" required bind:value={name} placeholder="What is the name of your plant?" />
        <label for="wateringFrequency">Watering frequency</label>
        <input id="wateringFrequency" type="number" min=-2 required bind:value={wateringFrequency} placeholder="Every how many days do you water it?" />
        <label for="wateringAmount">Watering amount</label>
        <input id="wateringAmount" type="text" required bind:value={wateringAmount} placeholder="How much water?" />
    </div>
    
    <button type="submit" disabled={isEmpty}>
    {#if isEditing}Edit Plant
    {:else}Add Plant
    {/if}
    </button>
    <button on:click={cancelCallback}>Cancel</button>

</form>

<style>
.NewPlantForm {
    border: 1px solid grey;
    border-radius: 5px;
    margin: 1em;
    padding: 0 1em;
}

.NewPlantForm__inputGroup {
    
    display:flex;
    flex-direction: column;
}
</style>