<script>
    export let name = '';
    export let wateringFrequency = null;
    export let wateringAmount = '';
    export let saveCallback;
    export let cancelCallback;
//NEW//
    

    $: isEmpty = !name || !wateringFrequency || !wateringAmount

//NEW//

    const digitsRegex = /^[1-9]+$/;
    //const items = ['Very little', 'Little', 'Medium', 'Medium-high', 'High'];
    function onSave() {        
        let plant = {id:Math.round(Math.random()* Date.now()), name, wateringFrequency, wateringAmount};
        saveCallback(plant);
    }
        // saveCallback({name, wateringFrequency, wateringAmount});
    
    function updateValidData() {
        const nameIsValid = name && name.length;
        const frequencyIsValid = wateringFrequency && digitsRegex.test(wateringFrequency);
        const amountIsValid = wateringAmount && digitsRegex.test(wateringAmount);

        validData = nameIsValid && frequencyIsValid && amountIsValid;
    }

    let validData = false;
</script>

<form class="NewPlantForm" on:submit|preventDefault={onSave}>
    <h3>New Plant</h3>
    <div class="NewPlantForm__inputGroup">
        <label for="name">Plant name</label>
        <input id="name" type="text" on:change={updateValidData} bind:value={name} placeholder="What is the name of your plant?" />
        <label for="wateringFrequency">Watering frequency</label>
        <input id="wateringFrequency" type="number" on:change={updateValidData} bind:value={wateringFrequency} placeholder="Every how many days do you water it?" />
        <label for="wateringAmount">Watering amount</label>
        <input id="wateringAmount" type="text" on:change={updateValidData} bind:value={wateringAmount} placeholder="How much water?" />
    </div>
    
    <button type="submit" disabled={isEmpty}>Save Plant</button>
    <!-- <button on:click={onSave} disabled={!validData}>Save Plant</button> -->
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