<script>
    import * as d3 from "d3";
	import { scale } from 'svelte/transition';
    export let colors = d3.scaleOrdinal(d3.schemeTableau10);
    // import { flip } from "svelte/animate";
    import { flip as originalFlip } from "svelte/animate";
    export let lines;
   


let files = [];
$: {
	files = d3.groups(lines, d => d.file).map(([name, lines]) => {
		return { name, lines };

	});
    files = d3.sort(files, d => -d.lines.length);
    
}
function getFlip () {
	return originalFlip;
}
$: flip = getFlip(files);



</script>


<dl class="files">
	{#each files as file (file.name) }
		<div animate:flip >
			<dt>
				<code>{file.name}</code>
			</dt>
			<dd>
            {#each file.lines as line (line.line) }
                <div  in:scale class="line" style="--color: { colors(line.type) }"></div>
            {/each}</dd>
		</div>
	{/each}
</dl>



<style>
    dl{
        display: grid;
        grid-gap: 5px;
        & > div {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: subgrid;
        }

    }
    dt{
        grid-column: 1;

    }
    dd {
        grid-column: 2;
        display: flex;
        flex-wrap: wrap;
        align-items: start;
        align-content: start;
        gap: .15em;
        padding-top: .6em;
        margin-left: 0;
    }
    .line {
        display: flex;
        width: .5em;
        aspect-ratio: 1;
        background: var(--color);
        border-radius: 50%;
    }




</style>