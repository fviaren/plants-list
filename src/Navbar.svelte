<script>
    import { getContext } from 'svelte';
    import globalStore from './stores/globalStore';
    import reminders, { setStorageReminders } from './stores/remindersStore';
    
    let screenWidth;
    
    async function updateReminders() {
		if($reminders.permission !== 'granted') {
			console.log($reminders.permission !== 'granted')
			const permission = await Notification.requestPermission();
			if (permission === 'granted') {
				reminders.updateState('permission', 'granted')
				}
			}
		if($reminders.remindersOn == true) {
			reminders.updateState('remindersOn', false)
		}
		else{
			reminders.updateState('remindersOn', true)
		}
		setStorageReminders($reminders)
	};

</script>
<svelte:window bind:innerWidth={screenWidth} />
<nav class="nav">
	<div class="nav-center">
        <div class="reminders">
            <h4>Reminders:</h4>
            <label class="switch">
                <input type="checkbox" bind:checked={$reminders.remindersOn} on:click={()=>{updateReminders()}}/>
                <span class="slider round" />
            </label>
        </div>
        {#if screenWidth > 400}
		<h1 class="nav-title">My plants</h1>
        {/if}
		<button type="button" class="nav-btn" title='Add plant' on:click={()=>{globalStore.updateState('plantForm', true)}}>
			<i class="fas fa-plus-square"/>
			<i class="fas fa-seedling" />
		</button>
	</div>

</nav>

<style>
    .nav {
        background: #99cc00;
        height: 5rem;
        display: flex;
        align-items: center;
        box-shadow: 2px 5px 3px 0px rgba(0, 0, 0, 0.5);
    }

    .nav-center {
        width: 85%;
        max-width: 35rem;
        margin: 0 auto;
        display:  flex;
        justify-content: space-between;
        vertical-align: middle;
        align-self: center;
        margin-top: 0;
        margin-bottom: 0;
    }
    .nav-title {
        text-transform: capitalize;
        color: white;
        letter-spacing: 2px;
        text-shadow: 1px 1px #595959;
        text-align: center;
    }
    .nav-btn {
        background: transparent;
        font-size: 1.3rem;
        border: none;
        cursor: pointer;
        text-transform: capitalize;
        transition: all 0.3s linear;
        margin-bottom: 0;
        color: white;
        text-shadow: 1px 1px #595959;
    }
    .nav-btn:hover {
        color: #595959;
    }
    .reminders {
        padding: 10px 0;
        align-items: center;
        margin: 0;
    }
    h4 {
        color: white;
        text-shadow: 1px 1px #595959;
        margin-block-start: auto;
        margin-block-end: auto;
        padding-bottom: 5px;
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
        background-color: white;
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
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: white;
    }
    input:checked + .slider:before {   
        background-color: #99cc00;
    }
    input:focus + .slider {
        box-shadow: 0 0 1px white;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
        box-shadow: 1px 1px #595959;
    }

    .slider.round:before {
        border-radius: 50%;
        box-shadow: 1px 1px #595959;
    }
</style>