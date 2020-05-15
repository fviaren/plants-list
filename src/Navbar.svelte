<script>
    import { getContext } from 'svelte';
    import globalStore from './stores/globalStore';
</script>

<nav class="nav">
	<div class="nav-center">
		<h1 class="nav-title">My plants</h1>
		<button type="button" class="nav-btn" title='Add plant' on:click={()=>{globalStore.updateState('plantForm', true)}}>
			<i class="fas fa-plus-square"/>
			<i class="fas fa-seedling" />
		</button>
	</div>

</nav>

<style>
    .nav {
        background: #99cc00;
        height: 4rem;
        display: flex;
        align-items: center;
        box-shadow: 2px 5px 3px 0px rgba(0, 0, 0, 0.5);
        }

    .nav-center {
        width: 85%;
        max-width: 35rem;
        margin: 0 auto;
        display: flex;
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

</style>