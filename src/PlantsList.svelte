<script>
    import Plant from './Plant.svelte';
    import PlantForm from './PlantForm.svelte'
    import moment from 'moment'
    import { afterUpdate, setContext } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import globalStore from './stores/globalStore';
    import plants, { plantsToday, plantsNames, removePlant, resetWaterDate } from './stores/plantsStore';

    function setModifiedPlant(id) {
        window.scrollTo(0, 0);
        let plant = $plants.find(item => item.id === id);
        globalStore.updateState('plantForm', true)
        globalStore.updateState('isEditing', true)
        globalStore.updateState('editedPlantId', id)
    }
    
    function resetWaterDatesToday(plants) {
        let today = moment();
        if($plantsToday.length === 0) {
            alert("You have no plants to water today.\nIf you are waterning plants anyway, please reset each one separately.")
        }
        else {
            const plantNames = plantsNames($plantsToday)
            if(confirm(`Are you sure?\nYou are about to reset the next watering date of:\n${plantNames}`)) {
                let plantToday;
                for (plantToday in $plantsToday) {
                    resetWaterDate(plantToday);
                }
                alert(`You just watered:\n${plantNames}`)
            }
        }
        
    }

</script>

<div>
    {#if $plants.length > 0}    
        <center>
            
            <button class="button-plant-action" on:click={resetWaterDatesToday($plants)} title="Watered plants today">
                <div class="button__block">
                    <div class="button__image">
                        <img src="/assets/watering-can.png" height="40" alt="watering can" />
                        <div class="plant-icon">
                            <i class="fas fa-seedling" />
                            <i class="fas fa-seedling" />
                            <i class="fas fa-seedling" />
                            <i class="fas fa-seedling" />
                        </div>
                    </div>
                    <div class="PlantsToday__list">
                        <ul class="PlantsToday__list">
                            {#each $plantsToday as plantToday}
                                <li >{plantToday.name}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
                
            </button>
            <ul class="PlantsList">
                {#each $plants as plant, index (plant.id)}
                    <div in:fly={{x: 200, delay: (index +1) * 300}} out:fly={{x: -200}} animate:flip>
                        <li class="PlantsList__item">
                            <Plant plant={plant}></Plant>
                            <div>
                                <button class="button-plant-action" on:click={resetWaterDate(plant)}><img src="/assets/watering-can.png" height="40" alt="watering can" title="Mark plant as watered"/></button>
                                <button class="button-plant-action" on:click={setModifiedPlant(plant.id)}><img src="/assets/pencil.png" height="40" alt="edit" title="Edit plant"/></button>
                                <button class="button-plant-action" on:click={removePlant(plant.id)}><img src="/assets/trash.png" height="40" alt="trash" title="Remove plant"/></button>
                            </div>
                        </li>
                    </div>
                {/each}
            </ul>
        </center>
    {:else}
        <h3>No plants yet</h3>
    {/if} 
</div>


<style>
.PlantsList {
    margin: 1em 0;
    padding: 0;
    list-style: none;
    width: 400px;
}
.PlantsList__item {
    border: solid;
    border-color: grey;
    padding: 1em 0;
    box-shadow: 5px 5px #cccccc;
    margin: 1em 0;
}
button.button-plant-action {
    background-color: transparent;
    border: none;
    cursor: pointer;
    vertical-align: middle;
    transition: transform .2s ease-in;
    
}
button.button-plant-action:hover {
    transform: scale3d(1.4, 1.4, 1);  
}
.plant-icon {
    color:green;
}
.PlantsToday__list {
    position: relative;
    display: inline-block;
}
ul.PlantsToday__list {
    list-style: none;
    font-size: 0.8em;
    text-align: left;
    position: relative;
    display: inline-block;
    vertical-align: middle;
}
.button__image {
    display: inline-block;
    position: relative;
    vertical-align: middle;
}

</style>