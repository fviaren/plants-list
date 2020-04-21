<script>
	import PlantsList from './PlantsList.svelte'
	
	let plants = JSON.parse(localStorage.getItem('plants')) || [];

	function onPlantsChanged(newPlantsList) {
		plants = newPlantsList;
		localStorage.setItem('plants', JSON.stringify(plants));
	}

</script>

<main>
	<PlantsList plants={plants} plantsChangedCallback={onPlantsChanged}></PlantsList>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>