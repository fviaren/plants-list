<script>
    let name;
    let wateringFrequency;
    let wateringAmount;
    export let saveCallback;
    export let cancelCallback;
    function onSave() {
        saveCallback({name, wateringFrequency, wateringAmount});
    }
</script>

<form class="NewPlantForm">
    <h3>New Plant</h3>
    <div class="NewPlantForm__inputGroup">
        <input type="text" bind:value={name} placeholder="Input the name of the plant" />
        <input type="text" bind:value={wateringFrequency} placeholder="Input the watering frequency of your plant" />
        <input type="text" bind:value={wateringAmount} placeholder="Input the watering amount for your plant" />
    </div>
    
    <button on:click={onSave}>Save Plant</button>
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