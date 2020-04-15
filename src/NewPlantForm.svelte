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

<section>
    <div>
        <input type="text" bind:value={name} placeholder="Input the name of the plant" />
        <input type="text" bind:value={wateringFrequency} placeholder="Input the watering frequency of your plant" />
        <input type="text" bind:value={wateringAmount} placeholder="Input the watering amount for your plant" />
        <button on:click={onSave}>Save Plant</button>
        <button on:click={cancelCallback}>Cancel</button>
    </div>
</section>