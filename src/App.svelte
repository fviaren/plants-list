<script>
	import { onMount } from 'svelte';
	import moment from 'moment';
	import PlantsList from './PlantsList.svelte';
	
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
	<!-- <label class="switch">
		<input type="checkbox" bind:checked={remindersOn}/>
		<span class="slider round" />
	</label> -->
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

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>