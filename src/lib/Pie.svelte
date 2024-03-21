<script>
    import * as d3 from 'd3';
    export let data = [];
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let sliceGenerator = d3.pie().value(d => d.value);
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    let arcData;
    let arcs;
    $: {
        arcData = sliceGenerator(data);
        arcs = arcData.map(d => arcGenerator(d));
    }
    export let selectedIndex = -1;
    function toggleWedge (index, event) {
        if (!event.key || event.key === "Enter") {
            selectedIndex = selectedIndex === index ? -1 : index;
        } 
    } 
</script>
<style>
   svg {
        max-width: 20em;
        margin-block: 2em;

        /* Do not clip shapes outside the viewBox */
        overflow: visible;
    }
    svg:has(path:hover, path:focus-visible) {
        path:not(:hover, :focus-visible) {
            opacity: 50%;
        }
    }
    path{
        transition: 300ms;
        cursor: pointer;
        outline: none;

    }
    .swatch{
        width: 15px;
        height: 15px;
        background-color: var(--color);
        display: inline-block;
        border-radius: 50%;

    }
    .legend{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
        padding: 1rem;
        gap: 10px;
        margin: 1rem;
        flex:1 ;

    }
    .legend-elt{
        display: flex;
        align-items: center;
        gap: 5px;

    }
    .container{
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .selected {
        --color: oklch(60% 45% 0) !important;

        &:is(path) {
            fill: var(--color);
        }
    }
      
    
    
</style>    
<div class="container">
	<svg viewBox="-50 -50 100 100">
		{#each arcs as arc, index}
            <path aria-label = "pie" role="button" tabindex ="0" d={arc} fill={ colors(index) }
                class:selected={selectedIndex === index}
                on:click={e => toggleWedge(index, e)}
                on:keyup={e => toggleWedge(index, e)}
                />

        {/each}
	</svg>
	<ul class="legend">
		{#each data as d, index}
            <li class = "legend-elt" style="--color: { colors(index) }">
                <span class="swatch" class:selected={selectedIndex === index}></span>
                {d.label} <em>({d.value})</em>
            </li>
        
        {/each}
	</ul>
</div>
