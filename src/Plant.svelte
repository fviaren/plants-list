<script>
    export let plant;
    import moment from 'moment';
    import { slide } from 'svelte/transition';
    
    $: nextWateringDate = moment(plant.nextWaterDate)
    $: nextWatering = nextWateringDate.isSame(moment(), 'day')
        ?'today'
        :nextWateringDate.isSame(moment().subtract(1, 'days'), 'day')
        ?'yesterday'
        :nextWateringDate.fromNow()

    let isDisplayPlantInfo = false;
    function togglePlantInfo() {
        isDisplayPlantInfo =!isDisplayPlantInfo;
    }

</script>

<div class="Plant">
    <div class="Plant__header">
        <h2 class="Plant__name">{plant.name}
            <button class="toggle-plant" on:click={togglePlantInfo}>
                {#if isDisplayPlantInfo}
                    <i class="fas fa-caret-up"/>
                {:else}
                    <i class="fas fa-caret-down"/>
                {/if}
            </button>
        </h2>
    </div>
    {#if isDisplayPlantInfo}
        <div transition:slide class="Plant__info">
            <div>Water every:<br>{plant.wateringFrequency} days</div>
            <div>Water amount:<br>{plant.wateringAmount}</div>
        </div>
    {/if}
    <div><strong>Water again: </strong>{nextWatering}</div>
    
</div>

<style>
.Plant {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1em;
}

.Plant__info {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 1em;
}

button.toggle-plant {
    border: none;
    background: transparent;
    align-self: right;
}

button.toggle-plant:hover {
    color:grey;
}
button.toggle-plant:before {
    transform: rotateX(180deg)
}
</style>