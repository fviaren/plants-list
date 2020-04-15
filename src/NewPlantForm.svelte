<script>
    export let name = '';
    export let wateringFrequency = '';
    export let wateringAmount = '';
    export let saveCallback;
    export let cancelCallback;
    const digitsRegex = /^[0-9]+$/;
    function onSave() {
        saveCallback({name, wateringFrequency, wateringAmount});
    }

    function updateValidData() {
        const nameIsValid = name && name.length;
        const frequencyIsValid = wateringFrequency && digitsRegex.test(wateringFrequency);
        const amountIsValid = wateringAmount && digitsRegex.test(wateringAmount);

        validData = nameIsValid && frequencyIsValid && amountIsValid;
    }

    let validData = false;
</script>

<form class="NewPlantForm">
    <h3>New Plant</h3>
    <div class="NewPlantForm__inputGroup">
        <input type="text" on:change={updateValidData} bind:value={name} placeholder="Input the name of the plant" />
        <input type="text" on:change={updateValidData} bind:value={wateringFrequency} placeholder="Input the watering frequency of your plant" />
        <input type="text" on:change={updateValidData} bind:value={wateringAmount} placeholder="Input the watering amount for your plant" />
    </div>
    
    <button on:click={onSave} disabled={!validData}>Save Plant</button>
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