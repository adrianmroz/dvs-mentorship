<script>
  import { curveCatmullRom, line, max, scaleLinear } from "d3";
  import Axis from "./Axis.svelte";
  import Label from "./Label.svelte";
  import Line from "./Line.svelte";
  import Point from "./Point.svelte";

  export let dataset;
  export let width;
  export let height;

  const margin = { top: 50, bottom: 50, left: 50, right: 50 };

  $: innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.left - margin.right;

  const yAccessor = d => d.total; // Would still name it something like "getTotal".
  const xAccessor = d => d.percent_rotted;

  $: yScale = scaleLinear()
    .domain([0, max(dataset, yAccessor)])
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

<svg {width} {height} viewBox="{`0 0 ${width} ${height}`}">
  <g transform={`translate(${margin.left}, ${margin.top})`}>
    <Line d={lineGenerator(dataset)} />
    {#each dataset as data, i}
      {@const x = xScale(xAccessor(data))}
      {@const y = yScale(yAccessor(data))}
      <Point {x} {y} />
      <Label {x} {y} text={data.year} />
    {/each}
  </g>
  <g transform={`translate(${margin.left}, ${height - margin.bottom})`}
  >
    <Axis scale={xScale}
          height={innerHeight}
          width={innerWidth}
          position="bottom"
          label="Linkrot frequency - percent of rotted links" />
  </g>
  <g transform={`translate(0, ${margin.top})`}>
    <Axis scale={yScale}
          height={innerHeight}
          width={margin.left}
          position="left"
          label="Number of links in articles" />
  </g>
</svg>

<style>
    svg {
        color: #8395a7;
    }
</style>
