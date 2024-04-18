<script>
    import * as d3 from 'd3';
    export let data = [];
    export let colors;

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    //let sliceGenerator = d3.pie().value(d => d.value);
    
    let arcData;
    let transitionDuration = 3000;
    let arcs;
    let pieData=[];
    let oldData=[];
    $: {
        arcData = sliceGenerator(data);
        arcs = arcData.map(d => arcGenerator(d));
    }
    let sliceGenerator = d3.pie().value(d => d.value).sort(null);

    export let selectedIndex = -1;
    function toggleWedge (index, event) {
        if (!event.key || event.key === "Enter") {
            selectedIndex = selectedIndex === index ? -1 : index;
        } 
    } 
    let wedges = {};
    function transitionArcs() {
        let wedgeElements = Object.values(wedges);

        d3.selectAll(wedgeElements).transition("arc")
            .duration(transitionDuration)
            .styleTween("d", function (_, index) {
                let wedge = this;
                let label = Object.keys(wedges)[index];
                let d = pieData.find(d => d.label === label);
                let d_old = oldData.find(d => d.label === label);
                if (!d || !d_old) {
                    return;
                }
                let from = {...d_old};
                let to = {...d};
                let angleInterpolator = d3.interpolate(from, to);
                let interpolator = t => `path("${ arcGenerator(angleInterpolator(t)) }")`;




                // Calculations that will only be done once per element go here
                return interpolator;


            });
    }
    


 
    
    $: {
        pieData = d3.sort(data, d => d.label);
        oldData = pieData;
        pieData = data.map(d => ({...d}));
        let arcData = sliceGenerator(pieData);
        let arcs = arcData.map(d => arcGenerator(d));
        pieData = pieData.map((d, i) => ({...d, ...arcData[i], arc: arcs[i]}));
        // console.log(data)
        transitionArcs()
    };
   


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
		{#each data as d, index (d.label)}
        
            <path d={arcs[index]} fill={ colors(d.id ?? d.label) } aria-label = "pie" role="button" tabindex ="0"  
                class:selected={selectedIndex === index}
                on:click={e => toggleWedge(index, e)}
                on:keyup={e => toggleWedge(index, e)}
                />

        {/each}
	</svg>
	<ul class="legend">
		{#each pieData as d, index}
            <li class = "legend-elt" style="--color: { colors(d.label) }">
                <span class="swatch" class:selected={selectedIndex === index}></span>
                {d.label} <em>({d.value})</em>
            </li>
        
        {/each}
	</ul>
</div>
