<script>
	import PlantsList from './PlantsList.svelte'
	
	let remindersOn = Boolean(localStorage.getItem('remindersOn'));
	let plants = JSON.parse(localStorage.getItem('plants')) || [];
	
	function onPlantsChanged(newPlantsList) {
		plants = newPlantsList;
		localStorage.setItem('plants', JSON.stringify(plants));
	}

	async function toggleReminders() {
		if (remindersOn) {
			remindersOn = false;
		} else {
			const permission = await Notification.requestPermission();
			
			if (permission === 'granted') {
				remindersOn = true;
			}
		}

		localStorage.setItem('remindersOn', remindersOn);
	};
</script>

<main>
	<button on:click={toggleReminders}>{remindersOn ? 'ON' : 'OFF'}</button>
	<PlantsList plants={plants} plantsChangedCallback={onPlantsChanged}></PlantsList>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
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