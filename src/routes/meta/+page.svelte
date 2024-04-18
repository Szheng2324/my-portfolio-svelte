<!-- STYLE-->
<style>
    :global(body){
        max-width: min(120ch, 80vw);
    }
    dl{
        display:grid;
        grid-template-columns: max-content;
        grid-gap: 5px;

    }
    dt{
        font-weight: bold;
    }
    dd {
        margin:0;
        grid-column-start:2
    }
	svg {
		overflow: visible;
	}
    .gridlines {
        stroke-opacity: .2;
    }
    .tooltip{
        position: fixed;
        top: 1em;
        left: 1em;
        box-shadow: rgba(0, 0, 0, 0)0 2px 10px;
        padding: 1em;
    }
    dl.info {
        background-color:beige;
        box-shadow: rgba(0, 0, 0, 0)0 2px 10px;
        padding: 1em;
        /* ... other styles ... */
        transition-duration: 500ms;
        transition-property: opacity, visibility;

        &[hidden]:not(:hover, :focus-within) {
            opacity: 0;
            visibility: hidden;
        }
    }
    circle {
        transition: 200ms;
        transform-origin: center;
        transform-box: fill-box;
        @starting-style {
            r: 0;
        }


        &:hover {
            transform: scale(1.5);
        }
    }
    @keyframes marching-ants {
        to {
            stroke-dashoffset: -8; /* 5 + 3 */
        }
    }

    svg :global(.selection) {
        fill-opacity: 10%;
        stroke: black;
        stroke-opacity: 70%;
        stroke-dasharray: 5 3;
        animation: marching-ants 2s linear infinite;
    }
    .selected{
        fill: red;
    }
</style>
<script>
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import Pie from "$lib/Pie.svelte";
    import {
        computePosition,
        autoPlacement,
        offset,
    } from '@floating-ui/dom';
    import FileLines from "./FileLines.svelte";
    import Scrolly from "svelte-scrolly";


    

    let data = [];
    let commits = [];
    let width = 1000, height = 600;
    let yScale;
    let xScale;
    let commitTooltip;
    //let cursor = {x: 0, y: 0};
    let timeScale;
    let svg;
    let selectedLines;
    let selectedCommits = [];
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
   
    let margin = {top: 10, right: 10, bottom: 30, left: 20};
    let usableArea = {
        top: margin.top,
        right: width - margin.right,
        bottom: height - margin.bottom,
        left: margin.left
    };
    let tooltipPosition = {x: 0, y: 0};


    usableArea.width = usableArea.right - usableArea.left;
    usableArea.height = usableArea.bottom - usableArea.top;
   
    onMount(async () => {
        data = await d3.csv("loc.csv", row => ({
            ...row,
            line: Number(row.line), // or just +row.line
            depth: Number(row.depth),
            length: Number(row.length),
            date: new Date(row.date + "T00:00" + row.timezone),
            datetime: new Date(row.datetime)
        }));
        commits = d3.groups(data, d => d.commit).map(([commit, lines]) => {
            let first = lines[0];
            let {author, date, time, timezone, datetime} = first;
            let ret = {
                id: commit,
                url: "https://github.com/vis-society/lab-7/commit/" + commit,
                author, date, time, timezone, datetime,
                hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
                totalLines: lines.length
            };

            // Like ret.lines = lines
            // but non-enumerable so it doesn’t show up in JSON.stringify
            Object.defineProperty(ret, "lines", {
                value: lines,
                configurable: true,
                writable: true,
                enumerable: false,
            });

            return ret;
        });
        yScale = d3.scaleLinear()
            .domain([0,24])
            .range([usableArea.bottom, usableArea.top])
        xScale = d3.scaleTime()
            .domain(d3.extent(commits.map(commit=>commit.datetime)))
            .range([usableArea.left, usableArea.right])
            .nice()
        timeScale = d3.scaleTime()
        .domain(d3.extent(commits.map(commit => commit.datetime)))
        .range([0, 100])
        .nice()

    });
    let xAxis, yAxis;
    let yAxisGridlines;

    $: {
        if (xAxis && yAxis){
            d3.select(xAxis).call(d3.axisBottom(xScale));
            d3.select(yAxis).call(d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00"));
        }        

    }
    $:{
        if (yScale){
            d3.select(yAxisGridlines).call(
                d3.axisLeft(yScale)
                .tickFormat("")
                .tickSize(-usableArea.width)
            );
        }
    }
    let hoveredIndex = -1;
    $: hoveredCommit = filteredCommits[hoveredIndex] ?? {};
    
    function brushed (evt) {
        let brushSelection = evt.selection;
        selectedCommits = !brushSelection ? [] : filteredcommits.filter(commit => {
            let min = {x: brushSelection[0][0], y: brushSelection[0][1]};
            let max = {x: brushSelection[1][0], y: brushSelection[1][1]};
            let x = xScale(commit.date);
            let y = yScale(commit.hourFrac);

            return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
        });
    }
    
    function isCommitSelected (commit) {
        return selectedCommits.includes(commit);
    }
 


    
    
    
    //$: selectedCommits = brushSelection ? commits.filter(isCommitSelected) : [];
    let hasSelection;
    $: hasSelection = selectedCommits.length > 0;
    $: {
        d3.select(svg).call(d3.brush().on("start brush end", brushed));
        d3.select(svg).selectAll(".dots, .overlay ~ *").raise();


    }
    $: selectedLines = (hasSelection ? selectedCommits : commits).flatMap(d => d.lines);
    let languageBreakdown;
    $: languageBreakdown = d3.rollup(selectedLines, (line)=>line.length,(line)=>line.type)
    const format_percentage = d3.format(".1~%")



    async function dotInteraction (index, evt) {
        let hoveredDot = evt.target;


        if (evt.type === "mouseenter" || evt.type === "focus") {
            // dot hovered
            hoveredIndex = index;
            // cursor = {x: evt.x, y: evt.y};
            tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
                strategy: "fixed", // because we use position: fixed
                middleware: [
                    offset(5), // spacing from tooltip to dot
                    autoPlacement() // see https://floating-ui.com/docs/autoplacement
                ],
            });
        }
        else if (evt.type === "mouseleave" || evt.type === "blur") {
            // dot unhovered
            hoveredIndex = -1
        }
        else if (evt.type === "click" ||
            (evt.type == "keyup" && evt.key === "Enter" )) {
                selectedCommits = [commits[index]]
            }


        }
        let commitProgress = 0;
        $: {
            console.log(commitProgress);
        }
        $: commitMaxTime = timeScale && timeScale.invert(commitProgress);
        $: filteredCommits = commits.filter(commit =>{
            return commit.datetime <= commitMaxTime;
        });
        let raceProgress=0;
        $: commitMaxTimeLine = timeScale && timeScale.invert(commitProgress);

        $: filteredLines = data.filter(line => {
            return line.datetime <= commitMaxTimeLine;
        });



        $: xScale = d3.scaleTime()
                .domain(d3.extent(filteredCommits.map(commit => commit.datetime)))
                .range([usableArea.left, usableArea.right] )
                .nice()
        



