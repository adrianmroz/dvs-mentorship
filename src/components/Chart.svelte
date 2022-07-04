<script>
	import { csv, scaleLinear, extent , line, curveCatmullRom, max } from "d3";
	import Axis from "./Axis.svelte";
	import Label from "./Label.svelte";
	import Line from "./Line.svelte";
	import Point from "./Point.svelte";

	export let dataset;
	
	const margin = { top: 50, bottom: 50, left: 50, right: 50 };
   const width = 1100, 
			  height = 500;
	
	const innerHeight = height - margin.top - margin.bottom,
    		innerWidth = width - margin.left - margin.right;
	
	const yAccessor = d => d.total; // Would still name it something like "getTotal".
	const xAccessor = d => d.percent_rotted;
	const labelAccessor = d => d.year;
	
	$: yScale = scaleLinear()
    .domain([0,max(dataset, yAccessor)])
    .range([innerHeight, 0])
		.nice();

  $: xScale = scaleLinear()
    .domain([0, max(dataset, xAccessor)])
    .range([0, innerWidth])
		.nice();
	
	$: lineGenerator = line()
	 	.curve(curveCatmullRom)
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)));
</script>

<svg {width} {height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<Line d={lineGenerator(dataset)} />
				{#each dataset as data, i}
					{@const x = xScale(xAccessor(data))}
					{@const y = yScale(yAccessor(data))}
					<Point {x} {y} />
					<Label {x} {y} text={data.year}/>	
				{/each}
				<Axis scale={xScale} {innerHeight} {innerWidth} position="bottom" label="Linkrot frequency - percent of rotted links"></Axis>
				<Axis scale={yScale} {innerHeight} {innerWidth} position="left" label="Number of links in articles"></Axis>
			</g>
	</svg>

<div class="foo">
	
</div>

<style>
	.foo {
		position: absolute;
		top: 0;
		left: 0;
		width: 100px;
		height: 100px;
		background-color: "red";
		
	}
	svg { 
		color: #8395a7;
	}
</style>
