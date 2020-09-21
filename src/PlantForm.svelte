<script>
    import { v4 as uuidv4 } from 'uuid';
    import globalStore from './stores/globalStore';
    import plants, {editPlant, addPlant} from './stores/plantsStore';
    const id = $globalStore.editedPlantId;
    let plant = $globalStore.isEditing?$plants.find(item => item.id === id):false;
    export let name = plant?plant.name:'';
    export let wateringFrequency = plant?plant.wateringFrequency:'';
    export let wateringAmount = plant?plant.wateringAmount:'';
    

    $: isEmpty = !name || !wateringFrequency || !wateringAmount

    let optionsAmount = [
        {text: 'Very little'}, 
        {text: 'Little'},
        {text: 'Medium'},
        {text: 'Medium-high'}, 
        {text: 'High'}
        ];
    function onSave() {        
        if($globalStore.isEditing) {
            editPlant({id, name, wateringFrequency, wateringAmount});
            globalStore.updateState('isEditing', false);
            globalStore.updateState('editedPlantId', false)
        }
        else {
            let plant = {id:uuidv4() , name, wateringFrequency, wateringAmount};
            addPlant(plant);
        }
        closePlantForm();
        
    }
    function closePlantForm() {
        globalStore.updateState('plantForm', false)
        globalStore.updateState('editedPlantId', false)
    }

</script>

<form class="NewPlantForm" on:submit|preventDefault={onSave}>
    <h3>
    {#if $globalStore.isEditing}Edit Plant
    {:else}New Plant
    {/if}
    </h3>
    <div class="NewPlantForm__inputGroup">
        <label for="name">Plant name</label>
        <input id="name" type="text" required bind:value={name} placeholder="What is the name of your plant?" />
        <label for="wateringFrequency">Watering frequency</label>
        <input id="wateringFrequency" type="number" min=-2 required bind:value={wateringFrequency} placeholder="Every how many days do you water it?" />
        <label for="wateringAmount">Watering amount</label>
        <select id="wateringAmount" required bind:value={wateringAmount}>
            <option value="" disabled>-- Select watering amount --</option>
            {#each optionsAmount as option}
                <option value={option.text}>{option.text}</option>
            {/each}
        </select>
    </div>
    
    <button type="submit" disabled={isEmpty}>
    {#if $globalStore.isEditing}Edit Plant
    {:else}Add Plant
    {/if}
    </button>
    <button on:click={()=>{closePlantForm()}}>Cancel</button>

</form>

<style>
.NewPlantForm {
    border: 1px solid grey;
    border-radius: 5px;
    margin: 1em;
    padding: 0 1em;
    box-shadow: 5px 5px #009900;
}

.NewPlantForm__inputGroup {
    
    display:flex;
    flex-direction: column;
}
</style>