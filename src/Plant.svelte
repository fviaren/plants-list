<script>
    export let plant;
</script>

<div class="Plant">
    <h2 class="Plant__name">{plant.name}</h2>
    <div class="Plant__info">
        <div>Water every {plant.wateringFrequency} days</div>
        <div>Water amount: {plant.wateringAmount}</div>
    </div>
    <div><strong>Watering date: </strong>{plant.nextWaterDate}</div>
    
</div>

<style>
.Plant {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em 0;
}

.Plant__info {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

</style>