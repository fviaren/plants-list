<script>
    import Plant from './Plant.svelte'
    export let plants;
</script>

<ul>
{#each plants as plant}
    <li>
        <Plant plant={plant}></Plant>
    </li>
{/each}
</ul>

<style>
</style>