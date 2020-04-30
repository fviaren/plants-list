<script>
    export let plant;
    import moment from 'moment';
    
    let nextWateringDate = moment(plant.nextWaterDate)
    let nextWatering = nextWateringDate.isSame(moment(), 'day')
        ?'today'
        :nextWateringDate.isSame(moment().subtract(1, 'days'), 'day')
        ?'yesterday'
        :nextWateringDate.fromNow()


</script>

<div class="Plant">
    <h2 class="Plant__name">{plant.name}</h2>
    <div class="Plant__info">
        <div>Water every:<br>{plant.wateringFrequency} days</div>
        <div>Water amount:<br>{plant.wateringAmount}</div>
    </div>
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

</style>