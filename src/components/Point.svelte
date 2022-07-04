<script>
	export let x;
	export let y;
</script>

<circle
						cx={x}
						cy={y}
						r="5"
						class="point"
					/>


<style>
	.point {
			stroke: #af9358;
			stroke-width: 2;
			fill: white;
	}
</style>