<script>
		import { axisBottom, axisLeft, select, format } from "d3";

	export let innerHeight;
	export let innerWidth;
  export let position;
  export let scale;
	export let label;

  let axis;
	let transformAxis;
	let transformLabel;
	
	$: {
		switch (position) {
      case "bottom":
						const axisGeneratorBottom = axisBottom().scale(scale);
						select(axis).call(axisGeneratorBottom);
						transformAxis = `translate(0, ${innerHeight})`;
						transformLabel = `translate(${innerWidth/2},${innerHeight+40})`;		
						break;
			case "left":
						let axisGeneratorLeft = axisLeft().tickFormat(format(".2s")).scale(scale);
						select(axis).call(axisGeneratorLeft);
						transformAxis = ``;
						transformLabel = `translate(${-40},${innerHeight/2})rotate(-90)`;	
						break;
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