</script>





<label class="time-label">
    Show commits until:
    <input type=range min="0" max="100" bind:value={commitProgress}>
    <time>{commitMaxTime && commitMaxTime.toLocaleString("en", {dateStyle: "long", timeStyle: "short"})}</time>
</label>
<FileLines colors={colors} lines={filteredLines} />





<dl
  id="commit-tooltip"
  class="info tooltip"
  hidden={hoveredIndex === -1}
  style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px" bind:this={commitTooltip} role="tooltip"
>    

        <dt>Commit</dt>
        <dd><a href="{ hoveredCommit.url }" target="_blank">{ hoveredCommit.id }</a></dd>

        <dt>Date</dt>
        <dd>{ hoveredCommit.datetime?.toLocaleString("en", {date: "full"}) }</dd>

	<dt>Author</dt>
        <dd>{ hoveredCommit.author}</dd>
    <dt>Time</dt>
        <dd>{ hoveredCommit.time}</dd>
    <dt>Lines</dt>
        <dd>{ hoveredCommit.totalLines}</dd>

</dl>


{#each languageBreakdown as [language, lines] }
    <dl>
        <dt>{language.toUpperCase()}</dt>
            <dd>{lines} lines({format_percentage(lines/selectedLines.length)})</dd>
    
    </dl>
	
{/each}





<dl class = "stats">
    <dt>Total <abbr title="Lines of code">LOC</abbr></dt>
	    <dd>{filteredLines.length}</dd>
    <dt>Average depth</dt>
	    <dd>{d3.mean(filteredLines, d => d.depth)}</dd>
    <dt>Number of files </dt>
	    <dd>{d3.group(filteredLines, d => d.file).size}</dd>
    

</dl>
<Scrolly bind:progress={ commitProgress }>
	{#each commits as commit, index }
        <p>
            On {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})},
            I made <a href="{commit.url}" target="_blank">{ index > 0 ? 'another glorious commit' : 'my first commit, and it was glorious' }</a>.
            I edited {commit.totalLines} lines across { d3.rollups(commit.lines, D => D.length, d => d.file).length } files.
            Then I looked over all I had made, and I saw that it was very good.
        </p>
    {/each}
	<svelte:fragment slot="viz">
		<!-- Visualizations here -->
        <svg viewBox="0 0 {width} {height}" bind:this={svg}>
            <g class="dots">
            {#each filteredCommits as commit, index (commit.id) }
            <circle
                class:selected={selectedCommits.includes(commit)}
                cx={ xScale(commit.datetime) }
                cy={ yScale(commit.hourFrac) }
                r="5"
                fill="steelblue"
                on:mouseenter={evt => dotInteraction(index, evt)}
                on:mouseleave={evt => dotInteraction(index, evt)}
                tabindex="0"
                aria-describedby="commit-tooltip"
                aria-haspopup="true"
                on:focus={evt => dotInteraction(index, evt)}
                on:blur= {evt => dotInteraction(index, evt)}
                on:click={evt => dotInteraction(index, evt)}
                on:keyup={evt => dotInteraction(index, evt)}
            />
        
            {/each}
            </g>
            <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
            <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
            <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
            
        
        </svg>
        <p>{hasSelection ? selectedCommits.length : "No"} commits selected</p>
        <Pie data={Array.from(languageBreakdown).map(([language, lines]) => ({label: language, value: lines}))} colors={colors} />


	</svelte:fragment>
</Scrolly>

<Scrolly bind:progress={raceProgress} --scrolly-layout="viz-first">

	
    {#each commits as commit, index }
        <p>
            On {commit.datetime.toLocaleString("en", {dateStyle: "full", timeStyle: "short"})},
            I made <a href="{commit.url}" target="_blank">{ index > 0 ? 'another glorious commit' : 'my first commit, and it was glorious' }</a>.
            I edited {commit.totalLines} lines across { d3.rollups(commit.lines, D => D.length, d => d.file).length } files.
            Then I looked over all I had made, and I saw that it was very good.
        </p>
    
    {/each}
	<svelte:fragment slot="viz">
		<FileLines lines={filteredLines} colors ={colors}/>
	</svelte:fragment>
</Scrolly>