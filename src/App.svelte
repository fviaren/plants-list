<script>
	import { onMount, afterUpdate} from 'svelte';
	import moment from 'moment';
	// components
	import PlantsList from './PlantsList.svelte';
	import Navbar from './Navbar.svelte';
	import PlantForm from './PlantForm.svelte'
	// stores
	import globalStore from './stores/globalStore';
	import plants, { plantsToday, plantsNames, setStoragePlants } from './stores/plantsStore';
	import reminders, { setStorageReminders } from './stores/remindersStore';

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

	function notifyPlantsToWaterToday() {
		if ($reminders.lastNotificationDate && moment($reminders.lastNotificationDate).isSame(moment(), 'day')) {
			return;
		}
		const plantNames = plantsNames($plantsToday)
		if ($reminders.remindersOn && $plantsToday.length > 0) {
			new Notification(`You have ${plantNames} to water today! Don't forget to reset them once you are done ;)`);
			reminders.updateState('lastNotificationDate', moment());
			setStorageReminders($reminders);
		}
	}
	
	afterUpdate(() => {
        setStoragePlants($plants);
    })
</script>

<Navbar />
<main>
	{#if $globalStore.plantForm}
		<PlantForm/>
	{/if}
	<PlantsList plants={$plants} />
</main>
<footer>
	<div id='footer'>
		Icons made by <a href="https://www.flaticon.com/free-icon/watering-can_2432109?term=water%20can&page=3&position=23" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
	</div>
</footer>
<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1em;
		margin: 0 auto;
	}
	#footer {
		bottom: 0%;
		background-color: white;
		width: 100%;
	}

</style>