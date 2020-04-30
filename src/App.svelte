<script>
	import { onMount } from 'svelte';
	import moment from 'moment';
	import PlantsList from './PlantsList.svelte'
	
	let remindersOn = Boolean(localStorage.getItem('remindersOn'));
	let plants = JSON.parse(localStorage.getItem('plants')) || [];
	
	onMount(async () => {
		const now = moment();
		const noon = moment().hour(23).minute(59).second(0);
		if (now >= noon) {
			notifyPlantsToWaterToday();
		} else {
			const tillNoonMS = noon.diff(now);
			setTimeout(notifyPlantsToWaterToday, tillNoonMS - tillNoonMS);
		}
		
	});

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

	function notifyPlantsToWaterToday() {
		const lastNotificationDate = localStorage.getItem("lastNotificationDate");
		if (lastNotificationDate && moment(lastNotificationDate).isSame(moment(), 'day')) {
			return;
		}

		const plantsToWaterToday = plants.filter(plant => {
			const nextWateringDate = moment(plant.nextWaterDate);
			return nextWateringDate.isSameOrBefore(moment(), 'day');
		});

		const plantsNames = plantsToWaterToday.map(plant => plant.name).join(', ');

		if (plantsToWaterToday.length > 0) {
			new Notification(`You have ${plantsNames} to water today! Don't forget to reset them once you are done ;)`);
			localStorage.setItem("lastNotificationDate", moment());
		}
	}
</script>

<main>
	<button on:click={toggleReminders}>{remindersOn ? 'ON' : 'OFF'}</button>
	<PlantsList plants={plants} plantsChangedCallback={onPlantsChanged} />
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