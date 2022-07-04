<script>
		import { axisBottom, axisLeft, select, format } from "d3";

	export let width;
	export let height;
  export let position;
  export let scale;
	export let label;

  let axis;
	let transformAxis = '';
	let transformLabel;
	
	$: {
		switch (position) {
      case "bottom": {
        const axisGeneratorBottom = axisBottom().scale(scale);
        select(axis).call(axisGeneratorBottom);
        transformLabel = `translate(${width / 2},40)`;
        break;
      }
			case "left": {
        const axisGeneratorLeft = axisLeft().tickFormat(format(".2s")).scale(scale);
        select(axis).call(axisGeneratorLeft);
        transformLabel = `translate(10,${height / 2})rotate(-90)`;
        transformAxis = `translate(${width}, 0)`
        break;
      }
		}
	}
</script>

<text class="axis-label" transform={transformLabel} text-anchor="middle">{label}</text>
<g class="axis" bind:this={axis} transform={transformAxis} />

<style>
	.axis-label {
		fill: #34495e;
		font-size: 0.8em;
	}

</style>
